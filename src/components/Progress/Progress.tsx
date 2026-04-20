import type { CSSProperties } from 'react';

interface ProgressProps {
  value: number;
  className?: string;
  style?: CSSProperties;
}

export function Progress({ value, className = '', style }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={`w-full h-[4px] rounded-full overflow-hidden ${className}`.trim()}
      style={{ background: 'var(--surface-2)', ...style }}
    >
      <div
        className="h-full bg-lime-500 rounded-full"
        style={{
          width: `${clamped}%`,
          transition: `width var(--truf-duration-base) var(--truf-ease-standard)`,
        }}
      />
    </div>
  );
}
