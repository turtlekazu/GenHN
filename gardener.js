/**
 * Acephale OS | Gardener.js
 * Hacker News Interface Styling & Data Fetching
 */

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

const STYLE_PRESETS = {
    "Apple": `
        :root {
            --bg: #f5f5f7;
            --header-bg: rgba(255, 255, 255, 0.72);
            --text: #1d1d1f;
            --accent: #0071e3;
            --card: #ffffff;
        }
        body {
            background-color: var(--bg);
            color: var(--text);
            font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Myriad Set Pro", "Helvetica Neue", Helvetica, Arial, sans-serif;
            margin: 0;
            line-height: 1.47;
            letter-spacing: -0.022em;
            -webkit-font-smoothing: antialiased;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        .hn-header {
            background: var(--header-bg);
            backdrop-filter: saturate(180%) blur(20px);
            position: sticky;
            top: 0;
            z-index: 9999;
            padding: 0 22px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        .hn-nav { display: flex; align-items: center; gap: 20px; }
        .hn-logo {
            background: var(--text);
            color: white;
            padding: 2px 8px;
            border-radius: 4px;
            font-weight: 600;
            text-decoration: none;
            font-size: 14px;
        }
        .hn-site-title { font-weight: 600; font-size: 17px; }
        .hn-nav-links { list-style: none; display: flex; gap: 15px; margin: 0; padding: 0; font-size: 12px; opacity: 0.8; }
        .hn-nav-links a { color: inherit; text-decoration: none; }
        .hn-auth a { color: var(--accent); text-decoration: none; font-size: 12px; }
        
        .hn-main { max-width: 980px; margin: 40px auto; padding: 0 22px; flex: 1; width: 100%; box-sizing: border-box; }
        .hn-story-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px; }
        .hn-story-item {
            background: var(--card);
            padding: 16px 20px;
            border-radius: 12px;
            display: flex;
            align-items: flex-start;
            gap: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            transition: transform 0.2s ease;
        }
        .hn-story-item:hover { transform: scale(1.01); }
        .hn-story-rank { font-size: 12px; color: #86868b; width: 24px; margin-top: 4px; }
        .hn-upvote { border: none; background: #f5f5f7; border-radius: 4px; cursor: pointer; color: #86868b; font-size: 10px; padding: 4px; }
        .hn-story-title { font-weight: 600; font-size: 18px; color: var(--text); text-decoration: none; }
        .hn-story-domain { font-size: 12px; color: #86868b; margin-left: 6px; text-decoration: none; }
        .hn-story-meta { font-size: 12px; color: #86868b; margin-top: 4px; }
        .hn-story-meta a { color: inherit; text-decoration: none; border-bottom: 1px solid transparent; }
        .hn-story-meta a:hover { border-bottom: 1px solid #86868b; }
        .hn-load-more {
            margin-top: 30px;
            width: 100%;
            padding: 12px;
            background: transparent;
            border: 1px solid var(--accent);
            color: var(--accent);
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
        }
        .hn-load-more:hover { background: var(--accent); color: white; }

        .hn-footer {
            background: #f5f5f7;
            padding: 40px 22px;
            border-top: 1px solid rgba(0,0,0,0.1);
            margin-top: 60px;
        }
        .hn-footer-links {
            list-style: none;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            max-width: 980px;
            margin: 0 auto;
        }
        .hn-footer-links a { color: #86868b; text-decoration: none; font-size: 12px; }
        .hn-footer-links a:hover { color: var(--text); }
    `,

    "Cyberpunk 2077": `
        :root {
            --neon-yellow: #fcee0a;
            --cyber-blue: #00f0ff;
            --cyber-pink: #ff003c;
            --cyber-black: #050a0e;
        }
        body {
            background-color: var(--neon-yellow);
            color: black;
            font-family: 'Rajdhani', sans-serif;
            margin: 0;
            text-transform: uppercase;
            font-weight: 700;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        .hn-header {
            background: black;
            color: var(--neon-yellow);
            padding: 15px 30px;
            clip-path: polygon(0 0, 100% 0, 100% 80%, 98% 100%, 0 100%);
            display: flex;
            justify-content: space-between;
            border-bottom: 4px solid var(--cyber-blue);
        }
        .hn-logo {
            background: var(--cyber-blue);
            color: black;
            padding: 5px 15px;
            font-weight: 900;
            font-size: 24px;
            text-decoration: none;
            box-shadow: 4px 4px 0 var(--cyber-pink);
        }
        .hn-site-title { font-size: 28px; letter-spacing: 2px; }
        .hn-nav-links { list-style: none; display: flex; gap: 20px; font-size: 14px; }
        .hn-nav-links a { color: var(--neon-yellow); text-decoration: none; }
        .hn-nav-links a:hover { color: var(--cyber-blue); }
        
        .hn-main { max-width: 1200px; margin: 40px auto; padding: 0 20px; flex: 1; width: 100%; box-sizing: border-box; }
        .hn-story-item {
            background: black;
            color: white;
            margin-bottom: 15px;
            padding: 20px;
            border-left: 8px solid var(--cyber-blue);
            clip-path: polygon(0 0, 100% 0, 99% 100%, 0% 100%);
            position: relative;
        }
        .hn-story-item:nth-child(even) { border-left-color: var(--cyber-pink); }
        .hn-story-title { color: var(--neon-yellow); font-size: 20px; text-decoration: none; display: block; }
        .hn-story-domain { color: var(--cyber-blue); font-size: 12px; }
        .hn-story-meta { color: #888; margin-top: 10px; font-size: 12px; }
        .hn-upvote { background: var(--cyber-blue); border: none; font-size: 10px; cursor: pointer; margin-right: 10px; }
        .hn-load-more {
            background: black;
            color: var(--neon-yellow);
            border: 2px solid var(--neon-yellow);
            padding: 15px 40px;
            font-weight: 900;
            cursor: pointer;
            width: 100%;
            font-family: inherit;
            font-size: 20px;
        }
        .hn-load-more:hover {
            background: var(--cyber-blue);
            color: black;
            border-color: var(--cyber-blue);
        }

        .hn-footer {
            background: black;
            padding: 40px 20px;
            clip-path: polygon(2% 0, 100% 0, 100% 100%, 0 100%, 0 20%);
        }
        .hn-footer-links {
            list-style: none;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
        }
        .hn-footer-links a { color: var(--neon-yellow); text-decoration: none; font-size: 14px; border-bottom: 2px solid transparent; }
        .hn-footer-links a:hover { border-bottom-color: var(--cyber-blue); color: var(--cyber-blue); }
    `,

    "Google": `
        :root {
            --g-blue: #4285F4;
            --g-red: #DB4437;
            --g-yellow: #F4B400;
            --g-green: #0F9D58;
            --g-gray: #f8f9fa;
        }
        body {
            background-color: white;
            color: #202124;
            font-family: 'Roboto', 'Product Sans', Arial, sans-serif;
            margin: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        .hn-header {
            padding: 12px 24px;
            border-bottom: 1px solid #e0e0e0;
            display: flex;
            align-items: center;
        }
        .hn-logo {
            font-size: 24px;
            font-weight: bold;
            color: var(--g-blue);
            text-decoration: none;
            margin-right: 20px;
        }
        .hn-logo::first-letter { color: var(--g-blue); }
        .hn-site-title { font-size: 22px; color: #5f6368; }
        .hn-nav-links { list-style: none; display: flex; gap: 15px; margin-left: 30px; font-size: 14px; }
        .hn-nav-links a { color: #5f6368; text-decoration: none; padding: 8px 12px; border-radius: 20px; }
        .hn-nav-links a:hover { background: var(--g-gray); }
        
        .hn-main { max-width: 800px; margin: 30px auto; flex: 1; width: 100%; box-sizing: border-box; }
        .hn-story-item {
            padding: 16px;
            border-bottom: 1px solid #eee;
            transition: background 0.2s;
        }
        .hn-story-item:hover { background: #fbfbfb; }
        .hn-story-title { color: #1a0dab; font-size: 18px; text-decoration: none; }
        .hn-story-title:visited { color: #660099; }
        .hn-story-meta { color: #70757a; font-size: 13px; margin-top: 4px; }
        .hn-upvote { color: var(--g-blue); background: none; border: 1px solid #dadce0; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; }
        .hn-load-more {
            margin: 30px auto;
            display: block;
            background: white;
            border: 1px solid #dadce0;
            color: var(--g-blue);
            padding: 10px 24px;
            border-radius: 4px;
            font-weight: 500;
            cursor: pointer;
        }
        .hn-load-more:hover { background: #f8f9fa; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }

        .hn-footer {
            background: var(--g-gray);
            padding: 24px;
            border-top: 1px solid #e0e0e0;
        }
        .hn-footer-links {
            list-style: none;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 24px;
        }
        .hn-footer-links a { color: #5f6368; text-decoration: none; font-size: 14px; }
        .hn-footer-links a:hover { text-decoration: underline; }
    `,

    "Samsung": `
        :root {
            --s-blue: #034EA2;
            --s-bg: #ffffff;
            --s-gray: #f4f4f4;
        }
        body {
            background-color: var(--s-bg);
            color: #000;
            font-family: 'SamsungOne', 'Segoe UI', Roboto, Arial, sans-serif;
            margin: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        .hn-header {
            background: white;
            padding: 20px 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .hn-logo {
            font-weight: 900;
            font-size: 28px;
            color: var(--s-blue);
            letter-spacing: -1px;
            text-decoration: none;
        }
        .hn-nav-links { list-style: none; display: flex; gap: 30px; }
        .hn-nav-links a { font-weight: 600; text-decoration: none; color: #333; font-size: 14px; }
        
        .hn-main { max-width: 1200px; margin: 0 auto; padding: 40px; flex: 1; width: 100%; box-sizing: border-box; }
        .hn-story-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 24px; }
        .hn-story-item {
            background: var(--s-gray);
            padding: 30px;
            border-radius: 24px;
            display: flex;
            flex-direction: column;
            gap: 15px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hn-story-item:hover { transform: scale(1.03); background: #ebebeb; }
        .hn-story-title { font-size: 22px; font-weight: 700; color: #000; text-decoration: none; line-height: 1.2; }
        .hn-story-meta { font-size: 14px; color: #666; }
        .hn-upvote { align-self: flex-start; background: var(--s-blue); color: white; border: none; padding: 8px 16px; border-radius: 20px; font-weight: 600; cursor: pointer; }
        .hn-load-more {
            grid-column: 1 / -1;
            background: #000;
            color: white;
            padding: 16px;
            border-radius: 30px;
            font-weight: 700;
            border: none;
            cursor: pointer;
            margin-top: 40px;
        }

        .hn-footer {
            padding: 60px 40px;
            border-top: 1px solid #eee;
        }
        .hn-footer-links {
            list-style: none;
            padding: 0;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .hn-footer-links a { color: #000; text-decoration: none; font-size: 13px; font-weight: 600; }
    `
};

