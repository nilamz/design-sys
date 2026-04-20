# Phase 3: Display & Feedback Components - Research

**Researched:** 2026-04-20
**Domain:** React display/feedback components, CSS animation, Google Maps integration
**Confidence:** HIGH (project patterns), MEDIUM (Google Maps API specifics)

---

## Summary

Phase 3 builds eight components on top of the token + component foundations from Phases 1 and 2. Six components (Badge, Chip, Alert, Progress, Skeleton, Toast) are pure CSS/React with no new dependencies — they follow the exact same Tailwind v4 + semantic CSS var pattern already established. The remaining two (PriceAlertCard and RideMap) are composite components: PriceAlertCard composes the existing Card component with Badge, and RideMap requires one new dependency (`@vis.gl/react-google-maps` + a Google Maps API key).

Toast is the most behaviorally complex component in the batch: it requires CSS keyframe animation (not just transition), an auto-dismiss timer, and a portal/fixed-position container. Skeleton requires a CSS shimmer keyframe animation added to components.css. All other components are stateless and purely presentational.

The RideMap requirement is the highest-risk item because it needs an API key to function, which creates a Storybook integration concern. The recommended approach is to accept the API key as a required prop and provide a mock/static story that gracefully shows the container without an active map when no key is present.

**Primary recommendation:** Implement the six pure-CSS components first (Badge, Chip, Alert, Progress, Skeleton, Toast), then tackle PriceAlertCard (composing existing Card + Badge), and finally RideMap with `@vis.gl/react-google-maps`. All six CSS components follow patterns already proven in Phase 2 — no research risk.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| BADGE-01 | Badge renders lime variant (lime bg, forest text) | Tailwind utility classes: `bg-lime-500 text-forest-900`. Same Tailwind v4 + token pattern as Button. |
| BADGE-02 | Badge renders forest variant (forest-600 bg, cream text) | `bg-forest-600 text-cream`. Colors present in globals.css @theme. |
| BADGE-03 | Badge renders mint variant (mint-200 bg, forest text) | `bg-mint-200 text-forest-900`. mint-200 is a mapped Tailwind token. |
| BADGE-04 | Badge renders outline variant (transparent bg, border) | Use inline style `borderColor: 'var(--border-strong)'` like Button outlined. |
| BADGE-05 | Badge uses pill border-radius and mono font | `rounded-pill font-mono` — both tokens mapped in @theme. |
| CHIP-01 | Chip renders active state (lime bg, forest text) | Same color pair as Badge lime. Clickable with `onClick` prop. |
| CHIP-02 | Chip renders inactive state (mint bg, forest text) | `background: var(--surface-2)` or `bg-mint-200` per brand. |
| CHIP-03 | Chip has pill border-radius and clickable cursor | `rounded-pill cursor-pointer`. |
| ALERT-01 | Alert renders success variant (green left border, green-tinted bg) | Left border via `border-l-4 border-success`. Tinted bg via inline style with low-opacity color. |
| ALERT-02 | Alert renders warning variant (yellow left border, yellow-tinted bg) | Same pattern with `--truf-warning` color. |
| ALERT-03 | Alert renders error variant (red left border, red-tinted bg) | Same pattern with `--truf-error` color. |
| ALERT-04 | Alert renders info variant (blue left border, blue-tinted bg) | Same pattern with `--truf-info` color. |
| ALERT-05 | Alert supports title (strong) and description content | Two props: `title` (rendered as `<strong>`) and `description` (rendered as `<p>`). |
| PROG-01 | Progress renders track (surface bg, 4px height) | Outer div with `h-[4px]` and inline style `background: var(--surface-2)`. |
| PROG-02 | Progress renders fill bar (lime bg, animated width transition) | Inner div with `bg-lime-500`, width set via inline style as `${value}%`, with CSS transition. |
| PROG-03 | Progress accepts value prop (0-100) | Simple numeric prop; clamp to 0-100 in implementation. |
| SKEL-01 | Skeleton renders shimmer animation (gradient sweep) | CSS @keyframes shimmer in components.css; linear-gradient sweep with background-size/position trick. |
| SKEL-02 | Skeleton supports configurable width/height via className or props | Pass-through className prop (matches Card/Button pattern); allow width/height via className. |
| TOAST-01 | Toast renders with lime bg, forest text, pill radius | `bg-lime-500 text-forest-900 rounded-pill`. Same as Button contained. |
| TOAST-02 | Toast slides in from bottom with emphasized easing | CSS @keyframes toast-enter in components.css; uses `--truf-ease-emphasized` and `--truf-duration-slow`. |
| TOAST-03 | Toast auto-dismisses after configurable duration | `useEffect` with `setTimeout` using `duration` prop (default 3000ms). |
| PRICE-01 | PriceAlertCard renders fare estimate prominently | Compose Card component; render fare amount with display font (`font-display`) at large size. |
| PRICE-02 | PriceAlertCard shows surge multiplier Badge when surge active | Reuse Badge component (lime variant) with text like "1.5x". |
| PRICE-03 | PriceAlertCard displays fare breakdown list | Structured `<dl>` or list of items: base fare, distance, time, surge, total. |
| PRICE-04 | PriceAlertCard uses Truf card styling | Extend Card component directly — wraps children in Card and adds domain-specific layout. |
| MAP-01 | RideMap renders Google Maps with Truf-styled container | Outer div styled like Card (border, radius, shadow). Inner `<Map>` from `@vis.gl/react-google-maps`. |
| MAP-02 | RideMap displays pickup/dropoff markers with lime pins | `<AdvancedMarker>` with custom `<Pin background={trufLime} borderColor={trufForest}>`. |
| MAP-03 | RideMap renders route polyline between pickup and dropoff | `<Polyline path={[pickup, dropoff]} strokeColor="#2DD653" strokeWeight={3}`. |
| MAP-04 | RideMap accepts lat/lng props for pickup, dropoff, driver location | Props typed as `{lat: number, lng: number}` for each position. |
</phase_requirements>

