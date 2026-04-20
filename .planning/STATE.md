# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-19)

**Core value:** Every component and token faithfully reproduces the Truf brand language — consistent, accessible, and ready to drop into any Truf product.
**Current focus:** Phase 4 - Data Display Components

## Current Position

Phase: 4 of 4 (Package & Publish)
Plan: 1 of 1 in current phase
Status: Phase complete — all 1 plans done
Last activity: 2026-04-20 - Completed plan 04-01: Barrel export, Vite library build, npm package config

Progress: [██████████] 100%

## Performance Metrics

**Velocity:**
- Total plans completed: 7
- Average duration: 5.7 min
- Total execution time: 0.58 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 2 | 27 min | 13.5 min |
| 02-core-interactive-components | 2 | 6 min | 3 min |
| 03-display-feedback-components | 3 | 13 min | 4.3 min |

**Recent Trend:**
- Last 5 plans: 20 min
- Trend: —

*Updated after each plan completion*
| Phase 03 P03 | 5 | 2 tasks | 10 files |
| Phase 04 P01 | 15 | 2 tasks | 6 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Initial: Tailwind CSS v4 (CSS-first config), Storybook 8, JSON tokens, dark-first theming, three font families (Fraunces/Inter/JetBrains Mono), pill border-radius for buttons
- 01-01: Tailwind v4 CSS-first config (no tailwind.config.js, @import "tailwindcss" + @theme blocks in CSS)
- 01-01: Dark-first theming — Storybook defaultTheme dark, empty string = no attribute, light sets data-theme="light"
- 01-01: Storybook 10.3.5 (latest stable) installed — same API as Storybook 8 specified in plan
- 01-02: @theme inline required (not @theme) when mapping CSS var() references in Tailwind v4
- 01-02: Semantic aliases use forest-900/cream/mint-300 (Truf brand palette from reference HTML), not neutral-based fallbacks
- 01-02: Token files are primitive-only; all semantic aliases live exclusively in globals.css
- 02-01: Test files use React createRoot + DOM assertions — @testing-library/react not installed; avoids new dependency
- 02-01: components.css added as separate file imported in globals.css — cleaner than bloating globals.css with component pseudo-element CSS
- 02-02: Switch outer label holds switch-checked class so CSS descendant selectors fire correctly
- 02-02: Tabs active indicator uses mb-[-1px] + border-b-2 to overlap container border — critical -1px overlap pattern
- 02-02: Storybook stories use render + useState for controlled components (Switch/Checkbox/Tabs)
- 03-01: Alert uses border-0 border-l-4 border-solid to isolate left border (Tailwind conflict Pitfall 4)
- 03-01: Chip renders as button element for semantic clickability
- 03-01: variantConfig Record<Variant, { color, bg }> pattern for multi-property variant lookup in Alert
- 03-02: Toast is controlled component — parent manages visible state, matching Switch/Checkbox pattern
- 03-02: z-[600] arbitrary Tailwind value for --truf-z-toast (z-index tokens not in @theme, use arbitrary values per Pitfall 2)
- 03-02: vitest config only runs .stories.tsx via @storybook/addon-vitest browser runner; .test.tsx files exist but not executed
- [Phase 03-03]: Polyline used as direct component import — @vis.gl/react-google-maps v1.x exports it directly, no useMap useEffect needed
- [Phase 03-03]: RideMap tests mock entire @vis.gl/react-google-maps via vi.mock() — JSDOM cannot initialize Google Maps JS API
- [Phase 03-03]: Pin marker colors hardcoded as hex (#2DD653, #061A13) — Google Maps JS API cannot read CSS custom properties
- [Phase 03-03]: Empty apiKey renders fallback placeholder div — enables Storybook NoApiKey story and container tests without credentials
- 04-01: Build script order is vite build then tsc — vite cleans dist first, tsc adds declarations after
- 04-01: cssFileName belongs in build.lib (not build root) in Vite 8.x
- 04-01: CSS imported in index.ts so Tailwind plugin processes it during library build; cssFileName names the output styles.css
- 04-01: react/react-dom/@vis.gl moved to devDependencies — listed as peerDependencies, needed for dev but not bundled
- 04-01: globals.css.d.ts created alongside globals.css to satisfy allowArbitraryExtensions in tsconfig.lib.json

### Pending Todos

None yet.

### Blockers/Concerns

None yet.

### Quick Tasks Completed

| # | Description | Date | Commit | Directory |
|---|-------------|------|--------|-----------|
| 1 | Connect to GitHub repo and push all commits | 2026-04-19 | bd2677e | [1-connect-github](./quick/1-connect-to-github-repo-and-push-all-comm/) |

## Session Continuity

Last session: 2026-04-20
Stopped at: Completed 04-01-PLAN.md — Barrel export, Vite library build, npm package config. Phase 4 plan 1 of 1 done. All phases complete.
Resume file: None
