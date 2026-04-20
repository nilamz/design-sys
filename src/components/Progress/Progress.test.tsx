import { describe, test, expect, afterEach } from 'vitest';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { Progress } from './Progress';

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

describe('Progress', () => {
  test('renders track element', () => {
    const root = renderIntoDocument(<Progress value={50} />);
    // outer track has overflow-hidden class
    const track = root.querySelector('.overflow-hidden');
    expect(track).toBeTruthy();
  });

  test('fill width matches value prop', () => {
    const root = renderIntoDocument(<Progress value={60} />);
    const fill = root.querySelector('.bg-lime-500') as HTMLElement | null;
    expect(fill?.style.width).toBe('60%');
  });

  test('clamps value above 100 to 100%', () => {
    const root = renderIntoDocument(<Progress value={150} />);
    const fill = root.querySelector('.bg-lime-500') as HTMLElement | null;
    expect(fill?.style.width).toBe('100%');
  });

  test('clamps value below 0 to 0%', () => {
    const root = renderIntoDocument(<Progress value={-20} />);
    const fill = root.querySelector('.bg-lime-500') as HTMLElement | null;
    expect(fill?.style.width).toBe('0%');
  });
});
