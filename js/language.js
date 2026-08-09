function toggleLanguage() {
    const html = document.documentElement;
    const isRTL = html.getAttribute('dir') === 'rtl';
    const langBtn = document.getElementById('lang-btn');
    
    // Add a quick fade out/in effect for smoother transition
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        if (isRTL) {
            // Switch to English (LTR)
            html.setAttribute('dir', 'ltr');
            html.setAttribute('lang', 'en');
            langBtn.innerText = 'العربية';
            
            // Swap text content
            document.querySelectorAll('[data-en]').forEach(el => {
                if (!el.dataset.ar) {
                    // Save original Arabic text
                    el.dataset.ar = el.innerHTML;
                }
                el.innerHTML = el.dataset.en;
            });
        } else {
            // Switch back to Arabic (RTL)
            html.setAttribute('dir', 'rtl');
            html.setAttribute('lang', 'ar');
            langBtn.innerText = 'English';
            
            // Restore Arabic text
            document.querySelectorAll('[data-en]').forEach(el => {
                if (el.dataset.ar) {
                    el.innerHTML = el.dataset.ar;
                }
            });
        }
        
        // Re-trigger typing animation if in hero section
        const typingTextElement = document.querySelector('.typing-text');
        if (typingTextElement) {
            const currentLangText = isRTL ? typingTextElement.dataset.en : typingTextElement.dataset.ar;
            typingTextElement.innerText = currentLangText || '';
        }

        document.body.style.opacity = '1';
    }, 300);
}
