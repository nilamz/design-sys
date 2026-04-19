# Requirements: Truf Design System

**Defined:** 2026-04-19
**Core Value:** Every component and token faithfully reproduces the Truf brand language — consistent, accessible, and ready to drop into any Truf product.

## v1 Requirements

### Infrastructure

- [ ] **INFRA-01**: Project scaffolded with Vite + React 18 + TypeScript
- [ ] **INFRA-02**: Tailwind CSS v4 installed and configured
- [ ] **INFRA-03**: Storybook 8 installed and running with Vite builder
- [ ] **INFRA-04**: Component folder structure enforced (tsx, stories, test, index per component)
- [ ] **INFRA-05**: Barrel export from src/index.ts exposes all components and tokens
- [ ] **INFRA-06**: Package.json configured for npm publishing with proper exports field

### Tokens

- [ ] **TOKEN-01**: colors.json defines forest (50-900), lime (50-900), mint (50-400), neutral (50-900), cream, and semantic colors (success, warning, error, info)
- [ ] **TOKEN-02**: spacing.json defines 4px base unit scale (0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96)
- [ ] **TOKEN-03**: typography.json defines three font families (sans: Inter, mono: JetBrains Mono, display: Fraunces), sizes xs-6xl, weights (300-800), and line heights
- [ ] **TOKEN-04**: radii.json defines none, sm (8px), md (12px), lg (16px), xl (24px), pill (64px), full (9999px)
- [ ] **TOKEN-05**: shadows.json defines xs, sm, md, lg, xl, and glow (lime-tinted)
- [ ] **TOKEN-06**: motion.json defines easing curves (standard, emphasized, decelerated) and durations (fast, base, slow, slower)
- [ ] **TOKEN-07**: z-index.json defines layered scale (base, sticky, drawer, modal, toast, tooltip)

### Styling

- [ ] **STYLE-01**: globals.css converts all JSON tokens into CSS custom properties matching --truf-* naming
- [ ] **STYLE-02**: Tailwind config maps token values so utility classes reference design tokens
- [ ] **STYLE-03**: Dark theme is default with semantic aliases (--bg, --surface, --text-primary, --accent, etc.)
- [ ] **STYLE-04**: Light theme activated via data-theme="light" attribute on root element
- [ ] **STYLE-05**: Theme CSS custom properties swap correctly between dark and light modes

### Button

- [ ] **BTN-01**: Button renders contained variant (lime bg, forest text)
- [ ] **BTN-02**: Button renders outlined variant (transparent bg, border, hover accent)
- [ ] **BTN-03**: Button renders text variant (no bg, accent text, hover bg tint)
- [ ] **BTN-04**: Button supports sm, md (default), lg sizes
- [ ] **BTN-05**: Button supports disabled state with reduced opacity and no pointer events
- [ ] **BTN-06**: Button has pill border-radius (64px) matching reference
- [ ] **BTN-07**: Button has focus-visible outline (2px lime, 2px offset)

### Input

- [ ] **INPUT-01**: Input renders with correct styling (bg-elevated, border, focus ring)
- [ ] **INPUT-02**: Input supports placeholder text styled with muted color
- [ ] **INPUT-03**: Input focus shows lime border + 3px lime glow ring
- [ ] **INPUT-04**: FieldGroup component wraps Input with label and help text

### Card

- [ ] **CARD-01**: Card renders with surface bg, border, and lg border-radius
- [ ] **CARD-02**: Card hover shows lime border accent, translateY(-2px), and md shadow

### Badge

- [ ] **BADGE-01**: Badge renders lime variant (lime bg, forest text)
- [ ] **BADGE-02**: Badge renders forest variant (forest-600 bg, cream text)
- [ ] **BADGE-03**: Badge renders mint variant (mint-200 bg, forest text)
- [ ] **BADGE-04**: Badge renders outline variant (transparent bg, border)
- [ ] **BADGE-05**: Badge uses pill border-radius and mono font

### Chip

- [ ] **CHIP-01**: Chip renders active state (lime bg, forest text)
- [ ] **CHIP-02**: Chip renders inactive state (mint bg, forest text)
- [ ] **CHIP-03**: Chip has pill border-radius and clickable cursor

### Alert

- [ ] **ALERT-01**: Alert renders success variant (green left border, green-tinted bg)
- [ ] **ALERT-02**: Alert renders warning variant (yellow left border, yellow-tinted bg)
- [ ] **ALERT-03**: Alert renders error variant (red left border, red-tinted bg)
- [ ] **ALERT-04**: Alert renders info variant (blue left border, blue-tinted bg)
- [ ] **ALERT-05**: Alert supports title (strong) and description content

### Switch

- [ ] **SWITCH-01**: Switch renders unchecked state (surface bg, primary knob)
- [ ] **SWITCH-02**: Switch renders checked state (lime bg, forest knob, translateX transition)
- [ ] **SWITCH-03**: Switch is accessible with proper input element

