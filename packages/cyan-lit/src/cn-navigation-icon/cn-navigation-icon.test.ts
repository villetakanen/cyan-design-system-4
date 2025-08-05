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
});

test('CnNavigationIcon - should reflect properties as attributes', async () => {
  const element = new CnNavigationIcon();
  document.body.appendChild(element);

  await customElements.whenDefined('cn-navigation-icon');
  await new Promise((resolve) => setTimeout(resolve, 0));

  element.noun = 'home';
  element.label = 'Home';
  element.active = true;

  // Wait for the next update cycle to ensure attributes are reflected
  await element.updateComplete;

  expect(element.getAttribute('noun')).toBe('home');
  expect(element.getAttribute('label')).toBe('Home');
  expect(element.hasAttribute('active')).toBe(true);

  document.body.removeChild(element);
});
