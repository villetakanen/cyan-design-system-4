import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Avatar button component that displays a user's avatar with a dropdown indicator.
 * Supports popover functionality for showing additional content.
 */
@customElement('cn-avatar-button')
export class CnAvatarButton extends LitElement {
  public static styles = css`
    :host {
      display: inline-block;
      height: calc(var(--cn-line) * 3);
      width: calc(var(--cn-line) * 4.5);
      border-radius: calc(var(--cn-line) * 1.5);
      position: relative;
      background: var(--background-button);
      user-select: none;
      cursor: pointer;
      transition: background-color 0.3s ease-in-out;
    }
    :host(:hover) {
      background: var(--background-button-hover);
    }
    :host(:active) {
      background-color: var(--background-button-active);
    }
    img {
      height: calc(var(--cn-line) * 3 - var(--cn-grid));
      padding-top: calc(var(--cn-grid) / 2);
      padding-left: calc(var(--cn-grid) / 2);
      border-radius: 50%;
      object-fit: cover;
      aspect-ratio: 1 / 1;
    }
    cn-icon.placeholder {
      position: absolute;
      left: calc(var(--cn-grid) * 2 + 2px);
      top: calc(var(--cn-grid) * 2 + 2px);
      color: var(--color-on-field);
      z-index: 2;
    }
    cn-icon.placeholder::before {
      content: '';
      position: absolute;
      left: calc(var(--cn-grid) * -1.5 - 1px);
      top: calc(var(--cn-grid) * -1.5 - 1px);
      width: calc(var(--cn-line) * 3.25 - var(--cn-gap));
      height: calc(var(--cn-line) * 3.25 - var(--cn-gap));
      border-radius: 50%;
      background-color: color-mix(in hsl, var(--color-primary), transparent 50%);
      z-index: -1;
    }
    :host(:hover) cn-icon.placeholder::before {
      background-color: color-mix(in hsl, var(--color-primary), transparent 70%);
    }
    cn-icon.action {
      position: absolute;
      right: var(--cn-grid);
      top: var(--cn-line);
      color: var(--color-on-field);
    }
  `;

  @property({ type: String, reflect: true })
  public src = '';

  @property({ type: String, reflect: true })
  public popovertarget = '';

  connectedCallback(): void {
    super.connectedCallback();
    this.role = 'button';
    this.ariaLabel = 'Avatar';
  }

  onclick: ((this: GlobalEventHandlers, ev: MouseEvent) => unknown) | null =
    () => {
      if (this.popovertarget) {
        const target = this.parentElement?.querySelector(
          `#${this.popovertarget}`,
        );
        // console.log(this.popovertarget, target, this.parentElement)
        if (target) {
          const rect = this.getBoundingClientRect();
          console.log(rect);
          const t = target as HTMLElement;
          t.style.top = `${this.getBoundingClientRect().top + 12}px`;
          t.style.left = `${this.getBoundingClientRect().left + 12}px`;
          t.style.right = 'auto';
          t.style.bottom = 'auto';
          t.togglePopover();
        }
      }
    };

  public render() {
    const image = this.src
      ? html`<img src="${this.src}" alt="Avatar" />`
      : html`<cn-icon noun="avatar" class="placeholder"></cn-icon>`;

    return html`
      ${image}
      <cn-icon class="action" noun="open-down" small></cn-icon>
    `;
  }
}

// Make this available to react/preact/solid
declare global {
  interface HTMLElementTagNameMap {
    'cn-avatar-button': CnAvatarButton;
  }
  /* eslint-disable @typescript-eslint/no-namespace */
  namespace JSX {
    interface IntrinsicElements {
      'cn-avatar-button': CnAvatarButton;
    }
  }
}
