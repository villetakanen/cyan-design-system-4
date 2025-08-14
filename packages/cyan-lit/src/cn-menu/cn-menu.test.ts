import { describe, expect, it } from 'vitest';
import './cn-menu.js';
import type { CnMenu } from './cn-menu.js';

describe('CnMenu', () => {
  it('should be defined', () => {
    const element = document.createElement('cn-menu');
    expect(element).toBeInstanceOf(HTMLElement);
  });

  it('should render with default properties', async () => {
    const element = document.createElement('cn-menu') as CnMenu;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-menu');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const button = element.shadowRoot?.querySelector('button');
    const menuContent = element.shadowRoot?.querySelector('.cn-menu-content');
    const icon = element.shadowRoot?.querySelector('cn-icon');

    expect(button).toBeTruthy();
    expect(menuContent).toBeTruthy();
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute('noun')).toBe('kebab');
    expect(button?.getAttribute('aria-expanded')).toBe('false');
    expect(element.expanded).toBe(false);

    document.body.removeChild(element);
  });

  it('should render inline dots icon when inline property is true', async () => {
    const element = document.createElement('cn-menu') as CnMenu;
    element.inline = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-menu');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const icon = element.shadowRoot?.querySelector('cn-icon');
    expect(icon?.getAttribute('noun')).toBe('dots');

    document.body.removeChild(element);
  });

  it('should toggle expanded state when button is clicked', async () => {
    const element = document.createElement('cn-menu') as CnMenu;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-menu');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const button = element.shadowRoot?.querySelector(
      'button',
    ) as HTMLButtonElement;

    expect(element.expanded).toBe(false);

    button.click();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.expanded).toBe(true);
    expect(button.getAttribute('aria-expanded')).toBe('true');

    document.body.removeChild(element);
  });

  it('should not toggle when disabled', async () => {
    const element = document.createElement('cn-menu') as CnMenu;
    element.disabled = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-menu');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const button = element.shadowRoot?.querySelector(
      'button',
    ) as HTMLButtonElement;

    expect(element.expanded).toBe(false);

    button.click();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.expanded).toBe(false);

    document.body.removeChild(element);
  });

  it('should dispatch menu-toggled event when expanded state changes', async () => {
    const element = document.createElement('cn-menu') as CnMenu;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-menu');
    await new Promise((resolve) => setTimeout(resolve, 0));

    let eventFired = false;
    let eventDetail: { expanded: boolean } | null = null;

    element.addEventListener('menu-toggled', (event: Event) => {
      eventFired = true;
      eventDetail = (event as CustomEvent).detail;
    });

    const button = element.shadowRoot?.querySelector(
      'button',
    ) as HTMLButtonElement;
    button.click();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(eventFired).toBe(true);
    expect(eventDetail).toEqual({ expanded: true });

    document.body.removeChild(element);
  });

  it('should show menu content when expanded', async () => {
    const element = document.createElement('cn-menu') as CnMenu;
    element.expanded = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-menu');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const menuContent = element.shadowRoot?.querySelector('.cn-menu-content');
    expect(menuContent?.classList.contains('show')).toBe(true);

    document.body.removeChild(element);
  });

  it('should reflect properties as attributes', async () => {
    const element = document.createElement('cn-menu') as CnMenu;
    element.expanded = true;
    element.inline = true;
    element.disabled = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-menu');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.getAttribute('expanded')).toBe('');
    expect(element.getAttribute('inline')).toBe('');
    expect(element.getAttribute('disabled')).toBe('');

    document.body.removeChild(element);
  });

  it('should render slotted content in menu', async () => {
    const element = document.createElement('cn-menu') as CnMenu;
    element.innerHTML =
      '<div slot="">Menu Item 1</div><div slot="">Menu Item 2</div>';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-menu');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const slot = element.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();

    document.body.removeChild(element);
  });
});
