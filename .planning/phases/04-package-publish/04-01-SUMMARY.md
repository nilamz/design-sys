---
phase: 04-package-publish
plan: 01
subsystem: infra
tags: [vite, typescript, npm, esm, library-mode, tailwindcss]

# Dependency graph
requires:
  - phase: 03-display-feedback-components
    provides: All 16 components fully implemented and exported from component barrels
  - phase: 01-foundation
    provides: Design tokens and globals.css (exported to dist/styles.css)
provides:
  - Barrel export (src/index.ts) re-exporting all 16 components and 7 public types
  - Vite library mode build producing dist/truf-design-system.js and dist/styles.css
  - TypeScript declarations in dist/ via tsconfig.lib.json
  - package.json configured for npm scoped publish as @truf/design-system
affects: [consuming-apps, npm-publish, storybook]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Vite library mode with cssFileName in build.lib for CSS extraction"
    - "tsc --project tsconfig.lib.json emitDeclarationOnly after vite build to preserve dist/"
    - "globals.css.d.ts type declaration for allowArbitraryExtensions CSS side-effect import"
    - "vite build first, then tsc — prevents vite emptyOutDir from cleaning declarations"

key-files:
  created:
    - src/index.ts
    - tsconfig.lib.json
    - src/styles/globals.css.d.ts
  modified:
    - vite.config.ts
    - package.json
    - src/components/RadioButton/RadioButton.tsx

key-decisions:
  - "04-01: Build script order is vite build then tsc — vite cleans dist first, tsc adds declarations after"
  - "04-01: cssFileName belongs in build.lib (not build root) in Vite 8.x"
  - "04-01: CSS imported in index.ts so Tailwind plugin processes it during library build — cssFileName names the output styles.css"
  - "04-01: react/react-dom/@vis.gl moved to devDependencies — listed as peerDependencies, needed for dev but not bundled"
  - "04-01: globals.css.d.ts created alongside globals.css to satisfy allowArbitraryExtensions in tsconfig.lib.json"

patterns-established:
  - "Library build: vite produces JS + CSS bundle, tsc produces .d.ts declarations"
  - "Package exports: . entry for JS/types, ./styles entry for CSS"

requirements-completed: [INFRA-05, INFRA-06]

# Metrics
duration: 15min
completed: 2026-04-20
---

# Phase 4 Plan 01: Package Publish Summary

**ESM library bundle (@truf/design-system v0.1.0) with barrel export of all 16 components, Vite library build producing dist/truf-design-system.js + dist/styles.css, and scoped npm publishing config**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-04-20T10:35:00Z
- **Completed:** 2026-04-20T10:51:00Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- src/index.ts barrel exports all 16 components (Alert, Badge, Button, Card, Checkbox, Chip, FieldGroup, Input, PriceAlertCard, Progress, RadioButton, RideMap, Skeleton, Switch, Tabs, Toast) and 7 public types
- Vite library mode build produces dist/truf-design-system.js (14.75 kB) and dist/styles.css (24.60 kB) with all Truf design tokens
- package.json renamed to @truf/design-system v0.1.0 with exports map, peerDependencies, files field, and sideEffects

## Task Commits

Each task was committed atomically:

1. **Task 1: Create barrel export and library build configuration** - `4721704` (feat)
2. **Task 2: Configure package.json for npm publishing** - `54a9910` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `src/index.ts` - Barrel export of all 16 components and 7 public types
- `tsconfig.lib.json` - TypeScript config for declaration-only emit to dist/
- `vite.config.ts` - Library mode build config (ESM, external peer deps, styles.css output)
- `package.json` - @truf/design-system v0.1.0 with exports, peerDeps, files, sideEffects
- `src/styles/globals.css.d.ts` - Type declaration for CSS side-effect import
- `src/components/RadioButton/RadioButton.tsx` - Removed unused React import

