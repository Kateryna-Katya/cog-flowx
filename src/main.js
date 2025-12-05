document.addEventListener('DOMContentLoaded', () => {
    // === MOBILE MENU TOGGLE ===
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.header__link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('active');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    }

    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // === CURRENT YEAR ===
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // === HEADER SCROLL EFFECT ===
    // Добавляем тень при скролле для лучшей читаемости
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
        } else {
            header.style.boxShadow = "none";
        }
    });
});
/* --- HERO ANIMATION --- */
window.addEventListener('load', () => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Анимация текста (заголовок)
    const myText = new SplitType('#hero-title', { types: 'words, chars' });
    
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Появляется бейдж и статистика
    tl.from('.hero__badge', { y: -20, opacity: 0, duration: 0.8 })
      .from('.stat-item', { y: 20, opacity: 0, duration: 0.6, stagger: 0.2 }, "-=0.6");

    // Буквы заголовка "всплывают"
    tl.from(myText.chars, {
        y: 100,
        opacity: 0,
        rotationZ: 10,
        stagger: 0.05,
        duration: 0.8
    }, "-=0.4");

    // Описание и кнопки
    tl.from('.hero__desc', { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
      .from('.hero__actions', { y: 20, opacity: 0, duration: 0.6 }, "-=0.4");

    // 2. Анимация изображения (Curtain reveal)
    tl.to('.hero__curtain', {
        scaleY: 0,
        duration: 1.2,
        ease: "power2.inOut"
    }, "-=1.0");

    tl.to('.hero__img', {
        scale: 1,
        duration: 1.5,
        ease: "power2.out"
    }, "-=1.2");

    // 3. Анимация круглого бейджа (появление)
    tl.from('.hero__circle-badge', {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)"
    }, "-=0.8");
    
    // Параллакс эффект для круга при движении мыши
    const heroSection = document.querySelector('.hero');
    const circleBadge = document.querySelector('.hero__circle-badge');
    
    heroSection.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        gsap.to(circleBadge, {
            x: x,
            y: y,
            duration: 1,
            ease: "power2.out"
        });
    });
});