---
phase: 04-package-publish
verified: 2026-04-20T17:00:00Z
status: gaps_found
score: 4/5 must-haves verified
gaps:
  - truth: "A consuming project can import { Button, Card, Toast } from the package name"
    status: partial
    reason: "dist/index.d.ts contains 'import ./styles/globals.css' but dist/styles/globals.css.d.ts was not copied to dist/. A consuming project with TypeScript will get TS2307 on the CSS import in the type declarations unless it has both allowArbitraryExtensions enabled AND a local stub for that path — which the consuming project should not need to provide."
    artifacts:
      - path: "dist/index.d.ts"
        issue: "Line 1 is 'import ./styles/globals.css'; but dist/styles/ directory does not exist. The src/styles/globals.css.d.ts stub was created in src but never propagated to dist."
      - path: "dist/styles/"
        issue: "Directory does not exist. tsc emitDeclarationOnly only emits .d.ts for .ts/.tsx source files, not for hand-authored .d.ts stubs. The globals.css.d.ts must be manually copied to dist/styles/ during the build step."
    missing:
      - "Copy src/styles/globals.css.d.ts to dist/styles/globals.css.d.ts as part of the build script"
      - "Update build script in package.json to: vite build && tsc --project tsconfig.lib.json && mkdir -p dist/styles && cp src/styles/globals.css.d.ts dist/styles/globals.css.d.ts"
      - "Or alternatively: remove the CSS import from src/index.ts entirely (since Vite already handles CSS extraction via cssFileName) and remove the CSS import from dist/index.d.ts if it was committed"
---

# Phase 4: Package Publish Verification Report

