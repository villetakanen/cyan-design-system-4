import { describe, expect, it } from 'vitest';
import './cn-toggle-button.js';
import type { CnToggleButton } from './cn-toggle-button.js';

describe('CnToggleButton - Browser Tests', () => {
  it('should have proper default styling', async () => {
    const element = document.createElement(
      'cn-toggle-button',
    ) as CnToggleButton;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-toggle-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const styles = getComputedStyle(element);
    expect(styles.display).toBe('contents');

    document.body.removeChild(element);
  });

  it('should have proper button styling', async () => {
    const element = document.createElement(
      'cn-toggle-button',
    ) as CnToggleButton;
    element.label = 'Test Button';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-toggle-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const button = element.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();

    if (button) {
      const buttonStyles = getComputedStyle(button);
      expect(buttonStyles.borderStyle).toBe('none');
      expect(buttonStyles.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    }

    document.body.removeChild(element);
  });

  it('should handle keyboard events', async () => {
    const element = document.createElement(
      'cn-toggle-button',
    ) as CnToggleButton;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-toggle-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Should toggle on Enter key
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    element.dispatchEvent(enterEvent);
    expect(element.pressed).toBe(true);

    // Should toggle on Space key
    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
    element.dispatchEvent(spaceEvent);
    expect(element.pressed).toBe(false);

    // Should not toggle on other keys
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    element.dispatchEvent(escapeEvent);
    expect(element.pressed).toBe(false);

    document.body.removeChild(element);
  });

  it('should be focusable', async () => {
    const element = document.createElement(
      'cn-toggle-button',
    ) as CnToggleButton;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-toggle-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.getAttribute('tabindex')).toBe('0');
    expect(element.getAttribute('role')).toBe('button');

    document.body.removeChild(element);
  });
});
