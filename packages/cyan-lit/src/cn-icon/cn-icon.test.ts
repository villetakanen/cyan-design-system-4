import { describe, expect, it } from 'vitest';
import './cn-icon.js';
import type { CnIcon } from './cn-icon.js';

describe('CnIcon', () => {
  it('should be defined', () => {
    const element = document.createElement('cn-icon');
    expect(element).toBeInstanceOf(HTMLElement);
  });

  it('should render default content', async () => {
    const element = document.createElement('cn-icon') as CnIcon;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const svg = element.shadowRoot?.querySelector('svg');
    expect(svg).toBeTruthy();

    document.body.removeChild(element);
  });

  it('should use default icon when no noun is set', async () => {
    const element = document.createElement('cn-icon') as CnIcon;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const use = element.shadowRoot?.querySelector('use');
    expect(use?.getAttribute('href')).toBe('/icons/design.svg#icon');

    document.body.removeChild(element);
  });

  it('should use specified noun icon when noun is set', async () => {
    const element = document.createElement('cn-icon') as CnIcon;
    element.noun = 'home';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const use = element.shadowRoot?.querySelector('use');
    expect(use?.getAttribute('href')).toBe('/icons/home.svg#icon');

    document.body.removeChild(element);
  });

  it('should display correct title for accessibility', async () => {
    const element = document.createElement('cn-icon') as CnIcon;
    element.noun = 'settings';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const title = element.shadowRoot?.querySelector('title');
    expect(title?.textContent).toBe('settings');

    document.body.removeChild(element);
  });

  it('should handle xsmall size attribute', async () => {
    const element = document.createElement('cn-icon') as CnIcon;
    element.xsmall = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.getAttribute('xsmall')).toBe('');

    document.body.removeChild(element);
  });

  it('should handle small size attribute', async () => {
    const element = document.createElement('cn-icon') as CnIcon;
    element.small = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.getAttribute('small')).toBe('');

    document.body.removeChild(element);
  });

  it('should handle large size attribute', async () => {
    const element = document.createElement('cn-icon') as CnIcon;
    element.large = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.getAttribute('large')).toBe('');

    document.body.removeChild(element);
  });

  it('should handle xlarge size attribute', async () => {
    const element = document.createElement('cn-icon') as CnIcon;
    element.xlarge = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.getAttribute('xlarge')).toBe('');

    document.body.removeChild(element);
  });

  it('should reflect properties as attributes', async () => {
    const element = document.createElement('cn-icon') as CnIcon;
    element.noun = 'test-icon';
    element.small = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.getAttribute('noun')).toBe('test-icon');
    expect(element.getAttribute('small')).toBe('');

    document.body.removeChild(element);
  });
});
