/**
 * Acephale OS | Gardener.js
 * Hacker News Interface Styling & Data Fetching
 */

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

const STYLE_PRESETS = {
    "Apple": `
        :root {
            --bg: #000;
            --card: rgba(28, 28, 30, 0.7);
            --accent: #0071e3;
            --text: #f5f5f7;
            --subtext: #86868b;
        }
        body {
            background: var(--bg);
            color: var(--text);
            font-family: "SF Pro Display", -apple-system, system-ui, sans-serif;
            margin: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            -webkit-font-smoothing: antialiased;
        }
        .hn-header {
            background: rgba(0,0,0,0.8);
            backdrop-filter: saturate(180%) blur(20px);
            padding: 0 40px;
            height: 52px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #333;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        .hn-logo {
            font-size: 20px;
            font-weight: 600;
            color: #fff;
            text-decoration: none;
            margin-right: 30px;
        }
        .hn-nav-links a {
            color: var(--subtext);
            text-decoration: none;
            font-size: 12px;
            margin-right: 20px;
            transition: color 0.3s;
        }
        .hn-nav-links a:hover { color: #fff; }
        
        .hn-main {
            max-width: 1000px;
            margin: 60px auto;
            padding: 0 40px;
            flex: 1;
        }
        .hn-story-list { display: grid; gap: 20px; }
        .hn-story-item {
            background: var(--card);
            backdrop-filter: blur(30px);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 22px;
            padding: 24px;
            display: flex;
            align-items: center;
            gap: 20px;
            transition: all 0.5s cubic-bezier(0.15, 0.83, 0.66, 1);
        }
        .hn-story-item:hover {
            transform: scale(1.02) translateY(-5px);
            background: rgba(44, 44, 46, 0.8);
            border-color: rgba(255,255,255,0.2);
            box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }
        .hn-story-rank { font-size: 32px; font-weight: 700; color: var(--subtext); width: 50px; text-align: right; }
        .hn-story-title { font-size: 20px; font-weight: 600; color: #fff; text-decoration: none; display: block; margin-bottom: 6px; }
        .hn-story-meta { color: var(--subtext); font-size: 13px; font-weight: 500; }
        .hn-upvote {
            background: var(--accent);
            color: white;
            border: none;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 113, 227, 0.3);
        }
        .hn-load-more {
            background: #fff;
            color: #000;
            border: none;
            padding: 16px 32px;
            border-radius: 30px;
            font-weight: 600;
            margin: 60px auto;
            display: block;
            cursor: pointer;
            transition: 0.2s;
        }
        .hn-load-more:hover { transform: scale(1.05); }

        .hn-footer { padding: 100px 40px; background: #000; border-top: 1px solid #111; color: var(--subtext); text-align: center; }
        .hn-footer-links a { color: var(--subtext); text-decoration: none; margin: 0 15px; font-size: 12px; }
    `,

    "Cyberpunk 2077": `
        @keyframes glitch {
            0% { transform: translate(0) }
            20% { transform: translate(-2px, 2px) }
            40% { transform: translate(-2px, -2px) }
            60% { transform: translate(2px, 2px) }
            80% { transform: translate(2px, -2px) }
            100% { transform: translate(0) }
        }
        @keyframes scanline {
            0% { transform: translateY(-100%) }
            100% { transform: translateY(100%) }
        }
        :root {
            --yellow: #fcee0a;
            --blue: #00f0ff;
            --pink: #ff003c;
            --black: #050a0e;
        }
        body {
            background: var(--black);
            color: var(--yellow);
            font-family: 'Rajdhani', sans-serif;
            margin: 0;
            text-transform: uppercase;
            overflow-x: hidden;
        }
        body::before {
            content: "";
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px);
            pointer-events: none;
            z-index: 1000;
        }
        .hn-header {
            background: var(--yellow);
            color: #000;
            padding: 20px 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            clip-path: polygon(0 0, 100% 0, 100% 70%, 95% 100%, 0 100%);
            border-bottom: 5px solid var(--blue);
            animation: glitch 0.2s infinite;
            animation-play-state: paused;
        }
        .hn-header:hover { animation-play-state: running; }
        .hn-logo { font-size: 40px; font-weight: 900; letter-spacing: -2px; border: 4px solid #000; padding: 0 10px; }
        
        .hn-main { max-width: 1200px; margin: 60px auto; padding: 0 20px; flex: 1; }
        .hn-story-item {
            background: rgba(255, 0, 60, 0.05);
            border: 2px solid var(--blue);
            margin-bottom: 30px;
            padding: 30px;
            position: relative;
            clip-path: polygon(0 0, 95% 0, 100% 20%, 100% 100%, 5% 100%, 0 80%);
            transition: 0.3s;
        }
        .hn-story-item:hover {
            background: rgba(0, 240, 255, 0.1);
            transform: skewX(-2deg);
            border-color: var(--pink);
            box-shadow: -10px 10px 0 var(--pink);
        }
        .hn-story-item::after {
            content: "CONNECTED";
            position: absolute;
            top: 5px; right: 20px; font-size: 10px; color: var(--blue);
        }
        .hn-story-title { color: var(--yellow); font-size: 24px; font-weight: 800; text-decoration: none; text-shadow: 2px 2px 0 #000; }
        .hn-story-meta { color: var(--blue); margin-top: 15px; font-size: 12px; letter-spacing: 2px; }
        .hn-upvote { background: var(--pink); color: #fff; border: none; padding: 10px 20px; font-weight: 900; cursor: pointer; clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%); }
        .hn-load-more {
            background: var(--yellow);
            color: #000;
            width: 100%;
            padding: 30px;
            font-size: 30px;
            font-weight: 900;
            border: none;
            clip-path: polygon(0 20%, 100% 0, 100% 80%, 0 100%);
            cursor: pointer;
        }
        .hn-load-more:hover { background: var(--blue); color: #000; }

        .hn-footer { background: #000; color: var(--yellow); padding: 100px 40px; border-top: 2px solid var(--blue); }
    `,

    "Nintendo": `
        :root {
            --red: #e60012;
            --blue: #00a0e9;
            --white: #ffffff;
            --gray: #8c8c8c;
        }
        body {
            background-color: #eee;
            color: #333;
            font-family: "Arial Rounded MT Bold", sans-serif;
            margin: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        .hn-header {
            background: var(--red);
            padding: 30px 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 12px solid #000;
        }
        .hn-logo {
            background: #fff;
            color: var(--red);
            padding: 10px 30px;
            border-radius: 100px;
            font-size: 32px;
            font-weight: 900;
            text-decoration: none;
            border: 5px solid #000;
            box-shadow: 8px 8px 0 #000;
        }
        .hn-site-title { color: #fff; font-size: 40px; letter-spacing: -2px; text-shadow: 4px 4px 0 #000; }
        
        .hn-main {
            max-width: 1100px;
            margin: 40px auto;
            flex: 1;
            display: flex;
            padding: 0 40px;
            gap: 20px;
        }
        .hn-story-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 30px;
        }
        .hn-story-item {
            background: #fff;
            border: 6px solid #000;
            border-radius: 40px;
            padding: 30px;
            display: flex;
            flex-direction: column;
            position: relative;
            box-shadow: 12px 12px 0 #ccc;
            transition: 0.1s;
        }
        .hn-story-item:hover {
            transform: translateY(-8px);
            box-shadow: 12px 20px 0 #bbb;
            border-color: var(--blue);
        }
        .hn-story-item:active { transform: translateY(4px); box-shadow: 8px 8px 0 #bbb; }
        
        .hn-story-rank {
            position: absolute;
            top: -20px; left: 20px;
            background: var(--blue);
            color: #fff;
            padding: 5px 15px;
            border-radius: 20px;
            border: 5px solid #000;
            font-weight: 900;
        }
        .hn-story-title { font-size: 20px; font-weight: 900; line-height: 1.2; color: #000; text-decoration: none; margin: 10px 0; }
        .hn-upvote {
            background: var(--red);
            color: #fff;
            border: 5px solid #000;
            border-radius: 15px;
            width: 100%;
            padding: 15px;
            font-weight: 900;
            cursor: pointer;
            margin-top: auto;
        }
        .hn-load-more {
            grid-column: 1 / -1;
            background: #fff;
            border: 8px solid #000;
            border-radius: 100px;
            padding: 25px;
            font-size: 28px;
            font-weight: 900;
            cursor: pointer;
            box-shadow: 0 10px 0 #000;
        }
        .hn-load-more:active { transform: translateY(10px); box-shadow: 0 0px 0 #000; }

        .hn-footer { background: #000; color: #fff; padding: 100px; text-align: center; }
    `,

    "SONY": `
        :root {
            --ps-blue: #0037c1;
            --ps-dark: #000000;
            --ps-white: #ffffff;
            --ps-bg: #0a0d14;
        }
        body {
            background-color: var(--ps-bg);
            color: var(--ps-white);
            font-family: "SST", Arial, sans-serif;
            margin: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background-image: 
                radial-gradient(circle at 0% 0%, rgba(0, 55, 193, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 100% 100%, rgba(0, 55, 193, 0.1) 0%, transparent 50%);
        }
        .hn-header {
            padding: 40px 80px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .hn-logo {
            font-size: 40px;
            font-weight: 100;
            letter-spacing: 12px;
            color: #fff;
            text-transform: uppercase;
            text-decoration: none;
        }
        .hn-nav-links a {
            color: rgba(255,255,255,0.4);
            text-transform: uppercase;
            letter-spacing: 3px;
            text-decoration: none;
            margin-left: 40px;
            font-size: 13px;
            transition: 0.5s;
        }
        .hn-nav-links a:hover { color: #fff; text-shadow: 0 0 15px var(--ps-blue); }
        
        .hn-main { max-width: 1400px; margin: 0 auto; flex: 1; padding: 40px 80px; }
        .hn-story-list { display: flex; flex-direction: column; gap: 4px; }
        .hn-story-item {
            background: linear-gradient(90deg, rgba(255,255,255,0.05), transparent);
            padding: 25px 40px;
            display: flex;
            align-items: center;
            transition: 0.6s cubic-bezier(0.2, 1, 0.2, 1);
            position: relative;
            overflow: hidden;
            border-left: 2px solid transparent;
        }
        .hn-story-item:hover {
            background: linear-gradient(90deg, rgba(0, 55, 193, 0.2), transparent);
            transform: translateX(20px);
            border-left: 2px solid var(--ps-blue);
        }
        .hn-story-rank { font-size: 14px; color: rgba(255,255,255,0.2); width: 60px; font-weight: 300; }
        .hn-story-title { font-size: 26px; font-weight: 200; color: #fff; text-decoration: none; letter-spacing: 1px; }
        .hn-story-meta { color: rgba(255,255,255,0.3); font-size: 13px; margin-top: 10px; text-transform: uppercase; letter-spacing: 1px; }
        
        .hn-load-more {
            background: transparent;
            color: #fff;
            border: 1px solid rgba(255,255,255,0.2);
            padding: 25px;
            border-radius: 100px;
            width: 100%;
            margin: 100px 0;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 5px;
            cursor: pointer;
            transition: 0.4s;
        }
        .hn-load-more:hover { background: #fff; color: #000; box-shadow: 0 0 50px rgba(255,255,255,0.2); }

        .hn-footer { padding: 150px 80px; border-top: 1px solid rgba(255,255,255,0.05); text-align: center; }
    `,

    "Anthropic": `
        :root {
            --a-bg: #fdfaf5;
            --a-text: #1b1b1b;
            --a-accent: #d97757;
            --a-sub: #666;
        }
        body {
            background-color: var(--a-bg);
            color: var(--a-text);
            font-family: "Inter", system-ui, sans-serif;
            margin: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        .hn-header {
            padding: 60px 100px;
            max-width: 1200px;
            margin: 0 auto;
            width: 100%;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: baseline;
        }
        .hn-logo { font-family: "Ibarra Real Nova", serif; font-size: 34px; color: var(--a-text); text-decoration: none; font-weight: 600; }
        .hn-nav-links a { color: var(--a-sub); text-decoration: none; margin-left: 40px; font-size: 16px; border-bottom: 1px solid transparent; }
        .hn-nav-links a:hover { color: var(--a-text); border-bottom-color: var(--a-accent); }
        
        .hn-main { max-width: 800px; margin: 0 auto; flex: 1; padding: 0 40px; }
        .hn-story-item {
            padding: 50px 0;
            border-bottom: 1px solid rgba(0,0,0,0.08);
            display: flex;
            gap: 30px;
        }
        .hn-story-title {
            font-family: "Ibarra Real Nova", serif;
            font-size: 32px;
            font-weight: 500;
            line-height: 1.25;
            color: var(--a-text);
            text-decoration: none;
            transition: color 0.3s;
        }
        .hn-story-title:hover { color: var(--a-accent); }
        .hn-story-domain { color: var(--a-accent); font-weight: 600; font-size: 15px; margin-left: 10px; }
        .hn-story-meta { color: var(--a-sub); font-size: 15px; margin-top: 20px; font-style: italic; }
        .hn-upvote {
            background: none;
            border: 1.5px solid #ccc;
            border-radius: 50%;
            width: 44px;
            height: 44px;
            color: #999;
            cursor: pointer;
            flex-shrink: 0;
            transition: 0.3s;
        }
        .hn-upvote:hover { border-color: var(--a-accent); color: var(--a-accent); }
        
        .hn-load-more {
            background: var(--a-text);
            color: var(--a-bg);
            border: none;
            padding: 20px 60px;
            border-radius: 100px;
            font-size: 18px;
            margin: 100px auto;
            display: block;
            cursor: pointer;
        }

        .hn-footer { padding: 100px 40px; border-top: 1px solid rgba(0,0,0,0.05); text-align: center; color: var(--a-sub); }
    `,

    "Google": `
        :root {
            --g-blue: #1a73e8;
            --g-bg: #f8f9fa;
        }
        body {
            background: #fff;
            color: #202124;
            font-family: "Roboto", Arial, sans-serif;
            margin: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        .hn-header {
            padding: 20px 30px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #ddd;
        }
        .hn-logo {
            font-size: 24px;
            font-weight: bold;
            color: #4285F4;
            text-decoration: none;
        }
        .hn-logo span:nth-child(2) { color: #EA4335; }
        .hn-logo span:nth-child(3) { color: #FBBC05; }
        .hn-logo span:nth-child(4) { color: #4285F4; }
        .hn-logo span:nth-child(5) { color: #34A853; }
        .hn-logo span:nth-child(6) { color: #EA4335; }

        .hn-main { max-width: 800px; margin: 30px 160px; flex: 1; }
        .hn-story-item {
            padding: 16px 0;
            margin-bottom: 12px;
        }
        .hn-story-title { font-size: 20px; color: #1a0dab; text-decoration: none; line-height: 1.58; }
        .hn-story-title:hover { text-decoration: underline; }
        .hn-story-domain { color: #5f6368; font-size: 14px; }
        .hn-story-meta { color: #4d5156; font-size: 14px; margin-top: 4px; }
        
        .hn-load-more {
            background: #f8f9fa;
            border: 1px solid #dadce0;
            padding: 10px 24px;
            border-radius: 4px;
            color: #3c4043;
            font-weight: 500;
            margin: 30px 0;
            cursor: pointer;
        }
    `,

    "Samsung": `
        :root {
            --s-blue: #034EA2;
            --s-gray: #f4f4f4;
        }
        body {
            background: #fff;
            color: #000;
            font-family: "SamsungOne", sans-serif;
            margin: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        .hn-header {
            padding: 80px 60px 40px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        .hn-site-title { font-size: 60px; font-weight: 700; letter-spacing: -2px; }
        .hn-nav-links { display: flex; gap: 40px; }
        .hn-nav-links a { color: #000; font-weight: 600; text-decoration: none; font-size: 18px; }
        
        .hn-main { padding: 40px 60px; flex: 1; }
        .hn-story-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 40px; }
        .hn-story-item {
            background: var(--s-gray);
            border-radius: 40px;
            padding: 50px;
            display: flex;
            flex-direction: column;
            transition: 0.4s;
        }
        .hn-story-item:hover { background: #e8e8e8; transform: scale(1.02); }
        .hn-story-title { font-size: 28px; font-weight: 700; text-decoration: none; color: #000; margin-bottom: 20px; }
        .hn-upvote { background: var(--s-blue); color: #fff; border: none; padding: 15px 30px; border-radius: 100px; font-weight: 700; width: fit-content; cursor: pointer; }
    `
};

