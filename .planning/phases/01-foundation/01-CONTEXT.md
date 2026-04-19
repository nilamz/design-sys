# Phase 1: Foundation - Context

**Gathered:** 2026-04-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Project scaffold (Vite + React 18 + TypeScript), all design tokens defined, CSS custom properties generated, Tailwind config mapped to tokens, Storybook 8 running, and dark/light theme system working.

</domain>

<decisions>
## Implementation Decisions

### Token format
- Tokens as **CSS files** (not JSON) in `src/tokens/`
- Each token category gets its own `.css` file with CSS custom properties
- Files: `colors.css`, `typography.css`, `spacing.css`, `shadows.css`, `radius.css`
- `index.css` imports all token files as a single entry point
- Naming convention: `--truf-*` prefix matching the reference HTML exactly

### Token file structure
- `colors.css` — All color scales (forest 50-900, lime 50-900, mint 50-400, neutral 50-900, cream, semantic)
- `typography.css` — Font families (sans: Inter, mono: JetBrains Mono, display: Fraunces), sizes xs-6xl, weights, line heights
- `spacing.css` — 4px base unit scale (0-96px)
- `shadows.css` — xs through xl + glow (lime-tinted)
- `radius.css` — none, sm, md, lg, xl, pill, full

### Additional token files
- Motion tokens (easing curves, durations) and z-index scale also need CSS files
- `motion.css` — easings (standard, emphasized, decelerated) and durations (fast, base, slow, slower)
- `z-index.css` — layered scale (base, sticky, drawer, modal, toast, tooltip)

### Tailwind config mapping
- Tailwind config extends (not replaces) with exact token values from the reference HTML
- Utility classes reference the CSS custom properties

### Theme system
- Dark theme is default — semantic aliases (--bg, --surface, --text-primary, --accent, etc.) in `:root`
- Light theme via `[data-theme="light"]` override block
- Semantic aliases match the reference HTML exactly

### Font loading
- Google Fonts via CDN link (matching reference HTML: Inter, JetBrains Mono, Fraunces)

### Project structure (user-specified)
```
Design-Sys/
  src/
    tokens/
      colors.css
      typography.css
      spacing.css
      shadows.css
      radius.css
      motion.css
      z-index.css
      index.css       ← imports all token files
    components/       ← empty for now, Phase 2+
    styles/globals.css ← theme aliases + token import
    index.ts          ← barrel export
  .storybook/
  tailwind.config.ts
  package.json
  tsconfig.json
```

### Claude's Discretion
- Exact Tailwind config structure and plugin choices
- Storybook addon selection
- Build tool configuration details
- Whether to use Tailwind v4's CSS-first config or traditional JS config

</decisions>

<specifics>
## Specific Ideas

- Token values must match the reference HTML (`truf-design-system.html`) exactly — no approximations
- CSS variable naming follows `--truf-*` convention from the HTML (e.g., `--truf-forest-500`, `--truf-lime-400`)
- User explicitly provided the folder structure — follow it precisely

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-04-19*
