import React from 'react';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function Checkbox({ checked, onChange, label, disabled = false }: CheckboxProps) {
  const visualClass = [
    'w-[18px] h-[18px] border-2 rounded-[4px] inline-grid place-items-center shrink-0',
    checked ? 'bg-lime-500 border-lime-500 checkbox-checked' : 'bg-transparent',
  ].join(' ');

  const visualStyle: React.CSSProperties = {
    transition: 'all var(--truf-duration-fast)',
    ...(checked ? {} : { borderColor: 'var(--border-strong)', background: 'transparent' }),
  };

  return (
    <label
      className={[
        'inline-flex items-center gap-2 cursor-pointer',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span className={visualClass} style={visualStyle} />
      {label && (
        <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
          {label}
        </span>
      )}
    </label>
  );
}