---

## Standard Stack

### Core (no new installs required for 6 of 8 components)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19.2.4 | Component runtime | Already installed |
| Tailwind v4 | 4.2.2 | Utility classes | Already installed, @theme tokens mapped |
| CSS custom properties | native | Semantic token references | Already established pattern |
| CSS @keyframes | native | Shimmer + Toast slide-in animation | No library needed; goes in components.css |

### New Dependency (RideMap only)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @vis.gl/react-google-maps | 1.8.3 | React wrapper for Google Maps JS API | Official Google-sponsored library; `google.maps.Marker` is deprecated — this is the current standard |

**Installation (RideMap only):**
```bash
npm install @vis.gl/react-google-maps
```

No other new dependencies are needed for this phase.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @vis.gl/react-google-maps | google-map-react | google-map-react is older, less maintained; vis.gl is Google-sponsored |
| @vis.gl/react-google-maps | react-leaflet | Leaflet uses OpenStreetMap not Google Maps; requirement specifies Google Maps |
| @vis.gl/react-google-maps | plain iframe embed | iframe embed can't add custom markers or polylines |
| CSS @keyframes (shimmer/toast) | framer-motion | Animation library is explicitly out of scope per REQUIREMENTS.md |

---

## Architecture Patterns

### Recommended Component Structure

All new components follow the identical folder pattern from Phase 2:

