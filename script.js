/** Portfolio Website - UWENAYO Alain Pacifique */

const CONFIG = {
    projects: {
        notes: {
            title: "Notes for People",
            description: "Open-source savings tracker with Excel-like functions.",
            technologies: ["JavaScript", "HTML5", "CSS3"],
            features: ["Excel-like functions", "Real-time tracking", "Multi-currency", "Data export", "Responsive design"],
            githubUrl: "https://github.com/uwenayoallain/notes-for-people",
            liveUrl: "https://notes-for-people.vercel.app"
        },
        mindmerge: {
            title: "Mindmerge",
            description: "Collaborative platform for team ideation and project management.",
            technologies: ["React", "Node.js", "MongoDB", "Socket.IO"],
            features: ["Real-time collaboration", "Task management", "File sharing", "Analytics", "Tool integration"],
            githubUrl: "https://github.com/uwenayoallain/mindmerge",
            liveUrl: "https://mindmerge.tech"
        },
        orbit: {
            title: "Orbit",
            description: "Mobile app for tracking personal goals and habits.",
            technologies: ["Flutter", "Dart", "Firebase", "Provider"],
            features: ["Habit tracking", "Goal monitoring", "Progress visualization", "Notifications", "Cross-platform"],
            githubUrl: "https://github.com/uwenayoallain/orbit"
        }
    },
    
    ai: {
        greetings: [
            "Hello! ✨ I'm Saint AI, Alain's assistant. How can I help?",
            "Hi! ✨ Ask me about Alain's projects, skills, or experience.",
            "Hey! ✨ I'm here to tell you about Alain's work."
        ],
        responses: {
            projects: "Alain has built amazing projects:\n\n📊 Notes for People - Financial planning tool\n👥 Mindmerge - Team collaboration platform\n🎯 Orbit - Habit tracking mobile app\n\nWhich interests you most?",
            skills: "Alain's expertise:\n\n💻 Languages: JavaScript, Python, Dart\n⚛️ Frameworks: React, Node.js, Flutter\n🛠️ Tools: Git, Docker, Firebase, AWS\n📱 Specialties: Full-stack & mobile development",
            experience: "Alain's experience:\n\n🏢 RCAA Software Intern (2024)\n💼 Freelance Developer (2023-Present)\n📈 6 websites, 2 mobile apps delivered\n⭐ 98% client satisfaction rate",
            contact: "Get in touch:\n\n📧 uwenayoallain@gmail.com\n💼 LinkedIn: /in/uwenayoallain\n🔗 GitHub: /uwenayoallain\n\nUse the contact form below!",
            default: "I can tell you about Alain's projects, skills, experience, or contact info. What interests you?"
        }
    }
};

const $ = id => document.getElementById(id);
const debounce = (fn, ms) => { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); }; };
const random = arr => arr[Math.floor(Math.random() * arr.length)];
const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Image Slider
const ImageSlider = {
    init() {
        document.querySelectorAll('.image-slider').forEach(slider => {
            const track = slider.querySelector('.slider-track');
            const prevBtn = slider.querySelector('.slider-prev');
            const nextBtn = slider.querySelector('.slider-next');
            const dots = slider.querySelectorAll('.slider-dot');
            const images = slider.querySelectorAll('.project-img');
            
            let currentSlide = 0;
            const totalSlides = images.length;
            
            // Auto-advance slides every 4 seconds
            let autoSlide = setInterval(() => {
                currentSlide = (currentSlide + 1) % totalSlides;
                this.updateSlider(track, dots, currentSlide);
            }, 4000);
            
            // Pause on hover
            slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
            slider.addEventListener('mouseleave', () => {
                autoSlide = setInterval(() => {
                    currentSlide = (currentSlide + 1) % totalSlides;
                    this.updateSlider(track, dots, currentSlide);
                }, 4000);
            });
            
            // Navigation buttons
            prevBtn?.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                this.updateSlider(track, dots, currentSlide);
            });
            
            nextBtn?.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % totalSlides;
                this.updateSlider(track, dots, currentSlide);
            });
            
            // Dot navigation
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentSlide = index;
                    this.updateSlider(track, dots, currentSlide);
                });
            });
        });
    },
    
    updateSlider(track, dots, currentSlide) {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
};

// Navigation
const Navigation = {
    init() {
        const toggle = $('menuToggle');
        const menu = $('navMenu');
        
        toggle?.addEventListener('click', () => {
            menu.classList.toggle('open');
            document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
        });
        
        menu?.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
        
        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            });
        });
        
        // Active navigation
        const sections = document.querySelectorAll('section[id]');
        const links = document.querySelectorAll('.nav-link');
        
        const updateActive = debounce(() => {
            let current = '';
            sections.forEach(section => {
                if (window.pageYOffset >= section.offsetTop - 100) {
                    current = section.getAttribute('id');
                }
            });
            links.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
            });
        }, 100);
        
        window.addEventListener('scroll', updateActive);
    }
};

