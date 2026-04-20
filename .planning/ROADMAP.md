# Roadmap: Truf Design System

## Overview

Four phases take this from zero to a published npm package. Phase 1 lays the complete token and styling foundation — nothing else builds without it. Phases 2 and 3 implement all components in two natural clusters: interactive controls first, then display and feedback components. Phase 4 wires up the barrel export and npm publishing config so the library can be consumed by any Truf product.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Project scaffold, all design tokens, and theme system ready (completed 2026-04-19)
- [x] **Phase 2: Core Interactive Components** - Button, Input, Card, Switch, Checkbox, and Tabs implemented and documented (1/2 plans complete) (completed 2026-04-20)
- [ ] **Phase 3: Display & Feedback Components** - Badge, Chip, Alert, Progress, Skeleton, Toast, PriceAlertCard, and RideMap implemented and documented
- [ ] **Phase 4: Package & Publish** - Barrel export and npm publishing config complete

## Phase Details

### Phase 1: Foundation
**Goal**: The project is runnable, every design token is defined as CSS custom properties, Tailwind maps to tokens via @theme, and dark/light theming works
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02, INFRA-03, INFRA-04, TOKEN-01, TOKEN-02, TOKEN-03, TOKEN-04, TOKEN-05, TOKEN-06, TOKEN-07, STYLE-01, STYLE-02, STYLE-03, STYLE-04, STYLE-05
**Success Criteria** (what must be TRUE):
  1. Running `npm run dev` starts a Vite dev server with no errors
  2. Running `npm run storybook` opens Storybook 8 with no errors
  3. All token CSS files exist in src/tokens/ and contain --truf-* values (colors, spacing, type scale, radii, shadows, motion, z-index)
  4. globals.css generates --truf-* CSS custom properties for every token, visible in browser DevTools
  5. Switching data-theme="light" on the root element changes the page appearance from dark to light (semantic aliases swap correctly)
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md — Scaffold Vite + React 18 + TypeScript project with Tailwind CSS v4 and Storybook 8
- [x] 01-02-PLAN.md — Define all design tokens as CSS files and wire globals.css with @theme mapping and dark/light themes

### Phase 2: Core Interactive Components
**Goal**: Button, Input (with FieldGroup), Card, Switch, Checkbox, and Tabs are all implemented with correct Truf styling, documented in Storybook, and have test files
**Depends on**: Phase 1
**Requirements**: BTN-01, BTN-02, BTN-03, BTN-04, BTN-05, BTN-06, BTN-07, INPUT-01, INPUT-02, INPUT-03, INPUT-04, CARD-01, CARD-02, SWITCH-01, SWITCH-02, SWITCH-03, CHECK-01, CHECK-02, CHECK-03, TABS-01, TABS-02, TABS-03, TABS-04
**Success Criteria** (what must be TRUE):
  1. Storybook shows all three Button variants (contained, outlined, text) in all three sizes with disabled state and correct pill border-radius
  2. Storybook shows Input with lime focus ring, placeholder, and FieldGroup wrapping with label and help text
  3. Card hover elevates with lime border accent and translateY(-2px) transition
  4. Switch and Checkbox render both checked and unchecked states with correct lime accent, and each wraps a proper input element
  5. Tabs display active indicator (lime bottom border) and respond to controlled active state prop
**Plans**: TBD

Plans:
- [x] 02-01: Implement Button, Input, FieldGroup, and Card components with stories and test files (completed 2026-04-20)
- [ ] 02-02: Implement Switch, Checkbox, and Tabs components with stories and test files

### Phase 3: Display & Feedback Components
**Goal**: Badge, Chip, Alert, Progress, Skeleton, Toast, PriceAlertCard, and RideMap are all implemented with correct Truf styling, documented in Storybook, and have test files
**Depends on**: Phase 2
**Requirements**: BADGE-01, BADGE-02, BADGE-03, BADGE-04, BADGE-05, CHIP-01, CHIP-02, CHIP-03, ALERT-01, ALERT-02, ALERT-03, ALERT-04, ALERT-05, PROG-01, PROG-02, PROG-03, SKEL-01, SKEL-02, TOAST-01, TOAST-02, TOAST-03, PRICE-01, PRICE-02, PRICE-03, PRICE-04, MAP-01, MAP-02, MAP-03, MAP-04
**Success Criteria** (what must be TRUE):
  1. Storybook shows all four Badge variants (lime, forest, mint, outline) with pill border-radius and mono font
  2. Chip renders active (lime) and inactive (mint) states with pill radius and clickable cursor
  3. Alert renders all four semantic variants (success, warning, error, info) with correct left border color and tinted background
  4. Progress bar animates width transition and accepts a 0-100 value prop; Skeleton shows shimmer animation
  5. Toast slides in from bottom with emphasized easing, renders with lime bg, and auto-dismisses after a configurable duration
  6. PriceAlertCard displays fare estimate, surge multiplier badge, and fare breakdown list with Truf card styling
  7. RideMap renders Google Maps with Truf-styled container, custom lime-accent pins for pickup/dropoff, and route polyline
**Plans**: 3 plans

Plans:
- [ ] 03-01-PLAN.md — Implement Badge, Chip, and Alert components with stories and test files
- [ ] 03-02-PLAN.md — Implement Progress, Skeleton, and Toast components with CSS keyframe animations
- [ ] 03-03-PLAN.md — Implement PriceAlertCard and RideMap composite components

### Phase 4: Package & Publish
**Goal**: The library has a single barrel export and is fully configured for npm publishing so any Truf product can install and use it
**Depends on**: Phase 3
**Requirements**: INFRA-05, INFRA-06
**Success Criteria** (what must be TRUE):
  1. src/index.ts exports every component and token, and a consuming project can import directly from the package name
  2. Running `npm run build` produces a dist/ output and package.json exports field resolves correctly for ESM and CJS consumers
**Plans**: TBD

Plans:
- [ ] 04-01: Wire barrel export and configure package.json for npm publishing

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/2 | Complete    | 2026-04-19 |
| 2. Core Interactive Components | 2/2 | Complete   | 2026-04-20 |
| 3. Display & Feedback Components | 2/3 | In Progress|  |
| 4. Package & Publish | 0/1 | Not started | - |
