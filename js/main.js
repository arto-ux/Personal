document.addEventListener("DOMContentLoaded", () => {
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

    // Go to top button functionality
    const goToTopBtn = document.getElementById('goToTop');
    goToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Prevent scrolling while loading
document.body.style.overflow = 'hidden';

// Wait for all resources to load
window.addEventListener('load', () => {
    // Add 3 second delay before starting fade
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        // Fade out loader over 0.5 seconds
        gsap.to(loader, {
            duration: 0.5,
            opacity: 0,
            onComplete: () => {
                loader.style.display = 'none';
                // Re-enable scrolling
                document.body.style.overflow = 'auto';
            }
        });
    }, 2900);
});
