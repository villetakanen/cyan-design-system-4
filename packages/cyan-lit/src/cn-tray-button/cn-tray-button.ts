import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A tray button is a toggle button used to open and close navigation trays or menus.
 * It displays as a hamburger menu icon that transforms into an X when active.
 *
 * The button manages its state via localStorage and adapts to screen size changes.
 * On screens wider than 960px, it remembers the previous state, while on smaller
 * screens it always starts closed.
 */
@customElement('cn-tray-button')
export class CnTrayButton extends LitElement {
  @property({ type: String, reflect: true, attribute: 'aria-expanded' })
  ariaExpanded = 'false';

  @property({ type: String, reflect: true, attribute: 'aria-label' })
  ariaLabel = 'Menu';

  @property({ type: String, reflect: true, attribute: 'aria-controls' })
  ariaControls = '#cn-tray';

  firstUpdated() {
    this.checkInitialMenuState();
    window.addEventListener('resize', this.checkInitialMenuState);
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.checkInitialMenuState);
  }

  checkInitialMenuState() {
    if (window.innerWidth > 960) {
      const storedState = localStorage.getItem('cn-menu-state');
      this.ariaExpanded = storedState ? storedState : 'false';
    } else {
      this.ariaExpanded = 'false';
    }
  }

  toggleOpen() {
    this.ariaExpanded = this.ariaExpanded === 'true' ? 'false' : 'true';
    localStorage.setItem('cn-menu-state', this.ariaExpanded);
    this.dispatchEvent(
      new CustomEvent('change', { detail: this.ariaExpanded }),
    );
  }

  render() {
    return html`
      <button type="button" 
        aria-label="${this.ariaLabel}" 
        aria-controls=${this.ariaControls}
        @click="${this.toggleOpen}">
      <span class="state-box">
        <span class="state-indicator"></span>
      </span>
    </button>`;
  }

  static styles = css`
    :host {
      display: block;
      height: var(--cn-navigation-button-size);
      width: var(--cn-navigation-button-size);
      border-radius: 50%;
      padding: 0;
      margin: 0;
    }
    :host button {
      height: var(--cn-navigation-button-size);
      width: var(--cn-navigation-button-size);
      background: none;
      border: none;
      margin: 0;
      padding: 0;
      cursor: pointer;
      position: relative;
      padding-top: calc(var(--cn-grid) / 2);
      padding-left: calc(var(--cn-grid) / 4);
      border-radius: 50%;
    }
    :host button::before {
      background: var(--background-button-text, transparent);
      border-radius: 50%;
      content: '';
      display: block;
      position: absolute;
      height: var(--cn-navigation-icon-size);
      width: var(--cn-navigation-icon-size);
      z-index: -1;
      top: calc(var(--cn-grid) / 2);
      left: calc(var(--cn-grid) / 2);
      transition: background 0.2s ease;
    }
    :host button:hover::before {
      background: var(--background-button-text-hover);
    }
    :host button:active::before {
      background: var(--background-button, var(--color-elevation-1));
    }
    :host .state-box {
      display: block;
      margin: 0;  
      height: calc(var(--cn-navigation-icon-size));
      width: var(--cn-navigation-icon-size);
      position: relative;
    }
    :host .state-indicator {
      display: block;
      position: absolute;
      top: calc(var(--cn-grid) * 1.25);
      left: calc(var(--cn-grid) * 1.75);
      height: calc(var(--cn-grid) * 3);
      width: calc(var(--cn-grid) * 3);
    }
    .state-indicator::before, .state-indicator::after {
      content: "";
      display: block;
      position: absolute;
      background-color: var(--color-text);
      width: calc(var(--cn-grid) * 3);
      height: calc(var(--cn-grid) / 2);
      border-radius: calc(var(--cn-grid) / 4);
      transition: transform 0.2s ease-in-out;
    }
    .state-indicator::before {
      top: calc(var(--cn-grid) * 0.625);
    }
    .state-indicator::after {
      bottom: calc(var(--cn-grid) * 0.625);
    }
    :host([aria-expanded='true']) .state-indicator::before  {
      transform: translate3d(0, calc(var(--cn-grid) * 0.625), 0) rotate(45deg);
    }
    :host([aria-expanded='true']) .state-indicator::after {
      transform: translate3d(0, calc(var(--cn-grid) * -0.625), 0) rotate(-45deg);
    }
    :host button:focus {
      outline: 2px solid var(--color-link);
      outline-offset: 2px;
    }
  `;
}
