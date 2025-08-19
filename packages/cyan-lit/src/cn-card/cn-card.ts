import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('cn-card')
export class CnCard extends LitElement {
  @property({ type: Number, reflect: true })
  elevation = 1;

  @property({ type: String, reflect: true })
  cover: string | undefined = undefined;

  @property({ type: String, reflect: true })
  noun = '';

  @property({ type: String, reflect: true })
  title = '';

  @property({ type: String, reflect: true })
  description = '';

  @property({ type: String, reflect: true })
  href = '';

  @property({ type: Boolean, reflect: true })
  notify = false;

  @property({ type: Boolean, reflect: true })
  alert = false;

  get coverSlot() {
    if (!this.cover) return undefined;

    const coverUrl: string = this.cover || '';

    if (!this.href)
      return html`<div class="cardContent" aria-hidden="true">
        <img src=${coverUrl} alt="" />
        <div class="tint"></div>
      </div>`;

    const linkUrl: string = this.href || '';

    return html`<div class="cardContent" aria-hidden="true">
      <a href=${linkUrl} class="cardContent">
        <img src=${coverUrl} alt="" class="coverImage"/>
        <div class="tint"></div>
      </a>
    </div>`;
  }

  get titleSlot() {
    if (!this.title) return html``;

    if (!this.href) return html`<h4 class="cardTitle">${this.title}</h4>`;

    const linkUrl: string = this.href || '';

    return html`<h4 class="cardTitle"><a href=${linkUrl}>${this.title}</a></h4>`;
  }

  protected render() {
    return html`
      ${this.coverSlot}
      <div class="cardHeader">   
        ${
          this.noun
            ? html`<cn-icon noun=${this.noun} class="cardNoun" ?large=${!!this
                .cover} ?dark=${!!this.cover}></cn-icon>`
            : ''
        }
        ${this.titleSlot}
      </div>
      ${
        this.description
          ? html`
        <p class="cardDescription">${this.description}</p>
      `
          : ''
      }
      <slot></slot>
      <div style="flex-grow:1"></div>
      <nav class="cardActions"><slot name="actions"></slot></nav>`;
  }

  public static styles = css`
    :host {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      border-radius: var(--cn-border-radius-large);
      position: relative;
      container-type: inline-size;
      flex-grow: 1;
      transition: background 0.27s ease-in-out;
      font-family: var(--cn-font-family-text);
      font-size: var(--cn-font-size-text);
      font-weight: var(--cn-font-weight-text);
      line-height: var(--cn-line-height-text);
      letter-spacing: var(--cn-letter-spacing-text);
      color: var(--color-text-low-emphasis);
      padding: var(--cn-grid) var(--cn-gap);
      /* These are set with variables in the cyan-css package */
      background: var(--cn-card-background);
      box-shadow: var(--cn-card-box-shadow);
      min-height: calc(7 * var(--cn-line));
    }
    :host([cover]) .cardNoun {
      position: absolute;
      top: calc(1 * var(--cn-grid));
      right: calc(1 * var(--cn-grid));
      margin: 0;
      padding: 0;
      z-index: 2;
    }
    :host([cover]) .cardHeader cn-icon {
      filter: drop-shadow(0 0 4px light-dark(
        var(--chroma-primary-95), 
        var(--color-halo)
      ));
      color: var(--chroma-K-S);
    }
    :host .cardContent {
      padding: 0;
      margin: calc(-1 * var(--cn-grid)) calc(-1 * var(--cn-gap));
      margin-bottom: 0;
      border-radius: var(--cn-border-radius-large, 16px);
      max-height: 100cqw;
      overflow: hidden;
      position: relative;
    }
    :host .cardContent img {
      width: calc(100cqw + var(--cn-gap) * 2);
      aspect-ratio: 16/9;
      object-fit: cover;
      border-radius: 16px;
      position: relative;
      display: block;
    }
    :host .cardContent a {
      display: contents;
    }
    :host .cardNoun {
      align-self: flex-start;
      flex-shrink: 0;
      margin-top: var(--cn-grid);
      color: var(--color-heading-2);
    }
    :host div.tint {
      position: absolute;
      bottom: 0;
      left: 0;
      height: min(95cqw, 44%);
      width: calc(100cqw + var(--cn-gap) * 2);
      z-index: 1;
      background: linear-gradient(
        0deg,
        hsla(var(--chroma-primary-95-hsl), 0.7), 
        hsla(var(--chroma-primary-30-hsl), 0.0)
      );
      background-blend-mode: hard-light;
      pointer-events: none;
      border-radius: 0 0 var(--cn-border-radius-card, 16px) var(--cn-border-radius-card, 16px);
    }
     :host h4 {
      margin: 0;
      padding: 0;
      font-family: var(--cn-font-family-headings);
      font-weight: var(--cn-heading-4-font-weight);
      font-size: var(--cn-heading-4-font-size);
      /* We use "downscaled" h3 as the size, that being the same as h4 size,
       * however we need to keep to h3 line height for consistency of spacing */
      line-height: var(--cn-heading-3-line-height);
      letter-spacing: normal;
      color: var(--color-heading-2, cyan);

      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;  
      overflow: hidden;
      text-overflow: ellipsis;
    }
    :host h4 a {
      color: var(--color-heading-2, cyan);
      text-decoration: none;
    }
    :host h4 a:hover {
      text-decoration: underline;
    }
    
    :host([elevation="0"]) {
      padding: calc(var(--cn-grid) - 1px) calc(var(--cn-gap) - 1px);
      border: 1px solid var(--color-border);
    }
    :host .cardHeader {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: left;
      gap: var(--cn-grid);
    }
    :host:after {
      content: "";
      position: absolute;
      top: -1px;
      right: -1px;
      width: calc(7 * var(--cn-grid));
      height: calc(7 * var(--cn-grid));
      background: none;
      opacity: 0;
      z-index: 0;
      pointer-events: none;
      transition: opacity .2s ease-in-out;
      will-change: opacity background;
      clip-path: polygon(100% 0, 0 0, 100% 100%);
      border-radius: 0 var(--cn-border-radius-large) 0 0;
    }
    :host([notify]):after {
      background: light-dark(
        var(--color-notify),
        color-mix(in hsl, var(--color-notify), var(--color-surface) 66%)
      );
      border: 1px color-mix(in hsl, var(--color-notify), var(--color-surface) 66%);
      opacity: 1;
    }
    :host([alert]):after {
      background: var(--color-alert);
      opacity: 1;
    }
    :host .cardActions {
      margin-left: calc(-1 * var(--cn-grid));
      margin-right: calc(-1 * var(--cn-grid));
    }
    :host h4.cardTitle,
    :host h4.cardTitle a {
      color: var(--_cn-card-title-color, var(--color-heading-2));
      text-decoration: none;
    }
    `;
}

// Make this available to react/preact/solid
declare global {
  interface HTMLElementTagNameMap {
    'cn-card': CnCard;
  }
  /* eslint-disable @typescript-eslint/no-namespace */
  namespace JSX {
    interface IntrinsicElements {
      'cn-card': CnCard;
    }
  }
}
