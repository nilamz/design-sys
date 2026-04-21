import { HomeIcon } from '@heroicons/react/24/outline';

export function Icons() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <HomeIcon style={{ width: 28, height: 28, color: 'var(--truf-lime-500)', strokeWidth: 1.8 }} />
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--text-muted)' }}>Heroicons · 24px outline</span>
    </div>
  );
}
