# GenHN

An experimental project that dynamically reconstructs the Hacker News interface using the visual "essence" of world-renowned products and design systems.

## Core Identity

- **Design Essence Swap**: Translate a given design language into the Hacker News UI — reproducing its color, shape, motion, and atmosphere.
- **Modern Web Aesthetics**: Leverage glassmorphism, advanced animations, and typographic refinement as a baseline.

## Development Guidelines

- **Trademark Neutrality**: Reproduce the "color", "shape", and "motion" of a brand — never its name or trademarked elements directly.
- **Surgical Styling**: Add new themes to `STYLE_PRESETS` in `presets.js`. Each entry is a self-contained CSS string using custom properties.
- **Performance**: Prefer CSS variables and transitions over JavaScript-driven style changes for smooth, low-overhead theming.
- **Contrast Law**: Always ensure readable contrast — dark backgrounds require light text (`#e0e0e0+`), light backgrounds require dark text (`#1a1a1a`). Never pair similar-value colors.
- **Theme Completeness**: A theme must define all four dimensions — Layout, Interaction, Atmosphere, and Identity. Color-only changes are insufficient.
