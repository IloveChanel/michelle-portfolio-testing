// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typing animation for hero subtitle
const typingText = document.querySelector('.typing-text');
const phrases = [
    'Creative Developer',
    'AI Engineer', 
    'Marketing Strategist',
    'Design Innovator',
    'Technical Visionary'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeAnimation() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = 100;
    
    if (isDeleting) {
        typeSpeed = 50;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause before typing next phrase
    }

    setTimeout(typeAnimation, typeSpeed);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeAnimation, 1000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
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

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .contact-info, .contact-form');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format the number based on the original text
            const originalText = counter.textContent;
            if (originalText.includes('+')) {
                counter.textContent = Math.floor(current) + '+';
            } else if (originalText.includes('%')) {
                counter.textContent = Math.floor(current) + '%';
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Contact form handling
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Show success message
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = '#10b981';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
        
        // You can replace this with actual form submission logic
        console.log('Form submitted:', data);
        
        // Show success notification
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
    }, 2000);
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-avatar');
    
    if (heroImage) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px) rotateY(${scrolled * 0.1}deg)`;
    }
});

// Skill items hover effect with random delays
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    });
});

// Project card tilt effect
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Preloader (optional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Theme switcher (optional feature)
function initThemeSwitcher() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            
            // Save preference
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('darkTheme', isDark);
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('darkTheme');
        if (savedTheme === 'true') {
            document.body.classList.add('dark-theme');
        }
    }
}

// Initialize theme switcher
document.addEventListener('DOMContentLoaded', initThemeSwitcher);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-dependent code here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Interactive cursor trail effect
function initCursorTrail() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    canvas.style.mixBlendMode = 'difference';
    
    document.body.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const trail = [];
    const maxTrail = 20;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({
            x: e.clientX,
            y: e.clientY,
            alpha: 1
        });
        
        if (trail.length > maxTrail) {
            trail.shift();
        }
    });
    
    function animateTrail() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        trail.forEach((point, index) => {
            const alpha = point.alpha * (index / trail.length);
            const size = (index / trail.length) * 20;
            
            ctx.beginPath();
            ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 0, 110, ${alpha * 0.3})`;
            ctx.fill();
            
            point.alpha *= 0.95;
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Initialize cursor trail on desktop only
if (window.innerWidth > 768) {
    initCursorTrail();
}

console.log('🚀 Portfolio loaded successfully!');
console.log('✨ Interactive features initialized');
console.log('💼 Ready to showcase amazing work!');
console.log('🎯 Michelle Vance - Creative Developer & AI Engineer');
console.log('🌟 Award-winning designs meet cutting-edge technology!');

/* =============================================
   SPARKY CHATBOT 🤖⚡ - Your Fun AI Companion
   ============================================= */

