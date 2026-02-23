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
    .hn-site-subtitle { font-size: 11px; opacity: 0.5; margin: 0 0 24px; text-align: center; }
    .hn-site-subtitle a { color: inherit; text-decoration: underline; }
    .hn-nav-links { display: flex; gap: 24px; }
    .hn-nav-links a { font-size: 14px; font-weight: 500; color: var(--subtext); }
    .hn-nav-links a:hover { color: var(--text); }
    .hn-auth a { font-size: 13px; font-weight: 600; color: var(--accent); }
    .hn-github-link { display: inline-flex; align-items: center; gap: 5px; border: 1px solid var(--accent); border-radius: 6px; padding: 3px 10px; font-size: 12px; opacity: 0.85; transition: opacity 0.2s; }
    .hn-github-link:hover { opacity: 1; }

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
        width: 400px;

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
    #theme-controls #generate-btn, #theme-controls #paste-css-apply-btn {
        background: var(--accent) !important;
        color: #fff;
        border: none;
        font-weight: 600;
        padding: 8px 16px;
    }
    
    /* Collapsible Logic */
    #presets-icon { display: inline-block; transition: transform 0.3s ease; }

    /* --- Desktop Panel Toggle (Drag Handle) --- */
    #panel-handle { display: none; }
    #mobile-drag-pill { display: none; }
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
            padding-left: 32px;
            transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        #theme-controls.is-minimized {
            transform: translateX(calc(100% - 20px));
        }
        #theme-controls.is-minimized > *:not(#panel-handle) {
            opacity: 0 !important; pointer-events: none; transition: opacity 0.2s;
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
            bottom: 20px; right: 20px; width: calc(100vw - 40px);
            padding: 15px; padding-top: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        #theme-controls.is-hidden-mobile {
            transform: translateY(calc(100% - 24px));
        }
        #theme-controls.is-hidden-mobile > *:not(#mobile-drag-pill) {
            opacity: 0 !important; pointer-events: none; transition: opacity 0.2s;
        }
        #mobile-drag-pill {
            display: flex; justify-content: center; align-items: center;
            width: 100%; height: 8px; cursor: grab; flex-shrink: 0;
            touch-action: none; margin-bottom: 2px;
        }
        #mobile-drag-pill::before {
            content: ""; width: 36px; height: 4px;
            background: currentColor; opacity: 0.2; border-radius: 2px;
        }
        .hn-footer { padding: 40px 20px 60px; }
        .hn-footer-links { flex-direction: column; gap: 10px; }
        #preset-buttons { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 5px; width: 100%; }
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
        align-items: flex-start; width: 350px;
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
    #theme-controls #generate-btn, #theme-controls #paste-css-apply-btn {
        background: var(--accent) !important; color: #fff;
        border: none; font-weight: 600; padding: 8px 16px;
    }
    #presets-icon { display: inline-block; transition: transform 0.3s ease; }
    #panel-handle { display: none; }
    #mobile-drag-pill { display: none; }
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
        #theme-controls { padding-left: 32px; transition: transform 0.4s cubic-bezier(0.2,0.8,0.2,1); }
        #theme-controls.is-minimized { transform: translateX(calc(100% - 20px)); }
        #theme-controls.is-minimized > *:not(#panel-handle) { opacity: 0 !important; pointer-events: none; transition: opacity 0.2s; }
    }
    @media (max-width: 768px) {
        #theme-controls {
            bottom: 20px; right: 20px; width: calc(100vw - 40px);
            padding: 15px; padding-top: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        #theme-controls.is-hidden-mobile {
            transform: translateY(calc(100% - 24px));
        }
        #theme-controls.is-hidden-mobile > *:not(#mobile-drag-pill) {
            opacity: 0 !important; pointer-events: none; transition: opacity 0.2s;
        }
        #mobile-drag-pill {
            display: flex; justify-content: center; align-items: center;
            width: 100%; height: 8px; cursor: grab; flex-shrink: 0;
            touch-action: none; margin-bottom: 2px;
        }
        #mobile-drag-pill::before {
            content: ""; width: 36px; height: 4px;
            background: currentColor; opacity: 0.2; border-radius: 2px;
        }
        #preset-buttons { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 5px; width: 100%; }
        #presets-toggle { margin-bottom: 2px; }
    }
