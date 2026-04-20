import { useEffect } from 'react';

interface ToastProps {
  message: string;
  visible: boolean;
  duration?: number;
  onDismiss?: () => void;
  className?: string;
}

export function Toast({
  message,
  visible,
  duration = 3000,
  onDismiss,
  className = '',
}: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      onDismiss?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [visible, duration, onDismiss]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[600]">
      <div
        className={`toast-enter bg-lime-500 text-forest-900 font-semibold rounded-pill px-5 py-3 text-sm shadow-md ${className}`.trim()}
      >
        {message}
      </div>
    </div>
  );
}
