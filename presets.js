/**
 * Acephale OS | Presets.js
 * Theme definitions for the Hacker News interface.
 * Add new themes here by extending STYLE_PRESETS.
 */

/**
 * Themes
 * Define variables and minimal specific overrides.
 */
const STYLE_PRESETS = {
    "None": "",

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
        #theme-controls #generate-btn, #theme-controls #paste-css-apply-btn { background: var(--accent) !important; }
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
        #theme-controls #generate-btn, #theme-controls #paste-css-apply-btn { background: var(--accent) !important; color: #fff !important; }
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
        #theme-controls #generate-btn, #theme-controls #paste-css-apply-btn { background: var(--red) !important; }
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
        #theme-controls #generate-btn, #theme-controls #paste-css-apply-btn { background: var(--accent) !important; color: #fff !important; }
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
        #theme-controls #generate-btn, #theme-controls #paste-css-apply-btn { background: var(--accent) !important; color: #fff !important; }
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
        #theme-controls #generate-btn, #theme-controls #paste-css-apply-btn { background: var(--accent) !important; color: #fff !important; }
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
        #theme-controls #generate-btn, #theme-controls #paste-css-apply-btn { background: var(--accent) !important; color: #fff !important; }
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
        #theme-controls #generate-btn, #theme-controls #paste-css-apply-btn { background: var(--accent) !important; color: #fff !important; }
    `,

    "Washi": `
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
        #theme-controls #generate-btn, #theme-controls #paste-css-apply-btn { background: var(--accent) !important; color: #fff !important; }
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
        #theme-controls #generate-btn, #theme-controls #paste-css-apply-btn { background: #ff00ff !important; color: #fff !important; border-radius: 0 !important; }
    `,

    "Circuit": `
        :root {
            --bg: #0d1a12;
            --card-bg: #15291d;
            --text: #e2f0e7;
            --subtext: #82a88e;
            --accent: #d81159;
            --header-bg: #070d09;
            --header-border: 2px solid #1a3825;
            --header-height: 60px;
            --font-main: "SF Mono", "Consolas", "Courier New", monospace;
            --item-radius: 2px;
            --item-border: 1px solid #21402c;
            --item-shadow: 4px 4px 0 #000000;
            --item-transition: all 0.1s steps(2, end);
            --story-gap: 20px;
            --title-size: 15px;
            --upvote-size: 36px;
            --load-more-radius: 0px;
            --more-btn-bg: #d81159;
            --more-btn-color: #ffffff;
            --mobile-upvote-bg: #000000;
            --mobile-upvote-color: #ffd700;
        }

        body {
            background: var(--bg);
            color: var(--text);
            font-family: var(--font-main);
            margin: 0;
            padding: 0;
            min-height: 100vh;
        }

        @keyframes pcb-scan {
            0% { transform: translateY(-100%); opacity: 0; }
            10% { opacity: 0.5; }
            90% { opacity: 0.5; }
            100% { transform: translateY(100vh); opacity: 0; }
        }

        @keyframes led-blink {
            0%, 100% { background-color: #550522; box-shadow: none; }
            50% { background-color: var(--accent); box-shadow: 0 0 12px var(--accent), inset 0 0 4px #ff6b9e; }
        }

        body::before {
            content: "";
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            z-index: -1;
            background-image:
                linear-gradient(rgba(33, 64, 44, 0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(33, 64, 44, 0.4) 1px, transparent 1px);
            background-size: 20px 20px;
        }

        body::after {
            content: "";
            position: fixed;
            top: 0; left: 0;
            width: 100%;
            height: 4px;
            background: var(--accent);
            z-index: 99;
            animation: pcb-scan 6s linear infinite;
            pointer-events: none;
        }

        .hn-header {
            height: var(--header-height);
            background: var(--header-bg);
            border-bottom: var(--header-border);
            display: flex;
            align-items: center;
            padding: 0 24px;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.8);
            background-image: repeating-linear-gradient(
                90deg,
                transparent,
                transparent 10px,
                rgba(21, 41, 29, 0.8) 10px,
                rgba(21, 41, 29, 0.8) 20px
            );
        }

        .hn-logo {
            width: 24px;
            height: 24px;
            background: var(--accent);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 14px;
            margin-right: 32px;
            border-radius: 50%;
            border: 2px solid #2b0311;
            animation: led-blink 1.5s infinite step-end;
            position: relative;
        }

        .hn-logo::after {
            content: "PWR";
            position: absolute;
            top: 28px;
            font-size: 10px;
            color: #82a88e;
            letter-spacing: 1px;
        }

        .hn-story-list {
            list-style: none;
            padding: 24px;
            margin: 0 auto;
            max-width: 800px;
            display: grid;
            gap: var(--story-gap);
            border-left: 4px solid #1a3825;
        }

        .hn-story-item {
            background: var(--card-bg);
            border: var(--item-border);
            border-radius: var(--item-radius);
            box-shadow: var(--item-shadow);
            padding: 16px;
            display: grid;
            grid-template-columns: var(--upvote-size) 1fr;
            gap: 16px;
            position: relative;
            transition: var(--item-transition);
            margin-left: 12px;
        }

        .hn-story-item::before {
            content: "";
            position: absolute;
            left: -16px;
            top: 50%;
            transform: translateY(-50%);
            width: 16px;
            height: 12px;
            background: #ffd700;
            border: 1px solid #b89600;
            border-right: none;
            border-radius: 2px 0 0 2px;
            box-shadow: 0 2px 0 rgba(0, 0, 0, 0.5);
            transition: var(--item-transition);
        }

        .hn-story-item:hover {
            transform: translate(4px, 4px);
            box-shadow: 0 0 0 #000000;
            border-color: #ffd700;
            background: #1a3324;
        }

        .hn-story-item:hover::before {
            background: var(--accent);
            border-color: #8a0b39;
        }

        .hn-story-rank {
            position: absolute;
            top: -12px;
            right: -12px;
            background: #070d09;
            color: #ffd700;
            font-size: 11px;
            padding: 4px 8px;
            border: 2px solid #ffd700;
            box-shadow: 2px 2px 0 #000000;
        }

        .hn-upvote {
            width: var(--upvote-size);
            height: var(--upvote-size);
            background: #070d09;
            border: 2px solid #21402c;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--subtext);
            cursor: pointer;
            transition: var(--item-transition);
        }

        .hn-upvote::after {
            content: "";
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-bottom: 8px solid currentColor;
            margin-bottom: 2px;
        }

        .hn-story-item:hover .hn-upvote {
            border-color: #ffd700;
            color: #ffd700;
            box-shadow: inset 0 0 8px rgba(255, 215, 0, 0.3);
        }

        .hn-story-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .hn-story-title {
            font-size: var(--title-size);
            color: var(--text);
            text-decoration: none;
            font-weight: 600;
            margin-bottom: 8px;
            display: block;
        }

        .hn-story-item:hover .hn-story-title {
            color: #ffd700;
            text-shadow: 0 0 4px rgba(255, 215, 0, 0.4);
        }

        .hn-story-meta {
            font-size: 12px;
            color: var(--subtext);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        #theme-controls #generate-btn, #theme-controls #paste-css-apply-btn { background: #d81159 !important; color: #fff !important; }
    `,

    "Aubergine": `
        /* world: UNITY DESKTOP — Aubergine × Ubuntu Orange (E95420) */
        :root {
            --bg: #2c001e;
            --card-bg: #3b0028;
            --text: #f7f7f7;
            --subtext: #aea79f;
            --accent: #e95420;
            --header-bg: #300a24;
            --header-border: 3px solid #e95420;
            --header-height: 52px;
            --font-main: system-ui, 'Segoe UI', sans-serif;
            --item-radius: 18px;
            --item-border: 1px solid rgba(233,84,32,0.18);
            --item-shadow: 0 4px 20px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04);
            --story-gap: 22px;
            --title-size: 16px;
            --upvote-size: 38px;
            --load-more-radius: 100px;
            --item-transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s;
            --more-btn-bg: #e95420;
            --more-btn-color: #fff;
            --mobile-upvote-bg: #e95420;
            --mobile-upvote-color: #fff;
        }

        /* ── Atmosphere: aubergine with orange warmth ── */
        body {
            background:
                radial-gradient(ellipse 55% 35% at 12% 3%, rgba(233,84,32,0.14) 0%, transparent 60%),
                radial-gradient(ellipse 45% 55% at 88% 97%, rgba(77,0,52,0.7) 0%, transparent 55%),
                var(--bg);
        }

        /* ── Header: Unity panel style ── */
        .hn-header {
            background: linear-gradient(180deg, #3e1028 0%, #300a24 100%);
            backdrop-filter: none;
            border-bottom: 3px solid #e95420;
            box-shadow: 0 3px 28px rgba(233,84,32,0.28);
        }

        /* ── Logo: orange circle mark ── */
        .hn-logo {
            background: #e95420;
            color: #fff;
            border-radius: 50%;
            width: 34px;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 17px;
            box-shadow: 0 0 0 2px rgba(233,84,32,0.35), 0 2px 14px rgba(233,84,32,0.5);
            transition: box-shadow 0.35s cubic-bezier(0.34,1.56,0.64,1), transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .hn-logo:hover {
            transform: scale(1.15);
            box-shadow: 0 0 0 5px rgba(233,84,32,0.38), 0 0 32px rgba(233,84,32,0.65);
        }

        .hn-nav-links a:hover, .hn-auth a:hover { color: #e95420; opacity: 1; }

        /* ── Story grid ── */
        .hn-story-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
            gap: var(--story-gap);
        }

        /* ── Cards: dark notification panels ── */
        .hn-story-item {
            background: linear-gradient(145deg, #3e0a2c 0%, #2e001f 100%);
            border: 1px solid rgba(233,84,32,0.18);
            border-radius: 18px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04);
            padding: 22px 18px 18px 20px;
            position: relative;
            overflow: visible;
        }
        /* Top-edge spotlight line */
        .hn-story-item::before {
            content: '';
            position: absolute;
            top: 0; left: 14px; right: 14px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #e95420, transparent);
            border-radius: 2px;
            opacity: 0;
            transition: opacity 0.3s;
        }
        .hn-story-item:hover {
            transform: translateY(-9px) scale(1.015);
            border-color: rgba(233,84,32,0.55);
            box-shadow: 0 22px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(233,84,32,0.3), inset 0 1px 0 rgba(255,255,255,0.07);
        }
        .hn-story-item:hover::before { opacity: 1; }

        /* ── Rank: floating orange pill ── */
        .hn-story-rank {
            position: absolute;
            top: -13px;
            left: 14px;
            background: #e95420;
            color: #fff;
            font-weight: 700;
            font-size: 12px;
            padding: 3px 11px;
            border-radius: 100px;
            box-shadow: 0 3px 12px rgba(233,84,32,0.55);
            width: auto;
        }

        /* ── Upvote: orange circle with spring pop ── */
        .hn-upvote {
            background: transparent;
            border: 2px solid rgba(233,84,32,0.45);
            border-radius: 50%;
            color: #e95420;
            width: 38px;
            height: 38px;
            opacity: 1;
            font-size: 14px;
            transition: all 0.28s cubic-bezier(0.34,1.56,0.64,1);
        }
        .hn-upvote:hover {
            background: #e95420;
            color: #fff;
            border-color: #e95420;
            transform: scale(1.25);
            box-shadow: 0 0 20px rgba(233,84,32,0.6);
            opacity: 1;
        }

        /* ── Footer ── */
        .hn-footer {
            background: #1c0013;
            border-top: 2px solid rgba(233,84,32,0.18);
        }

        /* ── Controls ── */
        #theme-controls #generate-btn, #theme-controls #paste-css-apply-btn { background: #e95420 !important; color: #fff !important; }
    `
};
