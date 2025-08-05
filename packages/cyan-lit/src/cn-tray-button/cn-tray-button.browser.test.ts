import { describe, expect, it } from 'vitest';
import './cn-tray-button.js';
import type { CnTrayButton } from './cn-tray-button.js';

describe('CnTrayButton - Browser Tests', () => {
  it('should have proper default styling', async () => {
    const element = document.createElement('cn-tray-button') as CnTrayButton;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-tray-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const styles = getComputedStyle(element);
    expect(styles.display).toBe('block');
    expect(styles.borderRadius).toBe('50%');

    document.body.removeChild(element);
  });

  it('should render button element', async () => {
    const element = document.createElement('cn-tray-button') as CnTrayButton;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-tray-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const button = element.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.getAttribute('aria-label')).toBe('Menu');
    expect(button?.getAttribute('aria-controls')).toBe('#cn-tray');

    document.body.removeChild(element);
  });

  it('should render state indicator elements', async () => {
    const element = document.createElement('cn-tray-button') as CnTrayButton;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-tray-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const stateBox = element.shadowRoot?.querySelector('.state-box');
    const stateIndicator =
      element.shadowRoot?.querySelector('.state-indicator');

    expect(stateBox).toBeTruthy();
    expect(stateIndicator).toBeTruthy();

    document.body.removeChild(element);
  });

  it('should toggle on button click', async () => {
    const element = document.createElement('cn-tray-button') as CnTrayButton;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-tray-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const button = element.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();

    // Initially closed
    expect(element.ariaExpanded).toBe('false');

    // Click to open
    button?.click();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(element.ariaExpanded).toBe('true');

    // Click to close
    button?.click();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(element.ariaExpanded).toBe('false');

    document.body.removeChild(element);
  });

  it('should update button attributes when properties change', async () => {
    const element = document.createElement('cn-tray-button') as CnTrayButton;
    element.ariaLabel = 'Navigation Menu';
    element.ariaControls = '#main-nav';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-tray-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const button = element.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('aria-label')).toBe('Navigation Menu');
    expect(button?.getAttribute('aria-controls')).toBe('#main-nav');

    document.body.removeChild(element);
  });

  it('should apply expanded state styling', async () => {
    const element = document.createElement('cn-tray-button') as CnTrayButton;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-tray-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    element.ariaExpanded = 'true';
    await element.updateComplete;

    expect(element.hasAttribute('aria-expanded')).toBe(true);
    expect(element.getAttribute('aria-expanded')).toBe('true');

    document.body.removeChild(element);
  });
});
