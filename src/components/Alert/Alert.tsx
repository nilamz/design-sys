import type { HTMLAttributes, ReactNode } from 'react';

type AlertVariant = 'success' | 'warning' | 'error' | 'info';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  description?: string;
  children?: ReactNode;
}

const variantConfig: Record<AlertVariant, { color: string; bg: string }> = {
  success: { color: 'var(--truf-success)', bg: 'rgba(34, 176, 64, 0.08)' },
  warning: { color: 'var(--truf-warning)', bg: 'rgba(230, 168, 23, 0.08)' },
  error:   { color: 'var(--truf-error)',   bg: 'rgba(220, 75, 63, 0.08)' },
  info:    { color: 'var(--truf-info)',    bg: 'rgba(43, 125, 214, 0.08)' },
};

export function Alert({
  variant = 'info',
  title,
  description,
  children,
  className = '',
  style,
  ...props
}: AlertProps) {
  const config = variantConfig[variant];

  return (
    <div
      {...props}
      className={[
        'border-0 border-l-4 border-solid rounded-sm p-4',
        className,
      ].filter(Boolean).join(' ')}
      style={{
        borderLeftColor: config.color,
        background: config.bg,
        ...style,
      }}
    >
      {title && (
        <strong
          className="block mb-1 text-sm font-semibold"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </strong>
      )}
      {description && (
        <p
          className="text-sm m-0"
          style={{ color: 'var(--text-secondary)' }}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
