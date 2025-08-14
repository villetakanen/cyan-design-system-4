import { describe, expect, it, vi } from 'vitest';
import './cn-avatar-button.js';
import type { CnAvatarButton } from './cn-avatar-button.js';

describe('CnAvatarButton', () => {
  it('should be defined', () => {
    const element = document.createElement('cn-avatar-button');
    expect(element).toBeInstanceOf(HTMLElement);
  });

  it('should render placeholder icon when no src is provided', async () => {
    const element = document.createElement(
      'cn-avatar-button',
    ) as CnAvatarButton;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const icon = element.shadowRoot?.querySelector('cn-icon.placeholder');
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute('noun')).toBe('avatar');

    document.body.removeChild(element);
  });

  it('should render image when src is provided', async () => {
    const element = document.createElement(
      'cn-avatar-button',
    ) as CnAvatarButton;
    element.src = '/test/avatar.jpg';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const img = element.shadowRoot?.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe('/test/avatar.jpg');
    expect(img?.getAttribute('alt')).toBe('Avatar');

    document.body.removeChild(element);
  });

  it('should always render action icon', async () => {
    const element = document.createElement(
      'cn-avatar-button',
    ) as CnAvatarButton;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const actionIcon = element.shadowRoot?.querySelector('cn-icon.action');
    expect(actionIcon).toBeTruthy();
    expect(actionIcon?.getAttribute('noun')).toBe('open-down');
    expect(actionIcon?.hasAttribute('small')).toBe(true);

    document.body.removeChild(element);
  });

  it('should set role and aria-label attributes', async () => {
    const element = document.createElement(
      'cn-avatar-button',
    ) as CnAvatarButton;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.getAttribute('role')).toBe('button');
    expect(element.ariaLabel).toBe('Avatar');

    document.body.removeChild(element);
  });

  it('should reflect src and popovertarget properties as attributes', async () => {
    const element = document.createElement(
      'cn-avatar-button',
    ) as CnAvatarButton;
    element.src = '/test.jpg';
    element.popovertarget = 'test-popover';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.getAttribute('src')).toBe('/test.jpg');
    expect(element.getAttribute('popovertarget')).toBe('test-popover');

    document.body.removeChild(element);
  });

  it('should handle click with popover target', async () => {
    const element = document.createElement(
      'cn-avatar-button',
    ) as CnAvatarButton;
    element.popovertarget = 'test-popover';

    // Create a mock popover element
    const popover = document.createElement('div');
    popover.id = 'test-popover';
    popover.togglePopover = vi.fn();

    const container = document.createElement('div');
    container.appendChild(element);
    container.appendChild(popover);
    document.body.appendChild(container);

    await customElements.whenDefined('cn-avatar-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Mock getBoundingClientRect
    const mockRect = { top: 100, left: 200, bottom: 150, right: 300 };
    element.getBoundingClientRect = vi.fn().mockReturnValue(mockRect);

    // Trigger click
    const clickHandler = element.onclick;
    if (clickHandler) {
      clickHandler.call(element, new MouseEvent('click'));
    }

    expect(popover.togglePopover).toHaveBeenCalled();
    expect(popover.style.top).toBe('112px'); // 100 + 12
    expect(popover.style.left).toBe('212px'); // 200 + 12

    document.body.removeChild(container);
  });

  it('should handle click without popover target', async () => {
    const element = document.createElement(
      'cn-avatar-button',
    ) as CnAvatarButton;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    // This should not throw an error
    const clickHandler = element.onclick;
    if (clickHandler) {
      expect(() =>
        clickHandler.call(element, new MouseEvent('click')),
      ).not.toThrow();
    }

    document.body.removeChild(element);
  });

  it('should handle click when popover target is not found', async () => {
    const element = document.createElement(
      'cn-avatar-button',
    ) as CnAvatarButton;
    element.popovertarget = 'non-existent-popover';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    // This should not throw an error
    const clickHandler = element.onclick;
    if (clickHandler) {
      expect(() =>
        clickHandler.call(element, new MouseEvent('click')),
      ).not.toThrow();
    }

    document.body.removeChild(element);
  });
});
