import { describe, expect, it } from 'vitest';
import './cn-bubble.js';
import type { CnBubble } from './cn-bubble.js';

describe('CnBubble', () => {
  it('should be defined', () => {
    const element = document.createElement('cn-bubble');
    expect(element).toBeInstanceOf(HTMLElement);
  });

  it('should render slot content', async () => {
    const element = document.createElement('cn-bubble') as CnBubble;
    element.innerHTML = '<p>Test content</p>';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-bubble');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const slot = element.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();

    document.body.removeChild(element);
  });

  it('should not have reply attribute by default', async () => {
    const element = document.createElement('cn-bubble') as CnBubble;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-bubble');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.hasAttribute('reply')).toBe(false);
    expect(element.reply).toBe(false);

    document.body.removeChild(element);
  });

  it('should reflect reply property as attribute', async () => {
    const element = document.createElement('cn-bubble') as CnBubble;
    element.reply = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-bubble');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.getAttribute('reply')).toBe('');
    expect(element.reply).toBe(true);

    document.body.removeChild(element);
  });

  it('should set reply attribute when set to true', async () => {
    const element = document.createElement('cn-bubble') as CnBubble;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-bubble');
    await new Promise((resolve) => setTimeout(resolve, 0));

    element.reply = true;
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(element.hasAttribute('reply')).toBe(true);

    document.body.removeChild(element);
  });

  it('should remove reply attribute when set to false', async () => {
    const element = document.createElement('cn-bubble') as CnBubble;
    element.reply = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-bubble');
    await new Promise((resolve) => setTimeout(resolve, 0));

    element.reply = false;
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(element.hasAttribute('reply')).toBe(false);

    document.body.removeChild(element);
  });

  it('should set role attribute to article', async () => {
    const element = document.createElement('cn-bubble') as CnBubble;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-bubble');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.getAttribute('role')).toBe('article');

    document.body.removeChild(element);
  });

  it('should handle boolean reply attribute from HTML', async () => {
    const element = document.createElement('cn-bubble') as CnBubble;
    element.setAttribute('reply', '');
    document.body.appendChild(element);

    await customElements.whenDefined('cn-bubble');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.reply).toBe(true);

    document.body.removeChild(element);
  });
});