```
src/components/
├── Badge/
│   ├── Badge.tsx
│   ├── Badge.stories.tsx
│   ├── Badge.test.tsx
│   └── index.ts
├── Chip/
│   ├── Chip.tsx
│   ├── Chip.stories.tsx
│   ├── Chip.test.tsx
│   └── index.ts
├── Alert/
│   ├── Alert.tsx
│   ├── Alert.stories.tsx
│   ├── Alert.test.tsx
│   └── index.ts
├── Progress/
│   ├── Progress.tsx
│   ├── Progress.stories.tsx
│   ├── Progress.test.tsx
│   └── index.ts
├── Skeleton/
│   ├── Skeleton.tsx
│   ├── Skeleton.stories.tsx
│   ├── Skeleton.test.tsx
│   └── index.ts
├── Toast/
│   ├── Toast.tsx
│   ├── Toast.stories.tsx
│   ├── Toast.test.tsx
│   └── index.ts
├── PriceAlertCard/
│   ├── PriceAlertCard.tsx
│   ├── PriceAlertCard.stories.tsx
│   ├── PriceAlertCard.test.tsx
│   └── index.ts
└── RideMap/
    ├── RideMap.tsx
    ├── RideMap.stories.tsx
    ├── RideMap.test.tsx
    └── index.ts
```

CSS additions go in `src/styles/components.css` (two new blocks: `.skeleton-shimmer` and `.toast-enter`).

### Pattern 1: Stateless Presentational Component (Badge, Chip, Alert, Progress)

**What:** Component with variant/state prop driving a CSS class lookup table. No internal state.
**When to use:** Any purely display component with design variants.

```typescript
// Follows Button.tsx pattern exactly
type BadgeVariant = 'lime' | 'forest' | 'mint' | 'outline';

const variantClasses: Record<BadgeVariant, string> = {
  lime:    'bg-lime-500 text-forest-900',
  forest:  'bg-forest-600 text-cream',
  mint:    'bg-mint-200 text-forest-900',
  outline: 'text-[var(--text-primary)]',
};

export function Badge({ variant = 'lime', children, className = '', style, ...props }: BadgeProps) {
  return (
    <span
      {...props}
      className={[
        'inline-flex items-center px-2.5 py-0.5 text-xs font-mono rounded-pill',
        variantClasses[variant],
        variant === 'outline' ? 'border' : '',
        className,
      ].filter(Boolean).join(' ')}
      style={{
        ...(variant === 'outline' ? { borderColor: 'var(--border-strong)' } : {}),
        ...style,
      }}
    >
      {children}
    </span>
  );
}
```

### Pattern 2: CSS Keyframe Animation in components.css

**What:** Add `@keyframes` blocks and animation classes to `src/styles/components.css`. Tailwind utilities cannot express keyframe animations.
**When to use:** Any animation that is not a simple transition (shimmer, slide-in).

```css
/* In src/styles/components.css */

/* ── Skeleton shimmer ─────────────────────────────────────── */
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    rgba(143, 238, 170, 0.04) 25%,
    rgba(143, 238, 170, 0.10) 50%,
    rgba(143, 238, 170, 0.04) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite ease-in-out;
}

/* ── Toast slide-in ───────────────────────────────────────── */
@keyframes toast-enter {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.toast-enter {
  animation: toast-enter var(--truf-duration-slow) var(--truf-ease-emphasized) forwards;
}
```

### Pattern 3: Stateful Component with Auto-Dismiss (Toast)

**What:** Toast uses `useState` for visibility and `useEffect` for the dismiss timer. Rendered fixed-positioned at bottom of viewport.
**When to use:** Components with timed lifecycle behavior.

```typescript
// Source: project pattern + verified CSS approach
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  duration?: number;
  onDismiss?: () => void;
  visible: boolean;
}

export function Toast({ message, duration = 3000, onDismiss, visible }: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => onDismiss?.(), duration);
    return () => clearTimeout(timer);
  }, [visible, duration, onDismiss]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[600]"
    >
      <div
        className="toast-enter bg-lime-500 text-forest-900 font-semibold rounded-pill px-5 py-3 text-sm shadow-md"
      >
        {message}
      </div>
    </div>
  );
}
```

**Important:** The `z-index: 600` value matches `--truf-z-toast` token directly. Use hardcoded `z-[600]` since the z-index token is not mapped into @theme (only spacing/color/radius/shadow/font are mapped).

