import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import './cn-stat-block';
import type { CnStatBlock } from './cn-stat-block';

describe('CnStatBlock', () => {
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

  describe('Properties', () => {
    it('should have default property values', () => {
      expect(element.label).toBe('');
      expect(element.labelPosition).toBe('top');
      expect(element.layout).toBe('rows');
    });

    it('should reflect properties to attributes', async () => {
      element.label = 'Test Label';
      element.labelPosition = 'bottom';
      element.layout = 'grid-2';
      await element.updateComplete;

      expect(element.getAttribute('label')).toBe('Test Label');
      expect(element.getAttribute('label-position')).toBe('bottom');
      expect(element.getAttribute('layout')).toBe('grid-2');
    });

    it('should update properties from attributes', async () => {
      element.setAttribute('label', 'Attribute Label');
      element.setAttribute('label-position', 'bottom');
      element.setAttribute('layout', 'grid-3');
      await element.updateComplete;

      expect(element.label).toBe('Attribute Label');
      expect(element.labelPosition).toBe('bottom');
      expect(element.layout).toBe('grid-3');
    });
  });

  describe('Rendering', () => {
    it('should render basic structure', async () => {
      const container = element.shadowRoot?.querySelector(
        '.stat-block-container',
      );
      const contentWrapper =
        element.shadowRoot?.querySelector('.content-wrapper');
      const slot = element.shadowRoot?.querySelector('slot');

      expect(container).toBeTruthy();
      expect(contentWrapper).toBeTruthy();
      expect(slot).toBeTruthy();
    });

    it('should render label when provided', async () => {
      element.label = 'Test Label';
      await element.updateComplete;

      const label = element.shadowRoot?.querySelector('.label');
      expect(label).toBeTruthy();
      expect(label?.textContent).toBe('Test Label');
    });

    it('should not render label when empty', async () => {
      element.label = '';
      await element.updateComplete;

      const label = element.shadowRoot?.querySelector('.label');
      expect(label).toBeFalsy();
    });

    it('should render label at top by default', async () => {
      element.label = 'Top Label';
      await element.updateComplete;

      const container = element.shadowRoot?.querySelector(
        '.stat-block-container',
      );
      const firstChild = container?.children[0];
      expect(firstChild?.classList.contains('label')).toBe(true);
    });

    it('should render label at bottom when labelPosition is bottom', async () => {
      element.label = 'Bottom Label';
      element.labelPosition = 'bottom';
      await element.updateComplete;

      const container = element.shadowRoot?.querySelector(
        '.stat-block-container',
      );
      const lastChild = container?.children[container.children.length - 1];
      expect(lastChild?.classList.contains('label')).toBe(true);
    });

    it('should apply correct layout class', async () => {
      element.layout = 'grid-2';
      await element.updateComplete;

      const contentWrapper =
        element.shadowRoot?.querySelector('.content-wrapper');
      expect(contentWrapper?.classList.contains('layout--grid-2')).toBe(true);

      element.layout = 'grid-3';
      await element.updateComplete;
      expect(contentWrapper?.classList.contains('layout--grid-3')).toBe(true);

      element.layout = 'rows';
      await element.updateComplete;
      expect(contentWrapper?.classList.contains('layout--rows')).toBe(true);
    });
  });

  describe('Slotted Content', () => {
    it('should accept slotted content', async () => {
      const testDiv = document.createElement('div');
      testDiv.textContent = 'Test Content';
      element.appendChild(testDiv);
      await element.updateComplete;

      const slot = element.shadowRoot?.querySelector('slot') as HTMLSlotElement;
      const assignedNodes = slot.assignedNodes();
      expect(assignedNodes.length).toBe(1);
      expect(assignedNodes[0]).toBe(testDiv);
    });

    it('should handle multiple slotted elements', async () => {
      const div1 = document.createElement('div');
      div1.textContent = 'Content 1';
      const div2 = document.createElement('div');
      div2.textContent = 'Content 2';

      element.appendChild(div1);
      element.appendChild(div2);
      await element.updateComplete;

      const slot = element.shadowRoot?.querySelector('slot') as HTMLSlotElement;
      const assignedNodes = slot.assignedNodes();
      expect(assignedNodes.length).toBe(2);
    });
  });

  describe('CSS Parts', () => {
    it('should expose container part', () => {
      const container = element.shadowRoot?.querySelector('[part="container"]');
      expect(container).toBeTruthy();
    });

    it('should expose label part when label is present', async () => {
      element.label = 'Test Label';
      await element.updateComplete;

      const label = element.shadowRoot?.querySelector('[part="label"]');
      expect(label).toBeTruthy();
    });
  });
});