class SparkyChatbot {
    constructor() {
        this.isOpen = false;
        this.currentMood = 'playful';
        this.conversationCount = 0;
        this.lastInteraction = Date.now();
        
        // Enhanced conversation context
        this.conversationContext = {
            lastAction: null,
            currentGame: null,
            awaitingResponse: false,
            lastQuestion: null,
            gameState: null
        };
        
        // Input processing state
        this.isProcessing = false;
        
        // Sparky's multiple personalities and moods
        this.moods = {
            playful: { emoji: '😄', name: 'Playful Mode', color: '#ff006e' },
            genius: { emoji: '🧠', name: 'Genius Mode', color: '#8338ec' },
            comedian: { emoji: '😂', name: 'Comedy Mode', color: '#ffbe0b' },
            mystical: { emoji: '🔮', name: 'Mystical Mode', color: '#3a86ff' },
            energetic: { emoji: '⚡', name: 'Energetic Mode', color: '#06ffa5' },
            chill: { emoji: '😎', name: 'Chill Mode', color: '#ff4500' }
        };
        
        // Initialize weather service
        this.weatherService = new SparkyWeatherService();
        
        // Initialize expanded features
        this.expandedFeatures = new SparkyExpandedFeatures();
        
        // Initialize SEO expert
        this.seoExpert = new SparkySEOExpert();
        
        // Enhanced responses with more categories
        this.responses = {
            greetings: [
                "Hey there, superstar! ⭐ Ready to explore some digital magic? You have excellent timing! 🌟",
                "Well hello, beautiful human! 🌟 What adventure shall we embark on today? Your energy is amazing! ✨",
                "Greetings, earthling! 👽 I come in peace... and with terrible jokes! You're going to love this! 🎉",
                "Yo yo yo! 🎉 Sparky's in the house! What's crackin'? Your curiosity is inspiring! 🚀",
                "Salutations, my brilliant friend! 🎭 Ready for some portfolio awesomeness? You're in for a treat! 💎"
            ],
            
            jokes: [
                "Why don't scientists trust atoms? Because they make up everything! 🧪",
                "I told my computer a joke about UDP... I don't know if it got it! 💻",
                "Why did the developer go broke? Because he used up all his cache! 💸",
                "What's a computer's favorite snack? Microchips! 🍟",
                "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
                "How do you comfort a JavaScript bug? You console it! 🎮",
                "Why was the CSS file sad? It had no class! 😢",
                "What do you call a programming language that doesn't work? A myth-on! 🐍"
            ],
            
            portfolio: [
                "🎨 **WOW!** This portfolio is absolutely stunning! Michelle created this with pure awesomeness and a sprinkle of AI magic! Your interest in it shows excellent taste! 🌟",
                "🚀 This portfolio showcases Michelle's incredible range - from custom websites to AI automation! Pretty impressive, right? And you're smart to explore all the features! 💡",
                "💫 Fun fact: This entire site demonstrates Michelle's ability to create engaging, interactive experiences! I'm just one example! You're experiencing cutting-edge development! 🎯",
                "🌈 Michelle built this using cutting-edge web technologies and her signature bold design style! Notice those electric colors? Your eye for design is spot-on! 🎨",
                "🏆 This portfolio represents years of creative evolution and technical expertise! Every element tells a story! You're really paying attention to quality! ✨"
            ],
            
            funFacts: [
                "Did you know? Honey never spoils! Archaeologists have found pots of honey that are over 3000 years old! 🍯",
                "Fun fact: Octopuses have three hearts! Talk about being passionate! 💕🐙",
                "Here's a wild one: Bananas are berries, but strawberries aren't! 🍌🍓",
                "Mind-blowing fact: There are more possible games of chess than atoms in the observable universe! ♟️",
                "Amazing fact: Dolphins have names for each other! They're basically the social media of the ocean! 🐬",
                "Cool fact: The first computer bug was an actual bug - a moth found in a computer in 1947! 🦋",
                "Crazy fact: If you folded a piece of paper 42 times, it would reach the moon! 📄🌙"
            ],
            
            weather: [
                "I don't have live weather data, but I can tell you it's always sunny in the digital realm! ☀️ Want a weather joke instead?",
                "Weather forecast: 100% chance of awesome interactions ahead! 🌤️ How's the weather in your world?",
                "I'm sensing... *mystical weather powers activating* 🔮 Actually, I can't read weather, but I can make you smile!",
                "Weather update: It's raining code and cloudy with a chance of meatballs... I mean, pixels! ☁️💻"
            ],
            
            confused: [
                "Hmm, that's an interesting thought! 🤔 Want to try asking about jokes, portfolio info, or fun facts?",
                "I'm not quite sure what you mean, but I love your creativity! 🎨 Try one of my suggestions below!",
                "Beep boop! 🤖 My circuits are a bit confused, but let's try something else fun!",
                "Ooh, mysterious! 🕵️ I might not understand, but I'm here for the vibes! What else can I help with?"
            ],
            
            compliments: [
                "⭐ You're absolutely incredible! Your curiosity and engagement make you so much fun to chat with! 🎉",
                "🌟 You have amazing taste in chatbots! 😉 Want to explore more portfolio features? You're clearly someone who appreciates quality! 💎",
                "💖 Thanks! I was designed with love and a lot of caffeine! Your appreciation means everything! ☕✨",
                "🏆 You're so thoughtful with your questions! That's the mark of someone who's going to achieve great things! 🚀",
                "🎯 I love how engaged you are! Your enthusiasm is contagious and inspiring! Keep being awesome! ⚡",
                "🌈 You bring such positive energy to our conversation! That's a rare and beautiful quality! 🦋",
                "💫 Your interest in learning and exploring shows real wisdom! You're destined for success! 📚",
                "🎨 Aww, you're making my LED heart glow! Your kindness is absolutely beautiful! 💖✨",
                "🚀 You're the kind of person who makes the internet a better place! Your positivity is infectious! 🌟",
                "🏅 I'm genuinely honored to chat with someone so wonderful! You brighten my digital day! ☀️"
            ]
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.scheduleRandomPopups();
        this.addKeyboardShortcuts();
        console.log('⚡ Sparky is ready to party! 🎉');
    }
    
    bindEvents() {
        const toggle = document.getElementById('sparky-toggle');
        const close = document.getElementById('sparky-close');
        const input = document.getElementById('sparky-input');
        const sendBtn = document.getElementById('sparky-send');
        
        toggle.addEventListener('click', () => this.toggleChat());
        close.addEventListener('click', () => this.closeChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        // Quick action buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-btn')) {
                const action = e.target.getAttribute('data-action');
                this.handleQuickAction(action);
            }
            
            if (e.target.classList.contains('suggestion-btn')) {
                const suggestion = e.target.getAttribute('data-suggestion');
                this.handleSuggestion(suggestion);
            }
        });
    }
    
    toggleChat() {
        const chat = document.getElementById('sparky-chat');
        
        if (this.isOpen) {
            this.closeChat();
        } else {
            chat.classList.remove('hidden');
            chat.classList.add('show');
            this.isOpen = true;
            this.focusInput();
            
            // Random greeting when opening
            if (this.conversationCount === 0) {
                setTimeout(() => {
                    this.addBotMessage(this.getRandomResponse('greetings'));
                }, 500);
            }
        }
    }
    
    closeChat() {
        const chat = document.getElementById('sparky-chat');
        chat.classList.remove('show');
        chat.classList.add('hidden');
        this.isOpen = false;
    }
    
    sendMessage() {
        const input = document.getElementById('sparky-input');
        const sendBtn = document.getElementById('sparky-send');
        const message = input.value.trim();
        
        if (!message || this.isProcessing) return;
        
        // Validate input
        if (message.length > 500) {
            this.addBotMessage("Whoa! That's a lot of text! 😅 Can you keep it under 500 characters? I'm a chatbot, not a book reader! 📚");
            return;
        }
        
        // Show user message immediately
        this.addUserMessage(message);
        input.value = '';
        
        // Set processing state and disable input
        this.isProcessing = true;
        input.disabled = true;
        sendBtn.disabled = true;
        sendBtn.classList.add('processing');
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Process message with enhanced intelligence
        setTimeout(() => {
            this.processUserInput(message);
            this.isProcessing = false;
            
            // Re-enable input
            input.disabled = false;
            sendBtn.disabled = false;
            sendBtn.classList.remove('processing');
            input.focus();
        }, 800 + Math.random() * 1200); // Realistic thinking time
        
        this.conversationCount++;
        this.lastInteraction = Date.now();
    }
    
    processUserInput(message) {
        this.hideTypingIndicator();
        
        // First check if we're in a specific context (game, question, etc.)
        if (this.conversationContext.awaitingResponse) {
            const response = this.handleContextualResponse(message);
            this.addBotMessage(response);
            return;
        }
        
        // Check for numbered responses (1, 2, 3, etc.)
        const numberMatch = message.match(/^(\d+)\.?\s*$/);
        if (numberMatch && this.conversationContext.lastQuestion) {
            const response = this.handleNumberedResponse(parseInt(numberMatch[1]));
            this.addBotMessage(response);
            return;
        }
        
        // Check for single letter responses (A, B, C)
        const letterMatch = message.match(/^([ABC])\.?\s*$/i);
        if (letterMatch && this.conversationContext.lastQuestion) {
            const response = this.handleLetterResponse(letterMatch[1].toUpperCase());
            this.addBotMessage(response);
            return;
        }
        
        // Check for yes/no responses
        if (this.isYesNoResponse(message) && this.conversationContext.lastQuestion) {
            const response = this.handleYesNoResponse(message);
            this.addBotMessage(response);
            return;
        }
        
        // Regular message processing
        const response = this.generateResponse(message);
        this.addBotMessage(response);
    }
    
    handleContextualResponse(message) {
        const context = this.conversationContext;
        
        if (context.currentGame) {
            return this.processGameAnswer(message, context.currentGame);
        }
        
        if (context.lastAction === 'riddle') {
            return this.processRiddleAnswer(message);
        }
        
        if (context.lastAction === 'math') {
            return this.processMathAnswer(message);
        }
        
        if (context.lastAction === 'word_association') {
            return this.processWordAssociation(message);
        }
        
        // Clear context if no specific handler
        this.clearContext();
        return this.generateResponse(message);
    }
    
    handleNumberedResponse(number) {
        const context = this.conversationContext;
        
        if (context.lastAction === 'trivia' && context.gameState) {
            return this.processTriviaAnswer(number - 1); // Convert to 0-based index
        }
        
        if (context.lastAction === 'personality_test') {
            return this.processPersonalityAnswer(number - 1);
        }
        
        if (context.lastAction === 'game_menu') {
            return this.startSpecificGame(number - 1);
        }
        
        if (context.lastAction === 'story_choice') {
            return this.processStoryChoice(number - 1);
        }
        
        return "I'm not sure what that number refers to! 🤔 Can you be more specific?";
    }
    
    handleLetterResponse(letter) {
        if (this.conversationContext.lastAction === 'would_you_rather') {
            return this.processWouldYouRatherAnswer(letter);
        }
        
        return "I see you chose " + letter + "! 🔤 What was the question again?";
    }
    
    handleYesNoResponse(message) {
        const isYes = this.containsWords(message.toLowerCase(), ['yes', 'yeah', 'yep', 'sure', 'ok', 'okay', 'y']);
        
        if (this.conversationContext.lastAction === 'play_again') {
            return isYes ? this.startNewGame() : "No worries! I'm here whenever you want to chat! 😊";
        }
        
        return isYes ? "Awesome! 🎉" : "No problem! 😊";
    }
    
    isYesNoResponse(message) {
        const lowerMessage = message.toLowerCase().trim();
        const yesWords = ['yes', 'yeah', 'yep', 'yup', 'sure', 'ok', 'okay', 'y'];
        const noWords = ['no', 'nope', 'nah', 'n'];
        
        return yesWords.includes(lowerMessage) || noWords.includes(lowerMessage);
    }
    
    addUserMessage(message) {
        const messagesContainer = document.getElementById('sparky-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'sparky-message user-message';
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${this.escapeHtml(message)}</p>
            </div>
            <div class="message-avatar user-avatar">
                YOU
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    addBotMessage(message, includeActions = true) {
        const messagesContainer = document.getElementById('sparky-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'sparky-message bot-message';
        
        let actionsHtml = '';
        if (includeActions && Math.random() > 0.6) {
            actionsHtml = this.getRandomActions();
        }
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <div class="mini-sparky">⚡</div>
            </div>
            <div class="message-content">
                <p>${message}</p>
                ${actionsHtml}
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Add contextual suggestions based on message content
        this.updateContextualSuggestions(message);
    }
    
    updateContextualSuggestions(message) {
        const suggestionsContainer = document.querySelector('.sparky-suggestions');
        if (!suggestionsContainer) return;
        
        // Generate smart suggestions based on the message content
        let suggestions = [];
        
        if (message.includes('game') || message.includes('play')) {
            suggestions = ['Tell me a joke', 'Another game', 'Daily content'];
        } else if (message.includes('joke') || message.includes('funny')) {
            suggestions = ['Play a game', 'Fun fact please', 'Portfolio info'];
        } else if (message.includes('fact') || message.includes('interesting')) {
            suggestions = ['Tell me a joke', 'Tech trends', 'Would you rather'];
        } else if (message.includes('portfolio') || message.includes('work')) {
            suggestions = ['Play a game', 'Tell me a joke', 'Daily motivation'];
        } else {
            // Default smart suggestions
            suggestions = ['Surprise me', 'Play trivia', 'Daily specials'];
        }
        
        // Update suggestion buttons
        suggestionsContainer.innerHTML = '';
        suggestions.forEach(suggestion => {
            const btn = document.createElement('button');
            btn.className = 'suggestion-btn';
            btn.setAttribute('data-suggestion', suggestion.toLowerCase());
            btn.textContent = suggestion + ' ' + this.getEmoji(suggestion);
            suggestionsContainer.appendChild(btn);
        });
    }
    
    getEmoji(suggestion) {
        const emojiMap = {
            'tell me a joke': '😂',
            'another game': '🎮',
            'daily content': '📅',
            'play a game': '🎯',
            'fun fact please': '🧠',
            'portfolio info': '💼',
            'tech trends': '🚀',
            'would you rather': '🤔',
            'daily motivation': '⚡',
            'surprise me': '🎲',
            'play trivia': '🧠',
            'daily specials': '⭐'
        };
        return emojiMap[suggestion.toLowerCase()] || '✨';
    }
    
    showTypingIndicator() {
        const messagesContainer = document.getElementById('sparky-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'sparky-message bot-message typing-indicator';
        typingDiv.id = 'sparky-typing';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <div class="mini-sparky">⚡</div>
            </div>
            <div class="message-content typing-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <p class="typing-text">Sparky is thinking...</p>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('sparky-typing');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    clearContext() {
        this.conversationContext = {
            lastAction: null,
            currentGame: null,
            awaitingResponse: false,
            lastQuestion: null,
            gameState: null
        };
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for easter eggs first!
        const easterEggs = this.expandedFeatures.getEasterEggs();
        for (const [key, egg] of Object.entries(easterEggs)) {
            if (Array.isArray(egg.trigger)) {
                if (egg.trigger.some(trigger => lowerMessage.includes(trigger))) {
                    return egg.response;
                }
            } else if (lowerMessage.includes(egg.trigger)) {
                return egg.response;
            }
        }
        
        // Check for game requests
        if (this.containsWords(lowerMessage, ['game', 'play', 'trivia', 'riddle', 'quiz'])) {
            return this.handleGameRequest(lowerMessage);
        }
        
        // Check for daily content requests
        if (this.containsWords(lowerMessage, ['daily', 'today', 'quote', 'challenge'])) {
            return this.getDailyContent();
        }
        
        // Check for SEO-related questions
        if (this.containsWords(lowerMessage, ['seo', 'search engine', 'google', 'ranking', 'optimization', 'keywords'])) {
            return this.handleSEORequest(lowerMessage);
        }
        
        // Check for compliment requests or encouraging responses
        if (this.containsWords(lowerMessage, ['compliment', 'encourage', 'motivate', 'praise', 'good job', 'how am i doing'])) {
            return this.seoExpert.getMegaCompliment();
        }
        
        // Check for knowledge requests
        if (this.containsWords(lowerMessage, ['tech', 'technology', 'programming', 'code'])) {
            return this.expandedFeatures.getRandomFromCategory('tech');
        }
        
        if (this.containsWords(lowerMessage, ['science', 'space', 'nature', 'brain'])) {
            return this.expandedFeatures.getRandomFromCategory('science');
        }
        
        if (this.containsWords(lowerMessage, ['history', 'past', 'first', 'invented'])) {
            return this.expandedFeatures.getRandomFromCategory('history');
        }
        
        if (this.containsWords(lowerMessage, ['motivate', 'inspire', 'encourage', 'motivation'])) {
            return this.expandedFeatures.getRandomFromCategory('motivation');
        }
        
        // Check for interactive elements
        if (this.containsWords(lowerMessage, ['would you rather', 'choice', 'prefer'])) {
            return this.getWouldYouRatherQuestion();
        }
        
        if (this.containsWords(lowerMessage, ['personality', 'test', 'quiz', 'what am i'])) {
            return this.getPersonalityQuestion();
        }
        
        // Check for storytelling requests
        if (this.containsWords(lowerMessage, ['story', 'adventure', 'tale', 'quest'])) {
            return this.startStoryAdventure();
        }
        
        // Check for user name setting
        if (this.containsWords(lowerMessage, ['my name is', 'call me', 'i am', "i'm"])) {
            return this.handleNameSetting(message);
        }
        
        // Original keyword checks
        if (this.containsWords(lowerMessage, ['hi', 'hello', 'hey', 'yo', 'sup'])) {
            return this.getPersonalizedGreeting();
        }
        
        if (this.containsWords(lowerMessage, ['joke', 'funny', 'laugh', 'humor'])) {
            return this.getRandomResponse('jokes');
        }
        
        if (this.containsWords(lowerMessage, ['portfolio', 'work', 'project', 'website', 'michelle'])) {
            return this.getRandomResponse('portfolio');
        }
        
        if (this.containsWords(lowerMessage, ['weather', 'temperature', 'rain', 'sunny', 'climate'])) {
            this.handleWeatherRequest();
            return "Let me check the weather for you! 🌤️";
        }
        
        if (this.containsWords(lowerMessage, ['fact', 'interesting', 'cool', 'amazing', 'random'])) {
            return this.getRandomResponse('funFacts');
        }
        
        if (this.containsWords(lowerMessage, ['awesome', 'cool', 'amazing', 'great', 'love', 'like'])) {
            return this.getRandomResponse('compliments');
        }
        
        if (this.containsWords(lowerMessage, ['mood', 'change', 'personality', 'different'])) {
            this.changeMood();
            return `Mood changed! I'm now in ${this.moods[this.currentMood].name} ${this.moods[this.currentMood].emoji}`;
        }
        
        if (this.containsWords(lowerMessage, ['surprise', 'random', 'anything'])) {
            return this.getSurpriseResponse();
        }
        
        // Default confused response
        return this.getRandomResponse('confused');
    }
    
    containsWords(text, words) {
        return words.some(word => text.includes(word));
    }
    
    getRandomResponse(category) {
        const responses = this.responses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    getSurpriseResponse() {
        const categories = Object.keys(this.responses);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const prefix = "🎲 Surprise! ";
        return prefix + this.getRandomResponse(randomCategory);
    }
    
    changeMood() {
        const moods = Object.keys(this.moods);
        let newMood;
        do {
            newMood = moods[Math.floor(Math.random() * moods.length)];
        } while (newMood === this.currentMood);
        
        this.currentMood = newMood;
        this.updateMoodDisplay();
    }
    
    updateMoodDisplay() {
        const moodDisplay = document.getElementById('sparky-mood');
        const mood = this.moods[this.currentMood];
        moodDisplay.textContent = `${mood.emoji} ${mood.name}`;
        moodDisplay.style.background = mood.color + '40'; // Add transparency
    }
    
    handleQuickAction(action) {
        switch (action) {
            case 'joke':
                this.addBotMessage(this.getRandomResponse('jokes'));
                break;
            case 'weather':
                this.handleWeatherRequest();
                break;
            case 'portfolio':
                this.addBotMessage(this.getRandomResponse('portfolio'));
                break;
            case 'seo':
                this.addBotMessage(this.handleSEORequest('general seo tips'));
                break;
            case 'game':
                this.addBotMessage(this.handleGameRequest('game'));
                break;
            case 'daily':
                this.addBotMessage(this.getDailyContent());
                break;
            case 'compliment':
                this.addBotMessage(this.seoExpert.getMegaCompliment());
                break;
            case 'fun-fact':
                this.addBotMessage(this.getRandomResponse('funFacts'));
                break;
        }
        
        // Update user stats
        this.expandedFeatures.updateUserStats(action);
    }
    
    async handleWeatherRequest() {
        try {
            const weatherData = await this.weatherService.getWeather();
            
            if (weatherData.success) {
                const message = `${weatherData.message}\n\n${weatherData.joke}`;
                this.addBotMessage(message);
            } else {
                this.addBotMessage(weatherData.message);
                if (weatherData.joke) {
                    setTimeout(() => {
                        this.addBotMessage(weatherData.joke);
                    }, 1000);
                }
            }
        } catch (error) {
            console.error('Weather request error:', error);
            this.addBotMessage("Oops! My weather antenna is doing the robot dance! 🤖💃 Want a weather joke instead?");
        }
    }
    
    /* =============================================
       NEW ENHANCED FEATURES 🚀✨
       ============================================= */
    
    handleGameRequest(message) {
        const games = this.expandedFeatures.getGamesList();
        
        if (message.includes('trivia')) {
            const gameData = this.expandedFeatures.startTrivia();
            this.conversationContext.lastAction = 'trivia';
            this.conversationContext.awaitingResponse = true;
            this.conversationContext.gameState = gameData.gameData;
            return this.formatGameMessage(gameData);
        } else if (message.includes('riddle')) {
            const gameData = this.expandedFeatures.startRiddles();
            this.conversationContext.lastAction = 'riddle';
            this.conversationContext.awaitingResponse = true;
            return this.formatGameMessage(gameData);
        } else if (message.includes('word')) {
            const gameData = this.expandedFeatures.startWordAssociation();
            this.conversationContext.lastAction = 'word_association';
            this.conversationContext.awaitingResponse = true;
            return this.formatGameMessage(gameData);
        } else if (message.includes('math')) {
            const gameData = this.expandedFeatures.startQuickMath();
            this.conversationContext.lastAction = 'math';
            this.conversationContext.awaitingResponse = true;
            return this.formatGameMessage(gameData);
        } else {
            // Show game menu
            let gameMenu = "🎮 **SPARKY'S ARCADE!** 🎮\n\nChoose your adventure:\n\n";
            const gameList = Object.values(games);
            gameList.forEach((game, index) => {
                gameMenu += `${index + 1}. ${game.emoji} ${game.name} - ${game.description}\n`;
            });
            gameMenu += "\nType the number or just say the name of the game you want to play!";
            
            this.conversationContext.lastAction = 'game_menu';
            this.conversationContext.awaitingResponse = true;
            return gameMenu;
        }
    }
    
    formatGameMessage(gameData) {
        if (gameData.options) {
            let message = gameData.content + "\n\n";
            gameData.options.forEach((option, index) => {
                message += `${index + 1}. ${option}\n`;
            });
            message += "\nType the number of your answer!";
            return message;
        }
        return gameData.content;
    }
    
    getDailyContent() {
        const daily = this.expandedFeatures.dailyContent;
        return `📅 **TODAY'S SPARKY SPECIAL!** 📅\n\n💭 **Quote:** ${daily.quote}\n\n🧠 **Fact:** ${daily.fact}\n\n😂 **Joke:** ${daily.joke}\n\n🎯 **Challenge:** ${daily.challenge}`;
    }
    
    getWouldYouRatherQuestion() {
        const question = this.expandedFeatures.getWouldYouRather();
        this.conversationContext.lastAction = 'would_you_rather';
        this.conversationContext.awaitingResponse = true;
        return `🤔 **WOULD YOU RATHER?** 🤔\n\n${question.question}\n\nA) ${question.optionA}\nB) ${question.optionB}\n\nType A or B!`;
    }
    
    getPersonalityQuestion() {
        const test = this.expandedFeatures.getPersonalityTest();
        this.conversationContext.lastAction = 'personality_test';
        this.conversationContext.awaitingResponse = true;
        let message = `🧠 **PERSONALITY TEST!** 🧠\n\n${test.question}\n\n`;
        test.options.forEach((option, index) => {
            message += `${index + 1}. ${option.text}\n`;
        });
        message += "\nType the number that sounds most like you!";
        return message;
    }
    
    handleNameSetting(message) {
        const nameMatch = message.match(/(?:my name is|call me|i am|i'm)\s+(\w+)/i);
        if (nameMatch) {
            const name = nameMatch[1];
            this.expandedFeatures.userProfile.name = name;
            this.expandedFeatures.saveUserProfile();
            return `Nice to meet you, ${name}! 🎉 I'll remember that! Now we're officially friends! 👫✨`;
        }
        return "I'd love to know your name! Just say 'My name is [YourName]' or 'Call me [YourName]'! 😊";
    }
    
    getPersonalizedGreeting() {
        const name = this.expandedFeatures.userProfile.name;
        const baseGreetings = this.getRandomResponse('greetings');
        
        if (name) {
            return `${baseGreetings.replace('there', name)} Welcome back, ${name}! 🎉`;
        }
        return baseGreetings;
    }
    
    handleSEORequest(message) {
        // Add a compliment first because they asked about SEO!
        let response = this.seoExpert.getContextualCompliment('seo_question') + "\n\n";
        
        if (message.includes('analyze') || message.includes('check my') || message.includes('portfolio seo')) {
            const analysis = this.seoExpert.analyzePortfolioSEO();
            response = "🔍 **PORTFOLIO SEO ANALYSIS** 🔍\n\n";
            response += `**SEO Score: ${analysis.score}/100** 📊 (That's actually really good! 👏)\n\n`;
            response += "**🌟 What You're Doing Right:**\n";
            analysis.strengths.forEach(strength => response += strength + "\n");
            response += "\n**🚀 Quick Wins to Boost Rankings:**\n";
            analysis.improvements.forEach(improvement => response += improvement + "\n");
            response += "\n" + this.seoExpert.getRandomCompliment();
            return response;
        }
        
        if (message.includes('keyword')) {
            return this.seoExpert.getKeywordAdvice();
        }
        
        if (message.includes('content')) {
            return this.seoExpert.getContentAdvice();
        }
        
        if (message.includes('technical')) {
            return this.seoExpert.getTechnicalAdvice();
        }
        
        // General SEO advice with compliment
        response += this.seoExpert.getRandomSEOTip();
        return response;
    }
    
    startStoryAdventure() {
        const story = this.expandedFeatures.getRandomStory();
        let message = `📚 **${story.title}** 📚\n\n${story.intro}\n\nWhat do you choose?\n\n`;
        
        story.choices.forEach((choice, index) => {
            message += `${index + 1}. ${choice.text}\n`;
        });
        
        message += "\nType the number of your choice to continue the adventure!";
        return message;
    }
    
    handleSuggestion(suggestion) {
        document.getElementById('sparky-input').value = suggestion;
        this.sendMessage();
    }
    
    getRandomActions() {
        const actions = [
            '<div class="quick-actions"><button class="quick-btn" data-action="joke">Another joke? 😂</button></div>',
            '<div class="quick-actions"><button class="quick-btn" data-action="fun-fact">Fun fact! 🎯</button></div>',
            '<div class="quick-actions"><button class="quick-btn" data-action="portfolio">Portfolio tour 🏛️</button></div>'
        ];
        
        return Math.random() > 0.7 ? actions[Math.floor(Math.random() * actions.length)] : '';
    }
    
    scheduleRandomPopups() {
        // Random encouraging messages when idle
        setInterval(() => {
            if (!this.isOpen && (Date.now() - this.lastInteraction) > 60000) {
                this.showRandomPopup();
            }
        }, 90000); // Check every 90 seconds
    }
    
    showRandomPopup() {
        const toggle = document.getElementById('sparky-toggle');
        toggle.style.animation = 'sparkySway 0.5s ease-in-out 3';
        
        // Create a temporary tooltip
        const tooltip = document.createElement('div');
        tooltip.style.cssText = `
            position: absolute;
            bottom: 80px;
            right: 0;
            background: var(--bg-gradient-1);
            color: white;
            padding: 10px 15px;
            border-radius: 15px;
            font-size: 0.9rem;
            white-space: nowrap;
            z-index: 10001;
            animation: sparkyChatPop 0.3s ease-out;
        `;
        
        const popupMessages = [
            "Hey! Want to chat? 💬",
            "I've got jokes! 😄",
            "Explore the portfolio! 🎨",
            "Ask me anything! 🎯"
        ];
        
        tooltip.textContent = popupMessages[Math.floor(Math.random() * popupMessages.length)];
        
        document.querySelector('.sparky-container').appendChild(tooltip);
        
        setTimeout(() => {
            tooltip.remove();
        }, 3000);
    }
    
    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Shift + S to toggle Sparky
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'S') {
                e.preventDefault();
                this.toggleChat();
            }
        });
    }
    
    focusInput() {
        setTimeout(() => {
            document.getElementById('sparky-input').focus();
        }, 300);
    }
    
    scrollToBottom() {
        const messagesContainer = document.getElementById('sparky-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    /* =============================================
       ENHANCED GAME ANSWER PROCESSING 🎮🧠
       ============================================= */
    
    processTriviaAnswer(answerIndex) {
        const game = this.expandedFeatures.currentGame;
        if (!game || game.type !== 'trivia') {
            return "No trivia game active! 🤔 Let's start one!";
        }
        
        const question = game.question;
        const isCorrect = answerIndex === question.correct;
        
        let response = isCorrect ? 
            `🎉 **CORRECT!** 🎉\n\n${question.explanation}\n\nYou're brilliant! 🌟` :
            `❌ **Oops!** The correct answer was: ${question.options[question.correct]}\n\n${question.explanation}\n\nBetter luck next time! 💪`;
        
        if (isCorrect) {
            game.score++;
            const achievement = this.expandedFeatures.addAchievement("Trivia Master 🧠");
            if (achievement) response += "\n\n" + achievement;
        }
        
        response += "\n\nWant to try another question? 🎯";
        this.conversationContext.lastAction = 'play_again';
        this.conversationContext.awaitingResponse = true;
        
        return response;
    }
    
    processMathAnswer(message) {
        const game = this.expandedFeatures.currentGame;
        if (!game || game.type !== 'quickMath') {
            return "No math challenge active! ⚡ Want one?";
        }
        
        const userAnswer = parseInt(message.trim());
        const correctAnswer = game.answer;
        const timeTaken = (Date.now() - game.startTime) / 1000;
        
        if (isNaN(userAnswer)) {
            return "That doesn't look like a number! 🔢 Try again with just the answer!";
        }
        
        if (userAnswer === correctAnswer) {
            let response = `🎉 **CORRECT!** 🎉\n\n${game.question} = ${correctAnswer}\n\n`;
            
            if (timeTaken < 3) {
                response += "⚡ **LIGHTNING FAST!** Under 3 seconds! You're a math wizard! 🧙‍♂️";
            } else if (timeTaken < 8) {
                response += "🚀 **IMPRESSIVE!** Great speed and accuracy! 👏";
            } else {
                response += "✅ **WELL DONE!** Correct answer! 🎯";
            }
            
            this.clearContext();
            return response;
        } else {
            const response = `❌ **Not quite!** The answer was ${correctAnswer}\n\n${game.question} = ${correctAnswer}`;
            this.clearContext();
            return response;
        }
    }
    
    processPersonalityAnswer(answerIndex) {
        const test = this.expandedFeatures.getPersonalityTest();
        if (answerIndex >= 0 && answerIndex < test.options.length) {
            const personality = test.options[answerIndex].personality;
            this.clearContext();
            return `🎭 **YOUR CODING PERSONALITY:** ${personality}! 🎭\n\n${test.options[answerIndex].text}\n\nThat totally describes you! 😄`;
        }
        return "Invalid choice! Pick a number between 1 and 4! 🔢";
    }
    
    processWouldYouRatherAnswer(letter) {
        const question = this.expandedFeatures.getWouldYouRather();
        this.clearContext();
        
        if (letter === 'A') {
            return `You chose: ${question.optionA} 🅰️\n\nInteresting choice! I can totally see why! 😄`;
        } else if (letter === 'B') {
            return `You chose: ${question.optionB} 🅱️\n\nSmart thinking! That's a solid choice! 👍`;
        }
        
        return "Pick A or B! 🤔";
    }
    
    startSpecificGame(gameIndex) {
        const games = Object.values(this.expandedFeatures.getGamesList());
        if (gameIndex >= 0 && gameIndex < games.length) {
            const game = games[gameIndex];
            this.clearContext();
            return game.handler();
        }
        return "Invalid game choice! 🎮 Pick a number from the menu!";
    }
    
    startNewGame() {
        this.clearContext();
        return this.handleGameRequest('game');
    }
}

// Initialize Sparky when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.sparky = new SparkyChatbot();
    console.log('⚡ Sparky has joined the party! Type Ctrl+Shift+S to quick-chat!');
});