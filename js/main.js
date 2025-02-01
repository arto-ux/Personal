document.addEventListener("DOMContentLoaded", () => {
    // Sidebar Toggle
    const burgerMenu = document.querySelector('.burger-menu');
    const sidebar = document.querySelector('.sidebar');
    const menuLinks = document.querySelectorAll('.sidebar .menu a');

    burgerMenu.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        burgerMenu.classList.toggle('active');
    });

    menuLinks.forEach((link) => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('active');
            burgerMenu.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && !sidebar.contains(e.target) && !burgerMenu.contains(e.target)) {
            sidebar.classList.remove('active');
            burgerMenu.classList.remove('active');
        }
    });

    // GSAP Scroll Animations
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('.reveal-type').forEach((element) => {
        const bgColor = element.dataset.bgColor;
        const fgColor = element.dataset.fgColor;
        const text = new SplitType(element, { types: 'words' });

        gsap.fromTo(
            text.words,
            { color: bgColor },
            {
                color: fgColor,
                duration: 0.4,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: true,
                },
            }
        );
    });

    // List Animation
    const animatedLists = document.querySelectorAll('.animated-list');

    // Iterate through each list to create separate animations
    animatedLists.forEach((list) => {
    const listItems = list.querySelectorAll('*');

    // Create a GSAP timeline for each list
    const tl = gsap.timeline({
        scrollTrigger: {
        trigger: list,          
        start: "top 80%",       
        end: "top 20%",         
        toggleActions: 'play none none none',
        },
    });

    // Define the animation for list items
    tl.to(listItems, {
        opacity: 1,
        x: 0,                
        stagger: 0.1,        
        duration: 0.4,     
        ease: "power2.out",  
    });
    });

    // Fade Animation
    document.querySelectorAll('.fade').forEach((fadeIn) => {
        gsap.fromTo(
            fadeIn,
            { autoAlpha: 0, scale: 0.8 },
            {
                autoAlpha: 1,
                scale: 1,
                scrollTrigger: {
                    trigger: fadeIn,
                    start: 'top 80%',
                    end: 'top 20%',
                    toggleActions: 'play none none none',
                },
                ease: 'power2.out'
            }
        );
    });

    // Rotate Image
    document.querySelectorAll('.rotate-image').forEach((rotateImage) => {
        const initialRotation = Math.random() * 10 - 5;
        const finalRotation = Math.random() * 8 - 4;

        gsap.fromTo(
            rotateImage,
            { scale: 0.8, rotation: initialRotation },
            {
                scale: 1,
                rotation: finalRotation,
                scrollTrigger: {
                    trigger: rotateImage,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: true,
                },
                ease: 'power2.out'
            }
        );
    });

    // Zoom
    gsap.timeline({
        scrollTrigger: {
            trigger: '#pin',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            scroller: document.body,
        }
    }).to('.zoomed-in', {
        scale: 1.5,
        opacity: 0,
        rotation: 10,
    });

    // Custom Cursor with Smooth Motion
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.width = '24px';
    cursor.style.height = '24px';
    cursor.style.borderRadius = '50%';
    cursor.style.background = 'rgba(16, 185, 129, 0.2)';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '999999';
    cursor.style.top = '0';
    cursor.style.left = '0';
    cursor.style.mixBlendMode = 'normal';
    document.body.appendChild(cursor);

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    function updateCursorVisibility() {
        if (window.innerWidth < 1280) {
            cursor.style.display = 'none';
        } else {
            cursor.style.display = 'block';
        }
    }

    window.addEventListener('resize', updateCursorVisibility);
    updateCursorVisibility();

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        posX += (mouseX - posX) * 0.4;
        posY += (mouseY - posY) * 0.4;
        cursor.style.transform = `translate(${posX - 12}px, ${posY - 12}px)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Lenis Smooth Scrolling
    const lenis = new Lenis({
        duration: 1,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        wheelMultiplier: 0.7,
        touchMultiplier: 0.7,
    });

    function animateLenis(time) {
        lenis.raf(time);
        requestAnimationFrame(animateLenis);
    }
    requestAnimationFrame(animateLenis);

    // Smooth scrolling for menu links
    function highlightMenu() {
        let currentSectionId = '';
        document.querySelectorAll('section').forEach((section) => {
            if (window.scrollY >= section.offsetTop - section.offsetHeight / 3) {
                currentSectionId = section.getAttribute('id');
            }
        });

        menuLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', highlightMenu);

    // Hover Video Effects
    document.querySelectorAll('.highlight-word').forEach(word => {
        const videoId = word.dataset.video;
        const videoEl = document.getElementById(videoId);

        function handleMouseMove(e) {
            videoEl.style.left = `${e.pageX - 100}px`;
            videoEl.style.top = `${e.pageY - 240}px`;
        }

        word.addEventListener('mouseenter', () => {
            document.addEventListener('mousemove', handleMouseMove);
            gsap.to(videoEl, { duration: 0.4, opacity: 1, onStart: () => videoEl.play() });
        });

        word.addEventListener('mouseleave', () => {
            document.removeEventListener('mousemove', handleMouseMove);
            gsap.to(videoEl, {
                duration: 0.4,
                opacity: 0,
                onComplete: () => {
                    videoEl.pause();
                    videoEl.currentTime = 0;
                }
            });
        });
    });

    // Loading Animation
    document.body.style.overflow = "hidden";
    gsap.fromTo(
        ".progress-bar",
        { width: "0%" },
        {
            width: "100%",
            duration: 3,
            ease: "power2.inOut",
            onComplete: () => {
                gsap.to(".loader", {
                    autoAlpha: 0,
                    duration: 0.4,
                    onComplete: () => {
                        document.body.style.overflow = "auto";
                    }
                });
            }
        }
    );

    // Overlay Toggle
    window.toggleOverlay = function() {
        document.getElementById('overlay').classList.toggle('active');
    };

    // Disable Right-Click & DevTools
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.onkeydown = (e) => {
        if ([123, 73, 67, 85].includes(e.keyCode) && (e.ctrlKey || e.shiftKey)) return false;
    };
});
