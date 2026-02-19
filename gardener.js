/**
 * Acephale OS | Gardener.js
 * Handles task management logic and dynamic CSS generation.
 */

const STYLE_PRESETS = {
    "レトロ": `
        @keyframes scanline { 0% { bottom: 100%; } 100% { bottom: 0%; } }
        @keyframes flicker { 0% { opacity: 0.97; } 5% { opacity: 0.95; } 10% { opacity: 0.9; } 15% { opacity: 0.95; } 20% { opacity: 0.98; } 25% { opacity: 0.95; } 30% { opacity: 0.9; } 100% { opacity: 1; } }
        
        body { 
            background-color: #0a0a0a; 
            color: #00ff41; 
            font-family: "VT323", "Courier New", monospace; 
            padding: 40px; 
            line-height: 1.6;
            text-shadow: 0 0 5px rgba(0, 255, 65, 0.7);
            position: relative;
            animation: flicker 0.15s infinite;
        }
        
        body::before {
            content: " ";
            position: fixed;
            top: 0; left: 0; bottom: 0; right: 0;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
            background-size: 100% 4px, 3px 100%;
            z-index: 1000;
            pointer-events: none;
        }

        body::after {
            content: " ";
            position: fixed;
            top: 0; left: 0; bottom: 0; right: 0;
            background: rgba(18, 16, 16, 0.1);
            opacity: 0;
            z-index: 1001;
            pointer-events: none;
            animation: scanline 10s linear infinite;
            background: linear-gradient(to bottom, transparent 0%, rgba(0, 255, 65, 0.1) 0.5%, transparent 1%);
        }

        #app-root { max-width: 800px; margin: 0 auto; border: 2px solid #00ff41; padding: 30px; box-shadow: 0 0 20px rgba(0, 255, 65, 0.2); }
        .app-header { border-bottom: 2px solid #00ff41; margin-bottom: 30px; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: baseline; }
        .app-title { font-size: 2.5rem; margin: 0; text-transform: uppercase; letter-spacing: 4px; }
        .user-status::before { content: "[ "; }
        .user-status::after { content: " ]"; }
        
        .task-list { list-style: none; padding: 0; }
        .task-item { border: 1px solid rgba(0, 255, 65, 0.3); margin-bottom: 20px; padding: 20px; position: relative; }
        .task-item[data-priority="high"] { border: 2px solid #ff0000; color: #ff0000; text-shadow: 0 0 5px rgba(255, 0, 0, 0.7); }
        .task-item[data-priority="high"]::before { content: ">> CRITICAL_TASK_DETECTED"; display: block; font-size: 0.7rem; margin-bottom: 10px; }
        
        .task-title { margin: 0 0 10px 0; font-size: 1.4rem; font-weight: normal; }
        .task-desc { opacity: 0.8; font-size: 0.9rem; }
        .task-tag { background: #00ff41; color: #000; padding: 0 8px; font-size: 0.8rem; margin-right: 15px; text-shadow: none; }
        
        button { background: transparent; color: #00ff41; border: 1px solid #00ff41; cursor: pointer; text-transform: uppercase; padding: 8px 16px; font-family: inherit; transition: 0.2s; }
        button:hover { background: #00ff41; color: #000; box-shadow: 0 0 15px #00ff41; }
        time { display: block; margin-top: 15px; font-size: 0.8rem; opacity: 0.6; }
    `,

    "禅": `
        body { 
            background-color: #faf9f6; 
            color: #2c2c2c; 
            font-family: "Shippori Mincho", "Noto Serif JP", serif; 
            display: flex; 
            justify-content: center; 
            margin: 0;
            padding: 0;
            line-height: 2;
        }
        #app-root { max-width: 640px; width: 100%; padding: 120px 40px; }
        .app-header { text-align: center; margin-bottom: 100px; }
        .app-title { font-weight: 300; letter-spacing: 0.5em; color: #1a1a1a; margin-bottom: 20px; font-size: 1.8rem; }
        .user-status { font-size: 0.7rem; color: #999; letter-spacing: 0.2em; text-transform: uppercase; }
        
        .task-list { list-style: none; padding: 0; }
        .task-item { padding: 40px 0; border-bottom: 1px solid #eee; transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); opacity: 0.8; }
        .task-item:hover { opacity: 1; transform: translateY(-2px); }
        
        .task-title { font-size: 1.2rem; font-weight: 400; margin: 0 0 15px 0; color: #333; letter-spacing: 0.05em; }
        .task-desc { font-size: 0.9rem; color: #666; margin-bottom: 20px; font-style: italic; }
        .task-tag { font-size: 0.7rem; color: #aaa; margin-right: 20px; border-bottom: 1px solid #ddd; }
        time { font-size: 0.7rem; color: #ccc; }
        
        .task-actions { margin-top: 30px; }
        button { background: none; border: none; color: #bbb; font-size: 0.75rem; cursor: pointer; transition: 0.5s; padding: 5px 0; letter-spacing: 0.1em; border-bottom: 1px solid transparent; }
        button:hover { color: #333; border-bottom: 1px solid #333; }
        
        .task-item[data-status="completed"] { opacity: 0.2; filter: blur(0.5px); }
        .task-item[data-priority="high"] .task-title::before { content: "・"; color: #c00; margin-right: 10px; }
    `,

    "サイバー": `
        :root {
            --neon-pink: #ff007f;
            --neon-blue: #00f3ff;
            --neon-purple: #9d00ff;
            --cyber-bg: #03030b;
        }
        body { 
            background-color: var(--cyber-bg); 
            color: #fff; 
            font-family: 'Syncopate', 'Orbitron', sans-serif;
            background-image: 
                radial-gradient(circle at 50% 50%, #101025 0%, transparent 100%),
                linear-gradient(rgba(0, 243, 255, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 243, 255, 0.05) 1px, transparent 1px);
            background-size: 100% 100%, 50px 50px, 50px 50px;
            min-height: 100vh;
            margin: 0;
            padding: 60px 20px;
        }
        #app-root { max-width: 1000px; margin: 0 auto; }
        
        .app-header { 
            margin-bottom: 80px; 
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-left: 8px solid var(--neon-blue);
            padding-left: 20px;
        }
        .app-title { 
            font-size: 3.5rem; 
            font-weight: 900; 
            text-transform: uppercase;
            letter-spacing: -2px;
            background: linear-gradient(90deg, var(--neon-blue), var(--neon-purple));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            filter: drop-shadow(0 0 10px rgba(0, 243, 255, 0.5));
        }
        .user-status { 
            font-size: 0.8rem;
            letter-spacing: 3px;
            color: var(--neon-blue);
            text-shadow: 0 0 10px var(--neon-blue);
        }
        
        .task-list { 
            display: grid; 
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
            gap: 25px; 
            list-style: none; 
            padding: 0; 
        }
        
        .task-item { 
            background: rgba(255, 255, 255, 0.03); 
            backdrop-filter: blur(10px);
            border: 1px solid rgba(0, 243, 255, 0.2); 
            padding: 30px; 
            position: relative;
            clip-path: polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%);
            transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .task-item:hover { 
            transform: scale(1.05);
            border-color: var(--neon-blue);
            box-shadow: 0 0 30px rgba(0, 243, 255, 0.1);
            background: rgba(255, 255, 255, 0.07);
        }

        .task-title { 
            font-size: 1.4rem; 
            margin: 0 0 10px 0; 
            color: var(--neon-blue);
            text-shadow: 0 0 5px var(--neon-blue);
        }
        
        .task-desc { 
            font-size: 0.85rem; 
            color: #aaa; 
            margin-bottom: 25px; 
            font-family: 'JetBrains Mono', monospace;
        }
        
        .task-tag { 
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 0.6rem;
            color: var(--neon-purple);
            border: 1px solid var(--neon-purple);
            padding: 2px 6px;
        }

        .task-item[data-priority="high"] { border-color: var(--neon-pink); }
        .task-item[data-priority="high"] .task-title { color: var(--neon-pink); text-shadow: 0 0 10px var(--neon-pink); }

        button { 
            width: 100%;
            background: rgba(0, 243, 255, 0.1); 
            border: 1px solid var(--neon-blue); 
            color: #fff; 
            padding: 12px; 
            font-family: inherit;
            font-weight: bold;
            cursor: pointer; 
            transition: 0.3s;
            text-transform: uppercase;
        }
        
        button:hover { 
            background: var(--neon-blue); 
            color: #000; 
            box-shadow: 0 0 20px var(--neon-blue);
        }
    `,

    "モダン": `
        body { 
            background-color: #f2f2f7; 
            color: #1c1c1e; 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            padding: 60px 20px;
            -webkit-font-smoothing: antialiased;
        }
        #app-root { max-width: 840px; margin: 0 auto; }
        .app-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 60px; }
        .app-title { font-size: 3rem; font-weight: 800; letter-spacing: -0.04em; margin: 0; color: #000; }
        .user-status { color: #8e8e93; font-weight: 500; font-size: 0.9rem; }
        
        .task-list { list-style: none; padding: 0; display: grid; gap: 20px; }
        .task-item { 
            background: rgba(255, 255, 255, 0.7); 
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.3); 
            padding: 30px; 
            border-radius: 24px; 
            display: flex; 
            justify-content: space-between; 
            align-items: center;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 4px 6px rgba(0,0,0,0.02);
        }
        .task-item:hover { transform: scale(1.02) translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
        
        .task-title { font-size: 1.4rem; font-weight: 700; margin: 0 0 6px 0; color: #1c1c1e; }
        .task-desc { color: #8e8e93; font-size: 1rem; margin: 0; font-weight: 400; }
        .task-tag { background: #e5e5ea; color: #3a3a3c; padding: 4px 10px; border-radius: 8px; font-size: 0.75rem; font-weight: 600; margin-bottom: 10px; display: inline-block; }
        
        button { 
            background: #007aff; 
            color: #fff; 
            border: none; 
            padding: 12px 24px; 
            border-radius: 14px; 
            font-weight: 600; 
            font-size: 0.95rem; 
            cursor: pointer; 
            transition: 0.2s;
            box-shadow: 0 4px 12px rgba(0, 122, 255, 0.2);
        }
        button:hover { background: #0066d6; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(0, 122, 255, 0.3); }
        button:active { transform: scale(0.96); }
        
        .task-item[data-status="completed"] { opacity: 0.5; }
        .task-item[data-status="completed"] .task-title { text-decoration: line-through; }
        .task-item[data-priority="high"] { border-left: 8px solid #ff3b30; }
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
