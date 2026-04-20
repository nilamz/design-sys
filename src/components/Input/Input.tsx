import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className = '', style, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={[
        'font-sans text-sm px-4 py-3 w-full',
        'rounded-sm border',
        'input-focus',
        'placeholder:text-[var(--text-muted)]',
        className,
      ].filter(Boolean).join(' ')}
      style={{
        background: 'var(--bg-elevated)',
        borderColor: 'var(--border-strong)',
        color: 'var(--text-primary)',
        transition: `border-color var(--truf-duration-fast)`,
        ...style,
      }}
    />
  );
}
