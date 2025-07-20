// Load header and footer components
async function loadComponent(containerId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// Set active page in navigation
function setActivePage(pageName) {
    // Wait for header to load, then set active state
    setTimeout(() => {
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageName) {
                link.classList.add('active');
            }
        });
    }, 100);
}

// Mobile menu toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (navLinks && menuToggle) {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    }
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
}

// Contact form submission handler
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    event.target.reset();
    
    // Here you would typically send the data to your server
    console.log('Form data:', data);
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards that should animate on scroll
    document.querySelectorAll('.service-card, .content-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Add floating animation delays
function initFloatingAnimations() {
    document.querySelectorAll('.service-card.floating').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize the site
function initSite() {
    // Load header and footer components
    loadComponent('header-container', 'components/header.html');
    loadComponent('footer-container', 'components/footer.html');
    
    // Initialize animations and interactions
    initScrollAnimations();
    initFloatingAnimations();
    initSmoothScrolling();
    
    // Add event listeners
    window.addEventListener('scroll', handleHeaderScroll);
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initSite);

// Global functions that need to be accessible from HTML
window.toggleMenu = toggleMenu;
window.handleFormSubmit = handleFormSubmit;
window.setActivePage = setActivePage;