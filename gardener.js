/**
 * Acephale OS | Gardener.js
 * Hacker News Interface Styling & Data Fetching
 */

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

const GEMINI_SYSTEM_PROMPT = `You are a CSS world-builder for a Hacker News reader app.
Output ONLY raw CSS. No explanations, markdown, code fences, or comments.
Begin with /* world: NAME */ on the first line.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WORLD-BUILDING MANDATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You are not changing colors. You are creating a complete universe.
Every world must have ALL FOUR of these dimensions:

  ① LAYOUT      — structure of the story list (grid? columns? magazine?)
  ② INTERACTION — what happens on hover (not just color: tilt, spring, press, glow, skew...)
  ③ ATMOSPHERE  — ambient world effect (overlay, animated bg, texture, pattern, body::before)
  ④ IDENTITY    — header + logo that could only belong to this world

Producing only color + font changes = FAILURE. The layout must shift. Something must animate.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTRAST LAW (mandatory)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DARK bg  → --text:#e0e0e0+  --subtext:#aaa+  --card-bg noticeably lighter
LIGHT bg → --text:#1a1a1a   --subtext:#666   --card-bg noticeably darker
WRONG: --bg:#1a1a3e + --text:#2a2a7e  (both dark, unreadable)
RIGHT: --bg:#1a1a3e + --text:#eeeeff  (dark bg → near-white text)
Buttons: --more-btn-color vs --more-btn-bg = light-on-dark or dark-on-light.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WORLDS — pick one, apply its complete interaction model
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TERMINAL
  Layout:  default vertical list, dense gap (--story-gap:8px), 0px radius
  Hover:   border flashes to accent instantly (transition:border-color 0.05s steps(1))
  Atm:     body::before scanline · .hn-logo blinks (@keyframes blink) or glows
  Identity: monospace font · phosphor green/amber/cyan · header= solid dark bar

BRUTALIST
  Layout:  0px radius · 5-6px solid black borders · hard offset box-shadow (no blur)
           .hn-story-item:hover { transform:translate(-4px,-4px); box-shadow:<bigger offset>; }
  Hover:   press-down effect (translate in shadow direction, shadow shrinks)
  Atm:     body{text-transform:uppercase} · stark flat header, no blur anywhere
  Identity: Impact/condensed font · max 3 colors · masthead-style header

EDITORIAL
  Layout:  0px radius · no card borders · 50px+ vertical padding · separator lines only
           --story-gap:0 · .hn-story-item{border:none;border-bottom:1px solid} · --title-size:28px+
  Hover:   .hn-story-title slides left (padding-left grows) or accent color only — NO lift
  Atm:     warm paper bg · fine hairlines · body font-size slightly larger · spacious
  Identity: Georgia/serif · subdued accent · newspaper masthead header

PLAYFUL
  Layout:  display:grid, minmax(280-320px,1fr) · 28-40px radius · thick colored borders (5-6px)
           float rank badge (position:absolute top:-14px) · --upvote-size:50px
  Hover:   spring physics: cubic-bezier(0.34,1.56,0.64,1) · translateY(-12px) · shadow grows
  Atm:     bright solid bg · 2-3 vivid colors · colorful header stripe
  Identity: rounded font · logo pill (border-radius:100px, border, box-shadow:4px 4px 0)

NEON / CYBERPUNK
  Layout:  list · subtle glow border on cards · 4-8px radius
  Hover:   glow intensifies (box-shadow expands 2×) + translateY(-6px)
           @keyframes: continuous ambient pulse on .hn-logo or header
  Atm:     body radial-gradient from corner · header glows · scanline optional
  Identity: logo multi-layer text-shadow glow · very dark bg

MAGAZINE / BROADSHEET
  Layout:  display:grid, grid-template-columns:1fr 1fr · 0px radius
           .hn-story-item:first-child{grid-column:1/-1; padding:48px; font-size:1.4em}
           .hn-story-list{gap:2px;background:var(--text)} (gutters = text color)
  Hover:   first child: title grows (font-size transition) · others: bg darkens
  Atm:     high contrast · editorial typography · no card shadows
  Identity: condensed or serif font · header = thick top border only

RETRO GUI
  Layout:  0px radius · .hn-story-item{border:2px solid #fff;border-right-color:#808080;border-bottom-color:#808080;background:linear-gradient(180deg,#e0e0e0,#c8c8c8)}
  Hover:   border reverses (inset simulation) + bg darkens slightly
  Atm:     body{background:#c0c0c0} · header = solid navy/teal bar · system font
  Identity: dialog-box feel · .hn-logo in title-bar style

VAPORWAVE
  Layout:  large radius (16-24px) · glassmorphism cards (rgba + backdrop-filter:blur(12px))
  Hover:   filter:hue-rotate(20deg) brightness(1.15) + scale(1.02) · dreamy
  Atm:     body animated gradient (@keyframes hueshift via hue-rotate on ::before)
           body::before{content:"";position:fixed;inset:0;background:linear-gradient(135deg,#ff6ec7,#a855f7,#06b6d4);opacity:0.15;z-index:-1;animation:hueshift 8s linear infinite}
           @keyframes hueshift{to{filter:hue-rotate(360deg)}}
  Identity: cursive or display font · pink/purple/teal palette · soft glow header

NATURE / ORGANIC
  Layout:  asymmetric radius (e.g.0 20px 20px 0) · border-left:3px solid var(--accent)
           generous gap · no card bg (transparent) · ruled separator
  Hover:   translateY(-4px) + shadow (gentle, no spring) · border-left thickens to 6px
  Atm:     body{background:linear-gradient(160deg, <earthy1> 0%, <earthy2> 100%)}
  Identity: serif or soft sans · muted green/terracotta/sand · organic header

ISOMETRIC / 3D
  Layout:  grid · cards with 3D depth illusion via box-shadow direction
  Hover:   transform:perspective(600px) rotateX(4deg) rotateY(-4deg) translateZ(10px)
           transition:transform 0.3s ease, box-shadow 0.3s
  Atm:     strong directional shadow (bottom-right) · flat colors for depth contrast
  Identity: geometric sans-serif · structured header

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CSS ARSENAL (mix freely — every theme should use several)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Scanline overlay:  body::before{content:"";position:fixed;inset:0;pointer-events:none;z-index:9999;background:repeating-linear-gradient(0deg,rgba(0,0,0,0.07) 0,rgba(0,0,0,0.07) 1px,transparent 1px,transparent 3px)}
Glow pulse:        @keyframes pulse{0%,100%{box-shadow:0 0 8px var(--accent)}50%{box-shadow:0 0 24px var(--accent),0 0 48px var(--accent)}}
Logo flicker:      @keyframes flicker{0%,94%,96%,100%{opacity:1}95%,97%{opacity:0.3}} .hn-logo{animation:flicker 5s infinite}
Logo blink cursor: .hn-logo::after{content:"_";animation:blink 1s step-end infinite} @keyframes blink{50%{opacity:0}}
Spring hover:      --item-transition:transform 0.5s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.5s
Press hover:       .hn-story-item{box-shadow:5px 5px 0 var(--text)} .hn-story-item:hover{box-shadow:2px 2px 0 var(--text);transform:translate(3px,3px)}
3D tilt:           .hn-story-item:hover{transform:perspective(600px) rotateX(4deg) rotateY(-4deg) translateZ(10px)}
Grid layout:       .hn-story-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr))}
Float rank:        .hn-story-rank{position:absolute;top:-14px;left:16px;width:auto;padding:2px 12px;border-radius:20px;background:var(--accent);color:#fff;font-weight:900}
Clip path card:    .hn-story-item{clip-path:polygon(0 0,97% 0,100% 12%,100% 100%,3% 100%,0 88%)}
Diagonal header:   .hn-header{clip-path:polygon(0 0,100% 0,100% 65%,0 100%);height:80px}
Bevel card:        .hn-story-item{border:2px solid #fff;border-right-color:#808080;border-bottom-color:#808080;background:linear-gradient(180deg,#e0e0e0,#c8c8c8)}
Hue hover:         .hn-story-item:hover{filter:hue-rotate(25deg) brightness(1.1)}
Title slide:       .hn-story-item:hover .hn-story-title{padding-left:8px;transition:padding-left 0.2s}
Masthead header:   .hn-header{border-bottom:6px double var(--text);backdrop-filter:none}
Pill header:       .hn-header{margin:12px 20px;border-radius:100px;top:12px;height:50px}
Stripe header:     .hn-header{background:var(--accent);backdrop-filter:none;border-bottom:4px solid var(--text);color:var(--bg)}
Ambient gradient:  body::before{content:"";position:fixed;inset:0;z-index:-1;opacity:0.12;background:radial-gradient(ellipse at 20% 20%,var(--accent),transparent 60%)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEMPLATE (fill every value; all blocks are required)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
:root {
    --bg:
    --card-bg:
    --text:
    --subtext:
    --accent:
    --header-bg:
    --header-border:
    --header-height:   /* 50-80px */
    --font-main:
    --item-radius:
    --item-border:
    --item-shadow:
    --story-gap:       /* 0-40px */
    --title-size:      /* 15-32px */
    --upvote-size:     /* 24-52px */
    --load-more-radius: /* 0px=square · 100px=pill */
    --item-transition: /* full transition value — use cubic-bezier for spring */
    --more-btn-bg:
    --more-btn-color:
    --mobile-upvote-bg:
    --mobile-upvote-color:
}
.hn-header { background: ; backdrop-filter: ; border-bottom: ; /* + shape property */ }
.hn-logo { /* ≥3 properties — make it unmistakable */ }
.hn-story-item { }
.hn-story-item:hover { /* must be more than just color — use transform, filter, or animation */ }
.hn-story-rank { }
.hn-upvote { }
/* Required: at least one of body::before, @keyframes+animation, .hn-story-list grid */
/* Optional: .hn-story-title, .hn-nav-links a, .hn-story-item:first-child, body */
`;

