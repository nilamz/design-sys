# Phase 1: Foundation - Research

**Researched:** 2026-04-19
**Domain:** Vite + React 18 + TypeScript scaffold, Tailwind CSS v4 CSS-first configuration, CSS custom property token files, dark/light theming, Storybook 8
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Token format
- Tokens as **CSS files** (not JSON) in `src/tokens/`
- Each token category gets its own `.css` file with CSS custom properties
- Files: `colors.css`, `typography.css`, `spacing.css`, `shadows.css`, `radius.css`
- `index.css` imports all token files as a single entry point
- Naming convention: `--truf-*` prefix matching the reference HTML exactly

#### Token file structure
- `colors.css` — All color scales (forest 50-900, lime 50-900, mint 50-400, neutral 50-900, cream, semantic)
- `typography.css` — Font families (sans: Inter, mono: JetBrains Mono, display: Fraunces), sizes xs-6xl, weights, line heights
- `spacing.css` — 4px base unit scale (0-96px)
- `shadows.css` — xs through xl + glow (lime-tinted)
- `radius.css` — none, sm, md, lg, xl, pill, full

#### Additional token files
- Motion tokens (easing curves, durations) and z-index scale also need CSS files
- `motion.css` — easings (standard, emphasized, decelerated) and durations (fast, base, slow, slower)
- `z-index.css` — layered scale (base, sticky, drawer, modal, toast, tooltip)

#### Tailwind config mapping
- Tailwind config extends (not replaces) with exact token values from the reference HTML
- Utility classes reference the CSS custom properties

#### Theme system
- Dark theme is default — semantic aliases (--bg, --surface, --text-primary, --accent, etc.) in `:root`
- Light theme via `[data-theme="light"]` override block
- Semantic aliases match the reference HTML exactly

#### Font loading
- Google Fonts via CDN link (matching reference HTML: Inter, JetBrains Mono, Fraunces)

#### Project structure (user-specified)
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

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| INFRA-01 | Project scaffolded with Vite + React 18 + TypeScript | `npm create vite@latest -- --template react-ts` creates the scaffold; verified Vite 6 + React 18 template patterns |
| INFRA-02 | Tailwind CSS v4 installed and configured | `@tailwindcss/vite` plugin approach confirmed; `@import "tailwindcss"` in main CSS; `@theme` block for token mapping |
| INFRA-03 | Storybook 8 installed and running with Vite builder | `npx storybook@latest init` auto-detects Vite; `@storybook/react-vite` framework; CSS import in preview.ts |
| INFRA-04 | Component folder structure enforced (tsx, stories, test, index per component) | Standard folder-per-component pattern; empty `src/components/` placeholder in Phase 1 |
| TOKEN-01 | colors.css defines all color scales with --truf-* naming | CSS custom properties in `:root` block; flat `--truf-forest-500` style naming |
| TOKEN-02 | spacing.css defines 4px base unit scale | 13 spacing values: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px |
| TOKEN-03 | typography.css defines three font families, sizes xs-6xl, weights, line heights | Google Fonts CDN; --truf-font-sans/mono/display; --truf-text-* for sizes |
| TOKEN-04 | radius.css defines none, sm (8px), md (12px), lg (16px), xl (24px), pill (64px), full (9999px) | 7 radius values as CSS custom properties |
| TOKEN-05 | shadows.css defines xs, sm, md, lg, xl, and glow (lime-tinted) | 6 shadow values including lime-tinted glow |
| TOKEN-06 | motion.css defines easing curves and durations | 3 easings + 4 durations as CSS custom properties |
| TOKEN-07 | z-index.css defines layered scale | 6 z-index values: base, sticky, drawer, modal, toast, tooltip |
| STYLE-01 | globals.css converts all tokens into CSS custom properties matching --truf-* naming | Handled by token CSS files imported via index.css; globals.css adds semantic aliases on top |
| STYLE-02 | Tailwind config maps token values so utility classes reference design tokens | `@theme` block in globals.css references `var(--truf-*)` tokens; generates Tailwind utility classes |
| STYLE-03 | Dark theme is default with semantic aliases (--bg, --surface, --text-primary, --accent, etc.) | `:root` block in globals.css defines semantic aliases pointing to dark-mode token values |
| STYLE-04 | Light theme activated via data-theme="light" attribute on root element | `[data-theme="light"]` block overrides semantic aliases; `@custom-variant` for Tailwind dark: prefix |
| STYLE-05 | Theme CSS custom properties swap correctly between dark and light modes | Semantic alias layer allows all components to use var(--bg), var(--surface) etc. without dark: variants |
</phase_requirements>

