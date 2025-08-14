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
    :host button {
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      cursor: pointer;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'cn-share-button': CnShareButton;
  }
}
