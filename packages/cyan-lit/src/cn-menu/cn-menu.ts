import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A dropdown menu component with a trigger button and expandable content area.
 * The menu can be positioned automatically based on viewport position and supports
 * both inline (horizontal dots) and vertical (kebab) orientations.
 */
@customElement('cn-menu')
export class CnMenu extends LitElement {
  public static styles = css`
    :host {
      display: contents;
    }
    .cn-menu {
      position: relative;
      display: inline-block;
    }
    /* Target the button directly */
    .cn-menu button {
      border: none;
      cursor: pointer;
      color: var(--color-on-surface);
      border-radius: 50%;
      width: var(--cn-button-size-physical);
      height: var(--cn-button-size-physical);
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      background: none;
    }
    .cn-menu button::after {
      content: '';
      position: absolute;
      top: calc((var(--cn-button-size-physical) - var(--cn-button-size)) / 2);
      left: calc((var(--cn-button-size-physical) - var(--cn-button-size)) / 2);
      border-radius: 50%;
      background: var(--color-button-text);
      transition: opacity 0.3s;
      width: var(--cn-button-size);
      height: var(--cn-button-size);
      transition: background 0.22s;
    }
    .cn-menu button:hover::after {
      background: var(--color-button-text-hover);
    }
    .cn-menu button:active::after {
      background: var(--color-button-text-active);
    }

    .cn-menu cn-icon {
      z-index: 1;
    }
    .cn-menu button:hover {
      color: var(--cn-color-on-button-hover);
    }
    .cn-menu button:active {
      color: var(--cn-color-on-button-active);
    }

    .cn-menu-content {
      display: none;
      position: absolute;
      background-color: var(--color-surface-3);
      min-width: 160px;
      box-shadow: var(--shadow-elevation-3);
      z-index: 1;
      top: calc(2 * var(--cn-grid));
      padding: 0;
      border-radius: var(--cn-border-radius);
      overflow: hidden;
    }
    .show {
      display: block;
    }
  `;

  @property({ type: Boolean, reflect: true })
  public expanded = false;

  @property({ type: Boolean, reflect: true })
  public inline = false;

  @property({ type: Boolean, reflect: true })
  public disabled = false;

  public render() {
    const menuPosition = this._getMenuPosition();
    const icon = this.inline ? 'dots' : 'kebab';

    return html`
      <div class="cn-menu" role="menu">
        <button
          type="button"
          class="text icon"
          aria-haspopup="true"
          aria-expanded="${this.expanded}"
          @click="${this._toggleMenu}"
          ?disabled=${this.disabled}
        >
          <cn-icon small noun=${icon}></cn-icon>
        </button>
        <div
          class="cn-menu-content ${this.expanded ? 'show' : ''}"
          role="menuitem"
          style="${
            menuPosition === 'left'
              ? 'right: var(--cn-grid);'
              : 'left: var(--cn-grid);'
          }"
        >
          <slot></slot>
        </div>
      </div>
    `;
  }

  private _getMenuPosition(): string {
    const buttonRect = this.shadowRoot
      ?.querySelector('button')
      ?.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    if (buttonRect) {
      const buttonMidpoint = buttonRect.left + buttonRect.width / 2;
      if (buttonMidpoint < viewportWidth / 2) {
        return 'right'; // Open to the right if the button is on the left side
      }
      return 'left'; // Open to the left if the button is on the right side
    }

    return 'right'; // Default to right if the button rect cannot be determined
  }

  private _toggleMenu(e: Event) {
    if (this.disabled) {
      return;
    }
    e.stopPropagation(); // Prevent the click event from bubbling up
    this.expanded = !this.expanded;

    this.dispatchEvent(
      new CustomEvent('menu-toggled', {
        detail: { expanded: this.expanded },
        bubbles: true,
        composed: true,
      }),
    );
  }

  // Handle clicks outside the menu
  private _handleDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Check if the click target is within the menu content
    const isClickInsideMenu = this.shadowRoot
      ?.querySelector('.cn-menu-content')
      ?.contains(target);
    if (
      this.expanded &&
      !this.contains(target) &&
      !isClickInsideMenu &&
      !(this === target)
    ) {
      this._toggleMenu(event);
    }
  }

  // Add event listeners in connectedCallback
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleDocumentClick.bind(this));
  }

  // Remove event listener in disconnectedCallback
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleDocumentClick.bind(this));
  }
}

// Make this available to react/preact/solid
declare global {
  interface HTMLElementTagNameMap {
    'cn-menu': CnMenu;
  }
  /* eslint-disable @typescript-eslint/no-namespace */
  namespace JSX {
    interface IntrinsicElements {
      'cn-menu': CnMenu;
    }
  }
}
