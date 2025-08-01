import { describe, expect, it } from 'vitest';
import './cn-app-bar.js';
import type { CnAppBar } from './cn-app-bar.js';

describe('CnAppBar - Browser Tests', () => {
  it('should have proper styling', async () => {
    const element = document.createElement('cn-app-bar') as CnAppBar;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-app-bar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const styles = getComputedStyle(element);
    expect(styles.display).toBe('block');
    expect(styles.position).toBe('relative');

    document.body.removeChild(element);
  });

  it('should apply sticky positioning when mode is sticky', async () => {
    const element = document.createElement('cn-app-bar') as CnAppBar;
    element.mode = 'sticky';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-app-bar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const styles = getComputedStyle(element);
    expect(styles.position).toBe('sticky');
    expect(styles.top).toBe('0px');

    document.body.removeChild(element);
  });

  it('should apply modal styling when mode is modal', async () => {
    const element = document.createElement('cn-app-bar') as CnAppBar;
    element.mode = 'modal';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-app-bar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const styles = getComputedStyle(element);
    expect(styles.position).toBe('sticky');

    document.body.removeChild(element);
  });

  it('should have proper container layout', async () => {
    const element = document.createElement('cn-app-bar') as CnAppBar;
    element.title = 'Test Title';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-app-bar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const container = element.shadowRoot?.querySelector(
      '.container',
    ) as HTMLElement;
    expect(container).toBeTruthy();

    if (container) {
      const containerStyles = getComputedStyle(container);
      expect(containerStyles.display).toBe('flex');
      expect(containerStyles.alignItems).toBe('center');
    }

    document.body.removeChild(element);
  });

  it('should style title correctly', async () => {
    const element = document.createElement('cn-app-bar') as CnAppBar;
    element.title = 'Test Title';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-app-bar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const title = element.shadowRoot?.querySelector('.title') as HTMLElement;
    expect(title).toBeTruthy();

    if (title) {
      const titleStyles = getComputedStyle(title);
      expect(titleStyles.flexGrow).toBe('1');
      expect(titleStyles.whiteSpace).toBe('nowrap');
      expect(titleStyles.textOverflow).toBe('ellipsis');
      expect(titleStyles.overflow).toBe('hidden');
    }

    document.body.removeChild(element);
  });

  it('should handle scroll state changes', async () => {
    const element = document.createElement('cn-app-bar') as CnAppBar;
    element.mode = 'sticky';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-app-bar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Test initial state
    expect(element.scrolled).toBe(false);

    // Simulate scroll
    Object.defineProperty(window, 'pageYOffset', {
      value: 100,
      writable: true,
    });

    // Trigger scroll event
    element.scrolled = true;
    element.requestUpdate();
    await element.updateComplete;

    expect(element.scrolled).toBe(true);
    expect(element.getAttribute('scrolled')).toBe('');

    document.body.removeChild(element);
  });
});
