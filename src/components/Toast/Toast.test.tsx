import { describe, test, expect, afterEach, beforeEach, vi } from 'vitest';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { Toast } from './Toast';

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

afterEach(() => {
  if (container && document.body.contains(container)) {
    act(() => root.unmount());
    document.body.removeChild(container);
  }
});

function renderIntoDocument(element: React.ReactElement) {
  container = document.createElement('div');
  document.body.appendChild(container);
  act(() => {
    root = createRoot(container);
    root.render(element);
  });
  return container;
}

describe('Toast', () => {
  test('does not render when visible=false', () => {
    const el = renderIntoDocument(
      <Toast message="Hello" visible={false} />
    );
    expect(el.children.length).toBe(0);
  });

  test('renders message text when visible=true', () => {
    const el = renderIntoDocument(
      <Toast message="Hello world" visible={true} />
    );
    expect(el.textContent).toContain('Hello world');
  });

  test('has toast-enter class when visible', () => {
    const el = renderIntoDocument(
      <Toast message="Hi" visible={true} />
    );
    const inner = el.querySelector('.toast-enter');
    expect(inner).toBeTruthy();
  });

  describe('timer tests', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    test('calls onDismiss after duration', () => {
      const onDismiss = vi.fn();
      renderIntoDocument(
        <Toast message="Bye" visible={true} duration={3000} onDismiss={onDismiss} />
      );
      expect(onDismiss).not.toHaveBeenCalled();
      act(() => {
        vi.advanceTimersByTime(3000);
      });
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    test('cleans up timer on unmount', () => {
      const onDismiss = vi.fn();
      renderIntoDocument(
        <Toast message="Bye" visible={true} duration={3000} onDismiss={onDismiss} />
      );
      // unmount before timer fires
      act(() => root.unmount());
      act(() => {
        vi.advanceTimersByTime(3000);
      });
      expect(onDismiss).not.toHaveBeenCalled();
    });
  });
});