// Theme
const Theme = {
    init() {
        const toggle = $('themeToggle');
        if (!toggle) return;
        
        const saved = localStorage.getItem('theme') || 'dark';
        this.set(saved);
        
        toggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            this.set(current === 'dark' ? 'light' : 'dark');
        });
    },
    
    set(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        const icon = document.querySelector('.theme-icon');
        if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
};

// Contact Form
const ContactForm = {
    init() {
        const form = $('contactForm');
        if (!form) return;
        
        const fields = [
            { id: 'name', test: v => v.length >= 2, msg: 'Name must be at least 2 characters' },
            { id: 'email', test: validateEmail, msg: 'Please enter a valid email' },
            { id: 'message', test: v => v.length >= 20, msg: 'Message must be at least 20 characters' }
        ];
        
        fields.forEach(field => {
            const input = $(field.id);
            const error = $(`${field.id}Error`);
            input?.addEventListener('blur', () => {
                const valid = field.test(input.value.trim());
                this.showError(error, valid ? '' : field.msg);
            });
        });
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = $('name').value.trim();
            const email = $('email').value.trim();
            const message = $('message').value.trim();
            
            this.showError($('nameError'), name.length < 2 ? fields[0].msg : '');
            this.showError($('emailError'), !validateEmail(email) ? fields[1].msg : '');
            this.showError($('messageError'), message.length < 20 ? fields[2].msg : '');
            
            if (name.length < 2 || !validateEmail(email) || message.length < 20) return;
            
            const button = $('submitBtn');
            const text = button.querySelector('.btn-text');
            const spinner = button.querySelector('.btn-spinner');
            
            button.disabled = true;
            text.style.display = 'none';
            spinner.style.display = 'flex';
            
            try {
                const formData = new FormData(form);
                
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    Toast.show('Message sent successfully! I\'ll get back to you soon.', 'success');
                    form.reset();
                } else {
                    throw new Error('Failed to send');
                }
            } catch (error) {
                Toast.show('Error sending message. Please try again.', 'error');
            } finally {
                button.disabled = false;
                text.style.display = 'inline';
                spinner.style.display = 'none';
            }
        });
    },
    
    showError(element, message) {
        if (!element) return;
        element.textContent = message;
        element.style.display = message ? 'block' : 'none';
    }
};

// Modal & Toast
const Modal = {
    init() {
        const modal = $('modal');
        const body = $('modalBody');
        const close = $('modalClose');
        
        if (!modal) return;
        
        document.querySelectorAll('[data-modal]').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const project = CONFIG.projects[trigger.getAttribute('data-modal')];
                if (!project) return;
                
                body.innerHTML = `
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                    <h3>Features</h3>
                    <ul>${project.features.map(f => `<li>${f}</li>`).join('')}</ul>
                    <h3>Technologies</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0;">
                        ${project.technologies.map(t => `<span style="background: #f0f0f0; color: #333; padding: 0.3rem 0.8rem; border-radius: 0.3rem; font-size: 0.8rem;">${t}</span>`).join('')}
                    </div>
                    <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                        ${project.githubUrl ? `<a href="${project.githubUrl}" class="btn btn-outline" target="_blank">View Code</a>` : ''}
                        ${project.liveUrl ? `<a href="${project.liveUrl}" class="btn btn-primary" target="_blank">Live Demo</a>` : ''}
                    </div>
                `;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        const hide = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };
        
        close?.addEventListener('click', hide);
        modal.addEventListener('click', (e) => e.target === modal && hide());
        document.addEventListener('keydown', (e) => e.key === 'Escape' && modal.classList.contains('active') && hide());
    }
};

const Toast = {
    show(message, type = 'success') {
        const toast = $('toast');
        const icon = $('toastIcon');
        const msg = $('toastMessage');
        const close = $('toastClose');
        
        if (!toast) return;
        
        const icons = { success: '✅', error: '❌', warning: '⚠️' };
        
        icon.textContent = icons[type];
        msg.textContent = message;
        toast.className = `toast ${type} show`;
        
        const timer = setTimeout(() => toast.classList.remove('show'), 5000);
        
        close.onclick = () => {
            clearTimeout(timer);
            toast.classList.remove('show');
        };
    }
};

