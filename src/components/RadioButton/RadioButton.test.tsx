import { describe, test, expect, afterEach } from 'vitest';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { RadioButton } from './RadioButton';

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

describe('RadioButton', () => {
  test('renders a hidden radio input', () => {
    const root = renderIntoDocument(
      <RadioButton checked={false} onChange={() => {}} name="test" value="a" />
    );
    const input = root.querySelector('input[type="radio"]');
    expect(input).toBeTruthy();
  });

  test('renders label text when label prop is provided', () => {
    const root = renderIntoDocument(
      <RadioButton checked={false} onChange={() => {}} name="test" value="a" label="Option A" />
    );
    expect(root.textContent).toContain('Option A');
  });

  test('inner dot is visible when checked', () => {
    const root = renderIntoDocument(
      <RadioButton checked={true} onChange={() => {}} name="test" value="a" />
    );
    const dot = root.querySelector('.rounded-full .rounded-full') as HTMLElement | null;
    expect(dot?.style.width).toBe('10px');
  });

  test('input is disabled when disabled prop is true', () => {
    const root = renderIntoDocument(
      <RadioButton checked={false} onChange={() => {}} name="test" value="a" disabled={true} />
    );
    const input = root.querySelector('input') as HTMLInputElement | null;
    expect(input?.disabled).toBe(true);
  });
});
