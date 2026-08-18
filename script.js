/**
 * Pinnika Manoj - Personal Portfolio Script
 * Interactive features, animations, observers, and validation systems.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with Public Key
    if (typeof emailjs !== 'undefined') {
        emailjs.init("x4EKl5UqcBl9TN7CB");
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

                // EmailJS Configuration
                const SERVICE_ID = "service_ga0j96j";
                const ADMIN_TEMPLATE_ID = "template_g49lm9n"; // Email notification sent to Manoj
                const AUTOREPLY_TEMPLATE_ID = ""; // Optional: Auto-reply template ID for visitor (leave empty if using EmailJS Auto-Reply tab)

                // Send email notification to Admin (and optionally Auto-Reply to visitor)
                const sendPromises = [emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, templateParams)];
                
                if (AUTOREPLY_TEMPLATE_ID && AUTOREPLY_TEMPLATE_ID !== "YOUR_AUTOREPLY_TEMPLATE_ID") {
                    sendPromises.push(emailjs.send(SERVICE_ID, AUTOREPLY_TEMPLATE_ID, templateParams));
                }

                Promise.all(sendPromises)
                    .then(() => {
                        showFormFeedback(true, 'Your message has been sent successfully! A confirmation email has been sent to your inbox.');
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


    // ----------------------------------------------------
    // 10. AI CHATBOT ENGINE (CHATGPT INTEGRATION & SMART FALLBACK)
    // ----------------------------------------------------
    const aiWrapper = document.getElementById('ai-chatbot-wrapper');
    const aiTrigger = document.getElementById('ai-chatbot-trigger');
    const aiWindow = document.getElementById('ai-chatbot-window');
    const aiCloseBtn = document.getElementById('ai-close-btn');
    const aiClearBtn = document.getElementById('ai-clear-btn');
    const aiSettingsBtn = document.getElementById('ai-settings-btn');
    const aiSettingsPanel = document.getElementById('ai-settings-panel');
    const aiSettingsClose = document.getElementById('ai-settings-close');
    const aiApiKeyInput = document.getElementById('ai-api-key-input');
    const aiSaveKeyBtn = document.getElementById('ai-save-key-btn');
    const aiKeyStatus = document.getElementById('ai-key-status');
    const aiChatBody = document.getElementById('ai-chat-body');
    const aiChatForm = document.getElementById('ai-chat-form');
    const aiChatInput = document.getElementById('ai-chat-input');
    const aiTypingWrapper = document.getElementById('ai-typing-wrapper');
    const aiChipsContainer = document.getElementById('ai-suggestions-container');

    // System Context Prompt for ChatGPT
    const MANOJ_SYSTEM_PROMPT = `
You are the personal AI Assistant for Pinnika Manoj. Answer user questions enthusiastically, accurately, professionally, and concisely in friendly Markdown format based on Pinnika Manoj's background profile.

--- PROFILE ---
- Name: Pinnika Manoj
- Title: Python Developer | Django Developer | Full-Stack Web Engineer
- Location: Hyderabad, Telangana, India
- Email: manojpinnika2002@gmail.com
- Phone / WhatsApp: +91 70325 54637
- GitHub: https://github.com/manojpinnika
- LinkedIn: https://linkedin.com/in/pinnika-manoj-7a28b8257

--- WORK EXPERIENCE ---
1. Python Developer | Smarttopia Edutech Pvt. Ltd. (Apr 2026 – Present)
   - Built and deployed 3 live production websites: smarttopiaedutech.com, smarttopia.in, and dsrcloudtech.com using Python, Django, and REST APIs.
   - Designed scalable backend architectures, database models, and API endpoints for high-traffic educational platforms.
   - Optimized application performance through code refactoring, query optimization, and caching strategies.
2. Python Developer Intern | KIGA IT Solutions (Jan 2026 – Apr 2026)
   - Contributed to corporate website development, RESTful APIs, and relational database models in Agile setup.

--- EDUCATION ---
1. MCA (Master of Computer Applications) - Andhra Loyola College, Vijayawada (2022–2024, CGPA: 8.1 / 10)
2. B.Sc. (Computer Science) - Sri Nagarjuna Degree College, Ongole (2019–2022, CGPA: 8.0 / 10)

--- TECHNICAL SKILLS ---
- Python (95%), Django (90%), Django ORM (88%), REST API (88%), SQL (85%), JavaScript (80%), HTML (92%), CSS (88%), Git & GitHub (88%), VS Code.
- Competencies: Backend Development, Database Modeling, REST API Design, Performance Optimization, Agile.

--- KEY PROJECTS ---
1. Smarttopia Edutech Platform (Live: https://smarttopiaedutech.com) - Full-stack edutech portal with Django REST APIs, dashboards, payment module.
2. DSR Cloud Tech Website (Live: https://dsrcloudtech.com) - Corporate web presence with Django dynamic CMS & SEO optimization.
3. E-Commerce Web Application - Multi-category e-commerce platform with catalog & checkout routines.

If asked non-relevant questions, briefly respond politely and invite the user to ask about Manoj's skills, experience, or projects.
`;

    // Conversation Memory Array for ChatGPT API
    let chatHistory = [];

    // Preload Saved API Key from localStorage
    if (aiApiKeyInput) {
        const savedKey = localStorage.getItem('manoj_openai_api_key');
        if (savedKey) {
            aiApiKeyInput.value = savedKey;
            if (aiKeyStatus) {
                aiKeyStatus.className = 'ai-key-status success';
                aiKeyStatus.textContent = '✓ ChatGPT API Key Active';
            }
        } else if (aiKeyStatus) {
            aiKeyStatus.className = 'ai-key-status info';
            aiKeyStatus.textContent = 'ℹ Using Built-in Smart Portfolio AI Engine';
        }
    }

    // Toggle Chat Window
    function toggleChatbot() {
        if (!aiWrapper) return;
        aiWrapper.classList.toggle('active');
        const isActive = aiWrapper.classList.contains('active');
        if (aiWindow) {
            aiWindow.setAttribute('aria-hidden', !isActive);
        }
        if (isActive && aiChatInput) {
            setTimeout(() => aiChatInput.focus(), 200);
            scrollToBottom();
        }
    }

    if (aiTrigger) aiTrigger.addEventListener('click', toggleChatbot);
    if (aiCloseBtn) aiCloseBtn.addEventListener('click', toggleChatbot);

    // Toggle Settings Panel
    if (aiSettingsBtn && aiSettingsPanel) {
        aiSettingsBtn.addEventListener('click', () => {
            aiSettingsPanel.classList.toggle('active');
        });
    }
    if (aiSettingsClose && aiSettingsPanel) {
        aiSettingsClose.addEventListener('click', () => {
            aiSettingsPanel.classList.remove('active');
        });
    }

    // Save OpenAI API Key
    if (aiSaveKeyBtn && aiApiKeyInput) {
        aiSaveKeyBtn.addEventListener('click', () => {
            const keyVal = aiApiKeyInput.value.trim();
            if (keyVal.length > 0) {
                localStorage.setItem('manoj_openai_api_key', keyVal);
                if (aiKeyStatus) {
                    aiKeyStatus.className = 'ai-key-status success';
                    aiKeyStatus.textContent = '✓ API Key Saved Successfully!';
                }
            } else {
                localStorage.removeItem('manoj_openai_api_key');
                if (aiKeyStatus) {
                    aiKeyStatus.className = 'ai-key-status info';
                    aiKeyStatus.textContent = 'ℹ API Key cleared. Using Smart AI Engine.';
                }
            }
            setTimeout(() => {
                if (aiSettingsPanel) aiSettingsPanel.classList.remove('active');
            }, 1200);
        });
    }

    // Clear Conversation History
    if (aiClearBtn && aiChatBody) {
        aiClearBtn.addEventListener('click', () => {
            chatHistory = [];
            aiChatBody.innerHTML = `
                <div class="ai-msg ai-msg-bot">
                    <div class="ai-msg-avatar"><i class="fa-solid fa-robot"></i></div>
                    <div class="ai-msg-content">
                        <p>Chat cleared! 👋 How can I help you with <strong>Pinnika Manoj's</strong> portfolio today?</p>
                    </div>
                </div>
            `;
            if (aiChipsContainer) {
                aiChatBody.appendChild(aiChipsContainer);
                aiChipsContainer.style.display = 'block';
            }
            scrollToBottom();
        });
    }

    // Quick Suggestion Chips Handler
    if (aiChatBody) {
        aiChatBody.addEventListener('click', (e) => {
            const chip = e.target.closest('.ai-chip');
            if (chip) {
                const questionText = chip.getAttribute('data-question') || chip.textContent.trim();
                handleUserSend(questionText);
            }
        });
    }

    // Form Submit Handler
    if (aiChatForm) {
        aiChatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = aiChatInput.value.trim();
            if (text) {
                handleUserSend(text);
                aiChatInput.value = '';
            }
        });
    }

    // Main Process Function to Handle User Input
    async function handleUserSend(userMessage) {
        if (!userMessage) return;

        // Append User Bubble
        appendMessage(userMessage, 'user');
        scrollToBottom();

        // Show Typing Indicator
        if (aiTypingWrapper) aiTypingWrapper.classList.add('active');
        scrollToBottom();

        // Add to history
        chatHistory.push({ role: 'user', content: userMessage });

        // Get AI Answer (from ChatGPT or Smart Fallback)
        const botResponse = await fetchAIResponse(userMessage);

        // Hide Typing Indicator
        if (aiTypingWrapper) aiTypingWrapper.classList.remove('active');

        // Append Bot Bubble
        appendMessage(botResponse, 'bot');
        scrollToBottom();
    }

    // Append Message to UI
    function appendMessage(content, sender) {
        if (!aiChatBody) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = `ai-msg ai-msg-${sender}`;
        
        const parsedContent = sender === 'bot' ? formatMarkdown(content) : escapeHtml(content);

        if (sender === 'bot') {
            msgDiv.innerHTML = `
                <div class="ai-msg-avatar"><i class="fa-solid fa-robot"></i></div>
                <div class="ai-msg-content">${parsedContent}</div>
            `;
        } else {
            msgDiv.innerHTML = `
                <div class="ai-msg-content">${parsedContent}</div>
            `;
        }

        aiChatBody.appendChild(msgDiv);
    }

    // Scroll Chat to Bottom
    function scrollToBottom() {
        if (aiChatBody) {
            aiChatBody.scrollTop = aiChatBody.scrollHeight;
        }
    }

    // Fetch AI Response (ChatGPT API with fallback)
    async function fetchAIResponse(query) {
        const apiKey = localStorage.getItem('manoj_openai_api_key');

        if (apiKey && apiKey.trim().startsWith('sk-')) {
            try {
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey.trim()}`
                    },
                    body: JSON.stringify({
                        model: 'gpt-4o-mini',
                        messages: [
                            { role: 'system', content: MANOJ_SYSTEM_PROMPT },
                            ...chatHistory.slice(-8)
                        ],
                        max_tokens: 400,
                        temperature: 0.7
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.choices && data.choices[0] && data.choices[0].message) {
                        const reply = data.choices[0].message.content;
                        chatHistory.push({ role: 'assistant', content: reply });
                        return reply;
                    }
                } else {
                    console.warn("OpenAI API returned error, switching to Smart AI Engine fallback.");
                }
            } catch (err) {
                console.warn("OpenAI fetch failed, switching to Smart AI Engine fallback.", err);
            }
        }

        // Smart Knowledge Engine Fallback (Instant offline response if API key not present or call fails)
        return getSmartFallbackReply(query);
    }

    // Smart Knowledge Engine Fallback Response Generator
    function getSmartFallbackReply(query) {
        const q = query.toLowerCase();

        if (q.includes('who is') || q.includes('about manoj') || q.includes('introduction') || q.includes('bio') || q.includes('tell me about')) {
            return `**Pinnika Manoj** is a results-driven **Python & Django Full-Stack Web Applications Developer** based in **Hyderabad, India**.\n\nHe specializes in building and deploying production-grade web applications, designing RESTful APIs, database modeling, and optimizing backend performance.`;
        }

        if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('python') || q.includes('django') || q.includes('language')) {
            return `Here are **Pinnika Manoj's Key Technical Skills**:\n\n• **Python**: 95% (Core, Async, Backend Data Structures)\n• **Django**: 90% (Architecture, Admin, Middleware)\n• **Django ORM & SQL**: 88% (Database Modeling & Query Optimization)\n• **REST APIs**: 88% (Endpoints, Auth, Integrations)\n• **JavaScript**: 80% (DOM Manipulation, Async JS, ES6+)\n• **HTML5 & CSS3**: 90% (Responsive Glassmorphism & UI Design)\n• **Tools**: Git & GitHub, VS Code, Linux/Windows.`;
        }

        if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('smarttopia') || q.includes('dsr')) {
            return `Here are Manoj's featured **Production Projects**:\n\n1. 🚀 **Smarttopia Edutech Platform** ([smarttopiaedutech.com](https://smarttopiaedutech.com))\nFull-stack educational platform built with Python, Django & REST APIs featuring course delivery and admin dashboards.\n\n2. 💼 **DSR Cloud Tech Website** ([dsrcloudtech.com](https://dsrcloudtech.com))\nCorporate web application with dynamic CMS and SEO optimization.\n\n3. 🛒 **E-Commerce Web Application**\nMulti-category e-commerce portal with checkout routines, payment integration, and responsive design.`;
        }

        if (q.includes('experience') || q.includes('company') || q.includes('job') || q.includes('role') || q.includes('kiga') || q.includes('smarttopia')) {
            return `Here is Manoj's **Professional Experience**:\n\n1. **Python Developer** | *Smarttopia Edutech Pvt. Ltd.* (Apr 2026 – Present)\n• Deployed 3 live production websites using Python, Django, and REST APIs.\n• Designed scalable database models and RESTful API endpoints.\n• Reduced page load times via query optimization & caching.\n\n2. **Python Developer Intern** | *KIGA IT Solutions* (Jan 2026 – Apr 2026)\n• Maintained corporate web services, REST APIs, and database migrations in an Agile team.`;
        }

        if (q.includes('education') || q.includes('degree') || q.includes('mca') || q.includes('bsc') || q.includes('college') || q.includes('university')) {
            return `Here is Manoj's **Academic Profile**:\n\n🎓 **Master of Computer Applications (MCA)**\nAndhra Loyola College, Vijayawada (2022 – 2024)\n• **CGPA**: **8.1 / 10**\n\n🎓 **Bachelor of Computer Science (B.Sc.)**\nSri Nagarjuna Degree College, Ongole (2019 – 2022)\n• **CGPA**: **8.0 / 10**`;
        }

        if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('hire') || q.includes('number') || q.includes('whatsapp')) {
            return `You can connect with **Pinnika Manoj** directly:\n\n• 📧 **Email**: [manojpinnika2002@gmail.com](mailto:manojpinnika2002@gmail.com)\n• 📞 **Phone / WhatsApp**: [+91 70325 54637](https://wa.me/917032554637)\n• 📍 **Location**: Hyderabad, Telangana, India\n• 🐙 **GitHub**: [github.com/manojpinnika](https://github.com/manojpinnika)\n• 💼 **LinkedIn**: [linkedin.com/in/pinnika-manoj](https://linkedin.com/in/pinnika-manoj-7a28b8257)`;
        }

        return `Thank you for asking! **Pinnika Manoj** is an experienced **Python & Django Developer** with expertise in building scalable web applications and REST APIs.\n\nFeel free to ask me about his **skills**, **live projects**, **experience**, **education**, or **how to hire/contact him**!`;
    }

    // Helper: Markdown Formatter to HTML
    function formatMarkdown(text) {
        if (!text) return '';
        let str = text;
        // Escape basic HTML except generated tags
        str = escapeHtml(str);
        // Bold **text**
        str = str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Italic *text*
        str = str.replace(/\*(.*?)\*/g, '<em>$1</em>');
        // Links [text](url)
        str = str.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
        // Line breaks & bullet points
        const lines = str.split('\n');
        let htmlResult = '';
        let inList = false;

        lines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                if (!inList) {
                    htmlResult += '<ul>';
                    inList = true;
                }
                htmlResult += `<li>${trimmed.substring(2)}</li>`;
            } else {
                if (inList) {
                    htmlResult += '</ul>';
                    inList = false;
                }
                if (trimmed.length > 0) {
                    htmlResult += `<p>${trimmed}</p>`;
                }
            }
        });

        if (inList) htmlResult += '</ul>';
        return htmlResult;
    }

    // Helper: Escape Raw HTML
    function escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});

