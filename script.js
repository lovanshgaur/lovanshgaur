// 1. Cursor Logic
const cursor = document.querySelector('.cursor');
const hoverTriggers = document.querySelectorAll('.hover-trigger');

if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    hoverTriggers.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
        });
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
        });
    });
}

// 2. GSAP Animations
gsap.registerPlugin(ScrollTrigger);

gsap.to('.word', {
    y: 0,
    stagger: 0.1,
    duration: 1.2,
    ease: "power4.out",
    delay: 0.2
});

gsap.from('.hero-desc', {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 0.8
});

gsap.to('.hero-title', {
    yPercent: 50,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// 3. Project Section Logic

if (window.innerWidth > 992) {
    const projects = document.querySelectorAll('.project-item');
    var rotate = 0;
    var diff = 0;
    projects.forEach(project => {
        project.addEventListener('mousemove', (dets) => {
            let rect = project.getBoundingClientRect()
            let y = dets.clientY - rect.top

            diff = dets.clientX - rotate;
            rotate = dets.clientX;

            gsap.to(project.querySelector("img"), {
                opacity: 1,
                ease: Power3,
                top: y,
                left: dets.clientX,
                rotate: gsap.utils.clamp(-20, 20, diff * 0.5)

            })
        });

        project.addEventListener('mouseleave', () => {
            gsap.to(project.querySelector("img"), { opacity: 0, scale: 0.8, duration: 0.3, overwrite: true });
        });
    });
}


// 4. ScrollDown Button Logic
function scrollDown() {
    const aboutSection = document.getElementById('about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
}

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
});

// 6. Mobile Menu Logic
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');

    if (mobileMenu.classList.contains('open')) {
        lenis.stop();
    } else {
        lenis.start();
    }
});

mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        lenis.start();
        if (targetId !== '#') lenis.scrollTo(targetId);
    });
});

// 7. IST Clock Logic
function updateClock() {
    const clockElement = document.getElementById('clock');
    const options = {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const timeString = new Date().toLocaleTimeString('en-US', options);
    clockElement.textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

// 8. Initialize Lenis
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

document.querySelectorAll('.nav-link, .logo').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') lenis.scrollTo(targetId);
    });
});