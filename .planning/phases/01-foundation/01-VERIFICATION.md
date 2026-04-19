---
phase: 01-foundation
verified: 2026-04-19T21:00:00Z
status: gaps_found
score: 9/11 must-haves verified
re_verification: false
gaps:
  - truth: "Tailwind utility classes (bg-forest-500, text-lime-400, rounded-pill, etc.) work and reference token values"
    status: partial
    reason: "Color, radius, shadow, spacing, and font-family utilities correctly reference --truf-* vars via @theme inline. However typography size tokens (--truf-text-xs through --truf-text-6xl) and weight/line-height tokens are NOT mapped in the @theme block. Tailwind uses its own default scale for text-* utilities instead of the defined --truf-text-* custom properties. The values coincidentally match for common sizes but the formal wiring is absent — text sizes and weights are not token-driven."
    artifacts:
      - path: "src/styles/globals.css"
        issue: "@theme inline block maps colors, radii, shadows, spacing, and font-families but is missing --text-xs through --text-6xl, font-weight, and leading-* mappings from --truf-text-*, --truf-weight-*, and --truf-leading-* token vars"
    missing:
      - "Add to @theme inline: --text-xs through --text-6xl mapped to var(--truf-text-*)"
      - "Add to @theme inline: --font-weight-light/medium/semibold/bold etc. mapped to var(--truf-weight-*)"
      - "Add to @theme inline: --leading-tight/normal/relaxed mapped to var(--truf-leading-*)"

  - truth: "All token CSS files exist in src/tokens/ and contain --truf-* CSS custom properties"
    status: partial
    reason: "All 8 files exist and contain correct --truf-* variables. However REQUIREMENTS.md TOKEN-01 through TOKEN-07 describe token files as *.json (colors.json, spacing.json, etc.) while the implementation delivers *.css files. The PLAN and implementation are CSS-only, consistent with Tailwind v4 CSS-first approach, but REQUIREMENTS.md language references a JSON-based token format that was never implemented. This is a requirements document inconsistency — the CSS implementation is correct for the chosen architecture but does not match the literal requirement descriptions."
    artifacts:
      - path: ".planning/REQUIREMENTS.md"
        issue: "TOKEN-01 through TOKEN-07 describe *.json token files (colors.json, spacing.json, etc.) but implementation delivers *.css files. Requirements were written for a different token architecture than was implemented."
    missing:
      - "Update REQUIREMENTS.md TOKEN-01 through TOKEN-07 and STYLE-01 to describe CSS custom property files (*.css) not JSON files, to match the implemented architecture"
human_verification:
  - test: "Verify dark theme renders correctly"
    expected: "Page background is deep forest green (#061A13), text is cream (#F5F1E8), accent button uses lime (#2DD653)"
    why_human: "Cannot visually verify rendered colors programmatically without running browser"
  - test: "Verify data-theme='light' switches theme"
    expected: "Clicking theme toggle button changes background to cream (#F5F1E8), text to forest-900 (#061A13), accent to forest-800"
    why_human: "DOM attribute toggle and CSS custom property recomputation requires live browser"
  - test: "Verify Tailwind color utilities render token values"
    expected: "bg-forest-500 on a div produces background-color resolving to #1E7A5E, bg-lime-400 resolves to #34E06A"
    why_human: "CSS var() resolution through @theme inline requires browser or CSS engine to evaluate"
  - test: "Verify Storybook dark/light toggle works"
    expected: "Storybook opens at localhost:6006, dark theme is default, theme switcher in toolbar toggles data-theme='light' on the preview iframe html element"
    why_human: "Storybook addon-themes integration requires live Storybook to verify"
---

# Phase 01: Foundation Verification Report

