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
            margin-bottom: 40px;
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
            margin-bottom: 40px;
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
            margin-bottom: 40px;
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
            margin-bottom: 40px;
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
    `,

    "Nintendo": `
        :root {
            --n-red: #e60012;
            --n-gray: #8c8c8c;
            --n-white: #ffffff;
            --n-black: #2b2b2b;
        }
        body {
            background-color: var(--n-red);
            color: var(--n-black);
            font-family: 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif;
            margin: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        .hn-header {
            background: var(--n-white);
            padding: 15px 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 8px solid var(--n-black);
        }
        .hn-logo {
            background: var(--n-red);
            color: white;
            padding: 10px 25px;
            border-radius: 50px;
            font-weight: 900;
            font-size: 24px;
            text-decoration: none;
            border: 4px solid var(--n-black);
        }
        .hn-site-title { font-weight: 900; font-size: 28px; color: var(--n-red); text-transform: uppercase; letter-spacing: -1px; }
        .hn-nav-links { list-style: none; display: flex; gap: 20px; }
        .hn-nav-links a { font-weight: 700; text-decoration: none; color: var(--n-black); font-size: 14px; background: #eee; padding: 5px 15px; border-radius: 20px; border: 2px solid var(--n-black); }
        
        .hn-main { max-width: 1000px; margin: 30px auto; padding: 30px; background: var(--n-white); border: 6px solid var(--n-black); border-radius: 40px; flex: 1; width: 100%; box-sizing: border-box; box-shadow: 20px 20px 0 var(--n-black); }
        .hn-story-item {
            background: var(--n-white);
            padding: 20px;
            border: 4px solid #eee;
            border-radius: 20px;
            margin-bottom: 20px;
            display: flex;
            gap: 20px;
            transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .hn-story-item:hover { transform: scale(1.02); border-color: var(--n-red); }
        .hn-story-rank { font-weight: 900; font-size: 24px; color: var(--n-red); }
        .hn-upvote { background: var(--n-red); color: white; border: 3px solid var(--n-black); border-radius: 10px; cursor: pointer; padding: 5px 10px; font-weight: bold; }
        .hn-story-title { font-size: 20px; font-weight: 900; color: var(--n-black); text-decoration: none; }
        .hn-story-meta { font-size: 14px; color: var(--n-gray); margin-top: 10px; }
        .hn-load-more {
            background: var(--n-red);
            color: white;
            padding: 20px;
            border-radius: 50px;
            font-weight: 900;
            border: 6px solid var(--n-black);
            cursor: pointer;
            width: 100%;
            font-size: 24px;
            text-transform: uppercase;
            box-shadow: 0 8px 0 var(--n-black);
            transition: 0.1s;
        }
        .hn-load-more:active { transform: translateY(4px); box-shadow: 0 4px 0 var(--n-black); }

        .hn-footer { padding: 40px; background: var(--n-black); color: white; text-align: center; }
        .hn-footer-links a { color: white; font-weight: 700; margin: 0 15px; text-decoration: none; }
    `,

    "SONY": `
        :root {
            --s-ps-blue: #003087;
            --s-ps-white: #f5f7fa;
            --s-ps-black: #0a0a0a;
            --s-glow: rgba(0, 112, 255, 0.5);
        }
        body {
            background-color: var(--s-ps-black);
            color: var(--s-ps-white);
            font-family: 'SST', 'Helvetica Neue', Arial, sans-serif;
            margin: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background-image: radial-gradient(circle at top right, #1a1a2e, #0a0a0a);
        }
        .hn-header {
            background: rgba(10, 10, 10, 0.8);
            backdrop-filter: blur(20px);
            padding: 20px 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid rgba(255,255,255,0.1);
        }
        .hn-logo {
            font-weight: 100;
            font-size: 32px;
            color: white;
            letter-spacing: 5px;
            text-decoration: none;
            text-transform: uppercase;
        }
        .hn-nav-links a { color: rgba(255,255,255,0.6); text-decoration: none; margin-left: 30px; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; transition: 0.3s; }
        .hn-nav-links a:hover { color: white; text-shadow: 0 0 10px var(--s-glow); }
        
        .hn-main { max-width: 1100px; margin: 50px auto; flex: 1; width: 100%; box-sizing: border-box; }
        .hn-story-item {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.05);
            padding: 30px;
            border-radius: 4px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 30px;
            transition: 0.4s cubic-bezier(0.23, 1, 0.32, 1);
            position: relative;
            overflow: hidden;
        }
        .hn-story-item::before { content: ""; position: absolute; left: 0; top: 0; width: 4px; height: 100%; background: var(--s-ps-blue); opacity: 0; transition: 0.3s; }
        .hn-story-item:hover { background: rgba(255,255,255,0.08); transform: translateX(10px); }
        .hn-story-item:hover::before { opacity: 1; box-shadow: 0 0 15px var(--s-ps-blue); }
        .hn-story-rank { font-size: 14px; opacity: 0.3; font-weight: 100; width: 30px; }
        .hn-story-title { font-size: 22px; font-weight: 300; color: white; text-decoration: none; letter-spacing: 0.5px; }
        .hn-story-meta { color: rgba(255,255,255,0.4); margin-top: 8px; font-size: 12px; }
        .hn-upvote { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: white; padding: 10px; border-radius: 50%; cursor: pointer; transition: 0.3s; }
        .hn-upvote:hover { border-color: var(--s-ps-blue); background: var(--s-ps-blue); }
        .hn-load-more {
            background: white;
            color: black;
            padding: 20px;
            border-radius: 100px;
            font-weight: 900;
            border: none;
            cursor: pointer;
            width: 100%;
            margin-top: 50px;
            margin-bottom: 80px;
            text-transform: uppercase;
            letter-spacing: 4px;
            transition: 0.3s;
        }
        .hn-load-more:hover { transform: scale(1.02); box-shadow: 0 0 30px rgba(255,255,255,0.2); }

        .hn-footer { padding: 80px; background: #000; border-top: 1px solid rgba(255,255,255,0.05); text-align: center; }
        .hn-footer-links a { color: rgba(255,255,255,0.3); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 20px; text-decoration: none; }
    `,

    "OpenAI": `
        :root {
            --o-green: #10a37f;
            --o-black: #202123;
            --o-gray: #343541;
            --o-white: #ffffff;
        }
        body {
            background-color: var(--o-black);
            color: #ececf1;
            font-family: 'Söhne', 'Helvetica Neue', Arial, sans-serif;
            margin: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        .hn-header {
            background: var(--o-black);
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .hn-logo {
            width: 32px;
            height: 32px;
            background: var(--o-green);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 2px;
            font-weight: bold;
            text-decoration: none;
        }
        .hn-nav-links a { color: #8e8ea0; text-decoration: none; margin-left: 20px; font-size: 14px; }
        
        .hn-main { max-width: 800px; margin: 0 auto; flex: 1; width: 100%; box-sizing: border-box; }
        .hn-story-item {
            padding: 24px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            display: flex;
            gap: 20px;
            transition: background 0.2s;
        }
        .hn-story-item:hover { background: var(--o-gray); }
        .hn-story-rank { font-family: monospace; opacity: 0.5; }
        .hn-story-title { font-size: 18px; font-weight: 400; color: white; text-decoration: none; line-height: 1.5; }
        .hn-story-meta { color: #8e8ea0; font-size: 13px; margin-top: 10px; font-family: monospace; }
        .hn-upvote { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #8e8ea0; border-radius: 4px; cursor: pointer; }
        .hn-upvote:hover { background: var(--o-green); color: white; border-color: var(--o-green); }
        .hn-load-more {
            margin: 40px auto;
            display: block;
            background: transparent;
            border: 1px solid rgba(255,255,255,0.2);
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
            cursor: pointer;
            font-family: inherit;
        }
        .hn-load-more:hover { background: rgba(255,255,255,0.1); }

        .hn-footer { padding: 40px; color: #8e8ea0; font-size: 12px; text-align: center; font-family: monospace; }
        .hn-footer-links a { color: #8e8ea0; text-decoration: none; margin: 0 10px; }
    `,

    "Anthropic": `
        :root {
            --a-bg: #f9f6f1;
            --a-text: #1a1a1a;
            --a-accent: #d97757;
            --a-serif: 'Ibarra Real Nova', serif;
        }
        body {
            background-color: var(--a-bg);
            color: var(--a-text);
            font-family: 'Inter', sans-serif;
            margin: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        .hn-header {
            padding: 30px 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .hn-logo {
            font-family: var(--a-serif);
            font-size: 28px;
            font-weight: 700;
            color: var(--a-text);
            text-decoration: none;
            letter-spacing: -1px;
        }
        .hn-nav-links a { color: var(--a-text); font-weight: 500; text-decoration: none; margin-left: 30px; font-size: 15px; border-bottom: 1px solid transparent; }
        .hn-nav-links a:hover { border-bottom-color: var(--a-accent); }
        
        .hn-main { max-width: 700px; margin: 0 auto; flex: 1; width: 100%; box-sizing: border-box; }
        .hn-story-item {
            padding: 40px 0;
            border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .hn-story-title { font-family: var(--a-serif); font-size: 24px; font-weight: 600; color: var(--a-text); text-decoration: none; line-height: 1.3; }
        .hn-story-domain { font-size: 14px; color: var(--a-accent); font-weight: 600; margin-left: 10px; }
        .hn-story-meta { color: #777; font-size: 14px; margin-top: 15px; font-style: italic; }
        .hn-story-rank { display: none; }
        .hn-upvote { background: none; border: 1px solid #ddd; border-radius: 50%; width: 32px; height: 32px; color: #999; cursor: pointer; margin-right: 15px; }
        .hn-load-more {
            margin: 60px auto;
            display: block;
            background: var(--a-text);
            color: var(--a-bg);
            padding: 16px 40px;
            border-radius: 100px;
            font-weight: 600;
            border: none;
            cursor: pointer;
        }

        .hn-footer { padding: 60px; color: #999; font-size: 14px; text-align: center; }
        .hn-footer-links a { color: #999; text-decoration: none; margin: 0 15px; }
    `,

    "Anker": `
        :root {
            --an-blue: #00a0e9;
            --an-dark: #1a1a1a;
            --an-white: #ffffff;
            --an-gray: #f2f2f2;
        }
        body {
            background-color: var(--an-white);
            color: var(--an-dark);
            font-family: 'Metropolis', 'Helvetica Neue', Arial, sans-serif;
            margin: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        .hn-header {
            background: var(--an-dark);
            color: white;
            padding: 20px 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .hn-logo {
            font-weight: 900;
            font-size: 24px;
            color: var(--an-blue);
            text-transform: uppercase;
            text-decoration: none;
            letter-spacing: 2px;
        }
        .hn-nav-links a { color: white; text-decoration: none; margin-left: 25px; font-size: 13px; font-weight: 600; }
        
        .hn-main { max-width: 1200px; margin: 0 auto; padding: 40px; flex: 1; width: 100%; box-sizing: border-box; }
        .hn-story-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .hn-story-item {
            background: var(--an-gray);
            padding: 25px;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            gap: 15px;
            border-bottom: 4px solid #ddd;
            transition: 0.3s;
        }
        .hn-story-item:hover { border-bottom-color: var(--an-blue); transform: translateY(-5px); }
        .hn-story-title { font-size: 18px; font-weight: 700; color: var(--an-dark); text-decoration: none; line-height: 1.4; height: 3em; overflow: hidden; }
        .hn-story-meta { font-size: 12px; color: #666; display: flex; align-items: center; gap: 10px; border-top: 1px solid #ddd; padding-top: 15px; }
        .hn-upvote { background: var(--an-blue); color: white; border: none; border-radius: 4px; padding: 5px 10px; font-size: 10px; cursor: pointer; font-weight: 900; }
        .hn-load-more {
            grid-column: 1 / -1;
            background: var(--an-blue);
            color: white;
            padding: 15px;
            border-radius: 4px;
            font-weight: 700;
            border: none;
            cursor: pointer;
            margin-top: 30px;
            text-transform: uppercase;
        }

        .hn-footer { background: var(--an-dark); color: white; padding: 60px 40px; text-align: left; }
        .hn-footer-links { display: flex; gap: 30px; list-style: none; padding: 0; }
        .hn-footer-links a { color: #888; text-decoration: none; font-size: 12px; }
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
        console.log("Generative UI - More Stories Mode Initialized.");
        
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
            const domainHtml = domain ? `<a href="${story.url}" class="hn-story-domain" target="_blank">(${domain})</a>` : '';
            const timeAgo = HNData.formatTime(story.time);

            const listItem = document.createElement('li');
            listItem.className = 'hn-story-item';
            listItem.innerHTML = `
                <div class="hn-story-rank">${rank}.</div>
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
        const available = Object.keys(STYLE_PRESETS).join('」「');
        alert(`対応しているブランドを入力してください：\n「${available}」`);
    }
};

// Start the application
document.addEventListener('DOMContentLoaded', () => App.init());
