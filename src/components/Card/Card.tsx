import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, className = '', style, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={[
        'rounded-lg p-6 border',
        'hover:-translate-y-[2px] hover:border-lime-500 hover:shadow-md',
        className,
      ].filter(Boolean).join(' ')}
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        transition: `all var(--truf-duration-base) var(--truf-ease-standard)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