### Pattern 4: Composite Component (PriceAlertCard)

**What:** Domain component that composes Card + Badge from the existing component library.
**When to use:** Application-level design patterns that combine base components.

```typescript
import { Card } from '../Card/Card';
import { Badge } from '../Badge/Badge';

interface FareBreakdown {
  baseFare: number;
  distance: number;
  time: number;
  surge: number;
  total: number;
}

interface PriceAlertCardProps {
  amount: number;
  currency?: string;
  surgeMultiplier?: number;
  breakdown: FareBreakdown;
}

export function PriceAlertCard({ amount, currency = '$', surgeMultiplier, breakdown }: PriceAlertCardProps) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <span className="font-display text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
          {currency}{amount.toFixed(2)}
        </span>
        {surgeMultiplier && surgeMultiplier > 1 && (
          <Badge variant="lime">{surgeMultiplier}x</Badge>
        )}
      </div>
      {/* fare breakdown list */}
    </Card>
  );
}
```

### Pattern 5: Google Maps Component (RideMap)

**What:** Wraps `@vis.gl/react-google-maps` with Truf-branded container. Requires API key as prop.
**When to use:** Only for RideMap.

```typescript
import { APIProvider, Map, AdvancedMarker, Pin, Polyline } from '@vis.gl/react-google-maps';

interface LatLng { lat: number; lng: number; }

interface RideMapProps {
  apiKey: string;
  pickup: LatLng;
  dropoff: LatLng;
  driver?: LatLng;
  className?: string;
}

export function RideMap({ apiKey, pickup, dropoff, driver, className = '' }: RideMapProps) {
  const center = { lat: (pickup.lat + dropoff.lat) / 2, lng: (pickup.lng + dropoff.lng) / 2 };

  return (
    <div
      className={['rounded-lg overflow-hidden border shadow-md', className].join(' ')}
      style={{ borderColor: 'var(--border)', height: '320px', width: '100%' }}
    >
      <APIProvider apiKey={apiKey}>
        <Map defaultCenter={center} defaultZoom={13}>
          <AdvancedMarker position={pickup}>
            <Pin background="#2DD653" borderColor="#061A13" glyphColor="#061A13" />
          </AdvancedMarker>
          <AdvancedMarker position={dropoff}>
            <Pin background="#2DD653" borderColor="#061A13" glyphColor="#061A13" />
          </AdvancedMarker>
          {driver && (
            <AdvancedMarker position={driver}>
              <Pin background="#34E06A" borderColor="#061A13" glyphColor="#061A13" />
            </AdvancedMarker>
          )}
          <Polyline
            path={[pickup, dropoff]}
            strokeColor="#2DD653"
            strokeWeight={3}
            strokeOpacity={0.85}
          />
        </Map>
      </APIProvider>
    </div>
  );
}
```

**Note on lime color values:** `--truf-lime-500` = `#2DD653`, `--truf-forest-900` = `#061A13`. Use hardcoded hex values inside `@vis.gl/react-google-maps` props because those props do not read CSS custom properties — they are passed directly to the Google Maps JS API which does not have CSS context.

### Storybook Stories Pattern

All stories follow the established pattern from Phase 2:

- Simple presentational variants: use `args` directly (like Button stories)
- Interactive/stateful components: use `render` + `useState` (like Switch/Tabs stories)
- Import: `import type { Meta, StoryObj } from '@storybook/react-vite'`
- `tags: ['autodocs']` on all metas

**Toast story approach:** Use a wrapper that manages `visible` state with a button trigger, since Toast is controlled by the parent:

```typescript
export const Default: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <div>
        <Button onClick={() => setVisible(true)}>Show Toast</Button>
        <Toast visible={visible} message="Ride booked!" onDismiss={() => setVisible(false)} />
      </div>
    );
  },
};
```

