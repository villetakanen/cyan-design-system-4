import { describe, expect, it } from 'vitest';
import './cn-loader.js';
import '../cn-icon/cn-icon.js';
import type { CnLoader } from './cn-loader.js';

describe('CnLoader - Browser Tests', () => {
  it('should have proper default styling', async () => {
    const element = document.createElement('cn-loader') as CnLoader;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-loader');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const styles = getComputedStyle(element);
    expect(styles.display).toBe('grid');
    expect(styles.position).toBe('relative');

    document.body.removeChild(element);
  });

  it('should render dual ring loader element', async () => {
    const element = document.createElement('cn-loader') as CnLoader;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-loader');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const dualRing = element.shadowRoot?.querySelector('.lds-dual-ring');
    expect(dualRing).toBeTruthy();

    const styles = getComputedStyle(dualRing as Element);
    expect(styles.position).toBe('absolute');

    document.body.removeChild(element);
  });

  it('should render cn-icon with correct properties', async () => {
    const element = document.createElement('cn-loader') as CnLoader;
    element.noun = 'star';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-loader');
    await customElements.whenDefined('cn-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const icon = element.shadowRoot?.querySelector('cn-icon');
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute('noun')).toBe('star');
    expect(icon?.hasAttribute('large')).toBe(true);

    document.body.removeChild(element);
  });

  it('should not have large icon when inline', async () => {
    const element = document.createElement('cn-loader') as CnLoader;
    element.inline = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-loader');
    await customElements.whenDefined('cn-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const icon = element.shadowRoot?.querySelector('cn-icon');
    expect(icon).toBeTruthy();
    expect(icon?.hasAttribute('large')).toBe(false);

    document.body.removeChild(element);
  });

  it('should update icon when noun changes', async () => {
    const element = document.createElement('cn-loader') as CnLoader;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-loader');
    await customElements.whenDefined('cn-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Initially should use default noun
    let icon = element.shadowRoot?.querySelector('cn-icon');
    expect(icon?.getAttribute('noun')).toBe('fox');

    // Change noun and check if it updates
    element.noun = 'cat';
    await new Promise((resolve) => setTimeout(resolve, 0));

    icon = element.shadowRoot?.querySelector('cn-icon');
    expect(icon?.getAttribute('noun')).toBe('cat');

    document.body.removeChild(element);
  });

  it('should reflect inline attribute correctly', async () => {
    const element = document.createElement('cn-loader') as CnLoader;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-loader');
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Initially should not have inline attribute
    expect(element.hasAttribute('inline')).toBe(false);

    // Set inline
    element.inline = true;
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.hasAttribute('inline')).toBe(true);

    document.body.removeChild(element);
  });
});
