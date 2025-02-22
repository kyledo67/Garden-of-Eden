document.addEventListener('DOMContentLoaded', function() {
    const modalHTML = `
        <div id="reservationModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
            <div class="bg-[#4A3B2C] p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div id="dateSelection" class="block">
                    <h2 class="text-2xl font-bold mb-6 text-white">Select a Date</h2>
                    <div id="calendar" class="grid grid-cols-7 gap-2 mb-4">
                    </div>
                </div>
                
                <div id="timeSelection" class="hidden">
                    <h2 class="text-2xl font-bold mb-6 text-white">Select a Time</h2>
                    <div id="timeSlots" class="grid grid-cols-3 gap-2">
                    </div>
                </div>
                
                <div id="confirmationMessage" class="hidden">
                    <h2 class="text-2xl font-bold mb-4 text-white">Reservation Confirmed!</h2>
                    <p id="reservationDetails" class="text-gray-300 mb-6"></p>
                </div>
                
                <button id="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-white">
                    ✕
                </button>
            </div>
        </div>
    `;

    if (!document.getElementById('reservationModal')) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    const modal = document.getElementById('reservationModal');
    const dateSelection = document.getElementById('dateSelection');
    const timeSelection = document.getElementById('timeSelection');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const calendar = document.getElementById('calendar');
    const timeSlots = document.getElementById('timeSlots');
    const closeModal = document.getElementById('closeModal');
    const reserveButton = document.getElementById('reserveButton');
    const heroReserveButton = document.getElementById('heroReserveButton');

    function getKatyTime() {
        const options = {
            timeZone: 'America/Chicago', 
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
        };
        
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const katyTimeStr = formatter.format(new Date());
        return new Date(katyTimeStr);
    }

    function isSameDay(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }

    function generateCalendar() {
        calendar.innerHTML = '';
        const currentTime = getKatyTime();
        const daysInMonth = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 0).getDate();
        const firstDay = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1).getDay();

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        days.forEach(day => {
            calendar.innerHTML += `<div class="text-center text-gray-400 font-bold">${day}</div>`;
        });

        for (let i = 0; i < firstDay; i++) {
            calendar.innerHTML += '<div></div>';
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentTime.getFullYear(), currentTime.getMonth(), day);
            date.setHours(0, 0, 0, 0);
            
            const today = new Date(currentTime);
            today.setHours(0, 0, 0, 0);
            
            const isToday = isSameDay(date, today);
            const isPastDay = date < today;

            calendar.innerHTML += `
                <button 
                    class="p-2 rounded ${isPastDay ? 'text-gray-500 cursor-not-allowed' : 
                                        isToday ? 'hover:bg-[#8B9D77] text-white border border-[#8B9D77]' : 
                                        'hover:bg-[#8B9D77] text-white'}"
                    ${isPastDay ? 'disabled' : 'onclick="selectDate(this)"'}
                    data-date="${date.toISOString().split('T')[0]}"
                >
                    ${day}
                </button>
            `;
        }
    }

    function parseTime(timeStr) {
        const [time, period] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        
        return { hours, minutes };
    }

    function generateTimeSlots(selectedDate) {
        const times = [
            '11:30 AM', '12:00 PM', '12:30 PM', 
            '1:00 PM', '1:30 PM', '2:00 PM',
            '5:00 PM', '5:30 PM', '6:00 PM',
            '6:30 PM', '7:00 PM', '7:30 PM'
        ];

        const currentTime = getKatyTime();
        const selected = new Date(selectedDate);
        const isSelectedToday = isSameDay(selected, currentTime);

        timeSlots.innerHTML = times.map(time => {
            const { hours, minutes } = parseTime(time);
            
            const slotTime = new Date(selected);
            slotTime.setHours(hours, minutes, 0, 0);
            
            const bufferTime = new Date(currentTime.getTime() + 15 * 60000);
            
            const isInvalid = isSelectedToday && slotTime <= bufferTime;

            return `
                <button 
                    class="p-2 rounded ${isInvalid ? 'text-gray-500 cursor-not-allowed' : 'hover:bg-[#8B9D77] text-white'}"
                    ${isInvalid ? 'disabled' : `onclick="selectTime('${time}')"`}
                    title="${isInvalid ? 'This time has passed' : 'Available'}"
                >
                    ${time}
                </button>
            `;
        }).join('');
    }

    window.selectDate = function(button) {
        const selectedDate = button.dataset.date;
        dateSelection.classList.add('hidden');
        timeSelection.classList.remove('hidden');
        generateTimeSlots(selectedDate);
        window.selectedDate = selectedDate;
    };

    let confirmationTimeout = null;

    window.selectTime = function(time) {
        const currentTime = getKatyTime();
        const selectedDate = new Date(window.selectedDate);
        const isToday = isSameDay(selectedDate, currentTime);
        
        if (isToday) {
            const { hours, minutes } = parseTime(time);
            const timeDate = new Date(selectedDate);
            timeDate.setHours(hours, minutes, 0, 0);
            
            const bufferTime = new Date(currentTime.getTime() + 15 * 60000);
            
            if (timeDate <= bufferTime) {
                alert('Sorry, this time slot is no longer available.');
                return;
            }
        }

        if (confirmationTimeout) {
            clearTimeout(confirmationTimeout);
        }

        const formattedDate = selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        timeSelection.classList.add('hidden');
        confirmationMessage.classList.remove('hidden');
        document.getElementById('reservationDetails').textContent = 
            `Your table has been reserved for ${formattedDate} at ${time}`;
        
        confirmationTimeout = setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            resetModal();
        }, 5000);
    };

    function resetModal() {
        if (confirmationTimeout) {
            clearTimeout(confirmationTimeout);
        }
        dateSelection.classList.remove('hidden');
        timeSelection.classList.add('hidden');
        confirmationMessage.classList.add('hidden');
        calendar.innerHTML = '';
    }

    [reserveButton, heroReserveButton].forEach(button => {
        if (button) {
            button.addEventListener('click', () => {
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                generateCalendar();
            });
        }
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        resetModal();
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href') === '#' ? 'body' : this.getAttribute('href');
        document.querySelector(target).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(74, 59, 44, 0.95)';
    } else {
        navbar.style.background = 'rgba(74, 59, 44, 0.8)';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
        } else {
            backToTopButton.style.opacity = '0';
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
