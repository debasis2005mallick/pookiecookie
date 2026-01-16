// Pookie AI Assistant Bot Logic
const botResponses = {
    'flavors': "We specialize in royal Indian-inspired cookies! 🍪 Our top stars are the **Chocho Almond Nankhatai**, **Pista Cookie**, and the **Osmania Biscuit**. Would you like to view our full collection?",
    'shipping': "Good news! We offer **FREE SHIPPING** on all orders above ₹399. For smaller orders, a standard fee applies based on your location. 🚚",
    'order': "Ordering is as sweet as our cookies! Just add your favorites to the cart and click **Checkout**. We'll coordinate the rest via WhatsApp! ✨",
    'default': "I'm not quite sure about that, Pookie. But I do know our cookies are legendary! Should I connect you with our human chef via WhatsApp? 🍪",
    'welcome': "Namaste! I'm Pookie Bot, your personal cookie concierge. How can I make your day sweeter today? ✨"
};

document.addEventListener('DOMContentLoaded', () => {
    const botToggle = document.getElementById('bot-toggle');
    const botWindow = document.getElementById('bot-window');
    const botClose = document.getElementById('bot-close-btn');
    const botSend = document.getElementById('bot-send');
    const botInput = document.getElementById('bot-input');
    const messagesContainer = document.getElementById('bot-messages');

    // Toggle Chat
    botToggle.addEventListener('click', () => {
        botWindow.classList.toggle('open');
        if (botWindow.classList.contains('open') && messagesContainer.children.length === 0) {
            addBotMessage(botResponses.welcome);
        }
        if (window.vibrate) vibrate(10);
    });

    botClose.addEventListener('click', () => {
        botWindow.classList.remove('open');
    });

    // Send Input
    botSend.addEventListener('click', handleUserInput);
    botInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserInput();
    });

    function handleUserInput() {
        const text = botInput.value.trim();
        if (!text) return;

        addUserMessage(text);
        botInput.value = '';

        showTypingIndicator();

        // Simple Keyword logic
        const lowerText = text.toLowerCase();
        setTimeout(() => {
            removeTypingIndicator();
            if (lowerText.includes('flavor') || lowerText.includes('taste') || lowerText.includes('menu')) {
                addBotMessage(botResponses.flavors);
            } else if (lowerText.includes('ship') || lowerText.includes('deliver') || lowerText.includes('cost')) {
                addBotMessage(botResponses.shipping);
            } else if (lowerText.includes('order') || lowerText.includes('buy') || lowerText.includes('check')) {
                addBotMessage(botResponses.order);
            } else {
                addBotMessage(botResponses.default);
            }
        }, 1500);
    }

    function showTypingIndicator() {
        const div = document.createElement('div');
        div.className = 'message bot-msg typing-indicator';
        div.id = 'bot-typing';
        div.innerHTML = '<span>.</span><span>.</span><span>.</span>';
        messagesContainer.appendChild(div);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('bot-typing');
        if (indicator) indicator.remove();
    }

    function addUserMessage(text) {
        const div = document.createElement('div');
        div.className = 'message user-msg';
        div.textContent = text;
        messagesContainer.appendChild(div);
        scrollToBottom();
    }

    function addBotMessage(text) {
        const div = document.createElement('div');
        div.className = 'message bot-msg';
        div.innerHTML = text; // innerHTML for bolding
        messagesContainer.appendChild(div);
        scrollToBottom();
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Global for button clicks
    window.botResponse = (type) => {
        const response = botResponses[type] || botResponses.default;
        addUserMessage(document.querySelector(`[onclick="botResponse('${type}')"]`).textContent);
        showTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator();
            addBotMessage(response);
        }, 1000);
    };
});
