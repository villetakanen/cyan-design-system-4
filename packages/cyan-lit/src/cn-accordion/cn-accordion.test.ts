import { describe, expect, it, vi } from 'vitest';
import { CnAccordion } from './cn-accordion';
import './cn-accordion.js';

describe('CnAccordion', () => {
  it('should be defined', () => {
    const element = document.createElement('cn-accordion');
    expect(element).toBeInstanceOf(CnAccordion);
  });

  it('should render with a label', async () => {
    const element = document.createElement('cn-accordion') as CnAccordion;
    element.label = 'Test';
    document.body.appendChild(element);
    await element.updateComplete;
    expect(element.shadowRoot?.textContent).toContain('Test');
    element.remove();
  });

  it('should be closed by default', () => {
    const element = document.createElement('cn-accordion') as CnAccordion;
    expect(element.expanded).toBe(false);
  });

  it('should toggle open and closed', async () => {
    const element = document.createElement('cn-accordion') as CnAccordion;
    document.body.appendChild(element);
    await element.updateComplete;
    const header = element.shadowRoot?.querySelector('.header') as HTMLElement;
    header.click();
    await element.updateComplete;
    expect(element.expanded).toBe(true);
    header.click();
    await element.updateComplete;
    expect(element.expanded).toBe(false);
    element.remove();
  });

  it('should dispatch an event on toggle', async () => {
    const element = document.createElement('cn-accordion') as CnAccordion;
    const spy = vi.fn();
    element.addEventListener('cn-accordion-toggle', spy);
    document.body.appendChild(element);
    await element.updateComplete;
    const header = element.shadowRoot?.querySelector('.header') as HTMLElement;
    header.click();
    await element.updateComplete;
    expect(spy).toHaveBeenCalled();
    const event = spy.mock.calls[0][0] as CustomEvent;
    expect(event.detail.expanded).toBe(true);
    element.remove();
  });

  it('should not toggle when disabled', async () => {
    const element = document.createElement('cn-accordion') as CnAccordion;
    element.disabled = true;
    document.body.appendChild(element);
    await element.updateComplete;
    const header = element.shadowRoot?.querySelector('.header') as HTMLElement;
    header.click();
    await element.updateComplete;
    expect(element.expanded).toBe(false);
    element.remove();
  });

  it('should toggle when Enter key is pressed', async () => {
    const element = document.createElement('cn-accordion') as CnAccordion;
    document.body.appendChild(element);
    await element.updateComplete;
    const header = element.shadowRoot?.querySelector('.header') as HTMLElement;
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    header.dispatchEvent(event);
    await element.updateComplete;
    expect(element.expanded).toBe(true);
    element.remove();
  });

  it('should toggle when Space key is pressed', async () => {
    const element = document.createElement('cn-accordion') as CnAccordion;
    document.body.appendChild(element);
    await element.updateComplete;
    const header = element.shadowRoot?.querySelector('.header') as HTMLElement;
    const event = new KeyboardEvent('keydown', { key: ' ' });
    header.dispatchEvent(event);
    await element.updateComplete;
    expect(element.expanded).toBe(true);
    element.remove();
  });

  it('should not toggle with keyboard when disabled', async () => {
    const element = document.createElement('cn-accordion') as CnAccordion;
    element.disabled = true;
    document.body.appendChild(element);
    await element.updateComplete;
    const header = element.shadowRoot?.querySelector('.header') as HTMLElement;
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    header.dispatchEvent(event);
    await element.updateComplete;
    expect(element.expanded).toBe(false);
    element.remove();
  });

  it('should have tabindex="0" on header', async () => {
    const element = document.createElement('cn-accordion') as CnAccordion;
    document.body.appendChild(element);
    await element.updateComplete;
    const header = element.shadowRoot?.querySelector('.header') as HTMLElement;
    expect(header.getAttribute('tabindex')).toBe('0');
    element.remove();
  });

  it('should display noun icon when noun is provided', async () => {
    const element = document.createElement('cn-accordion') as CnAccordion;
    element.noun = 'card';
    document.body.appendChild(element);
    await element.updateComplete;
    const icon = element.shadowRoot?.querySelector(
      '.header-icon',
    ) as HTMLElement;
    expect(icon).toBeTruthy();
    expect(icon.getAttribute('noun')).toBe('card');
    element.remove();
  });

  it('should not display noun icon when noun is not provided', async () => {
    const element = document.createElement('cn-accordion') as CnAccordion;
    document.body.appendChild(element);
    await element.updateComplete;
    const icon = element.shadowRoot?.querySelector(
      '.header-icon',
    ) as HTMLElement;
    expect(icon).toBeFalsy();
    element.remove();
  });
});
