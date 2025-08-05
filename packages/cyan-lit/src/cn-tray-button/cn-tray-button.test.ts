import { expect, test } from 'vitest';
import { CnTrayButton } from './cn-tray-button.js';

test('CnTrayButton - should be defined', () => {
  expect(customElements.get('cn-tray-button')).toBe(CnTrayButton);
});

test('CnTrayButton - should render with default properties', () => {
  const element = new CnTrayButton();
  expect(element.ariaExpanded).toBe('false');
  expect(element.ariaLabel).toBe('Menu');
  expect(element.ariaControls).toBe('#cn-tray');
});

test('CnTrayButton - should toggle aria-expanded state', async () => {
  const element = new CnTrayButton();
  document.body.appendChild(element);

  await customElements.whenDefined('cn-tray-button');
  await element.updateComplete;

  // Initially closed
  expect(element.ariaExpanded).toBe('false');

  // Toggle open
  element.toggleOpen();
  await element.updateComplete;
  expect(element.ariaExpanded).toBe('true');

  // Toggle closed
  element.toggleOpen();
  await element.updateComplete;
  expect(element.ariaExpanded).toBe('false');

  document.body.removeChild(element);
});

test('CnTrayButton - should dispatch change event on toggle', async () => {
  const element = new CnTrayButton();
  document.body.appendChild(element);

  await customElements.whenDefined('cn-tray-button');
  await element.updateComplete;

  let changeEventFired = false;
  let eventDetail = null;

  element.addEventListener('change', (event: Event) => {
    changeEventFired = true;
    eventDetail = (event as CustomEvent).detail;
  });

  element.toggleOpen();
  await element.updateComplete;

  expect(changeEventFired).toBe(true);
  expect(eventDetail).toBe('true');

  document.body.removeChild(element);
});

test('CnTrayButton - should reflect properties as attributes', async () => {
  const element = new CnTrayButton();
  document.body.appendChild(element);

  await customElements.whenDefined('cn-tray-button');
  await element.updateComplete;

  element.ariaExpanded = 'true';
  element.ariaLabel = 'Close Menu';
  element.ariaControls = '#navigation';

  await element.updateComplete;

  expect(element.getAttribute('aria-expanded')).toBe('true');
  expect(element.getAttribute('aria-label')).toBe('Close Menu');
  expect(element.getAttribute('aria-controls')).toBe('#navigation');

  document.body.removeChild(element);
});
