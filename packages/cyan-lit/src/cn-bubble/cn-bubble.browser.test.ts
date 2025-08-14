import { describe, expect, it } from 'vitest';
import './cn-bubble.js';
import type { CnBubble } from './cn-bubble.js';

describe('CnBubble Browser Tests', () => {
  it('should render with correct default styles', async () => {
    const element = document.createElement('cn-bubble') as CnBubble;
    element.innerHTML = '<p>Test message</p>';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-bubble');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const computedStyle = window.getComputedStyle(element);
    expect(computedStyle.display).toBe('block');
    expect(computedStyle.position).toBe('relative');
    expect(computedStyle.boxSizing).toBe('border-box');

    document.body.removeChild(element);
  });

  it('should apply different styles for reply bubbles', async () => {
    const normalBubble = document.createElement('cn-bubble') as CnBubble;
    const replyBubble = document.createElement('cn-bubble') as CnBubble;

    normalBubble.innerHTML = '<p>Normal message</p>';
    replyBubble.innerHTML = '<p>Reply message</p>';
    replyBubble.reply = true;

    document.body.appendChild(normalBubble);
    document.body.appendChild(replyBubble);

    await customElements.whenDefined('cn-bubble');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(normalBubble.hasAttribute('reply')).toBe(false);
    expect(replyBubble.hasAttribute('reply')).toBe(true);

    document.body.removeChild(normalBubble);
    document.body.removeChild(replyBubble);
  });

  it('should render slot content correctly', async () => {
    const element = document.createElement('cn-bubble') as CnBubble;
    element.innerHTML = '<p class="test-content">Hello World</p>';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-bubble');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const slot = element.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();

    // Check that slotted content is visible
    const slottedContent = element.querySelector(
      '.test-content',
    ) as HTMLElement;
    expect(slottedContent).toBeTruthy();
    expect(slottedContent.textContent).toBe('Hello World');

    document.body.removeChild(element);
  });

  it('should handle complex content with toolbars', async () => {
    const element = document.createElement('cn-bubble') as CnBubble;
    element.innerHTML = `
      <div class="toolbar">
        <p>Toolbar content</p>
      </div>
      <p>Main message content</p>
      <div class="toolbar">
        <button>Action</button>
      </div>
    `;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-bubble');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const toolbars = element.querySelectorAll('.toolbar');
    expect(toolbars.length).toBe(2);

    const mainContent = element.querySelector(
      'p:not(.toolbar p)',
    ) as HTMLElement;
    expect(mainContent?.textContent?.trim()).toBe('Main message content');

    document.body.removeChild(element);
  });

  it('should maintain accessibility with role attribute', async () => {
    const element = document.createElement('cn-bubble') as CnBubble;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-bubble');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.getAttribute('role')).toBe('article');

    document.body.removeChild(element);
  });

  it('should toggle reply state correctly', async () => {
    const element = document.createElement('cn-bubble') as CnBubble;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-bubble');
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Initially not a reply
    expect(element.reply).toBe(false);
    expect(element.hasAttribute('reply')).toBe(false);

    // Set to reply
    element.reply = true;
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(element.reply).toBe(true);
    expect(element.hasAttribute('reply')).toBe(true);

    // Set back to normal
    element.reply = false;
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(element.reply).toBe(false);
    expect(element.hasAttribute('reply')).toBe(false);

    document.body.removeChild(element);
  });

  it('should handle empty content gracefully', async () => {
    const element = document.createElement('cn-bubble') as CnBubble;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-bubble');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const slot = element.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();

    // Element should still render even without content
    const computedStyle = window.getComputedStyle(element);
    expect(computedStyle.display).toBe('block');

    document.body.removeChild(element);
  });
});
