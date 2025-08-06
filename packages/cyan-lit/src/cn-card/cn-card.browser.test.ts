import { describe, expect, it } from 'vitest';
import './cn-card.js';
import type { CnCard } from './cn-card.js';

describe('CnCard - Browser Tests', () => {
  it('should have proper default styling', async () => {
    const element = document.createElement('cn-card') as CnCard;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-card');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const styles = getComputedStyle(element);
    expect(styles.display).toBe('flex');
    expect(styles.flexDirection).toBe('column');
    expect(styles.position).toBe('relative');

    document.body.removeChild(element);
  });

  it('should apply elevation styles correctly', async () => {
    const element = document.createElement('cn-card') as CnCard;
    element.elevation = 0;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-card');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.hasAttribute('elevation')).toBe(true);
    expect(element.getAttribute('elevation')).toBe('0');

    document.body.removeChild(element);
  });

  it('should render cover image with proper styling', async () => {
    const element = document.createElement('cn-card') as CnCard;
    element.cover = '/test-image.jpg';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-card');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const coverImg = element.shadowRoot?.querySelector('.cardContent img');
    expect(coverImg).toBeTruthy();
    expect(coverImg?.getAttribute('src')).toBe('/test-image.jpg');

    const coverContent = element.shadowRoot?.querySelector('.cardContent');
    expect(coverContent).toBeTruthy();

    document.body.removeChild(element);
  });

  it('should show notify indicator when notify is true', async () => {
    const element = document.createElement('cn-card') as CnCard;
    element.notify = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-card');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.hasAttribute('notify')).toBe(true);

    document.body.removeChild(element);
  });

  it('should show alert indicator when alert is true', async () => {
    const element = document.createElement('cn-card') as CnCard;
    element.alert = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-card');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.hasAttribute('alert')).toBe(true);

    document.body.removeChild(element);
  });

  it('should handle slotted content correctly', async () => {
    const element = document.createElement('cn-card') as CnCard;
    element.innerHTML = '<span>Test content</span>';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-card');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const slot = element.shadowRoot?.querySelector('.cardDescription slot');
    expect(slot).toBeTruthy();

    const slottedContent = element.querySelector('span');
    expect(slottedContent?.textContent).toBe('Test content');

    document.body.removeChild(element);
  });

  it('should handle actions slot correctly', async () => {
    const element = document.createElement('cn-card') as CnCard;
    element.innerHTML = '<button slot="actions">Action</button>';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-card');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const actionsSlot = element.shadowRoot?.querySelector(
      '.cardActions slot[name="actions"]',
    );
    expect(actionsSlot).toBeTruthy();

    const actionButton = element.querySelector('button[slot="actions"]');
    expect(actionButton?.textContent).toBe('Action');

    document.body.removeChild(element);
  });

  it('should render icon with cover styling when both cover and noun are present', async () => {
    const element = document.createElement('cn-card') as CnCard;
    element.cover = '/test-image.jpg';
    element.noun = 'star';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-card');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const icon = element.shadowRoot?.querySelector('cn-icon');
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute('noun')).toBe('star');
    expect(icon?.hasAttribute('large')).toBe(true);

    document.body.removeChild(element);
  });

  it('should handle title links properly', async () => {
    const element = document.createElement('cn-card') as CnCard;
    element.title = 'Test Title';
    element.href = '/test-link';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-card');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const titleLink = element.shadowRoot?.querySelector('.cardTitle a');
    expect(titleLink).toBeTruthy();
    expect(titleLink?.getAttribute('href')).toBe('/test-link');
    expect(titleLink?.textContent).toBe('Test Title');

    document.body.removeChild(element);
  });

  it('should render title without link when no href is provided', async () => {
    const element = document.createElement('cn-card') as CnCard;
    element.title = 'Test Title';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-card');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const title = element.shadowRoot?.querySelector('.cardTitle');
    const titleLink = element.shadowRoot?.querySelector('.cardTitle a');

    expect(title?.textContent).toBe('Test Title');
    expect(titleLink).toBeFalsy();

    document.body.removeChild(element);
  });
});
