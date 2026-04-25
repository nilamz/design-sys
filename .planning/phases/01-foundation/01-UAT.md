---
status: testing
phase: 01-foundation
source: 01-01-SUMMARY.md, 01-02-SUMMARY.md
started: 2026-04-25T12:00:00Z
updated: 2026-04-25T12:00:00Z
---

## Current Test

number: 1
name: Dev Server Starts
expected: |
  Running `npm run dev` starts the Vite dev server with no errors. Opening the URL in your browser loads a token demo page (not a blank screen).
awaiting: user response

## Tests

### 1. Dev Server Starts
expected: Running `npm run dev` starts the Vite dev server with no errors. Opening the URL in your browser loads a token demo page (not a blank screen).
result: [pending]

### 2. Storybook Starts
expected: Running `npm run storybook` opens Storybook in the browser with no errors. The sidebar is visible and the theme toggle (dark/light) appears in the toolbar.
result: [pending]

### 3. Dark Theme is Default
expected: Both the dev page and Storybook load with a dark theme by default — dark forest-green background (#061A13 or similar deep green), light cream-colored text. This is the Truf brand dark palette.
result: [pending]

### 4. Light Theme Toggle
expected: Using the Storybook toolbar theme toggle to switch to "light" changes the page to a light background with dark text. Switching back restores the dark theme. The toggle works without page reload.
result: [pending]

### 5. Google Fonts Render
expected: Three distinct font families are visible: Inter (clean sans-serif for body text), Fraunces (decorative serif for display/headings), and JetBrains Mono (monospace for code). They should look noticeably different from each other — not all rendering as the same fallback font.
result: [pending]

### 6. Color Swatches Display
expected: The token demo page (dev server) shows color swatches for all scales: forest greens (10 shades), lime greens (10 shades), mint (5 shades), neutral grays (9 shades), and cream (2 shades). Each swatch should show a distinct color value.
result: [pending]

### 7. CSS Custom Properties in DevTools
expected: Opening browser DevTools and inspecting the :root element shows --truf-* CSS custom properties (e.g., --truf-forest-500, --truf-lime-500, --truf-spacing-4, --truf-radius-pill). There should be 80+ custom properties.
result: [pending]

### 8. Build Succeeds
expected: Running `npm run build` completes with no errors and produces output in the dist/ folder. No TypeScript or Tailwind errors.
result: [pending]

## Summary

total: 8
passed: 0
issues: 0
pending: 8
skipped: 0

## Gaps

