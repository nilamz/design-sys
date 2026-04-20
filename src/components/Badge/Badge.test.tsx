import { describe, test, expect, afterEach } from 'vitest';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { Badge } from './Badge';

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

describe('Badge', () => {
  test('renders with correct text content', () => {
    const root = renderIntoDocument(<Badge>Status</Badge>);
    const badge = root.querySelector('span');
    expect(badge?.textContent).toBe('Status');
  });

  test('lime variant has bg-lime-500 class', () => {
    const root = renderIntoDocument(<Badge variant="lime">Lime</Badge>);
    const badge = root.querySelector('span');
    expect(badge?.className).toContain('bg-lime-500');
  });

  test('outline variant has border class', () => {
    const root = renderIntoDocument(<Badge variant="outline">Outline</Badge>);
    const badge = root.querySelector('span');
    expect(badge?.className).toContain('border');
  });

  test('applies pill radius class (rounded-pill)', () => {
    const root = renderIntoDocument(<Badge>Pill</Badge>);
    const badge = root.querySelector('span');
    expect(badge?.className).toContain('rounded-pill');
  });
});