---

## Summary

Phase 1 establishes a greenfield Vite + React 18 + TypeScript project with Tailwind CSS v4 and Storybook 8. The project directory is currently empty — only a `.git` and `.planning` folder exist. The entire scaffold must be created from scratch.

The central architectural decision (already locked by the user) is to define all design tokens as plain CSS files in `src/tokens/`, each producing `--truf-*` named CSS custom properties. A `src/styles/globals.css` file then imports these tokens and adds two additional layers: the Tailwind v4 `@theme` block (which maps `--truf-*` values to Tailwind utility classes) and the semantic alias blocks (`:root` for dark-default and `[data-theme="light"]` for the light override). This single CSS entry point is what both Vite and Storybook consume.

Tailwind v4 is a significant architectural shift from v3: there is no `tailwind.config.js` for tokens — everything lives in CSS via `@theme`. The `@tailwindcss/vite` plugin replaces the PostCSS approach. Storybook 8 integrates cleanly by importing `globals.css` in `.storybook/preview.ts` and using the `@storybook/addon-themes` decorator with `withThemeByDataAttribute` to wire up the data-theme toggle.

**Primary recommendation:** Scaffold with `npm create vite@latest -- --template react-ts`, add `@tailwindcss/vite` plugin, build all token CSS files with `--truf-*` variables, create `globals.css` with `@import "tailwindcss"` + `@theme` + semantic aliases, then `npx storybook@latest init` for Storybook auto-setup.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| vite | 6.x | Build tool + dev server | Fastest HMR, `create-vite` is the official scaffold; Node 18+ required |
| react | 18.x | UI framework | Hooks-stable, concurrent features; v19 exists but 18 is the locked decision |
| react-dom | 18.x | DOM renderer | Paired with react |
| typescript | 5.x | Static typing | Bundled in `react-ts` template; 5.x is current |
| tailwindcss | 4.x | Utility-first CSS | CSS-first config, no `tailwind.config.js` needed for tokens |
| @tailwindcss/vite | 4.x | Vite plugin for Tailwind v4 | Replaces PostCSS approach; tighter integration, faster builds |
| @storybook/react-vite | 8.x | Storybook framework adapter | Auto-selected by `npx storybook@latest init` on Vite projects |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @storybook/addon-themes | 8.x | Theme switcher in Storybook UI | Required for dark/light toggle via `withThemeByDataAttribute` |
| @storybook/addon-essentials | 8.x | Controls, actions, docs | Bundled by default with `storybook@latest init` |
| @vitejs/plugin-react | 4.x | React Fast Refresh via Babel | Auto-included in `react-ts` template |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `@tailwindcss/vite` plugin | `@tailwindcss/postcss` | PostCSS is acceptable but adds config file and is slightly slower; Vite plugin is recommended for Vite projects |
| CSS token files | Style Dictionary + JSON | JSON approach was considered but user locked CSS files as the format |
| `npx storybook@latest init` | Manual `@storybook/react-vite` install | Manual gives more control but auto-init handles all addon wiring |

**Installation (Phase 1 sequence):**
```bash
# 1. Scaffold Vite project
npm create vite@latest Design-Sys -- --template react-ts
cd Design-Sys
npm install

# 2. Add Tailwind v4
npm install tailwindcss @tailwindcss/vite

# 3. Add Storybook
npx storybook@latest init

# 4. Add Storybook themes addon (if not auto-added)
npm install --save-dev @storybook/addon-themes
```

---

## Architecture Patterns

### Recommended Project Structure
```
Design-Sys/
  src/
    tokens/
      colors.css          # --truf-forest-*, --truf-lime-*, etc.
      typography.css       # --truf-font-*, --truf-text-*, --truf-weight-*
      spacing.css          # --truf-space-*
      shadows.css          # --truf-shadow-*
      radius.css           # --truf-radius-*
      motion.css           # --truf-ease-*, --truf-duration-*
      z-index.css          # --truf-z-*
      index.css            # @import all token files
    styles/
      globals.css          # @import "tailwindcss" + token import + @theme + semantic aliases
    components/            # Empty placeholder (Phase 2+)
    index.ts               # Barrel export
  .storybook/
    main.ts                # framework: @storybook/react-vite, addons list
    preview.ts             # import globals.css, withThemeByDataAttribute decorator
  vite.config.ts           # tailwindcss() plugin
  tsconfig.json
  package.json
```

