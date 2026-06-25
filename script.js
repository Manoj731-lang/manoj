/**
 * Pinnika Manoj - Personal Portfolio Script
 * Interactive features, animations, observers, and validation systems.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with your Public Key
    // Replace "YOUR_PUBLIC_KEY" with the actual public key from your EmailJS Account dashboard
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_PUBLIC_KEY");
    }

    // ----------------------------------------------------
    // 1. DYNAMIC TYPEWRITER EFFECT
    // ----------------------------------------------------
    const words = [
        "Python Developer", 
        "Django Developer", 
        "Full-Stack Developer", 
        "Backend Engineer"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterElement = document.getElementById('typewriter');
    
    function typeEffect() {
        if (!typewriterElement) return;

        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove character
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add character
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Typing/erasing delay adjustments
        let typingSpeed = isDeleting ? 40 : 100;
        
        // Word state transitions
        if (!isDeleting && charIndex === currentWord.length) {
            // Completed typing word - pause before deleting
            typingSpeed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Completed erasing word - switch to next
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    // Initialize Typewriter
    setTimeout(typeEffect, 800);


    // ----------------------------------------------------
    // 2. MOBILE MENU & TOGGLES
    // ----------------------------------------------------
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle && navMenu) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });


    // ----------------------------------------------------
    // 3. INTERSECTION OBSERVER FOR ACTIVE NAV LINKS
    // ----------------------------------------------------
    const sections = document.querySelectorAll('section');
    
    const activeNavObserverOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Match current reading zone
        threshold: 0
    };
    
    const activeNavObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, activeNavObserverOptions);
    
    sections.forEach(section => {
        activeNavObserver.observe(section);
    });


    // ----------------------------------------------------
    // 4. STATS COUNTER TICK-UP ANIMATION
    // ----------------------------------------------------
    const statsSection = document.getElementById('stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            const duration = 2000; // 2 seconds
            const start = 0;
            let startTime = null;
            
            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                
                // Ease out cubic multiplier
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.floor(easeOut * (target - start) + start);
                
                // Add positive suffix matching targets
                if (target === 15 || target === 3 || target === 10) {
                    stat.textContent = currentValue + "+";
                } else if (target === 500) {
                    stat.textContent = currentValue + "+";
                } else {
                    stat.textContent = currentValue;
                }
                
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    // Force display target precisely with suffix
                    stat.textContent = target + "+";
                }
            }
            
            window.requestAnimationFrame(step);
        });
    }
    
    if (statsSection && statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    animateCounters();
                    statsAnimated = true;
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        statsObserver.observe(statsSection);
    }


    // ----------------------------------------------------
    // 5. ANIMATE SKILLS PROGRESS BARS
    // ----------------------------------------------------
    const skillsSection = document.getElementById('skills');
    const skillFills = document.querySelectorAll('.skill-progress-fill');
    
    if (skillsSection && skillFills.length > 0) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillFills.forEach(fill => {
                        const targetWidth = fill.getAttribute('data-progress');
                        fill.style.width = targetWidth;
                    });
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        
        skillsObserver.observe(skillsSection);
    }


    // ----------------------------------------------------
    // 6. SCROLL REVEAL ANIMATIONS
    // ----------------------------------------------------
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Stop observing once animated
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        });
        
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }


    // ----------------------------------------------------
    // 7. BACK TO TOP BUTTON
    // ----------------------------------------------------
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show-btn');
            } else {
                backToTopBtn.classList.remove('show-btn');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // ----------------------------------------------------
    // 8. CONTACT FORM VALIDATION & FEEDBACK
    // ----------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('form-submit-btn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isFormValid = true;
            
            // Validate Name
            if (!nameInput.value.trim()) {
                showInputError(nameInput, 'name-error');
                isFormValid = false;
            } else {
                hideInputError(nameInput, 'name-error');
            }
            
            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                showInputError(emailInput, 'email-error', 'Please enter your email address.');
                isFormValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                showInputError(emailInput, 'email-error', 'Please enter a valid email address.');
                isFormValid = false;
            } else {
                hideInputError(emailInput, 'email-error');
            }
            
            // Validate Subject
            if (!subjectInput.value.trim()) {
                showInputError(subjectInput, 'subject-error');
                isFormValid = false;
            } else {
                hideInputError(subjectInput, 'subject-error');
            }
            
            // Validate Message
            if (!messageInput.value.trim()) {
                showInputError(messageInput, 'message-error');
                isFormValid = false;
            } else {
                hideInputError(messageInput, 'message-error');
            }
            
            // Handle valid submission
            if (isFormValid) {
                // Disable button and show sending state
                submitBtn.disabled = true;
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin btn-icon"></i>';
                
                // Prepare EmailJS parameters matching your template keys
                const templateParams = {
                    from_name: nameInput.value.trim(),
                    from_email: emailInput.value.trim(),
                    subject: subjectInput.value.trim(),
                    message: messageInput.value.trim(),
                    to_name: "Pinnika Manoj"
                };

                // Send email using EmailJS
                // Note: Replace "YOUR_SERVICE_ID" and "YOUR_TEMPLATE_ID" with actual identifiers
                emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
                    .then(() => {
                        showFormFeedback(true, 'Your message has been sent successfully. I will get back to you shortly.');
                        contactForm.reset();
                    })
                    .catch((error) => {
                        console.error('EmailJS Error:', error);
                        showFormFeedback(false, 'Failed to send message. Please try again later or email me directly.');
                    })
                    .finally(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    });
            }
        });
        
        // Add real-time input error removal on typing
        [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    const errorId = input.id.replace('form-', '') + '-error';
                    hideInputError(input, errorId);
                }
            });
        });
    }
    
    function showInputError(inputElement, errorElementId, customMsg = null) {
        inputElement.classList.add('invalid-input');
        const errorSpan = document.getElementById(errorElementId);
        if (errorSpan) {
            if (customMsg) {
                errorSpan.textContent = customMsg;
            }
            errorSpan.style.display = 'block';
        }
    }
    
    function hideInputError(inputElement, errorElementId) {
        inputElement.classList.remove('invalid-input');
        const errorSpan = document.getElementById(errorElementId);
        if (errorSpan) {
            errorSpan.style.display = 'none';
        }
    }

    let feedbackTimeout = null;
    function showFormFeedback(isSuccess, messageText) {
        if (!formFeedback) return;
        
        const feedbackTitle = formFeedback.querySelector('.feedback-title');
        const feedbackDesc = formFeedback.querySelector('.feedback-desc');
        const feedbackIcon = formFeedback.querySelector('.feedback-content i');
        
        if (isSuccess) {
            formFeedback.style.background = 'rgba(16, 185, 129, 0.12)';
            formFeedback.style.borderColor = 'rgba(16, 185, 129, 0.25)';
            if (feedbackTitle) {
                feedbackTitle.style.color = '#10b981';
                feedbackTitle.textContent = 'Success!';
            }
            if (feedbackIcon) {
                feedbackIcon.className = 'fa-solid fa-circle-check feedback-success-icon';
                feedbackIcon.style.color = '#10b981';
            }
        } else {
            formFeedback.style.background = 'rgba(239, 68, 68, 0.12)';
            formFeedback.style.borderColor = 'rgba(239, 68, 68, 0.25)';
            if (feedbackTitle) {
                feedbackTitle.style.color = '#ef4444';
                feedbackTitle.textContent = 'Error!';
            }
            if (feedbackIcon) {
                feedbackIcon.className = 'fa-solid fa-triangle-exclamation';
                feedbackIcon.style.color = '#ef4444';
            }
        }
        
        if (feedbackDesc) {
            feedbackDesc.textContent = messageText;
        }
        
        formFeedback.classList.remove('hide-feedback');
        formFeedback.classList.add('show-feedback');
        
        // Auto hide after 6 seconds
        if (feedbackTimeout) clearTimeout(feedbackTimeout);
        feedbackTimeout = setTimeout(() => {
            formFeedback.classList.remove('show-feedback');
            formFeedback.classList.add('hide-feedback');
        }, 6000);
    }


    // ----------------------------------------------------
    // 9. DYNAMIC FOOTER YEAR
    // ----------------------------------------------------
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
