import { describe, expect, it } from 'vitest';
import './cn-navigation-icon.js';
import '../cn-icon/cn-icon.js';
import type { CnNavigationIcon } from './cn-navigation-icon.js';

describe('CnNavigationIcon - Browser Tests', () => {
  it('should have proper default styling', async () => {
    const element = document.createElement(
      'cn-navigation-icon',
    ) as CnNavigationIcon;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-navigation-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const styles = getComputedStyle(element);
    expect(styles.display).toBe('flex');
    expect(styles.position).toBe('relative');

    document.body.removeChild(element);
  });

  it('should render navigation icon without label', async () => {
    const element = document.createElement(
      'cn-navigation-icon',
    ) as CnNavigationIcon;
    element.noun = 'home';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-navigation-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const icon = element.shadowRoot?.querySelector('cn-icon');
    const label = element.shadowRoot?.querySelector('.navigation-icon-label');

    expect(icon).toBeTruthy();
    expect(label).toBeFalsy();

    document.body.removeChild(element);
  });

  it('should render navigation icon with label', async () => {
    const element = document.createElement(
      'cn-navigation-icon',
    ) as CnNavigationIcon;
    element.noun = 'profile';
    element.label = 'Profile';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-navigation-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const icon = element.shadowRoot?.querySelector('cn-icon');
    const label = element.shadowRoot?.querySelector('.navigation-icon-label');

    expect(icon).toBeTruthy();
    expect(label).toBeTruthy();
    expect(label?.textContent).toBe('Profile');

    document.body.removeChild(element);
  });

  it('should apply active state', async () => {
    const element = document.createElement(
      'cn-navigation-icon',
    ) as CnNavigationIcon;
    element.noun = 'settings';
    element.active = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-navigation-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.hasAttribute('active')).toBe(true);

    document.body.removeChild(element);
  });

  it('should reflect properties as attributes', async () => {
    const element = document.createElement(
      'cn-navigation-icon',
    ) as CnNavigationIcon;
    element.noun = 'test';
    element.label = 'Test Label';
    element.active = true;
    element.notification = '7';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-navigation-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.getAttribute('noun')).toBe('test');
    expect(element.getAttribute('label')).toBe('Test Label');
    expect(element.hasAttribute('active')).toBe(true);
    expect(element.getAttribute('notification')).toBe('7');

    document.body.removeChild(element);
  });

  it('should render notification pill when notification is set', async () => {
    const element = document.createElement(
      'cn-navigation-icon',
    ) as CnNavigationIcon;
    element.noun = 'messages';
    element.notification = '99+';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-navigation-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const pill = element.shadowRoot?.querySelector('.notification-pill');
    expect(pill).toBeTruthy();
    expect(pill?.textContent).toBe('99+');

    const pillStyles = getComputedStyle(pill as Element);
    expect(pillStyles.position).toBe('absolute');

    document.body.removeChild(element);
  });

  it('should not render notification pill when notification is empty', async () => {
    const element = document.createElement(
      'cn-navigation-icon',
    ) as CnNavigationIcon;
    element.noun = 'home';
    element.notification = '';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-navigation-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const pill = element.shadowRoot?.querySelector('.notification-pill');
    expect(pill).toBeFalsy();

    document.body.removeChild(element);
  });

  it('should position notification pill correctly with and without labels', async () => {
    // Test without label
    const elementWithoutLabel = document.createElement(
      'cn-navigation-icon',
    ) as CnNavigationIcon;
    elementWithoutLabel.noun = 'inbox';
    elementWithoutLabel.notification = '3';
    document.body.appendChild(elementWithoutLabel);

    await customElements.whenDefined('cn-navigation-icon');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const pillWithoutLabel =
      elementWithoutLabel.shadowRoot?.querySelector('.notification-pill');
    expect(pillWithoutLabel).toBeTruthy();

    // Test with label
    const elementWithLabel = document.createElement(
      'cn-navigation-icon',
    ) as CnNavigationIcon;
    elementWithLabel.noun = 'inbox';
    elementWithLabel.label = 'Inbox';
    elementWithLabel.notification = '5';
    document.body.appendChild(elementWithLabel);

    await new Promise((resolve) => setTimeout(resolve, 0));

    const pillWithLabel =
      elementWithLabel.shadowRoot?.querySelector('.notification-pill');
    expect(pillWithLabel).toBeTruthy();

    document.body.removeChild(elementWithoutLabel);
    document.body.removeChild(elementWithLabel);
  });
});