### Pattern 1: Tailwind v4 CSS-First Config

**What:** All design token customizations live in a `@theme` block inside a CSS file. No `tailwind.config.js` needed. The `@theme` block maps `--truf-*` CSS variables to Tailwind utility classes.

**When to use:** Whenever the project uses Tailwind v4 (which is the locked decision here).

**Example:**
```css
/* src/styles/globals.css */

/* Source: https://tailwindcss.com/docs/theme */

/* Step 1: Import Tailwind */
@import "tailwindcss";

/* Step 2: Import all token files */
@import "../tokens/index.css";

/* Step 3: Map tokens to Tailwind utilities via @theme */
@theme {
  /* Clear Tailwind's default colors and use ours exclusively */
  --color-*: initial;

  /* Map --truf-* primitives as Tailwind color utilities */
  --color-forest-50: var(--truf-forest-50);
  --color-forest-500: var(--truf-forest-500);
  --color-forest-900: var(--truf-forest-900);
  --color-lime-400: var(--truf-lime-400);
  --color-lime-500: var(--truf-lime-500);
  /* ... full scale */

  /* Map spacing */
  --spacing-1: var(--truf-space-1);   /* 4px */
  --spacing-2: var(--truf-space-2);   /* 8px */
  /* ... etc */

  /* Map typography */
  --font-sans: var(--truf-font-sans);
  --font-mono: var(--truf-font-mono);
  --font-display: var(--truf-font-display);

  /* Map radii */
  --radius-sm: var(--truf-radius-sm);    /* 8px */
  --radius-pill: var(--truf-radius-pill); /* 64px */
}

/* Step 4: Semantic aliases — dark is default in :root */
:root {
  --bg: var(--truf-neutral-950);
  --surface: var(--truf-neutral-900);
  --text-primary: var(--truf-neutral-50);
  --accent: var(--truf-lime-400);
  /* ... etc */
}

/* Step 5: Light theme override */
[data-theme="light"] {
  --bg: var(--truf-neutral-50);
  --surface: #ffffff;
  --text-primary: var(--truf-neutral-900);
  --accent: var(--truf-forest-600);
  /* ... etc */
}
```

### Pattern 2: Token CSS Files with `--truf-*` Naming

**What:** Each token category is a standalone CSS file with `:root` block defining `--truf-*` custom properties. These are primitive/raw values only — no semantic meaning, no component logic.

**When to use:** For every token category (colors, spacing, typography, shadows, radius, motion, z-index).

**Example:**
```css
/* src/tokens/colors.css */
:root {
  /* Forest scale */
  --truf-forest-50: #f0faf4;
  --truf-forest-100: #dcf4e6;
  --truf-forest-200: #b9e9ce;
  --truf-forest-300: #86d6ad;
  --truf-forest-400: #50bb85;
  --truf-forest-500: #25a065;
  --truf-forest-600: #158050;
  --truf-forest-700: #0f6640;
  --truf-forest-800: #0c5234;
  --truf-forest-900: #0a3d27;

  /* Lime scale */
  --truf-lime-50: #f5fde8;
  --truf-lime-400: #a3e635;
  --truf-lime-500: #84cc16;

  /* Semantic colors */
  --truf-success: #22c55e;
  --truf-warning: #f59e0b;
  --truf-error: #ef4444;
  --truf-info: #3b82f6;
}
```

```css
/* src/tokens/index.css */
@import "./colors.css";
@import "./typography.css";
@import "./spacing.css";
@import "./shadows.css";
@import "./radius.css";
@import "./motion.css";
@import "./z-index.css";
```

### Pattern 3: Storybook Dark/Light Theme Toggle

**What:** Use `@storybook/addon-themes` `withThemeByDataAttribute` decorator to apply `data-theme` attribute on the Storybook preview iframe's `html` element.

**When to use:** In `.storybook/preview.ts` — this wires the Storybook toolbar toggle to the same CSS mechanism the production app uses.

