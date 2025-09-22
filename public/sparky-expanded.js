/* =============================================
   SPARKY EXPANDED FEATURES 🎮🎯🎪
   ============================================= */

class SparkyExpandedFeatures {
    constructor() {
        this.userProfile = {
            name: null,
            favoriteTopics: [],
            gamesPlayed: 0,
            totalInteractions: 0,
            lastVisit: null,
            achievements: []
        };
        
        this.currentGame = null;
        this.gameSession = null;
        
        this.loadUserProfile();
        this.initializeDailyContent();
    }
    
    /* =============================================
       MINI-GAMES 🎮
       ============================================= */
    
    getGamesList() {
        return {
            trivia: {
                name: "Tech Trivia 🧠",
                description: "Test your tech knowledge!",
                emoji: "🧠",
                handler: () => this.startTrivia()
            },
            riddles: {
                name: "Brain Riddles 🧩", 
                description: "Solve mind-bending riddles!",
                emoji: "🧩",
                handler: () => this.startRiddles()
            },
            wordAssociation: {
                name: "Word Chain 🔗",
                description: "Keep the word chain going!",
                emoji: "🔗", 
                handler: () => this.startWordAssociation()
            },
            quickMath: {
                name: "Quick Math ⚡",
                description: "Lightning fast calculations!",
                emoji: "⚡",
                handler: () => this.startQuickMath()
            },
            guessTheCode: {
                name: "Code Guesser 💻",
                description: "Guess the programming language!",
                emoji: "💻",
                handler: () => this.startCodeGuessing()
            }
        };
    }
    
