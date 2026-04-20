import { describe, test, expect, afterEach } from 'vitest';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { Tabs } from './Tabs';
import type { Tab } from './Tabs';

let container: HTMLDivElement;

const sampleTabs: Tab[] = [
  { id: 'rides', label: 'Rides' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'history', label: 'History' },
];

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

describe('Tabs', () => {
  test('renders the correct number of tab buttons', () => {
    const root = renderIntoDocument(
      <Tabs tabs={sampleTabs} activeTab="rides" onTabChange={() => {}} />
    );
    const buttons = root.querySelectorAll('button');
    expect(buttons.length).toBe(3);
  });

  test('active tab button has text-lime-400 class', () => {
    const root = renderIntoDocument(
      <Tabs tabs={sampleTabs} activeTab="rides" onTabChange={() => {}} />
    );
    const firstButton = root.querySelector('button');
    expect(firstButton?.classList.contains('text-lime-400')).toBe(true);
  });

  test('inactive tabs do not have text-lime-400 class', () => {
    const root = renderIntoDocument(
      <Tabs tabs={sampleTabs} activeTab="rides" onTabChange={() => {}} />
    );
    const buttons = Array.from(root.querySelectorAll('button'));
    const inactiveButtons = buttons.slice(1);
    inactiveButtons.forEach((btn) => {
      expect(btn.classList.contains('text-lime-400')).toBe(false);
    });
  });

  test('renders correct tab labels', () => {
    const root = renderIntoDocument(
      <Tabs tabs={sampleTabs} activeTab="rides" onTabChange={() => {}} />
    );
    expect(root.textContent).toContain('Rides');
    expect(root.textContent).toContain('Schedule');
    expect(root.textContent).toContain('History');
  });
});
