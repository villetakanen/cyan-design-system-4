import { describe, expect, it } from 'vitest';
import type { CnAccordion } from './cn-accordion';
import './cn-accordion.js';

describe('CnAccordion', () => {
  it('should expand and collapse', async () => {
    const element = document.createElement('cn-accordion') as CnAccordion;
    element.innerHTML = '<p>Content</p>';
    document.body.appendChild(element);
    await element.updateComplete;

    const header = element.shadowRoot?.querySelector('.header') as HTMLElement;
    const content = element.shadowRoot?.querySelector(
      '.content',
    ) as HTMLElement;
    const icon = element.shadowRoot?.querySelector('cn-icon') as HTMLElement;

    // Initial state: collapsed
    expect(element.expanded).toBe(false);
    expect(getComputedStyle(content).maxHeight).toBe('0px');
    // Icon is rotated -90deg when collapsed (matrix(0, -1, 1, 0, 0, 0))
    const collapsedTransform = getComputedStyle(icon).transform;
    expect(collapsedTransform).toContain('matrix');

    // Expand
    header.click();
    await element.updateComplete;
    // need to wait for transition to finish
    await new Promise((resolve) => setTimeout(resolve, 400));

    expect(element.expanded).toBe(true);
    expect(getComputedStyle(content).maxHeight).not.toBe('0px');
    // Icon is rotated 90deg when expanded (different matrix values)
    const expandedTransform = getComputedStyle(icon).transform;
    expect(expandedTransform).toContain('matrix');
    expect(expandedTransform).not.toBe(collapsedTransform);

    // Collapse
    header.click();
    await element.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 400));

    expect(element.expanded).toBe(false);
    expect(getComputedStyle(content).maxHeight).toBe('0px');
    // Icon should be back to collapsed rotation
    expect(getComputedStyle(icon).transform).toBe(collapsedTransform);

    element.remove();
  });
});
