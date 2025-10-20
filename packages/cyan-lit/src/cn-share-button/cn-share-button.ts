import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('cn-share-button')
export class CnShareButton extends LitElement {
  @property({ type: String })
  url = window.location.href;

  @property({ type: String })
  title = document.title;

  @property({ type: String })
  text = 'Check this out!';

  @property({ type: String })
  noun = 'share';

  async share() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: this.title,
          text: this.text,
          url: this.url,
        });
      } catch (error) {
        console.error('Error sharing', error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      console.log('Web Share API not supported');
      // You can implement a fallback here, like copying the URL to the clipboard
    }
  }

  render() {
    return html`
      <button @click="${this.share}">
        <cn-icon noun="${this.noun}"></cn-icon>
      </button>
    `;
  }

  static styles = css`
    :host {
      display: inline-block;
    }
    :host button {
      background: var(--color-button-text);
      color: var(--color-on-surface);
      border: none;
      cursor: pointer;
      border-radius: 50%;
      width: var(--cn-navigation-button-size);
      height: var(--cn-navigation-button-size);
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: background-color 0.2s ease;
    }
    :host button:hover {
      background: var(--color-button-text-hover);
    }
    :host button:active {
      background: var(--color-button-text-active);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'cn-share-button': CnShareButton;
  }
}
