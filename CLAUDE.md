# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Acephale is a vanilla JavaScript web application that dynamically reconstructs the Hacker News interface using different design "essences" (brand-inspired visual systems). It's a design experimentation tool with no build system or external dependencies.

## Running the Application

Open `index.html` directly in a modern web browser. No build step, package manager, or server required.

**Browser requirements:** View Transition API (with graceful fallback), CSS variables, ES6+

## Architecture

The entire application lives in two files:

- **`index.html`** - Static DOM structure (header, story list, control panel)
- **`gardener.js`** (~1,200 lines) - All application logic organized as:
  - `SYSTEM_STYLE` - Base CSS with layout, glassmorphism effects, responsive design
  - `STYLE_PRESETS` - Theme definitions using CSS variables (10 built-in themes)
  - `HNData` object - Hacker News API integration (fetching stories by feed type)
  - `App` object - Main controller (theming, rendering, event handling, localStorage persistence)

### Theme System

Themes are defined in `STYLE_PRESETS` using CSS custom properties. Each theme provides:
- CSS variables for colors, fonts, spacing
- Component-specific styles
- Mobile-specific overrides

To add a new theme: Add an entry to `STYLE_PRESETS` in `gardener.js` following the existing pattern.

### API Integration

- Base URL: `https://hacker-news.firebaseio.com/v0`
- Feed types: `topstories`, `newstories`, `askstories`, `showstories`, `jobstories`
- Batch fetching: 30 stories per request

## Development Guidelines

From GEMINI.md (project guidelines):

- **Trademark Neutrality**: Reproduce the "color", "shape", and "motion" of brands, not brand names or trademarked elements directly
- **Surgical Styling**: Add new themes to `STYLE_PRESETS` in `gardener.js`
- **Performance**: Use CSS variables and transitions for smooth theming

## Code Conventions

- HTML classes: `hn-{component}-{element}` (kebab-case with `hn-` prefix)
- JS functions: camelCase
- CSS variables: `--kebab-case`
- HTML escaping via `App.escapeHtml()` for all user-generated content (XSS prevention)