**Example:**
```typescript
// .storybook/preview.ts
// Source: https://storybook.js.org/docs/essentials/themes

import type { Preview } from '@storybook/react-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../src/styles/globals.css';

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        dark: '',          // dark is default — no attribute value needed
        light: 'light',   // sets data-theme="light"
      },
      defaultTheme: 'dark',
      attributeName: 'data-theme',
    }),
  ],
  parameters: {
    backgrounds: { disable: true }, // Disable built-in backgrounds; our CSS handles it
  },
};

export default preview;
```

### Pattern 4: Vite Config with Tailwind Plugin

**What:** Register `@tailwindcss/vite` as a Vite plugin. No `postcss.config.js` needed.

```typescript
// vite.config.ts
// Source: https://tailwindcss.com/docs (Vite installation guide)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});
```

### Pattern 5: Token Import Entry Point

**What:** `src/styles/globals.css` is the single CSS entry point. It uses `@import "tailwindcss"` (v4 syntax), then imports tokens, then defines `@theme` and semantic aliases.

**Key:** This file must be imported in both `src/main.tsx` (app) and `.storybook/preview.ts` (Storybook).

```typescript
// src/main.tsx
import './styles/globals.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Anti-Patterns to Avoid

- **Using `@tailwind base/components/utilities` directives:** These are Tailwind v3 syntax. In v4 use `@import "tailwindcss"` only.
- **Creating `tailwind.config.js` for tokens:** Not needed in v4. Token values go in `@theme` block in CSS.
- **Putting semantic aliases inside token files:** Token files should only contain primitives (`--truf-forest-500`). Semantic aliases (`--bg`, `--surface`) belong in `globals.css`.
- **Using Tailwind's `dark:` variant for theming:** The project uses semantic CSS custom properties that swap automatically — components should use `var(--bg)`, `var(--surface)`, `var(--text-primary)` rather than `bg-neutral-950 dark:bg-neutral-50` pairs.
- **Hardcoding hex values in components:** Always reference CSS custom properties or Tailwind utilities that map to tokens.
- **Importing token files directly in Storybook:** Import `globals.css` only, which already cascades all token files.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Vite project scaffold | Custom webpack/esbuild config | `npm create vite@latest` | Vite's template handles tsconfig paths, JSX transform, HMR — getting these right manually is error-prone |
| Tailwind token mapping | Manual CSS class generation | `@theme` directive in v4 CSS | `@theme` auto-generates `bg-*`, `text-*`, `rounded-*`, `shadow-*` utilities from token variables |
| Storybook theme toggle UI | Custom toolbar button | `@storybook/addon-themes` `withThemeByDataAttribute` | Handles parent element attribute injection, state persistence between stories |
| PostCSS pipeline | Custom PostCSS config | `@tailwindcss/vite` Vite plugin | Plugin handles full Tailwind v4 processing including content scanning — no PostCSS config needed |
| CSS cascade for dark mode | JS-driven class manipulation | CSS custom property semantic aliases + `[data-theme="light"]` | Pure CSS swap; zero JS overhead; works in both app and Storybook identically |

**Key insight:** Tailwind v4 eliminates almost all configuration boilerplate. The `@theme` directive does in 20 lines what `tailwind.config.js` + `extend` + plugin registration did in v3. Do not fight the new system by recreating v3 patterns.

---

## Common Pitfalls

### Pitfall 1: Using v3 Import Syntax in v4

**What goes wrong:** `@tailwind base;` `@tailwind components;` `@tailwind utilities;` cause a build error or silently produce no output in Tailwind v4.

**Why it happens:** The `@tailwind` directive was removed in v4. The new entry point is `@import "tailwindcss"`.

**How to avoid:** Ensure `globals.css` starts with `@import "tailwindcss";` — nothing else.

**Warning signs:** Tailwind utility classes don't apply in the browser; no CSS is generated for utilities.

### Pitfall 2: Token Values Don't Match Reference HTML

**What goes wrong:** Color values, spacing values, or shadow values are approximated rather than copied exactly from `truf-design-system.html`.

**Why it happens:** REQUIREMENTS.md is explicit: "Token values must match the reference HTML exactly — no approximations." The reference HTML is the source of truth, not any other design system.

**How to avoid:** Before writing token files, extract exact values from the reference HTML. Every `--truf-*` value should be copied verbatim.

**Warning signs:** Visual comparison between Storybook stories and the reference HTML shows color discrepancies.

### Pitfall 3: Storybook Not Applying CSS Custom Properties

**What goes wrong:** Components render in Storybook but without token-based colors or the correct dark theme background.

**Why it happens:** `globals.css` was not imported in `.storybook/preview.ts`. Storybook's iframe is isolated from the app's CSS.

**How to avoid:** Always include `import '../src/styles/globals.css';` as the first line of `.storybook/preview.ts`.

**Warning signs:** Components show default browser styles; `--bg`, `--surface` etc. appear as undefined in DevTools.

### Pitfall 4: @theme References to Non-Existent Variables

**What goes wrong:** Tailwind generates no utilities for a token; browser shows `var(--truf-something)` as an unresolved variable.

**Why it happens:** `@theme` maps `--color-forest-500: var(--truf-forest-500)`, but `--truf-forest-500` is only defined in `src/tokens/colors.css`, which is imported via `src/tokens/index.css`. If `index.css` isn't imported before `@theme` in `globals.css`, the variable is undefined at Tailwind processing time.

**How to avoid:** Import order in `globals.css` must be: `@import "tailwindcss"` → `@import "../tokens/index.css"` → `@theme { ... }` → semantic aliases.

**Warning signs:** Browser DevTools shows `--truf-*` as empty string; Tailwind utility background is transparent.

### Pitfall 5: Storybook Init Detecting Wrong Project Type

**What goes wrong:** `npx storybook@latest init` installs wrong framework (e.g., `@storybook/react-webpack5` instead of `@storybook/react-vite`).

**Why it happens:** Storybook auto-detects based on `package.json`. If Vite is not yet listed as a dependency when `init` runs, detection may fail.

**How to avoid:** Run `npm install` (including Vite and React deps) before running `npx storybook@latest init`.

**Warning signs:** `.storybook/main.ts` shows `framework: '@storybook/react-webpack5'`; `webpack` appears in devDependencies.

### Pitfall 6: Dark/Light Default Confusion

**What goes wrong:** Components appear in light mode in production even though dark is default.

**Why it happens:** Storybook defaults `defaultTheme: 'light'` in addon-themes if not explicitly configured. Also, if `[data-theme="light"]` selector applies at page load by default, dark semantics are overridden.

**How to avoid:** Set `defaultTheme: 'dark'` in `withThemeByDataAttribute` config. In the app, ensure no `data-theme` attribute is set on `<html>` by default (dark is `:root` which always applies).

**Warning signs:** The Storybook toolbar shows "dark" selected but story renders with light background.

### Pitfall 7: `@theme inline` Needed for Variable-Referencing Tokens

**What goes wrong:** `--font-sans: var(--truf-font-sans)` in `@theme` results in a CSS variable that resolves to another CSS variable at runtime, but some contexts (e.g., Tailwind's internal style resolution) don't follow the reference.

**Why it happens:** Without `inline`, Tailwind stores the variable reference rather than the resolved value.

**How to avoid:** Use `@theme inline { ... }` when the `@theme` variables reference other CSS variables (like `var(--truf-font-sans)`). This forces Tailwind to substitute the actual value.

```css
@theme inline {
  --font-sans: var(--truf-font-sans);
  --font-mono: var(--truf-font-mono);
  --font-display: var(--truf-font-display);
}
```

**Warning signs:** Font families don't apply; `font-sans` utility class in DevTools shows `font-family: var(--font-sans)` which then shows as empty.

---

## Code Examples

Verified patterns from official sources:

### Tailwind v4 Vite Plugin Setup
```typescript
// vite.config.ts
// Source: https://tailwindcss.com/docs (Vite installation guide, verified 2026-04-19)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### Tailwind v4 CSS Entry Point
```css
/* src/styles/globals.css */
/* Source: https://tailwindcss.com/blog/tailwindcss-v4 */

@import "tailwindcss";
@import "../tokens/index.css";

/* Tailwind utilities mapped to --truf-* tokens */
@theme inline {
  --color-*: initial;

  /* Forest palette → bg-forest-500, text-forest-900, etc. */
  --color-forest-50: var(--truf-forest-50);
  --color-forest-100: var(--truf-forest-100);
  /* ... full scale */

  /* Font families */
  --font-sans: var(--truf-font-sans);
  --font-mono: var(--truf-font-mono);
  --font-display: var(--truf-font-display);

  /* Radii */
  --radius-sm: var(--truf-radius-sm);
  --radius-md: var(--truf-radius-md);
  --radius-pill: var(--truf-radius-pill);
}

/* Semantic aliases — dark is default */
:root {
  --bg: var(--truf-neutral-950);
  --surface: var(--truf-neutral-900);
  --surface-elevated: var(--truf-neutral-800);
  --text-primary: var(--truf-neutral-50);
  --text-secondary: var(--truf-neutral-400);
  --text-muted: var(--truf-neutral-500);
  --border: var(--truf-neutral-700);
  --accent: var(--truf-lime-400);
  --accent-hover: var(--truf-lime-500);
}

/* Light theme override */
[data-theme="light"] {
  --bg: var(--truf-neutral-50);
  --surface: #ffffff;
  --surface-elevated: var(--truf-neutral-100);
  --text-primary: var(--truf-neutral-900);
  --text-secondary: var(--truf-neutral-600);
  --text-muted: var(--truf-neutral-500);
  --border: var(--truf-neutral-200);
  --accent: var(--truf-forest-600);
  --accent-hover: var(--truf-forest-700);
}
```

