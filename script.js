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

    const closeLightbox = () => {
        lightbox.classList.remove('active');
    };

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            closeLightbox();
        }
    });
}

// --- NEW: Touch Halo Interactivity (High-Performance Version) ---
const touchHalo = document.getElementById('touch-halo');
if (touchHalo) {
    const updateHaloPosition = (e) => {
        const touch = e.touches[0];
        // Instead of changing top/left, we now update CSS variables for transform
        touchHalo.style.setProperty('--x', `${touch.clientX}px`);
        touchHalo.style.setProperty('--y', `${touch.clientY}px`);
    };

    document.addEventListener('touchstart', (e) => {
        touchHalo.classList.add('active');
        updateHaloPosition(e);
    });

    document.addEventListener('touchmove', (e) => {
        // This will now be much smoother
        updateHaloPosition(e);
    });

    document.addEventListener('touchend', () => {
        touchHalo.classList.remove('active');
    });
}
