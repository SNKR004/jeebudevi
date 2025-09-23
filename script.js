// --- Rising Sparkle Particles ---
const particleContainer = document.getElementById('particle-container');
if (particleContainer) {
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
        particleContainer.appendChild(particle);
        setTimeout(() => { particle.remove(); }, 10000);
    }
    setInterval(createParticle, 150);
}

// --- Scroll Animations ---
const animatedElements = document.querySelectorAll('.animate-on-scroll');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
             setTimeout(() => {
                entry.target.classList.add('visible');
            }, parseInt(delay));
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
animatedElements.forEach(element => observer.observe(element));

// --- Copy Button Functionality ---
const copyButton = document.getElementById('copy-button');
const robuxCode = document.querySelector('.roblox-code');
if (copyButton) {
    copyButton.addEventListener('click', () => {
        const textToCopy = robuxCode.textContent.trim();
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = textToCopy;
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextarea);
        copyButton.textContent = 'Copied!';
        setTimeout(() => { copyButton.textContent = 'Copy'; }, 2000);
    });
}

// --- Lightbox Functionality ---
const lightbox = document.getElementById('lightbox');
if (lightbox) {
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryImages = document.querySelectorAll('.gallery-image-wrapper img');
    const closeBtn = document.querySelector('.lightbox-close');
    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            lightbox.classList.add('active');
            lightboxImg.src = image.src;
        });
    });
    const closeLightbox = () => lightbox.classList.remove('active');
    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) closeLightbox();
    });
}

// --- Optimized Touch Halo Interactivity ---
const touchHalo = document.getElementById('touch-halo');
if (touchHalo) {
    let lastX = 0;
    let lastY = 0;
    let ticking = false;
    const updateHaloPosition = () => {
        touchHalo.style.transform = `translate(${lastX}px, ${lastY}px) translate(-50%, -50%) scale(1)`;
        ticking = false;
    };
    const onTouchMove = (e) => {
        const touch = e.touches[0];
        lastX = touch.clientX;
        lastY = touch.clientY;
        if (!ticking) {
            window.requestAnimationFrame(updateHaloPosition);
            ticking = true;
        }
    };
    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        lastX = touch.clientX;
        lastY = touch.clientY;
        touchHalo.style.transform = `translate(${lastX}px, ${lastY}px) translate(-50%, -50%) scale(1)`;
        touchHalo.classList.add('active');
        document.addEventListener('touchmove', onTouchMove);
    });
    document.addEventListener('touchend', () => {
        touchHalo.classList.remove('active');
        document.removeEventListener('touchmove', onTouchMove);
    });
}


// --- FINAL CORRECTED: Timing-Based Archery Game Logic ---
const gameContainer = document.getElementById('game-container');
if (gameContainer) {
    // Select all the elements for the game
    const gameWrapper = document.getElementById('game-wrapper');
    const arrow = document.getElementById('arrow');
    const ravanaTarget = document.getElementById('ravana-target');
    const tryAgainMessage = document.getElementById('try-again-message');
    const jaiShriRamMessage = document.getElementById('jai-shri-ram');
    const robuxReveal = document.getElementById('robux-reveal');
    const fireworksContainer = document.getElementById('fireworks-container');

    let gameActive = true;
    
    // NEW: Array for your custom miss messages
    const missMessages = ['chindu ellamma🚫 jeebu chellamma✅','evv anil saar🤩', 'sairaam😂', 'haha noob🤫', 'chill daddy🙈'];
    // NEW: Counter to track which message to show
    let missCounter = 0;

    const createFireworks = (count) => {
        const containerRect = gameContainer.getBoundingClientRect();
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('firework-particle');
            fireworksContainer.appendChild(particle);
            const size = Math.random() * 15 + 10;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * containerRect.width}px`;
            particle.style.top = `${Math.random() * containerRect.height}px`;
            particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
            particle.style.animation = `explode ${Math.random() * 0.7 + 0.6}s forwards ease-out`;
            setTimeout(() => particle.remove(), 1500);
        }
    };

    const fireArrow = () => {
        if (!gameActive) return;
        gameActive = false;

        arrow.classList.add('fired');
        
        setTimeout(() => {
            const containerRect = gameContainer.getBoundingClientRect();
            const ravanaRect = ravanaTarget.getBoundingClientRect();
            
            const hitZoneCenter = containerRect.left + (containerRect.width / 2);
            const ravanaCenter = ravanaRect.left + ravanaRect.width / 2;
            const hitTolerance = 35;

            if (Math.abs(ravanaCenter - hitZoneCenter) < hitTolerance) {
                // --- WIN CONDITION ---
                ravanaTarget.style.animationPlayState = 'paused';
                ravanaTarget.classList.add('hit');
                arrow.classList.add('hit');

                setTimeout(() => {
                    const fireworksInterval = setInterval(() => createFireworks(10), 100);
                    jaiShriRamMessage.classList.add('visible');
                    
                    setTimeout(() => {
                        clearInterval(fireworksInterval);
                        if (gameWrapper) gameWrapper.style.display = 'none';
                        robuxReveal.classList.remove('hidden');
                    }, 3000);
                }, 200);

            } else {
                // --- LOSE CONDITION (UPDATED) ---
                // Set the text of the message from your array
                tryAgainMessage.textContent = missMessages[missCounter % missMessages.length];
                tryAgainMessage.classList.add('visible');
                
                // Increment the counter for the next miss
                missCounter++;
                
                setTimeout(() => {
                    tryAgainMessage.classList.remove('visible');
                    gameActive = true;
                }, 1000);
            }

            setTimeout(() => arrow.classList.remove('fired'), 300);

        }, 100);
    };

    gameContainer.addEventListener('click', fireArrow);
}

// --- NEW & IMPROVED: Mantra Scroller Functionality ---
const scroller = document.querySelector('.mantra-scroller');
const navContainer = document.querySelector('.mantra-nav');

if (scroller && navContainer) {
    const slides = document.querySelectorAll('.mantra-slide');
    
    // Create navigation dots (this part is the same)
    slides.forEach(() => {
        const dot = document.createElement('div');
        dot.classList.add('nav-dot');
        navContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.nav-dot');

    // NEW, smarter function to update the dots
    const updateNav = () => {
        const slideWidth = scroller.offsetWidth;
        const currentIndex = Math.round(scroller.scrollLeft / slideWidth);
        
        dots.forEach((dot, index) => {
            // Remove any previous state classes first
            dot.classList.remove('active', 'neighbor');

            const distance = Math.abs(index - currentIndex);

            if (distance === 0) {
                // This is the current, active dot
                dot.classList.add('active');
            } else if (distance === 1) {
                // These are the immediate neighbors
                dot.classList.add('neighbor');
            }
            // Any other dots will just have the default (faint and small) style
        });
    };

    // Initial call to set the dots correctly on page load
    updateNav();
    // Update dots on every scroll event
    scroller.addEventListener('scroll', updateNav);
}

