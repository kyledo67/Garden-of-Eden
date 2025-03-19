const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

document.getElementById('newsletterForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const blurBg = document.createElement('div');
    blurBg.style.position = 'fixed';
    blurBg.style.top = '0';
    blurBg.style.left = '0';
    blurBg.style.width = '100%';
    blurBg.style.height = '100%';
    blurBg.style.background = 'rgba(0, 0, 0, 0.2)';
    blurBg.style.backdropFilter = 'blur(6px)';
    blurBg.style.transition = 'opacity 0.3s ease-in';
    blurBg.style.zIndex = '9998';
    document.body.appendChild(blurBg);


    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.background = 'rgba(0, 0, 0, 0.6)';
    popup.style.color = 'white';
    popup.style.fontSize = '24px';
    popup.style.fontWeight = 'bold';
    popup.style.padding = '12px 20px';
    popup.style.borderRadius = '12px';
    popup.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
    popup.style.display = 'flex';
    popup.style.gap = '3px';
    popup.style.flexDirection = 'column';
    popup.style.alignItems = 'center';
    popup.style.fontFamily = "'Space Grotesk', sans-serif";
    popup.style.zIndex = '9999';
    document.body.appendChild(popup);

    
    const textContainer = document.createElement('div');
    textContainer.style.display = 'flex';
    textContainer.style.gap = '3px';
    popup.appendChild(textContainer);

    
    const letters = ['S', 'e', 'n', 't', '!'].map((char, index) => {
        const span = document.createElement('span');
        span.innerText = char;
        span.style.opacity = '0';
        span.style.transform = 'translateY(5px)';
        span.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
        span.style.transitionDelay = `${index * 0.15}s`; 
        textContainer.appendChild(span);
        return span;
    });

    const loadingBarContainer = document.createElement('div');
    loadingBarContainer.style.width = '80px';
    loadingBarContainer.style.height = '4px';
    loadingBarContainer.style.background = 'rgba(255, 255, 255, 0.3)';
    loadingBarContainer.style.borderRadius = '2px';
    loadingBarContainer.style.overflow = 'hidden';
    loadingBarContainer.style.marginTop = '8px';

    const loadingBar = document.createElement('div');
    loadingBar.style.width = '0%';
    loadingBar.style.height = '100%';
    loadingBar.style.background = '#fff'; 
    loadingBar.style.transition = 'width 0.7s linear';
    loadingBarContainer.appendChild(loadingBar);
    popup.appendChild(loadingBarContainer);

    
    setTimeout(() => {
        letters.forEach(span => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        });

        
        loadingBar.style.width = '100%';
    }, 50);

    setTimeout(() => {
        popup.style.transition = 'opacity 0.3s ease-in';
        popup.style.opacity = '0';
        blurBg.style.opacity = '0';
        setTimeout(() => {
            popup.remove();
            blurBg.remove();
        }, 300);
    }, 800);


    e.target.reset();
});