### Token File Pattern (colors.css excerpt)
```css
/* src/tokens/colors.css */
/* Values must match truf-design-system.html exactly */
:root {
  /* Forest green scale */
  --truf-forest-50: #f0faf4;
  --truf-forest-100: #dcf4e6;
  --truf-forest-200: #b9e9ce;
  --truf-forest-300: #86d6ad;
  --truf-forest-400: #50bb85;
  --truf-forest-500: #25a065;
  --truf-forest-600: #158050;
  --truf-forest-700: #0f6640;
  --truf-forest-800: #0c5234;
  --truf-forest-900: #0a3d27;

  /* Lime accent scale */
  --truf-lime-50: #f5fde8;
  --truf-lime-100: #ebfbd1;
  --truf-lime-200: #d5f6a3;
  --truf-lime-300: #baed6f;
  --truf-lime-400: #a3e635;
  --truf-lime-500: #84cc16;
  --truf-lime-600: #65a30d;
  --truf-lime-700: #4d7c0f;
  --truf-lime-800: #3f6212;
  --truf-lime-900: #365314;

  /* Semantic */
  --truf-success: #22c55e;
  --truf-warning: #f59e0b;
  --truf-error: #ef4444;
  --truf-info: #3b82f6;
}
```

### Token File Pattern (spacing.css)
```css
/* src/tokens/spacing.css */
/* 4px base unit scale — values from PROJECT.md spec */
:root {
  --truf-space-0: 0px;
  --truf-space-1: 4px;
  --truf-space-2: 8px;
  --truf-space-3: 12px;
  --truf-space-4: 16px;
  --truf-space-5: 20px;
  --truf-space-6: 24px;
  --truf-space-8: 32px;
  --truf-space-10: 40px;
  --truf-space-12: 48px;
  --truf-space-16: 64px;
  --truf-space-20: 80px;
  --truf-space-24: 96px;
}
```

