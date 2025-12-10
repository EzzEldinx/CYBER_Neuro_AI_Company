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

if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

if (overlay) {
    overlay.addEventListener('click', toggleMenu);
}

const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

document.addEventListener('click', function(e) {
    if (navLinks && navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        menuToggle && !menuToggle.contains(e.target)) {
        toggleMenu();
    }
});

function checkVisibility() {
    const elements = document.querySelectorAll('.approach-card, .service-feature, .about-text, .about-image, .contact-info, .contact-form');
    
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

// Initial check on page load
window.addEventListener('load', checkVisibility);

// Form submission with redirection
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Redirect to the Thank You page
        window.location.href = 'thank-you.html';
    });
}