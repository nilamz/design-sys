import { describe, test, expect, afterEach } from 'vitest';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { Chip } from './Chip';

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

describe('Chip', () => {
  test('renders with correct text', () => {
    const root = renderIntoDocument(<Chip>Tag</Chip>);
    const chip = root.querySelector('button');
    expect(chip?.textContent).toBe('Tag');
  });

  test('active chip has bg-lime-500 class', () => {
    const root = renderIntoDocument(<Chip active>Active</Chip>);
    const chip = root.querySelector('button');
    expect(chip?.className).toContain('bg-lime-500');
  });

  test('inactive chip does not have bg-lime-500', () => {
    const root = renderIntoDocument(<Chip active={false}>Inactive</Chip>);
    const chip = root.querySelector('button');
    expect(chip?.className).not.toContain('bg-lime-500');
  });

  test('renders as button element', () => {
    const root = renderIntoDocument(<Chip>Button</Chip>);
    const chip = root.querySelector('button');
    expect(chip).toBeTruthy();
    expect(chip?.tagName.toLowerCase()).toBe('button');
  });
});
