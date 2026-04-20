import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'contained' | 'outlined' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  contained: 'bg-lime-500 text-forest-900 font-semibold hover:bg-lime-400 hover:shadow-glow active:translate-y-px',
  outlined:  'bg-transparent border border-[var(--border-strong)] hover:border-lime-500 hover:text-lime-400',
  text:      'bg-transparent text-lime-400 hover:bg-[rgba(45,214,83,0.08)]',
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
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={[
        'font-sans font-medium rounded-pill border border-transparent',
        'cursor-pointer inline-flex items-center gap-2 tracking-[-0.005em]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500',
        disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : '',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].filter(Boolean).join(' ')}
      style={{
        transition: `all var(--truf-duration-fast) var(--truf-ease-standard)`,
        ...(variant === 'outlined' ? { color: 'var(--text-primary)' } : {}),
        ...style,
      }}
    >
      {children}
    </button>
  );
}
