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
