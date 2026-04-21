# Phase 2: Core Interactive Components - Research

**Researched:** 2026-04-19
**Domain:** React component authoring with Tailwind CSS v4, CSS custom properties, Storybook 10, Vitest browser testing
**Confidence:** HIGH

## Summary

Phase 2 builds six components (Button, Input, FieldGroup, Card, Switch, Checkbox, Tabs) from a fully-specified reference HTML file. The styling contract is already resolved — exact CSS values exist at known line numbers in `truf-design-system.html`. The primary technical challenge is not "what does it look like?" but "how do we faithfully port that CSS into composable React components that use Tailwind v4 utilities where possible and inline `style` props / local CSS classes where Tailwind cannot reach."

The project uses Tailwind CSS v4 in CSS-first mode (`@theme inline`), which means all `--truf-*` custom properties are exposed as Tailwind utility classes (e.g. `bg-lime-500`, `rounded-pill`, `text-sm`, `shadow-glow`). Components should prefer these utilities. Where Tailwind utilities fall short — pseudo-elements (switch knob `::before`, checkbox checkmark `::after`), focus glow rings, and transition values referencing motion tokens — the pattern established in `App.tsx` is to use `style={{ ... }}` with `var(--truf-*)` references or a local `<style>` block / CSS Module.

Each component requires: a `.tsx` implementation file, a `.stories.tsx` Storybook file, and a `.test.tsx` Vitest file. The Storybook setup already supports the Vitest browser runner via `@storybook/addon-vitest` + Playwright, so story-based tests (play functions or import-based tests) are the natural pattern.

