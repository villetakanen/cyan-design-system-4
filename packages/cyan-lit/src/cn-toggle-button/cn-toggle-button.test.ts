import { describe, expect, it } from 'vitest';
import './cn-toggle-button.js';
import type { CnToggleButton } from './cn-toggle-button.js';

describe('CnToggleButton', () => {
  it('should be defined', () => {
    const element = document.createElement('cn-toggle-button');
    expect(element).toBeInstanceOf(HTMLElement);
  });

  it('should render default content', async () => {
    const element = document.createElement(
      'cn-toggle-button',
    ) as CnToggleButton;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-toggle-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const button = element.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();
    expect(element.pressed).toBe(false);
    expect(element.getAttribute('aria-pressed')).toBe('false');
  });

  it('should toggle pressed state when clicked', async () => {
    const element = document.createElement(
      'cn-toggle-button',
    ) as CnToggleButton;
    element.label = 'Test Toggle';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-toggle-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const button = element.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();

    // Initially not pressed
    expect(element.pressed).toBe(false);

    // Click to toggle
    button?.click();
    expect(element.pressed).toBe(true);
    expect(element.getAttribute('aria-pressed')).toBe('true');

    // Click again to toggle back
    button?.click();
    expect(element.pressed).toBe(false);
    expect(element.getAttribute('aria-pressed')).toBe('false');
  });

  it('should not toggle when disabled', async () => {
    const element = document.createElement(
      'cn-toggle-button',
    ) as CnToggleButton;
    element.disabled = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-toggle-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const button = element.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();

    // Should stay false when disabled
    button?.click();
    expect(element.pressed).toBe(false);
  });

  it('should dispatch change event when toggled', async () => {
    const element = document.createElement(
      'cn-toggle-button',
    ) as CnToggleButton;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-toggle-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    let changeEventFired = false;
    element.addEventListener('change', () => {
      changeEventFired = true;
    });

    const button = element.shadowRoot?.querySelector('button');
    button?.click();

    expect(changeEventFired).toBe(true);
  });
});
