import { describe, expect, it } from 'vitest';
import './cn-loader.js';
import type { CnLoader } from './cn-loader.js';

describe('CnLoader', () => {
  it('should be defined', () => {
    const element = document.createElement('cn-loader');
    expect(element).toBeInstanceOf(HTMLElement);
  });

  it('should render with default properties', async () => {
    const element = document.createElement('cn-loader') as CnLoader;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-loader');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.noun).toBe('fox');
    expect(element.inline).toBe(false);

    document.body.removeChild(element);
  });

  it('should render with custom noun', async () => {
    const element = document.createElement('cn-loader') as CnLoader;
    element.noun = 'cat';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-loader');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.noun).toBe('cat');
    expect(element.getAttribute('noun')).toBe('cat');

    document.body.removeChild(element);
  });

  it('should render as inline', async () => {
    const element = document.createElement('cn-loader') as CnLoader;
    element.inline = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-loader');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.inline).toBe(true);
    expect(element.hasAttribute('inline')).toBe(true);

    document.body.removeChild(element);
  });

  it('should contain cn-icon element', async () => {
    const element = document.createElement('cn-loader') as CnLoader;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-loader');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const icon = element.shadowRoot?.querySelector('cn-icon');

    expect(icon).toBeTruthy();
    expect(icon?.getAttribute('noun')).toBe('fox');

    document.body.removeChild(element);
  });

  it('should set large attribute on icon when not inline', async () => {
    const element = document.createElement('cn-loader') as CnLoader;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-loader');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const icon = element.shadowRoot?.querySelector('cn-icon');

    expect(icon?.hasAttribute('large')).toBe(true);

    document.body.removeChild(element);
  });

  it('should not set large attribute on icon when inline', async () => {
    const element = document.createElement('cn-loader') as CnLoader;
    element.inline = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-loader');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const icon = element.shadowRoot?.querySelector('cn-icon');

    expect(icon?.hasAttribute('large')).toBe(false);

    document.body.removeChild(element);
  });

  it('should contain dual ring loader element', async () => {
    const element = document.createElement('cn-loader') as CnLoader;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-loader');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const dualRing = element.shadowRoot?.querySelector('.lds-dual-ring');

    expect(dualRing).toBeTruthy();

    document.body.removeChild(element);
  });
});
