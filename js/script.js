// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Mobile Menu Logic
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const overlay = document.getElementById('overlay');
const body = document.body;

function toggleMenu() {
    if (!navLinks || !overlay) return;
    
    const isActive = navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    
    if (isActive) {
        body.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
    } else {
        body.classList.remove('menu-open');
        document.body.style.overflow = '';
    }
}

if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
if (overlay) overlay.addEventListener('click', toggleMenu);

const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) toggleMenu();
    });
});

// Scroll Visibility Animation
function checkVisibility() {
    const elements = document.querySelectorAll('.approach-card, .service-feature, .about-text, .about-image, .contact-info, .contact-form, .feature-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

let isScrolling = false;
window.addEventListener('scroll', function() {
    if (!isScrolling) {
        window.requestAnimationFrame(function() {
            checkVisibility();
            isScrolling = false;
        });
        isScrolling = true;
    }
});
window.addEventListener('load', checkVisibility);

// Form submission (Redirect)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you! Redirecting...');
        // Ideally redirect to thank-you.html if it exists, or just alert
        // window.location.href = 'thank-you.html'; 
        contactForm.reset();
    });
}

// Active Page Highlighter
document.addEventListener('DOMContentLoaded', function() {
    // This is handled by hardcoded classes in HTML for simplicity in static site
    // But this JS ensures it works if you navigate cleanly
    const currentLocation = location.pathname.split('/').pop() || 'index.html';
    const menuItems = document.querySelectorAll('.nav-links a');
    
    menuItems.forEach(item => {
        const linkPath = item.getAttribute('href');
        if (linkPath === currentLocation) {
            // Remove active from all first
            menuItems.forEach(i => i.classList.remove('active-page'));
            item.classList.add("active-page");
        }
    });
});

// Custom Cursor Logic
if (window.matchMedia("(min-width: 769px)").matches) {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const hoverElements = document.querySelectorAll('a, button, .btn, input, textarea, .menu-toggle, .slider-btn');
    hoverElements.forEach(item => {
        item.addEventListener('mouseover', () => cursor.classList.add('expand'));
        item.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
    });
}

// Typewriter Effect
const typeWriterElement = document.querySelector(".typewriter");
if (typeWriterElement) {
    const texts = ["ADVANCED AI SOLUTIONS", "CYBER DEFENSE SYSTEMS", "NEURAL INTELLIGENCE"];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";

    (function type() {
        if (count === texts.length) count = 0;
        currentText = texts[count];
        letter = currentText.slice(0, ++index);

        typeWriterElement.textContent = letter;
        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 2000);
        } else {
            setTimeout(type, 100);
        }
    })();
}

/* --- CYBERSECURITY SLIDER LOGIC --- */
const testimonialsTrack = document.getElementById('testimonialsTrack');
if (testimonialsTrack) {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderDots = document.getElementById('sliderDots');
    const slides = document.querySelectorAll('.testimonial-slide');
    
    let currentSlide = 0;
    let slidesPerView = 1;
    
    function updateSlidesPerView() {
        if (window.innerWidth >= 1024) slidesPerView = 3;
        else if (window.innerWidth >= 768) slidesPerView = 2;
        else slidesPerView = 1;
        createDots();
        updateSlider();
    }
    
    function createDots() {
        if(!sliderDots) return;
        sliderDots.innerHTML = '';
        const totalDots = slides.length - slidesPerView + 1;
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            if(i === currentSlide) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentSlide = i;
                updateSlider();
            });
            sliderDots.appendChild(dot);
        }
    }
    
    function updateSlider() {
        const slideWidth = slides[0].offsetWidth + 30; // 30 is the gap
        const maxSlide = slides.length - slidesPerView;
        if (currentSlide > maxSlide) currentSlide = maxSlide;
        if (currentSlide < 0) currentSlide = 0;
        
        testimonialsTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            if(index === currentSlide) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }
    
    if(prevBtn) prevBtn.addEventListener('click', () => { if(currentSlide > 0) { currentSlide--; updateSlider(); }});
    if(nextBtn) nextBtn.addEventListener('click', () => { if(currentSlide < slides.length - slidesPerView) { currentSlide++; updateSlider(); }});
    
    window.addEventListener('resize', updateSlidesPerView);
    window.addEventListener('load', updateSlidesPerView);
}

/* --- [NEW] NEURAL NETWORK ANIMATION CONFIG --- */
if (document.getElementById('particles-js')) {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#6C63FF" },
            "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" } },
            "opacity": { "value": 0.5, "random": false, "anim": { "enable": false } },
            "size": { "value": 3, "random": true, "anim": { "enable": false } },
            "line_linked": { "enable": true, "distance": 150, "color": "#6C63FF", "opacity": 0.2, "width": 1 },
            "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } }
        },
        "retina_detect": true
    });
}