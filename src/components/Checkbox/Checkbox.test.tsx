import { describe, test, expect, afterEach } from 'vitest';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { Checkbox } from './Checkbox';

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

describe('Checkbox', () => {
  test('renders a hidden checkbox input', () => {
    const root = renderIntoDocument(
      <Checkbox checked={false} onChange={() => {}} />
    );
    const input = root.querySelector('input[type="checkbox"]');
    expect(input).toBeTruthy();
  });

  test('renders label text when label prop is provided', () => {
    const root = renderIntoDocument(
      <Checkbox checked={false} onChange={() => {}} label="Accept terms" />
    );
    expect(root.textContent).toContain('Accept terms');
  });

  test('visual span has checkbox-checked class when checked', () => {
    const root = renderIntoDocument(
      <Checkbox checked={true} onChange={() => {}} />
    );
    const visual = root.querySelector('.checkbox-checked');
    expect(visual).toBeTruthy();
  });

  test('input is disabled when disabled prop is true', () => {
    const root = renderIntoDocument(
      <Checkbox checked={false} onChange={() => {}} disabled={true} />
    );
    const input = root.querySelector('input') as HTMLInputElement | null;
    expect(input?.disabled).toBe(true);
  });
});
