/**
 * Acephale OS | Gardener.js
 * Handles task management logic and dynamic CSS generation.
 */

const STYLE_PRESETS = {
    "レトロ": `
        body { 
            background-color: #000; 
            color: #0f0; 
            font-family: 'Courier New', monospace; 
            padding: 20px; 
            line-height: 1.4;
        }
        .app-header { border-bottom: 2px dashed #0f0; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
        .task-list { list-style: none; padding: 0; }
        .task-item { border: 1px solid #0f0; margin-bottom: 10px; padding: 15px; position: relative; }
        .task-item[data-priority="high"] { border: 2px solid #ff0000; color: #ff0000; }
        .task-item[data-priority="high"]::before { content: "!!! "; }
        .task-title { margin: 0 0 10px 0; font-size: 1.2rem; }
        .task-tag { border: 1px solid currentColor; padding: 2px 5px; font-size: 0.8rem; margin-right: 10px; }
        button { background: #000; color: #0f0; border: 1px solid #0f0; cursor: pointer; text-transform: uppercase; padding: 5px 10px; font-family: inherit; }
        button:hover { background: #0f0; color: #000; }
        time { display: block; margin-top: 10px; font-size: 0.8rem; opacity: 0.8; }
    `,

    "禅": `
        body { 
            background-color: #f8f9fa; 
            color: #343a40; 
            font-family: "Optima", "Candara", "Noto Sans JP", sans-serif; 
            display: flex; 
            justify-content: center; 
            margin: 0;
            padding: 0;
        }
        #app-root { max-width: 700px; width: 100%; padding: 80px 40px; }
        .app-header { text-align: center; margin-bottom: 80px; }
        .app-title { font-weight: 200; letter-spacing: 0.3em; color: #1a1a1a; margin-bottom: 10px; }
        .user-status { font-size: 0.8rem; color: #adb5bd; letter-spacing: 0.1em; text-transform: uppercase; }
        .task-list { list-style: none; padding: 0; }
        .task-item { padding: 30px 0; border-bottom: 1px solid #e9ecef; transition: transform 0.4s ease; }
        .task-item:hover { transform: translateX(5px); }
        .task-title { font-size: 1.1rem; font-weight: 400; margin: 0 0 8px 0; color: #495057; }
        .task-desc { font-size: 0.9rem; color: #868e96; margin-bottom: 10px; }
        .task-tag, time { font-size: 0.75rem; color: #ced4da; }
        .task-actions { margin-top: 15px; }
        button { background: none; border: none; color: #dee2e6; font-size: 0.8rem; cursor: pointer; transition: 0.3s; padding: 0; }
        button:hover { color: #343a40; }
        .task-item[data-status="completed"] { opacity: 0.3; filter: grayscale(1); }
    `,

    "サイバー": `
        :root {
            --accent: #00f2ff;
            --bg: #050508;
            --card: rgba(16, 16, 24, 0.8);
            --glow: rgba(0, 242, 255, 0.3);
        }
        body { 
            background-color: var(--bg); 
            color: #a0a0b0; 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background-image: 
                radial-gradient(circle at 20% 30%, rgba(70, 0, 255, 0.1) 0%, transparent 40%),
                radial-gradient(circle at 80% 70%, rgba(0, 242, 255, 0.05) 0%, transparent 40%);
            min-height: 100vh;
            margin: 0;
            padding: 40px;
        }
        #app-root { max-width: 1100px; margin: 0 auto; }
        .app-header { margin-bottom: 60px; position: relative; }
        .app-title { 
            font-size: 3.5rem; 
            font-weight: 900; 
            text-transform: uppercase; 
            letter-spacing: -2px; 
            color: #fff; 
            margin: 0;
            background: linear-gradient(to bottom, #fff 40%, #555);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            filter: drop-shadow(0 0 10px var(--glow));
        }
        .user-status { font-family: monospace; color: var(--accent); font-size: 0.8rem; letter-spacing: 2px; }
        .task-list { 
            display: grid; 
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); 
            gap: 24px; 
            list-style: none; 
            padding: 0; 
        }
        .task-item { 
            background: var(--card); 
            backdrop-filter: blur(12px); 
            border: 1px solid rgba(255, 255, 255, 0.05); 
            padding: 30px; 
            border-radius: 2px;
            position: relative;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            clip-path: polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%);
        }
        .task-item::after {
            content: ''; position: absolute; bottom: 0; right: 0; width: 15px; height: 15px; background: var(--accent); opacity: 0.2;
        }
        .task-item:hover { 
            transform: translateY(-8px) scale(1.02); 
            border-color: var(--accent);
            box-shadow: 0 20px 40px rgba(0,0,0,0.6), 0 0 20px var(--glow);
        }
        .task-title { color: #fff; font-size: 1.4rem; margin: 0 0 12px 0; font-weight: 700; letter-spacing: -0.5px; }
        .task-desc { font-size: 0.95rem; line-height: 1.6; color: #808090; margin-bottom: 20px; }
        .task-tag { 
            font-family: monospace; 
            font-size: 0.7rem; 
            text-transform: uppercase; 
            color: var(--accent); 
            border: 1px solid var(--accent); 
            padding: 2px 8px; 
            margin-right: 8px;
            background: rgba(0, 242, 255, 0.05);
        }
        .task-item[data-priority="high"] { 
            border-left: 4px solid #ff0055;
        }
        .task-item[data-priority="high"] .task-title { text-shadow: 0 0 8px rgba(255, 0, 85, 0.4); }
        
        button { 
            width: 100%;
            background: transparent; 
            border: 1px solid rgba(255,255,255,0.1); 
            color: #fff; 
            padding: 12px; 
            font-weight: 600; 
            text-transform: uppercase; 
            letter-spacing: 1px;
            cursor: pointer; 
            transition: 0.3s;
        }
        button:hover { 
            background: var(--accent); 
            color: #000; 
            border-color: var(--accent);
            box-shadow: 0 0 15px var(--accent);
        }
    `,

    "モダン": `
        body { 
            background-color: #ffffff; 
            color: #1d1d1f; 
            font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif;
            padding: 40px;
            -webkit-font-smoothing: antialiased;
        }
        #app-root { max-width: 900px; margin: 0 auto; }
        .app-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 50px; }
        .app-title { font-size: 2.5rem; font-weight: 700; letter-spacing: -0.02em; margin: 0; }
        .user-status { background: #f5f5f7; padding: 6px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 500; }
        
        .task-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 16px; }
        .task-item { 
            background: #fff; 
            border: 1px solid #e5e5e7; 
            padding: 24px; 
            border-radius: 18px; 
            display: flex; 
            justify-content: space-between; 
            align-items: center;
            transition: all 0.3s ease;
        }
        .task-item:hover { transform: scale(1.01); box-shadow: 0 10px 30px rgba(0,0,0,0.05); border-color: #d2d2d7; }
        
        .task-title { font-size: 1.25rem; font-weight: 600; margin: 0 0 4px 0; }
        .task-desc { color: #86868b; font-size: 0.95rem; margin: 0; }
        .task-tag { display: none; }
        
        button { 
            background: #0071e3; 
            color: #fff; 
            border: none; 
            padding: 10px 20px; 
            border-radius: 20px; 
            font-weight: 600; 
            font-size: 0.9rem; 
            cursor: pointer; 
            transition: 0.2s;
        }
        button:hover { background: #0077ed; }
        button:active { transform: scale(0.98); }
        
        .task-item[data-status="completed"] .task-title { text-decoration: line-through; color: #86868b; }
        .task-item[data-priority="high"] { border-left: 6px solid #ff3b30; }
    `
};

/**
 * Application Controller
 */
const App = {
    elements: {
        styleTag: document.getElementById('generated-style'),
        promptInput: document.getElementById('prompt-input'),
        generateBtn: document.getElementById('generate-btn')
    },

    init() {
        this.bindEvents();
        console.log("Acephale Garden Initialized.");
        
        // Initial style
        this.applyStyle(STYLE_PRESETS["モダン"], "モダン (Initial)");
    },

    bindEvents() {
        this.elements.generateBtn.addEventListener('click', () => this.handleGenerate());
        this.elements.promptInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleGenerate();
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
        // Simple keyword matching logic
        for (const key in STYLE_PRESETS) {
            if (input.includes(key)) return STYLE_PRESETS[key];
        }
        return null;
    },

    applyStyle(css, themeName) {
        console.log(`Applying theme: ${themeName}`);
        
        // Visual feedback for change
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            this.elements.styleTag.textContent = css;
            document.body.style.opacity = '1';
        }, 300);
    },

    showError() {
        alert("デモ用のキーワードを入力してください：\n「レトロ」「禅」「サイバー」「モダン」");
    }
};

// Start the application
document.addEventListener('DOMContentLoaded', () => App.init());
