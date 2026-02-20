# Generative Hacker News (Acephale Garden)

## Project Overview
**Generative Hacker News** is an experimental project that dynamically transforms the Hacker News interface into various corporate brand design systems (Generative UI). 
Based on the Acephale OS concept, it treats UI not as a fixed entity, but as something "generative and interchangeable."

## Core Features
- **Real-time HN Integration**: Dynamically fetches the latest top stories using the Hacker News API.
- **Brand Identity Swap**: Instantly applies the "essence" of iconic brands like Apple, Google, Samsung, and Cyberpunk 2077 via CSS injection.
- **Infinite Scrolling**: Provides a modern infinite scroll experience where cards stack up, replacing the original pagination via the "More" button.
- **Sticky Footer**: Responsive footer layouts tailored to each brand's design language.

## Tech Stack
- **Frontend**: HTML5, Vanilla JavaScript (ES6+).
- **Styling**: Dynamic CSS Injection via JavaScript.
- **API**: Hacker News Firebase API.
- **No Build Step**: No dependencies; runs directly in the browser.

## Key Files
- **`index.html`**: The application skeleton. Provides the floating UI for theme control and the data display area for HN stories.
- **`gardener.js`**: 
    - Holds CSS presets for each brand (STYLE_PRESETS).
    - Handles data fetching and formatting from the HN API (HNData).
    - Manages DOM operations and events (App).

## Available Themes (Keywords)
Enter the following keywords into the prompt input field at the bottom right to apply themes:
- `Apple`: Sophisticated transparency and SF Pro typography.
- `Google`: Clean UI featuring Material Design and Product Sans vibes.
- `Samsung`: Large rounded cards inspired by One UI.
- `Cyberpunk 2077`: Striking yellow and glitch-inspired black design.

## Development Status
- **Current State**: Stable prototype. Real-time data integration and core brand implementations are complete.
- **Future Plans**: Implementation of story details (comments) and additional brands (e.g., Nintendo, Sony).