### Checkbox

- [ ] **CHECK-01**: Checkbox renders unchecked state (border, transparent bg)
- [ ] **CHECK-02**: Checkbox renders checked state (lime bg, checkmark via CSS)
- [ ] **CHECK-03**: Checkbox is accessible with proper input element

### Tabs

- [ ] **TABS-01**: Tabs render with bottom border separator
- [ ] **TABS-02**: Active tab shows lime text and lime bottom border indicator
- [ ] **TABS-03**: Tab hover shows primary text color
- [ ] **TABS-04**: Tabs support controlled active state

### Progress

- [ ] **PROG-01**: Progress renders track (surface bg, 4px height)
- [ ] **PROG-02**: Progress renders fill bar (lime bg, animated width transition)
- [ ] **PROG-03**: Progress accepts value prop (0-100)

### Skeleton

- [ ] **SKEL-01**: Skeleton renders shimmer animation (gradient sweep)
- [ ] **SKEL-02**: Skeleton supports configurable width/height via className or props

### Toast

- [ ] **TOAST-01**: Toast renders with lime bg, forest text, pill radius
- [ ] **TOAST-02**: Toast slides in from bottom with emphasized easing
- [ ] **TOAST-03**: Toast auto-dismisses after configurable duration

## v2 Requirements

### Components

- **NAV-01**: Sidebar navigation component
- **MODAL-01**: Modal/dialog component with backdrop
- **DROPDOWN-01**: Dropdown/select component
- **TOOLTIP-01**: Tooltip component with z-index layering
- **AVATAR-01**: Avatar component with image and fallback

### Infrastructure

- **TEST-01**: Full test suite with React Testing Library
- **A11Y-01**: Automated accessibility testing in CI
- **DOCS-01**: Usage guidelines documentation pages in Storybook

## Out of Scope

| Feature | Reason |
|---------|--------|
| Layout components (sidebar, app shell) | Application-level concerns, not design system |
| Page templates | Consuming apps handle composition |
| Icon library | Use Lucide or similar externally |
| Animation library | Motion tokens + CSS transitions sufficient for v1 |
| Server-side rendering support | Web-first SPA target for v1 |
| CSS-in-JS (styled-components, emotion) | Tailwind + CSS custom properties approach chosen |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | — | Pending |
| INFRA-02 | — | Pending |
| INFRA-03 | — | Pending |
| INFRA-04 | — | Pending |
| INFRA-05 | — | Pending |
| INFRA-06 | — | Pending |
| TOKEN-01 | — | Pending |
| TOKEN-02 | — | Pending |
| TOKEN-03 | — | Pending |
| TOKEN-04 | — | Pending |
| TOKEN-05 | — | Pending |
| TOKEN-06 | — | Pending |
| TOKEN-07 | — | Pending |
| STYLE-01 | — | Pending |
| STYLE-02 | — | Pending |
| STYLE-03 | — | Pending |
| STYLE-04 | — | Pending |
| STYLE-05 | — | Pending |
| BTN-01 | — | Pending |
| BTN-02 | — | Pending |
| BTN-03 | — | Pending |
| BTN-04 | — | Pending |
| BTN-05 | — | Pending |
| BTN-06 | — | Pending |
| BTN-07 | — | Pending |
| INPUT-01 | — | Pending |
| INPUT-02 | — | Pending |
| INPUT-03 | — | Pending |
| INPUT-04 | — | Pending |
| CARD-01 | — | Pending |
| CARD-02 | — | Pending |
| BADGE-01 | — | Pending |
| BADGE-02 | — | Pending |
| BADGE-03 | — | Pending |
| BADGE-04 | — | Pending |
| BADGE-05 | — | Pending |
| CHIP-01 | — | Pending |
| CHIP-02 | — | Pending |
| CHIP-03 | — | Pending |
| ALERT-01 | — | Pending |
| ALERT-02 | — | Pending |
| ALERT-03 | — | Pending |
| ALERT-04 | — | Pending |
| ALERT-05 | — | Pending |
| SWITCH-01 | — | Pending |
| SWITCH-02 | — | Pending |
| SWITCH-03 | — | Pending |
| CHECK-01 | — | Pending |
| CHECK-02 | — | Pending |
| CHECK-03 | — | Pending |
| TABS-01 | — | Pending |
| TABS-02 | — | Pending |
| TABS-03 | — | Pending |
| TABS-04 | — | Pending |
| PROG-01 | — | Pending |
| PROG-02 | — | Pending |
| PROG-03 | — | Pending |
| SKEL-01 | — | Pending |
| SKEL-02 | — | Pending |
| TOAST-01 | — | Pending |
| TOAST-02 | — | Pending |
| TOAST-03 | — | Pending |

**Coverage:**
- v1 requirements: 55 total
- Mapped to phases: 0
- Unmapped: 55 ⚠️

---
*Requirements defined: 2026-04-19*
*Last updated: 2026-04-19 after initial definition*
