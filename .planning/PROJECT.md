# Truf Design System

## What This Is

A React + TypeScript component library implementing the Truf design system — the visual language for an AI-powered biometric verification platform. Built with Vite, styled with Tailwind CSS v4, documented with Storybook 8, and published as an npm package. Provides design tokens, themed components, and a dark-first + light theme system rooted in forest green, vibrant lime, and cream.

## Core Value

Every component and token faithfully reproduces the Truf brand language from the reference design system HTML — consistent, accessible, and ready to drop into any Truf product.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Project scaffolded with Vite + React + TypeScript
- [ ] Tailwind CSS v4 configured and integrated
- [ ] Storybook 8 set up for component documentation
- [ ] Design tokens defined as JSON files (colors, spacing, typography, radii, shadows, motion)
- [ ] globals.css generates CSS custom properties from all tokens
- [ ] Tailwind config mapped to token values
- [ ] Dark theme (default) + Light theme with data-theme switching
- [ ] Button component (contained, outlined, text variants; sm, md, lg sizes; disabled state)
- [ ] Input component (with label, placeholder, focus ring, help text, field group)
- [ ] Card component (hover elevation, border highlight)
- [ ] Badge component (lime, forest, mint, outline variants)
- [ ] Chip component (active/inactive filter-style)
- [ ] Alert component (success, warning, error, info with left border)
- [ ] Switch component (toggle with checked state)
- [ ] Checkbox component (with checked state and checkmark)
- [ ] Tabs component (with active indicator)
- [ ] Progress component (bar with fill)
- [ ] Skeleton component (shimmer loading animation)
- [ ] Toast component (notification with slide-in animation)
- [ ] Each component has .tsx, .stories.tsx, .test.tsx, and index.ts
- [ ] Barrel export from src/index.ts
- [ ] Package configured for npm publishing (exports, build pipeline)

### Out of Scope

- Layout components (sidebar, app shell, grid system) — application-level, not design system
- Page templates or full-page compositions — consuming apps handle layout
- Icon library — use Lucide or similar externally
- Backend integration or API calls — pure UI library
- Mobile-native components — web only

## Context

The reference implementation is a single HTML file (`truf-design-system.html`) containing:
- **Brand colors:** Forest green (primary, 50-900 scale), Lime green (accent, 50-900), Mint (supporting, 50-400), Neutrals (50-900), Cream, and semantic colors (success, warning, error, info)
- **Typography:** Three font families — Fraunces (display/serif for headings), Inter (sans for body), JetBrains Mono (mono for code/labels). Type scale from xs (12px) to 6xl (60px).
- **Spacing:** 4px base unit, scale from 0 to space-24 (96px)
- **Radii:** sm (8px), md (12px), lg (16px), xl (24px), pill (64px), full (9999px)
- **Shadows:** xs through xl plus a glow effect using lime green
- **Motion:** Three easing curves (standard, emphasized, decelerated) with four durations (fast 150ms, base 220ms, slow 320ms, slower 480ms)
- **Z-index:** Layered scale (base, sticky, drawer, modal, toast, tooltip)
- **Theming:** Dark-first design with CSS custom properties for semantic aliases (--bg, --surface, --text-primary, --accent, etc.) that swap between dark and light via `[data-theme="light"]`
- **Components:** Buttons (contained/outlined/text, sizes), Inputs (with field groups), Cards, Badges, Chips, Alerts, Switches, Checkboxes, Tabs, Progress bars, Skeletons, Toasts

## Constraints

- **Stack:** React 18+ with TypeScript, Vite as build tool, Tailwind CSS v4, Storybook 8
- **Token format:** JSON files in src/tokens/ — single source of truth consumed by globals.css and Tailwind config
- **Component structure:** Each component in its own folder under src/components/ with .tsx, .stories.tsx, .test.tsx, and index.ts
- **Publishing:** Must be configured as a publishable npm package with proper exports
- **Fidelity:** Token values must match the reference HTML exactly (colors, spacing, type scale, radii, shadows, motion)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Tailwind CSS v4 over v3 | Latest version, CSS-first config, better DX | — Pending |
| Storybook 8 | Latest stable, improved React/Vite support | — Pending |
| JSON tokens over TS | Portable format, can feed CSS and Tailwind equally | — Pending |
| Dark-first theming | Matches Truf brand identity from reference HTML | — Pending |
| Three font families | Fraunces + Inter + JetBrains Mono per brand spec | — Pending |
| Pill border-radius for buttons | Matches reference HTML button styling (64px radius) | — Pending |

---
*Last updated: 2026-04-19 after initialization*
