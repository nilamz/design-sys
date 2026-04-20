---
phase: 03-display-feedback-components
plan: 03
subsystem: ui
tags: [react, tailwind, storybook, vitest, composite-components, google-maps, price-alert]

requires:
  - phase: 03-display-feedback-components
    plan: 01
    provides: Badge component (lime variant for surge), Card component (wrapper)

provides:
  - PriceAlertCard composite component composing Card + Badge
  - RideMap Google Maps wrapper with Truf-branded container and lime-accent markers

affects: [storybook, index-exports, google-maps-integration]

tech-stack:
  added:
    - "@vis.gl/react-google-maps@^1.5.3 — Google Maps React wrapper"
  patterns:
    - "Graceful fallback pattern — render placeholder div when external service key is absent"
    - "JSDOM mock pattern — vi.mock() entire external map library, test only container/fallback"
    - "Hardcoded hex values in Google Maps Pin props — CSS vars cannot be read by Maps JS API (Pitfall 3)"
    - "Polyline exported directly from @vis.gl/react-google-maps — no useMap useEffect needed"

key-files:
  created:
    - src/components/PriceAlertCard/PriceAlertCard.tsx
    - src/components/PriceAlertCard/PriceAlertCard.stories.tsx
    - src/components/PriceAlertCard/PriceAlertCard.test.tsx
    - src/components/PriceAlertCard/index.ts
    - src/components/RideMap/RideMap.tsx
    - src/components/RideMap/RideMap.stories.tsx
    - src/components/RideMap/RideMap.test.tsx
    - src/components/RideMap/index.ts
  modified:
    - package.json
    - package-lock.json

key-decisions:
  - "Polyline used as direct component import — @vis.gl/react-google-maps v1.x exports Polyline directly, no useMap useEffect needed"
  - "RideMap tests mock entire @vis.gl/react-google-maps via vi.mock() — JSDOM cannot initialize Google Maps JS API"
  - "Pin marker colors hardcoded as hex (#2DD653, #061A13) — Google Maps JS API reads inline values, not CSS custom properties"
  - "RideMap renders fallback placeholder div (not null) when apiKey is empty — enables Storybook NoApiKey story and container tests without real key"

duration: 5min
completed: 2026-04-20
---

# Phase 03 Plan 03: PriceAlertCard and RideMap Summary

**PriceAlertCard composing Card + Badge for fare display with surge indicator; RideMap wrapping @vis.gl/react-google-maps with Truf-branded container, lime-accent markers, and route polyline**

## Performance

- **Duration:** 5 min
- **Started:** 2026-04-20T10:22:46Z
- **Completed:** 2026-04-20T10:27:22Z
- **Tasks:** 2
- **Files modified:** 10

## Accomplishments

- PriceAlertCard composes Card wrapper + Badge (lime variant) to display fare amount prominently with optional surge multiplier badge
- Fare breakdown dl/dt/dd list with border-t total separator using CSS token colors
- RideMap wraps @vis.gl/react-google-maps with Truf-styled container (rounded-lg, border, shadow-md, 320px)
- Lime-accent AdvancedMarker + Pin components with hardcoded hex values for pickup, dropoff, and optional driver positions
- Polyline route rendered directly using `<Polyline>` component (strokeColor #2DD653, weight 3, opacity 0.85)
- Graceful fallback placeholder rendered when apiKey is empty — enables Storybook NoApiKey story
- 6 Storybook stories pass across both components (3 PriceAlertCard + 3 RideMap)

## Task Commits

Each task was committed atomically:

1. **Task 1: PriceAlertCard component with stories and tests** - `d63a1ac` (feat)
2. **Task 2: RideMap component with stories, tests, and @vis.gl/react-google-maps install** - `e9d25cb` (feat)

## Files Created/Modified

- `src/components/PriceAlertCard/PriceAlertCard.tsx` - Composite fare display card composing Card + Badge
- `src/components/PriceAlertCard/PriceAlertCard.stories.tsx` - Stories: Default, WithSurge, HighSurge
- `src/components/PriceAlertCard/PriceAlertCard.test.tsx` - 5 tests via Storybook runner
- `src/components/PriceAlertCard/index.ts` - Re-export PriceAlertCard + FareBreakdown type
- `src/components/RideMap/RideMap.tsx` - Google Maps wrapper, Truf container, lime markers, Polyline route
- `src/components/RideMap/RideMap.stories.tsx` - Stories: Default, WithDriver, NoApiKey
- `src/components/RideMap/RideMap.test.tsx` - 3 tests (container classes, fallback, height style) with vi.mock
- `src/components/RideMap/index.ts` - Re-export RideMap + LatLng type
- `package.json` - Added @vis.gl/react-google-maps dependency
- `package-lock.json` - Lockfile updated

## Decisions Made

- Polyline used as a direct `<Polyline>` component import — the plan noted it might not be exported but @vis.gl/react-google-maps v1.x exports it directly alongside APIProvider/Map/AdvancedMarker/Pin
- RideMap tests use `vi.mock('@vis.gl/react-google-maps', ...)` to replace all exports with lightweight JSDOM-safe stubs — avoids "google is not defined" errors in test environment
- Pin marker colors use hardcoded hex values (#2DD653, #061A13) per plan Pitfall 3 — Google Maps JS API renders Pin in a shadow DOM context that cannot access CSS custom properties
- Empty apiKey renders a styled fallback div (same container dimensions/classes) with "Map requires API key" message — enables visual testing in Storybook without requiring Google Cloud credentials

## Deviations from Plan

None — plan executed exactly as written. Polyline was available as a direct component export (plan noted this as uncertain), no useMap useEffect was needed.

## Issues Encountered

None.

## User Setup Required

To enable live Google Maps rendering in RideMap:
1. Go to Google Cloud Console -> APIs & Services -> Credentials
2. Create API Key -> Enable Maps JavaScript API
3. Set `VITE_GOOGLE_MAPS_API_KEY=your-key` in `.env.local`
4. Without the key, Storybook shows the fallback placeholder (all tests still pass)

## Next Phase Readiness

- PriceAlertCard and RideMap are ready for use in Truf product surfaces
- All components follow standard import pattern: `import { PriceAlertCard } from '@/components/PriceAlertCard'`
- Phase 3 is now complete (3 of 3 plans done)
- Phase 4 (Data Display Components) can proceed immediately
- No blockers or concerns

---
*Phase: 03-display-feedback-components*
*Completed: 2026-04-20*

## Self-Check: PASSED

- FOUND: src/components/PriceAlertCard/PriceAlertCard.tsx
- FOUND: src/components/PriceAlertCard/PriceAlertCard.stories.tsx
- FOUND: src/components/PriceAlertCard/PriceAlertCard.test.tsx
- FOUND: src/components/PriceAlertCard/index.ts
- FOUND: src/components/RideMap/RideMap.tsx
- FOUND: src/components/RideMap/RideMap.stories.tsx
- FOUND: src/components/RideMap/RideMap.test.tsx
- FOUND: src/components/RideMap/index.ts
- FOUND: .planning/phases/03-display-feedback-components/03-03-SUMMARY.md
- COMMIT d63a1ac: feat(03-03): create PriceAlertCard composite component
- COMMIT e9d25cb: feat(03-03): create RideMap Google Maps component with Truf styling
