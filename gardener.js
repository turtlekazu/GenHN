/**
 * Acephale OS | Gardener.js
 * Hacker News Interface Styling & Data Fetching
 */

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

/**
 * System Core Styles (Layout, Typography Base, Responsive Logic)
 * Themes should override variables in :root or specific classes if needed.
 */
const SYSTEM_STYLE = `
    :root {
        /* Default Variables (Fallback) */
        --bg: #ffffff;
        --text: #333333;
        --subtext: #888888;
        --accent: #007aff;
        --card-bg: #ffffff;
        --header-bg: rgba(255,255,255,0.9);
        --header-border: 1px solid rgba(0,0,0,0.1);
        --font-main: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        
        /* Component Specific Defaults */
        --item-padding: 24px;
        --item-radius: 12px;
        --item-border: 1px solid rgba(0,0,0,0.05);
        --item-shadow: none;
        --item-gap: 20px;
        
        /* Mobile Defaults */
        --mobile-upvote-bg: rgba(0,0,0,0.05);
        --mobile-upvote-color: inherit;
        --mobile-upvote-border: none;
        --mobile-upvote-radius: 8px;
        --mobile-rank-opacity: 0.5;
        --mobile-rank-color: inherit;

        /* More Button Defaults */
        --more-btn-bg: var(--text);
        --more-btn-color: var(--bg);
    }

    /* --- Transition Animation --- */
    ::view-transition-group(*) {
        animation-duration: 1.2s;
    }

    /* --- Base Layout --- */
    body {
        background: var(--bg);
        color: var(--text);
        font-family: var(--font-main);
        margin: 0;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        transition: background 0.5s, color 0.5s;
    }
    * { box-sizing: border-box; }
    ul, ol { list-style: none; padding: 0; margin: 0; }
    a { text-decoration: none; color: inherit; transition: opacity 0.2s; }
    button { font-family: inherit; cursor: pointer; }

    /* --- Header --- */
    .hn-header {
        background: var(--header-bg);
        border-bottom: var(--header-border);
        backdrop-filter: saturate(180%) blur(20px);
        padding: 0 20px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: sticky;
        top: 0;
        z-index: 100;
        view-transition-name: main-header;
    }
    .hn-nav {
        width: 100%;
        max-width: 1000px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .hn-logo {
        font-weight: 900;
        font-size: 20px;
        color: var(--accent);
        view-transition-name: main-logo;
    }
    .hn-nav-links { display: flex; gap: 24px; }
    .hn-nav-links a { font-size: 14px; font-weight: 500; color: var(--subtext); }
    .hn-nav-links a:hover { color: var(--text); }
    .hn-auth a { font-size: 13px; font-weight: 600; color: var(--accent); }

    /* --- Main Content --- */
    .hn-main {
        max-width: 1000px;
        margin: 0 auto;
        padding: 40px 20px;
        flex: 1;
        width: 100%;
        view-transition-name: main-content;
    }
    .hn-story-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
        view-transition-name: story-list;
    }

    /* --- Story Item (Desktop Standard) --- */
    .hn-story-item {
        background: var(--item-bg, var(--card-bg));
        border: var(--item-border);
        border-radius: var(--item-radius);
        padding: var(--item-padding);
        box-shadow: var(--item-shadow);
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--item-gap);
        transition: transform 0.2s, box-shadow 0.2s;
        position: relative;
    }
    .hn-story-rank {
        order: -2;
        font-size: 16px;
        color: var(--subtext);
        width: 30px;
        text-align: right;
        font-feature-settings: "tnum";
    }
    .hn-story-content { flex: 1; min-width: 0; }
    .hn-story-title {
        display: block;
        font-size: 18px;
        font-weight: 600;
        color: var(--text);
        line-height: 1.3;
        margin-bottom: 6px;
    }
    .hn-story-title:hover { color: var(--accent); }
    .hn-story-domain { font-size: 13px; color: var(--subtext); font-weight: 400; margin-left: 8px; }
    .hn-story-meta { font-size: 13px; color: var(--subtext); }
    
    /* Standard Desktop Upvote */
    .hn-upvote {
        order: -1;
        background: transparent;
        border: 1px solid var(--subtext);
        color: var(--subtext);
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        flex-shrink: 0;
        transition: 0.2s;
        opacity: 0.6;
    }
    .hn-upvote:hover {
        border-color: var(--accent);
        color: var(--accent);
        opacity: 1;
    }

    /* --- Load More --- */
    .hn-load-more {
        display: block;
        margin: 60px auto;
        padding: 12px 40px;
        background: var(--more-btn-bg);
        color: var(--more-btn-color);
        border: none;
        border-radius: 100px;
        font-weight: 600;
        transition: transform 0.2s;
    }
    .hn-load-more:hover { transform: scale(1.05); }

    /* --- Footer --- */
    .hn-footer {
        padding: 60px 20px;
        border-top: 1px solid var(--header-border);
        text-align: center;
        font-size: 13px;
        color: var(--subtext);
        background: var(--bg);
        view-transition-name: main-footer;
    }
    .hn-footer-links {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-bottom: 20px;
    }

    /* --- Control Panel (Glassmorphism) --- */
    #theme-controls { 
        view-transition-name: theme-ui;
        position: fixed; 
        bottom: 20px; 
        right: 20px; 
        z-index: 10000; 
        padding: 15px; 
        border-radius: 12px; 
        display: flex; 
        flex-direction: column; 
        gap: 12px; 
        align-items: flex-start; 
        max-width: 350px;

        /* Glass Style */
        background: color-mix(in srgb, var(--card-bg) 65%, transparent);
        color: var(--text);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-color: color-mix(in srgb, var(--text) 10%, transparent);
        box-shadow: 0 10px 40px rgba(0,0,0,0.15), inset 0 0 0 0.5px rgba(255,255,255,0.1);
        backdrop-filter: saturate(180%) blur(30px);
        -webkit-backdrop-filter: saturate(180%) blur(30px);
        transition: all 0.3s;
    }
    #theme-controls input {
        background: var(--bg);
        color: var(--text);
        border: 1px solid var(--subtext);
        padding: 8px 12px;
        border-radius: 6px;
        outline: none;
        flex: 1;
        opacity: 0.8;
    }
    #theme-controls button {
        background: rgba(0,0,0,0.05);
        color: var(--text);
        border: 1px solid rgba(0,0,0,0.1);
        border-radius: 6px;
        padding: 6px 12px;
        font-size: 12px;
        font-weight: 500;
        transition: 0.2s;
    }
    #theme-controls #generate-btn {
        background: var(--accent) !important;
        color: #fff;
        border: none;
        font-weight: 600;
        padding: 8px 16px;
    }
    
    /* Collapsible Logic */
    #preset-buttons {
        display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px;
        max-height: 300px; opacity: 1; overflow: hidden;
        transition: max-height 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease, margin 0.4s ease;
    }
    #preset-buttons.is-collapsed { max-height: 0 !important; opacity: 0 !important; margin-bottom: 0 !important; pointer-events: none; }
    #presets-icon { display: inline-block; transition: transform 0.3s ease; }
    .is-collapsed-icon #presets-icon { transform: rotate(-90deg); }

    /* --- Desktop Panel Toggle (Drag Handle) --- */
    #panel-handle { display: none; }
    @media (min-width: 769px) {
        #panel-handle {
            display: block; position: absolute; top: 0; left: 0;
            width: 20px; height: 100%;
            background: transparent;
            cursor: ew-resize;
            z-index: 20;
        }
        /* Visual cue */
        #panel-handle::before {
            content: ""; position: absolute; top: 50%; left: 8px; width: 4px; height: 30px;
            background: rgba(0,0,0,0.1); border-radius: 2px; transform: translateY(-50%);
            transition: 0.2s;
        }
        #panel-handle:hover::before { background: rgba(0,0,0,0.3); }
        
        #theme-controls { 
            padding-left: 20px; 
            transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        #theme-controls.is-minimized {
            transform: translateX(calc(100% - 20px));
        }
        #theme-controls.is-minimized > *:not(#panel-handle) {
            opacity: 0; pointer-events: none; transition: opacity 0.2s;
        }
    }

    /* --- Mobile Overrides (Unified) --- */
    .hn-menu-toggle { display: none; background: none; border: none; padding: 10px; width: 44px; height: 44px; color: inherit; z-index: 1001; position: relative; }
    .hn-menu-toggle span { display: block; width: 24px; height: 2px; background: currentColor; margin: 5px auto; transition: 0.3s; }

    @media (max-width: 768px) {
        /* Mobile Nav */
        .hn-menu-toggle { display: block; order: 999; }
        .hn-nav-links {
            display: none; flex-direction: column; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: var(--bg); padding: 140px 20px 60px; z-index: 1000; text-align: center;
            backdrop-filter: saturate(180%) blur(20px); -webkit-backdrop-filter: saturate(180%) blur(20px);
        }
        .hn-nav-links.is-open { display: flex; }
        .hn-nav-links a { font-size: 28px; font-weight: 300; }
        .hn-auth { display: none; }
        .hn-header { padding: 0 15px; height: 60px; }
        .hn-main { padding: 20px 15px; }
        
        /* Mobile Story Item */
        .hn-story-item {
            padding: 15px;
            gap: 12px;
            flex-direction: row;
            align-items: flex-start;
        }
        .hn-story-title { font-size: 17px; line-height: 1.3; }
        
        /* Mobile Rank */
        .hn-story-rank {
            display: block;
            width: auto;
            min-width: 18px;
            margin-right: 8px;
            font-size: 14px;
            
            /* Reset & Variable Application */
            position: static;
            background: var(--mobile-rank-bg, transparent);
            border: var(--mobile-rank-border, none);
            padding: var(--mobile-rank-padding, 0);
            border-radius: var(--mobile-rank-radius, 0);
            opacity: var(--mobile-rank-opacity, 0.5);
            color: var(--mobile-rank-color, inherit);
            font-weight: var(--mobile-rank-font-weight, 400);
            
            align-self: flex-start;
            margin-top: 2px;
            flex-shrink: 0;
            white-space: nowrap;
            text-align: center;
        }

        /* Mobile Upvote */
        .hn-upvote {
            width: 32px;
            height: 32px;
            margin-top: 2px;
            align-self: flex-start;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            opacity: 1; /* Reset opacity */
            
            /* Variable Application */
            background: var(--mobile-upvote-bg);
            border: var(--mobile-upvote-border);
            color: var(--mobile-upvote-color);
            border-radius: var(--mobile-upvote-radius);
        }

        /* Mobile Control Panel */
        #theme-controls {
            bottom: 20px; right: 20px; width: auto;
            max-width: calc(100vw - 40px);
            padding: 15px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .hn-footer { padding: 40px 20px 160px; }
        .hn-footer-links { flex-direction: column; gap: 10px; }
        #preset-buttons { margin-bottom: 8px; flex-wrap: nowrap; overflow-x: auto; padding-bottom: 5px; width: 100%; }
        #presets-toggle { margin-bottom: 2px; }
        
        /* Mobile Menu State */
        .is-open-active .hn-menu-toggle span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .is-open-active .hn-menu-toggle span:nth-child(2) { opacity: 0; }
        .is-open-active .hn-menu-toggle span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    }
`;

