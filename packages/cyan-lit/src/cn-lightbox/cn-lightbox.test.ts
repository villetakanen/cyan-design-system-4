import { describe, expect, it } from 'vitest';
import './index.js';
import type { CnLightbox } from './index.js';

describe('CnLightbox', () => {
  it('should be defined', () => {
    const element = document.createElement('cn-lightbox');
    expect(element).toBeInstanceOf(HTMLElement);
  });

  it('should render nothing when no images are provided', async () => {
    const element = document.createElement('cn-lightbox') as CnLightbox;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-lightbox');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.shadowRoot?.innerHTML).toContain('<!---->');

    document.body.removeChild(element);
  });

  it('should render a single image when one image is provided', async () => {
    const element = document.createElement('cn-lightbox') as CnLightbox;
    element.images = [{ src: 'test.jpg', caption: 'test caption' }];
    document.body.appendChild(element);

    await customElements.whenDefined('cn-lightbox');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const figure = element.shadowRoot?.querySelector('.single-figure');
    expect(figure).toBeTruthy();
    const img = element.shadowRoot?.querySelector('img');
    expect(img?.src).toContain('test.jpg');
    expect(img?.getAttribute('loading')).toBe('lazy');
    const caption = element.shadowRoot?.querySelector('figcaption');
    expect(caption?.textContent).toBe('test caption');

    document.body.removeChild(element);
  });

  it('should render multiple images when multiple images are provided', async () => {
    const element = document.createElement('cn-lightbox') as CnLightbox;
    element.images = [
      { src: 'test1.jpg', caption: 'caption 1' },
      { src: 'test2.jpg', caption: 'caption 2' },
    ];
    document.body.appendChild(element);

    await customElements.whenDefined('cn-lightbox');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const container = element.shadowRoot?.querySelector('.flex-container');
    expect(container).toBeTruthy();
    const figures = element.shadowRoot?.querySelectorAll('figure');
    expect(figures?.length).toBe(2);
    const imgs = element.shadowRoot?.querySelectorAll('img');
    expect(imgs?.[0]?.src).toContain('test1.jpg');
    expect(imgs?.[0]?.getAttribute('loading')).toBe('lazy');
    expect(imgs?.[1]?.src).toContain('test2.jpg');
    expect(imgs?.[1]?.getAttribute('loading')).toBe('lazy');
    const captions = element.shadowRoot?.querySelectorAll('figcaption');
    expect(captions?.[0]?.textContent).toBe('caption 1');
    expect(captions?.[1]?.textContent).toBe('caption 2');

    document.body.removeChild(element);
  });
});
