// Mia Chat Widget Script (Custom Version)
(function() {
    console.log("Loading custom Mia Chat Widget v1.0");
    
    // Create and inject styles
    const styles = `
        .mia-chat-widget {
            --chat--color-primary: var(--mia-chat-primary-color, #854fff);
            --chat--color-secondary: var(--mia-chat-secondary-color, #6b3fd4);
            --chat--color-background: var(--mia-chat-background-color, #ffffff);
            --chat--color-font: var(--mia-chat-font-color, #333333);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .mia-chat-widget .chat-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            display: none;
            width: 380px;
            height: 600px;
            background: var(--chat--color-background);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(133, 79, 255, 0.15);
            border: 1px solid rgba(133, 79, 255, 0.2);
            overflow: hidden;
            font-family: inherit;
        }

        .mia-chat-widget .chat-container.position-left {
            right: auto;
            left: 20px;
        }

        .mia-chat-widget .chat-container.open {
            display: flex;
            flex-direction: column;
        }

        .mia-chat-widget .brand-header {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid rgba(133, 79, 255, 0.1);
            position: relative;
        }

        .mia-chat-widget .close-button {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--chat--color-font);
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
            font-size: 20px;
            opacity: 0.6;
        }

        .mia-chat-widget .close-button:hover {
            opacity: 1;
        }

        .mia-chat-widget .brand-header img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            object-fit: cover;
        }

        .mia-chat-widget .brand-header span {
            font-size: 18px;
            font-weight: 500;
            color: var(--chat--color-font);
        }

        .mia-chat-widget .new-conversation {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            text-align: center;
            width: 100%;
            max-width: 300px;
        }

        .mia-chat-widget .welcome-text {
            font-size: 24px;
            font-weight: 600;
            color: var(--chat--color-font);
            margin-bottom: 24px;
            line-height: 1.3;
        }

        .mia-chat-widget .new-chat-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            padding: 16px 24px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: transform 0.3s;
            font-weight: 500;
            font-family: inherit;
            margin-bottom: 12px;
        }

        .mia-chat-widget .new-chat-btn:hover {
            transform: scale(1.02);
        }

        .mia-chat-widget .message-icon {
            width: 20px;
            height: 20px;
        }

        .mia-chat-widget .response-text {
            font-size: 14px;
            color: var(--chat--color-font);
            opacity: 0.7;
            margin: 0;
        }

        .mia-chat-widget .chat-interface {
            display: none;
            flex-direction: column;
            height: 100%;
        }

        .mia-chat-widget .chat-interface.active {
            display: flex;
        }

        .mia-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: var(--chat--color-background);
            display: flex;
            flex-direction: column;
        }

        .mia-chat-widget .chat-message {
            padding: 12px 16px;
            margin: 8px 0;
            border-radius: 12px;
            max-width: 80%;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.5;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            transition: all 0.2s ease;
        }

        .mia-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            align-self: flex-end;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.2);
            border: none;
            border-bottom-right-radius: 4px;
        }

        .mia-chat-widget .chat-message.bot {
            background: var(--chat--color-background);
            border: 1px solid rgba(133, 79, 255, 0.2);
            color: var(--chat--color-font);
            align-self: flex-start;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            border-bottom-left-radius: 4px;
        }

        .mia-chat-widget .chat-input {
            padding: 16px;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .mia-chat-widget .chat-input textarea {
            flex: 1;
            padding: 12px;
            border: 1px solid rgba(133, 79, 255, 0.2);
            border-radius: 8px;
            background: var(--chat--color-background);
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 14px;
            min-height: 24px;
            max-height: 120px;
            overflow-y: auto;
            line-height: 1.4;
        }

        .mia-chat-widget .chat-input textarea::placeholder {
            color: var(--chat--color-font);
            opacity: 0.6;
        }

        .mia-chat-widget .chat-input button {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 0 20px;
            cursor: pointer;
            transition: transform 0.2s;
            font-family: inherit;
            font-weight: 500;
            height: 48px;
            min-width: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .mia-chat-widget .chat-input button:hover {
            transform: scale(1.05);
        }

        .mia-chat-widget .chat-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 30px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
            z-index: 999;
            transition: transform 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .mia-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 20px;
        }

        .mia-chat-widget .chat-toggle:hover {
            transform: scale(1.05);
        }

        .mia-chat-widget .chat-toggle svg {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }

        .mia-chat-widget .chat-footer {
            padding: 8px;
            text-align: center;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
        }

        .mia-chat-widget .chat-footer a {
            color: var(--chat--color-primary);
            text-decoration: none;
            font-size: 12px;
            opacity: 0.8;
            transition: opacity 0.2s;
            font-family: inherit;
        }

        .mia-chat-widget .chat-footer a:hover {
            opacity: 1;
        }
    `;

    // Inject styles directly (no external stylesheet)
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Default configuration
    const defaultConfig = {
        webhook: {
            url: '',
            route: ''
        },
        branding: {
            logo: '',
            name: '',
            welcomeText: '',
            responseTimeText: '',
            poweredBy: {
                text: 'Powered by n8n',
                link: 'https://n8n.io'
            }
        },
        style: {
            primaryColor: '',
            secondaryColor: '',
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#333333'
        }
    };

    // Merge user config with defaults
    const config = window.ChatWidgetConfig ? 
        {
            webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
            branding: { ...defaultConfig.branding, ...window.ChatWidgetConfig.branding },
            style: { ...defaultConfig.style, ...window.ChatWidgetConfig.style }
        } : defaultConfig;

    // Prevent multiple initializations
    if (window.MiaChatWidgetInitialized) {
        console.log("Widget already initialized, exiting");
        return;
    }
    window.MiaChatWidgetInitialized = true;

    let currentSessionId = '';

    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'mia-chat-widget';
    
    // Set CSS variables for colors
    widgetContainer.style.setProperty('--mia-chat-primary-color', config.style.primaryColor);
    widgetContainer.style.setProperty('--mia-chat-secondary-color', config.style.secondaryColor);
    widgetContainer.style.setProperty('--mia-chat-background-color', config.style.backgroundColor);
    widgetContainer.style.setProperty('--mia-chat-font-color', config.style.fontColor);

    // Create the chat container
    const chatContainer = document.createElement('div');
    chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;

    // Force image to update by adding a unique timestamp
    function updateImageWithTimestamp(imgElement, originalSrc) {
        if (!originalSrc) return;
        
        const timestamp = new Date().getTime();
        if (originalSrc.includes('?')) {
            imgElement.src = `${originalSrc}&_t=${timestamp}`;
        } else {
            imgElement.src = `${originalSrc}?_t=${timestamp}`;
        }
    }

    // Create the brand header
    const brandHeader = document.createElement('div');
    brandHeader.className = 'brand-header';
    
    const brandLogo = document.createElement('img');
    brandLogo.alt = config.branding.name || '';
    updateImageWithTimestamp(brandLogo, config.branding.logo);
    
    const brandNameSpan = document.createElement('span');
    brandNameSpan.textContent = config.branding.name || '';
    
    const closeButtonHeader = document.createElement('button');
    closeButtonHeader.className = 'close-button';
    closeButtonHeader.innerHTML = '&times;';
    
    brandHeader.appendChild(brandLogo);
    brandHeader.appendChild(brandNameSpan);
    brandHeader.appendChild(closeButtonHeader);
    
    // Create new conversation section
    const newConversation = document.createElement('div');
    newConversation.className = 'new-conversation';
    
    const welcomeHeading = document.createElement('h2');
    welcomeHeading.className = 'welcome-text';
    welcomeHeading.textContent = config.branding.welcomeText || '';
    
    const newChatButton = document.createElement('button');
    newChatButton.className = 'new-chat-btn';
    newChatButton.innerHTML = `
        <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
        </svg>
        Send us a message
    `;
    
    const responseTimePara = document.createElement('p');
    responseTimePara.className = 'response-text';
    responseTimePara.textContent = config.branding.responseTimeText || '';
    
    newConversation.appendChild(welcomeHeading);
    newConversation.appendChild(newChatButton);
    newConversation.appendChild(responseTimePara);
    
    // Create chat interface
    const chatInterface = document.createElement('div');
    chatInterface.className = 'chat-interface';
    
    // Clone brand header for chat interface
    const chatBrandHeader = brandHeader.cloneNode(true);
    // Make sure the cloned logo also has the updated image
    const chatBrandLogo = chatBrandHeader.querySelector('img');
    if (chatBrandLogo) {
        updateImageWithTimestamp(chatBrandLogo, config.branding.logo);
    }
    
    const chatMessagesDiv = document.createElement('div');
    chatMessagesDiv.className = 'chat-messages';
    
    const chatInputDiv = document.createElement('div');
    chatInputDiv.className = 'chat-input';
    
    const chatTextarea = document.createElement('textarea');
    chatTextarea.placeholder = 'Type your message here...';
    chatTextarea.rows = 1;
    
    const sendButton = document.createElement('button');
    sendButton.type = 'submit';
    sendButton.textContent = 'Send';
    
    chatInputDiv.appendChild(chatTextarea);
    chatInputDiv.appendChild(sendButton);
    
    const footerDiv = document.createElement('div');
    footerDiv.className = 'chat-footer';
    
    const poweredByLink = document.createElement('a');
    poweredByLink.href = config.branding.poweredBy?.link || '#';
    poweredByLink.target = '_blank';
    poweredByLink.textContent = config.branding.poweredBy?.text || 'Powered by n8n';
    
    footerDiv.appendChild(poweredByLink);
    
    chatInterface.appendChild(chatBrandHeader);
    chatInterface.appendChild(chatMessagesDiv);
    chatInterface.appendChild(chatInputDiv);
    chatInterface.appendChild(footerDiv);
    
    // Add all components to the chat container
    chatContainer.appendChild(brandHeader);
    chatContainer.appendChild(newConversation);
    chatContainer.appendChild(chatInterface);
    
    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
    toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
        </svg>`;
    
    // Add components to the document
    widgetContainer.appendChild(chatContainer);
    widgetContainer.appendChild(toggleButton);
    document.body.appendChild(widgetContainer);

    // Helper function to generate UUID for session tracking
    function generateUUID() {
        if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
            return crypto.randomUUID();
        } else {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    }

    // Function to start a new conversation - NO API CALLS HERE
    function startNewConversation() {
        console.log("Starting new conversation - CUSTOM VERSION WITH NO API CALL");
        
        // Generate a new session ID
        currentSessionId = generateUUID();
        
        // Switch to chat interface
        brandHeader.style.display = 'none';
        newConversation.style.display = 'none';
        chatInterface.classList.add('active');

        // Add initial welcome message from bot
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-message bot';
        botMessage.textContent = config.branding.welcomeText || 'Hi, how can I help you today?';
        
        // If the message isn't showing emoji properly, force it through a span with innerHtml
        if (config.branding.welcomeText && config.branding.welcomeText.includes('👋')) {
            botMessage.textContent = '';
            const textSpan = document.createElement('span');
            textSpan.innerHTML = config.branding.welcomeText;
            botMessage.appendChild(textSpan);
        }
        
        chatMessagesDiv.appendChild(botMessage);
        chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
    }

    // Function to send a message
    async function sendMessage(message) {
        console.log("Sending message:", message);
        
        if (!message || !message.trim()) {
            console.log("Empty message, not sending");
            return;
        }
        
        // Make sure we have a session ID
        if (!currentSessionId) {
            console.log("No session ID, generating a new one");
            currentSessionId = generateUUID();
        }
        
        // Create message payload
        const messageData = {
            action: "sendMessage",
            sessionId: currentSessionId,
            route: config.webhook.route,
            chatInput: message,
            metadata: {
                userId: "",
                domain: window.location.hostname,
                page: window.location.pathname
            }
        };
        
        console.log("Message payload:", messageData);

        // Show user message in chat
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user';
        userMessageDiv.textContent = message;
        chatMessagesDiv.appendChild(userMessageDiv);
        chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;

        try {
            console.log("Sending to endpoint:", config.webhook.url);
            // Send message to server
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
            });
            
            console.log("Response status:", response.status);
            
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log("Response data:", data);
            
            // Add bot response to chat
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chat-message bot';
            
            // Get bot response text, handling different formats
            const botText = Array.isArray(data) ? 
                (data[0]?.output || "I didn't understand that. Could you try again?") : 
                (data?.output || "I didn't understand that. Could you try again?");
            
            botMessageDiv.textContent = botText;
            chatMessagesDiv.appendChild(botMessageDiv);
            chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
        } catch (error) {
            console.error('Error sending message:', error);
            
            // Show error message
            const errorMessageDiv = document.createElement('div');
            errorMessageDiv.className = 'chat-message bot';
            errorMessageDiv.textContent = "Sorry, I couldn't send your message. Please try again later.";
            chatMessagesDiv.appendChild(errorMessageDiv);
            chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
        }
    }

    // Event listeners
    newChatButton.addEventListener('click', startNewConversation);
    
    sendButton.addEventListener('click', () => {
        const message = chatTextarea.value.trim();
        if (message) {
            sendMessage(message);
            chatTextarea.value = '';
        }
    });
    
    chatTextarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = chatTextarea.value.trim();
            if (message) {
                sendMessage(message);
                chatTextarea.value = '';
            }
        }
    });
    
    toggleButton.addEventListener('click', () => {
        chatContainer.classList.toggle('open');
    });

    // Handle close buttons
    const closeButtons = chatContainer.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            chatContainer.classList.remove('open');
        });
    });
    
    // Auto-growing textarea
    chatTextarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
    
    console.log("Mia Chat Widget initialized successfully");
})(); 