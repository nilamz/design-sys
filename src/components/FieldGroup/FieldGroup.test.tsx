import { describe, test, expect, afterEach } from 'vitest';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { FieldGroup } from './FieldGroup';
import { Input } from '../Input/Input';

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

describe('FieldGroup', () => {
  test('renders label text', () => {
    const root = renderIntoDocument(
      <FieldGroup label="Email">
        <Input placeholder="Enter your email..." />
      </FieldGroup>,
    );
    const label = root.querySelector('label');
    expect(label).toBeTruthy();
    expect(label?.textContent).toBe('Email');
  });
});