**Primary recommendation:** Port the reference HTML CSS line-for-line into React props/className, use Tailwind utilities for all color/spacing/radius/shadow values that map cleanly, and use `style={}` with CSS var() references for transitions and pseudo-element-based effects (switch slider, checkbox checkmark).

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| BTN-01 | Button renders contained variant (lime bg, forest text) | Reference: `.btn-contained` at line 835. Use `bg-lime-500 text-forest-900 font-semibold`. Hover: `bg-lime-400` + `shadow-glow`. |
| BTN-02 | Button renders outlined variant (transparent bg, border, hover accent) | Reference: `.btn-outlined` at line 843. Border via `border border-[var(--border-strong)]`. Hover changes border to `var(--truf-lime-500)` and text to `lime-400`. |
| BTN-03 | Button renders text variant (no bg, accent text, hover bg tint) | Reference: `.btn-text` at line 850. Text `text-lime-400`. Hover bg `rgba(45,214,83,0.08)` — needs `style={}` since Tailwind can't express arbitrary rgba hover. |
| BTN-04 | Button supports sm, md (default), lg sizes | sm: `py-1.5 px-3.5 text-xs`; md: `py-2.5 px-5 text-sm` (10px/20px); lg: `py-3.5 px-7 text-base`. |
| BTN-05 | Button supports disabled state with reduced opacity and no pointer events | `disabled:opacity-40 disabled:cursor-not-allowed` or `aria-disabled`. Use `pointer-events-none` on disabled. |
| BTN-06 | Button has pill border-radius (64px) matching reference | `rounded-pill` — maps to `var(--truf-radius-pill)` = 64px via `@theme inline`. |
| BTN-07 | Button has focus-visible outline (2px lime, 2px offset) | `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500` or `style={{outlineColor:'var(--truf-lime-500)'}}` on focus. |
| INPUT-01 | Input renders with correct styling (bg-elevated, border, focus ring) | Reference: `.input` at line 862. `bg-[var(--bg-elevated)] border border-[var(--border-strong)] rounded-sm text-sm px-4 py-3`. |
| INPUT-02 | Input supports placeholder text styled with muted color | `placeholder:text-[var(--text-muted)]` — Tailwind v4 placeholder modifier. |
| INPUT-03 | Input focus shows lime border + 3px lime glow ring | `.input:focus` at line 874: `border-color: var(--truf-lime-500)` + `box-shadow: 0 0 0 3px rgba(45,214,83,0.15)`. Must use a CSS class or `focus:` inline style since box-shadow value is not in Tailwind theme. |
| INPUT-04 | FieldGroup component wraps Input with label and help text | Reference: `.field-group`, `.label`, `.help` at lines 881-898. `flex flex-col gap-1.5`. Label: `text-xs font-medium uppercase tracking-[0.08em]`. |
| CARD-01 | Card renders with surface bg, border, and lg border-radius | Reference: `.truf-card` at line 901. `bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6`. |
| CARD-02 | Card hover shows lime border accent, translateY(-2px), and md shadow | `.truf-card:hover` at line 909. `hover:border-lime-500 hover:-translate-y-0.5 hover:shadow-md transition-all`. translateY(-2px) is `hover:-translate-y-[2px]`. |
| SWITCH-01 | Switch renders unchecked state (surface bg, primary knob) | Reference: `.switch`, `.switch-slider` at lines 973-998. Fixed size: `w-[44px] h-[24px]`. Slider bg: `var(--surface-2)`. Knob `::before`: `18x18px` circle at `top:3px left:3px`. Needs CSS class for pseudo-element. |
| SWITCH-02 | Switch renders checked state (lime bg, forest knob, translateX transition) | `input:checked + .switch-slider { background: var(--truf-lime-500) }` and knob `translateX(20px)` + `background: var(--truf-forest-900)`. Driven by hidden `<input type="checkbox">`. |
| SWITCH-03 | Switch is accessible with proper input element | Wrap hidden `<input type="checkbox">` with `<label>`. Use `sr-only` for label text or `aria-label`. |
| CHECK-01 | Checkbox renders unchecked state (border, transparent bg) | Reference: `.checkbox` at line 1001. `w-[18px] h-[18px] border-2 border-[var(--border-strong)] rounded-[4px] inline-grid place-items-center`. |
| CHECK-02 | Checkbox renders checked state (lime bg, checkmark via CSS) | `.checkbox.checked::after` at line 1015. Checkmark: 10x6px L-shape rotated -45deg. Needs CSS class for `::after` pseudo-element. `bg-lime-500 border-lime-500`. |
| CHECK-03 | Checkbox is accessible with proper input element | Hidden `<input type="checkbox">` with `sr-only`, controlled via `onChange`. Visual div responds to checked prop. |
| TABS-01 | Tabs render with bottom border separator | Reference: `.tabs` at line 1024. `flex border-b border-[var(--border)] gap-4`. |
| TABS-02 | Active tab shows lime text and lime bottom border indicator | `.tab.active` at line 1038. `text-lime-400 border-b-2 border-lime-500 mb-[-1px]`. The -1px margin overlap with container border is critical. |
| TABS-03 | Tab hover shows primary text color | `.tab:hover { color: var(--text-primary) }` — `hover:text-[var(--text-primary)]`. |
| TABS-04 | Tabs support controlled active state | `activeTab` prop + `onTabChange` callback. Each tab item needs an `id` or `value`. |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19.2.4 | Component rendering | Already installed, project baseline |
| TypeScript | ~6.0.2 | Type safety for props | Already installed, enforced |
| Tailwind CSS v4 | 4.2.2 | Utility-first styling via @theme inline | Already configured, all tokens mapped |
| Storybook | 10.3.5 | Component documentation and stories | Already installed and running |
| Vitest | 4.1.4 | Unit/browser testing | Already installed with Playwright |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @storybook/addon-vitest | 10.3.5 | Story-based browser tests | All test files — tests run against rendered stories |
| @storybook/addon-themes | 10.3.5 | Dark/light toggle in stories | Already in preview.ts, enables theme testing |
| @vitest/browser-playwright | 4.1.4 | Headless browser for component tests | Configured in vite.config.ts |

### No New Installs Required

All dependencies for Phase 2 are already present in `package.json`. No `npm install` needed.

## Architecture Patterns

### Recommended Component File Structure

Each component lives in its own folder under `src/components/`:

```
src/components/
├── Button/
│   ├── Button.tsx          # Component implementation
│   ├── Button.stories.tsx  # Storybook stories
│   ├── Button.test.tsx     # Vitest tests
│   └── index.ts            # Re-exports Button
├── Input/
│   ├── Input.tsx
│   ├── Input.stories.tsx
│   ├── Input.test.tsx
│   └── index.ts
├── FieldGroup/
│   ├── FieldGroup.tsx
│   ├── FieldGroup.stories.tsx
│   ├── FieldGroup.test.tsx
│   └── index.ts
├── Card/
│   ├── Card.tsx
│   ├── Card.stories.tsx
│   ├── Card.test.tsx
│   └── index.ts
├── Switch/
│   ├── Switch.tsx
│   ├── Switch.stories.tsx
│   ├── Switch.test.tsx
│   └── index.ts
├── Checkbox/
│   ├── Checkbox.tsx
│   ├── Checkbox.stories.tsx
│   ├── Checkbox.test.tsx
│   └── index.ts
└── Tabs/
    ├── Tabs.tsx
    ├── Tabs.stories.tsx
    ├── Tabs.test.tsx
    └── index.ts
```

