/**
 * Acephale OS | Gardener.js
 * Hacker News Interface Styling & Data Fetching
 */

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

const STYLE_PRESETS = {
    "Minimalist": `
        :root {
            --bg: #f5f5f7;
            --card: #ffffff;
            --accent: #0066cc;
            --text: #1d1d1f;
            --subtext: #86868b;
        }
        body {
            background: var(--bg);
            color: var(--text);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            margin: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            letter-spacing: -0.012em;
            -webkit-font-smoothing: antialiased;
        }
        .hn-header {
            background: rgba(251, 251, 253, 0.8);
            backdrop-filter: saturate(180%) blur(20px);
            padding: 0 20px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid rgba(0,0,0,0.08);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        .hn-nav {
            width: 100%;
            max-width: 980px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .hn-logo {
            font-size: 18px;
            font-weight: 600;
            color: var(--text);
            text-decoration: none;
            opacity: 0.8;
            transition: opacity 0.3s;
        }
        .hn-logo:hover { opacity: 1; }
        .hn-site-title { display: none; }
        .hn-nav-links { 
            display: flex; 
            gap: 30px; 
            margin: 0;
            padding: 0;
            list-style: none;
        }
        .hn-nav-links a {
            color: var(--text);
            text-decoration: none;
            font-size: 12px;
            font-weight: 400;
            opacity: 0.8;
            transition: opacity 0.3s;
        }
        .hn-nav-links a:hover { opacity: 1; }
        .hn-auth a {
            color: var(--text);
            text-decoration: none;
            font-size: 12px;
            font-weight: 400;
            opacity: 0.8;
            transition: opacity 0.3s;
        }
        .hn-auth a:hover { opacity: 1; }
        
        .hn-main {
            max-width: 980px;
            margin: 0 auto;
            padding: 60px 20px;
            flex: 1;
        }
        .hn-story-list { display: grid; gap: 24px; }
        .hn-story-item {
            background: var(--card);
            border-radius: 20px;
            padding: 32px;
            display: flex;
            align-items: center;
            gap: 24px;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.25, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.25, 1);
            box-shadow: 0 4px 12px rgba(0,0,0,0.04);
            border: 1px solid rgba(0,0,0,0.02);
        }
        .hn-story-item:hover {
            transform: scale(1.01);
            box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }
        .hn-story-rank { 
            order: -2;
            font-size: 40px; 
            font-weight: 700; 
            color: var(--subtext); 
            width: 60px; 
            text-align: right;
            opacity: 0.2;
            font-feature-settings: "tnum";
        }
        .hn-story-title { 
            font-size: 21px; 
            font-weight: 600; 
            color: var(--text); 
            text-decoration: none; 
            display: block; 
            margin-bottom: 8px; 
            line-height: 1.2;
        }
        .hn-story-title:hover { color: var(--accent); }
        .hn-story-meta { color: var(--subtext); font-size: 14px; font-weight: 400; }
        .hn-upvote {
            order: -1;
            background: #e8e8ed;
            color: var(--text);
            border: none;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            transition: background 0.3s;
            flex-shrink: 0;
        }
        .hn-upvote:hover { background: #d2d2d7; }
        .hn-load-more {
            background: var(--accent);
            color: #fff;
            border: none;
            padding: 12px 24px;
            border-radius: 980px;
            font-weight: 600;
            font-size: 17px;
            margin: 80px auto;
            display: block;
            cursor: pointer;
            transition: background 0.3s, transform 0.2s;
        }
        .hn-load-more:hover { 
            background: #0077ed;
            transform: scale(1.02);
        }
        .hn-load-more:active { transform: scale(0.98); }

        .hn-footer { 
            padding: 80px 20px 40px; 
            background: var(--bg); 
            border-top: 1px solid rgba(0,0,0,0.1); 
            color: var(--subtext); 
            font-size: 11px;
            max-width: 980px;
            margin: 0 auto;
            text-align: left;
        }
        .hn-footer-links {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            padding-bottom: 15px;
            margin-bottom: 15px;
            list-style: none;
        }
        .hn-footer-links li:not(:last-child)::after {
            content: "|";
            margin-left: 15px;
            opacity: 0.3;
        }
        .hn-footer-links a { color: var(--subtext); text-decoration: none; }
        .hn-footer-links a:hover { text-decoration: underline; color: var(--text); }
        .hn-footer::after {
            content: "© 2026 Designed for Humanity.";
            display: block;
            margin-top: 10px;
            opacity: 0.8;
        }
    `,

    "Glitch": `
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

            /* Mapping */
            --bg: var(--black);
            --card: rgba(5, 10, 14, 0.9);
            --text: var(--yellow);
            --subtext: var(--blue);
            --accent: var(--pink);
        }
        body {
            background: var(--black);
            color: var(--yellow);
            font-family: sans-serif;
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
            padding: 10px 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            clip-path: polygon(0 0, 100% 0, 100% 70%, 95% 100%, 0 100%);
            border-bottom: 5px solid var(--blue);
            animation: glitch 0.2s infinite;
            animation-play-state: paused;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        /* Fix mobile menu clipping/context issues */
        @media (max-width: 768px) {
            .hn-header { clip-path: none !important; animation: none !important; border-bottom: 2px solid var(--blue); }
            /* Mobile menu link visibility */
            .hn-nav-links.is-open a {
                color: var(--yellow) !important;
                text-shadow: 2px 2px 0px var(--blue);
            }
            .hn-menu-toggle {
                color: var(--yellow) !important;
                filter: drop-shadow(2px 2px 0px var(--blue));
            }
        }
        .hn-header:hover { animation-play-state: running; }
        .hn-nav {
            width: 100%;
            max-width: 1200px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .hn-logo { font-size: 32px; font-weight: 900; letter-spacing: -2px; border: 4px solid #000; padding: 0 10px; color: #000; text-decoration: none; }
        .hn-site-title { display: none; }
        .hn-nav-links {
            display: flex;
            gap: 20px;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .hn-nav-links a {
            color: #000;
            text-decoration: none;
            font-weight: 900;
            font-size: 14px;
            letter-spacing: 1px;
        }
        .hn-nav-links a:hover {
            background: #000;
            color: var(--yellow);
            transform: skewX(-10deg);
        }
        .hn-auth a {
            color: #fff;
            background: var(--pink);
            padding: 8px 16px;
            text-decoration: none;
            font-weight: 900;
            clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
            transition: 0.2s;
        }
        .hn-auth a:hover {
            background: var(--blue);
            color: #000;
            box-shadow: 0 0 15px var(--blue);
        }
        
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

        .hn-footer { 
            background: var(--black); 
            color: var(--yellow); 
            padding: 150px 40px; 
            border-top: 5px solid var(--blue); 
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .hn-footer-links {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 60px;
            list-style: none;
        }
        .hn-footer-links a {
            color: var(--yellow);
            text-decoration: none;
            font-size: 14px;
            font-weight: 900;
            padding: 10px 30px;
            border: 2px solid var(--blue);
            clip-path: polygon(0 0, 100% 0, 100% 70%, 90% 100%, 0 100%);
            transition: 0.2s;
            letter-spacing: 2px;
        }
        .hn-footer-links a:hover {
            background: var(--blue);
            color: #000;
            box-shadow: 0 0 20px var(--blue);
            transform: skewX(-10deg);
        }
        .hn-footer::after {
            content: ">>> ACCESS GRANTED <<<";
            display: block;
            font-size: 12px;
            color: var(--pink);
            margin-top: 80px;
            text-shadow: 2px 2px 0 #000;
            animation: glitch 0.5s infinite;
        }
    `,

    "Playful": `
        :root {
            --red: #e60012;
            --blue: #00a0e9;
            --white: #ffffff;
            --gray: #8c8c8c;

            /* Mapping */
            --bg: #eee;
            --card: #fff;
            --text: #333;
            --subtext: var(--gray);
            --accent: var(--blue);

            /* Mobile Overrides */
            --mobile-upvote-bg: var(--red);
            --mobile-upvote-color: #fff;
            --mobile-upvote-border: 3px solid #000;
        }
        body {
            background-color: #eee;
            color: #333;
            font-family: sans-serif;
            margin: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        .hn-header {
            background: var(--red);
            padding: 20px 40px;
            display: flex;
            justify-content: center;
            border-bottom: 12px solid #000;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        .hn-nav {
            width: 100%;
            max-width: 1100px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .hn-logo {
            background: #fff;
            color: var(--red);
            padding: 5px 20px;
            border-radius: 100px;
            font-size: 24px;
            font-weight: 900;
            text-decoration: none;
            border: 4px solid #000;
            box-shadow: 4px 4px 0 #000;
            transition: 0.1s;
        }
        .hn-logo:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 #000; }
        .hn-site-title { display: none; }
        .hn-nav-links {
            display: flex;
            gap: 20px;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .hn-nav-links a {
            color: #fff;
            text-decoration: none;
            font-weight: 900;
            font-size: 16px;
            text-transform: uppercase;
            text-shadow: 2px 2px 0 #000;
            padding: 5px 10px;
            border-radius: 8px;
            transition: background 0.2s;
        }
        .hn-nav-links a:hover { background: rgba(0,0,0,0.2); }
        .hn-auth a {
            background: var(--blue);
            color: #fff;
            padding: 8px 20px;
            border-radius: 12px;
            border: 4px solid #000;
            text-decoration: none;
            font-weight: 900;
            box-shadow: 4px 4px 0 #000;
        }
        
        .hn-main {
            max-width: 1100px;
            margin: 40px auto;
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 0 40px;
            gap: 40px;
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
            flex-direction: row;
            align-items: center;
            gap: 20px;
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
            z-index: 10;
        }
        .hn-story-title { font-size: 20px; font-weight: 900; line-height: 1.2; color: #000; text-decoration: none; margin: 10px 0; display: block; }
        .hn-upvote {
            order: -1;
            background: var(--red);
            color: #fff;
            border: 4px solid #000;
            border-radius: 12px;
            width: 50px;
            height: 50px;
            padding: 0;
            font-weight: 900;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            font-size: 14px;
        }
        .hn-load-more {
            background: #fff;
            border: 8px solid #000;
            border-radius: 100px;
            padding: 25px 60px;
            font-size: 28px;
            font-weight: 900;
            cursor: pointer;
            box-shadow: 0 10px 0 #000;
            align-self: center;
            margin: 40px 0;
        }
        .hn-load-more:active { transform: translateY(10px); box-shadow: 0 0px 0 #000; }

        .hn-footer { 
            background: #000; 
            color: #fff; 
            padding: 100px 40px; 
            text-align: center; 
            border-top: 12px solid var(--red);
        }
        .hn-footer-links {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 30px;
            margin-bottom: 40px;
            list-style: none;
        }
        .hn-footer-links a {
            color: #fff;
            font-weight: 900;
            font-size: 20px;
            text-decoration: none;
            border: 4px solid #fff;
            padding: 10px 20px;
            border-radius: 12px;
            box-shadow: 4px 4px 0 var(--blue);
            transition: 0.1s;
        }
        .hn-footer-links a:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--blue); background: var(--blue); }
        .hn-footer::after {
            content: "STAY PLAYFUL!";
            display: block;
            font-size: 40px;
            font-weight: 900;
            margin-top: 60px;
            text-shadow: 4px 4px 0 var(--red), 8px 8px 0 var(--blue);
        }
    `,

    "Glow": `
        :root {
            --ps-blue: #0037c1;
            --ps-dark: #000000;
            --ps-white: #ffffff;
            --ps-bg: #0a0d14;
            
            /* Mapping for Theme Controls */
            --bg: var(--ps-bg);
            --card: rgba(20, 25, 35, 0.8);
            --text: var(--ps-white);
            --subtext: rgba(255, 255, 255, 0.6);
            --accent: var(--ps-blue);
        }
        body {
            background-color: var(--ps-bg);
            color: var(--ps-white);
            font-family: sans-serif;
            margin: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background-image: 
                radial-gradient(circle at 0% 0%, rgba(0, 55, 193, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 100% 100%, rgba(0, 55, 193, 0.1) 0%, transparent 50%);
        }
        .hn-header {
            padding: 20px 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: sticky;
            top: 0;
            background: rgba(10, 13, 20, 0.8);
            backdrop-filter: blur(20px);
            z-index: 100;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .hn-nav {
            width: 100%;
            max-width: 1400px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .hn-logo {
            font-size: 32px;
            font-weight: 100;
            letter-spacing: 8px;
            color: #fff;
            text-transform: uppercase;
            text-decoration: none;
        }
        .hn-site-title { display: none; }
        .hn-nav-links {
            display: flex;
            gap: 40px;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .hn-nav-links a {
            color: rgba(255,255,255,0.4);
            text-transform: uppercase;
            letter-spacing: 3px;
            text-decoration: none;
            font-size: 13px;
            transition: 0.5s;
        }
        .hn-nav-links a:hover { color: #fff; text-shadow: 0 0 15px var(--ps-blue); }
        .hn-auth a {
            color: #fff;
            text-decoration: none;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-size: 12px;
            padding: 10px 20px;
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 4px;
            transition: 0.3s;
        }
        .hn-auth a:hover { background: #fff; color: #000; }
        
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

        .hn-footer { 
            padding: 150px 80px; 
            background: #000; 
            border-top: 2px solid var(--ps-blue); 
            text-align: center; 
            box-shadow: 0 -20px 40px rgba(0, 55, 193, 0.2);
        }
        .hn-footer-links {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin-bottom: 50px;
            list-style: none;
        }
        .hn-footer-links a {
            color: rgba(255,255,255,0.4);
            text-decoration: none;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 3px;
            transition: 0.5s;
        }
        .hn-footer-links a:hover { color: #fff; text-shadow: 0 0 15px var(--ps-blue); }
        .hn-footer::after {
            content: "○ △ □ ✕";
            display: block;
            font-size: 24px;
            font-weight: 100;
            color: rgba(255,255,255,0.1);
            letter-spacing: 20px;
            margin-top: 50px;
        }
    `,

    "Academic": `
        :root {
            --a-bg: #fdfaf5;
            --a-text: #1b1b1b;
            --a-accent: #d97757;
            --a-sub: #666;

            /* Mapping */
            --bg: var(--a-bg);
            --card: #fff;
            --text: var(--a-text);
            --subtext: var(--a-sub);
            --accent: var(--a-accent);
        }
        body {
            background-color: var(--a-bg);
            color: var(--a-text);
            font-family: serif;
            margin: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        .hn-header {
            padding: 30px 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: var(--a-bg);
            border-bottom: 1px solid rgba(0,0,0,0.05);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        .hn-nav {
            width: 100%;
            max-width: 1200px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .hn-logo { font-size: 34px; color: var(--a-text); text-decoration: none; font-weight: 600; }
        .hn-site-title { display: none; }
        .hn-nav-links {
            display: flex;
            gap: 30px;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .hn-nav-links a {
            color: var(--a-sub);
            text-decoration: none;
            font-size: 16px;
            border-bottom: 1px solid transparent;
            transition: 0.3s;
        }
        .hn-nav-links a:hover { color: var(--a-text); border-bottom-color: var(--a-accent); }
        .hn-auth a {
            color: var(--a-text);
            text-decoration: none;
            font-size: 16px;
            border: 1px solid var(--a-text);
            padding: 8px 20px;
            border-radius: 4px;
            transition: 0.3s;
        }
        .hn-auth a:hover { background: var(--a-text); color: var(--a-bg); }
        
        .hn-main { max-width: 800px; margin: 0 auto; flex: 1; padding: 0 40px; }
        .hn-story-item {
            padding: 50px 0;
            border-bottom: 1px solid rgba(0,0,0,0.08);
            display: flex;
            gap: 30px;
        }
        .hn-story-title {
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

        .hn-footer { 
            padding: 120px 40px; 
            background: var(--a-bg); 
            border-top: 1px solid rgba(0,0,0,0.1); 
            text-align: center; 
            color: var(--a-sub);
            font-style: italic;
        }
        .hn-footer-links {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin-bottom: 50px;
            list-style: none;
        }
        .hn-footer-links a {
            color: var(--a-sub);
            text-decoration: none;
            font-size: 16px;
            transition: 0.3s;
            border-bottom: 1px solid transparent;
        }
        .hn-footer-links a:hover { color: var(--a-text); border-bottom-color: var(--a-accent); }
        .hn-footer::after {
            content: "Thoughtful AI for a Better Future.";
            display: block;
            font-size: 18px;
            color: var(--a-accent);
            margin-top: 50px;
            font-weight: 500;
        }
    `,

    "Search": `
        :root {
            --g-blue: #1a73e8;
            --g-bg: #f8f9fa;

            /* Mapping */
            --bg: #fff;
            --card: #fff;
            --text: #202124;
            --subtext: #5f6368;
            --accent: var(--g-blue);
        }
        body {
            background: #fff;
            color: #202124;
            font-family: sans-serif;
            margin: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        .hn-header {
            padding: 10px 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #ddd;
            position: sticky;
            top: 0;
            background: #fff;
            z-index: 100;
        }
        .hn-nav {
            width: 100%;
            max-width: 1200px;
            display: flex;
            align-items: center;
            justify-content: space-between;
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
        .hn-site-title { display: none; }
        .hn-nav-links {
            display: flex;
            gap: 20px;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .hn-nav-links a {
            color: #5f6368;
            text-decoration: none;
            font-size: 14px;
        }
        .hn-nav-links a:hover {
            color: #202124;
            text-decoration: underline;
        }
        .hn-auth a {
            color: #fff;
            background: var(--g-blue);
            padding: 8px 16px;
            border-radius: 4px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
        }

        .hn-main { max-width: 800px; margin: 30px 160px; flex: 1; }
        @media (max-width: 768px) {
            .hn-main { margin: 20px 10px; }
        }
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
        .hn-footer {
            background: #f2f2f2;
            padding: 20px 30px;
            border-top: 1px solid #dadce0;
            font-size: 14px;
        }
        .hn-footer-links {
            display: flex;
            gap: 27px;
            list-style: none;
        }
        .hn-footer-links a {
            color: #70757a;
            text-decoration: none;
        }
        .hn-footer-links a:hover {
            text-decoration: underline;
        }
    `,

    "Universal": `
        :root {
            --s-blue: #034EA2;
            --s-gray: #f4f4f4;

            /* Mapping */
            --bg: #fff;
            --card: var(--s-gray);
            --text: #000;
            --subtext: #666;
            --accent: var(--s-blue);
        }
        body {
            background: #fff;
            color: #000;
            font-family: sans-serif;
            margin: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        .hn-header {
            padding: 20px 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid #ddd;
            position: sticky;
            top: 0;
            background: #fff;
            z-index: 100;
        }
        .hn-nav {
            width: 100%;
            max-width: 1400px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .hn-logo {
            font-size: 40px;
            font-weight: 700;
            color: #000;
            text-decoration: none;
            letter-spacing: -2px;
        }
        .hn-site-title { display: none; }
        .hn-nav-links { 
            display: flex; 
            gap: 40px; 
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .hn-nav-links a { color: #000; font-weight: 600; text-decoration: none; font-size: 18px; }
        .hn-auth a {
            color: #000;
            text-decoration: none;
            font-weight: 600;
            font-size: 18px;
            border: 2px solid #000;
            padding: 8px 24px;
            border-radius: 100px;
            transition: 0.2s;
        }
        .hn-auth a:hover { background: #000; color: #fff; }
        
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
        .hn-footer {
            background: #000;
            color: #fff;
            padding: 100px 60px;
            text-align: left;
        }
        .hn-footer-links {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 40px;
            margin-bottom: 80px;
            list-style: none;
        }
        .hn-footer-links a {
            color: #fff;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
        }
        .hn-footer-links a:hover {
            opacity: 0.7;
        }
        .hn-load-more {
            background: #000;
            color: #fff;
            border: none;
            padding: 20px 80px;
            border-radius: 100px;
            font-size: 20px;
            font-weight: 700;
            margin: 60px auto;
            display: block;
            cursor: pointer;
            transition: 0.2s;
        }
        .hn-load-more:hover { transform: scale(1.05); }
        .hn-load-more:active { transform: scale(0.95); }
    `,

    "Intelligence": `
        :root {
            --bg: #0d0d0d;
            --card: #171717;
            --accent: #10a37f;
            --text: #ececec;
            --subtext: #b4b4b4;
        }
        body {
            background: var(--bg);
            color: var(--text);
            font-family: ui-sans-serif, -apple-system, system-ui, sans-serif;
            margin: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            -webkit-font-smoothing: antialiased;
        }
        .hn-header {
            background: rgba(13, 13, 13, 0.8);
            backdrop-filter: blur(10px);
            padding: 0 20px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        .hn-nav {
            width: 100%;
            max-width: 800px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .hn-logo {
            font-size: 20px;
            font-weight: 600;
            color: var(--text);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .hn-logo::before {
            content: "";
            width: 24px;
            height: 24px;
            background: var(--accent);
            border-radius: 50%;
            display: inline-block;
        }
        .hn-site-title { display: none; }
        .hn-nav-links { display: flex; gap: 20px; }
        .hn-nav-links a {
            color: var(--subtext);
            text-decoration: none;
            font-size: 14px;
            transition: color 0.2s;
        }
        .hn-nav-links a:hover { color: var(--text); }
        .hn-auth a {
            background: var(--accent);
            color: white;
            padding: 6px 12px;
            border-radius: 8px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
        }

        .hn-main {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            flex: 1;
        }
        .hn-story-list { display: flex; flex-direction: column; gap: 16px; }
        .hn-story-item {
            background: var(--card);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            padding: 24px;
            display: flex;
            gap: 20px;
            transition: border-color 0.2s;
        }
        .hn-story-item:hover { border-color: var(--accent); }
        .hn-story-rank { font-size: 14px; color: var(--subtext); width: 20px; }
        .hn-story-title { font-size: 16px; font-weight: 500; color: var(--text); text-decoration: none; line-height: 1.5; }
        .hn-story-meta { color: var(--subtext); font-size: 13px; margin-top: 8px; }
        .hn-upvote {
            background: none;
            border: 1px solid rgba(255,255,255,0.1);
            color: var(--subtext);
            padding: 4px 8px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
        }
        .hn-upvote:hover { border-color: var(--accent); color: var(--accent); }

        .hn-load-more {
            background: transparent;
            color: var(--text);
            border: 1px solid rgba(255,255,255,0.1);
            padding: 10px 20px;
            border-radius: 10px;
            margin: 40px auto;
            display: block;
            cursor: pointer;
        }
        .hn-load-more:hover { background: var(--card); }

        .hn-footer {
            padding: 60px 20px;
            text-align: center;
            border-top: 1px solid rgba(255,255,255,0.05);
            color: var(--subtext);
            font-size: 12px;
        }
        .hn-footer-links { display: flex; justify-content: center; gap: 20px; margin-bottom: 20px; list-style: none; }
        .hn-footer-links a { color: var(--subtext); text-decoration: none; }
        .hn-footer::after {
            content: "Shaping the future of Intelligence.";
            display: block;
            margin-top: 20px;
            font-style: italic;
        }
    `
};

