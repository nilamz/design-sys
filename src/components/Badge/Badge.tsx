import type { HTMLAttributes, ReactNode } from 'react';

type BadgeVariant = 'lime' | 'forest' | 'mint' | 'outline';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  lime:    'bg-lime-500 text-forest-900',
  forest:  'bg-forest-600 text-cream',
  mint:    'bg-mint-200 text-forest-900',
  outline: '',
};

export function Badge({
  variant = 'lime',
  children,
  className = '',
  style,
  ...props
}: BadgeProps) {
  const isOutline = variant === 'outline';

  return (
    <span
      {...props}
      className={[
        'inline-flex items-center px-2.5 py-0.5 text-xs font-mono rounded-pill',
        isOutline ? 'border' : '',
        variantClasses[variant],
        className,
      ].filter(Boolean).join(' ')}
      style={{
        ...(isOutline
          ? {
              borderColor: 'var(--border-strong)',
              color: 'var(--text-primary)',
            }
          : {}),
        ...style,
      }}
    >
      {children}
    </span>
  );
}
