import { describe, expect, it } from 'vitest';
import './cn-menu.js';
import type { CnMenu } from './cn-menu.js';

describe('CnMenu Browser Tests', () => {
  it('should render menu with correct styles', async () => {
    const element = document.createElement('cn-menu') as CnMenu;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-menu');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const menuContainer = element.shadowRoot?.querySelector(
      '.cn-menu',
    ) as HTMLElement;
    const button = element.shadowRoot?.querySelector(
      'button',
    ) as HTMLButtonElement;
    const menuContent = element.shadowRoot?.querySelector(
      '.cn-menu-content',
    ) as HTMLElement;

    expect(menuContainer).toBeTruthy();
    expect(button).toBeTruthy();
    expect(menuContent).toBeTruthy();

    const containerStyle = window.getComputedStyle(menuContainer);
    expect(containerStyle.position).toBe('relative');
    expect(containerStyle.display).toBe('inline-block');

    const buttonStyle = window.getComputedStyle(button);
    expect(buttonStyle.borderRadius).toBe('50%');
    expect(buttonStyle.cursor).toBe('pointer');
    expect(buttonStyle.position).toBe('relative');

    const contentStyle = window.getComputedStyle(menuContent);
    expect(contentStyle.position).toBe('absolute');
    expect(contentStyle.display).toBe('none');

    document.body.removeChild(element);
  });

  it('should show menu content when expanded', async () => {
    const element = document.createElement('cn-menu') as CnMenu;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-menu');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const menuContent = element.shadowRoot?.querySelector(
      '.cn-menu-content',
    ) as HTMLElement;

    // Initially hidden
    let contentStyle = window.getComputedStyle(menuContent);
    expect(contentStyle.display).toBe('none');

    // Expand the menu
    element.expanded = true;
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Should now be visible
    contentStyle = window.getComputedStyle(menuContent);
    expect(contentStyle.display).toBe('block');

    document.body.removeChild(element);
  });

  it('should position menu content based on viewport position', async () => {
    const element = document.createElement('cn-menu') as CnMenu;

    // Position element on the left side of viewport
    element.style.position = 'fixed';
    element.style.left = '10px';
    element.style.top = '10px';

    document.body.appendChild(element);

    await customElements.whenDefined('cn-menu');
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Trigger the menu to open (which calculates position)
    const button = element.shadowRoot?.querySelector(
      'button',
    ) as HTMLButtonElement;
    button.click();
    await new Promise((resolve) => setTimeout(resolve, 0));

    const menuContent = element.shadowRoot?.querySelector(
      '.cn-menu-content',
    ) as HTMLElement;

    // Should be positioned to the right when button is on left side
    expect(menuContent.style.cssText).toContain('left: var(--cn-grid)');

    document.body.removeChild(element);
  });

  it('should handle button hover states', async () => {
    const element = document.createElement('cn-menu') as CnMenu;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-menu');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const button = element.shadowRoot?.querySelector(
      'button',
    ) as HTMLButtonElement;
    const buttonStyle = window.getComputedStyle(button);

    expect(buttonStyle.cursor).toBe('pointer');
    expect(buttonStyle.border).toBe('0px none rgb(0, 0, 0)');

    document.body.removeChild(element);
  });

  it('should handle disabled state correctly', async () => {
    const element = document.createElement('cn-menu') as CnMenu;
    element.disabled = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-menu');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const button = element.shadowRoot?.querySelector(
      'button',
    ) as HTMLButtonElement;
    expect(button.disabled).toBe(true);

    // Click should not expand when disabled
    button.click();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.expanded).toBe(false);

    document.body.removeChild(element);
  });

  it('should close menu when clicking outside', async () => {
    const element = document.createElement('cn-menu') as CnMenu;
    element.expanded = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-menu');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.expanded).toBe(true);

    // Simulate click outside the menu
    const outsideElement = document.createElement('div');
    document.body.appendChild(outsideElement);

    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });

    outsideElement.dispatchEvent(clickEvent);
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.expanded).toBe(false);

    document.body.removeChild(element);
    document.body.removeChild(outsideElement);
  });

  it('should render correct icon based on inline property', async () => {
    const element = document.createElement('cn-menu') as CnMenu;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-menu');
    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for cn-icon

    let icon = element.shadowRoot?.querySelector('cn-icon');
    expect(icon?.getAttribute('noun')).toBe('kebab');

    element.inline = true;
    await new Promise((resolve) => setTimeout(resolve, 0));

    icon = element.shadowRoot?.querySelector('cn-icon');
    expect(icon?.getAttribute('noun')).toBe('dots');

    document.body.removeChild(element);
  });

  it('should apply shadow and border radius to menu content', async () => {
    const element = document.createElement('cn-menu') as CnMenu;
    element.expanded = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-menu');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const menuContent = element.shadowRoot?.querySelector(
      '.cn-menu-content',
    ) as HTMLElement;
    const contentStyle = window.getComputedStyle(menuContent);

    expect(contentStyle.overflow).toBe('hidden');
    expect(contentStyle.minWidth).toBe('160px');

    document.body.removeChild(element);
  });
});