const COMMON_STYLE = `
    ul, ol { list-style: none; padding: 0; margin: 0; }
    button { font-family: inherit; }
    * { box-sizing: border-box; }
`;

/**
 * Data Fetching Logic
 */
const HNData = {
    allStoryIds: [],

    async fetchAllIds() {
        if (this.allStoryIds.length > 0) return this.allStoryIds;
        try {
            const response = await fetch(`${BASE_URL}/topstories.json`);
            this.allStoryIds = await response.json();
            return this.allStoryIds;
        } catch (error) {
            console.error("IDリストの取得に失敗しました:", error);
            return [];
        }
    },

    async fetchStoriesBatch(offset, limit = 30) {
        const ids = await this.fetchAllIds();
        const batchIds = ids.slice(offset, offset + limit);

        const storyPromises = batchIds.map(async (id) => {
            const storyRes = await fetch(`${BASE_URL}/item/${id}.json`);
            return await storyRes.json();
        });

        return await Promise.all(storyPromises);
    },

    formatTime(timestamp) {
        const seconds = Math.floor((new Date() - timestamp * 1000) / 1000);
        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) return interval + " years ago";
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) return interval + " months ago";
        interval = Math.floor(seconds / 86400);
        if (interval > 1) return interval + " days ago";
        interval = Math.floor(seconds / 3600);
        if (interval > 1) return interval + " hours ago";
        interval = Math.floor(seconds / 60);
        if (interval > 1) return interval + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    }
};

