import { describe, test, expect, afterEach } from 'vitest';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { Button } from './Button';

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

describe('Button', () => {
  test('contained variant renders a button element', () => {
    const root = renderIntoDocument(<Button variant="contained">Click me</Button>);
    const button = root.querySelector('button');
    expect(button).toBeTruthy();
  });

  test('disabled button has disabled attribute', () => {
    const root = renderIntoDocument(<Button variant="contained" disabled>Disabled</Button>);
    const button = root.querySelector('button');
    expect(button?.disabled).toBe(true);
  });
});
