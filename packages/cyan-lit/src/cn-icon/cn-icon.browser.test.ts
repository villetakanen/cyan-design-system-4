import { describe, expect, it } from 'vitest';
import './cn-icon.js';
import type { CnIcon } from './cn-icon.js';

describe('CnIcon - Browser Tests', () => {
  it('should have proper default styling', async () => {
    const element = document.createElement('cn-icon') as CnIcon;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const styles = getComputedStyle(element);
    expect(styles.display).toBe('inline-block');
    expect(styles.position).toBe('relative');

    document.body.removeChild(element);
  });

  it('should apply size classes correctly', async () => {
    const element = document.createElement('cn-icon') as CnIcon;
    element.small = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.hasAttribute('small')).toBe(true);

    document.body.removeChild(element);
  });

  it('should render SVG element', async () => {
    const element = document.createElement('cn-icon') as CnIcon;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const svg = element.shadowRoot?.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute('viewBox')).toBe('0 0 128 128');

    document.body.removeChild(element);
  });

  it('should update icon URL when noun changes', async () => {
    const element = document.createElement('cn-icon') as CnIcon;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Initially should use default icon
    let use = element.shadowRoot?.querySelector('use');
    expect(use?.getAttribute('href')).toBe('/icons/design.svg#icon');

    // Change noun and check if URL updates
    element.noun = 'star';
    await new Promise((resolve) => setTimeout(resolve, 0));

    use = element.shadowRoot?.querySelector('use');
    expect(use?.getAttribute('href')).toBe('/icons/star.svg#icon');

    document.body.removeChild(element);
  });

  it('should maintain accessibility attributes', async () => {
    const element = document.createElement('cn-icon') as CnIcon;
    element.noun = 'accessibility-test';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const svg = element.shadowRoot?.querySelector('svg');
    const title = element.shadowRoot?.querySelector('title');

    expect(svg?.getAttribute('aria-labelledby')).toBe('ariaNoun');
    expect(title?.id).toBe('ariaNoun');
    expect(title?.textContent).toBe('accessibility-test');

    document.body.removeChild(element);
  });

  it('should handle multiple size attributes correctly', async () => {
    const element = document.createElement('cn-icon') as CnIcon;
    element.small = true;
    element.large = false;
    element.xsmall = false;
    element.xlarge = false;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.hasAttribute('small')).toBe(true);
    expect(element.hasAttribute('large')).toBe(false);
    expect(element.hasAttribute('xsmall')).toBe(false);
    expect(element.hasAttribute('xlarge')).toBe(false);

    document.body.removeChild(element);
  });
});
