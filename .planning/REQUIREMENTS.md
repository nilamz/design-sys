# Requirements: Truf Design System

**Defined:** 2026-04-19
**Core Value:** Every component and token faithfully reproduces the Truf brand language — consistent, accessible, and ready to drop into any Truf product.

## v1 Requirements

### Infrastructure

- [x] **INFRA-01**: Project scaffolded with Vite + React 18 + TypeScript
- [x] **INFRA-02**: Tailwind CSS v4 installed and configured
- [x] **INFRA-03**: Storybook 8 installed and running with Vite builder
- [x] **INFRA-04**: Component folder structure enforced (tsx, stories, test, index per component)
- [ ] **INFRA-05**: Barrel export from src/index.ts exposes all components and tokens
- [ ] **INFRA-06**: Package.json configured for npm publishing with proper exports field

### Tokens

- [x] **TOKEN-01**: colors.css defines forest (50-900), lime (50-900), mint (50-400), neutral (50-900), cream, and semantic colors (success, warning, error, info)
- [x] **TOKEN-02**: spacing.css defines 4px base unit scale (0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96)
- [x] **TOKEN-03**: typography.css defines three font families (sans: Inter, mono: JetBrains Mono, display: Fraunces), sizes xs-6xl, weights (300-800), and line heights
- [x] **TOKEN-04**: radii.css defines none, sm (8px), md (12px), lg (16px), xl (24px), pill (64px), full (9999px)
- [x] **TOKEN-05**: shadows.css defines xs, sm, md, lg, xl, and glow (lime-tinted)
- [x] **TOKEN-06**: motion.css defines easing curves (standard, emphasized, decelerated) and durations (fast, base, slow, slower)
- [x] **TOKEN-07**: z-index.css defines layered scale (base, sticky, drawer, modal, toast, tooltip)

### Styling

- [x] **STYLE-01**: globals.css imports all token CSS files and maps them to Tailwind utilities via @theme inline
- [x] **STYLE-02**: Tailwind config maps token values so utility classes reference design tokens
- [x] **STYLE-03**: Dark theme is default with semantic aliases (--bg, --surface, --text-primary, --accent, etc.)
- [x] **STYLE-04**: Light theme activated via data-theme="light" attribute on root element
- [x] **STYLE-05**: Theme CSS custom properties swap correctly between dark and light modes

### Button

- [x] **BTN-01**: Button renders contained variant (lime bg, forest text)
- [x] **BTN-02**: Button renders outlined variant (transparent bg, border, hover accent)
- [x] **BTN-03**: Button renders text variant (no bg, accent text, hover bg tint)
- [x] **BTN-04**: Button supports sm, md (default), lg sizes
- [x] **BTN-05**: Button supports disabled state with reduced opacity and no pointer events
- [x] **BTN-06**: Button has pill border-radius (64px) matching reference
- [x] **BTN-07**: Button has focus-visible outline (2px lime, 2px offset)

### Input

- [x] **INPUT-01**: Input renders with correct styling (bg-elevated, border, focus ring)
- [x] **INPUT-02**: Input supports placeholder text styled with muted color
- [x] **INPUT-03**: Input focus shows lime border + 3px lime glow ring
- [x] **INPUT-04**: FieldGroup component wraps Input with label and help text

### Card

- [x] **CARD-01**: Card renders with surface bg, border, and lg border-radius
- [x] **CARD-02**: Card hover shows lime border accent, translateY(-2px), and md shadow

### Badge

- [x] **BADGE-01**: Badge renders lime variant (lime bg, forest text)
- [x] **BADGE-02**: Badge renders forest variant (forest-600 bg, cream text)
- [x] **BADGE-03**: Badge renders mint variant (mint-200 bg, forest text)
- [x] **BADGE-04**: Badge renders outline variant (transparent bg, border)
- [x] **BADGE-05**: Badge uses pill border-radius and mono font

### Chip

- [x] **CHIP-01**: Chip renders active state (lime bg, forest text)
- [x] **CHIP-02**: Chip renders inactive state (mint bg, forest text)
- [x] **CHIP-03**: Chip has pill border-radius and clickable cursor

### Alert

- [x] **ALERT-01**: Alert renders success variant (green left border, green-tinted bg)
- [x] **ALERT-02**: Alert renders warning variant (yellow left border, yellow-tinted bg)
- [x] **ALERT-03**: Alert renders error variant (red left border, red-tinted bg)
- [x] **ALERT-04**: Alert renders info variant (blue left border, blue-tinted bg)
- [x] **ALERT-05**: Alert supports title (strong) and description content

### Switch

- [x] **SWITCH-01**: Switch renders unchecked state (surface bg, primary knob)
- [x] **SWITCH-02**: Switch renders checked state (lime bg, forest knob, translateX transition)
- [x] **SWITCH-03**: Switch is accessible with proper input element

### Checkbox

- [x] **CHECK-01**: Checkbox renders unchecked state (border, transparent bg)
- [x] **CHECK-02**: Checkbox renders checked state (lime bg, checkmark via CSS)
- [x] **CHECK-03**: Checkbox is accessible with proper input element

### Tabs

- [x] **TABS-01**: Tabs render with bottom border separator
- [x] **TABS-02**: Active tab shows lime text and lime bottom border indicator
- [x] **TABS-03**: Tab hover shows primary text color
- [x] **TABS-04**: Tabs support controlled active state

### Progress