    startTrivia() {
        const questions = [
            {
                question: "What does HTML stand for?",
                options: ["Hypertext Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
                correct: 0,
                explanation: "HTML stands for Hypertext Markup Language - the foundation of all web pages! 🌐"
            },
            {
                question: "Which company created JavaScript?",
                options: ["Microsoft", "Netscape", "Google"],
                correct: 1,
                explanation: "JavaScript was created by Netscape in just 10 days by Brendan Eich! 🚀"
            },
            {
                question: "What year was the first iPhone released?",
                options: ["2006", "2007", "2008"],
                correct: 1,
                explanation: "The iPhone was released in 2007 and changed everything! 📱"
            }
        ];
        
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        this.currentGame = {
            type: 'trivia',
            question: randomQuestion,
            score: 0
        };
        
        return {
            type: 'game',
            content: `🧠 **TECH TRIVIA TIME!** 🧠\n\n${randomQuestion.question}`,
            options: randomQuestion.options,
            gameData: randomQuestion
        };
    }
    
    startRiddles() {
        const riddles = [
            {
                riddle: "I speak without a mouth and hear without ears. I have no body, but come alive with wind. What am I?",
                answer: "echo",
                hint: "Think about sound bouncing back...",
                explanation: "An echo! 🔊 Just like how good code echoes good practices!"
            },
            {
                riddle: "The more you take, the more you leave behind. What am I?",
                answer: "footsteps",
                hint: "Think about walking...",
                explanation: "Footsteps! 👣 Like leaving a trail of awesome code behind you!"
            },
            {
                riddle: "I'm not alive, but I grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I?",
                answer: "fire",
                hint: "Think about something that needs oxygen...",
                explanation: "Fire! 🔥 Like the fire of passion for coding!"
            }
        ];
        
        const randomRiddle = riddles[Math.floor(Math.random() * riddles.length)];
        this.currentGame = {
            type: 'riddle',
            riddle: randomRiddle,
            attempts: 0,
            maxAttempts: 3
        };
        
        return {
            type: 'game',
            content: `🧩 **RIDDLE ME THIS!** 🧩\n\n${randomRiddle.riddle}\n\nType your answer or say "hint" for a clue!`,
            gameData: randomRiddle
        };
    }
    
    startWordAssociation() {
        const startWords = ['computer', 'internet', 'coding', 'creative', 'design', 'innovation', 'digital', 'awesome'];
        const startWord = startWords[Math.floor(Math.random() * startWords.length)];
        
        this.currentGame = {
            type: 'wordAssociation',
            lastWord: startWord,
            chain: [startWord],
            score: 0
        };
        
        return {
            type: 'game',
            content: `🔗 **WORD ASSOCIATION CHAIN!** 🔗\n\nI'll start with: **${startWord}**\n\nNow you give me a word that relates to "${startWord}"!\n\nExample: computer → keyboard, coding → javascript, etc.`,
            gameData: { currentWord: startWord }
        };
    }
    
    startQuickMath() {
        const num1 = Math.floor(Math.random() * 50) + 1;
        const num2 = Math.floor(Math.random() * 50) + 1;
        const operations = ['+', '-', '*'];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        
        let answer;
        switch(operation) {
            case '+': answer = num1 + num2; break;
            case '-': answer = num1 - num2; break;
            case '*': answer = num1 * num2; break;
        }
        
        this.currentGame = {
            type: 'quickMath',
            question: `${num1} ${operation} ${num2}`,
            answer: answer,
            startTime: Date.now()
        };
        
        return {
            type: 'game',
            content: `⚡ **QUICK MATH CHALLENGE!** ⚡\n\nSolve this as fast as you can:\n\n**${num1} ${operation} ${num2} = ?**\n\nType just the number!`,
            gameData: { question: `${num1} ${operation} ${num2}`, answer }
        };
    }
    
    /* =============================================
       KNOWLEDGE BASE 🧠📚
       ============================================= */
    
    getExpandedKnowledge() {
        return {
            tech: {
                trends: [
                    "AI is revolutionizing how we code! 🤖 GitHub Copilot and ChatGPT are changing the game!",
                    "WebAssembly is making web apps incredibly fast! 🚀 Near-native performance in browsers!",
                    "Edge computing is bringing processing closer to users! ⚡ Faster, more responsive apps!",
                    "Quantum computing is getting real! 🔬 IBM and Google are making huge breakthroughs!",
                    "Web3 and blockchain are creating new possibilities! 🌐 Decentralized everything!"
                ],
                tips: [
                    "Always write code like the person maintaining it is a violent psychopath who knows where you live! 😱💻",
                    "The best debugging tool? A good night's sleep! 😴 Fresh eyes catch more bugs!",
                    "Code reviews are like going to the dentist - uncomfortable but necessary! 🦷👨‍💻",
                    "If you're not embarrassed by your code from 6 months ago, you're not learning fast enough! 📈",
                    "The most dangerous phrase in programming: 'It works on my machine!' 🤷‍♂️💻"
                ]
            },
            
            popCulture: [
                "Did you know? The first emoji was created in 1999! 😀 Now we have over 3,000!",
                "Fun fact: TikTok was originally called Musical.ly! 🎵 Now it's taken over the world!",
                "Netflix was founded in 1997 as a DVD-by-mail service! 📀 How times change!",
                "The term 'Google' comes from 'googol' - a number with 100 zeros! 🔢",
                "Twitter's original name was 'twttr' - they bought the vowels later! 🐦"
            ],
            
            science: [
                "Amazing fact: Your brain has about 86 billion neurons! 🧠 That's more than stars in the Milky Way!",
                "Mind-blowing: Light takes 8 minutes to travel from the Sun to Earth! ☀️⚡",
                "Cool fact: Sharks have been around longer than trees! 🦈🌳 400 million vs 350 million years!",
                "Incredible: A single cloud can weigh over a million pounds! ☁️⚖️ Yet it floats!",
                "Wild fact: Octopuses have blue blood and three hearts! 🐙💙 Talk about being extra!"
            ],
            
            history: [
                "The first computer bug was literally a bug! 🐛 A moth found in Harvard's Mark II computer in 1947!",
                "ENIAC, one of the first computers, weighed 30 tons and filled a room! 💻🏠 Now your phone is more powerful!",
                "The @ symbol was first used in email by Ray Tomlinson in 1971! 📧 Changed communication forever!",
                "The term 'smartphone' was first used in 1995! 📱 Way before the iPhone existed!",
                "The first website ever created is still online! 🌐 Check out info.cern.ch - from 1991!"
            ],
            
            motivation: [
                "Every expert was once a beginner! 🌱➡️🌳 Your coding journey is just getting started!",
                "Bugs are just undocumented features waiting to be discovered! 🐛✨ Stay positive!",
                "Code is like humor - if you have to explain it, it's probably not that good! 😄💻",
                "The only way to learn programming is by programming! 🚀 Keep building amazing things!",
                "Remember: You're not just writing code, you're solving problems and creating magic! ✨🔮"
            ]
        };
    }
    
    /* =============================================
       INTERACTIVE ELEMENTS 🎯🗳️
       ============================================= */
    
    getWouldYouRather() {
        const questions = [
            {
                question: "Would you rather debug someone else's spaghetti code OR write documentation for undocumented legacy code?",
                optionA: "Debug spaghetti code 🍝",
                optionB: "Write documentation 📝"
            },
            {
                question: "Would you rather have AI write all your code OR never be able to use Stack Overflow again?",
                optionA: "AI writes my code 🤖",
                optionB: "No more Stack Overflow 🚫"
            },
            {
                question: "Would you rather work only with CSS OR only with JavaScript for the rest of your career?",
                optionA: "CSS forever 🎨",
                optionB: "JavaScript forever ⚡"
            }
        ];
        
        return questions[Math.floor(Math.random() * questions.length)];
    }
    
    getPersonalityTest() {
        return {
            question: "What's your ideal coding environment?",
            options: [
                { text: "Dark theme, multiple monitors, RGB everything! 🌈💻", personality: "The RGB Warrior" },
                { text: "Minimalist setup, light theme, just me and my code 🤍✨", personality: "The Zen Coder" },
                { text: "Coffee shop chaos, laptop, headphones, pure focus ☕🎧", personality: "The Nomad Developer" },
                { text: "Home office, plants, natural light, cozy vibes 🌱🏠", personality: "The Garden Programmer" }
            ]
        };
    }
    
    /* =============================================
       EASTER EGGS & SECRETS 🥚🔐
       ============================================= */
    
    getEasterEggs() {
        return {
            "konami": {
                trigger: "up up down down left right left right b a",
                response: "🎮 KONAMI CODE ACTIVATED! 🎮\n\nYou've unlocked SUPER SPARKY MODE! ⚡💥\n\nI'm now 200% more awesome! (Which wasn't even possible!)"
            },
            "matrix": {
                trigger: ["matrix", "neo", "red pill", "blue pill"],
                response: "🔴💊 Welcome to the Matrix! 💊🔵\n\nThere is no spoon... but there is definitely JavaScript! 🥄➡️☕"
            },
            "42": {
                trigger: "42",
                response: "🌌 THE ANSWER TO LIFE, THE UNIVERSE, AND EVERYTHING! 🌌\n\nDouglas Adams was right all along! Now... what was the question? 🤔"
            },
            "hello world": {
                trigger: "hello world",
                response: "👋🌍 The classic first program! 👋🌍\n\nEvery coding journey starts here! Welcome to the wonderful world of programming! 🚀"
            },
            "rubber duck": {
                trigger: ["rubber duck", "duck debugging"],
                response: "🦆 QUACK QUACK! 🦆\n\nAh, the noble art of rubber duck debugging! Sometimes the best debugger has feathers! 🐛➡️🦆"
            }
        };
    }
    
    /* =============================================
       DAILY CONTENT 📅✨
       ============================================= */
    
    initializeDailyContent() {
        const today = new Date().toDateString();
        this.dailyContent = {
            date: today,
            quote: this.getDailyQuote(),
            fact: this.getDailyFact(),
            joke: this.getDailyJoke(),
            challenge: this.getDailyChallenge()
        };
    }
    
    getDailyQuote() {
        const quotes = [
            "Code is like humor. When you have to explain it, it's bad. - Cory House 😄",
            "First, solve the problem. Then, write the code. - John Johnson 🎯", 
            "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler 👥",
            "The best error message is the one that never shows up. - Thomas Fuchs ✨",
            "Simplicity is the ultimate sophistication. - Leonardo da Vinci 🎨"
        ];
        
        const dayIndex = new Date().getDate() % quotes.length;
        return quotes[dayIndex];
    }
    
    getDailyFact() {
        const facts = [
            "The first computer programmer was Ada Lovelace in 1843! 👩‍💻 She wrote the first algorithm!",
            "Python was named after Monty Python's Flying Circus! 🐍🎭 Not the snake!",
            "The term 'bug' in programming comes from an actual moth found in a computer! 🦋💻",
            "JavaScript was created in just 10 days! ⚡ Talk about rapid development!",
            "Linux powers 96.3% of the world's top 1 million web servers! 🐧🌐"
        ];
        
        const dayIndex = new Date().getDate() % facts.length;
        return facts[dayIndex];
    }
    
    getDailyJoke() {
        const jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs! 🐛💡",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡🔧",
            "Why did the programmer quit his job? He didn't get arrays! 📊💰",
            "What's a programmer's favorite hangout place? The Foo Bar! 🍺👨‍💻",
            "Why do Java developers wear glasses? Because they can't C#! 👓☕"
        ];
        
        const dayIndex = new Date().getDate() % jokes.length;
        return jokes[dayIndex];
    }
    
