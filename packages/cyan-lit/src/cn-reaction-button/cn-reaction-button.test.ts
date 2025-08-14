import { describe, expect, it } from 'vitest';
import './cn-reaction-button.js';
import type { CnReactionButton } from './cn-reaction-button.js';

describe('CnReactionButton', () => {
  it('should be defined', () => {
    const element = document.createElement('cn-reaction-button');
    expect(element).toBeInstanceOf(HTMLElement);
  });

  it('renders a button', async () => {
    const element = document.createElement(
      'cn-reaction-button',
    ) as CnReactionButton;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-reaction-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const button = element.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();

    document.body.removeChild(element);
  });

  it('can be checked', async () => {
    const element = document.createElement(
      'cn-reaction-button',
    ) as CnReactionButton;
    element.checked = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-reaction-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.getAttribute('aria-pressed')).to.equal('true');

    document.body.removeChild(element);
  });

  it('can be disabled', async () => {
    const element = document.createElement(
      'cn-reaction-button',
    ) as CnReactionButton;
    element.disabled = true;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-reaction-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.hasAttribute('disabled')).to.be.true;

    document.body.removeChild(element);
  });

  it('shows a count', async () => {
    const element = document.createElement(
      'cn-reaction-button',
    ) as CnReactionButton;
    element.count = 5;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-reaction-button');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const countEl = element.shadowRoot?.querySelector('.count');
    expect(countEl).toBeTruthy();
    if (countEl) {
      expect(countEl.textContent?.trim()).to.equal('5');
    }

    document.body.removeChild(element);
  });
});
