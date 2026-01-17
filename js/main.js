/* Cloudcroft Guide - Main JavaScript */
/* Lightweight, performant scripts for fast loading */

(function() {
    'use strict';

    // Mobile Navigation Toggle
    document.addEventListener('DOMContentLoaded', function() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                const hamburger = navToggle.querySelector('.hamburger');
                if (hamburger) {
                    hamburger.style.transform = navMenu.classList.contains('active')
                        ? 'rotate(45deg)'
                        : 'rotate(0)';
                }
            });

            // Close mobile menu when clicking a link
            navLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    const hamburger = navToggle.querySelector('.hamburger');
                    if (hamburger) {
                        hamburger.style.transform = 'rotate(0)';
                    }
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                    const hamburger = navToggle.querySelector('.hamburger');
                    if (hamburger) {
                        hamburger.style.transform = 'rotate(0)';
                    }
                }
            });
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 70; // Navbar height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    var navbar = document.getElementById('navbar');
    var lastScroll = 0;

    window.addEventListener('scroll', function() {
        var currentScroll = window.pageYOffset;

        if (navbar) {
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // Intersection Observer for scroll animations
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Apply animations to cards on load
    document.addEventListener('DOMContentLoaded', function() {
        var animatedElements = document.querySelectorAll(
            '.activity-card, .stay-card, .season-card, .event-card, .info-card, .dining-listing'
        );

        animatedElements.forEach(function(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    });

    // Contact Form Handling
    document.addEventListener('DOMContentLoaded', function() {
        var contactForm = document.getElementById('contactForm');

        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();

                var formData = new FormData(contactForm);
                var data = {};
                formData.forEach(function(value, key) {
                    data[key] = value;
                });

                // Form submission would go here
                console.log('Form submitted:', data);

                // Show success message
                alert('Thank you for your inquiry! We will get back to you soon.');
                contactForm.reset();
            });
        }
    });

    // Scroll to Top Button
    document.addEventListener('DOMContentLoaded', function() {
        var scrollTopBtn = document.getElementById('scrollTopBtn');

        if (scrollTopBtn) {
            // Show/hide based on scroll position
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 400) {
                    scrollTopBtn.classList.add('visible');
                } else {
                    scrollTopBtn.classList.remove('visible');
                }
            }, { passive: true });

            // Scroll to top on click
            scrollTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    });

    // Lazy load images that aren't using native lazy loading
    if ('IntersectionObserver' in window) {
        var imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    // Console welcome message
    console.log('%c Cloudcroft Guide ', 'background: #1a3a2f; color: #d4a65d; font-size: 16px; padding: 10px; border-radius: 4px;');
    console.log('%c Sacramento Mountains at 9,000 feet ', 'color: #2d6a4f; font-size: 12px;');

})();
