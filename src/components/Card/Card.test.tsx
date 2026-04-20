import { describe, test, expect, afterEach } from 'vitest';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { Card } from './Card';

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

describe('Card', () => {
  test('renders children inside card', () => {
    const root = renderIntoDocument(
      <Card>
        <p>Card content</p>
      </Card>,
    );
    expect(root.textContent).toContain('Card content');
  });
});