INFRA-04 is already satisfied — this enforces the structure. The `index.ts` per component re-exports the component for clean barrel imports.

### Pattern 1: Tailwind Utilities + CSS Var Inline Styles (Hybrid Approach)

**What:** Use Tailwind utility classes for all values that have a direct `@theme inline` mapping. Use `style={{ property: 'var(--truf-*)' }}` for semantic aliases (`--bg`, `--surface`, `--text-primary`, `--border`, etc.) and for values Tailwind can't express (arbitrary rgba, transitions referencing motion tokens).

**When to use:** Always — this is the established pattern from `App.tsx`.

**Why semantic aliases can't use Tailwind utilities:** `--bg`, `--surface`, `--border`, `--text-primary`, `--accent` are defined in `:root` / `[data-theme="light"]` blocks in `globals.css`, NOT in `@theme inline`. Tailwind only generates utilities for what's in `@theme`. Semantic aliases intentionally live outside `@theme` so they swap on theme change without Tailwind needing to regenerate.

**Key insight from globals.css:** Available as Tailwind classes: `bg-lime-500`, `text-forest-900`, `rounded-pill`, `shadow-glow`, `text-sm`, `font-sans`, `font-mono`, `font-display`, `p-4`, etc. NOT available as Tailwind classes: `bg-[var(--surface)]`, `border-[var(--border)]`, `text-[var(--text-primary)]` — these require `style={}` or arbitrary value syntax `className="bg-[var(--surface)]"`.

**Tailwind v4 arbitrary value syntax** does work for one-off values:
```tsx
// Both are valid in Tailwind v4
<div className="bg-[var(--surface)] border border-[var(--border)]" />
// or via style prop
<div style={{ background: 'var(--surface)', border: '1px solid var(--border)' }} />
```

Prefer `style={}` for semantic aliases — it's what the existing `App.tsx` uses and is more readable for design-token-driven values.

### Pattern 2: CSS Classes for Pseudo-Element Effects

**What:** Switch and Checkbox require `::before` / `::after` pseudo-elements that Tailwind cannot generate. Define these as CSS classes, either in `globals.css` or as a component-scoped `<style>` tag.

**When to use:** Switch knob (`.switch-slider::before`), Checkbox checkmark (`.checkbox-checked::after`), Input focus glow (non-standard box-shadow value).

**Recommended approach:** Add component CSS to `globals.css` (consistent with Phase 1 approach) OR use a CSS module per component (both work in Vite + Tailwind v4). Given the project has no CSS Modules configured yet, adding to `globals.css` or a dedicated `components.css` imported in `globals.css` is simpler.

**Example — Switch CSS to add:**
```css
/* In globals.css or a new src/styles/components.css */
.switch-slider {
  position: absolute;
  inset: 0;
  background: var(--surface-2);
  border-radius: 24px;
  cursor: pointer;
  transition: background var(--truf-duration-base);
}
.switch-slider::before {
  content: "";
  position: absolute;
  top: 3px; left: 3px;
  width: 18px; height: 18px;
  background: var(--text-primary);
  border-radius: 50%;
  transition: transform var(--truf-duration-base) var(--truf-ease-emphasized);
}
.switch-checked .switch-slider { background: var(--truf-lime-500); }
.switch-checked .switch-slider::before {
  transform: translateX(20px);
  background: var(--truf-forest-900);
}

/* Checkbox */
.checkbox-checked::after {
  content: "";
  display: block;
  width: 10px; height: 6px;
  border-left: 2px solid var(--truf-forest-900);
  border-bottom: 2px solid var(--truf-forest-900);
  transform: rotate(-45deg) translate(1px, -1px);
}

/* Input focus ring */
.input-focus:focus {
  outline: none;
  border-color: var(--truf-lime-500);
  box-shadow: 0 0 0 3px rgba(45, 214, 83, 0.15);
}
```

### Pattern 3: Controlled State for Switch, Checkbox, Tabs

**What:** All three interactive components (Switch, Checkbox, Tabs) must support controlled state via React props (`checked`/`onChange` for Switch/Checkbox, `activeTab`/`onTabChange` for Tabs).

