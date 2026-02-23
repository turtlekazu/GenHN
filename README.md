# GenHN

An experimental project that dynamically reconstructs the Hacker News interface using the "essences" of world-renowned product design systems.

[日本語版 (Japanese README)](README-ja.md)

## Features

- **10 Design Presets**: Instantly switch between design systems inspired by iconic brand aesthetics.
- **Preset Panel**: One-click buttons for each built-in theme, plus a free-text input for applying any theme by name.
- **AI Theme Generation**: Enter a Gemini API key to generate entirely new design themes from any free-text prompt.
- **Feed Navigation**: Switch between Hacker News feeds — Top, New, Ask, Show, and Jobs.
- **Live HN Data**: Fetches real stories from the Hacker News Firebase API (30 stories per page, with infinite scroll via "More").
- **No Build Step**: Pure vanilla JS + CSS. Open `index.html` directly in a browser.
- **View Transitions**: Smooth page transitions using the View Transition API (with graceful fallback).

## Usage

1. Open `index.html` in your browser.
2. Click a preset button in the bottom-right panel, or type a theme name in the input field and click **Apply**.
3. Use the header navigation links to switch between HN feeds (Top / New / Ask / Show / Jobs).

## Available Design Essences

| Theme | Description |
|-------|-------------|
| **Minimalist** | Soft white base with glassmorphism header, clean typography, and subtle card shadows. |
| **Intelligence** | Near-black background with emerald green accents, monospace logo, and a blinking cursor — AI chat interface inspired. |
| **Search** | Pure white, functional layout, and blue hyperlink-style titles evoking classic search engine aesthetics. |
| **Universal** | Bold card grid with rounded corners and strong blue accents — friendly and highly legible. |
| **Glitch** | Black background with electric yellow text, cyan subtext, CRT scanline overlay, and polygon-clipped cards. |
| **Playful** | Light gray background with a red header, thick black borders, and a card grid reminiscent of game console UI. |
| **Glow** | Deep navy with a radial blue gradient, glowing neon logo, and translucent cards — next-gen console aesthetic. |
| **Academic** | Warm cream background, serif typography, and a terracotta accent for a calm, thoughtful reading experience. |
| **Ghibli** | Soft paper-like cream tones, deep forest green, and Japanese serif fonts — a hand-crafted, watercolor-inspired feel. |
| **8-Bit** | Pure black, phosphor-green terminal text, cyan accents, monospace font, and pixelated rendering — retro PC / game aesthetic. |

## Architecture

The entire application lives in two files:

- **`index.html`** — Static DOM structure (header, story list, control panel).
- **`gardener.js`** (~1,200 lines) — All application logic:
  - `SYSTEM_STYLE` — Base CSS (layout, glassmorphism, responsive design).
  - `STYLE_PRESETS` — Theme definitions via CSS custom properties.
  - `HNData` — Hacker News API integration (feed fetching, pagination).
  - `App` — Main controller (theming, rendering, event handling, localStorage persistence).

## AI Theme Generation

GenHN can generate new themes on-the-fly using the [Gemini API](https://aistudio.google.com/apikey).

1. Obtain a free API key from [Google AI Studio](https://aistudio.google.com/apikey).
2. Open the control panel (bottom-right) and expand the **Gemini API Key** section.
3. Paste your key and click **Save** — it is stored only in your browser's localStorage and never sent anywhere other than the Gemini API.
4. Type any design description in the theme input field (e.g. `"brutalist newspaper"`, `"cozy dark cafe"`) and click **Apply**.

The app calls `gemini-2.5-flash` to produce a complete CSS theme from your prompt, which is then applied immediately without a page reload.

## Adding a New Theme Manually

Add an entry to `STYLE_PRESETS` in `gardener.js` following the existing pattern. Each theme overrides CSS custom properties (and optionally adds component-specific rules).

## Disclaimer

This project is for design experimentation purposes only and has no direct affiliation with any existing brands. All trademarks and direct brand representations have been excluded.
