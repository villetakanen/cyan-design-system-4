import { describe, expect, it } from 'vitest';
import './cn-app-bar.js';
import type { CnAppBar } from './cn-app-bar.js';

describe('CnAppBar', () => {
  it('should be defined', () => {
    const element = document.createElement('cn-app-bar');
    expect(element).toBeInstanceOf(HTMLElement);
  });

  it('should render default content', async () => {
    const element = document.createElement('cn-app-bar') as CnAppBar;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-app-bar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const container = element.shadowRoot?.querySelector('.container');
    expect(container).toBeTruthy();

    document.body.removeChild(element);
  });

  it('should display title when set', async () => {
    const element = document.createElement('cn-app-bar') as CnAppBar;
    element.title = 'Test Title';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-app-bar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const title = element.shadowRoot?.querySelector('.title');
    expect(title?.textContent).toBe('Test Title');

    document.body.removeChild(element);
  });

  it('should handle mode changes', async () => {
    const element = document.createElement('cn-app-bar') as CnAppBar;
    element.mode = 'sticky';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-app-bar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.getAttribute('mode')).toBe('sticky');

    document.body.removeChild(element);
  });

  it('should display back button in modal mode', async () => {
    const element = document.createElement('cn-app-bar') as CnAppBar;
    element.mode = 'modal';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-app-bar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const backButton = element.shadowRoot?.querySelector('.back-button');
    expect(backButton).toBeTruthy();

    document.body.removeChild(element);
  });

  it('should display noun icon when noun is set and not in modal mode', async () => {
    const element = document.createElement('cn-app-bar') as CnAppBar;
    element.noun = 'home';
    element.mode = '';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-app-bar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const nounIcon = element.shadowRoot?.querySelector('.noun-icon');
    expect(nounIcon).toBeTruthy();

    document.body.removeChild(element);
  });

  it('should not display noun icon in modal mode', async () => {
    const element = document.createElement('cn-app-bar') as CnAppBar;
    element.noun = 'home';
    element.mode = 'modal';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-app-bar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const nounIcon = element.shadowRoot?.querySelector('.noun-icon');
    expect(nounIcon).toBeFalsy();

    document.body.removeChild(element);
  });
});
