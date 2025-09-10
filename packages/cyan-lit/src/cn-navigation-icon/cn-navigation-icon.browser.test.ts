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

  it('should properly update visual state when label changes from empty to filled (reactivity fix)', async () => {
    const element = document.createElement(
      'cn-navigation-icon',
    ) as CnNavigationIcon;
    element.noun = 'settings';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-navigation-icon');
    await element.updateComplete;

    // Initially should not have label attribute since default is empty string
    // But Lit reflects properties, so empty string creates empty attribute
    expect(element.getAttribute('label')).toBe('');
    
    // Verify initial state - no label element should exist
    let labelElement = element.shadowRoot?.querySelector('.navigation-icon-label');
    expect(labelElement).toBeFalsy();

    // Set to empty string - should still not show label
    element.label = '';
    await element.updateComplete;
    expect(element.getAttribute('label')).toBe('');
    labelElement = element.shadowRoot?.querySelector('.navigation-icon-label');
    expect(labelElement).toBeFalsy();

    // Set to whitespace - should still not show label visually
    element.label = '   ';
    await element.updateComplete;
    expect(element.getAttribute('label')).toBe('   ');
    labelElement = element.shadowRoot?.querySelector('.navigation-icon-label');
    expect(labelElement).toBeFalsy();

    // Set to actual value - should now show label
    element.label = 'Settings';
    await element.updateComplete;
    expect(element.getAttribute('label')).toBe('Settings');
    labelElement = element.shadowRoot?.querySelector('.navigation-icon-label');
    expect(labelElement).toBeTruthy();
    expect(labelElement?.textContent).toBe('Settings');

    // Verify the CSS styling changes based on [label] attribute
    const icon = element.shadowRoot?.querySelector('cn-icon');
    expect(icon).toBeTruthy();
    expect(icon?.hasAttribute('small')).toBe(true);

    // Change back to empty - should hide label again
    element.label = '';
    await element.updateComplete;
    labelElement = element.shadowRoot?.querySelector('.navigation-icon-label');
    expect(labelElement).toBeFalsy();

    document.body.removeChild(element);
  });

  it('should handle attribute changes via setAttribute (DOM manipulation scenario)', async () => {
    const element = document.createElement(
      'cn-navigation-icon',
    ) as CnNavigationIcon;
    element.noun = 'home';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-navigation-icon');
    await element.updateComplete;

    // Initially no label
    let labelElement = element.shadowRoot?.querySelector('.navigation-icon-label');
    expect(labelElement).toBeFalsy();

    // Set via setAttribute (simulates external frameworks)
    element.setAttribute('label', 'Home Page');
    await element.updateComplete;
    labelElement = element.shadowRoot?.querySelector('.navigation-icon-label');
    expect(labelElement).toBeTruthy();
    expect(labelElement?.textContent).toBe('Home Page');

    // Change via setAttribute
    element.setAttribute('label', 'Updated Label');
    await element.updateComplete;
    labelElement = element.shadowRoot?.querySelector('.navigation-icon-label');
    expect(labelElement).toBeTruthy();
    expect(labelElement?.textContent).toBe('Updated Label');

    // Remove attribute entirely
    element.removeAttribute('label');
    await element.updateComplete;
    labelElement = element.shadowRoot?.querySelector('.navigation-icon-label');
    expect(labelElement).toBeFalsy();

    document.body.removeChild(element);
  });
});
