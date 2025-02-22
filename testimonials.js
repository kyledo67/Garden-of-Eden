document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(17, 24, 39, 0.95)';
    } else {
        navbar.style.background = 'rgba(17, 24, 39, 0.8)';
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

document.addEventListener('DOMContentLoaded', function() {
const slides = document.querySelectorAll('.testimonial-slide');
let currentSlide = 0;
let slideInterval;
const intervalTime = 2000; 


function showSlide(index) {
slides.forEach(slide => slide.classList.remove('active'));
slides[index].classList.add('active');
}


function nextSlide() {
currentSlide = (currentSlide + 1) % slides.length;
showSlide(currentSlide);
}


function startSlideshow() {
showSlide(currentSlide); 
slideInterval = setInterval(nextSlide, intervalTime);
}


const testimonialContainer = document.getElementById('testimonials-container');
testimonialContainer.addEventListener('mouseenter', () => {
clearInterval(slideInterval);
});

testimonialContainer.addEventListener('mouseleave', () => {
slideInterval = setInterval(nextSlide, intervalTime);
});


startSlideshow();
});


function scrollToTop(event) {
event.preventDefault();
window.scrollTo({
top: 0,
behavior: 'smooth'
});
}
