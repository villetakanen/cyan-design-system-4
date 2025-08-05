import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('cn-toggle-button')
export class CnToggleButton extends LitElement {
  @property({ type: String, reflect: true })
  ariaPressed = 'false';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  pressed = false;

  @property({ type: String, reflect: true })
  label = '';

  handleCommand(event: Event) {
    if (this.disabled) return;
    // Handles both mouse clicks and keyboard
    // activate with Enter or Space

    // Keypresses other then Enter and Space should not trigger a command
    if (
      event instanceof KeyboardEvent &&
      event.key !== 'Enter' &&
      event.key !== ' '
    ) {
      return;
    }

    if (this.getAttribute('aria-pressed') === 'true') {
      this.setAttribute('aria-pressed', 'false');
      this.pressed = false;
    } else {
      this.setAttribute('aria-pressed', 'true');
      this.pressed = true;
    }
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    this.addEventListener('click', this.handleCommand);
    this.addEventListener('keydown', this.handleCommand);
    this.setAttribute('aria-pressed', this.pressed ? 'true' : 'false');
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleCommand);
    this.removeEventListener('keydown', this.handleCommand);
  }

  render() {
    return html`<button aria-pressed="${this.pressed}">${this.label}</button>`;
  }

  static styles = css`
    :host {
      display: contents;
    }
    :host([disabled]) {
      pointer-events: none;
      opacity: 0.33;
    }
    :host button {
      width: 100%;
      display: block;
      border: none;
      background: none;
      box-sizing: border-box;
      font-family: var(--cn-font-family-ui);
      font-weight: var(--cn-font-weight-ui);
      font-size: var(--cn-font-size-ui);
      line-height: var(--cn-line-height-ui);
      letter-spacing: var(--cn-letter-spacing-ui);
      text-align: left;
      position: relative;
      height: calc(var(--cn-grid) * 6);
      border-radius: 0;
      user-select: none;
      padding-right: calc(var(--cn-grid) * 8);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    :host button::before {
      content: '';
      position: absolute;
      top: calc(var(--cn-grid) * 1.5);
      right: calc(var(--cn-grid) * 0.5);
      width: calc(var(--cn-grid) * 6);
      height: calc(var(--cn-grid) * 3);
      border-radius: calc(var(--cn-grid) * 1.5);
      background-color: var(--background-toggle-button-off);
      transition: all 0.2s ease-in-out;
    }
    :host button::after {
      content: '';
      position: absolute;
      top: calc(var(--cn-grid) * 1.5);
      right: calc(var(--cn-grid) * 4);
      width: calc(var(--cn-grid) * 3);
      height: calc(var(--cn-grid) * 3);
      border-radius: calc(var(--cn-grid) * 1.5);
      background-color: var(--color-on-toggle-button-off);
      transition: all 0.2s ease-in-out;
    }
    :host([aria-pressed="true"]) button::before {
      background-color: var(--background-toggle-button);
    }
    :host([aria-pressed="true"]) button::after {
      background-color: var(--color-on-toggle-button);
      transform: translateX(calc(3.5 * var(--cn-grid)));
    }
    :host([disabled]) button{
      pointer-events: none;
      opacity: 0.33;
    }
    :host([disabled]) button::before {
      background-color: var(--background-toggle-button-off) !important;
    }
    :host([disabled]) button::after {
      background-color: var(--color-on-toggle-button-off) !important;
    }
    
  `;
}
