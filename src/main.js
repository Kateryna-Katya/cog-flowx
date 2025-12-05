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