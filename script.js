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
    const viewportHeight = window.innerHeight;
    window.scrollBy({
        top: viewportHeight,
        left: 0,
        behavior: 'smooth'
    });
}