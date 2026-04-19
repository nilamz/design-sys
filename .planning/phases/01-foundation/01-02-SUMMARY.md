---
phase: 01-foundation
plan: 02
subsystem: ui
tags: [css-custom-properties, tailwindcss, design-tokens, theming, dark-mode]

# Dependency graph
requires:
  - phase: 01-01
    provides: Vite+React+TS scaffold, Tailwind v4 plugin, src/tokens/ and src/styles/ directories, globals.css placeholder
provides:
  - Complete --truf-* CSS custom property token system (7 files, 80+ variables)
  - Tailwind utility classes mapped to design tokens via @theme inline (bg-forest-*, text-lime-*, rounded-pill, font-display, shadow-glow, etc.)
  - Dark-default semantic aliases (:root) using forest/cream/mint/lime brand palette
  - Light theme overrides via [data-theme="light"] attribute
  - Token demo page (App.tsx) with color swatches, typography showcase, theme toggle
affects: [03-components, 04-documentation]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Tailwind v4 @theme inline: all token-based values use @theme inline {} because var() refs require inline evaluation"
    - "Token cascade: token files are primitive-only (:root --truf-* values), semantic aliases live in globals.css only"
    - "Dark-first Truf brand: :root sets forest-900 bg / cream text / lime-500 accent; light mode is the opt-in variant"
    - "Reference HTML extraction: all token values copied verbatim from truf-design-system.html (not approximated)"

key-files:
  created:
    - src/tokens/colors.css
    - src/tokens/typography.css
    - src/tokens/spacing.css
    - src/tokens/shadows.css
    - src/tokens/radius.css
    - src/tokens/motion.css
    - src/tokens/z-index.css
    - src/tokens/index.css
  modified:
    - src/styles/globals.css
    - src/App.tsx

key-decisions:
  - "Semantic aliases use exact reference HTML values: forest-900 bg, --truf-cream text-primary, --truf-mint-300 text-secondary, rgba(143,238,170,0.12) border — not neutral-based as plan template suggested"
  - "@theme inline (not @theme): required because all mapped values use var() references to CSS custom properties"
  - "Token files are primitive-only: no --bg/--surface/--accent in token files, semantic aliases exclusively in globals.css"
  - "z-index values from reference HTML: modal=400, toast=600, tooltip=800 (not the plan's 300/400/500 template values)"

patterns-established:
  - "CSS token pattern: primitive tokens in src/tokens/*.css, semantic aliases in globals.css, @theme inline in globals.css"
  - "Import order matters: @import tailwindcss first, then @import tokens, then @theme inline block"

requirements-completed: [TOKEN-01, TOKEN-02, TOKEN-03, TOKEN-04, TOKEN-05, TOKEN-06, TOKEN-07, STYLE-01, STYLE-02, STYLE-03, STYLE-04, STYLE-05]

# Metrics
duration: 7min
completed: 2026-04-19
---

# Phase 01 Plan 02: Design Token CSS Architecture Summary

**Seven --truf-* CSS token files (80+ variables) wired into Tailwind v4 @theme inline mapping with dark-first semantic aliases using exact Truf brand values from reference HTML**

## Performance

- **Duration:** 7 min
- **Started:** 2026-04-19T19:39:35Z
- **Completed:** 2026-04-19T19:46:33Z
- **Tasks:** 2
- **Files modified:** 10

## Accomplishments
- All seven token CSS files created with exact --truf-* values extracted verbatim from truf-design-system.html reference
- globals.css fully wired: @import tailwindcss, @import tokens, @theme inline, dark :root aliases, [data-theme="light"] overrides
- Tailwind utility classes (bg-forest-500, font-display, rounded-pill, shadow-glow, p-4, etc.) all resolve to --truf-* custom properties
- Token demo App.tsx demonstrates color swatches for all scales, three font families, semantic alias card, radii/shadows showcase, live theme toggle
- npm run build passes cleanly: 17.62kB CSS with Tailwind utilities referencing token values

