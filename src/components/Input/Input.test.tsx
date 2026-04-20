import { describe, test, expect, afterEach } from 'vitest';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { Input } from './Input';

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

describe('Input', () => {
  test('renders input element with placeholder text', () => {
    const root = renderIntoDocument(
      <Input placeholder="Enter your email..." />,
    );
    const input = root.querySelector('input');
    expect(input).toBeTruthy();
    expect(input?.placeholder).toBe('Enter your email...');
  });
});
