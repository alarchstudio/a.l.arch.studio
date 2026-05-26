// Wait for the document to be ready
document.addEventListener('DOMContentLoaded', function () {
    // --- DOM Elements Caching ---
    const loader = document.querySelector('.loader-container');
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const hoverElements = document.querySelectorAll('a, button, .nav-dot, .service-card');
    const slides = document.querySelectorAll('.carousel-item');
    const sections = document.querySelectorAll('section');
    const navDots = document.querySelectorAll('.nav-dot');
    const contactForm = document.getElementById('contactForm');
    const serviceCards = document.querySelectorAll('.service-card');
    const logoElement = document.querySelector('.fixed-logo');
    const revealElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .about-text, .about-img, .service-card, .contact-info, .contact-form-container');
    const sectionTitles = document.querySelectorAll('.section-title');
    const heroBg = document.querySelector('.hero-bg');
    const heroContent = document.querySelector('.hero-content');

    const totalSlides = slides.length;
    let currentSlide = 0;

    // --- Loader ---
    if (loader) {
        setTimeout(function () {
            loader.style.opacity = '0';
            setTimeout(function () {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    }

    // --- Custom Cursor ---
    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', function (e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            setTimeout(function () {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });

        document.addEventListener('mousedown', function () {
            cursor.style.width = '25px';
            cursor.style.height = '25px';
            cursorFollower.style.width = '6px';
            cursorFollower.style.height = '6px';
        });

        document.addEventListener('mouseup', function () {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursorFollower.style.width = '8px';
            cursorFollower.style.height = '8px';
        });

        // Hovering effect on links and buttons
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', function () {
                cursor.style.width = '50px';
                cursor.style.height = '50px';
                cursor.style.borderColor = '#c8a45d';
                cursorFollower.style.width = '1px';
                cursorFollower.style.height = '1px';
                cursorFollower.style.opacity = '0';
            });

            element.addEventListener('mouseleave', function () {
                cursor.style.width = '30px';
                cursor.style.height = '30px';
                cursor.style.borderColor = '#c8a45d';
                cursorFollower.style.width = '8px';
                cursorFollower.style.height = '8px';
                cursorFollower.style.opacity = '1';
            });
        });

        // Specific hover effects for Logo
        if (logoElement) {
            logoElement.addEventListener('mouseenter', function () {
                cursor.style.width = '100px';
                cursor.style.height = '100px';
                cursor.style.borderColor = '#c8a45d';
                cursorFollower.style.width = '1px';
                cursorFollower.style.height = '1px';
                cursorFollower.style.opacity = '0';
            });

            logoElement.addEventListener('mouseleave', function () {
                cursor.style.width = '30px'; // Corrected from 100px to 30px (shrink back)
                cursor.style.height = '30px'; // Corrected from 100px to 30px (shrink back)
                cursor.style.borderColor = '#c8a45d';
                cursorFollower.style.width = '8px';
                cursorFollower.style.height = '8px';
                cursorFollower.style.opacity = '1';
            });
        }
    }

    // --- Scroll reveal animations ---
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }

    // --- Light text effect animation ---
    function lightTextEffect() {
        const windowHeight = window.innerHeight;
        sectionTitles.forEach(title => {
            const rect = title.getBoundingClientRect();
            const isInViewport = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= windowHeight &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );

            if (isInViewport) {
                title.style.textShadow = '0 0 15px rgba(200, 164, 93, 0.6)';
                setTimeout(function () {
                    title.style.textShadow = 'none';
                }, 1500);
            }
        });
    }

    // --- Active Navigation Section Highlight ---
    function updateActiveSection() {
        let current = '';
        const scrollPos = window.scrollY || window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPos >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === current) {
                dot.classList.add('active');
            }
        });
    }

    // --- Hero Parallax & Fade ---
    function handleParallax() {
        const scrollPosition = window.scrollY || window.pageYOffset;

        if (heroBg) {
            heroBg.style.transform = `scale(1) translateY(${scrollPosition * 0.2}px)`;
        }

        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            heroContent.style.opacity = Math.max(0, 1 - (scrollPosition * 0.003));
        }
    }

    // --- Unified Scroll Event Handler ---
    window.addEventListener('scroll', function () {
        revealOnScroll();
        lightTextEffect();
        updateActiveSection();
        handleParallax();
    });

    // Run initial checks
    revealOnScroll();
    lightTextEffect();
    updateActiveSection();
    handleParallax();

    // --- Carousel for about section ---
    if (totalSlides > 0) {
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % totalSlides;
            slides[currentSlide].classList.add('active');
        }
        // Change slide every 4 seconds
        setInterval(nextSlide, 4000);
    }

    // --- Smooth scrolling for navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navigation dots click functionality
    navDots.forEach(dot => {
        dot.addEventListener('click', function () {
            const targetSection = this.getAttribute('data-section');
            const targetElement = document.querySelector(`#${targetSection}`);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Particles.js for hero section ---
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#c8a45d'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#c8a45d',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    // --- Form submission ---
    if (contactForm) {
        contactForm.addEventListener('submit', function () {
            // Show success animation
            const submitBtn = contactForm.querySelector('.submit-btn');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'MESSAGGIO INVIATO!';
                submitBtn.style.backgroundColor = '#28a745';

                setTimeout(function () {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '#c8a45d';
                    contactForm.reset();
                }, 3000);
            }
        });
    }

    // --- Service card animation & 3D rotate ---
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.classList.add('animate__animated', 'animate__heartBeat');
                setTimeout(function () {
                    icon.classList.remove('animate__animated', 'animate__heartBeat');
                }, 1000);
            }
        });

        card.addEventListener('mousemove', function (e) {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;

            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const rotateY = (mouseX - cardCenterX) / 15;
            const rotateX = (cardCenterY - mouseY) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'translateY(0)';
        });
    });
});