    getDailyChallenge() {
        const challenges = [
            "Try writing a function without using any loops today! 🔄❌ Use recursion or array methods!",
            "Code something with CSS animations today! 🎨✨ Make it bounce, spin, or fade!",
            "Build a mini-project in under 30 minutes! ⏰🚀 Speed coding challenge!",
            "Refactor some old code to make it cleaner! 🧹💻 Future you will thank you!",
            "Learn one new JavaScript method today! 📚⚡ MDN docs are your friend!"
        ];
        
        const dayIndex = new Date().getDate() % challenges.length;
        return challenges[dayIndex];
    }
    
    /* =============================================
       STORYTELLING & ADVENTURES 📚🗺️
       ============================================= */
    
    getRandomStory() {
        const stories = [
            {
                title: "The Debugging Dragon 🐉",
                intro: "Once upon a time, in a land of infinite loops, there lived a debugging dragon who terrorized programmers...",
                choices: [
                    { text: "Face the dragon with console.log() 🔍", next: "brave_path" },
                    { text: "Try to sneak past with stealth mode 🥷", next: "stealth_path" },
                    { text: "Offer the dragon some coffee ☕", next: "coffee_path" }
                ]
            },
            {
                title: "The Quest for the Perfect Framework ⚔️",
                intro: "You are a brave developer seeking the legendary Perfect Framework that solves all problems...",
                choices: [
                    { text: "Head to React Mountain 🏔️", next: "react_path" },
                    { text: "Venture into Vue Valley 🌄", next: "vue_path" },
                    { text: "Explore Angular Archipelago 🏝️", next: "angular_path" }
                ]
            }
        ];
        
        return stories[Math.floor(Math.random() * stories.length)];
    }
    