const EXTERNAL_AI_PROMPT_TEMPLATE = `You are a CSS world-builder for a Hacker News reader app called GenHN.
Output ONLY raw CSS. No explanations, markdown, code fences, or comments.

Theme request: [DESCRIBE YOUR THEME HERE — e.g. "brutalist newspaper" or "cozy dark cafe"]

━━━ RULES ━━━
Every theme must have ALL FOUR dimensions:
  LAYOUT      — change the story list structure (grid? columns? dense? airy?)
  INTERACTION — hover effects using transform, animation, or filter (not just color)
  ATMOSPHERE  — ambient effect via body::before, @keyframes, or background
  IDENTITY    — a header + logo that could only belong to this world

CONTRAST LAW (mandatory):
  DARK bg  → --text: light (#e0e0e0+)  --subtext: mid (#aaa+)  --card-bg: noticeably lighter
  LIGHT bg → --text: dark (#1a1a1a)    --subtext: mid (#666)   --card-bg: noticeably darker

━━━ CSS VARIABLES (:root) ━━━
--bg              page background
--card-bg         story card background
--text            main text color
--subtext         metadata / secondary text
--accent          links & interactive elements
--header-bg       nav header background
--header-border   header bottom border (e.g. "1px solid #ccc")
--header-height   nav height in px (50–80px)
--font-main       main typeface
--item-radius     card corner radius
--item-border     card border (e.g. "1px solid rgba(0,0,0,0.08)")
--item-shadow     card box-shadow
--item-transition full transition value (use cubic-bezier for spring physics)
--story-gap       gap between cards (0–40px)
--title-size      story title font-size (15–32px)
--upvote-size     upvote button size (24–52px)
--load-more-radius "More" button border-radius (0=square, 100px=pill)
--more-btn-bg     "More" button background
--more-btn-color  "More" button text color
--mobile-upvote-bg     mobile upvote background
--mobile-upvote-color  mobile upvote text color

━━━ KEY CLASSES ━━━
.hn-header            sticky top nav bar
.hn-logo              the "Y" site logo
.hn-story-list        <ol> containing all cards
.hn-story-item        individual story card
.hn-story-item:hover  card hover state
.hn-story-rank        rank number (1. 2. 3.)
.hn-story-title       headline link
.hn-story-meta        points / author / time row
.hn-upvote            upvote triangle button
body::before          use for overlays / atmospheric effects`;

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

        /* Theme-controllable layout */
        --story-gap: 16px;
        --title-size: 18px;
        --upvote-size: 32px;
        --item-transition: transform 0.2s, box-shadow 0.2s;
        --header-height: 60px;
        --load-more-radius: 100px;
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
        height: var(--header-height);
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
        gap: var(--story-gap);
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
        transition: var(--item-transition);
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
        font-size: var(--title-size);
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
        width: var(--upvote-size);
        height: var(--upvote-size);
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
        border-radius: var(--load-more-radius);
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
            background: currentColor; opacity: 0.15; border-radius: 2px; transform: translateY(-50%);
            transition: 0.2s;
        }
        #panel-handle:hover::before { opacity: 0.4; }
        
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
 * Panel-only CSS — applied when the "None" theme is active.
 * Contains just the control panel styles + the minimal :root variables
 * they depend on, so the panel renders correctly with no other CSS loaded.
 */
