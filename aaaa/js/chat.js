class Chat {
    constructor() {
        this.chatMessages = document.querySelector('.chat-messages');
        this.chatInput = document.querySelector('#chat-input');
        this.sendBtn = document.querySelector('#send-btn');
        
        // 定义对话规则
        this.rules = [
            {
                pattern: /(你好|嗨|hi|hello|hey)/i,
                responses: [
                    '你好啊！今天过得怎么样？',
                    '嗨！很高兴见到你！',
                    '你好！要不要聊聊天？'
                ]
            },
            {
                pattern: /(照片|图片|作品)/,
                responses: [
                    '这些都是我很喜欢的照片呢',
                    '每张照片背后都有一个小故事',
                    '很高兴你对这些照片感兴趣！',
                    '你最喜欢哪张照片呢？'
                ]
            },
            {
                pattern: /(天气|下雨|太阳|阴天)/,
                responses: [
                    '今天天气确实不错呢',
                    '是啊，天气对心情影响很大',
                    '适合拍照的好天气呢！'
                ]
            },
            {
                pattern: /(名字|叫什么)/,
                responses: [
                    '我是这个网站的主人啊',
                    '你可以叫我小主人哦',
                    '这是个秘密哦～'
                ]
            }
        ];
        
        this.defaultResponses = [
            '嗯嗯，继续说说看！',
            '这个想法很有趣呢',
            '原来是这样啊',
            '说得很对呢',
            '要不换个话题？',
            '你觉得呢？'
        ];

        this.init();
    }

    init() {
        this.bindEvents();
        this.addWelcomeMessage();
    }

    bindEvents() {
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    addWelcomeMessage() {
        const welcomeMsg = '👋 你好啊！要不要和我聊聊天？';
        this.addMessage(welcomeMsg, 'host');
    }

    addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.textContent = text;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    getResponse(message) {
        for (const rule of this.rules) {
            if (rule.pattern.test(message.toLowerCase())) {
                const responses = rule.responses;
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
        return this.defaultResponses[Math.floor(Math.random() * this.defaultResponses.length)];
    }

    async sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;

        this.addMessage(message, 'visitor');
        this.chatInput.value = '';

        const thinkingTime = Math.random() * 1000 + 500;
        setTimeout(() => {
            const response = this.getResponse(message);
            this.addMessage(response, 'host');
        }, thinkingTime);
    }
}