`;

// STYLE_PRESETS is defined in presets.js (loaded before this file)

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
        promptInput: null,
        generateBtn: null,
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
        this.renderGeminiSection();
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
                this.applyStyle(STYLE_PRESETS[themeName], themeName);
            };
            this.elements.presetButtons.appendChild(btn);
        });
    },

    bindEvents() {
        this.elements.loadMoreBtn.addEventListener('click', () => this.loadMore());
        this.elements.menuToggle.addEventListener('click', () => this.toggleMenu());
        
        if (this.elements.presetsToggle) {
            this.elements.presetsToggle.addEventListener('click', () => this.togglePresets());
        }

        if (this.elements.panelHandle) {
            let isDragging = false;
            let startX = 0, startY = 0;
            const threshold = 50;

            const startDrag = (e) => {
                isDragging = true;
                if (window.innerWidth < 769) {
                    startY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
                } else {
                    startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
                }
                this.elements.themeControls.style.transition = 'none';
            };

            const doDrag = (e) => {
                if (!isDragging) return;
                const tc = this.elements.themeControls;
                if (window.innerWidth < 769) {
                    const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
                    const deltaY = clientY - startY;
                    const isHidden = tc.classList.contains('is-hidden-mobile');
                    if (!isHidden && deltaY > 0) {
                        tc.style.transform = `translateY(${deltaY}px)`;
                    } else if (isHidden && deltaY < 0) {
                        tc.style.transform = `translateY(calc(100% - 24px + ${deltaY}px))`;
                    }
                } else {
                    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
                    const deltaX = clientX - startX;
                    const isMin = tc.classList.contains('is-minimized');
                    if (!isMin && deltaX > 0) {
                        tc.style.transform = `translateX(${deltaX}px)`;
                    } else if (isMin && deltaX < 0) {
                        tc.style.transform = `translateX(calc(100% - 20px + ${deltaX}px))`;
                    }
                }
            };

            const endDrag = (e) => {
                if (!isDragging) return;
                isDragging = false;
                if (e.cancelable && e.type === 'touchend') e.preventDefault();
                const tc = this.elements.themeControls;
                tc.style.transition = '';
                tc.style.transform = '';
                if (window.innerWidth < 769) {
                    const clientY = e.type.includes('mouse') ? e.clientY : e.changedTouches[0].clientY;
                    const deltaY = clientY - startY;
                    const isHidden = tc.classList.contains('is-hidden-mobile');
                    if (Math.abs(deltaY) < 10) {
                        tc.classList.toggle('is-hidden-mobile');
                    } else if (!isHidden && deltaY > threshold) {
                        tc.classList.add('is-hidden-mobile');
                    } else if (isHidden && deltaY < -threshold) {
                        tc.classList.remove('is-hidden-mobile');
                    }
                } else {
                    const clientX = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX;
                    const deltaX = clientX - startX;
                    const isMin = tc.classList.contains('is-minimized');
                    if (Math.abs(deltaX) < 10) {
                        tc.classList.toggle('is-minimized');
                    } else if (!isMin && deltaX > threshold) {
                        tc.classList.add('is-minimized');
                    } else if (isMin && deltaX < -threshold) {
                        tc.classList.remove('is-minimized');
                    }
                }
            };

            // Desktop: drag handle (left edge)
            const handle = this.elements.panelHandle;
            handle.addEventListener('mousedown', startDrag);
            handle.addEventListener('touchstart', startDrag, {passive: true});
            document.addEventListener('mousemove', doDrag);
            document.addEventListener('touchmove', doDrag, {passive: true});
            document.addEventListener('mouseup', endDrag);
            document.addEventListener('touchend', endDrag);

            // Mobile: drag pill (top of panel); non-passive touchmove to allow preventDefault
            const mobilePill = document.getElementById('mobile-drag-pill');
            if (mobilePill) {
                mobilePill.addEventListener('mousedown', startDrag);
                mobilePill.addEventListener('touchstart', startDrag, {passive: true});
                mobilePill.addEventListener('touchmove', (e) => { if (isDragging) e.preventDefault(); doDrag(e); }, {passive: false});
                mobilePill.addEventListener('touchend', endDrag);
            }
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
        const isCollapsed = this.elements.presetButtons.style.display === 'none';
        const shouldCollapse = collapse !== undefined ? collapse : !isCollapsed;
        this.elements.presetButtons.style.display = shouldCollapse ? 'none' : 'flex';
        const icon = document.getElementById('presets-icon');
        if (icon) icon.style.transform = shouldCollapse ? 'rotate(-90deg)' : 'rotate(0deg)';
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
        this.renderGeminiSection();
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

    renderGeminiSection() {
        const existing = document.getElementById('gemini-section');
        if (existing) existing.remove();

        const section = document.createElement('div');
        section.id = 'gemini-section';
        section.style.cssText = 'width:100%; display:flex; flex-direction:column; gap:6px;';

        const hasKey = !!this.getApiKey();
        section.innerHTML = `
            <div id="gemini-toggle" style="cursor:pointer; font-size:11px; opacity:0.6; display:flex; justify-content:space-between; align-items:center; width:100%; user-select:none;">
                <span style="text-transform:uppercase; letter-spacing:1px; font-weight:600;">Generate (Gemini API)</span>
                <span id="gemini-icon" style="font-size:10px; display:inline-block; transition:transform 0.3s;">▼</span>
            </div>
            <div id="gemini-form" style="flex-direction:column; gap:6px;">
                <div id="api-key-section" style="display:flex; flex-direction:column; gap:6px;">
                    <div style="font-size:10px; opacity:0.5; text-transform:uppercase; letter-spacing:0.5px; font-weight:600;">API Key</div>
                    <div style="font-size:10px; opacity:0.5; line-height:1.5;">Get a free key at <a href="https://aistudio.google.com/apikey" target="_blank" style="color:inherit;">Google AI Studio</a>. Uses <code>gemini-2.5-flash</code>.</div>
                    ${hasKey ? `
                    <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                        <span style="font-size:11px; opacity:0.6;">●●●●●●●●</span>
                        <button id="api-key-clear-btn" style="font-size:10px; background:none; border:none; padding:0; cursor:pointer; opacity:0.7; color:inherit;">clear</button>
                    </div>` : `
                    <div id="api-key-form" style="display:flex; gap:6px; align-items:center;">
                        <input type="password" id="api-key-input" placeholder="AIza..." style="font-size:11px; min-width:0; flex:1;">
                        <button id="api-key-save-btn" style="font-size:11px; white-space:nowrap;">Save Key</button>
                    </div>`}
                </div>
                <div style="display:flex; flex-direction:column; gap:6px; ${!hasKey ? 'opacity:0.35; pointer-events:none;' : ''}">
                    <div style="font-size:10px; opacity:0.5; text-transform:uppercase; letter-spacing:0.5px; font-weight:600;">Prompt</div>
                    <div style="display:flex; gap:10px; align-items:center; width:100%;">
                        <input type="text" id="prompt-input" placeholder="Enter theme..." style="min-width:0; font-size:11px;" ${!hasKey ? 'disabled' : ''}>
                        <button id="generate-btn" style="white-space:nowrap; font-weight:600;" ${!hasKey ? 'disabled' : ''}>Apply</button>
                    </div>
                </div>
            </div>`;

        // Set initial open/closed state based on whether API key exists
        const geminiForm = section.querySelector('#gemini-form');
        const geminiIcon = section.querySelector('#gemini-icon');
        if (hasKey) {
            geminiForm.style.display = 'none';
            geminiIcon.style.transform = 'rotate(-90deg)';
        } else {
            geminiForm.style.display = 'flex';
            geminiIcon.style.transform = 'rotate(0deg)';
        }

        section.querySelector('#gemini-toggle').addEventListener('click', () => {
            const form = section.querySelector('#gemini-form');
            const icon = section.querySelector('#gemini-icon');
            const isOpen = form.style.display !== 'none';
            form.style.display = isOpen ? 'none' : 'flex';
            icon.style.transform = isOpen ? 'rotate(-90deg)' : 'rotate(0deg)';
        });

        this.elements.promptInput = section.querySelector('#prompt-input');
        this.elements.generateBtn = section.querySelector('#generate-btn');
        this.elements.generateBtn.addEventListener('click', () => this.handleGenerate());
        this.elements.promptInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleGenerate();
        });

        if (hasKey) {
            section.querySelector('#api-key-clear-btn').addEventListener('click', () => this.clearApiKey());
        } else {
            section.querySelector('#api-key-save-btn').addEventListener('click', () => {
                const val = section.querySelector('#api-key-input').value.trim();
                if (!val) return;
                this.saveApiKey(val);
                this.renderGeminiSection();
            });
        }

        const pasteCss = document.getElementById('paste-css-section');
        if (pasteCss) {
            this.elements.themeControls.insertBefore(section, pasteCss);
        } else {
            this.elements.themeControls.appendChild(section);
        }
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
                    <input type="text" id="paste-css-name" placeholder="Theme name" style="font-size:11px; min-width:0; flex:1;">
                    <button id="paste-css-apply-btn" style="white-space:nowrap; font-weight:600;">Apply</button>
                </div>
                <div id="paste-css-save-row" style="display:none; justify-content:flex-end;">
                    <button id="paste-css-save-btn" style="font-size:11px;">Save as Preset</button>
                </div>
            </div>`;

        section.querySelector('#paste-css-toggle').addEventListener('click', () => {
            const form = section.querySelector('#paste-css-form');
            const icon = section.querySelector('#paste-css-icon');
            const isOpen = form.style.display !== 'none';
            form.style.display = isOpen ? 'none' : 'flex';
            icon.style.transform = isOpen ? 'rotate(-90deg)' : 'rotate(0deg)';
        });

        const textarea = section.querySelector('#paste-css-input');
        const saveRow = section.querySelector('#paste-css-save-row');
        const saveBtn = section.querySelector('#paste-css-save-btn');

        textarea.addEventListener('input', () => {
            saveRow.style.display = 'none';
            saveBtn.textContent = 'Save as Preset';
        });

        section.querySelector('#paste-css-apply-btn').addEventListener('click', () => {
            const css = textarea.value.trim();
            const name = section.querySelector('#paste-css-name').value.trim();
            if (!css || !name) return;
            this.applyStyle(css, null, name);
            saveRow.style.display = 'flex';
            saveBtn.textContent = 'Save as Preset';
        });

        saveBtn.addEventListener('click', () => {
            const css = textarea.value.trim();
            const name = section.querySelector('#paste-css-name').value.trim();
            if (!name) return;
            const saved = this.saveThemeAs(css, name);
            saveBtn.textContent = saved ? 'Saved!' : 'Already saved';
            setTimeout(() => { saveBtn.textContent = 'Save as Preset'; }, 2000);
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
        const geminiForm = document.getElementById('gemini-form');
        const geminiIcon = document.getElementById('gemini-icon');
        if (geminiForm && geminiForm.style.display === 'none') {
            geminiForm.style.display = 'flex';
            if (geminiIcon) geminiIcon.style.transform = 'rotate(0deg)';
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

    saveThemeAs(css, name) {
        const saved = this.getSavedThemes();
        if (saved.some(t => t.css === css)) return false;

        let finalName = name;
        const existingNames = new Set(saved.map(t => t.name));
        let i = 2;
        while (existingNames.has(finalName)) { finalName = `${name} ${i++}`; }

        saved.push({ id: Date.now().toString(), name: finalName, css, prompt: name });
        localStorage.setItem('genhn-saved-themes', JSON.stringify(saved));
        this.renderSavedThemeButtons();
        return true;
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
                this.applyStyle(theme.css, null, theme.prompt);
                this.renderSaveButton(false);
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