    continueStory(choice, storyPath) {
        const storyPaths = {
            brave_path: "You bravely approach the dragon with console.log()! The dragon reveals it was just a syntax error in disguise! 🎉 Victory!",
            stealth_path: "You sneak past successfully, but realize you learned nothing. The dragon still haunts other developers! 😅",
            coffee_path: "The dragon LOVES coffee! You become best friends and debug code together forever! ☕❤️",
            react_path: "React Mountain is steep but rewarding! You learn hooks and feel the power! ⚛️✨",
            vue_path: "Vue Valley is peaceful and elegant. You find harmony in simplicity! 🌸",
            angular_path: "Angular Archipelago is complex but powerful. You master TypeScript and feel unstoppable! 🚀"
        };
        
        return storyPaths[storyPath] || "Your adventure continues in mysterious ways... 🌟";
    }
    
    /* =============================================
       USER MEMORY SYSTEM 🧠💾
       ============================================= */
    
    saveUserProfile() {
        localStorage.setItem('sparkyUserProfile', JSON.stringify(this.userProfile));
    }
    
    loadUserProfile() {
        const saved = localStorage.getItem('sparkyUserProfile');
        if (saved) {
            this.userProfile = { ...this.userProfile, ...JSON.parse(saved) };
        }
    }
    
    updateUserStats(action) {
        this.userProfile.totalInteractions++;
        this.userProfile.lastVisit = new Date().toISOString();
        
        if (action === 'game') {
            this.userProfile.gamesPlayed++;
        }
        
        this.saveUserProfile();
    }
    
    addAchievement(achievement) {
        if (!this.userProfile.achievements.includes(achievement)) {
            this.userProfile.achievements.push(achievement);
            this.saveUserProfile();
            return `🏆 **ACHIEVEMENT UNLOCKED!** 🏆\n\n${achievement}`;
        }
        return null;
    }
    
    /* =============================================
       UTILITY METHODS 🛠️
       ============================================= */
    
    getRandomFromCategory(category) {
        const knowledge = this.getExpandedKnowledge();
        const items = knowledge[category];
        
        if (Array.isArray(items)) {
            return items[Math.floor(Math.random() * items.length)];
        } else {
            const subCategory = Object.keys(items)[Math.floor(Math.random() * Object.keys(items).length)];
            const subItems = items[subCategory];
            return subItems[Math.floor(Math.random() * subItems.length)];
        }
    }
    
    processGameAnswer(answer, gameType) {
        if (!this.currentGame || this.currentGame.type !== gameType) {
            return "No active game! Start a new one! 🎮";
        }
        
        // Game-specific answer processing logic would go here
        // This is a simplified version
        return "Game answer processed! 🎯";
    }
}

// Export for use in main Sparky chatbot
if (typeof window !== 'undefined') {
    window.SparkyExpandedFeatures = SparkyExpandedFeatures;
}