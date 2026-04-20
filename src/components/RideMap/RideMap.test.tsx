import { describe, test, expect, afterEach, vi } from 'vitest';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';

// Mock @vis.gl/react-google-maps — it will not initialize in JSDOM
vi.mock('@vis.gl/react-google-maps', () => ({
  APIProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Map: ({ children }: { children: React.ReactNode }) => <div data-testid="google-map">{children}</div>,
  AdvancedMarker: ({ children }: { children: React.ReactNode }) => <div data-testid="marker">{children}</div>,
  Pin: () => <div data-testid="pin" />,
  Polyline: () => null,
}));

import { RideMap } from './RideMap';

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

const pickup = { lat: 37.7749, lng: -122.4194 };
const dropoff = { lat: 37.7849, lng: -122.4094 };

describe('RideMap', () => {
  test('renders container div with correct classes', () => {
    const root = renderIntoDocument(
      <RideMap apiKey="test-key" pickup={pickup} dropoff={dropoff} />
    );
    const container = root.firstElementChild as HTMLElement;
    expect(container.className).toContain('rounded-lg');
    expect(container.className).toContain('border');
    expect(container.className).toContain('shadow-md');
  });

  test('renders placeholder message when apiKey is empty string', () => {
    const root = renderIntoDocument(
      <RideMap apiKey="" pickup={pickup} dropoff={dropoff} />
    );
    expect(root.textContent).toContain('Map requires API key');
  });

  test('renders as div element with correct inline height style', () => {
    const root = renderIntoDocument(
      <RideMap apiKey="test-key" pickup={pickup} dropoff={dropoff} />
    );
    const containerEl = root.firstElementChild as HTMLElement;
    expect(containerEl.tagName.toLowerCase()).toBe('div');
    expect(containerEl.style.height).toBe('320px');
  });
});