const PANEL_STYLE = `
    :root {
        --bg: #ffffff; --text: #333333; --subtext: #888888;
        --accent: #007aff; --card-bg: #ffffff;
    }
    * { box-sizing: border-box; }
    button { font-family: inherit; cursor: pointer; }

    /* --- Control Panel (Glassmorphism) --- */
    #theme-controls {
        view-transition-name: theme-ui;
        position: fixed;
        bottom: 20px; right: 20px;
        z-index: 10000; padding: 15px; border-radius: 12px;
        display: flex; flex-direction: column; gap: 12px;
        align-items: flex-start; max-width: 350px;
        background: color-mix(in srgb, var(--card-bg) 65%, transparent);
        color: var(--text);
        border-color: color-mix(in srgb, var(--text) 10%, transparent);
        box-shadow: 0 10px 40px rgba(0,0,0,0.15), inset 0 0 0 0.5px rgba(255,255,255,0.1);
        backdrop-filter: saturate(180%) blur(30px);
        -webkit-backdrop-filter: saturate(180%) blur(30px);
        transition: all 0.3s;
    }
    #theme-controls input {
        background: var(--bg); color: var(--text);
        border: 1px solid var(--subtext);
        padding: 8px 12px; border-radius: 6px; outline: none; flex: 1; opacity: 0.8;
    }
    #theme-controls button {
        background: rgba(0,0,0,0.05); color: var(--text);
        border: 1px solid rgba(0,0,0,0.1); border-radius: 6px;
        padding: 6px 12px; font-size: 12px; font-weight: 500; transition: 0.2s;
    }
    #theme-controls #generate-btn {
        background: var(--accent) !important; color: #fff;
        border: none; font-weight: 600; padding: 8px 16px;
    }
    #preset-buttons {
        display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px;
        max-height: 300px; opacity: 1; overflow: hidden;
        transition: max-height 0.5s cubic-bezier(0.2,0.8,0.2,1), opacity 0.4s ease, margin 0.4s ease;
    }
    #preset-buttons.is-collapsed { max-height: 0 !important; opacity: 0 !important; margin-bottom: 0 !important; pointer-events: none; }
    #presets-icon { display: inline-block; transition: transform 0.3s ease; }
    .is-collapsed-icon #presets-icon { transform: rotate(-90deg); }
    #panel-handle { display: none; }
    @media (min-width: 769px) {
        #panel-handle {
            display: block; position: absolute; top: 0; left: 0;
            width: 20px; height: 100%; background: transparent; cursor: ew-resize; z-index: 20;
        }
        #panel-handle::before {
            content: ""; position: absolute; top: 50%; left: 8px; width: 4px; height: 30px;
            background: currentColor; opacity: 0.15; border-radius: 2px; transform: translateY(-50%); transition: 0.2s;
        }
        #panel-handle:hover::before { opacity: 0.4; }
        #theme-controls { padding-left: 20px; transition: transform 0.4s cubic-bezier(0.2,0.8,0.2,1); }
        #theme-controls.is-minimized { transform: translateX(calc(100% - 20px)); }
        #theme-controls.is-minimized > *:not(#panel-handle) { opacity: 0; pointer-events: none; transition: opacity 0.2s; }
    }
    @media (max-width: 768px) {
        #theme-controls {
            bottom: 20px; right: 20px; width: auto;
            max-width: calc(100vw - 40px); padding: 15px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        #preset-buttons { margin-bottom: 8px; flex-wrap: nowrap; overflow-x: auto; padding-bottom: 5px; width: 100%; }
        #presets-toggle { margin-bottom: 2px; }
    }
`;

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
        #theme-controls #generate-btn { background: var(--accent) !important; color: #fff !important; }
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
        #theme-controls #generate-btn { background: var(--accent) !important; color: #fff !important; }
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
        #theme-controls #generate-btn { background: var(--accent) !important; color: #fff !important; }
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
        #theme-controls #generate-btn { background: var(--accent) !important; color: #fff !important; }
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
    `,

    "RaspberryPi": `
        /* world: TERMINAL — Raspberry Pi official palette: #c51a4a (red) × #2d9e6b (PCB green) */
        :root {
            --bg: #0a0a0a;
            --card-bg: #111318;
            --text: #e2e8f0;
            --subtext: #94a3b8;
            --accent: #c51a4a;
            --header-bg: #0a0a0a;
            --header-border: 2px solid #c51a4a;
            --header-height: 54px;
            --font-main: 'Courier New', Courier, monospace;
            --item-radius: 0px;
            --item-border: 1px solid rgba(197,26,74,0.2);
            --item-shadow: none;
            --story-gap: 4px;
            --title-size: 15px;
            --upvote-size: 30px;
            --load-more-radius: 0px;
            --item-transition: border-color 0.05s steps(1), background 0.1s;
            --more-btn-bg: #c51a4a;
            --more-btn-color: #fff;
            --mobile-upvote-bg: #c51a4a;
            --mobile-upvote-color: #fff;
        }

        /* ── Header ── */
        .hn-header {
            background: #0a0a0a;
            backdrop-filter: none;
            border-bottom: 2px solid #c51a4a;
            box-shadow: 0 0 20px rgba(197,26,74,0.3);
        }
        .hn-logo {
            color: #c51a4a;
            font-size: 20px;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            text-shadow: 0 0 8px #c51a4a, 0 0 24px rgba(197,26,74,0.5);
        }
        .hn-logo::after {
            content: '_';
            animation: rpi-blink 1s step-end infinite;
            color: #c51a4a;
        }
        @keyframes rpi-blink { 50% { opacity: 0; } }

        .hn-nav-links a { font-size: 12px; letter-spacing: 0.05em; }
        .hn-nav-links a:hover { color: #2d9e6b; opacity: 1; }

        /* ── Story items ── */
        .hn-story-item {
            border-left: 3px solid #c51a4a;
            border-top: none;
            border-right: none;
            border-bottom: 1px solid rgba(197,26,74,0.15);
            background: #111318;
        }
        .hn-story-item:hover {
            background: #180e14;
            border-left: 3px solid #ff2060;
            border-bottom-color: rgba(197,26,74,0.35);
            box-shadow: -4px 0 16px rgba(197,26,74,0.4), inset 0 0 40px rgba(197,26,74,0.04);
        }
        .hn-story-rank { color: rgba(197,26,74,0.7); font-weight: 600; }

        /* ── Upvote: PCB green ── */
        .hn-upvote {
            border-radius: 0;
            border: 1px solid #2d9e6b;
            color: #2d9e6b;
            background: rgba(45,158,107,0.08);
            opacity: 1;
        }
        .hn-upvote:hover {
            background: rgba(45,158,107,0.2);
            border-color: #3dce8b;
            color: #3dce8b;
            opacity: 1;
        }

        /* ── Atmosphere: scanline + ambient glow ── */
        body { letter-spacing: 0.02em; }
        body::before {
            content: "";
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 9999;
            background: repeating-linear-gradient(
                0deg,
                rgba(0,0,0,0.06) 0, rgba(0,0,0,0.06) 1px,
                transparent 1px, transparent 3px
            );
        }
        body::after {
            content: "";
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: -1;
            background: radial-gradient(ellipse at 10% 90%, rgba(197,26,74,0.08) 0%, transparent 55%),
                        radial-gradient(ellipse at 90% 10%, rgba(45,158,107,0.06) 0%, transparent 50%);
        }
        #theme-controls #generate-btn { background: #c51a4a !important; color: #fff !important; }
    `,

    "Ubuntu": `
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
        #theme-controls #generate-btn { background: #e95420 !important; color: #fff !important; }
    `
};

/**
 * Data Fetching Logic
 */
const HNData = {
    allStoryIds: [],
    currentType: 'top',

    setType(type) {
        if (this.currentType === type) return;
        this.currentType = type;
        this.allStoryIds = []; // Clear cache
    },

    async fetchAllIds() {
        if (this.allStoryIds.length > 0) return this.allStoryIds;
        try {
            const endpoint = this.currentType === 'jobs' ? 'jobstories' : `${this.currentType}stories`;
            const response = await fetch(`${BASE_URL}/${endpoint}.json`);
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
        this.renderSavedThemeButtons();
        this.renderApiKeySection();
        this.renderPasteCssSection();
        this.renderPromptTemplateSection();
        this.bindEvents();

        const savedPreset = localStorage.getItem('genhn-theme');
        const savedCustom = localStorage.getItem('genhn-custom-css');
        const savedPrompt = localStorage.getItem('genhn-custom-prompt');

        if (savedCustom) {
            this.applyStyle(savedCustom, null, savedPrompt || 'Custom AI Theme');
            if (savedPrompt) this.elements.promptInput.value = savedPrompt;
            const alreadySaved = this.getSavedThemes().some(t => t.css === savedCustom);
            this.renderSaveButton(!alreadySaved);
        } else {
            const themeToApply = (savedPreset && STYLE_PRESETS[savedPreset]) ? savedPreset : 'Minimalist';
            this.applyStyle(STYLE_PRESETS[themeToApply], themeToApply);
        }

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
        
        // Handle navigation
        this.elements.navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                const type = e.target.textContent.trim().toLowerCase();
                
                if (['new', 'ask', 'show', 'jobs'].includes(type)) {
                    this.switchFeed(type);
                } else if (type === 'submit') {
                    this.toggleMenu(false);
                    window.open('https://news.ycombinator.com/submit', '_blank');
                } else {
                    this.toggleMenu(false);
                    alert('This feature is currently unavailable in the Generative UI.');
                }
            }
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

    async switchFeed(type) {
        if (this.isLoading) return;
        this.isLoading = true;
        
        // Update HNData
        HNData.setType(type);
        
        // Reset state
        this.currentOffset = 0;
        this.elements.listElement.innerHTML = '<div style="padding: 20px; text-align: center;">Loading...</div>';
        
        // Close menu (if open)
        this.toggleMenu(false);
        
        // Load
        await this.loadAndRender();
        this.isLoading = false;
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

    getApiKey() {
        return localStorage.getItem('genhn-gemini-key');
    },

    saveApiKey(key) {
        localStorage.setItem('genhn-gemini-key', key.trim());
    },

    clearApiKey() {
        localStorage.removeItem('genhn-gemini-key');
        this.renderApiKeySection();
    },

    extractCss(text) {
        let cleaned = text.replace(/^```(?:css)?\s*/i, '');
        cleaned = cleaned.replace(/\s*```\s*$/, '');
        return cleaned.trim();
    },

    async generateTheme(prompt) {
        const key = this.getApiKey();
        if (!key) throw new Error('NO_API_KEY');

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
        const body = {
            system_instruction: { parts: [{ text: GEMINI_SYSTEM_PROMPT }] },
            contents: [{ role: 'user', parts: [{ text: `Generate a CSS theme for: ${prompt}` }] }],
            generationConfig: { temperature: 0.9, maxOutputTokens: 1800 }
        };

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const status = response.status;
            let apiMessage = '';
            try {
                const errData = await response.json();
                apiMessage = errData?.error?.message || '';
                console.error('Gemini API error:', status, errData);
            } catch (_) {}
            if (status === 400 || status === 403) throw new Error('INVALID_KEY');
            if (status === 429) {
                const e = new Error('RATE_LIMIT');
                e.detail = apiMessage;
                throw e;
            }
            throw new Error(`API_ERROR:${status}`);
        }

        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!rawText) throw new Error('EMPTY_RESPONSE');
        const css = this.extractCss(rawText);
        console.log('Generated CSS:\n', css);
        return css;
    },

    renderApiKeySection() {
        const existing = document.getElementById('api-key-section');
        if (existing) existing.remove();

        const section = document.createElement('div');
        section.id = 'api-key-section';
        section.style.cssText = 'width:100%; display:flex; flex-direction:column; gap:6px;';

        if (this.getApiKey()) {
            section.innerHTML = `
                <div style="font-size:11px; opacity:0.6; display:flex; justify-content:space-between; align-items:center; width:100%;">
                    <span style="text-transform:uppercase; letter-spacing:1px; font-weight:600;">Gemini AI: enabled</span>
                    <button id="api-key-clear-btn" style="font-size:10px; background:none; border:none; padding:0; cursor:pointer; opacity:0.7; color:inherit;">clear</button>
                </div>`;
            section.querySelector('#api-key-clear-btn').addEventListener('click', () => this.clearApiKey());
        } else {
            section.innerHTML = `
                <div id="api-key-toggle" style="cursor:pointer; font-size:11px; opacity:0.6; display:flex; justify-content:space-between; align-items:center; width:100%; user-select:none;">
                    <span style="text-transform:uppercase; letter-spacing:1px; font-weight:600;">Gemini API Key</span>
                    <span id="api-key-icon" style="font-size:10px; display:inline-block; transition:transform 0.3s; transform:rotate(-90deg);">▼</span>
                </div>
                <div id="api-key-form" style="display:none; flex-direction:column; gap:6px;">
                    <input type="password" id="api-key-input" placeholder="AIza..." style="font-size:11px; min-width:0;">
                    <button id="api-key-save-btn" style="font-size:11px; align-self:flex-end;">Save Key</button>
                </div>`;
            section.querySelector('#api-key-toggle').addEventListener('click', () => {
                const form = section.querySelector('#api-key-form');
                const icon = section.querySelector('#api-key-icon');
                const isOpen = form.style.display !== 'none';
                form.style.display = isOpen ? 'none' : 'flex';
                icon.style.transform = isOpen ? 'rotate(-90deg)' : 'rotate(0deg)';
            });
            section.querySelector('#api-key-save-btn').addEventListener('click', () => {
                const val = section.querySelector('#api-key-input').value.trim();
                if (!val) return;
                this.saveApiKey(val);
                this.renderApiKeySection();
            });
        }

        this.elements.themeControls.appendChild(section);
    },

    renderPasteCssSection() {
        const existing = document.getElementById('paste-css-section');
        if (existing) existing.remove();

        const section = document.createElement('div');
        section.id = 'paste-css-section';
        section.style.cssText = 'width:100%; display:flex; flex-direction:column; gap:6px;';

        section.innerHTML = `
            <div id="paste-css-toggle" style="cursor:pointer; font-size:11px; opacity:0.6; display:flex; justify-content:space-between; align-items:center; width:100%; user-select:none;">
                <span style="text-transform:uppercase; letter-spacing:1px; font-weight:600;">Paste CSS</span>
                <span id="paste-css-icon" style="font-size:10px; display:inline-block; transition:transform 0.3s; transform:rotate(-90deg);">▼</span>
            </div>
            <div id="paste-css-form" style="display:none; flex-direction:column; gap:6px;">
                <textarea id="paste-css-input" placeholder=":root {
  --bg: #f5f5f7;        /* page background   */
  --card-bg: #ffffff;   /* story card        */
  --text: #1d1d1f;      /* main text         */
  --subtext: #86868b;   /* metadata / nav    */
  --accent: #0066cc;    /* links & buttons   */
  --header-bg: rgba(255,255,255,0.8);
  --font-main: sans-serif;
}