**RideMap story approach:** Hard-code a demo API key prop with a note, OR check for `import.meta.env.VITE_GOOGLE_MAPS_API_KEY`. Since the story can't guarantee a key is available, provide a static fallback message:

```typescript
export const Default: Story = {
  args: {
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? '',
    pickup: { lat: 37.7749, lng: -122.4194 },
    dropoff: { lat: 37.7849, lng: -122.4094 },
  },
};
```

### Test Pattern (consistent with Phase 2)

All tests use `React.createRoot` + DOM assertions — no `@testing-library/react`. Same boilerplate from Button.test.tsx and Switch.test.tsx:

```typescript
import { describe, test, expect, afterEach } from 'vitest';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';

let container: HTMLDivElement;

afterEach(() => {
  if (container && document.body.contains(container)) {
    document.body.removeChild(container);
  }
});

function renderIntoDocument(element: React.ReactElement) {
  container = document.createElement('div');
  document.body.appendChild(container);
  act(() => { createRoot(container).render(element); });
  return container;
}
```

Test assertions use `querySelector`, `classList.contains`, `textContent`, and attribute checks. Do NOT use RTL queries.

**RideMap test caveat:** `@vis.gl/react-google-maps` will fail to initialize without a real API key in test environment (JSDOM). Test should mock the API or only assert the container element exists and has correct classes. Do not assert map initialization.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Google Maps embed with custom markers | Custom iframe + overlay HTML | `@vis.gl/react-google-maps` | iframe can't do custom markers or polylines; raw JS API is complex to manage in React lifecycle |
| Toast animation timing | Custom requestAnimationFrame loop | CSS `@keyframes` + `useEffect`/`setTimeout` | CSS keyframes are hardware-accelerated; setTimeout is sufficient for dismiss timer at this scale |
| Skeleton shimmer animation | SVG animation or JS-driven animation | CSS `@keyframes` with linear-gradient sweep | Pure CSS shimmer is the de-facto standard; GPU-accelerated; no JS overhead |

**Key insight:** Every custom-built solution for these problems introduces browser compatibility edge cases and lifecycle bugs. The CSS keyframe approach for shimmer/toast and the vis.gl wrapper for Maps are the current established patterns.

---

## Common Pitfalls

### Pitfall 1: Using CSS transitions instead of keyframes for shimmer/toast

**What goes wrong:** Writing `transition: opacity 300ms` for toast or `animation: none` for skeleton — the slide-in from translateY(24px) and the sweeping shimmer gradient are not expressible as CSS transitions.
**Why it happens:** Conflating "animation" (keyframes) with "transition" (state change between two values).
**How to avoid:** Any animation that starts from an initial state on mount (not a state change) needs `@keyframes`. Add both shimmer and toast-enter keyframes to `components.css`.
**Warning signs:** Shimmer shows a static gradient; Toast appears instantly with no slide.

### Pitfall 2: z-index token not in @theme

