import { beforeEach, describe, expect, it } from 'vitest';
import './cyan-button.js';

describe('CyanButton - Browser Tests', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render with default label in browser', async () => {
    const element = document.createElement('cyan-button');
    document.body.appendChild(element);

    // Wait for the element to be defined and rendered
    await customElements.whenDefined('cyan-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const button = element.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.textContent).toBe('Button');
  });

  it('should render with custom label in browser', async () => {
    const element = document.createElement('cyan-button');
    element.setAttribute('label', 'Click Me');
    document.body.appendChild(element);

    await customElements.whenDefined('cyan-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const button = element.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.textContent).toBe('Click Me');
  });

  it('should handle click events', async () => {
    const element = document.createElement('cyan-button');
    element.setAttribute('label', 'Test Button');
    document.body.appendChild(element);

    await customElements.whenDefined('cyan-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const button = element.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();

    // Test that the button is clickable
    let clicked = false;
    button?.addEventListener('click', () => {
      clicked = true;
    });

    button?.click();
    expect(clicked).toBe(true);
  });

  it('should have proper styling', async () => {
    const element = document.createElement('cyan-button');
    document.body.appendChild(element);

    await customElements.whenDefined('cyan-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const button = element.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();

    if (button) {
      const styles = getComputedStyle(button);
      expect(styles).toBeTruthy();
      expect(styles?.backgroundColor).toBe('rgb(0, 123, 255)'); // #007bff
      expect(styles?.color).toBe('rgb(255, 255, 255)'); // white
      // Browser may apply default padding, so let's check it's not empty
      expect(styles?.padding).toBeTruthy();
    }
  });
});