/**
 * Themes
 * Define variables and minimal specific overrides.
 */
const STYLE_PRESETS = {
    "Minimalist": `
        :root {
            --bg: #f5f5f7;
            --card-bg: #ffffff;
            --text: #1d1d1f;
            --subtext: #86868b;
            --accent: #0066cc;
            --header-bg: rgba(251, 251, 253, 0.8);
            
            /* Mobile */
            --mobile-upvote-bg: #e8e8ed;
            --mobile-upvote-radius: 50%;

            /* More Button */
            --more-btn-bg: var(--accent);
            --more-btn-color: #fff;
        }
        .hn-upvote { background: #e8e8ed; border: none; color: var(--text); }
        .hn-header { 
            background: rgba(255, 255, 255, 0.7); 
            border: 0.5px solid rgba(0,0,0,0.05);
            backdrop-filter: saturate(180%) blur(20px);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
            margin: 12px 20px;
            border-radius: 100px;
            height: 50px;
            top: 12px;
        }
        .hn-header.is-open-active { margin: 0; top: 0; width: 100%; border-radius: 0; }
        .hn-logo { 
            text-transform: uppercase; 
            letter-spacing: 0.2em; 
            font-size: 14px; 
            font-weight: 300;
            color: #000;
        }
        .hn-story-item:hover { box-shadow: 0 20px 40px rgba(0,0,0,0.08); transform: scale(1.01); }
        #theme-controls #generate-btn { background: var(--accent) !important; }
    `,

    "Glitch": `
        :root {
            --bg: #050a0e;
            --card-bg: rgba(5, 10, 14, 0.9);
            --text: #fcee0a; /* Yellow */
            --subtext: #00f0ff; /* Blue */
            --accent: #ff003c; /* Pink */
            --header-bg: var(--text);
            --font-main: sans-serif;
            
            /* Mobile */
            --mobile-upvote-bg: var(--accent);
            --mobile-upvote-color: #fff;
            --mobile-upvote-radius: 0;

            /* More Button */
            --more-btn-bg: var(--text);
            --more-btn-color: #000;
        }
        
        body { text-transform: uppercase; }
        body::before {
            content: ""; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px);
            pointer-events: none; z-index: 1000;
        }
        .hn-header { clip-path: polygon(0 0, 100% 0, 100% 70%, 95% 100%, 0 100%); border-bottom: 5px solid var(--subtext); color: #000; }
        .hn-header.is-open-active { clip-path: none; }
        .hn-header.is-open-active .hn-menu-toggle { color: var(--text); }
        .hn-logo { border: 4px solid #000; padding: 0 10px; }
        .hn-story-item { 
            border: 2px solid var(--subtext);
            background: rgba(255, 0, 60, 0.05);
            clip-path: polygon(0 0, 95% 0, 100% 20%, 100% 100%, 5% 100%, 0 80%);
        }
        .hn-story-item:hover { transform: skewX(-2deg); border-color: var(--accent); box-shadow: -10px 10px 0 var(--accent); }
        .hn-upvote { 
            background: var(--accent); color: #fff; border: none; border-radius: 0; 
            clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%); 
            padding: 0 10px; width: auto;
        }
        /* Override Common Apply Button for visibility */
        #theme-controls #generate-btn { background: var(--accent) !important; color: #fff !important; }
    `,

    "Playful": `
        :root {
            --red: #e60012;
            --blue: #00a0e9;
            --bg: #eee;
            --card-bg: #fff;
            --text: #333;
            --subtext: #8c8c8c;
            --accent: var(--blue);
            --header-bg: var(--red);
            
            /* Mobile */
            --mobile-upvote-bg: var(--red);
            --mobile-upvote-color: #fff;
            --mobile-upvote-border: 3px solid #000;
            --mobile-upvote-radius: 12px;
            
            --mobile-rank-opacity: 1;
            --mobile-rank-color: #fff;
            --mobile-rank-bg: var(--blue);
            --mobile-rank-border: 3px solid #000;
            --mobile-rank-radius: 12px;
            --mobile-rank-padding: 2px 8px;
            --mobile-rank-font-weight: 900;
            
            --button-bg: var(--red);

            /* More Button */
            --more-btn-bg: var(--red);
            --more-btn-color: #fff;
        }
        .hn-header { border-bottom: 12px solid #000; justify-content: center; }
        .hn-logo { background: #fff; color: var(--red); padding: 5px 20px; border-radius: 100px; border: 4px solid #000; box-shadow: 4px 4px 0 #000; }
        
        .hn-story-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px; }
        .hn-story-item { 
            border: 6px solid #000; border-radius: 40px; box-shadow: 12px 12px 0 #ccc; 
            align-items: center; padding: 30px;
        }
        .hn-story-item:hover { transform: translateY(-8px); box-shadow: 12px 20px 0 #bbb; border-color: var(--blue); }
        .hn-story-rank { 
            position: absolute; top: -20px; left: 20px; background: var(--blue); color: #fff; 
            padding: 5px 15px; border-radius: 20px; border: 5px solid #000; font-weight: 900; 
            width: auto; text-align: center;
        }
        .hn-upvote { 
            background: var(--red); color: #fff; border: 4px solid #000; border-radius: 12px; 
            width: 50px; height: 50px; font-weight: 900; opacity: 1;
        }
        /* Force Apply Button Red */
        #theme-controls #generate-btn { background: var(--red) !important; }
    `,

    "Glow": `
        :root {
            --bg: #0a0d14;
            --card-bg: rgba(20, 25, 35, 0.8);
            --text: #ffffff;
            --subtext: rgba(255, 255, 255, 0.6);
            --accent: #0037c1;
            --header-bg: transparent;
            --header-border: 1px solid rgba(255,255,255,0.05);
            
            /* Mobile */
            --mobile-upvote-bg: transparent;
            --mobile-upvote-color: var(--subtext);
            --mobile-upvote-border: 1px solid rgba(255,255,255,0.2);

            /* More Button */
            --more-btn-bg: var(--accent);
            --more-btn-color: #fff;
        }
        body {
            background-image: radial-gradient(circle at 0% 0%, rgba(0, 55, 193, 0.15) 0%, transparent 50%),
                              radial-gradient(circle at 100% 100%, rgba(0, 55, 193, 0.1) 0%, transparent 50%);
        }
        .hn-story-item { background: linear-gradient(90deg, rgba(255,255,255,0.05), transparent); border: none; border-left: 2px solid transparent; border-radius: 0; }
        .hn-story-item:hover { background: linear-gradient(90deg, rgba(0, 55, 193, 0.2), transparent); transform: translateX(20px); border-left: 2px solid var(--accent); }
        .hn-header { 
            border: 1px solid rgba(0, 55, 193, 0.3); 
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 55, 193, 0.2);
            margin: 15px 20px;
            border-radius: 12px;
            background: rgba(10, 13, 20, 0.8);
            top: 15px;
        }
        .hn-header.is-open-active { margin: 0; top: 0; width: 100%; border-radius: 0; }
        .hn-logo { 
            text-transform: uppercase; 
            letter-spacing: 4px; 
            text-shadow: 0 0 10px var(--accent), 0 0 20px var(--accent); 
            font-size: 18px;
        }
        .hn-upvote { border-color: rgba(255,255,255,0.2); }
        #theme-controls #generate-btn { background: var(--ps-blue) !important; color: #fff !important; }
    `,

    "Academic": `
        :root {
            --bg: #fdfaf5;
            --card-bg: #ffffff;
            --text: #1b1b1b;
            --subtext: #666;
            --accent: #d97757;
            --header-bg: #fdfaf5;
            --font-main: serif;
            
            --item-border: none;
            --item-padding: 50px 0;
            --item-radius: 0;
            --item-shadow: none;
            
            /* Mobile */
            --mobile-upvote-bg: transparent;
            --mobile-upvote-color: #999;
            --mobile-upvote-border: 1.5px solid #ccc;

            /* More Button */
            --more-btn-bg: var(--accent);
            --more-btn-color: #fff;
        }
        .hn-story-item { border-bottom: 1px solid rgba(0,0,0,0.08); }
        .hn-story-title { font-size: 28px; font-weight: 500; }
        .hn-story-rank { font-size: 24px; font-weight: bold; width: 40px; }
        .hn-upvote { border: 1.5px solid #ccc; width: 36px; height: 36px; }
        #theme-controls #generate-btn { background: var(--a-accent) !important; color: #fff !important; }
    `,

    "Search": `
        :root {
            --bg: #fff;
            --card-bg: #fff;
            --text: #202124;
            --subtext: #5f6368;
            --accent: #1a73e8;
            --header-bg: #fff;
            --font-main: sans-serif;
            
            --item-padding: 16px 0;
            --item-radius: 0;
            --item-border: none;
            --item-shadow: none;
            
            /* Mobile */
            --mobile-upvote-bg: transparent;
            --mobile-upvote-color: #70757a;
            --mobile-upvote-border: 1px solid #dadce0;

            /* More Button */
            --more-btn-bg: #f8f9fa;
            --more-btn-color: #3c4043;
        }
        .hn-story-title { color: #1a0dab; font-weight: 400; text-decoration: none; }
        .hn-story-title:hover { text-decoration: underline; }
        .hn-upvote { border-radius: 4px; width: auto; height: auto; padding: 2px 6px; border: 1px solid #dadce0; font-size: 11px; }
        #theme-controls #generate-btn { background: var(--g-blue) !important; color: #fff !important; }
    `,

    "Universal": `
        :root {
            --bg: #fff;
            --card-bg: #f4f4f4;
            --text: #000;
            --subtext: #666;
            --accent: #034EA2;
            --header-bg: #fff;
            
            /* Mobile */
            --mobile-upvote-bg: var(--accent);
            --mobile-upvote-color: #fff;
            --mobile-upvote-radius: 50%;

            /* More Button */
            --more-btn-bg: var(--accent);
            --more-btn-color: #fff;
        }
        .hn-story-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 40px; }
        .hn-story-item { padding: 30px; border-radius: 40px; }
        .hn-story-item:hover { background: #e8e8e8; transform: scale(1.02); }
        .hn-story-title { font-size: 28px; font-weight: 700; margin-bottom: 0; }
        .hn-upvote { background: var(--accent); color: #fff; border: none; width: 40px; height: 40px; font-weight: 700; opacity: 1; }
        #theme-controls #generate-btn { background: var(--s-blue) !important; color: #fff !important; }
    `,

    "Intelligence": `
        :root {
            --bg: #0d0d0d;
            --card-bg: #171717;
            --text: #ececec;
            --subtext: #b4b4b4;
            --accent: #10a37f;
            --header-bg: rgba(13, 13, 13, 0.8);
            
            --item-border: 1px solid rgba(255,255,255,0.1);
            
            /* Mobile */
            --mobile-upvote-bg: transparent;
            --mobile-upvote-color: var(--subtext);
            --mobile-upvote-border: 1px solid rgba(255,255,255,0.1);

            /* More Button */
            --more-btn-bg: var(--accent);
            --more-btn-color: #fff;
        }
        .hn-story-item:hover { border-color: var(--accent); }
        .hn-header { 
            border: 1px solid rgba(16, 163, 127, 0.3); 
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); 
            background: rgba(13, 13, 13, 0.9);
            margin: 10px 15px;
            border-radius: 4px;
            top: 10px;
        }
        .hn-header.is-open-active { margin: 0; top: 0; width: 100%; border-radius: 0; }
        .hn-logo { 
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; 
            font-size: 16px; 
            color: var(--accent); 
            display: flex; 
            align-items: center; 
        }
        .hn-logo::after { 
            content: '_'; 
            margin-left: 4px; 
            animation: blink 1s step-end infinite; 
            color: var(--accent);
        }
        @keyframes blink { 50% { opacity: 0; } }
        .hn-upvote { border-color: rgba(255,255,255,0.1); width: 24px; height: 24px; border-radius: 6px; }
        #theme-controls #generate-btn { background: var(--accent) !important; color: #fff !important; }
    `,

    "Ghibli": `
        :root {
            --bg: #fdfaf0; /* 柔らかな生成り色（紙の質感） */
            --card-bg: #ffffff;
            --text: #433422; /* 焦茶色の文字 */
            --subtext: #8c7355; /* 土のような茶色 */
            --accent: #5d8a66; /* 深い森の緑 */
            --header-bg: rgba(253, 250, 240, 0.85);
            --header-border: 1px solid rgba(140, 115, 85, 0.2);
            --font-main: "Hiragino Mincho ProN", "MS PMincho", serif; /* 叙情的な明朝体 */

            /* Component Overrides */
            --item-radius: 20px;
            --item-border: 1px solid rgba(93, 138, 102, 0.1);
            --item-shadow: 0 4px 15px rgba(67, 52, 34, 0.05);

            /* More & Upvote Colors */
            --more-btn-bg: var(--accent);
            --more-btn-color: #fff;
            --mobile-upvote-bg: var(--accent);
            --mobile-upvote-color: #fff;
            --mobile-rank-color: var(--subtext);
            --mobile-rank-opacity: 1;
        }
        .hn-story-item {
            background-image: linear-gradient(135deg, #fff 0%, #f9f7f0 100%);
            border-bottom: 2px solid rgba(140, 115, 85, 0.1);
        }
        .hn-story-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(93, 138, 102, 0.15);
            border-color: var(--accent);
        }
        .hn-logo {
            font-style: italic;
            color: var(--accent);
            filter: drop-shadow(1px 1px 0px rgba(0,0,0,0.1));
        }
        .hn-upvote {
            background: rgba(93, 138, 102, 0.05);
            border-color: rgba(93, 138, 102, 0.3);
            color: var(--accent);
        }
        #theme-controls #generate-btn { background: var(--accent) !important; color: #fff !important; }
    `,

    "8-Bit": `
        :root {
            --bg: #000000; /* 漆黒の背景 */
            --card-bg: #111111;
            --text: #00ff00; /* クッパの炎やレトロPCのようなグリーン */
            --subtext: #008800;
            --accent: #00ffff; /* シアンのアクセント */
            --header-bg: #000000;
            --header-border: 4px solid #00ffff;
            --font-main: "Courier New", Courier, monospace; /* 等幅フォントでデータ感を演出 */

            /* Component Overrides */
            --item-radius: 0px; /* 角丸を廃止してブロック感を強調 */
            --item-border: 4px solid #008800;
            --item-padding: 20px;
            --item-shadow: 8px 8px 0px #004400; /* ドット絵のような硬い影 */

            /* More & Upvote Colors */
            --more-btn-bg: var(--accent);
            --more-btn-color: #000;
            --mobile-upvote-bg: var(--accent);
            --mobile-upvote-color: #000;
            --mobile-rank-color: var(--text);
            --mobile-rank-opacity: 1;
        }
        body {
            image-rendering: pixelated;
        }
        .hn-story-item:hover {
            border-color: var(--accent);
            box-shadow: 4px 4px 0px var(--subtext);
            transform: translate(4px, 4px); /* 押し込み感 */
        }
        .hn-upvote {
            border-radius: 0;
            border: 2px solid var(--accent);
            background: #000;
            color: var(--accent);
        }
        .hn-logo {
            text-shadow: 3px 3px 0px #ff00ff; /* 懐かしの3D赤青メガネ風 */
        }
        .hn-load-more {
            border-radius: 0;
            border: 4px solid var(--text);
            text-transform: uppercase;
        }
        #theme-controls #generate-btn { background: #ff00ff !important; color: #fff !important; border-radius: 0 !important; }
    `
};

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
            console.error("Failed to fetch ID list:", error);
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
        presetButtons: document.getElementById('preset-buttons'),
        presetsToggle: document.getElementById('presets-toggle'),
        presetsIcon: document.getElementById('presets-icon'),
        listElement: document.querySelector('.hn-story-list'),
        loadMoreBtn: document.querySelector('.hn-load-more'),
        menuToggle: document.querySelector('.hn-menu-toggle'),
        navLinks: document.querySelector('.hn-nav-links'),
        header: document.querySelector('.hn-header'),
        themeControls: document.getElementById('theme-controls'),
        panelHandle: document.getElementById('panel-handle')
    },

    async init() {
        this.renderPresetButtons();
        this.bindEvents();
        console.log("Generative UI - Architecture Refactored.");
        
        // Restore saved theme or fallback to Minimalist
        const savedTheme = localStorage.getItem('acephale-theme');
        const themeToApply = (savedTheme && STYLE_PRESETS[savedTheme]) ? savedTheme : "Minimalist";
        
        this.applyStyle(STYLE_PRESETS[themeToApply], themeToApply);

        // Initial load
        await this.loadInitial();
    },

    renderPresetButtons() {
        this.elements.presetButtons.innerHTML = '';
        Object.keys(STYLE_PRESETS).forEach(themeName => {
            const btn = document.createElement('button');
            btn.textContent = themeName;
            btn.style.cssText = `
                padding: 6px 12px;
                background: rgba(0,0,0,0.05);
                border: 1px solid rgba(0,0,0,0.1);
                border-radius: 6px;
                font-size: 12px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s;
                color: var(--text);
                flex-shrink: 0;
            `;
            btn.onmouseover = () => { btn.style.background = 'rgba(0,0,0,0.1)'; };
            btn.onmouseout = () => { btn.style.background = 'rgba(0,0,0,0.05)'; };
            btn.onclick = () => {
                this.elements.promptInput.value = themeName;
                this.applyStyle(STYLE_PRESETS[themeName], themeName);
                this.togglePresets(true);
            };
            this.elements.presetButtons.appendChild(btn);
        });
    },

    bindEvents() {
        this.elements.generateBtn.addEventListener('click', () => this.handleGenerate());
        this.elements.promptInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleGenerate();
        });
        this.elements.loadMoreBtn.addEventListener('click', () => this.loadMore());
        this.elements.menuToggle.addEventListener('click', () => this.toggleMenu());
        
        if (this.elements.presetsToggle) {
            this.elements.presetsToggle.addEventListener('click', () => this.togglePresets());
        }

        if (this.elements.panelHandle) {
            let isDragging = false;
            let startX = 0;
            const threshold = 50;

            const startDrag = (e) => {
                if (window.innerWidth < 769) return;
                isDragging = true;
                startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
                this.elements.themeControls.style.transition = 'none';
            };

            const doDrag = (e) => {
                if (!isDragging) return;
                const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
                const deltaX = clientX - startX;
                const isMin = this.elements.themeControls.classList.contains('is-minimized');

                if (!isMin && deltaX > 0) {
                    this.elements.themeControls.style.transform = `translateX(${deltaX}px)`;
                } else if (isMin && deltaX < 0) {
                    this.elements.themeControls.style.transform = `translateX(calc(100% - 20px + ${deltaX}px))`;
                }
            };

            const endDrag = (e) => {
                if (!isDragging) return;
                isDragging = false;
                this.elements.themeControls.style.transition = '';
                
                let clientX = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX;
                const deltaX = clientX - startX;
                const isMin = this.elements.themeControls.classList.contains('is-minimized');

                this.elements.themeControls.style.transform = '';

                if (Math.abs(deltaX) < 10) {
                    this.elements.themeControls.classList.toggle('is-minimized');
                } else {
                    if (!isMin && deltaX > threshold) {
                        this.elements.themeControls.classList.add('is-minimized');
                    } else if (isMin && deltaX < -threshold) {
                        this.elements.themeControls.classList.remove('is-minimized');
                    }
                }
            };

            const handle = this.elements.panelHandle;
            handle.addEventListener('mousedown', startDrag);
            handle.addEventListener('touchstart', startDrag, {passive: true});
            
            document.addEventListener('mousemove', doDrag);
            document.addEventListener('touchmove', doDrag, {passive: true});
            
            document.addEventListener('mouseup', endDrag);
            document.addEventListener('touchend', endDrag);
        }
        
        // Close menu when a link is clicked
        this.elements.navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') this.toggleMenu(false);
        });
    },

    togglePresets(collapse) {
        const shouldCollapse = collapse !== undefined ? collapse : !this.elements.presetButtons.classList.contains('is-collapsed');
        this.elements.presetButtons.classList.toggle('is-collapsed', shouldCollapse);
        this.elements.presetsToggle.classList.toggle('is-collapsed-icon', shouldCollapse);
    },

    toggleMenu(force) {
        if (!this.elements.menuToggle) return;
        const shouldOpen = force !== undefined ? force : !this.elements.navLinks.classList.contains('is-open');
        this.elements.navLinks.classList.toggle('is-open', shouldOpen);
        this.elements.header.classList.toggle('is-open-active', shouldOpen);
        document.body.style.overflow = shouldOpen ? 'hidden' : '';
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
            
            // Escape HTML in user content
            const title = this.escapeHtml(story.title || '');
            const author = this.escapeHtml(story.by || '');

            const listItem = document.createElement('li');
            listItem.className = 'hn-story-item';
            listItem.innerHTML = `
                <div class="hn-story-rank">${rank}</div>
                <div class="hn-story-content">
                    <div class="hn-story-title-row">
                        <a href="${story.url || '#'}" class="hn-story-title" target="_blank">${title}</a>
                        ${domainHtml}
                    </div>
                    <div class="hn-story-meta">
                        <span class="hn-story-points">${story.score} pts</span> • 
                        <span class="hn-story-author">${author}</span> • 
                        <span class="hn-story-time">${timeAgo}</span>
                    </div>
                </div>
                <button class="hn-upvote" aria-label="upvote">▲</button>
            `;
            this.elements.listElement.appendChild(listItem);
        });
    },

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    },

    handleGenerate() {
        const input = this.elements.promptInput.value.trim();
        if (!input) return;

        const style = this.matchStyle(input);
        
        if (style) {
            this.applyStyle(style, input);
            this.togglePresets(true);
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
        this.toggleMenu(false); // Close menu on theme change
        
        // Save to local storage for persistence
        if (STYLE_PRESETS[themeName]) {
            localStorage.setItem('acephale-theme', themeName);
        }

        // Fallback for browsers that don't support View Transition API
        if (!document.startViewTransition) {
            this.elements.styleTag.textContent = SYSTEM_STYLE + css;
            return;
        }

        // Smooth transition using View Transition API
        document.startViewTransition(() => {
            this.elements.styleTag.textContent = SYSTEM_STYLE + css;
        });
    },

    showError() {
        const available = Object.keys(STYLE_PRESETS).join('", "');
        alert(`Please enter a supported theme:\n"${available}"`);
    }
};

// Start the application
document.addEventListener('DOMContentLoaded', () => App.init());
