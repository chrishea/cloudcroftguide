/* Cloudcroft Guide - Main JavaScript */

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animate hamburger icon
            const hamburger = navToggle.querySelector('.hamburger');
            hamburger.style.transform = navMenu.classList.contains('active')
                ? 'rotate(45deg)'
                : 'rotate(0)';
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const hamburger = navToggle.querySelector('.hamburger');
            if (hamburger) {
                hamburger.style.transform = 'rotate(0)';
            }
        });
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
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

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all activity cards and other animated elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.activity-card, .stay-card, .dining-listing');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Here you would typically send the data to a server
            console.log('Form submitted:', data);

            // Show success message
            alert('Thank you for your inquiry! We will get back to you soon.');

            // Reset form
            contactForm.reset();

            // Reset file upload
            const fileName = document.querySelector('.file-name');
            const fileInfo = document.querySelector('.file-upload-info');
            const removeBtn = document.querySelector('.file-remove-btn');
            const fileLabel = document.querySelector('.file-upload-label');

            if (fileName) fileName.textContent = 'No file chosen';
            if (fileInfo) fileInfo.classList.remove('active');
            if (removeBtn) removeBtn.style.display = 'none';
            if (fileLabel) fileLabel.style.display = 'flex';
        });
    }
});

// Scroll to Top Button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.id = 'scrollTopBtn';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Scroll to top when clicked
scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect
scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.backgroundColor = '#2C5F8E';
    this.style.transform = 'translateY(-3px)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.backgroundColor = '#4A90C5';
    this.style.transform = 'translateY(0)';
});

// File Upload Functionality
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('file-upload');
    const fileLabel = document.querySelector('.file-upload-label');
    const fileInfo = document.querySelector('.file-upload-info');
    const fileName = document.querySelector('.file-name');
    const fileSize = document.querySelector('.file-size');
    const removeBtn = document.querySelector('.file-remove-btn');
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    if (fileInput && fileLabel && fileInfo) {
        // Handle file selection
        fileInput.addEventListener('change', function(e) {
            handleFileSelect(e.target.files[0]);
        });

        // Drag and drop functionality
        fileLabel.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.add('drag-over');
        });

        fileLabel.addEventListener('dragleave', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.remove('drag-over');
        });

        fileLabel.addEventListener('drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.remove('drag-over');

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileSelect(files[0]);
            }
        });

        // Remove file button
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                fileInput.value = '';
                fileInfo.classList.remove('active');
                fileName.textContent = 'No file chosen';
                fileSize.textContent = '';
                removeBtn.style.display = 'none';
                fileLabel.style.display = 'flex';
            });
        }

        function handleFileSelect(file) {
            if (!file) return;

            // Validate file size
            if (file.size > maxFileSize) {
                alert('File is too large. Maximum size is 5MB.');
                fileInput.value = '';
                return;
            }

            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp',
                                 'application/pdf', 'application/msword',
                                 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

            if (!allowedTypes.includes(file.type)) {
                alert('Invalid file type. Please upload an image, PDF, or DOC file.');
                fileInput.value = '';
                return;
            }

            // Display file information
            fileName.textContent = file.name;
            fileSize.textContent = formatFileSize(file.size);
            fileInfo.classList.add('active');
            removeBtn.style.display = 'block';
            fileLabel.style.display = 'none';
        }

        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
        }
    }
});

// Console Message
console.log('%c Welcome to Cloudcroft Guide! ', 'background: #4A90C5; color: white; font-size: 16px; padding: 10px;');
console.log('%c Built with love for the Sacramento Mountains ', 'color: #2C5F8E; font-size: 12px;');