/**
 * Application Controller
 */
const App = {
    currentOffset: 0,
    isLoading: false,

    elements: {
        styleTag: document.getElementById('generated-style'),
        promptInput: document.getElementById('prompt-input'),
        generateBtn: document.getElementById('generate-btn'),
        listElement: document.querySelector('.hn-story-list'),
        loadMoreBtn: document.querySelector('.hn-load-more')
    },

    async init() {
        this.bindEvents();
        console.log("Generative UI - Enhanced Brand Mode Initialized.");
        
        // Initial style
        this.applyStyle(STYLE_PRESETS["Apple"], "Apple (Initial)");

        // Initial load
        await this.loadInitial();
    },

    bindEvents() {
        this.elements.generateBtn.addEventListener('click', () => this.handleGenerate());
        this.elements.promptInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleGenerate();
        });
        this.elements.loadMoreBtn.addEventListener('click', () => this.loadMore());
    },

    async loadInitial() {
        this.currentOffset = 0;
        this.elements.listElement.innerHTML = '<div style="padding: 20px; text-align: center;">Loading stories...</div>';
        await this.loadAndRender();
    },

    async loadMore() {
        if (this.isLoading) return;
        this.isLoading = true;
        const originalText = this.elements.loadMoreBtn.textContent;
        this.elements.loadMoreBtn.textContent = 'Loading...';
        
        await this.loadAndRender(true);
        
        this.elements.loadMoreBtn.textContent = originalText;
        this.isLoading = false;
    },

    async loadAndRender(append = false) {
        const stories = await HNData.fetchStoriesBatch(this.currentOffset);
        this.renderStories(stories, append);
        this.currentOffset += stories.length;
    },

    renderStories(stories, append = false) {
        if (!append) {
            this.elements.listElement.innerHTML = '';
        }

        stories.forEach((story, index) => {
            if (!story) return;
            
            const rank = this.currentOffset + index + 1;
            const domain = story.url ? new URL(story.url).hostname : '';
            const domainHtml = domain ? `<span class="hn-story-domain">(${domain})</span>` : '';
            const timeAgo = HNData.formatTime(story.time);

            const listItem = document.createElement('li');
            listItem.className = 'hn-story-item';
            listItem.innerHTML = `
                <div class="hn-story-rank">${rank}</div>
                <div class="hn-story-content">
                    <div class="hn-story-title-row">
                        <a href="${story.url || '#'}" class="hn-story-title" target="_blank">${story.title}</a>
                        ${domainHtml}
                    </div>
                    <div class="hn-story-meta">
                        <span class="hn-story-points">${story.score} pts</span> • 
                        <span class="hn-story-author">${story.by}</span> • 
                        <span class="hn-story-time">${timeAgo}</span>
                    </div>
                </div>
                <button class="hn-upvote" aria-label="upvote">▲</button>
            `;
            this.elements.listElement.appendChild(listItem);
        });
    },

    handleGenerate() {
        const input = this.elements.promptInput.value.trim();
        if (!input) return;

        const style = this.matchStyle(input);
        
        if (style) {
            this.applyStyle(style, input);
        } else {
            this.showError();
        }
    },

    matchStyle(input) {
        const normalizedInput = input.toLowerCase();
        for (const key in STYLE_PRESETS) {
            if (normalizedInput.includes(key.toLowerCase())) return STYLE_PRESETS[key];
        }
        return null;
    },

    applyStyle(css, themeName) {
        console.log(`Applying theme: ${themeName}`);
        document.body.style.transition = 'opacity 0.2s ease';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            this.elements.styleTag.textContent = COMMON_STYLE + css;
            document.body.style.opacity = '1';
        }, 200);
    },

    showError() {
        const available = Object.keys(STYLE_PRESETS).join('」「');
        alert(`対応しているブランドを入力してください：\n「${available}」`);
    }
};

// Start the application
document.addEventListener('DOMContentLoaded', () => App.init());
