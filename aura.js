
document.addEventListener('DOMContentLoaded', function() {
const navbar = document.querySelector('.navbar');
const progressBar = document.createElement('div');
progressBar.className = 'nav-progress';
navbar.appendChild(progressBar);

const heroTitle = document.querySelector('.hero-section h1');
const heroText = document.querySelector('.hero-section p');
const heroButtons = document.querySelector('.hero-section .flex');
const plantAnimation = document.querySelector('.plant-animation').parentElement;

if (heroTitle) heroTitle.classList.add('fade-down', 'fade-down-delay-1');
if (heroText) heroText.classList.add('fade-up', 'fade-up-delay-1');
if (heroButtons) heroButtons.classList.add('fade-up', 'fade-up-delay-2');
if (plantAnimation) plantAnimation.classList.add('fade-up', 'fade-up-delay-3');

const logoLink = document.querySelector('.navbar .gradient-text');
if (logoLink && (window.location.pathname === '/' || window.location.pathname.endsWith('index.html'))) {
    logoLink.removeAttribute('href');
    logoLink.style.cursor = 'pointer';

    logoLink.addEventListener('click', function(e) {
        e.preventDefault();
        progressBar.classList.add('active');
        setTimeout(() => {
            window.location.reload();
        }, 400);
    });
}

const processButton = document.querySelector('button[onclick*="farm.html"]');
if (processButton) {
    processButton.onclick = function(e) {
        e.preventDefault();
        progressBar.classList.add('active');
        setTimeout(() => { 
            window.location.href = 'farm.html';
        }, 600);
        return false;
    };
}

});
document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        progressBar.classList.add('active');
        setTimeout(() => {
            window.location.href = this.href;
        }, 400); 
    });
});
