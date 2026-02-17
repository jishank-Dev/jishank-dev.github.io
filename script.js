// Intersection Observer for fade-in animations
document.addEventListener('DOMContentLoaded', () => {

    // Force scroll to top on refresh
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId.startsWith('#')) return;

            const targetElement = document.getElementById(targetId.substring(1));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const nav = document.querySelector('.nav');
                const menuToggle = document.querySelector('.menu-toggle');
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.project-card, .section-title, .hero-content > *, .contact-content > *');

    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // 3D Cube Interactions
    const cube = document.querySelector('.cube-3d');
    const cubeContainer = document.querySelector('.hero-3d-container');

    if (cube && cubeContainer) {
        let isMouseTracking = false;
        let currentRotationX = 0;
        let currentRotationY = 0;
        let animationSpeed = 20; // seconds

        // Mouse move tracking for rotation
        cubeContainer.addEventListener('mouseenter', () => {
            isMouseTracking = true;
            cube.style.animationPlayState = 'paused';
        });

        cubeContainer.addEventListener('mouseleave', () => {
            isMouseTracking = false;
            cube.style.animationPlayState = 'running';
        });

        cubeContainer.addEventListener('mousemove', (e) => {
            if (!isMouseTracking) return;

            const rect = cubeContainer.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            // Calculate rotation based on mouse position
            const rotateY = (mouseX / rect.width) * 60; // -30 to 30 degrees
            const rotateX = -(mouseY / rect.height) * 60; // -30 to 30 degrees

            currentRotationX = rotateX;
            currentRotationY = rotateY;

            cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        // Click to change rotation speed
        let speedIndex = 0;
        const speeds = [20, 10, 5, 30]; // seconds per rotation

        cube.addEventListener('click', () => {
            speedIndex = (speedIndex + 1) % speeds.length;
            animationSpeed = speeds[speedIndex];
            cube.style.animationDuration = `${animationSpeed}s`;

            // Visual feedback
            cube.style.transform = `scale(1.1) rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
            setTimeout(() => {
                cube.style.transform = `scale(1) rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
            }, 200);
        });
    }
});

// Copy to clipboard function
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        button.classList.add('copied');
        setTimeout(() => {
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}
