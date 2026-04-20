import type { CSSProperties, HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: CSSProperties;
}

export function Skeleton({ className = '', style, ...rest }: SkeletonProps) {
  return (
    <div
      {...rest}
      className={`skeleton-shimmer ${className}`.trim()}
      style={{ height: '20px', ...style }}
    />
  );
}