**When to use:** Always — accessibility requires proper `<input>` elements for Switch and Checkbox. Tabs needs controlled state per TABS-04.

**Switch accessibility pattern:**
```tsx
// Visually custom, semantically native
interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

function Switch({ checked, onChange, label, disabled }: SwitchProps) {
  return (
    <label className="relative inline-block w-[44px] h-[24px]">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span className={`switch-slider${checked ? ' switch-checked' : ''}`} />
      {label && <span className="sr-only">{label}</span>}
    </label>
  );
}
```

**Checkbox accessibility pattern:**
```tsx
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span
        className={`w-[18px] h-[18px] border-2 rounded-[4px] inline-grid place-items-center transition-all
          ${checked
            ? 'bg-lime-500 border-lime-500 checkbox-checked'
            : 'border-[var(--border-strong)] bg-transparent'
          }`}
      />
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
}
```

**Tabs controlled pattern:**
```tsx
interface Tab { id: string; label: string; }
interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex border-b border-[var(--border)] gap-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-2 py-3 text-sm cursor-pointer transition-all border-b-2 mb-[-1px]
            ${activeTab === tab.id
              ? 'text-lime-400 border-lime-500'
              : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]'
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
```

### Pattern 4: Storybook Story Structure

**What:** Each story file exports a `Meta` and named `Story` exports. Use `args` for interactive controls. Include all variants as named stories.

