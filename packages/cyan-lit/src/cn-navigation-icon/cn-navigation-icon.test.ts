import { expect, test } from 'vitest';
import { CnNavigationIcon } from './cn-navigation-icon.js';

test('CnNavigationIcon - should be defined', () => {
  expect(customElements.get('cn-navigation-icon')).toBe(CnNavigationIcon);
});

test('CnNavigationIcon - should render with default properties', () => {
  const element = new CnNavigationIcon();
  expect(element.noun).toBe('');
  expect(element.label).toBe('');
  expect(element.active).toBe(false);
  expect(element.notification).toBe('');
});

test('CnNavigationIcon - should reflect properties as attributes', async () => {
  const element = new CnNavigationIcon();
  document.body.appendChild(element);

  await customElements.whenDefined('cn-navigation-icon');
  await new Promise((resolve) => setTimeout(resolve, 0));

  element.noun = 'home';
  element.label = 'Home';
  element.active = true;
  element.notification = '5';

  // Wait for the next update cycle to ensure attributes are reflected
  await element.updateComplete;

  expect(element.getAttribute('noun')).toBe('home');
  expect(element.getAttribute('label')).toBe('Home');
  expect(element.hasAttribute('active')).toBe(true);
  expect(element.getAttribute('notification')).toBe('5');

  document.body.removeChild(element);
});

test('CnNavigationIcon - should handle notification property', async () => {
  const element = new CnNavigationIcon();
  document.body.appendChild(element);

  await customElements.whenDefined('cn-navigation-icon');
  await new Promise((resolve) => setTimeout(resolve, 0));

  // Test with notification
  element.notification = '3';
  await element.updateComplete;
  let pill = element.shadowRoot?.querySelector('.notification-pill');
  expect(pill).toBeTruthy();
  expect(pill?.textContent).toBe('3');

  // Test without notification
  element.notification = '';
  await element.updateComplete;
  pill = element.shadowRoot?.querySelector('.notification-pill');
  expect(pill).toBeFalsy();

  // Test with whitespace-only notification
  element.notification = '   ';
  await element.updateComplete;
  pill = element.shadowRoot?.querySelector('.notification-pill');
  expect(pill).toBeFalsy();

  document.body.removeChild(element);
});

test('CnNavigationIcon - should react to label attribute changes (reactivity bug fix)', async () => {
  const element = new CnNavigationIcon();
  element.noun = 'home';
  document.body.appendChild(element);

  await customElements.whenDefined('cn-navigation-icon');
  await element.updateComplete;

  // Initially no label should be rendered
  let labelElement = element.shadowRoot?.querySelector(
    '.navigation-icon-label',
  );
  expect(labelElement).toBeFalsy();

  // Set label to empty string - should still not render label
  element.label = '';
  await element.updateComplete;
  labelElement = element.shadowRoot?.querySelector('.navigation-icon-label');
  expect(labelElement).toBeFalsy();

  // Set label to whitespace only - should still not render label
  element.label = '   ';
  await element.updateComplete;
  labelElement = element.shadowRoot?.querySelector('.navigation-icon-label');
  expect(labelElement).toBeFalsy();

  // Set label to actual value - should now render label
  element.label = 'Home';
  await element.updateComplete;
  labelElement = element.shadowRoot?.querySelector('.navigation-icon-label');
  expect(labelElement).toBeTruthy();
  expect(labelElement?.textContent).toBe('Home');

  // Change label to different value - should update
  element.label = 'Updated Home';
  await element.updateComplete;
  labelElement = element.shadowRoot?.querySelector('.navigation-icon-label');
  expect(labelElement).toBeTruthy();
  expect(labelElement?.textContent).toBe('Updated Home');

  // Set label back to empty - should remove label
  element.label = '';
  await element.updateComplete;
  labelElement = element.shadowRoot?.querySelector('.navigation-icon-label');
  expect(labelElement).toBeFalsy();

  document.body.removeChild(element);
});

test('CnNavigationIcon - should handle null/undefined label values (Svelte scenario)', async () => {
  const element = new CnNavigationIcon();
  element.noun = 'profile';
  document.body.appendChild(element);

  await customElements.whenDefined('cn-navigation-icon');
  await element.updateComplete;

  // Simulate initial null value from Svelte store
  element.label = null as unknown as string;
  await element.updateComplete;
  let labelElement = element.shadowRoot?.querySelector(
    '.navigation-icon-label',
  );
  expect(labelElement).toBeFalsy();

  // Simulate undefined value
  element.label = undefined as unknown as string;
  await element.updateComplete;
  labelElement = element.shadowRoot?.querySelector('.navigation-icon-label');
  expect(labelElement).toBeFalsy();

  // Simulate store being populated with actual value
  element.label = 'Profile';
  await element.updateComplete;
  labelElement = element.shadowRoot?.querySelector('.navigation-icon-label');
  expect(labelElement).toBeTruthy();
  expect(labelElement?.textContent).toBe('Profile');

  // Simulate store being cleared (set to empty string)
  element.label = '';
  await element.updateComplete;
  labelElement = element.shadowRoot?.querySelector('.navigation-icon-label');
  expect(labelElement).toBeFalsy();

  document.body.removeChild(element);
});
