import React from 'react';

export interface RadioButtonProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  name: string;
  value: string;
  label?: string;
  disabled?: boolean;
}

export function RadioButton({ checked, onChange, name, value, label, disabled = false }: RadioButtonProps) {
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
        type="radio"
        className="sr-only"
        name={name}
        value={value}
        checked={checked}
        onChange={() => {}}
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
      />
      <span
        className="relative shrink-0"
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          border: '2px solid',
          borderColor: checked ? 'var(--truf-lime-500)' : 'var(--border-strong)',
          background: 'transparent',
          transition: 'border-color var(--truf-duration-fast)',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: 'var(--truf-lime-500)',
            transform: checked ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)',
            transition: 'transform var(--truf-duration-fast)',
          }}
        />
      </span>
      {label && (
        <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
          {label}
        </span>
      )}
    </label>
  );
}
