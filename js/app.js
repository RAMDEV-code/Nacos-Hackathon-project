// app.js
document.addEventListener('DOMContentLoaded', () => {
    // === DOM Elements ===
    const body = document.body;
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.getElementById('menuBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    
    const landingView = document.getElementById('landing-view');
    const chatView = document.getElementById('chat-view');
    
    const startAskingBtn = document.getElementById('startAskingBtn');
    const exploreBtn = document.getElementById('exploreBtn');
    const newChatBtn = document.getElementById('newChatBtn');
    const navHomeBtn = document.getElementById('navHomeBtn');
    
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');
    const suggestedPromptsContainer = document.getElementById('suggestedPrompts');
    const chatWelcome = document.querySelector('.chat-welcome');
    
    const quickLinksGrid = document.getElementById('quickLinksGrid');
    const explorerContent = document.getElementById('explorerContent');
    const explorerSection = document.getElementById('explorerSection');

    // === Initialization ===
    initTheme();
    initHeroTyping();
    renderQuickLinks();
    renderExplorerArticles();
    renderSuggestedPrompts();

    // === Theme Management ===
    function initTheme() {
        updateThemeIcon();
        
        themeToggleBtn.addEventListener('click', () => {
            if (window.toggleGlobalTheme) {
                window.toggleGlobalTheme();
            }
        });

        window.addEventListener('themeChanged', updateThemeIcon);
    }

    function updateThemeIcon() {
        if (document.documentElement.classList.contains('light-mode')) {
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
        } else {
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
        }
    }

    // === Sidebar Management (Mobile) ===
    menuBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
    });

    closeSidebarBtn.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });

    // === View Navigation ===
    function showChatView() {
        landingView.classList.remove('active');
        chatView.classList.add('active');
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }
        chatInput.focus();
    }

    function showLandingView() {
        chatView.classList.remove('active');
        landingView.classList.add('active');
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }
    }

    startAskingBtn.addEventListener('click', showChatView);
    newChatBtn.addEventListener('click', showChatView);
    navHomeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showLandingView();
    });

    exploreBtn.addEventListener('click', () => {
        explorerSection.scrollIntoView({ behavior: 'smooth' });
    });

    // === Dynamic Content Rendering ===
    function renderQuickLinks() {
        window.DUMMY_DATA.quickLinks.forEach(link => {
            const card = document.createElement('div');
            card.className = 'quick-link-card';
            card.innerHTML = `
                <div class="quick-link-icon"><i class="${link.icon}"></i></div>
                <div class="quick-link-content">
                    <h4>${link.title}</h4>
                    <p>${link.desc}</p>
                </div>
            `;
            card.addEventListener('click', () => {
                showChatView();
                chatInput.value = link.prompt;
                handleSend();
            });
            quickLinksGrid.appendChild(card);
        });
    }

    function renderExplorerArticles() {
        window.DUMMY_DATA.articles.forEach(article => {
            const accordion = document.createElement('div');
            accordion.className = 'article-accordion';
            accordion.innerHTML = `
                <div class="accordion-header">
                    <span>${article.title}</span>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
                <div class="accordion-content">
                    <p>${article.content}</p>
                    <div style="margin-top: 1rem;">
                        <span class="tag active" style="font-size: 0.75rem;">${article.tag}</span>
                    </div>
                </div>
            `;
            
            const header = accordion.querySelector('.accordion-header');
            header.addEventListener('click', () => {
                const isOpen = accordion.classList.contains('open');
                // Close all others
                document.querySelectorAll('.article-accordion').forEach(acc => acc.classList.remove('open'));
                if (!isOpen) {
                    accordion.classList.add('open');
                }
            });
            
            explorerContent.appendChild(accordion);
        });
    }

    function renderSuggestedPrompts() {
        // Take first 3 for the welcome screen
        window.DUMMY_DATA.typingPhrases.slice(0, 3).forEach(prompt => {
            const pill = document.createElement('div');
            pill.className = 'prompt-pill';
            pill.textContent = prompt;
            pill.addEventListener('click', () => {
                chatInput.value = prompt;
                handleSend();
            });
            suggestedPromptsContainer.appendChild(pill);
        });
    }

    // === Hero Typing Effect ===
    function initHeroTyping() {
        const textElement = document.getElementById('hero-typing-text');
        const phrases = window.DUMMY_DATA.typingPhrases;
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                textElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                textElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 30 : 70;

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pause before new phrase
            }

            setTimeout(type, typeSpeed);
        }
        
        // Start typing effect after a small delay
        setTimeout(type, 1000);
    }

    // === Chat Interaction Logic ===
    
    // Auto-resize textarea
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
        
        if (this.value.trim().length > 0) {
            sendBtn.removeAttribute('disabled');
        } else {
            sendBtn.setAttribute('disabled', 'true');
        }
    });

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (chatInput.value.trim().length > 0) {
                handleSend();
            }
        }
    });

    sendBtn.addEventListener('click', handleSend);

    function handleSend() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Hide welcome message if it's the first message
        if (chatWelcome.style.display !== 'none') {
            chatWelcome.style.display = 'none';
        }

        // Add User Message
        appendMessage('user', message);
        
        // Reset Input
        chatInput.value = '';
        chatInput.style.height = 'auto';
        sendBtn.setAttribute('disabled', 'true');

        // Show Typing Indicator
        const typingId = showTypingIndicator();

        // Simulate RAG Backend Processing Delay
        setTimeout(() => {
            removeTypingIndicator(typingId);
            generateAIResponse(message);
        }, 1500 + Math.random() * 1000); // 1.5s - 2.5s delay
    }

    function appendMessage(sender, text, citation = null) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        
        const avatarIcon = sender === 'user' ? '<i class="fa-solid fa-user"></i>' : '<i class="fa-solid fa-scale-balanced"></i>';
        
        let citationHTML = '';
        if (citation) {
            citationHTML = `
                <div class="citation-card">
                    <div class="citation-card-header">
                        <i class="fa-solid fa-book"></i> ${citation.article}
                    </div>
                    <div class="citation-card-content">
                        Source: ${citation.source}
                    </div>
                </div>
            `;
        }

        const actionsHTML = sender === 'ai' ? `
            <div class="message-actions">
                <i class="fa-regular fa-copy msg-action-btn" title="Copy"></i>
                <i class="fa-solid fa-arrows-rotate msg-action-btn" title="Regenerate"></i>
                <i class="fa-regular fa-thumbs-up msg-action-btn" title="Helpful"></i>
                <i class="fa-regular fa-thumbs-down msg-action-btn" title="Not Helpful"></i>
            </div>
        ` : '';

        msgDiv.innerHTML = `
            <div class="avatar">${avatarIcon}</div>
            <div>
                <div class="message-content">${text}${citationHTML}</div>
                ${actionsHTML}
            </div>
        `;
        
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const id = 'typing-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ai`;
        msgDiv.id = id;
        
        msgDiv.innerHTML = `
            <div class="avatar"><i class="fa-solid fa-scale-balanced"></i></div>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
        return id;
    }

    function removeTypingIndicator(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    function generateAIResponse(userMessage) {
        const lowerMsg = userMessage.toLowerCase();
        let responseData = window.DUMMY_DATA.responses["default"];

        // Simple keyword matching for demo purposes
        const keywords = Object.keys(window.DUMMY_DATA.responses);
        for (let kw of keywords) {
            if (kw !== "default" && lowerMsg.includes(kw)) {
                responseData = window.DUMMY_DATA.responses[kw];
                break;
            }
        }

        // Simulate typing effect for the answer
        appendMessage('ai', responseData.text, responseData.citation);
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Constitution Search
    const explorerSearch = document.querySelector('.explorer-header .search-bar input');
    explorerSearch.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const accordions = document.querySelectorAll('.article-accordion');
        
        accordions.forEach(acc => {
            const text = acc.textContent.toLowerCase();
            if (text.includes(term)) {
                acc.style.display = 'block';
            } else {
                acc.style.display = 'none';
            }
        });
    });
});
