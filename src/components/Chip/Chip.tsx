import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: ReactNode;
}

export function Chip({
  active = false,
  children,
  className = '',
  style,
  ...props
}: ChipProps) {
  return (
    <button
      {...props}
      className={[
        'rounded-pill cursor-pointer font-sans text-sm font-medium px-4 py-1.5 border-0',
        active ? 'bg-lime-500 text-forest-900' : 'text-forest-900',
        className,
      ].filter(Boolean).join(' ')}
      style={{
        transition: `all var(--truf-duration-fast) var(--truf-ease-standard)`,
        ...(!active ? { background: 'var(--surface-2)' } : {}),
        ...style,
      }}
    >
      {children}
    </button>
  );
}
