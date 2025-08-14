import { describe, expect, it, vi } from 'vitest';
import './cn-avatar-button.js';
import type { CnAvatarButton } from './cn-avatar-button.js';

describe('CnAvatarButton Browser Tests', () => {
  it('should render button with correct styles', async () => {
    const element = document.createElement(
      'cn-avatar-button',
    ) as CnAvatarButton;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const computedStyle = window.getComputedStyle(element);
    expect(computedStyle.display).toBe('inline-block');
    expect(computedStyle.position).toBe('relative');
    expect(computedStyle.cursor).toBe('pointer');
    expect(computedStyle.userSelect).toBe('none');

    document.body.removeChild(element);
  });

  it('should handle image loading with correct styles', async () => {
    const element = document.createElement(
      'cn-avatar-button',
    ) as CnAvatarButton;
    element.src =
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjRkYwMDAwIi8+Cjwvc3ZnPgo=';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar-button');
    await new Promise((resolve) => setTimeout(resolve, 100));

    const img = element.shadowRoot?.querySelector('img') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.src).toContain('data:image/svg+xml');

    const computedStyle = window.getComputedStyle(img);
    expect(computedStyle.borderRadius).toBe('50%');
    expect(computedStyle.objectFit).toBe('cover');

    document.body.removeChild(element);
  });

  it('should display placeholder icon with correct styling', async () => {
    const element = document.createElement(
      'cn-avatar-button',
    ) as CnAvatarButton;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar-button');
    await new Promise((resolve) => setTimeout(resolve, 100));

    const placeholderIcon = element.shadowRoot?.querySelector(
      'cn-icon.placeholder',
    ) as HTMLElement;
    expect(placeholderIcon).toBeTruthy();
    expect(placeholderIcon.getAttribute('noun')).toBe('avatar');

    const computedStyle = window.getComputedStyle(placeholderIcon);
    expect(computedStyle.position).toBe('absolute');
    expect(computedStyle.zIndex).toBe('2');

    document.body.removeChild(element);
  });

  it('should display action icon with correct styling', async () => {
    const element = document.createElement(
      'cn-avatar-button',
    ) as CnAvatarButton;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar-button');
    await new Promise((resolve) => setTimeout(resolve, 100));

    const actionIcon = element.shadowRoot?.querySelector(
      'cn-icon.action',
    ) as HTMLElement;
    expect(actionIcon).toBeTruthy();
    expect(actionIcon.getAttribute('noun')).toBe('open-down');
    expect(actionIcon.hasAttribute('small')).toBe(true);

    const computedStyle = window.getComputedStyle(actionIcon);
    expect(computedStyle.position).toBe('absolute');

    document.body.removeChild(element);
  });

  it('should handle hover state changes', async () => {
    const element = document.createElement(
      'cn-avatar-button',
    ) as CnAvatarButton;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const computedStyle = window.getComputedStyle(element);
    expect(computedStyle.cursor).toBe('pointer');
    expect(computedStyle.userSelect).toBe('none');

    document.body.removeChild(element);
  });

  it('should properly position popover on click', async () => {
    const element = document.createElement(
      'cn-avatar-button',
    ) as CnAvatarButton;
    element.popovertarget = 'test-popover';

    // Create a mock popover element
    const popover = document.createElement('div');
    popover.id = 'test-popover';
    popover.togglePopover = vi.fn();

    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '100px';
    container.style.left = '200px';
    container.appendChild(element);
    container.appendChild(popover);
    document.body.appendChild(container);

    await customElements.whenDefined('cn-avatar-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Simulate click event
    element.click();

    // Wait for click handler to execute
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(popover.togglePopover).toHaveBeenCalled();
    expect(popover.style.top).toBeTruthy();
    expect(popover.style.left).toBeTruthy();
    expect(popover.style.right).toBe('auto');
    expect(popover.style.bottom).toBe('auto');

    document.body.removeChild(container);
  });

  it('should maintain proper display and positioning', async () => {
    const element = document.createElement(
      'cn-avatar-button',
    ) as CnAvatarButton;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const computedStyle = window.getComputedStyle(element);

    // Check basic display properties
    expect(computedStyle.display).toBe('inline-block');
    expect(computedStyle.position).toBe('relative');

    document.body.removeChild(element);
  });

  it('should handle transitions smoothly', async () => {
    const element = document.createElement(
      'cn-avatar-button',
    ) as CnAvatarButton;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const computedStyle = window.getComputedStyle(element);
    expect(computedStyle.transition).toContain('background-color');
    expect(computedStyle.transition).toContain('0.3s');
    expect(computedStyle.transition).toContain('ease-in-out');

    document.body.removeChild(element);
  });
});
