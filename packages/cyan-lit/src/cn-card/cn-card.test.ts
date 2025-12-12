import { describe, expect, it } from 'vitest';
import './cn-card.js';
import type { CnCard } from './cn-card.js';

describe('CnCard', () => {
  it('should be defined', () => {
    const element = document.createElement('cn-card');
    expect(element).toBeInstanceOf(HTMLElement);
  });

  it('should render default content', async () => {
    const element = document.createElement('cn-card') as CnCard;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-card');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const defaultSlot = element.shadowRoot?.querySelector('slot:not([name])');
    expect(defaultSlot).toBeTruthy();

    document.body.removeChild(element);
  });

  it('should render description when provided', async () => {
    const element = document.createElement('cn-card') as CnCard;
    element.description = 'Test description';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-card');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const cardDescription =
      element.shadowRoot?.querySelector('.cardDescription');
    expect(cardDescription).toBeTruthy();
    expect(cardDescription?.textContent).toBe('Test description');

    document.body.removeChild(element);
  });

  it('should set default elevation to 1', async () => {
    const element = document.createElement('cn-card') as CnCard;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-card');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.elevation).toBe(1);

    document.body.removeChild(element);
  });

  it('should render title when provided', async () => {
    const element = document.createElement('cn-card') as CnCard;
    element.title = 'Test Card Title';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-card');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const title = element.shadowRoot?.querySelector('.cardTitle');
    expect(title?.textContent).toBe('Test Card Title');

    document.body.removeChild(element);
  });

  it('should render icon when noun is provided', async () => {
    const element = document.createElement('cn-card') as CnCard;
    element.noun = 'home';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-card');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const icon = element.shadowRoot?.querySelector('cn-icon');
    expect(icon?.getAttribute('noun')).toBe('home');

    document.body.removeChild(element);
  });

  it('should render cover image when cover is provided', async () => {
    const element = document.createElement('cn-card') as CnCard;
    document.body.appendChild(element);
    element.cover = '/test-image.jpg';

    await element.updateComplete;
    await customElements.whenDefined('cn-card');

    const coverImg = element.shadowRoot?.querySelector('.cardContent img');
    expect(coverImg?.getAttribute('src')).toBe('/test-image.jpg');
    expect(coverImg?.getAttribute('loading')).toBe('lazy');

    document.body.removeChild(element);
  });

  it('should create linked title when href is provided', async () => {
    const element = document.createElement('cn-card') as CnCard;
    element.title = 'Linked Card';
    element.href = '/test-link';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-card');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const titleLink = element.shadowRoot?.querySelector('.cardTitle a');
    expect(titleLink?.getAttribute('href')).toBe('/test-link');
    expect(titleLink?.textContent).toBe('Linked Card');

    document.body.removeChild(element);
  });

  it('should create linked cover when both cover and href are provided', async () => {
    const element = document.createElement('cn-card') as CnCard;
    element.cover = '/test-image.jpg';
    element.href = '/test-link';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-card');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const coverLink = element.shadowRoot?.querySelector('.cardContent a');
    expect(coverLink?.getAttribute('href')).toBe('/test-link');

    document.body.removeChild(element);
  });

  it('should reflect notify attribute', async () => {
    const element = document.createElement('cn-card') as CnCard;
    element.notify = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-card');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.getAttribute('notify')).toBe('');

    document.body.removeChild(element);
  });

  it('should reflect alert attribute', async () => {
    const element = document.createElement('cn-card') as CnCard;
    element.alert = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-card');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.getAttribute('alert')).toBe('');

    document.body.removeChild(element);
  });

  it('should render card actions slot', async () => {
    const element = document.createElement('cn-card') as CnCard;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-card');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const actionsSlot = element.shadowRoot?.querySelector(
      '.cardActions slot[name="actions"]',
    );
    expect(actionsSlot).toBeTruthy();

    document.body.removeChild(element);
  });

  it('should reflect elevation attribute', async () => {
    const element = document.createElement('cn-card') as CnCard;
    element.elevation = 0;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-card');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.getAttribute('elevation')).toBe('0');

    document.body.removeChild(element);
  });

  it('should render srcset when provided', async () => {
    const element = document.createElement('cn-card') as CnCard;
    element.cover = '/test-image.jpg';
    element.srcset = '/test-400.jpg 400w, /test-800.jpg 800w';
    document.body.appendChild(element);

    await element.updateComplete;
    await customElements.whenDefined('cn-card');

    const coverImg = element.shadowRoot?.querySelector('.cardContent img');
    expect(coverImg?.getAttribute('srcset')).toBe(
      '/test-400.jpg 400w, /test-800.jpg 800w',
    );

    document.body.removeChild(element);
  });

  it('should render sizes when provided', async () => {
    const element = document.createElement('cn-card') as CnCard;
    element.cover = '/test-image.jpg';
    element.sizes = '(max-width: 768px) 100vw, 800px';
    document.body.appendChild(element);

    await element.updateComplete;
    await customElements.whenDefined('cn-card');

    const coverImg = element.shadowRoot?.querySelector('.cardContent img');
    expect(coverImg?.getAttribute('sizes')).toBe(
      '(max-width: 768px) 100vw, 800px',
    );

    document.body.removeChild(element);
  });

  it('should render both srcset and sizes when provided', async () => {
    const element = document.createElement('cn-card') as CnCard;
    element.cover = '/test-image.jpg';
    element.srcset =
      '/test-400.jpg 400w, /test-800.jpg 800w, /test-1600.jpg 1600w';
    element.sizes = '(max-width: 768px) 100vw, 800px';
    document.body.appendChild(element);

    await element.updateComplete;
    await customElements.whenDefined('cn-card');

    const coverImg = element.shadowRoot?.querySelector('.cardContent img');
    expect(coverImg?.getAttribute('srcset')).toBe(
      '/test-400.jpg 400w, /test-800.jpg 800w, /test-1600.jpg 1600w',
    );
    expect(coverImg?.getAttribute('sizes')).toBe(
      '(max-width: 768px) 100vw, 800px',
    );

    document.body.removeChild(element);
  });
});