**What goes wrong:** Writing `z-toast` as a Tailwind class and getting no stacking. The z-index tokens (`--truf-z-toast: 600`) are NOT mapped in the `@theme inline` block in globals.css.
**Why it happens:** Only color, spacing, radius, shadow, font are mapped.
**How to avoid:** Use hardcoded arbitrary values: `z-[600]` for Toast, `z-[800]` for Tooltip. Do not attempt to add z-index to @theme (it's not a Tailwind-native namespace in v4 without explicit mapping).
**Warning signs:** Toast appears behind other UI elements.

### Pitfall 3: Semantic CSS vars in Google Maps props

**What goes wrong:** Passing `background="var(--accent)"` to `<Pin>` — the Google Maps JS API does not read CSS custom properties.
**Why it happens:** The rest of the project uses CSS vars everywhere; natural to continue the pattern.
**How to avoid:** Use hardcoded hex values in all `@vis.gl/react-google-maps` props. `--truf-lime-500` = `#2DD653`, `--truf-forest-900` = `#061A13`.
**Warning signs:** Map markers appear with default red pins.

### Pitfall 4: Alert left-border styling with Tailwind border utilities

**What goes wrong:** Writing `border-l-4 border-success` — `border-success` only sets `border-color` which affects ALL sides, overriding the intended single-side left border color.
**Why it happens:** Tailwind's `border-{color}` sets all sides.
**How to avoid:** Use inline style for the semantic left border: `style={{ borderLeftColor: 'var(--truf-success)' }}`. Set `border-0 border-l-4 border-solid` in className.
**Warning signs:** Alert shows a colored border on all sides.

### Pitfall 5: Toast portal placement for stacking context

**What goes wrong:** Rendering Toast inside a parent div that has `position: relative` — creates a new stacking context that prevents `fixed` from working relative to viewport.
**Why it happens:** React component trees don't reflect CSS stacking contexts visually.
**How to avoid:** Toast root div uses `position: fixed` (`className="fixed bottom-6 left-1/2 -translate-x-1/2"`). For Phase 3 this is sufficient since there is no modal layer. Note: `createPortal` is a v2 consideration.
**Warning signs:** Toast appears offset from the bottom of the viewport.

### Pitfall 6: RideMap requires APIProvider wrapping

**What goes wrong:** Using `<Map>`, `<AdvancedMarker>`, or `<Polyline>` outside of `<APIProvider>` throws a runtime error.
**Why it happens:** `@vis.gl/react-google-maps` uses React context internally.
**How to avoid:** Always wrap with `<APIProvider apiKey={apiKey}>` as the outermost map element. The `APIProvider` can safely wrap just the map container div — no need to hoist it to app root for a Storybook component.
**Warning signs:** Console error "Maps JS API not loaded" or blank component.

---

## Code Examples

### Badge (all four variants)

```typescript
// Pattern: identical to Button variantClasses lookup, but span element
const variantClasses: Record<BadgeVariant, string> = {
  lime:    'bg-lime-500 text-forest-900',
  forest:  'bg-forest-600 text-cream',
  mint:    'bg-mint-200 text-forest-900',
  outline: '',
};
// Shared: rounded-pill font-mono text-xs px-2.5 py-0.5 inline-flex items-center
```

### Progress bar

```typescript
// Outer track + inner fill — value clamped 0-100
<div className="w-full h-[4px] rounded-full overflow-hidden"
     style={{ background: 'var(--surface-2)' }}>
  <div
    className="h-full bg-lime-500 rounded-full"
    style={{
      width: `${Math.min(100, Math.max(0, value))}%`,
      transition: `width var(--truf-duration-base) var(--truf-ease-standard)`,
    }}
  />
</div>
```

### Skeleton shimmer (components.css block)

```css
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}
.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    rgba(143, 238, 170, 0.04) 25%,
    rgba(143, 238, 170, 0.10) 50%,
    rgba(143, 238, 170, 0.04) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite ease-in-out;
  border-radius: var(--truf-radius-sm);
}
```

### Alert (semantic left-border)

```typescript
const variantConfig = {
  success: { color: 'var(--truf-success)', bg: 'rgba(34, 176, 64, 0.08)' },
  warning: { color: 'var(--truf-warning)', bg: 'rgba(230, 168, 23, 0.08)' },
  error:   { color: 'var(--truf-error)',   bg: 'rgba(220, 75, 63, 0.08)'  },
  info:    { color: 'var(--truf-info)',     bg: 'rgba(43, 125, 214, 0.08)' },
};

// Usage:
<div
  className="border-0 border-l-4 border-solid rounded-sm p-4"
  style={{
    borderLeftColor: variantConfig[variant].color,
    background: variantConfig[variant].bg,
  }}
>
```

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| `google.maps.Marker` (deprecated) | `AdvancedMarkerElement` via `<AdvancedMarker>` | Marker deprecation means old examples won't work; must use vis.gl AdvancedMarker |
| CSS-in-JS animation libraries | CSS @keyframes + tokens | Project already committed to CSS approach; motion tokens provide easing values |
| `react-google-maps` (tomchentw) | `@vis.gl/react-google-maps` (visgl) | Old library is unmaintained; vis.gl is Google-sponsored and current standard |

**Deprecated/outdated:**
- `google.maps.Marker`: Deprecated by Google Maps Platform; `AdvancedMarkerElement` is required for new work
- `tomchentw/react-google-maps` npm package: Unmaintained; do not use

---

## Open Questions

1. **Google Maps API Key for Storybook**
   - What we know: RideMap needs a real API key to render; Storybook stories need to show the component
   - What's unclear: Whether to hardcode a placeholder key, use env var, or show a fallback UI when key is missing
   - Recommendation: Accept `apiKey` as a required prop; in the story, read `import.meta.env.VITE_GOOGLE_MAPS_API_KEY` and show a placeholder div if empty. Document in story args description that an API key is needed.

2. **Toast: controlled vs. self-managing**
   - What we know: TOAST-03 says "auto-dismisses after configurable duration" — this implies internal timer
   - What's unclear: Should Toast be fully controlled (parent manages `visible` state) or self-managing (internal `useState`)
   - Recommendation: Use controlled pattern (parent passes `visible` + `onDismiss`) — matches existing Switch/Checkbox controlled patterns in this project and avoids hidden internal state.

3. **Skeleton base color in dark vs. light theme**
   - What we know: The shimmer gradient uses `rgba(143, 238, 170, ...)` (lime-tinted) which is brand-appropriate for dark mode
   - What's unclear: Whether light mode needs a different shimmer color
   - Recommendation: Use a surface-color base (`var(--surface-2)`) for the solid part and lime-tint shimmer for both themes. The opacity is low enough (0.04-0.10) to read correctly on both dark and light surfaces.

---

## Sources

### Primary (HIGH confidence)
- Project source files read directly: `Button.tsx`, `Switch.tsx`, `Tabs.tsx`, `components.css`, `globals.css`, `colors.css`, `motion.css`, `z-index.css` — established patterns verified
- `https://visgl.github.io/react-google-maps/docs/api-reference/components/advanced-marker` — AdvancedMarker props verified
- `https://visgl.github.io/react-google-maps/docs/api-reference/components/polyline` — Polyline props (path, strokeColor, strokeWeight) verified

### Secondary (MEDIUM confidence)
- `https://www.npmjs.com/package/@vis.gl/react-google-maps` — version 1.8.3 confirmed
- CSS shimmer keyframe pattern (background-position sweep) verified across multiple sources (freefrontend, codepen, medium)
- Toast CSS keyframe (translateY enter animation) verified against LogRocket blog and plain English JS article

### Tertiary (LOW confidence — flag for validation)
- `--truf-z-toast: 600` not mapped in @theme: inferred from reading globals.css; no @theme z-index namespace found — use `z-[600]` arbitrary value (LOW, validate during implementation)

---

## Metadata

**Confidence breakdown:**
- Badge, Chip, Alert, Progress: HIGH — pure Tailwind v4 + token pattern, identical to existing components
- Skeleton shimmer: HIGH — CSS keyframe approach verified across multiple sources, goes in established components.css pattern
- Toast: HIGH — CSS keyframe + useEffect pattern is standard; controlled component follows established project pattern
- PriceAlertCard: HIGH — pure composition of Card + Badge already established
- RideMap: MEDIUM — `@vis.gl/react-google-maps` API verified via official docs, but API key integration for Storybook is an open question
- z-index token mapping gap: LOW — inferred from globals.css read, needs validation during implementation

**Research date:** 2026-04-20
**Valid until:** 2026-05-20 (stable CSS patterns); 2026-04-27 for @vis.gl/react-google-maps (fast-moving, check for breaking changes)
