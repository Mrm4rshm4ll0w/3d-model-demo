document.addEventListener("DOMContentLoaded", () => {
    // 1. Prevent Flash of Unstyled Content (FOUC)
    document.body.classList.add("loaded");

    // 2. Spline error fallback
    const splineViewer = document.querySelector("spline-viewer");
    const fallback = document.querySelector(".fallback-spline");
    if (splineViewer && fallback) {
        splineViewer.addEventListener("error", () => {
            fallback.classList.remove("d-none");
            splineViewer.style.display = "none";
        });
    }

    // 3. Language selector (Placeholder)
    const langSelector = document.querySelector(".lang-selector");
    if (langSelector) {
        langSelector.addEventListener("change", (e) => {
            console.log(`Language changed to: ${e.target.value}`);
            // TODO: Add actual language switching logic
        });
    }

    // 4. Animate-on-Scroll Intersection Observer
    const scrollObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const anim = el.dataset.anim || "animate__fadeInUp";
                const delay = el.dataset.delay || "0s";

                el.classList.add("animate__animated", anim);
                el.style.animationDelay = delay;
                el.style.opacity = "1";

                obs.unobserve(el); // Animate once
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        el.style.opacity = "0";
        scrollObserver.observe(el);
    });

    // 5. Navbar Animation on Scroll
    const navbar = document.querySelector('.animate-navbar');
    if (navbar) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navbar.classList.remove('animate__fadeOutUp');
                    navbar.classList.add('animate__animated', 'animate__fadeInDown');
                } else {
                    navbar.classList.remove('animate__fadeInDown');
                    navbar.classList.add('animate__animated', 'animate__fadeOutUp');
                }
            });
        }, {
            threshold: 0.1,
        });

        navObserver.observe(navbar);
    }

    // 6. Hero Section Animations with GSAP
    gsap.from("#hero-title", {
        opacity: 0,
        x: -80,
        duration: 0.6,
        ease: "power2.out"
    });

    gsap.from(["#nft-label", "#blockchain-word"], {
        opacity: 0,
        y: -20,
        scale: 0.9,
        duration: 0.4,
        ease: "back.out(1.7)",
        delay: 0.3,
        stagger: 0.1
    });

    gsap.from("#hero-description", {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: "power2.out",
        delay: 0.6
    });

    gsap.from("#partner-title", {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: "power1.out",
        delay: 0.8
    });

    gsap.from(".partner-icon", {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: "power1.out",
        delay: 0.9,
        stagger: 0.1
    });

    // 7. Core Values Section Spline Scroll Animation
    gsap.registerPlugin(ScrollTrigger);

    gsap.timeline({
        scrollTrigger: {
            trigger: ".core-values-modern",
            start: "top 80%",
            end: "bottom center",
            scrub: 0.5,
            toggleActions: "play none none none",
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    }).to("#animatedSplineWrapper", {
        top: "60%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        width: "45vw",
        height: "100vh",
        scale: 1.1,
        rotation: 6,
        ease: "power3.out",
        duration: 1.5
    });
});


// 8. Go to Top Button Logic
const goTopBtn = document.getElementById("goTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        goTopBtn.classList.add("show");
    } else {
        goTopBtn.classList.remove("show");
    }
});

goTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
