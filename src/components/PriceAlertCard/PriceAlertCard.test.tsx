import { describe, test, expect, afterEach } from 'vitest';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { PriceAlertCard } from './PriceAlertCard';
import type { FareBreakdown } from './PriceAlertCard';

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

const defaultBreakdown: FareBreakdown = {
  baseFare: 5.00,
  distance: 12.50,
  time: 7.00,
  surge: 0,
  total: 24.50,
};

const surgeBreakdown: FareBreakdown = {
  baseFare: 5.00,
  distance: 12.50,
  time: 7.00,
  surge: 12.25,
  total: 36.75,
};

describe('PriceAlertCard', () => {
  test('renders fare amount with currency symbol', () => {
    const root = renderIntoDocument(
      <PriceAlertCard amount={24.50} breakdown={defaultBreakdown} />
    );
    expect(root.textContent).toContain('$24.50');
  });

  test('does NOT show surge badge when surgeMultiplier is undefined', () => {
    const root = renderIntoDocument(
      <PriceAlertCard amount={24.50} breakdown={defaultBreakdown} />
    );
    // Badge with variant lime would contain bg-lime-500 class
    const badges = root.querySelectorAll('span.bg-lime-500');
    expect(badges.length).toBe(0);
  });

  test('shows surge badge with multiplier text when surgeMultiplier > 1', () => {
    const root = renderIntoDocument(
      <PriceAlertCard amount={36.75} surgeMultiplier={1.5} breakdown={surgeBreakdown} />
    );
    expect(root.textContent).toContain('1.5x');
    const badge = root.querySelector('span.bg-lime-500');
    expect(badge).not.toBeNull();
  });

  test('renders breakdown items with Base fare and Distance labels', () => {
    const root = renderIntoDocument(
      <PriceAlertCard amount={24.50} breakdown={defaultBreakdown} />
    );
    expect(root.textContent).toContain('Base fare');
    expect(root.textContent).toContain('Distance');
  });

  test('renders total row', () => {
    const root = renderIntoDocument(
      <PriceAlertCard amount={24.50} breakdown={defaultBreakdown} />
    );
    expect(root.textContent).toContain('Total');
    expect(root.textContent).toContain('$24.50');
  });
});
