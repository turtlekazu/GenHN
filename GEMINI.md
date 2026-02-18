# Acephale Task / CSS Gen Garden

## Project Overview
**Acephale Task** (also referred to as "CSS Gen Garden") is a frontend task management application prototype. Its unique feature appears to be the ability to generate UI designs based on user prompts (e.g., "80s neon style", "Zen garden").

The project embraces a "Headless Future" theme (`Acephale OS`).

## Architecture & Tech Stack
- **Frontend:** HTML5, Vanilla JavaScript.
- **Styling:** Dynamic CSS generation (intended).
- **No Build Step:** Currently runs as a static site.

## Key Files
- **`index.html`**: The main entry point. It contains the DOM structure for the task board, input controls, and a text area for design prompts. It references `gardener.js`.
- **`gardener.js`**: The main script file. currently empty. It is intended to handle task management logic and the AI-driven style generation.
- **`.entire/`**: Directory containing configuration for the `entire` tool (likely an AI or version control assistant).

## Usage
1.  **Run:** Open `index.html` directly in a web browser.
2.  **Interact:**
    -   Add tasks via the "Add" button.
    -   Enter a design prompt in the textarea and click "Generate UI" to change the look and feel (Implementation pending in `gardener.js`).

## Development Status
- **Current State:** Prototype / Skeleton.
- **Pending:** Implementation of `gardener.js` to make the application functional (handling events, managing state, API integration for CSS generation).
