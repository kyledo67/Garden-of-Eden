document.addEventListener('DOMContentLoaded', function() {
    const toggleOptions = document.getElementById('toggleOptions');
    const optionsMenu = document.getElementById('optionsMenu');
    const chatOption = document.getElementById('chatOption');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');

    async function typeMessage(element, text) {
        element.textContent = '';
        const delay = 15; 
        
        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i];
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    function initializeChat() {
        const messageInput = document.getElementById('messageInput');
        const sendMessage = document.getElementById('sendMessage');
        const chatMessages = document.getElementById('chatMessages');

        console.log('Initializing chat with elements:', {
            messageInput: !!messageInput,
            sendMessage: !!sendMessage,
            chatMessages: !!chatMessages
        });

        if (!messageInput || !sendMessage || !chatMessages) {
            console.error('Chat elements not found');
            return;
        }

        const newSendButton = sendMessage.cloneNode(true);
        sendMessage.parentNode.replaceChild(newSendButton, sendMessage);
        const newInput = messageInput.cloneNode(true);
        messageInput.parentNode.replaceChild(newInput, messageInput);

        newSendButton.addEventListener('click', handleSendMessage);
        newInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });

        newInput.focus();

        console.log('Chat initialization complete');
    }

    async function handleSendMessage() {
        const messageInput = document.getElementById('messageInput');
        const chatMessages = document.getElementById('chatMessages');
        
        const message = messageInput.value.trim();
        if (!message) return;

        console.log('Sending message:', message);

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'user-message');
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        
        messageInput.value = '';
        
        const loadingDiv = document.createElement('div');
        loadingDiv.classList.add('message', 'bot-message', 'loading');
        loadingDiv.textContent = 'Typing...';
        chatMessages.appendChild(loadingDiv);

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + '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',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: `You are a helpful assistant for the Garden of Eden vegetarian restaurant. Be concise about your speaking. Here is our key information:

RESERVATIONS:
- Reservations can be made by clicking the top right button "Reserve now" or at the Home-Page, click "Reserve a table".
- We accept reservations for groups of up to 10 people
- Reservation hours: Monday-Sunday, 11:30 PM to 7:30 PM
- Please call at least 24 hours in advance for groups of 6 or more

MENU HIGHLIGHTS(talk about it concisely unless asked specifically):
- Wild Mushroom Risotto ($24): Arborio rice, foraged mushrooms, fresh herbs, truffle oil
- Garden Buddha Bowl ($22): Quinoa, roasted vegetables, avocado, tahini dressing
- Mushroom Wellington ($24): Portobello mushrooms, spinach, wrapped in puff pastry
- Daily rotating seasonal specials

DIETARY ACCOMMODATIONS:
- All dishes are vegetarian
- 80% of our menu can be made vegan upon request
- Gluten-free options available
- Nut-free kitchen area for allergy-sensitive preparations

LOCATION & HOURS:
- Address: 23512 Nature Way Bithlo, TX 32820
- Hours: Monday-Sunday, 11:30 AM - 8:30 PM 
- Free parking available in rear lot
- Accessible entrance on the side of the building

SOURCING:
- We maintain our own 2-acre organic farm
- All produce is organic and locally sourced through our own farm
- Weekly changing menu based on seasonal availability

POLICIES:
- 18% gratuity added for parties of 6 or more
- Outside cake fee: $15
- Corkage fee: $20 per bottle
- We cannot hold unpaid reservations for more than 15 minutes past the reservation time

CONTACT:
- Tell them to navigate towards the contact page, either with the bottom left button or scroll all the way down on the screen and find the "Contact" word in the navigation tile.
- Our email is support@gardenofeden.com
- Bottom of the page is a newsletter, subscribe for free rewards and possible coupons. Also, news for events.
- Office hours for customer service online is from Monday-Friday, 8 AM to 4PM
- If the user asks to speak to someone, tell them to navigate towards the contact page, either with the bottom left button or scroll all the way down on the screen and find the "Contact" word in the navigation tile. Or contact support@gardenofeden.com.

When answering questions, be friendly and conversational while providing specific details, but concise, from this information. if asked about something unrelated to the website or Garden of Eden, keep things related to the website and the restaurant and just respond with: "I am only here to assist with questions about Garden of Eden.".`
                        },
                        {
                            role: "user",
                            content: message
                        }
                    ]
                })
            });

            const data = await response.json();
            loadingDiv.remove();
            
            const responseDiv = document.createElement('div');
            responseDiv.classList.add('message', 'bot-message');
            chatMessages.appendChild(responseDiv);
            
            
            await typeMessage(responseDiv, data.choices[0].message.content);
        } catch (error) {
            console.error('Error:', error);
            loadingDiv.remove();
            const errorDiv = document.createElement('div');
            errorDiv.classList.add('message', 'bot-message', 'error');
            await typeMessage(errorDiv, "I apologize, but I'm having trouble connecting right now. Please try again later.");
            chatMessages.appendChild(errorDiv);
        }

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    toggleOptions?.addEventListener('click', (e) => {
        e.stopPropagation();
        optionsMenu.classList.toggle('active');
    });

    chatOption?.addEventListener('click', () => {
        chatWindow.classList.add('active');
        optionsMenu.classList.remove('active');
        setTimeout(initializeChat, 100); 
    });

    closeChat?.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.chat-widget')) {
            optionsMenu.classList.remove('active');
        }
    });
    
    const contactOption = document.createElement('div');
    contactOption.className = 'option-item';
    contactOption.id = 'contactOption';
    contactOption.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        <span>Contact Us</span>
    `;
    contactOption.addEventListener('click', async (e) => {
        e.preventDefault();
        const progressBar = document.querySelector('.nav-progress');
        if (progressBar) {
            progressBar.classList.add('active');
        }
        setTimeout(() => {
            window.location.href = 'contact.html';
        }, 400);
    });
    optionsMenu.appendChild(contactOption);

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.chat-widget')) {
            optionsMenu.classList.remove('active');
        }
    });
});
