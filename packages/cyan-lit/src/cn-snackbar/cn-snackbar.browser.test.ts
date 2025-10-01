import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import './cn-snackbar.ts';
import type { CnSnackbar } from './cn-snackbar.ts';

describe('CnSnackbar - Browser Tests', () => {
  let element: CnSnackbar;
  let styleElement: HTMLStyleElement;

  beforeEach(() => {
    // Add z-index token to the test environment
    styleElement = document.createElement('style');
    styleElement.textContent = ':root { --z-index-snackbar: 60000; }';
    document.head.appendChild(styleElement);

    element = document.createElement('cn-snackbar') as CnSnackbar;
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
    document.head.removeChild(styleElement);
  });

  it('should have proper default styling', async () => {
    await customElements.whenDefined('cn-snackbar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const styles = getComputedStyle(element);
    expect(styles.position).toBe('fixed');
    expect(styles.bottom).toBe('8px');
    expect(styles.left).toBe('8px');
    expect(styles.opacity).toBe('0');
    expect(styles.transition).toContain('opacity 0.3s');
  });

  it('should have high z-index to appear above other elements', async () => {
    await customElements.whenDefined('cn-snackbar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const styles = getComputedStyle(element);
    // z-index should be 60000 (--z-index-snackbar token)
    expect(styles.zIndex).toBe('60000');
  });

  it('should become visible when `visible` property is true', async () => {
    await customElements.whenDefined('cn-snackbar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    element.visible = true;
    await element.updateComplete;

    const styles = getComputedStyle(element);
    expect(styles.opacity).toBe('1');
  });

  it('should render action button if action is provided', async () => {
    await customElements.whenDefined('cn-snackbar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const message = {
      message: 'Test message',
      action: { label: 'Click Me', callback: () => {} },
    };
    document.dispatchEvent(
      new CustomEvent('cn-snackbar-add', { detail: message }),
    );
    await element.updateComplete;

    const actionButton = element.shadowRoot?.querySelector('button');
    expect(actionButton).toBeTruthy();
    expect(actionButton?.textContent).toBe('Click Me');
  });

  it('should not render action button if no action is provided', async () => {
    await customElements.whenDefined('cn-snackbar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const message = { message: 'Test message' };
    document.dispatchEvent(
      new CustomEvent('cn-snackbar-add', { detail: message }),
    );
    await element.updateComplete;

    const actionButton = element.shadowRoot?.querySelector('button');
    expect(actionButton).toBeFalsy();
  });
});