- [x] **PROG-01**: Progress renders track (surface bg, 4px height)
- [x] **PROG-02**: Progress renders fill bar (lime bg, animated width transition)
- [x] **PROG-03**: Progress accepts value prop (0-100)

### Skeleton

- [x] **SKEL-01**: Skeleton renders shimmer animation (gradient sweep)
- [x] **SKEL-02**: Skeleton supports configurable width/height via className or props

### Toast

- [x] **TOAST-01**: Toast renders with lime bg, forest text, pill radius
- [x] **TOAST-02**: Toast slides in from bottom with emphasized easing
- [x] **TOAST-03**: Toast auto-dismisses after configurable duration

### PriceAlertCard

- [ ] **PRICE-01**: PriceAlertCard renders fare estimate with currency and amount prominently displayed
- [ ] **PRICE-02**: PriceAlertCard shows surge pricing indicator with multiplier badge (e.g. 1.5x) when surge is active
- [ ] **PRICE-03**: PriceAlertCard displays fare breakdown (base fare, distance, time, surge, total) in a structured list
- [ ] **PRICE-04**: PriceAlertCard uses Truf card styling (surface bg, border, lg radius, hover elevation)

### RideMap

- [ ] **MAP-01**: RideMap renders a Google Maps embed with Truf-styled container (border, radius, shadow)
- [ ] **MAP-02**: RideMap displays pickup and dropoff markers with custom Truf-branded pins (lime accent)
- [ ] **MAP-03**: RideMap renders route polyline between pickup and dropoff points
- [ ] **MAP-04**: RideMap accepts lat/lng props for pickup, dropoff, and optional driver location

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
| INFRA-01 | Phase 1 | Pending |
| INFRA-02 | Phase 1 | Pending |
| INFRA-03 | Phase 1 | Pending |
| INFRA-04 | Phase 1 | Pending |
| INFRA-05 | Phase 4 | Pending |
| INFRA-06 | Phase 4 | Pending |
| TOKEN-01 | Phase 1 | Complete |
| TOKEN-02 | Phase 1 | Complete |
| TOKEN-03 | Phase 1 | Complete |
| TOKEN-04 | Phase 1 | Complete |
| TOKEN-05 | Phase 1 | Complete |
| TOKEN-06 | Phase 1 | Complete |
| TOKEN-07 | Phase 1 | Complete |
| STYLE-01 | Phase 1 | Complete |
| STYLE-02 | Phase 1 | Complete |
| STYLE-03 | Phase 1 | Complete |
| STYLE-04 | Phase 1 | Complete |
| STYLE-05 | Phase 1 | Complete |
| BTN-01 | Phase 2 | Complete |
| BTN-02 | Phase 2 | Complete |
| BTN-03 | Phase 2 | Complete |
| BTN-04 | Phase 2 | Complete |
| BTN-05 | Phase 2 | Complete |
| BTN-06 | Phase 2 | Complete |
| BTN-07 | Phase 2 | Complete |
| INPUT-01 | Phase 2 | Complete |
| INPUT-02 | Phase 2 | Complete |
| INPUT-03 | Phase 2 | Complete |
| INPUT-04 | Phase 2 | Complete |
| CARD-01 | Phase 2 | Complete |
| CARD-02 | Phase 2 | Complete |
| BADGE-01 | Phase 3 | Complete |
| BADGE-02 | Phase 3 | Complete |
| BADGE-03 | Phase 3 | Complete |
| BADGE-04 | Phase 3 | Complete |
| BADGE-05 | Phase 3 | Complete |
| CHIP-01 | Phase 3 | Complete |
| CHIP-02 | Phase 3 | Complete |
| CHIP-03 | Phase 3 | Complete |
| ALERT-01 | Phase 3 | Complete |
| ALERT-02 | Phase 3 | Complete |
| ALERT-03 | Phase 3 | Complete |
| ALERT-04 | Phase 3 | Complete |
| ALERT-05 | Phase 3 | Complete |
| SWITCH-01 | Phase 2 | Complete |
| SWITCH-02 | Phase 2 | Complete |
| SWITCH-03 | Phase 2 | Complete |
| CHECK-01 | Phase 2 | Complete |
| CHECK-02 | Phase 2 | Complete |
| CHECK-03 | Phase 2 | Complete |
| TABS-01 | Phase 2 | Complete |
| TABS-02 | Phase 2 | Complete |
| TABS-03 | Phase 2 | Complete |
| TABS-04 | Phase 2 | Complete |
| PROG-01 | Phase 3 | Complete |
| PROG-02 | Phase 3 | Complete |
| PROG-03 | Phase 3 | Complete |
| SKEL-01 | Phase 3 | Complete |
| SKEL-02 | Phase 3 | Complete |
| TOAST-01 | Phase 3 | Complete |
| TOAST-02 | Phase 3 | Complete |
| TOAST-03 | Phase 3 | Complete |
| PRICE-01 | Phase 3 | Pending |
| PRICE-02 | Phase 3 | Pending |
| PRICE-03 | Phase 3 | Pending |
| PRICE-04 | Phase 3 | Pending |
| MAP-01 | Phase 3 | Pending |
| MAP-02 | Phase 3 | Pending |
| MAP-03 | Phase 3 | Pending |
| MAP-04 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 70 total
- Mapped to phases: 70
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-19*
*Last updated: 2026-04-19 — phase mappings added after roadmap creation*
