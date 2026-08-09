document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's a progress bar, animate it
                if (entry.target.classList.contains('progress-bar-fill')) {
                    entry.target.style.width = entry.target.parentElement.dataset.width || '100%';
                }

                // If it's a counter, animate it
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }

                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .progress-bar-fill, .stat-number');
    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Typing Effect (Hero)
    const typingTextElement = document.querySelector('.typing-text');
    if (typingTextElement) {
        // Use textContent to preserve invisible characters like &rlm;
        const originalText = typingTextElement.textContent;
        typingTextElement.textContent = '';
        let i = 0;
        
        // Start typing shortly after load
        setTimeout(() => {
            const typingInterval = setInterval(() => {
                if (i <= originalText.length) {
                    typingTextElement.textContent = originalText.substring(0, i);
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 50); // Typing speed
        }, 300); 
    }

    // 3. Counter Animation
    function animateCounter(counterEl) {
        const target = +counterEl.dataset.target || 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps

        let current = 0;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counterEl.innerText = Math.ceil(current) + (counterEl.dataset.suffix || '');
                requestAnimationFrame(updateCounter);
            } else {
                counterEl.innerText = target + (counterEl.dataset.suffix || '');
            }
        };
        updateCounter();
    }

    // 4. Parallax Effect (Hero)
    const heroSection = document.querySelector('.hero');
    const heroGlow = document.querySelector('.hero-glow');
    if (heroSection && heroGlow) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            // Move glow slightly based on mouse position
            heroGlow.style.transform = `translate(-50%, -50%) translate(${x * 50 - 25}px, ${y * 50 - 25}px)`;
        });
    }
});
