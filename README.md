# Generative Hacker News (Acephale Garden)

An experimental web interface that dynamically transforms the Hacker News experience using design systems from iconic brands.

![Generative UI Concept](https://img.shields.io/badge/UI-Generative-blueviolet)
![Real-time Data](https://img.shields.io/badge/Data-Hacker%20News%20API-orange)

## 🌟 Overview
**Generative Hacker News** is a proof-of-concept for "Headless UI" where the interface is not fixed but generated and swapped on the fly. By entering a brand name, the entire CSS is injected to mirror the brand's unique design identity—all while browsing real-time stories from Hacker News.

## 🚀 Key Features
- **Live HN Data**: Powered by the official Hacker News API.
- **Brand Swap Engine**: Instantly switch between Apple, Google, Samsung, and Cyberpunk 2077 themes.
- **Modern Feed**: Infinite scrolling experience for seamless browsing.
- **Zero Build Step**: Pure HTML/JS/CSS. No installation required.

## 🛠 Usage
1.  Open `index.html` in any modern web browser.
2.  Browse the latest news from the front page.
3.  **To change the theme**: Use the floating prompt bar at the bottom right.
    -   Try typing: `Apple`, `Google`, `Samsung`, or `Cyberpunk 2077`.
4.  Click **"Apply"** (or press Enter) to witness the transformation.

## 🎨 Available Themes
- **Apple**: Clean, glassmorphism, and San Francisco typography.
- **Google**: Material Design logic with a focus on whitespace and Roboto.
- **Samsung**: One UI-inspired rounded corners and bold, accessible cards.
- **Cyberpunk 2077**: High-contrast yellow and black with a glitch-aesthetic edge.
- **Nintendo**: Playful red-and-white design with Switch-inspired bold elements.
- **SONY**: Sleek PlayStation-inspired minimalism with glowing blue accents.
- **OpenAI**: Dark, modern "ChatGPT" aesthetic with monospace fonts.
- **Anthropic**: Focus on readability with beige backgrounds and serif typography.
- **Anker**: Reliable, product-focused layout with tech-blue accents.

## 📂 Project Structure
- `index.html`: The semantic structure of the HN interface.
- `gardener.js`: The "brain" handling both the Brand CSS presets and HN API orchestration.
- `GEMINI.md`: Detailed developer-focused project context.

---
*Part of the Acephale OS / Generative UI experiment.*