/**
 * Data Fetching Logic
 */
const HNData = {
    async fetchStories() {
        try {
            const response = await fetch(`${BASE_URL}/topstories.json`);
            const storyIds = await response.json();
            const top30Ids = storyIds.slice(0, 30);

            const storyPromises = top30Ids.map(async (id) => {
                const storyRes = await fetch(`${BASE_URL}/item/${id}.json`);
                return await storyRes.json();
            });

            return await Promise.all(storyPromises);
        } catch (error) {
            console.error("データの取得に失敗しました:", error);
            return [];
        }
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
    elements: {
        styleTag: document.getElementById('generated-style'),
        promptInput: document.getElementById('prompt-input'),
        generateBtn: document.getElementById('generate-btn'),
        listElement: document.querySelector('.hn-story-list')
    },

    async init() {
        this.bindEvents();
        console.log("Generative UI - Real Data Mode Initialized.");
        
        // Initial style
        this.applyStyle(STYLE_PRESETS["Apple"], "Apple (Initial)");

        // Load data
        await this.loadAndRender();
    },

    bindEvents() {
        this.elements.generateBtn.addEventListener('click', () => this.handleGenerate());
        this.elements.promptInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleGenerate();
        });
    },

    async loadAndRender() {
        this.elements.listElement.innerHTML = '<div style="padding: 20px; text-align: center;">Loading stories...</div>';
        const stories = await HNData.fetchStories();
        this.renderStories(stories);
    },

    renderStories(stories) {
        this.elements.listElement.innerHTML = ''; 

        stories.forEach((story, index) => {
            const domain = story.url ? new URL(story.url).hostname : '';
            const domainHtml = domain ? `<a href="${story.url}" class="hn-story-domain" target="_blank">(${domain})</a>` : '';
            const timeAgo = HNData.formatTime(story.time);

            const listItem = document.createElement('li');
            listItem.className = 'hn-story-item';
            listItem.innerHTML = `
                <div class="hn-story-rank">${index + 1}.</div>
                <button class="hn-upvote" aria-label="upvote">▲</button>
                <div class="hn-story-content">
                    <div class="hn-story-title-row">
                        <a href="${story.url || '#'}" class="hn-story-title" target="_blank">${story.title}</a>
                        ${domainHtml}
                    </div>
                    <div class="hn-story-meta">
                        <span class="hn-story-points">${story.score} points</span> by
                        <a href="#" class="hn-story-author">${story.by}</a>
                        <span class="hn-story-time">${timeAgo}</span> |
                        <a href="#" class="hn-story-comments" target="_blank">${story.descendants || 0} comments</a>
                    </div>
                </div>
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
            this.elements.styleTag.textContent = css;
            document.body.style.opacity = '1';
        }, 200);
    },

    showError() {
        alert("対応しているブランドを入力してください：\n「Apple」「Google」「Samsung」「Cyberpunk 2077」");
    }
};

// Start the application
document.addEventListener('DOMContentLoaded', () => App.init());