### Storybook preview.ts
```typescript
// .storybook/preview.ts
// Source: https://storybook.js.org/docs/essentials/themes
import type { Preview } from '@storybook/react-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../src/styles/globals.css';

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        dark: '',
        light: 'light',
      },
      defaultTheme: 'dark',
      attributeName: 'data-theme',
    }),
  ],
  parameters: {
    backgrounds: { disable: true },
    layout: 'centered',
  },
};

export default preview;
```

### Storybook main.ts
```typescript
// .storybook/main.ts
// Source: https://storybook.js.org/docs/get-started/frameworks/react-vite
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;
```

### Token Index (index.css)
```css
/* src/tokens/index.css */
@import "./colors.css";
@import "./typography.css";
@import "./spacing.css";
@import "./shadows.css";
@import "./radius.css";
@import "./motion.css";
@import "./z-index.css";
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` with `theme.extend` | `@theme` block in CSS | Tailwind v4 (2025) | No JS config file needed; tokens become CSS variables automatically |
| `@tailwind base/components/utilities` directives | `@import "tailwindcss"` | Tailwind v4 | Single import line replaces three directives |
| `@tailwindcss/postcss` in PostCSS config | `@tailwindcss/vite` Vite plugin | Tailwind v4 | No `postcss.config.js` for Vite projects |
| `storybook init` with Webpack builder | Auto-detects Vite, installs `@storybook/react-vite` | Storybook 7+ | No manual builder selection |
| v3 `darkMode: ['class', '.dark']` in config | `@custom-variant dark` in CSS | Tailwind v4 | Dark variant defined in CSS, not JS config |