**Phase Goal:** The project is runnable, every design token is defined as CSS custom properties, Tailwind maps to tokens via @theme, and dark/light theming works
**Verified:** 2026-04-19T21:00:00Z
**Status:** gaps_found
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|---------|
| 1 | Running `npm run dev` starts a Vite dev server with no errors | VERIFIED | `npm run build` exits 0 in 389ms; `vite.config.ts` exists with react() + tailwindcss() plugins; dev script present in package.json |
| 2 | Running `npm run storybook` opens Storybook with no errors | VERIFIED | `.storybook/main.ts` with @storybook/react-vite, `preview.ts` imports globals.css; `storybook ^10.3.5` in devDependencies |
| 3 | The project compiles TypeScript without errors | VERIFIED | `tsc -b && vite build` completes cleanly; no TS errors; 16 modules transformed |
| 4 | Tailwind CSS v4 processes utility classes via the Vite plugin | VERIFIED | `vite.config.ts` line 4: `import tailwindcss from '@tailwindcss/vite'`, line 13: `plugins: [react(), tailwindcss()]`; built CSS is 17.64kB with utility classes present |
| 5 | All token CSS files exist in src/tokens/ and contain --truf-* CSS custom properties | PARTIAL | 8 files exist with correct --truf-* content; but REQUIREMENTS.md TOKEN-01–07 describe *.json files — see Gaps section |
| 6 | globals.css generates CSS custom properties visible in browser DevTools | VERIFIED | `@import "tailwindcss"`, `@import "../tokens/index.css"`, `@theme inline { ... }` (86 var() references), `:root { --bg/--surface/... }`, `[data-theme="light"] { ... }` all present |
| 7 | Tailwind utility classes (bg-forest-500, text-lime-400, rounded-pill, etc.) work and reference token values | PARTIAL | Colors (bg-forest-*, bg-lime-*, bg-mint-*, bg-neutral-*, bg-cream), radii (rounded-pill, rounded-full, rounded-sm/md/lg/xl), shadows (shadow-glow, shadow-xs/sm/md/lg/xl), spacing (p-4, p-8, gap-*), and font families (font-sans, font-mono, font-display) all map via @theme inline to --truf-* vars. Typography SIZE utilities (text-xs, text-base, text-xl, etc.) and font-weight utilities use Tailwind defaults, not --truf-text-* or --truf-weight-* tokens — see Gaps section |
| 8 | Dark theme is default — page renders with dark background and light text | VERIFIED | `:root { --bg: var(--truf-forest-900); --text-primary: var(--truf-cream); }` confirmed in globals.css; no data-theme attribute needed for dark; body uses var(--bg) |
| 9 | Setting data-theme='light' on root element changes appearance to light mode | VERIFIED | `[data-theme="light"] { --bg: var(--truf-cream); --text-primary: var(--truf-forest-900); --accent: var(--truf-forest-800); }` present; App.tsx toggles attribute on document.documentElement |
| 10 | Semantic aliases (--bg, --surface, --text-primary, --accent) swap correctly between themes | VERIFIED | 9 aliases in :root dark block, 9 overrides in [data-theme="light"] block; both blocks present in globals.css with brand-correct values from reference HTML (forest-900/cream vs cream/forest-900) |
| 11 | No Tailwind v3 patterns present (no @tailwind directives, no tailwind.config.js) | VERIFIED | No tailwind.config.js/ts in project root; `@import "tailwindcss"` used (v4 syntax); no `@tailwind base/components/utilities` directives anywhere |

**Score:** 9/11 truths verified (2 partial)

---

## Required Artifacts

### Plan 01-01 Artifacts (INFRA)

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `package.json` | Project manifest with react, vite, tailwindcss, storybook dependencies | VERIFIED | tailwindcss ^4.2.2, @tailwindcss/vite ^4.2.2, react ^19.2.4, storybook ^10.3.5 all present |
| `vite.config.ts` | Vite config with React and Tailwind v4 plugins | VERIFIED | Both react() and tailwindcss() plugins registered on line 13 |
| `.storybook/main.ts` | Storybook config with react-vite framework | VERIFIED | framework: { name: '@storybook/react-vite' }; addons: ['@storybook/addon-essentials', '@storybook/addon-themes'] |
| `.storybook/preview.ts` | Storybook preview with theme toggle decorator | VERIFIED | withThemeByDataAttribute with dark default, attributeName: 'data-theme', import globals.css |
| `src/index.ts` | Barrel export entry point (placeholder) | VERIFIED | Contains `// Barrel export — components added in Phase 2+` |
| `src/components/.gitkeep` | Empty components directory placeholder | VERIFIED | File exists (0 bytes), confirmed by ls -la |