**Phase Goal:** The library has a single barrel export and is fully configured for npm publishing so any Truf product can install and use it
**Verified:** 2026-04-20T17:00:00Z
**Status:** gaps_found
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | A consuming project can import { Button, Card, Toast } from the package name | PARTIAL | JS bundle exports all 16 components correctly (verified in dist/truf-design-system.js). Types exist in dist/index.d.ts for all 16. However dist/index.d.ts line 1 imports './styles/globals.css' which has no corresponding dist/styles/globals.css.d.ts — TS consumers will error on this path. |
| 2 | Running npm run build produces dist/ with ESM output, CSS, and type declarations | VERIFIED | dist/truf-design-system.js (14,756 bytes), dist/styles.css (24,604 bytes), dist/index.d.ts and all 16 dist/components/*/index.d.ts + *.d.ts files exist. Build completed as of 2026-04-20T16:21. |
| 3 | package.json exports field resolves correctly for ESM consumers | VERIFIED | exports field has "." with import/types entries pointing to dist/, "./styles" and "./styles.css" both pointing to dist/styles.css. name is @truf/design-system, version 0.1.0, private field removed, peerDependencies correct, files field present, sideEffects set. |

**Score:** 4/5 truths verified (Truth 1 is partial — JS works, TS types have a broken CSS import path)

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/index.ts` | Barrel export of all 16 components and their public types (min 20 lines) | VERIFIED | 27 lines. Exports: Alert, Badge, Button, Card, Checkbox (+CheckboxProps), Chip, FieldGroup, Input, PriceAlertCard (+FareBreakdown), Progress, RadioButton (+RadioButtonProps), RideMap (+LatLng), Skeleton, Switch (+SwitchProps), Tabs (+Tab, TabsProps), Toast. 16 components + 7 types + 1 CSS import. 24 export lines. |
| `package.json` | npm publishing config with exports, main, module, types, peerDependencies | VERIFIED | name: @truf/design-system, version: 0.1.0, main/module/types set, exports map complete with . and ./styles entries, peerDependencies for react/react-dom/@vis.gl, peerDependenciesMeta marks maps optional, files: [dist, README.md], sideEffects: [*.css]. |
| `vite.config.ts` | Library mode build configuration | VERIFIED | build.lib.entry = path.resolve(dirname, 'src/index.ts'), formats: ['es'], fileName: 'truf-design-system', cssFileName: 'styles'. rollupOptions.external excludes react, react-dom, react/jsx-runtime, @vis.gl/react-google-maps. tailwindcss() plugin retained. |
| `tsconfig.lib.json` | TypeScript config for declaration emit | VERIFIED | declaration: true, declarationDir: dist, emitDeclarationOnly: true, rootDir: src, allowArbitraryExtensions: true. Excludes test, stories, App.tsx, main.tsx. |
| `dist/styles/globals.css.d.ts` | Type stub for CSS side-effect import in dist/index.d.ts | MISSING | dist/styles/ directory does not exist. tsc emitDeclarationOnly only processes .ts/.tsx source files — it does not copy hand-authored .d.ts stubs. dist/index.d.ts line 1 has an unresolvable CSS import for type consumers. |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `src/index.ts` | `src/components/*/index.ts` | re-export from each component barrel | WIRED | All 16 components use `export { X } from './components/X'` pattern. All 16 src/components/*/index.ts barrel files confirmed present. |
| `package.json` | `dist/` | exports field pointing to dist outputs | WIRED | exports["."].import = "./dist/truf-design-system.js", exports["./styles"] = "./dist/styles.css". Both files exist in dist/. |
| `vite.config.ts` | `src/index.ts` | build.lib.entry | WIRED | build.lib.entry = path.resolve(dirname, 'src/index.ts'). JS bundle confirmed produced at dist/truf-design-system.js with all 16 component exports. |
| `dist/index.d.ts` | `dist/styles/globals.css.d.ts` | CSS side-effect import on line 1 | NOT WIRED | dist/index.d.ts line 1: `import './styles/globals.css';`. dist/styles/ does not exist. This breaks TS type resolution for consumers. |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| INFRA-05 | 04-01-PLAN.md | Barrel export from src/index.ts exposes all components and tokens | SATISFIED | src/index.ts exports all 16 components and 7 public types. dist/index.d.ts mirrors all exports. Wiring to each component barrel verified. |
| INFRA-06 | 04-01-PLAN.md | Package.json configured for npm publishing with proper exports field | SATISFIED | package.json has name @truf/design-system, version 0.1.0, exports map, peerDependencies, files, sideEffects. All fields from the plan requirement are present and correctly valued. |

Both Phase 4 requirements (INFRA-05, INFRA-06) are satisfied at the configuration level. The gap is an implementation artifact (missing CSS .d.ts in dist/) that affects TS consumers, not the requirement definition itself.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `dist/index.d.ts` | 1 | `import './styles/globals.css'` with no corresponding dist/styles/globals.css.d.ts | Warning | TS consumers get TS2307 error when resolving types from the package unless they add allowArbitraryExtensions themselves — this is a build artifact issue, not a code issue |

No TODO/FIXME/placeholder patterns found in src/index.ts, vite.config.ts, tsconfig.lib.json, or package.json.

### Human Verification Required

#### 1. Storybook dev workflow

**Test:** Run `npm run storybook` and verify stories load for all 16 components
**Expected:** Storybook server starts at localhost:6006 with all component stories accessible
**Why human:** Cannot verify browser rendering programmatically in this context

#### 2. npm pack dry run

**Test:** Run `npm pack --dry-run` and verify the listed files include dist/ contents and README.md but exclude src/, node_modules/, .storybook/, etc.
**Expected:** Package contains only dist/ and README.md per the files field
**Why human:** Requires interactive inspection of pack output

### Gaps Summary

One gap blocks complete goal achievement for TypeScript consumers:

**dist/styles/globals.css.d.ts missing from dist/**

`dist/index.d.ts` was emitted by tsc with the CSS side-effect import intact (`import './styles/globals.css';`). The source project has `src/styles/globals.css.d.ts` as a hand-authored type stub to satisfy tsc locally. However, tsc's `emitDeclarationOnly` mode only emits `.d.ts` files for `.ts`/`.tsx` source files — it does not copy pre-existing `.d.ts` stubs. As a result, `dist/styles/` does not exist, and any TypeScript consuming project will fail type resolution on the CSS import in `dist/index.d.ts`.

**Fix options (in order of cleanliness):**

1. Add a copy step to the build script: `vite build && tsc --project tsconfig.lib.json && node -e "require('fs').mkdirSync('dist/styles',{recursive:true}); require('fs').copyFileSync('src/styles/globals.css.d.ts','dist/styles/globals.css.d.ts')"`

2. Use the `cp` command if on Unix: `vite build && tsc --project tsconfig.lib.json && mkdir -p dist/styles && cp src/styles/globals.css.d.ts dist/styles/globals.css.d.ts`

3. Remove the CSS import from `src/index.ts` entirely. Vite handles CSS extraction via `cssFileName` — the CSS import in `index.ts` is only needed to trigger Vite's CSS pipeline, and if removed, `dist/index.d.ts` will not have the broken import. Consumers import CSS separately via `import '@truf/design-system/styles'`.

Option 3 is the cleanest: the CSS import in index.ts was a workaround for Vite's CSS processing, not a semantic export. Removing it eliminates the entire class of problem.

The JS runtime is unaffected — `dist/truf-design-system.js` contains no CSS import (Vite strips it and extracts to `styles.css`). Only TypeScript consumers using the type declarations will encounter this issue.

---

_Verified: 2026-04-20T17:00:00Z_
_Verifier: Claude (gsd-verifier)_
