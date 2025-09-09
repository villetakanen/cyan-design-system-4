import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Define the allowed values for the mode attribute
type BarMode = 'sticky' | 'modal' | '';

/**
 * A Lit wrapper for App-bar content and visuals
 */
@customElement('cn-app-bar')
export class CnAppBar extends LitElement {
  @property({ type: String, reflect: true }) noun = '';
  @property({ type: String, reflect: true }) title = '';
  @property({ type: String, reflect: true }) shortTitle = '';
  @property({ type: String, reflect: true }) mode: BarMode = '';
  @property({ type: Boolean, reflect: true }) scrolled = false;

  private scrollTimeout: number | undefined;

  private handleScroll = () => {
    if (this.scrollTimeout !== undefined) {
      return;
    }
    this.scrollTimeout = window.setTimeout(() => {
      this.scrolled = window.scrollY > 0;
      this.scrollTimeout = undefined;
    }, 100); // Throttle to every 100ms
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('scroll', this.handleScroll);
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.handleScroll);
    super.disconnectedCallback();
  }

  private handleBackClick() {
    if (window.history.length > 1) {
      history.back();
    } else {
      // Optionally, navigate to a default page or do nothing
      window.location.href = '/';
    }
  }

  render() {
    const titleSnippet = this.shortTitle
      ? html`<span class="sm-hidden">${this.title}</span><span class="md-hidden">${this.shortTitle}</span>`
      : html`${this.title}`;

    return html`
      <div class="container">
        ${
          this.mode === 'modal'
            ? html`
              <button type="button" class="back-button" @click="${this.handleBackClick}">
                <cn-icon noun="arrow-left"></cn-icon>
              </button>
            `
            : ''
        }
        ${
          this.noun && this.mode !== 'modal'
            ? html`
              <div class="noun-icon">
                <cn-icon noun="${this.noun}"></cn-icon>
              </div>
            `
            : ''
        }
        <h3 class="title">${titleSnippet}</h3>
        ${
          this.mode !== 'modal'
            ? html`
              <div class="actions"><slot></slot></div>
            `
            : ''
        }
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
      height: var(--cn-app-bar-height);
      background-color: var(--cn-app-bar-background);
      color: var(--cn-app-bar-color);
      z-index: 100;
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
      border-radius: var(--cn-app-bar-border-radius);
    }

    @media (max-width: 620px) {
      .sm-hidden {
        display: none;
      }
    }

    @media (min-width: 621px) {
      .md-hidden {
        display: none;
      }
    }

    :host([mode='sticky']),
    :host([mode='modal']) {
      position: sticky;
      top: 0;
    }

    :host([mode='sticky'][scrolled]),
    :host([mode='modal']) {
      box-shadow: var(--cn-app-bar-shadow);
    }

    :host([mode='sticky'][scrolled]) {
      background-color: var(--cn-app-bar-background-sticky);
    }

    :host([mode='modal']) {
      background-color: var(--cn-app-bar-background-modal);
    }

    :host([mode='modal']) .container {
      padding-left: var(--cn-grid);
    }

    .container {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 var(--cn-app-bar-padding-horizontal);
      gap: var(--cn-app-bar-gap);
    }

    .noun-icon {
      display: flex;
      align-items: center;
      z-index: 120;
    }

    .title {
      color: inherit;
      flex-grow: 1;
      font-family: var(--cn-font-family);
      font-weight: var(--cn-app-bar-font-weight);
      font-size: var(--cn-app-bar-font-size);
      line-height: var(--cn-app-bar-height);
      letter-spacing: var(--cn-app-bar-letter-spacing);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: var(--cn-app-bar-gap);
    }

    .back-button {
      display: flex;
      align-items: center;
      cursor: pointer;
      color: inherit;
      background: none;
      border: none;
      position: relative;
      padding: 0;
      margin: 0;
      border-radius: 50%;
      width: var(--cn-navigation-icon-size);
      height: var(--cn-navigation-icon-size);
      justify-content: center;
    }

    .back-button::before {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background: var(--cn-color-surface-variant);
      transition: background-color 0.2s ease;
    }

    .back-button:hover::before {
      background: var(--cn-color-primary);
      opacity: 0.1;
    }

    .back-button cn-icon {
      z-index: 120;
      position: relative;
    }
    @media (max-width: 620px) {
      :host .title {
        font-size: var(--cn-font-size-h5);
        line-height: var(--cn-line-height-h5);
        max-height: calc(var(--cn-app-bar-height) - var(--cn-grid));
        white-space: normal;
      }
      .noun-icon {
        display: none;
      }
    }
  `;
}
