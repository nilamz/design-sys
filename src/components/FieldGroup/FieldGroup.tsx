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
