import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Avatar component that displays a user's avatar. It can show an image,
 * initials from a nickname, or a default placeholder icon.
 */
@customElement('cn-avatar')
export class CnAvatar extends LitElement {
  public static styles = css`
    :host {
      display: contents;
    }
    :host(:hover) {
      --cn-color-avatar-1: var(--color-surface-4);
      --cn-color-avatar-2: var(--color-surface-4);
    }
    :host .avatarFrame {
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      aspect-ratio: 1 / 1;
      height: calc(var(--cn-line) * 3);
      background-color: var(--cn-color-avatar-1);
      user-select: none;
      cursor: pointer;
      transition: background-color 0.3s ease-in-out;
      color: var(--color-on-surface);
    }
    :host([elevation="1"]) .avatarFrame {
      box-shadow: var(--shadow-elevation-1);
    }
    :host([elevation="2"]) .avatarFrame {
      box-shadow: var(--shadow-elevation-2);
    }
    img {
      height: calc(var(--cn-line) * 3 - var(--cn-grid));
      border-radius: 50%;
      object-fit: cover;
      aspect-ratio: 1 / 1;
    }
    div.placeholder {
      font-family: var(--cn-font-family-ui);
      font-size: calc(var(--cn-line) * 1.5);
      line-height: calc(var(--cn-line) * 3);
      text-align: center;
      text-transform: uppercase;
    }
    cn-icon {
      color: var(--color-on-surface);
    }
  `;

  @property({ type: String, reflect: true })
  public src = '';

  @property({ type: String, reflect: true })
  public nick = '';

  @property({ type: Number, reflect: true })
  public elevation = 0;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('aria-label', 'Avatar');
  }

  /**
   * Generate a background color based on the nickname hash
   * to create consistent but varied avatar colors
   */
  private renderBackgroundStyle() {
    const nick = this.nick;
    if (nick) {
      const hash = Array.from(nick).reduce(
        (acc, char) => acc + char.charCodeAt(0),
        0,
      );
      const value = Math.abs(hash % 100);
      return `background-color: color-mix(in hsl, var(--cn-color-avatar-1), var(--cn-color-avatar-2) ${value}%)`;
    }
    return 'background-color: var(--cn-color-avatar-1)';
  }

  public render() {
    const image = this.src
      ? html`<img src="${this.src}" alt="Avatar" />`
      : this.nick
        ? html`<div class="placeholder">${this.nick.substring(0, 2)}</div>`
        : html`<cn-icon noun="avatar"></cn-icon>`;

    return html`
      <div class="avatarFrame" style="${this.renderBackgroundStyle()}">
        ${image}
      </div>
    `;
  }
}

// Make this available to react/preact/solid
declare global {
  interface HTMLElementTagNameMap {
    'cn-avatar': CnAvatar;
  }
  /* eslint-disable @typescript-eslint/no-namespace */
  namespace JSX {
    interface IntrinsicElements {
      'cn-avatar': CnAvatar;
    }
  }
}