**Storybook version note:** The project has Storybook 10.3.5 (not 8 as specified in the original requirements — see STATE.md). The API is compatible.

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['contained', 'outlined', 'text'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Contained: Story = { args: { variant: 'contained', children: 'Button' } };
export const Outlined: Story = { args: { variant: 'outlined', children: 'Button' } };
export const TextVariant: Story = { args: { variant: 'text', children: 'Button' } };
export const Small: Story = { args: { variant: 'contained', size: 'sm', children: 'Small' } };
export const Large: Story = { args: { variant: 'contained', size: 'lg', children: 'Large' } };
export const Disabled: Story = { args: { variant: 'contained', disabled: true, children: 'Disabled' } };
```

### Pattern 5: Vitest Test Structure

**What:** Tests use the Storybook Vitest addon. Tests import stories and use Vitest's `expect`. Browser tests run in headless Chromium.

**Configuration already set:** `vite.config.ts` has `storybookTest` plugin pointing to `.storybook` config. Tests run with `npm test` or `npx vitest`.

```tsx
// Button.test.tsx
import { render, screen } from '@testing-library/react';  // if using RTL directly
// OR use story-driven tests:
import { composeStories } from '@storybook/react-vite';
import * as stories from './Button.stories';

const { Contained, Disabled } = composeStories(stories);

test('contained button renders with correct text', async () => {
  render(<Contained />);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('disabled button has pointer-events-none', async () => {
  render(<Disabled />);
  expect(screen.getByRole('button')).toBeDisabled();
});
```

**Note:** Check whether `@testing-library/react` is installed — it's NOT in `package.json`. Options:
1. Install `@testing-library/react` (recommended for RTL-style tests)
2. Use Storybook play functions with `@storybook/test` utilities (already installed as part of Storybook 10)
3. Use basic DOM assertions without RTL

Since `@storybook/addon-vitest` is already installed, the simplest approach is Storybook play function tests using `@storybook/test` (already a Storybook 10 dependency).

### Anti-Patterns to Avoid

- **Hardcoding hex colors:** Never use `#2DD653` directly — use `var(--truf-lime-500)` or `bg-lime-500` (Tailwind). Hex values break theme switching.
- **Tailwind v3 config patterns:** No `tailwind.config.js`, no `theme.extend`, no `content` array — Tailwind v4 is CSS-first. Don't add config files.
- **CSS-in-JS:** Not in this project. No styled-components, no emotion. CSS classes + style props only.
- **Uncontrolled Switch/Checkbox:** These must be controlled components (props + onChange). Uncontrolled native checkboxes skip the custom visual layer.
- **Missing `sr-only` on hidden inputs:** Screen readers need the native input. Always pair visual custom component with `<input className="sr-only">`.
- **Forgetting the -1px tab margin trick:** The active tab has `margin-bottom: -1px` to visually merge the 2px bottom indicator with the container's 1px bottom border. Without this, there's a 1px gap.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Accessible checkbox | Custom click handler tracking state in div | `<input type="checkbox" className="sr-only">` wrapped in visual span | Screen reader announcements, keyboard nav, form submission all require native input |
| Accessible switch | Div with click handler | `<input type="checkbox" className="sr-only">` + visual label | Same as above — SWITCH-03 requires proper input element |
| Focus management | Custom focus trap | Native button/input focus behavior | Browsers handle focus-visible correctly on native elements |
| Transition values | Hardcoded `transition: all 150ms ease` | `var(--truf-duration-fast)` + `var(--truf-ease-standard)` | Motion tokens exist for consistency; don't bypass them |

**Key insight:** All interactive state in Switch and Checkbox should flow through a hidden native `<input>` — this provides accessibility, keyboard support, and form integration at zero cost.

## Common Pitfalls

### Pitfall 1: Semantic Alias Classes Don't Exist as Tailwind Utilities

**What goes wrong:** Writing `className="bg-surface text-text-primary"` and finding no styles applied.
**Why it happens:** `--surface`, `--text-primary`, `--bg`, `--border` are defined in `:root {}` blocks in `globals.css`, NOT in `@theme inline {}`. Tailwind only generates classes for `@theme` variables.
**How to avoid:** For semantic aliases, always use `style={{ background: 'var(--surface)' }}` or Tailwind arbitrary value syntax `className="bg-[var(--surface)]"`. Prefer `style={}` to match `App.tsx` convention.
**Warning signs:** Component renders but has wrong background color; inspect element shows `--surface` is set on `:root` but no Tailwind class is applying it.

### Pitfall 2: Motion Tokens Have Different Names in CSS vs Reference HTML

**What goes wrong:** Reference HTML uses `var(--dur-fast)` and `var(--ease-standard)` but the actual token files use `var(--truf-duration-fast)` and `var(--truf-ease-standard)`.
**Why it happens:** The reference HTML is a self-contained demo with its own token names without the `--truf-` prefix. The project tokens all use `--truf-*` prefix.
**How to avoid:** Always prefix with `--truf-` when translating from reference HTML. Check `src/tokens/motion.css` for exact names: `--truf-duration-fast`, `--truf-duration-base`, `--truf-ease-standard`, `--truf-ease-emphasized`.
**Warning signs:** Transitions not working — the CSS property value is a reference to an undefined variable.

### Pitfall 3: Reference HTML Uses `var(--space-6)` — Project Uses `var(--truf-space-6)`

**What goes wrong:** Card uses `padding: var(--space-6)` in reference HTML but the project token is `--truf-space-6`.
**Why it happens:** Same prefix issue as Pitfall 2 — reference HTML drops the `--truf-` prefix throughout.
**How to avoid:** Use Tailwind spacing utilities (`p-6`) which map to `--truf-space-6` via `@theme inline`. For inline styles, use `var(--truf-space-6)`.
**Warning signs:** Padding/margin visually wrong; inspect shows `var(--space-6)` resolving to empty.

### Pitfall 4: Tailwind v4 Arbitrary Value Syntax Differences

**What goes wrong:** `className="text-[var(--text-muted)]"` may not work the same as Tailwind v3 arbitrary values.
**Why it happens:** Tailwind v4 changed how arbitrary values are handled — CSS variables in arbitrary values should work but can have edge cases.
**How to avoid:** Test both approaches. If `className="text-[var(--text-muted)]"` does not apply correctly, fall back to `style={{ color: 'var(--text-muted)' }}`.
**Warning signs:** Class appears in HTML but computed style doesn't match expected variable value.

### Pitfall 5: Button `hover:` State for Text Variant Needs Arbitrary RGBA

**What goes wrong:** Button text variant hover is `background: rgba(45,214,83,0.08)` — no Tailwind token covers this.
**Why it happens:** This is a semi-transparent lime tint that isn't in the `@theme inline` mapping.
**How to avoid:** Use `hover:bg-[rgba(45,214,83,0.08)]` (Tailwind v4 arbitrary value on hover) or manage hover state in React (`useState` + conditional style prop). The CSS class approach (`globals.css`) is cleanest for sharing.
**Warning signs:** Text button hover has no visual feedback.

### Pitfall 6: Switch and Checkbox Pseudo-Elements Require Separate CSS Classes

**What goes wrong:** Writing the switch knob or checkbox checkmark as Tailwind utilities and finding no `::before`/`::after` content.
**Why it happens:** Tailwind does not generate pseudo-element `content: ""` utilities in a way that supports positioned knobs or drawn checkmarks.
**How to avoid:** Add `.switch-slider`, `.switch-slider::before`, `.checkbox-checked::after` as plain CSS in `globals.css` or a dedicated `src/styles/components.css` file (imported in `globals.css`).
**Warning signs:** Switch renders but has no circular knob; checkbox checked state shows no checkmark.

### Pitfall 7: `@testing-library/react` Is Not Installed

**What goes wrong:** Test file imports `from '@testing-library/react'` and Vitest throws a module-not-found error.
**Why it happens:** `package.json` has no `@testing-library/react` dependency.
**How to avoid:** Either (a) install `@testing-library/react @testing-library/user-event` as dev dependencies before writing tests, or (b) use Storybook's `@storybook/test` utilities (already installed) with play functions. Pick one approach and be consistent across all Phase 2 tests.
**Warning signs:** `Cannot find module '@testing-library/react'` in test output.

## Code Examples

### Button Component (complete)
```tsx
// src/components/Button/Button.tsx
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'contained' | 'outlined' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  contained: 'bg-lime-500 text-forest-900 font-semibold hover:bg-lime-400 active:translate-y-px',
  outlined:  'bg-transparent text-[var(--text-primary)] border border-[var(--border-strong)] hover:border-lime-500 hover:text-lime-400',
  text:      'bg-transparent text-lime-400',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'py-1.5 px-3.5 text-xs',
  md: 'py-2.5 px-5 text-sm',
  lg: 'py-3.5 px-7 text-base',
};

export function Button({
  variant = 'contained',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={[
        'font-sans font-medium rounded-pill border border-transparent',
        'cursor-pointer inline-flex items-center gap-2 tracking-[-0.005em]',
        'transition-all duration-[150ms]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500',
        disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : '',
        variantClasses[variant],
        sizeClasses[size],
        // Text variant hover background needs inline style or CSS class
        variant === 'text' ? 'hover:bg-[rgba(45,214,83,0.08)]' : '',
        // Contained variant glow shadow on hover
        variant === 'contained' ? 'hover:shadow-glow' : '',
        className,
      ].filter(Boolean).join(' ')}
      style={
        variant === 'contained'
          ? { transition: `all var(--truf-duration-fast) var(--truf-ease-standard)` }
          : { transition: `all var(--truf-duration-fast) var(--truf-ease-standard)` }
      }
    >
      {children}
    </button>
  );
}
```

### Input Component
```tsx
// src/components/Input/Input.tsx
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`
        font-sans text-sm px-4 py-3 w-full
        rounded-sm border
        input-focus
        placeholder:text-[var(--text-muted)]
        ${className}
      `}
      style={{
        background: 'var(--bg-elevated)',
        borderColor: 'var(--border-strong)',
        color: 'var(--text-primary)',
        transition: `border-color var(--truf-duration-fast)`,
      }}
    />
  );
}
// NOTE: .input-focus class with :focus box-shadow must be added to globals.css
```

### Card Component
```tsx
// src/components/Card/Card.tsx
import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div
      {...props}
      className={`rounded-lg p-6 border transition-all hover:-translate-y-[2px] hover:border-lime-500 hover:shadow-md ${className}`}
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        transition: `all var(--truf-duration-base) var(--truf-ease-standard)`,
      }}
    >
      {children}
    </div>
  );
}
```

### FieldGroup Component
```tsx
// src/components/FieldGroup/FieldGroup.tsx — wrap Input with label + help
import type { ReactNode } from 'react';

interface FieldGroupProps {
  label?: string;
  help?: string;
  children: ReactNode;
  className?: string;
}

export function FieldGroup({ label, help, children, className = '' }: FieldGroupProps) {
  return (
    <div className={`flex flex-col gap-1.5 w-full max-w-xs ${className}`}>
      {label && (
        <label
          className="text-xs font-medium uppercase tracking-[0.08em]"
          style={{ color: 'var(--text-secondary)' }}
        >
          {label}
        </label>
      )}
      {children}
      {help && (
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {help}
        </span>
      )}
    </div>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Storybook 8 (planned) | Storybook 10.3.5 (installed) | Phase 1 execution | Same API, newer addons — treat as Storybook 8+ compatible |
| `tailwind.config.js` with `theme.extend` | CSS-first `@theme inline {}` in globals.css | Tailwind v4 | No config file, all mapping in CSS |
| `@testing-library/react` for React component tests | `@storybook/addon-vitest` + Storybook play functions | Storybook 7+ | Tests run in real browser, no jsdom environment |
| `styled-components` / `emotion` | CSS custom properties + Tailwind utilities | Design decision | Locked — no CSS-in-JS in this project |

**Deprecated/outdated:**
- `tailwind.config.js`: Not used in Tailwind v4 — do not create.
- `@apply` directive: Discouraged in Tailwind v4 (still works but not recommended) — prefer utility classes directly in JSX.
- `jsdom` test environment: Project uses real Playwright browser via `@vitest/browser-playwright` — tests run in Chromium, not jsdom.

## Open Questions

1. **Where to place component-specific CSS (pseudo-element classes)?**
   - What we know: `globals.css` is the current CSS entry point; no CSS Modules are configured
   - What's unclear: Whether to add switch/checkbox/input CSS directly to `globals.css`, create a separate `src/styles/components.css` imported by `globals.css`, or configure CSS Modules
   - Recommendation: Create `src/styles/components.css` imported at the bottom of `globals.css`. Keep it focused on pseudo-element classes that Tailwind cannot express. This is cleaner than bloating `globals.css` and avoids the complexity of setting up CSS Modules.

2. **Test strategy: RTL vs Storybook play functions?**
   - What we know: `@testing-library/react` is NOT installed. `@storybook/addon-vitest` IS installed.
   - What's unclear: Whether to install RTL or write tests purely as Storybook play functions
   - Recommendation: Use Storybook play functions with `@storybook/test` (included in Storybook 10). This avoids a new install and keeps tests co-located with stories. Install `@testing-library/react` only if more complex interaction testing is needed.

3. **`transition` class conflict: Tailwind `transition-all` vs custom motion tokens?**
   - What we know: Tailwind's `transition-all` uses its own default duration/easing, not `--truf-*` tokens
   - What's unclear: Whether `transition-all` + `duration-[150ms]` exactly matches `var(--truf-duration-fast)` (150ms — yes, it matches) and `ease-standard` cubic-bezier
   - Recommendation: Use `style={{ transition: 'all var(--truf-duration-fast) var(--truf-ease-standard)' }}` for components where the exact easing matters (Button, Card, Tabs). This guarantees motion token compliance. For simpler cases, `transition-all` is acceptable.

## Sources

### Primary (HIGH confidence)
- `C:/Users/NILAMZ/Desktop/Class Trains/Design System 1/truf-design-system.html` lines 815-1039 — exact reference CSS for all Phase 2 components, read directly
- `F:/My-Claude-2026/Design-Sys/src/styles/globals.css` — confirmed @theme inline mapping and semantic alias scope
- `F:/My-Claude-2026/Design-Sys/src/tokens/colors.css` — exact color values
- `F:/My-Claude-2026/Design-Sys/src/tokens/motion.css` — confirmed `--truf-duration-*` and `--truf-ease-*` naming
- `F:/My-Claude-2026/Design-Sys/src/tokens/radius.css` — confirmed `--truf-radius-pill: 64px`
- `F:/My-Claude-2026/Design-Sys/src/tokens/spacing.css` — confirmed spacing scale
- `F:/My-Claude-2026/Design-Sys/package.json` — confirmed installed versions, no @testing-library/react present
- `F:/My-Claude-2026/Design-Sys/vite.config.ts` — confirmed Vitest browser Playwright setup
- `F:/My-Claude-2026/Design-Sys/.storybook/preview.ts` — confirmed Storybook theme addon setup

### Secondary (MEDIUM confidence)
- `F:/My-Claude-2026/Design-Sys/.planning/STATE.md` — Storybook 10.3.5 confirmed as installed version
- `F:/My-Claude-2026/Design-Sys/.planning/REQUIREMENTS.md` — component requirements verified against reference HTML

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all library versions read directly from `package.json`
- Architecture: HIGH — component structure derived from INFRA-04 requirement and Phase 1 patterns
- Token values / reference CSS: HIGH — read directly from source files and reference HTML
- Test strategy: MEDIUM — @testing-library/react absence confirmed but exact play function API not verified against Context7
- Pitfalls: HIGH — derived from direct inspection of globals.css scope, token naming conventions, and package.json

**Research date:** 2026-04-19
**Valid until:** 2026-05-19 (stable stack — Tailwind v4 and Storybook 10 APIs are unlikely to change meaningfully in 30 days)
