/* ==========================================
   PLASTIC SURGEON — CLINICAL PREMIUM TEMPLATE
   script.js
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- CURRENT YEAR ---------- */
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }


    /* ---------- HEADER SCROLL STATE ---------- */
    const header = document.getElementById('siteHeader');

    const updateHeader = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();


    /* ---------- MOBILE MENU ---------- */
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mainNav.classList.toggle('open');
            document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
        });

        // Close menu when clicking a nav link
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                mainNav.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }


    /* ---------- SMOOTH SCROLL ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 72;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    /* ---------- FAQ ACCORDION ---------- */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            faqItems.forEach(other => {
                other.classList.remove('active');
                other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });


    /* ---------- ENTRANCE ANIMATIONS ---------- */
    const animatedEls = document.querySelectorAll('[data-animate]');

    if (animatedEls.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        animatedEls.forEach(el => observer.observe(el));
    } else {
        // Fallback: show all immediately
        animatedEls.forEach(el => el.classList.add('visible'));
    }

});