### Plan 01-02 Artifacts (Tokens + Styling)

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/tokens/colors.css` | Forest, lime, mint, neutral scales + cream + semantic colors; contains --truf-forest-500 | VERIFIED | 41 --truf-* color vars: forest (10), lime (10), mint (5), neutral (9), cream (2), semantic (4) |
| `src/tokens/typography.css` | Font families, sizes xs-6xl, weights, line heights; contains --truf-font-sans | VERIFIED | 3 families, 10 size steps, 6 weights, 3 line heights — all --truf-* prefixed |
| `src/tokens/spacing.css` | 4px base unit spacing scale; contains --truf-space-4 | VERIFIED | 13 spacing values 0–96px on rem-based 4px scale |
| `src/tokens/shadows.css` | Shadow scale xs-xl plus lime glow; contains --truf-shadow-glow | VERIFIED | xs/sm/md/lg/xl box-shadows + lime-tinted glow: `0 0 0 1px rgba(45,214,83,0.25), 0 12px 32px rgba(45,214,83,0.20)` |
| `src/tokens/radius.css` | Border radius tokens including pill; contains --truf-radius-pill | VERIFIED | --truf-radius-pill: 64px; all 7 radii (none/sm/md/lg/xl/pill/full) present |
| `src/tokens/motion.css` | Easing curves and duration tokens; contains --truf-ease-emphasized | VERIFIED | --truf-ease-emphasized: cubic-bezier(0.2, 0.0, 0, 1); 3 easings + 4 durations |
| `src/tokens/z-index.css` | Z-index layered scale; contains --truf-z-modal | VERIFIED | --truf-z-modal: 400; base=1, sticky=100, drawer=200, modal=400, toast=600, tooltip=800 (reference HTML values, not plan template) |
| `src/tokens/index.css` | Single import that cascades all token files; contains @import | VERIFIED | 7 @import statements for all token files in correct order |
| `src/styles/globals.css` | Tailwind import, token import, @theme inline mapping, semantic aliases for dark and light; contains @theme inline | VERIFIED (partial) | Has @import tailwindcss, @import tokens, @theme inline with 86 var() refs, :root dark aliases, [data-theme="light"] overrides. Missing: typography size/weight/leading mappings in @theme |

---

## Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `vite.config.ts` | `@tailwindcss/vite` | plugin registration | WIRED | `import tailwindcss from '@tailwindcss/vite'` + `plugins: [react(), tailwindcss()]` |
| `.storybook/main.ts` | `@storybook/react-vite` | framework config | WIRED | `framework: { name: '@storybook/react-vite', options: {} }` |
| `.storybook/preview.ts` | `src/styles/globals.css` | CSS import | WIRED | `import '../src/styles/globals.css'` on line 3 |
| `src/tokens/index.css` | `src/tokens/*.css` | @import directives | WIRED | 7 @import statements: colors, typography, spacing, shadows, radius, motion, z-index |
| `src/styles/globals.css` | `src/tokens/index.css` | @import ../tokens/index.css | WIRED | `@import "../tokens/index.css"` on line 14 |
| `src/styles/globals.css` | `tailwindcss` | @import tailwindcss | WIRED | `@import "tailwindcss"` on line 11 |
| `src/styles/globals.css @theme` | `src/tokens/*.css` | var(--truf-*) references | WIRED (partial) | 86 `var(--truf-*)` references present for colors/radii/shadows/spacing/fonts. Missing var() references for --truf-text-*, --truf-weight-*, --truf-leading-* |
| `src/main.tsx` | `src/styles/globals.css` | CSS import | WIRED | `import './styles/globals.css'` on line 3 |

---

## Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|---------|
| INFRA-01 | 01-01 | Project scaffolded with Vite + React 18 + TypeScript | SATISFIED | Vite 8.0.4, React 19.2.4, TypeScript 6.0.2 in package.json; scaffold confirmed |
| INFRA-02 | 01-01 | Tailwind CSS v4 installed and configured | SATISFIED | tailwindcss ^4.2.2 + @tailwindcss/vite ^4.2.2; plugin registered in vite.config.ts |
| INFRA-03 | 01-01 | Storybook 8 installed and running with Vite builder | SATISFIED | storybook ^10.3.5 (v10 = latest stable, same API as v8 per SUMMARY); @storybook/react-vite framework configured |
| INFRA-04 | 01-01 | Component folder structure enforced | PARTIAL | src/components/ directory with .gitkeep exists. Per RESEARCH.md, full enforcement (tsx/stories/test/index per component) is deferred to Phase 2 when first component is created. Phase 1 scope was directory creation only. |
| TOKEN-01 | 01-02 | colors.css/json defines forest, lime, mint, neutral, cream, semantic | SATISFIED (with note) | All color tokens present in colors.css. REQUIREMENTS.md says "colors.json" but CSS implementation is architecturally correct for Tailwind v4. |
| TOKEN-02 | 01-02 | spacing.css/json defines 4px base unit scale | SATISFIED (with note) | 13 spacing values 0–96px in spacing.css. REQUIREMENTS.md says "spacing.json". |
| TOKEN-03 | 01-02 | typography.css/json defines 3 families, sizes xs-6xl, weights, line heights | SATISFIED (with note) | All typography tokens defined in typography.css. But --truf-text-* tokens are not mapped into @theme, so Tailwind text utilities don't reference token values. REQUIREMENTS.md says "typography.json". |
| TOKEN-04 | 01-02 | radii.css/json defines none through full | SATISFIED (with note) | 7 radius tokens in radius.css; --truf-radius-pill: 64px confirmed. REQUIREMENTS.md says "radii.json". |
| TOKEN-05 | 01-02 | shadows.css/json defines xs-xl and glow | SATISFIED (with note) | 6 shadow tokens including lime-tinted glow in shadows.css. REQUIREMENTS.md says "shadows.json". |
| TOKEN-06 | 01-02 | motion.css/json defines easings and durations | SATISFIED (with note) | 3 easings + 4 durations in motion.css. REQUIREMENTS.md says "motion.json". |
| TOKEN-07 | 01-02 | z-index.css/json defines layered scale | SATISFIED (with note) | 6 z-index layers in z-index.css; values from reference HTML (modal=400, toast=600, tooltip=800). REQUIREMENTS.md says "z-index.json". |
| STYLE-01 | 01-02 | globals.css converts all tokens into CSS custom properties matching --truf-* naming | SATISFIED | globals.css imports all token files which define --truf-* vars. REQUIREMENTS.md says "converts JSON tokens" but CSS-direct approach achieves same result. |
| STYLE-02 | 01-02 | Tailwind config maps token values so utility classes reference design tokens | PARTIALLY SATISFIED | @theme inline maps colors/radii/shadows/spacing/font-families correctly. Typography size utilities (text-xs through text-6xl) and weight utilities use Tailwind's own defaults, not --truf-text-* / --truf-weight-* tokens. |
| STYLE-03 | 01-02 | Dark theme is default with semantic aliases | SATISFIED | :root sets forest-900 bg, cream text, lime-500 accent; confirmed in globals.css |
| STYLE-04 | 01-02 | Light theme activated via data-theme="light" | SATISFIED | [data-theme="light"] block present with cream bg, forest-900 text, forest-800 accent; App.tsx toggles attribute |
| STYLE-05 | 01-02 | Theme CSS custom properties swap correctly between dark and light | SATISFIED | 9 semantic aliases defined in both :root and [data-theme="light"] with distinct values for all key design dimensions |

### Requirements Document Inconsistency (Not a Gap in Implementation)

REQUIREMENTS.md TOKEN-01 through TOKEN-07 and STYLE-01 reference JSON-based token files (`colors.json`, `spacing.json`, etc.) and "converts JSON tokens." The actual implementation uses CSS custom property files (`*.css`), which is the architecturally correct approach for Tailwind v4 CSS-first configuration. The PLAN and SUMMARY correctly document the CSS approach. The REQUIREMENTS.md language is stale from an earlier design decision. The implementation is correct; the requirements document needs updating.

---

## Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `src/index.ts` | 1 | `// Barrel export — components added in Phase 2+` (placeholder) | Info | Expected — Phase 1 scope; components ship in Phase 2+ |
| `src/components/.gitkeep` | — | Empty directory placeholder | Info | Expected — component structure enforced per-component in Phase 2+ |
| `src/styles/globals.css` | 18–111 | @theme inline missing --text-* / --font-weight-* / --leading-* mappings | Warning | Typography tokens defined but Tailwind text utilities don't formally reference token values; uses Tailwind defaults which happen to match numerically but are not token-driven |

No blockers found. No TODO/FIXME/placeholder comments in substantive files. No stub implementations. No empty handlers. All CSS custom properties are substantive values.

---

## Human Verification Required

### 1. Dark theme visual rendering

**Test:** Run `npm run dev`, open browser at localhost:5173
**Expected:** Deep forest-green background, cream-colored text, lime-green accent on the theme toggle button; color swatches render in all 4 scales (Forest, Lime, Mint, Neutral)
**Why human:** CSS var() resolution through the token cascade requires live browser rendering

### 2. Light theme toggle

**Test:** Click "Switch to Light Theme" button in the running dev app
**Expected:** Background changes to warm cream, text changes to dark forest-900, accent changes to forest-800; all semantic cards and sections recolor simultaneously
**Why human:** DOM attribute mutation + CSS cascade recomputation requires live browser

### 3. Storybook theme toggle

**Test:** Run `npm run storybook`, open localhost:6006
**Expected:** Storybook opens with dark (default) theme; toolbar shows theme switcher; selecting "light" sets data-theme="light" on the preview iframe html element
**Why human:** Storybook addon-themes integration requires running Storybook to verify data-theme propagation to iframe

### 4. Font rendering

**Test:** In running dev app, verify typography section
**Expected:** Three visually distinct fonts: Fraunces (serif, editorial) for display heading, Inter (clean sans-serif) for body, JetBrains Mono (monospaced) for code label
**Why human:** Google Fonts load from CDN; font rendering requires live browser with network access

---

## Gaps Summary

**Two partial gaps prevent full goal achievement:**

**Gap 1 — Typography tokens not wired into Tailwind utilities (STYLE-02 partial)**

The `@theme inline` block in `globals.css` maps colors, radii, shadows, spacing, and font-families to `--truf-*` tokens, but omits the typography size scale (`--truf-text-xs` through `--truf-text-6xl`), font weights (`--truf-weight-300` through `--truf-weight-800`), and line heights (`--truf-leading-tight/normal/relaxed`). Tailwind's own default text-size and font-weight utilities are used instead. The numeric values happen to align for common steps, but the token-to-utility wiring is absent. Any future change to token values would not propagate to utility classes.

Fix: Add to the `@theme inline` block in `src/styles/globals.css`:
- `--text-xs` through `--text-6xl` mapped to `var(--truf-text-*)` 
- `--font-weight-light/normal/medium/semibold/bold/extrabold` mapped to `var(--truf-weight-*)`
- `--leading-tight/normal/relaxed` mapped to `var(--truf-leading-*)`

**Gap 2 — REQUIREMENTS.md describes JSON token format, implementation delivers CSS (documentation inconsistency)**

TOKEN-01 through TOKEN-07 and STYLE-01 in REQUIREMENTS.md reference `*.json` files and "JSON token conversion." The implementation correctly uses `*.css` files with CSS custom properties — which is the appropriate architecture for Tailwind v4. This is not a code bug; it is a requirements document that was written for a different (abandoned) architecture. The implementation achieves all the substantive outcomes described.

Fix: Update REQUIREMENTS.md to replace all references to `*.json` files with `*.css` files and remove references to "JSON token conversion."

---

_Verified: 2026-04-19T21:00:00Z_
_Verifier: Claude (gsd-verifier)_
