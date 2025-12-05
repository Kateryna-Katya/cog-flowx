document.addEventListener('DOMContentLoaded', () => {
    // === 1. NAVIGATION LOGIC (Навигация) ===
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.header__link');
    const header = document.querySelector('.header');

    // Открытие/закрытие меню
    if (navToggle) {
        navToggle.addEventListener('click', () => navMenu.classList.add('active'));
    }
    if (navClose) {
        navClose.addEventListener('click', () => navMenu.classList.remove('active'));
    }
    navLinks.forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('active'));
    });

    // Тень хедера при скролле
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
        } else {
            header.style.boxShadow = "none";
        }
    });

    // Текущий год в футере
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // === 2. COOKIE POPUP (Куки) ===
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieAccept = document.getElementById('cookie-accept');

    // Проверка Local Storage
    if (!localStorage.getItem('cookieAccepted')) {
        setTimeout(() => {
            if(cookiePopup) cookiePopup.classList.add('show');
        }, 2000);
    }

    if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookieAccepted', 'true');
            if(cookiePopup) cookiePopup.classList.remove('show');
        });
    }

    // === 3. CONTACT FORM (Форма) ===
    const contactForm = document.getElementById('contact-form');
    const phoneInput = document.getElementById('phone');
    const phoneError = document.getElementById('phone-error');
    const captchaInput = document.getElementById('captcha');
    const captchaError = document.getElementById('captcha-error');
    const captchaQuestion = document.getElementById('captcha-question');
    const formMessage = document.getElementById('form-message');

    // Генерация математической капчи
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    if (captchaQuestion) {
        captchaQuestion.textContent = `${num1} + ${num2} = ?`;
    }

    // Разрешаем вводить в телефон только цифры и плюс
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9+]/g, '');
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            phoneError.textContent = "";
            captchaError.textContent = "";
            formMessage.textContent = "";
            formMessage.className = "form__message";

            // Валидация телефона (простая проверка длины)
            if (phoneInput.value.length < 10) {
                phoneError.textContent = "Введите корректный номер";
                isValid = false;
            }

            // Валидация капчи
            if (parseInt(captchaInput.value) !== (num1 + num2)) {
                captchaError.textContent = "Неверное решение";
                isValid = false;
            }

            if (isValid) {
                // Имитация отправки (AJAX)
                const btn = contactForm.querySelector('button');
                const originalText = btn.textContent;
                btn.textContent = "Отправка...";
                btn.disabled = true;

                setTimeout(() => {
                    // Успешная отправка с правильной почтой
                    formMessage.textContent = "Спасибо! Мы свяжемся с вами через hello@cog-flowx.ink";
                    formMessage.classList.add('success');
                    contactForm.reset();
                    btn.textContent = originalText;
                    btn.disabled = false;
                    
                    // Сброс капчи
                    num1 = Math.floor(Math.random() * 10) + 1;
                    num2 = Math.floor(Math.random() * 10) + 1;
                    captchaQuestion.textContent = `${num1} + ${num2} = ?`;
                }, 1500);
            }
        });
    }
});

/* === 4. ANIMATIONS (GSAP) === */
// Запускаем анимации только после полной загрузки страницы (картинки, шрифты)
window.addEventListener('load', () => {
    // Проверка наличия библиотеки GSAP
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP not loaded');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // --- HERO SECTION ---
    const heroTitle = document.querySelector('#hero-title');
    if (heroTitle) {
        // Проверяем SplitType
        if(typeof SplitType !== 'undefined') {
            const myText = new SplitType('#hero-title', { types: 'words, chars' });
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from('.hero__badge', { y: -20, opacity: 0, duration: 0.8 })
              .from('.stat-item', { y: 20, opacity: 0, duration: 0.6, stagger: 0.2 }, "-=0.6")
              .from(myText.chars, { y: 100, opacity: 0, rotationZ: 10, stagger: 0.05, duration: 0.8 }, "-=0.4")
              .from('.hero__desc', { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
              .from('.hero__actions', { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
              .to('.hero__curtain', { scaleY: 0, duration: 1.2, ease: "power2.inOut" }, "-=1.0")
              .to('.hero__img', { scale: 1, duration: 1.5, ease: "power2.out" }, "-=1.2")
              .from('.hero__circle-badge', { scale: 0, rotation: -180, opacity: 0, duration: 1, ease: "back.out(1.7)" }, "-=0.8");
        } else {
            // Фолбек, если SplitType не подгрузился
            gsap.from('.hero__title', { y: 50, opacity: 0, duration: 1 });
            gsap.to('.hero__curtain', { scaleY: 0, duration: 1.2 });
        }
          
         // Параллакс эффект для мыши
        const heroSection = document.querySelector('.hero');
        const circleBadge = document.querySelector('.hero__circle-badge');
        if (heroSection && circleBadge) {
            heroSection.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 20;
                const y = (e.clientY / window.innerHeight - 0.5) * 20;
                gsap.to(circleBadge, { x: x, y: y, duration: 1, ease: "power2.out" });
            });
        }
    }

    // --- EXPERTISE CARDS (Исправлено исчезновение) ---
    const cards = gsap.utils.toArray('.card');
    if(cards.length > 0) {
        // Сначала скрываем элементы через JS (autoAlpha: 0 = opacity: 0 + visibility: hidden)
        gsap.set(cards, { autoAlpha: 0, y: 50 }); 
        
        ScrollTrigger.batch(cards, {
            start: "top 90%",
            onEnter: batch => gsap.to(batch, {
                autoAlpha: 1, 
                y: 0, 
                stagger: 0.15, 
                duration: 0.8, 
                ease: "power2.out",
                overwrite: true
            })
        });
    }

    // --- METHODOLOGY BLOCKS ---
    const blocks = gsap.utils.toArray('.methodology__block');
    if(blocks.length > 0) {
        gsap.set(blocks, { autoAlpha: 0, x: -50 });
        
        ScrollTrigger.batch(blocks, {
            start: "top 85%",
            onEnter: batch => gsap.to(batch, {
                autoAlpha: 1,
                x: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: "power2.out"
            })
        });
    }

    // --- INNOVATIONS (ADAPTIVE SCROLL) ---
    // Используем matchMedia для разделения логики ПК и Телефона
    ScrollTrigger.matchMedia({
        
        // Desktop: Горизонтальный скролл
        "(min-width: 768px)": function() {
            const track = document.querySelector(".innovations__track");
            
            if (track) {
                // Вычисляем длину скролла (ширина контента минус ширина экрана)
                let scrollAmount = track.scrollWidth - window.innerWidth;
                
                gsap.to(track, {
                    x: -scrollAmount,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".innovations",
                        pin: true,        // Фиксируем секцию
                        pinSpacing: true, // Добавляем отступ снизу
                        scrub: 1,         // Привязка к скроллу
                        end: () => "+=" + scrollAmount, // Длина прокрутки
                        invalidateOnRefresh: true
                    }
                });
            }
        },
        
        // Mobile: Обычное появление при скролле вниз
        "(max-width: 767px)": function() {
             gsap.utils.toArray('.innovations__item').forEach(item => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 90%"
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.6
                });
             });
        }
    });

});