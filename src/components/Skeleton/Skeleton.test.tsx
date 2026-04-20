import { describe, test, expect, afterEach } from 'vitest';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { Skeleton } from './Skeleton';

let container: HTMLDivElement;

afterEach(() => {
  if (container && document.body.contains(container)) {
    document.body.removeChild(container);
  }
});

function renderIntoDocument(element: React.ReactElement) {
  container = document.createElement('div');
  document.body.appendChild(container);
  act(() => {
    createRoot(container).render(element);
  });
  return container;
}

describe('Skeleton', () => {
  test('renders with skeleton-shimmer class', () => {
    const root = renderIntoDocument(<Skeleton />);
    const el = root.querySelector('.skeleton-shimmer');
    expect(el).toBeTruthy();
  });

  test('accepts custom className for sizing', () => {
    const root = renderIntoDocument(<Skeleton className="w-48 h-12" />);
    const el = root.querySelector('.skeleton-shimmer');
    expect(el?.classList.contains('w-48')).toBe(true);
    expect(el?.classList.contains('h-12')).toBe(true);
  });

  test('renders as div element', () => {
    const root = renderIntoDocument(<Skeleton />);
    const el = root.querySelector('.skeleton-shimmer');
    expect(el?.tagName.toLowerCase()).toBe('div');
  });
});
