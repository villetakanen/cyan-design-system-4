import { describe, expect, it } from 'vitest';
import './index.js';
import type { CnLightbox } from './index.js';

describe('CnLightbox - Browser Tests', () => {
  it('should have proper default styling', async () => {
    const element = document.createElement('cn-lightbox') as CnLightbox;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-lightbox');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const styles = getComputedStyle(element);
    expect(styles.display).toBe('block');
    // expect(styles.width).toBe('1280px'); // default browser width
    expect(styles.aspectRatio).toBe('16 / 9');

    document.body.removeChild(element);
  });

  it('should have proper styling for single image layout', async () => {
    const element = document.createElement('cn-lightbox') as CnLightbox;
    element.images = [{ src: 'test.jpg', caption: 'test caption' }];
    document.body.appendChild(element);

    await customElements.whenDefined('cn-lightbox');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const figure = element.shadowRoot?.querySelector('.single-figure');
    expect(figure).toBeTruthy();
    const figureStyles = getComputedStyle(figure as Element);
    expect(figureStyles.margin).toBe('0px');
    // expect(figureStyles.padding).toBe('4px'); // --cn-lightbox-inner-spacing, 0.25rem, 1rem = 16px

    const img = element.shadowRoot?.querySelector('img');
    expect(img).toBeTruthy();
    const imgStyles = getComputedStyle(img as Element);
    // expect(imgStyles.width).toBe('1272px'); // 1280 - 2*4
    expect(imgStyles.aspectRatio).toBe('16 / 9');
    expect(imgStyles.objectFit).toBe('cover');

    document.body.removeChild(element);
  });

  it('should have proper styling for multi-image layout', async () => {
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
    const containerStyles = getComputedStyle(container as Element);
    expect(containerStyles.display).toBe('flex');
    expect(containerStyles.flexWrap).toBe('nowrap');
    expect(containerStyles.overflowX).toBe('scroll');

    const figure = element.shadowRoot?.querySelector('.square-figure');
    expect(figure).toBeTruthy();
    const figureStyles = getComputedStyle(figure as Element);
    expect(figureStyles.flexGrow).toBe('0');
    expect(figureStyles.flexShrink).toBe('0');
    expect(figureStyles.position).toBe('relative');

    const img = element.shadowRoot?.querySelector('img');
    expect(img).toBeTruthy();
    const imgStyles = getComputedStyle(img as Element);
    expect(imgStyles.aspectRatio).toBe('1 / 1');
    expect(imgStyles.objectFit).toBe('cover');

    document.body.removeChild(element);
  });
});
