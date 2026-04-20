import { describe, test, expect, afterEach } from 'vitest';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { Switch } from './Switch';

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

describe('Switch', () => {
  test('renders a hidden checkbox input', () => {
    const root = renderIntoDocument(
      <Switch checked={false} onChange={() => {}} />
    );
    const input = root.querySelector('input[type="checkbox"]');
    expect(input).toBeTruthy();
  });

  test('switch-slider span exists', () => {
    const root = renderIntoDocument(
      <Switch checked={false} onChange={() => {}} />
    );
    const slider = root.querySelector('.switch-slider');
    expect(slider).toBeTruthy();
  });

  test('adds switch-checked class when checked', () => {
    const root = renderIntoDocument(
      <Switch checked={true} onChange={() => {}} />
    );
    const label = root.querySelector('label');
    expect(label?.classList.contains('switch-checked')).toBe(true);
  });

  test('input is disabled when disabled prop is true', () => {
    const root = renderIntoDocument(
      <Switch checked={false} onChange={() => {}} disabled={true} />
    );
    const input = root.querySelector('input') as HTMLInputElement | null;
    expect(input?.disabled).toBe(true);
  });
});
