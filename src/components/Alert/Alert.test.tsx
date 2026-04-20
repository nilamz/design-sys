import { describe, test, expect, afterEach } from 'vitest';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { Alert } from './Alert';

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

describe('Alert', () => {
  test('renders with title text', () => {
    const root = renderIntoDocument(<Alert title="Test Title" />);
    const strong = root.querySelector('strong');
    expect(strong?.textContent).toBe('Test Title');
  });

  test('renders with description text', () => {
    const root = renderIntoDocument(<Alert description="Test description" />);
    const p = root.querySelector('p');
    expect(p?.textContent).toBe('Test description');
  });

  test('has border-l-4 class', () => {
    const root = renderIntoDocument(<Alert />);
    const div = root.querySelector('div');
    expect(div?.className).toContain('border-l-4');
  });

  test('success variant has correct borderLeftColor inline style', () => {
    const root = renderIntoDocument(<Alert variant="success" />);
    const div = root.querySelector('div');
    expect(div?.style.borderLeftColor).toBe('var(--truf-success)');
  });
});