## Task Commits

Each task was committed atomically:

1. **Task 1: Create all seven token CSS files with exact --truf-* values** - `3cdb86b` (feat)
2. **Task 2: Wire globals.css with Tailwind @theme mapping and dark/light theme system** - `0ce4b10` (feat)

**Plan metadata:** _(added after this commit)_

## Files Created/Modified
- `src/tokens/colors.css` - Forest (10), lime (10), mint (5), neutral (9), cream (2), semantic (4) = 40 color vars
- `src/tokens/typography.css` - 3 font families, 10 size steps xs-6xl, 6 weights, 3 line heights
- `src/tokens/spacing.css` - 13 spacing values on 4px base (0 to 96px)
- `src/tokens/shadows.css` - Elevation scale xs-xl plus lime-tinted shadow-glow
- `src/tokens/radius.css` - none/sm/md/lg/xl/pill/full tokens
- `src/tokens/motion.css` - 3 easing curves (standard/emphasized/decelerated), 4 durations (fast/base/slow/slower)
- `src/tokens/z-index.css` - 6-layer stacking scale (base=1 through tooltip=800)
- `src/tokens/index.css` - 7 @import statements aggregating all token files
- `src/styles/globals.css` - Full implementation: tailwindcss import, tokens import, @theme inline, dark :root, light override, base body styles
- `src/App.tsx` - Token demo: color swatches, typography, semantic card, radii, shadows, theme toggle

## Decisions Made
- Used exact semantic alias values from reference HTML (forest-900/cream/mint-300/lime-500) rather than plan template's neutral-based fallback — the reference HTML is the source of truth for Truf brand
- Used `@theme inline` because all mapped values are `var()` references (Tailwind v4 requires `inline` keyword when mapping CSS vars)
- z-index values match reference HTML exactly: modal=400, toast=600, tooltip=800 (plan template had 300/400/500)
- Token files contain only primitive `--truf-*` values; all semantic aliases (`--bg`, `--surface`, `--accent`) live exclusively in globals.css

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Corrected z-index values to match reference HTML**
- **Found during:** Task 1
- **Issue:** Plan's z-index token list had modal=300, toast=400, tooltip=500 but reference HTML has modal=400, toast=600, tooltip=800
- **Fix:** Used reference HTML values verbatim (base=1, sticky=100, drawer=200, modal=400, toast=600, tooltip=800)
- **Files modified:** src/tokens/z-index.css
- **Committed in:** 3cdb86b (Task 1 commit)

**2. [Rule 1 - Bug] Used forest-based dark theme aliases instead of neutral-based**
- **Found during:** Task 2
- **Issue:** Plan's globals.css template used neutral-950/900/800 for dark theme, but important_context and reference HTML specify forest-900/800/700 with cream text and rgba(143,238,170,0.12) border
- **Fix:** Applied exact reference HTML semantic alias values for both dark (:root) and light ([data-theme="light"]) themes
- **Files modified:** src/styles/globals.css
- **Committed in:** 0ce4b10 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (both Rule 1 — correcting plan template values to match reference HTML source of truth)
**Impact on plan:** Both fixes essential for authentic Truf brand reproduction. No scope creep.

## Issues Encountered
None — build passed cleanly on first attempt.

## User Setup Required
None — no external service configuration required.

## Next Phase Readiness
- Complete token foundation ready for Plan 03 (component development)
- All Tailwind utility classes (bg-forest-*, text-lime-*, rounded-pill, font-display, shadow-glow) work correctly
- Dark/light theme system tested and functional
- Token demo page (npm run dev) provides visual verification of all design values
- src/tokens/ directory fully populated — components can use --truf-* primitives or utility classes

## Self-Check: PASSED

All created files confirmed present on disk. Both task commits (3cdb86b, 0ce4b10) verified in git log.

---
*Phase: 01-foundation*
*Completed: 2026-04-19*