## Decisions Made
- Build script order: `vite build && tsc --project tsconfig.lib.json` — Vite cleans dist on startup so tsc must run after
- `cssFileName: 'styles'` belongs inside `build.lib` (not at `build` root) in Vite 8.x
- globals.css is imported in src/index.ts so Tailwind's Vite plugin processes it during library build; Vite then extracts it to dist/styles.css named by cssFileName
- react, react-dom, @vis.gl/react-google-maps moved to devDependencies (still used in dev/Storybook) and listed as peerDependencies (not bundled in output)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed unused React import in RadioButton.tsx**
- **Found during:** Task 1 (first build attempt)
- **Issue:** `import React from 'react'` was unused causing TS6133 error
- **Fix:** Removed the import — JSX uses react-jsx transform, no explicit import needed
- **Files modified:** src/components/RadioButton/RadioButton.tsx
- **Verification:** Build passes
- **Committed in:** 4721704 (Task 1 commit)

**2. [Rule 1 - Bug] Fixed cssFileName placement in vite.config.ts**
- **Found during:** Task 1 (first build attempt)
- **Issue:** `cssFileName` placed at `build` root — Vite 8.x expects it inside `build.lib`
- **Fix:** Moved `cssFileName: 'styles'` into `build.lib` object
- **Files modified:** vite.config.ts
- **Verification:** Build produces dist/styles.css
- **Committed in:** 4721704 (Task 1 commit)

**3. [Rule 1 - Bug] Added rootDir to tsconfig.lib.json**
- **Found during:** Task 2 (updated build script with tsc --project tsconfig.lib.json)
- **Issue:** TS5011 error — declarationDir requires rootDir to be set
- **Fix:** Added `"rootDir": "src"` to tsconfig.lib.json compilerOptions
- **Files modified:** tsconfig.lib.json
- **Verification:** tsc emits to dist/ correctly
- **Committed in:** 54a9910 (Task 2 commit)

**4. [Rule 1 - Bug] Added allowArbitraryExtensions + globals.css.d.ts for CSS import**
- **Found during:** Task 2 (tsc failing on CSS side-effect import)
- **Issue:** TS2882 error — tsc cannot type-check side-effect CSS imports without declaration file
- **Fix:** Added `allowArbitraryExtensions: true` to tsconfig.lib.json and created `src/styles/globals.css.d.ts`
- **Files modified:** tsconfig.lib.json, src/styles/globals.css.d.ts (new)
- **Verification:** tsc compiles cleanly, declarations emitted
- **Committed in:** 54a9910 (Task 2 commit)

**5. [Rule 1 - Bug] Reversed build script order to preserve declarations**
- **Found during:** Task 2 (post-build verification)
- **Issue:** Original plan order `tsc && vite build` caused vite to clean dist and delete .d.ts files
- **Fix:** Changed to `vite build && tsc --project tsconfig.lib.json` so declarations are added after Vite's clean step
- **Files modified:** package.json (build script)
- **Verification:** dist/ contains truf-design-system.js, styles.css, index.d.ts, components/
- **Committed in:** 54a9910 (Task 2 commit)

---

**Total deviations:** 5 auto-fixed (all Rule 1 - bugs)
**Impact on plan:** All fixes required for correct build output. No scope creep. Vite 8.x API differences from plan's assumed version required adaptation.

## Issues Encountered
- Vite 8.x does not support `rollupOptions.input` with CSS files when `cssCodeSplit: false` (library mode default) — resolved by importing CSS from index.ts instead
- Vite's `emptyOutDir` behavior in library mode cleans dist before build, requiring tsc to run after vite

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Package is ready to publish to npm: `npm publish --access public`
- Consuming projects can: `import { Button } from '@truf/design-system'` and `import '@truf/design-system/styles'`
- All 16 components available, tree-shakeable (sideEffects: ["*.css"])
- Storybook dev workflow unchanged

---
*Phase: 04-package-publish*
*Completed: 2026-04-20*
