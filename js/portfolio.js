document.addEventListener('DOMContentLoaded', () => {
    // 1. Portfolio Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const portfolioGrids = document.querySelectorAll('.portfolio-grid');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            portfolioGrids.forEach(g => g.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            const target = document.getElementById(btn.dataset.target);
            if (target) {
                target.classList.add('active');
            }
        });
    });

    // 2. Modals (UI/UX Overlay)
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const closeBtns = document.querySelectorAll('.close-overlay');
    const overlays = document.querySelectorAll('.portfolio-overlay');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = trigger.getAttribute('data-modal-target');
            const targetModal = document.getElementById(targetId);
            if (targetModal) {
                targetModal.style.display = 'block';
                // Slight delay for animation
                setTimeout(() => {
                    targetModal.classList.add('active');
                }, 10);
                document.body.style.overflow = 'hidden'; // Lock scroll
            }
        });
    });

    function closeModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 400); // Wait for transition
    }

    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = btn.closest('.portfolio-overlay');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    // Close on click outside or ESC key
    overlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay);
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.portfolio-overlay.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
});
