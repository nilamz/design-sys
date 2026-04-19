import { useState } from 'react';

const COLOR_SWATCHES = {
  Forest: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  Lime:   ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  Mint:   ['50', '100', '200', '300', '400'],
  Neutral:['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
} as const;

type ScaleName = keyof typeof COLOR_SWATCHES;

const swatchBg: Record<ScaleName, (shade: string) => string> = {
  Forest:  (s) => `bg-forest-${s}`,
  Lime:    (s) => `bg-lime-${s}`,
  Mint:    (s) => `bg-mint-${s}`,
  Neutral: (s) => `bg-neutral-${s}`,
};

export default function App() {
  const [isDark, setIsDark] = useState(true);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  return (
    <div className="min-h-screen p-8" style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>

      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-display text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Truf Design System
        </h1>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-pill text-sm font-medium transition-all"
          style={{
            background: 'var(--accent)',
            color: 'var(--truf-forest-900)',
            fontFamily: 'var(--truf-font-sans)',
          }}
        >
          Switch to {isDark ? 'Light' : 'Dark'} Theme
        </button>
      </div>

      {/* Color Scales */}
      <section className="mb-12">
        <h2 className="font-sans text-xl font-semibold mb-6" style={{ color: 'var(--text-secondary)' }}>
          Color Scales
        </h2>
        {(Object.keys(COLOR_SWATCHES) as ScaleName[]).map((scale) => (
          <div key={scale} className="mb-4">
            <p className="font-mono text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{scale}</p>
            <div className="flex gap-1 flex-wrap">
              {COLOR_SWATCHES[scale].map((shade) => (
                <div key={shade} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-10 h-10 rounded-sm ${swatchBg[scale](shade)} shadow-xs`}
                    title={`${scale.toLowerCase()}-${shade}`}
                  />
                  <span className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                    {shade}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Typography */}
      <section className="mb-12">
        <h2 className="font-sans text-xl font-semibold mb-6" style={{ color: 'var(--text-secondary)' }}>
          Typography
        </h2>
        <div className="space-y-4">
          <p className="font-display text-5xl font-light" style={{ color: 'var(--text-primary)' }}>
            Fraunces — Display / Editorial
          </p>
          <p className="font-sans text-base" style={{ color: 'var(--text-primary)' }}>
            Inter — Body text, UI labels, and everything in between. Clean, readable, and optimised for screens.
          </p>
          <p className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
            JetBrains Mono — code snippets, tokens, technical labels
          </p>
        </div>
      </section>

      {/* Semantic Aliases Card */}
      <section className="mb-12">
        <h2 className="font-sans text-xl font-semibold mb-6" style={{ color: 'var(--text-secondary)' }}>
          Semantic Aliases
        </h2>
        <div
          className="p-6 rounded-lg shadow-md"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
          }}
        >
          <p className="font-sans text-base mb-2">
            This card uses <code className="font-mono text-sm" style={{ color: 'var(--accent)' }}>--surface</code>,{' '}
            <code className="font-mono text-sm" style={{ color: 'var(--accent)' }}>--border</code>, and{' '}
            <code className="font-mono text-sm" style={{ color: 'var(--accent)' }}>--text-primary</code> aliases.
          </p>
          <p className="font-sans text-sm" style={{ color: 'var(--text-secondary)' }}>
            Toggle the theme above to see all semantic values swap simultaneously.
          </p>
        </div>
      </section>

      {/* Radii */}
      <section className="mb-12">
        <h2 className="font-sans text-xl font-semibold mb-6" style={{ color: 'var(--text-secondary)' }}>
          Border Radii
        </h2>
        <div className="flex flex-wrap gap-4 items-end">
          {(['sm', 'md', 'lg', 'xl', 'pill', 'full'] as const).map((r) => (
            <div key={r} className="flex flex-col items-center gap-2">
              <div
                className={`w-16 h-16 bg-forest-500 rounded-${r}`}
              />
              <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{r}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Shadows */}
      <section className="mb-12">
        <h2 className="font-sans text-xl font-semibold mb-6" style={{ color: 'var(--text-secondary)' }}>
          Shadows
        </h2>
        <div className="flex flex-wrap gap-6 items-end">
          {(['xs', 'sm', 'md', 'lg', 'xl', 'glow'] as const).map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div
                className={`w-16 h-16 rounded-md shadow-${s}`}
                style={{ background: 'var(--surface)' }}
              />
              <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{s}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