const COMMON_STYLE = `
    ul, ol { list-style: none; padding: 0; margin: 0; }
    button { font-family: inherit; }
    * { box-sizing: border-box; }

    /* View Transition Configuration */
    ::view-transition-old(root),
    ::view-transition-new(root) {
        animation-duration: 0.8s;
        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }

    .hn-header { view-transition-name: main-header; }
    .hn-logo { view-transition-name: main-logo; }
    .hn-main { view-transition-name: main-content; }
    .hn-footer { view-transition-name: main-footer; }
    .hn-story-list { view-transition-name: story-list; }
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
        border: 1px solid;
        max-width: 350px;

        /* Dynamic Theme Colors */
        background: color-mix(in srgb, var(--card, #ffffff) 75%, transparent);
        color: var(--text, #333);
        border-color: var(--subtext, #ddd);
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        transition: background 0.3s, color 0.3s, border-color 0.3s, box-shadow 0.3s;
    }
    #theme-controls input {
        background: var(--bg, #fff);
        color: var(--text, #000);
        border: 1px solid var(--subtext, #ccc);
    }
    #theme-controls button {
        background: var(--bg, #f0f0f0);
        color: var(--text, #555);
        border-color: var(--subtext, #ddd);
    }
    #theme-controls #generate-btn {
        background: var(--accent, #007aff);
        color: #fff;
        border: none;
    }

    /* Responsive & Mobile Menu */
    .hn-menu-toggle {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 10px;
        z-index: 1001;
        width: 44px;
        height: 44px;
        position: relative;
        color: inherit;
    }
    .hn-menu-toggle span {
        display: block;
        width: 24px;
        height: 2px;
        background: currentColor;
        margin: 5px auto;
        transition: 0.3s;
    }

    @media (max-width: 768px) {
        .hn-menu-toggle { display: block; order: 999; } /* Push to right */
        
        .hn-nav-links {
            display: none !important; /* Specificity Fix */
            flex-direction: column;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(20, 20, 20, 0.85); /* Dark semi-transparent fallback */
            background: var(--bg, rgba(255, 255, 255, 0.95)); /* Use theme bg if available, else light */
            padding: 140px 20px 60px !important;
            z-index: 1000;
            text-align: center;
            backdrop-filter: saturate(180%) blur(20px);
            -webkit-backdrop-filter: saturate(180%) blur(20px);
            overflow-y: auto;
            transition: opacity 0.3s, transform 0.3s;
        }
        /* Ensure text contrast on overlay */
        @media (prefers-color-scheme: dark) {
             .hn-nav-links { background: var(--bg, rgba(20, 20, 20, 0.9)); }
        }
        .hn-nav-links.is-open { display: flex !important; }
        
        .hn-nav-links li { margin-bottom: 25px; }
        .hn-nav-links a { font-size: 28px !important; font-weight: 300 !important; }
        
        .hn-auth { display: none; }

        .hn-header { padding: 0 15px !important; height: 60px !important; }
        .hn-main { padding: 30px 15px !important; }
        
        .hn-story-item { 
            padding: 15px !important; 
            gap: 12px !important; 
            border-radius: 16px !important;
            flex-direction: row !important;
            align-items: flex-start !important;
        }
        .hn-story-rank { display: none; }
        .hn-story-title { font-size: 17px !important; line-height: 1.3 !important; }
        .hn-upvote { 
            order: -1;
            width: 32px !important; 
            height: 32px !important; 
            margin-top: 2px !important; 
            align-self: flex-start !important;
            border-radius: 8px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            flex-shrink: 0;
            background: var(--mobile-upvote-bg, rgba(0,0,0,0.05)) !important;
            border: var(--mobile-upvote-border, none) !important;
            color: var(--mobile-upvote-color, inherit) !important;
            opacity: 0.8;
            font-size: 10px !important;
        }
        
        /* Vertical Footer */
        .hn-footer-links {
            flex-direction: column !important;
            gap: 15px !important;
        }
        
        #theme-controls {
            bottom: 20px !important;
            right: 20px !important;
            width: auto !important;
            max-width: calc(100vw - 40px) !important;
            border-radius: 12px !important;
            padding: 15px !important;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15) !important;
        }
        #presets-toggle { margin-bottom: 2px !important; }
        #preset-buttons { margin-bottom: 8px !important; overflow-x: auto; white-space: nowrap; padding-bottom: 5px; width: 100%; }
        #prompt-input { padding: 6px 12px !important; }
        #preset-buttons::-webkit-scrollbar { display: none; }

        /* Menu Icon Open State */
        .is-open-active .hn-menu-toggle span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .is-open-active .hn-menu-toggle span:nth-child(2) { opacity: 0; }
        .is-open-active .hn-menu-toggle span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    }

    /* Differentiable Transition Smoothing */
    body {
        transition: background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                    color 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Collapsible Presets */
    #preset-buttons {
        max-height: 300px;
        opacity: 1;
        transition: max-height 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), 
                    opacity 0.4s ease,
                    margin 0.4s ease;
    }
    #preset-buttons.is-collapsed {
        max-height: 0 !important;
        opacity: 0 !important;
        margin-bottom: 0 !important;
        pointer-events: none;
    }
    #presets-icon {
        display: inline-block;
        transition: transform 0.3s ease;
    }
    .is-collapsed-icon #presets-icon {
        transform: rotate(-90deg);
    }
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
        header: document.querySelector('.hn-header')
    },

    async init() {
        this.renderPresetButtons();
        this.bindEvents();
        console.log("Generative UI - Differentiable Transitions Enabled.");
        
        // Initial style
        this.applyStyle(STYLE_PRESETS["Minimalist"], "Minimalist (Initial)");

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
                color: #555;
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

        // Fallback for browsers that don't support View Transition API
        if (!document.startViewTransition) {
            this.elements.styleTag.textContent = COMMON_STYLE + css;
            return;
        }

        // Smooth transition using View Transition API
        document.startViewTransition(() => {
            this.elements.styleTag.textContent = COMMON_STYLE + css;
        });
    },

    showError() {
        const available = Object.keys(STYLE_PRESETS).join('", "');
        alert(`Please enter a supported theme:\n"${available}"`);
    }
};

// Start the application
document.addEventListener('DOMContentLoaded', () => App.init());