// Saint AI Assistant
class SaintAI {
    constructor() {
        this.toggle = $('aiChatToggle');
        this.window = $('aiChatWindow');
        this.close = $('aiChatClose');
        this.messages = $('aiChatMessages');
        this.input = $('aiChatInput');
        this.send = $('aiChatSend');
        this.isOpen = false;
        
        if (this.toggle) this.init();
    }
    
    init() {
        this.toggle?.addEventListener('click', () => this.toggleChat());
        this.close?.addEventListener('click', () => this.closeChat());
        this.send?.addEventListener('click', () => this.sendMessage());
        this.input?.addEventListener('keypress', (e) => e.key === 'Enter' && this.sendMessage());
        
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-question')) {
                const question = e.target.dataset.question;
                this.addMessage(question, true);
                this.processMessage(question);
                e.target.style.display = 'none';
            }
        });
    }
    
    toggleChat() {
        this.isOpen ? this.closeChat() : this.openChat();
    }
    
    openChat() {
        this.window.classList.add('open');
        this.isOpen = true;
        this.input?.focus();
    }
    
    closeChat() {
        this.window.classList.remove('open');
        this.isOpen = false;
    }
    
    sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;
        
        this.addMessage(message, true);
        this.input.value = '';
        this.processMessage(message);
    }
    
    addMessage(message, isUser = false) {
        const div = document.createElement('div');
        div.className = isUser ? 'user-message' : 'ai-message';
        div.innerHTML = `
            <div class="${isUser ? 'user-avatar' : 'ai-avatar'}">${isUser ? 'A' : '✨'}</div>
            <div class="message-content">${isUser ? `<p>${this.escapeHtml(message)}</p>` : this.parseMarkdown(message)}</div>
        `;
        this.messages.appendChild(div);
        this.messages.scrollTop = this.messages.scrollHeight;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    parseMarkdown(text) {
        // Simple markdown-like parsing without external libraries
        let html = text
            .replace(/\n/g, '<br>') // Line breaks
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
            .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
            .replace(/`(.*?)`/g, '<code>$1</code>') // Inline code
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>') // Links
            .replace(/^### (.*$)/gm, '<h3>$1</h3>') // H3
            .replace(/^## (.*$)/gm, '<h2>$1</h2>') // H2
            .replace(/^# (.*$)/gm, '<h1>$1</h1>'); // H1
        
        return `<p>${html}</p>`;
    }
    
    async processMessage(message) {
        this.send.disabled = true;
        
        // Add typing indicator
        const typing = document.createElement('div');
        typing.className = 'ai-message typing-indicator';
        typing.id = 'typing';
        typing.innerHTML = `
            <div class="ai-avatar">✨</div>
            <div class="message-content">
                <div class="typing-dots"><span></span><span></span><span></span></div>
            </div>
        `;
        this.messages.appendChild(typing);
        this.messages.scrollTop = this.messages.scrollHeight;
        
        try {
            const response = await this.getResponse(message);
            $('typing')?.remove();
            this.addMessage(response);
        } catch (error) {
            $('typing')?.remove();
            this.addMessage('Sorry, I\'m having trouble connecting right now. Please try again later.');
            console.error('AI Response Error:', error);
        } finally {
            this.send.disabled = false;
        }
    }
    
    async getResponse(message) {
        const apiUrl = "https://script.google.com/macros/s/AKfycbyBp5lOwHhXKk738UmyimxmhU9DtW-ZxS_OB-v5Pr1FhJ9u3wtq5SpMmr_9gvkdE7qn/exec";
        
        // Function to make API call
        const callScript = async () => {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: JSON.stringify({
                    message: message
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }
            
            return data.reply || 'I apologize, but I couldn\'t generate a proper response. Please try rephrasing your question.';
        };
        
        // First attempt
        try {
            return await callScript();
        } catch (error) {
            console.error('First API call failed:', error);
            
            // Retry the script call before falling back
            try {
                console.log('Retrying API call...');
                return await callScript();
            } catch (retryError) {
                console.error('Second API call also failed:', retryError);
                
                // Final fallback to local responses
                const msg = message.toLowerCase();
                const { greetings, responses } = CONFIG.ai;
                
                if (msg.includes('hello') || msg.includes('hi')) return random(greetings);
                if (msg.includes('project')) return responses.projects;
                if (msg.includes('skill') || msg.includes('tech')) return responses.skills;
                if (msg.includes('experience') || msg.includes('work')) return responses.experience;
                if (msg.includes('contact') || msg.includes('email')) return responses.contact;
                
                return responses.default;
            }
        }
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
    Theme.init();
    ContactForm.init();
    Modal.init();
    ImageSlider.init();
    new SaintAI();
    
    // Scroll animations
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.project-card, .timeline-item, .skill-category')
            .forEach(el => observer.observe(el));
    }
});

// Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
} 