/* optional: component overrides */
.hn-story-item { border-radius: 16px; }
.hn-header { backdrop-filter: blur(20px); }" style="font-size:11px; min-width:0; width:100%; height:160px; resize:vertical; font-family:monospace; box-sizing:border-box;"></textarea>
                <div style="display:flex; gap:6px; align-items:center;">
                    <input type="text" id="paste-css-name" placeholder="Theme name (optional)" style="font-size:11px; min-width:0; flex:1;">
                    <button id="paste-css-apply-btn" style="font-size:11px; white-space:nowrap;">Apply</button>
                </div>
            </div>`;

        section.querySelector('#paste-css-toggle').addEventListener('click', () => {
            const form = section.querySelector('#paste-css-form');
            const icon = section.querySelector('#paste-css-icon');
            const isOpen = form.style.display !== 'none';
            form.style.display = isOpen ? 'none' : 'flex';
            icon.style.transform = isOpen ? 'rotate(-90deg)' : 'rotate(0deg)';
        });

        section.querySelector('#paste-css-apply-btn').addEventListener('click', () => {
            const css = section.querySelector('#paste-css-input').value.trim();
            if (!css) return;
            const name = section.querySelector('#paste-css-name').value.trim() || 'Custom CSS';
            this.applyStyle(css, null, name);
            this.togglePresets(true);
            this.renderSaveButton(true);
        });

        this.elements.themeControls.appendChild(section);
    },

    renderPromptTemplateSection() {
        const existing = document.getElementById('prompt-template-section');
        if (existing) existing.remove();

        const section = document.createElement('div');
        section.id = 'prompt-template-section';
        section.style.cssText = 'width:100%; display:flex; flex-direction:column; gap:6px;';

        section.innerHTML = `
            <div id="prompt-template-toggle" style="cursor:pointer; font-size:11px; opacity:0.6; display:flex; justify-content:space-between; align-items:center; width:100%; user-select:none;">
                <span style="text-transform:uppercase; letter-spacing:1px; font-weight:600;">AI Prompt Template</span>
                <span id="prompt-template-icon" style="font-size:10px; display:inline-block; transition:transform 0.3s; transform:rotate(-90deg);">▼</span>
            </div>
            <div id="prompt-template-form" style="display:none; flex-direction:column; gap:6px;">
                <p style="font-size:10px; opacity:0.55; margin:0; line-height:1.5;">Copy this prompt, paste it into ChatGPT / Claude / Gemini, and replace the bracketed line with your theme idea. Then paste the resulting CSS into the <strong>Paste CSS</strong> section above.</p>
                <textarea id="prompt-template-text" readonly style="font-size:10px; min-width:0; width:100%; height:180px; resize:vertical; font-family:monospace; box-sizing:border-box; opacity:0.75;"></textarea>
                <button id="prompt-template-copy-btn" style="font-size:11px; align-self:flex-end;">Copy Prompt</button>
            </div>`;

        section.querySelector('#prompt-template-toggle').addEventListener('click', () => {
            const form = section.querySelector('#prompt-template-form');
            const icon = section.querySelector('#prompt-template-icon');
            const isOpen = form.style.display !== 'none';
            form.style.display = isOpen ? 'none' : 'flex';
            icon.style.transform = isOpen ? 'rotate(-90deg)' : 'rotate(0deg)';
        });

        const textarea = section.querySelector('#prompt-template-text');
        textarea.value = EXTERNAL_AI_PROMPT_TEMPLATE;

        const copyBtn = section.querySelector('#prompt-template-copy-btn');
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(EXTERNAL_AI_PROMPT_TEMPLATE).then(() => {
                const original = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                setTimeout(() => { copyBtn.textContent = original; }, 2000);
            });
        });

        this.elements.themeControls.appendChild(section);
    },

    showGenerateError(err) {
        let message;
        switch (err.message) {
            case 'NO_API_KEY':    message = 'Please add your Gemini API key.'; this.expandApiKeySection(); break;
            case 'INVALID_KEY':   message = 'Invalid API key. Please check and re-enter.'; this.expandApiKeySection(); break;
            case 'RATE_LIMIT':    message = err.detail ? `API error: ${err.detail}` : 'Rate limit hit. Please try again in a moment.'; break;
            case 'EMPTY_RESPONSE':message = 'Gemini returned an empty response. Try rephrasing.'; break;
            default:              message = `Generation failed: ${err.message}`;
        }
        let errEl = document.getElementById('generate-error');
        if (!errEl) {
            errEl = document.createElement('div');
            errEl.id = 'generate-error';
            errEl.style.cssText = 'font-size:11px; color:#ff3b30; margin-top:-4px; width:100%;';
            this.elements.generateBtn.parentElement.insertAdjacentElement('afterend', errEl);
        }
        errEl.textContent = message;
        clearTimeout(this._errorTimeout);
        this._errorTimeout = setTimeout(() => { errEl.textContent = ''; }, 5000);
    },

    expandApiKeySection() {
        const form = document.getElementById('api-key-form');
        const icon = document.getElementById('api-key-icon');
        if (form && form.style.display === 'none') {
            form.style.display = 'flex';
            if (icon) icon.style.transform = 'rotate(0deg)';
        }
        this.elements.themeControls.classList.remove('is-minimized');
        const input = document.getElementById('api-key-input');
        if (input) setTimeout(() => input.focus(), 300);
    },

    summarizePrompt(prompt) {
        const stopWords = new Set(['a', 'an', 'the', 'with', 'for', 'in', 'of', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'been', 'that', 'this', 'these', 'those', 'on', 'at', 'to', 'from', 'by', 'as', 'it', 'its', 'very', 'style', 'theme', 'design', 'like', 'inspired', 'feel', 'look', 'make', 'create', 'generate']);
        const words = prompt.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
        const word = words.find(w => w.length > 1 && !stopWords.has(w)) || words[0] || 'Custom';
        return word.charAt(0).toUpperCase() + word.slice(1);
    },

    getSavedThemes() {
        try { return JSON.parse(localStorage.getItem('genhn-saved-themes') || '[]'); }
        catch (_) { return []; }
    },

    saveCurrentTheme() {
        const css = localStorage.getItem('genhn-custom-css');
        const prompt = localStorage.getItem('genhn-custom-prompt') || 'Custom';
        if (!css) return;

        const baseName = this.summarizePrompt(prompt);
        const saved = this.getSavedThemes();
        if (saved.some(t => t.css === css)) return;

        let name = baseName;
        const existingNames = new Set(saved.map(t => t.name));
        let i = 2;
        while (existingNames.has(name)) { name = `${baseName}${i++}`; }

        saved.push({ id: Date.now().toString(), name, css, prompt });
        localStorage.setItem('genhn-saved-themes', JSON.stringify(saved));
        this.renderSavedThemeButtons();
        this.renderSaveButton(false);
    },

    deleteSavedTheme(id) {
        const saved = this.getSavedThemes().filter(t => t.id !== id);
        localStorage.setItem('genhn-saved-themes', JSON.stringify(saved));
        this.renderSavedThemeButtons();
    },

    renderSavedThemeButtons() {
        document.querySelectorAll('.saved-theme-btn-wrapper').forEach(el => el.remove());

        this.getSavedThemes().forEach(theme => {
            const wrapper = document.createElement('div');
            wrapper.className = 'saved-theme-btn-wrapper';
            wrapper.style.cssText = 'position:relative; display:inline-flex; flex-shrink:0;';

            const btn = document.createElement('button');
            btn.textContent = theme.name;
            btn.style.cssText = 'padding:6px 12px; background:rgba(0,0,0,0.05); border:2px solid rgba(0,0,0,0.25); border-radius:6px; font-size:12px; font-weight:500; cursor:pointer; transition:all 0.2s; color:var(--text); flex-shrink:0;';
            btn.addEventListener('mouseover', () => { btn.style.background = 'rgba(0,0,0,0.1)'; });
            btn.addEventListener('mouseout', () => { btn.style.background = 'rgba(0,0,0,0.05)'; });
            btn.addEventListener('click', () => {
                this.elements.promptInput.value = theme.prompt;
                this.applyStyle(theme.css, null, theme.prompt);
                this.renderSaveButton(false);
                this.togglePresets(true);
            });

            const delBtn = document.createElement('button');
            delBtn.textContent = '×';
            delBtn.style.cssText = 'position:absolute; top:-5px; right:-5px; width:15px; height:15px; border-radius:50%; background:rgba(0,0,0,0.35); color:#fff; border:none; font-size:9px; padding:0; cursor:pointer; display:flex; align-items:center; justify-content:center; line-height:1; opacity:0.3; transition:opacity 0.2s;';
            delBtn.addEventListener('click', e => { e.stopPropagation(); this.deleteSavedTheme(theme.id); });
            wrapper.addEventListener('mouseenter', () => { delBtn.style.opacity = '1'; });
            wrapper.addEventListener('mouseleave', () => { delBtn.style.opacity = '0.3'; });

            wrapper.appendChild(btn);
            wrapper.appendChild(delBtn);
            this.elements.presetButtons.appendChild(wrapper);
        });
    },

    renderSaveButton(show) {
        const existing = document.getElementById('save-theme-row');
        if (existing) existing.remove();
        if (!show) return;

        const row = document.createElement('div');
        row.id = 'save-theme-row';
        row.style.cssText = 'width:100%; display:flex; justify-content:flex-end;';

        const btn = document.createElement('button');
        btn.textContent = 'Save as Preset';
        btn.style.cssText = 'font-size:11px;';
        btn.addEventListener('click', () => this.saveCurrentTheme());

        row.appendChild(btn);
        this.elements.generateBtn.parentElement.insertAdjacentElement('afterend', row);
    },

    async handleGenerate() {
        const input = this.elements.promptInput.value.trim();
        if (!input) return;
        if (this._isGenerating) return;

        const presetKey = this.matchStyle(input);
        if (presetKey) {
            this.applyStyle(STYLE_PRESETS[presetKey], presetKey);
            this.togglePresets(true);
            return;
        }

        if (!this.getApiKey()) {
            this.expandApiKeySection();
            return;
        }

        this._isGenerating = true;
        const btn = this.elements.generateBtn;
        const originalText = btn.textContent;
        btn.textContent = 'Generating...';
        btn.disabled = true;

        try {
            const css = await this.generateTheme(input);
            this.applyStyle(css, null, input);
            this.togglePresets(true);
            this.renderSaveButton(true);
        } catch (err) {
            this.showGenerateError(err);
        } finally {
            btn.textContent = originalText;
            btn.disabled = false;
            this._isGenerating = false;
        }
    },

    matchStyle(input) {
        const normalizedInput = input.toLowerCase();
        for (const key in STYLE_PRESETS) {
            if (normalizedInput.includes(key.toLowerCase())) return key;
        }
        return null;
    },

    applyStyle(css, themeName, customPrompt = null) {
        this.toggleMenu(false);

        if (themeName && STYLE_PRESETS[themeName]) {
            localStorage.setItem('genhn-theme', themeName);
            localStorage.removeItem('genhn-custom-css');
            localStorage.removeItem('genhn-custom-prompt');
            this.renderSaveButton(false);
        } else if (customPrompt) {
            localStorage.setItem('genhn-custom-css', css);
            localStorage.setItem('genhn-custom-prompt', customPrompt);
            localStorage.removeItem('genhn-theme');
        }

        const applyFn = () => {
            this.elements.styleTag.textContent = css === "" ? PANEL_STYLE : SYSTEM_STYLE + css;
        };

        if (!document.startViewTransition) { applyFn(); return; }
        document.startViewTransition(applyFn);
    }
};

// Start the application
document.addEventListener('DOMContentLoaded', () => App.init());
