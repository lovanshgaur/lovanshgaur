document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. INITIAL REVEAL
    const tlLoad = gsap.timeline();
    tlLoad.to(document.body, { opacity: 1, duration: 0.5 })
        .to('.reveal-text', {
            y: 0,
            duration: 1.5,
            ease: "power4.out",
            stagger: 0.1
        }, "-=0.2");

    // 2. LENIS SMOOTH SCROLL
    const lenis = new Lenis({ duration: 1.2, smooth: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // 3. IMAGE REVEAL ON SCROLL
    gsap.utils.toArray('.reveal-img').forEach(container => {
        let img = container.querySelector('img');

        // Reveal container
        gsap.from(container, {
            clipPath: "inset(0 0 100% 0)",
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: {
                trigger: container,
                start: "top 85%"
            }
        });

        // Scale image inside
        gsap.from(img, {
            scale: 1.4,
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
                trigger: container,
                start: "top 85%"
            }
        });
    });

    // 4. HEADER SCROLL LOGIC
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });

    // 5. CURSOR LOGIC
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursor = document.querySelector('.cursor');
        const cursorOutline = document.querySelector('.cursor-outline');

        window.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            // Outline follows with delay
            cursorOutline.animate({
                left: `${e.clientX}px`,
                top: `${e.clientY}px`
            }, { duration: 500, fill: "forwards" });
        });

        document.querySelectorAll('.interactable').forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering');
            });
        });
    }
});

// 5. Theme Switcher Logic
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    htmlElement.setAttribute('data-theme', 'light');
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
} else {
    htmlElement.setAttribute('data-theme', 'dark');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'light') {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }

})