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
            --cp-yellow: #FCEE0A;
            --cp-teal: #00FFFF;
            --cp-red: #ff003c;
            --cp-bg: #050505;
            --cp-panel: #121212;
            --cp-text: #e0e0e0;
        }
        body { 
            background-color: var(--cp-bg); 
            color: var(--cp-text); 
            font-family: 'Rajdhani', 'Segoe UI', sans-serif;
            background-image: 
                linear-gradient(rgba(18, 18, 18, 0.9), rgba(18, 18, 18, 0.9)),
                repeating-linear-gradient(0deg, transparent 0, transparent 1px, #222 1px, #222 2px),
                repeating-linear-gradient(90deg, transparent 0, transparent 1px, #222 1px, #222 2px);
            background-size: 100% 100%, 40px 40px, 40px 40px;
            min-height: 100vh;
            margin: 0;
            padding: 40px;
            text-transform: uppercase;
        }
        #app-root { max-width: 1100px; margin: 0 auto; position: relative; }
        
        /* Decorative Line */
        #app-root::before {
            content: "NIGHT_CITY_OS_V.2.0.7.7";
            position: absolute;
            top: -30px;
            right: 0;
            color: var(--cp-yellow);
            font-size: 0.7rem;
            letter-spacing: 2px;
            font-weight: bold;
        }

        .app-header { 
            margin-bottom: 60px; 
            border-bottom: 2px solid var(--cp-yellow);
            padding-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }
        .app-title { 
            font-size: 4rem; 
            font-weight: 900; 
            color: var(--cp-yellow); 
            margin: 0;
            line-height: 0.9;
            text-shadow: 2px 2px 0px var(--cp-teal);
            transform: skewX(-10deg);
        }
        .user-status { 
            background: var(--cp-teal); 
            color: #000; 
            padding: 4px 12px; 
            font-weight: 800;
            font-size: 0.9rem;
            transform: skewX(-20deg);
            box-shadow: 4px 4px 0px var(--cp-red);
        }
        
        .task-list { 
            display: grid; 
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); 
            gap: 30px; 
            list-style: none; 
            padding: 0; 
        }
        
        .task-item { 
            background: var(--cp-panel); 
            border: 1px solid #333; 
            padding: 25px; 
            position: relative;
            clip-path: polygon(
                0 0, 
                100% 0, 
                100% calc(100% - 20px), 
                calc(100% - 20px) 100%, 
                0 100%
            );
            transition: all 0.2s ease;
        }
        
        /* Yellow corner accent */
        .task-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: var(--cp-yellow);
            opacity: 0.5;
            transition: 0.2s;
        }

        .task-item:hover { 
            transform: translate(-4px, -4px);
            box-shadow: 8px 8px 0px rgba(0, 255, 255, 0.2);
            border-color: var(--cp-teal);
        }
        .task-item:hover::before {
            opacity: 1;
            box-shadow: 0 0 10px var(--cp-yellow);
        }

        .task-title { 
            color: #fff; 
            font-size: 1.5rem; 
            margin: 0 0 15px 0; 
            font-weight: 800; 
            letter-spacing: 1px;
        }
        
        .task-desc { 
            font-family: 'Courier New', monospace;
            font-size: 0.9rem; 
            line-height: 1.4; 
            color: var(--cp-teal); 
            margin-bottom: 25px; 
            text-transform: none;
        }
        
        .task-tag { 
            position: absolute;
            top: 0;
            right: 0;
            background: #333;
            color: #fff;
            padding: 4px 12px;
            font-size: 0.7rem;
            font-weight: bold;
        }

        .task-item[data-priority="high"] .task-tag { background: var(--cp-red); }
        .task-item[data-priority="high"]::before { background: var(--cp-red); }

        button { 
            width: 100%;
            background: transparent; 
            border: 2px solid var(--cp-yellow); 
            color: var(--cp-yellow); 
            padding: 10px; 
            font-weight: 900; 
            text-transform: uppercase; 
            letter-spacing: 2px;
            cursor: pointer; 
            transition: 0.2s;
            position: relative;
            overflow: hidden;
        }
        
        button:hover { 
            background: var(--cp-yellow); 
            color: #000; 
            box-shadow: 0 0 15px var(--cp-yellow);
        }
        
        /* Glitchy element for button */
        button::after {
            content: 'R_25';
            position: absolute;
            right: 2px;
            bottom: 2px;
            font-size: 8px;
            color: currentColor;
            opacity: 0.5;
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