**Deprecated/outdated:**
- `tailwind.config.js` for design tokens: Replaced by `@theme` block in CSS for Tailwind v4 projects
- `@tailwind` directives: Removed in v4; use `@import "tailwindcss"`
- `theme()` function calls in CSS: Works but `var(--*)` is preferred in v4 since all theme tokens are CSS variables
- `purge` config option: Replaced by automatic content detection in v4

---

## Open Questions

1. **Exact token values from the reference HTML**
   - What we know: Token structure is fully defined (categories, naming convention, approximate values)
   - What's unclear: The precise hex values for every color in every scale, exact shadow values, exact easing curves — these must come from `truf-design-system.html`
   - Recommendation: The planner MUST include a task to read and extract all values from `truf-design-system.html` before writing token CSS files. This is a hard dependency.

2. **Tailwind `@theme inline` vs `@theme` for var() references**
   - What we know: Without `inline`, Tailwind stores the variable reference rather than the resolved value, which can cause issues with fonts and some color utilities
   - What's unclear: Whether all token types need `inline` or only font families
   - Recommendation: Use `@theme inline { ... }` for the entire `@theme` block when any variable references another variable. This is the safe default.

3. **Storybook version auto-selected by `npx storybook@latest init`**
   - What we know: `storybook@latest init` installs the latest stable version (8.x as of 2026-04)
   - What's unclear: Whether version 9 has released since research date
   - Recommendation: Run `npx storybook@latest init` and accept what it installs; if it installs v9, verify `@storybook/addon-themes` compatibility before proceeding.

4. **Storybook background vs theme decorator conflict**
   - What we know: The default `backgrounds` parameter in Storybook conflicts with CSS-custom-property-based theming (two background colors compete)
   - What's unclear: Whether `backgrounds: { disable: true }` needs to be set globally or per-story
   - Recommendation: Disable backgrounds globally in `preview.ts` parameters and let `--bg` semantic alias handle canvas background.

---

## Sources

### Primary (HIGH confidence)
- https://tailwindcss.com/docs/theme — `@theme` directive, namespaces, variable generation, `inline` option
- https://tailwindcss.com/docs/dark-mode — `@custom-variant dark`, `data-theme` attribute approach
- https://tailwindcss.com/blog/tailwindcss-v4 — v4 CSS-first config, `@import "tailwindcss"`, Vite plugin
- https://storybook.js.org/docs/get-started/frameworks/react-vite — `@storybook/react-vite` framework setup
- https://storybook.js.org/docs/essentials/themes — `withThemeByDataAttribute` configuration

### Secondary (MEDIUM confidence)
- https://dev.to/geane_ramos/how-to-setup-your-vite-project-with-react-typescript-and-tailwindcss-v4-2bkm — Vite + React + TypeScript + Tailwind v4 setup steps (verified against official Tailwind docs)
- https://storybook.js.org/addons/@storybook/addon-themes — addon-themes npm page confirming `attributeName` option

### Tertiary (LOW confidence)
- Multiple Medium/DEV Community posts about Tailwind v4 token patterns — used for pattern confirmation only; not authoritative

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — verified against official Tailwind v4 docs, Storybook docs, and Vite docs
- Architecture (CSS token file structure): HIGH — user locked this explicitly; pattern is straightforward CSS
- Tailwind `@theme` + `@theme inline` behavior: HIGH — verified from official `tailwindcss.com/docs/theme`
- Exact token values from reference HTML: NOT RESEARCHED — values must be extracted from `truf-design-system.html` during planning
- Storybook addon-themes config: HIGH — verified from official Storybook docs

**Research date:** 2026-04-19
**Valid until:** 2026-05-19 (30 days — Tailwind v4 is stable; Storybook 8 is stable)
