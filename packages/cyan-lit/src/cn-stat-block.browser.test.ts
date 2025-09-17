import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import './cn-stat-block';
import type { CnStatBlock } from './cn-stat-block';

describe('CnStatBlock Browser Tests', () => {
  let element: CnStatBlock;

  beforeEach(async () => {
    element = document.createElement('cn-stat-block');
    document.body.appendChild(element);
    await customElements.whenDefined('cn-stat-block');
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  describe('Styling and Layout', () => {
    it('should have block display', () => {
      const computedStyle = getComputedStyle(element);
      expect(computedStyle.display).toBe('block');
    });

    it('should apply card-like appearance to container', () => {
      const container = element.shadowRoot?.querySelector(
        '.stat-block-container',
      ) as HTMLElement;

      expect(container).toBeTruthy();
      expect(container.classList.contains('stat-block-container')).toBe(true);
    });

    it('should use flex layout for rows (default)', async () => {
      const contentWrapper = element.shadowRoot?.querySelector(
        '.content-wrapper',
      ) as HTMLElement;
      const computedStyle = getComputedStyle(contentWrapper);

      expect(computedStyle.display).toBe('flex');
      expect(computedStyle.flexDirection).toBe('column');
    });

    it('should use grid layout for grid-2', async () => {
      element.layout = 'grid-2';
      await element.updateComplete;

      const contentWrapper = element.shadowRoot?.querySelector(
        '.content-wrapper',
      ) as HTMLElement;

      expect(contentWrapper.classList.contains('layout--grid-2')).toBe(true);
    });

    it('should use grid layout for grid-3', async () => {
      element.layout = 'grid-3';
      await element.updateComplete;

      const contentWrapper = element.shadowRoot?.querySelector(
        '.content-wrapper',
      ) as HTMLElement;

      expect(contentWrapper.classList.contains('layout--grid-3')).toBe(true);
    });

    it('should have proper structure for content wrapper', async () => {
      const contentWrapper = element.shadowRoot?.querySelector(
        '.content-wrapper',
      ) as HTMLElement;

      expect(contentWrapper).toBeTruthy();
      expect(contentWrapper.tagName.toLowerCase()).toBe('main');
    });

    it('should style label text appropriately', async () => {
      element.label = 'Test Label';
      await element.updateComplete;

      const label = element.shadowRoot?.querySelector('.label') as HTMLElement;
      const computedStyle = getComputedStyle(label);

      expect(computedStyle.fontWeight).toBeTruthy();
      expect(computedStyle.fontSize).toBeTruthy();
      expect(computedStyle.color).toBeTruthy();
    });
  });

  describe('Responsive Behavior', () => {
    it('should handle slotted content properly', async () => {
      // Add some test content
      const testDiv1 = document.createElement('div');
      testDiv1.textContent = 'Item 1';
      testDiv1.style.background = 'red';
      testDiv1.style.padding = '10px';

      const testDiv2 = document.createElement('div');
      testDiv2.textContent = 'Item 2';
      testDiv2.style.background = 'blue';
      testDiv2.style.padding = '10px';

      element.appendChild(testDiv1);
      element.appendChild(testDiv2);
      element.layout = 'grid-2';
      await element.updateComplete;

      // Verify the content is properly arranged
      const contentWrapper = element.shadowRoot?.querySelector(
        '.content-wrapper',
      ) as HTMLElement;
      const computedStyle = getComputedStyle(contentWrapper);
      expect(computedStyle.display).toBe('grid');

      // Check that slotted content is visible and positioned
      const rect1 = testDiv1.getBoundingClientRect();
      const rect2 = testDiv2.getBoundingClientRect();

      expect(rect1.width).toBeGreaterThan(0);
      expect(rect1.height).toBeGreaterThan(0);
      expect(rect2.width).toBeGreaterThan(0);
      expect(rect2.height).toBeGreaterThan(0);
    });

    it('should maintain proper spacing with different layouts', async () => {
      // Test with multiple children
      for (let i = 0; i < 4; i++) {
        const div = document.createElement('div');
        div.textContent = `Item ${i + 1}`;
        div.style.background = '#f0f0f0';
        div.style.padding = '8px';
        div.style.border = '1px solid #ccc';
        element.appendChild(div);
      }

      // Test rows layout
      element.layout = 'rows';
      await element.updateComplete;

      let contentWrapper = element.shadowRoot?.querySelector(
        '.content-wrapper',
      ) as HTMLElement;
      expect(contentWrapper.classList.contains('layout--rows')).toBe(true);

      // Test grid-2 layout
      element.layout = 'grid-2';
      await element.updateComplete;

      contentWrapper = element.shadowRoot?.querySelector(
        '.content-wrapper',
      ) as HTMLElement;
      expect(contentWrapper.classList.contains('layout--grid-2')).toBe(true);

      // Test grid-3 layout
      element.layout = 'grid-3';
      await element.updateComplete;

      contentWrapper = element.shadowRoot?.querySelector(
        '.content-wrapper',
      ) as HTMLElement;
      expect(contentWrapper.classList.contains('layout--grid-3')).toBe(true);
    });
  });

  describe('Integration with Other Components', () => {
    it('should work with various HTML elements', async () => {
      // Test with different types of elements
      const input = document.createElement('input');
      input.type = 'text';
      input.value = 'Test Input';

      const button = document.createElement('button');
      button.textContent = 'Test Button';

      const span = document.createElement('span');
      span.textContent = 'Test Span';

      element.appendChild(input);
      element.appendChild(button);
      element.appendChild(span);

      element.layout = 'grid-3';
      await element.updateComplete;

      // Verify all elements are rendered and positioned
      expect(input.getBoundingClientRect().width).toBeGreaterThan(0);
      expect(button.getBoundingClientRect().width).toBeGreaterThan(0);
      expect(span.getBoundingClientRect().width).toBeGreaterThan(0);
    });
  });
});
