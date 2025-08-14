import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('cn-reaction-button')
export class CnReactionButton extends LitElement {
  @property({ type: String, reflect: true })
  ariaPressed = 'false';
  @property({ type: Boolean, reflect: true })
  disabled = false;
  @property({ type: Boolean, reflect: true })
  checked = false;
  @property({ type: Number, reflect: true })
  count = -1;
  @property({ type: String, reflect: true })
  noun = 'love';
  @property({ type: Boolean, reflect: true })
  small = false;
  @property({ type: Boolean, reflect: true })
  inactive = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    this.addEventListener('click', this.handleCommand);
    this.addEventListener('keydown', this.handleCommand);
    this.setAttribute('aria-pressed', this.checked ? 'true' : 'false');
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleCommand);
    this.removeEventListener('keydown', this.handleCommand);
  }

  handleCommand(event: Event) {
    if (this.disabled || this.inactive) return;
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
      if (this.count > -1) this.count--;
      this.checked = false;
    } else {
      this.setAttribute('aria-pressed', 'true');
      if (this.count > -1) this.count++;
      this.checked = true;
    }
    this.dispatchEvent(new Event('change'));
  }

  render() {
    return html`
      <button>
        <cn-icon noun=${this.noun}></cn-icon>
      </button>
      ${
        this.count > -1
          ? html`
            <div class="count">
              ${this.count}
            </div>
          `
          : html``
      }`;
  }

  static styles = css`
    :host {
      display: block;
      flex-shrink: 0;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      height: calc(var(--cn-line) * 2);
      position: relative;
      color: var(--color-reaction-button, magenta);
      line-height: calc(var(--cn-line) * 2);
      flex-shrink: 0;
    }
    :host([small]) {
      height: calc(var(--cn-line) * 1.5);
    }
    :host([disabled]) {
      pointer-events: none;
      opacity: 0.5;
    }
    :host([inactive]) {
      pointer-events: none;
    }
    :host button {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: calc(var(--cn-line) * 2 - 4px);
      width: calc(var(--cn-line) * 2 - 4px);
      /* 44px is the minimum _clickable_ height for a wgag AA compliant button. */
      margin: 2px;
      border-radius: 22px;
      background: var(--background-reaction-button);
      // border: solid 1px var(--color-border);
      border: none;
      transition: background 0.2s ease-in-out;
    }
    :host([small]) button {
      height: calc(var(--cn-line) * 1.5 - 4px);
      width: calc(var(--cn-line) * 1.5 - 4px);
      border-radius: 16px;
    }
    :host(:hover) button {
      background: var(--background-reaction-button-hover);
      box-shadow: var(--shadow-button-hover);
    }
    :host(:active) button,
    :host([aria-pressed='true']) button {
      background: var(--background-reaction-button-active);
      // border: 0;
    }
    :host(:active) cn-icon,
    :host([aria-pressed='true']) cn-icon {
      color: var(--color-reaction-button-active, magenta);
    }
    :host([disabled]) button {
      background: none;
      border: none;
    }
    :host cn-icon {
      opacity: 0.72;
      pointer-events: none;
      transition: opacity 0.2s ease-in-out;
      color: var(--color-reaction-button, magenta);
    }
    :host(:active) cn-icon,
    :host([aria-pressed='true']) cn-icon {
      opacity: 1;
    }
    :host .count {
      line-height: calc(var(--cn-line) * 2);
      font-size: var(--cn-font-size-text);
      text-align: center;
      pointer-events: none;
      font-family: var(--cn-font-family-ui);
      font-weight: 600;
      letter-spacing: var(--cn-font-family-ui);
      margin: 0;
      padding: 0 var(--cn-grid);
      user-select: none;
    }
    :host([small]) .count {
      font-size: var(--cn-font-size-caption);
      line-height: calc(var(--cn-line) * 1.5);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'cn-reaction-button': CnReactionButton;
  }
}
