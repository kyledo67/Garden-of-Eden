
(function() {
    
    function initProgressBar() {
        
        if (!document.querySelector('.nav-progress')) {
            const navbar = document.querySelector('.navbar');
            const progressBar = document.createElement('div');
            progressBar.className = 'nav-progress';
            navbar.appendChild(progressBar);
        }
        return document.querySelector('.nav-progress');
    }

    
    function handleNavigation(url) {
        const progressBar = initProgressBar();
        progressBar.classList.add('active');
        return new Promise((resolve) => {
            setTimeout(() => {
                window.location.href = url;
                resolve();
            }, 400);
        });
    }

    function initializeNavigation() {
        const progressBar = initProgressBar();
        
 
        const logoLink = document.querySelector('.navbar .gradient-text');
        if (logoLink) {
            logoLink.style.cursor = 'pointer';
            logoLink.addEventListener('click', async function(e) {
                e.preventDefault();
                await handleNavigation(window.location.href);
            });
        }
        
  
        const processButton = document.querySelector('button[onclick*="farm.html"]');
        if (processButton) {
            processButton.removeAttribute('onclick'); 
            processButton.addEventListener('click', async function(e) {
                e.preventDefault();
                await handleNavigation('farm.html');
            });
        }

        
        const navLinks = document.querySelectorAll('.navbar a[href$=".html"], .navbar-links a[href$=".html"]');
        navLinks.forEach(link => {
            link.addEventListener('click', async function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                await handleNavigation(href);
            });
        });

       
        const faqOption = document.getElementById('faqOption');
        if (faqOption) {
            faqOption.addEventListener('click', async function(e) {
                e.preventDefault();
                await handleNavigation('faq.html');
            });
        }

  
        document.querySelectorAll('a[href$=".html"]').forEach(link => {
           
            if (!link.closest('.navbar') && !link.closest('.navbar-links')) {
                link.addEventListener('click', async function(e) {
                    e.preventDefault();
                    const href = this.getAttribute('href');
                    await handleNavigation(href);
                });
            }
        });
    }

    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeNavigation);
    } else {
        
        initializeNavigation();
    }
})();
