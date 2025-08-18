import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

interface Image {
  src: string;
  caption: string;
}

@customElement('cn-lightbox')
export class CnLightbox extends LitElement {
  @property({ type: Array, reflect: true })
  images: Image[] = [];

  @query('.flex-container')
  private _flexContainer!: HTMLElement;

  firstUpdated() {
    if (this._flexContainer) {
      this._flexContainer.addEventListener('wheel', (event: WheelEvent) => {
        if (event.deltaY !== 0) {
          event.preventDefault();
          this._flexContainer.scrollLeft += event.deltaY;
        }
      });
    }
  }

  static styles = css`
    /* Basic styles for the container */
    :host {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: var(--cn-lightbox-background);
      border-radius: var(--cn-lightbox-border-radius);
      container-type: inline-size;
    }
    :host img {
      border-radius: var(--cn-border-radius-small);
    }
    :host .single-figure {
      margin: 0;
      padding: var(--cn-lightbox-inner-spacing);
    }
    :host .single-figure img {
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      object-position: center;
    }
    :host .caption {
      margin: 0 auto;
      text-align: center;
      max-height: var(--cn-line, 1.2em);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--cn-lightbox-color);
    }
    :host .flex-container {
      display: flex;
      flex-wrap: wrap;
      gap: var(--cn-lightbox-inner-spacing);
      flex-wrap: nowrap;
      overflow-x: scroll;
      position: relative;
      scrollbar-color: var(--cn-lightbox-scrollbar-color) transparent;
      padding: var(--cn-lightbox-inner-spacing);
      height: 100%;
      box-sizing: border-box;
    }
    :host .square-figure {
      flex-grow: 0;
      flex-shrink: 0;
      margin: 0;
      position: relative;
      height: 100%;
      aspect-ratio: 1 / 1;
    }
    :host .square-figure img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
    :host .square-figure .caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: color-mix(in srgb, var(--color-shadow, black) 80%, transparent);
      color: var(--cn-color-on-primary, white);
      padding: var(--cn-grid);
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
      max-width: none;
      border-bottom-left-radius: var(--cn-border-radius-small);
      border-bottom-right-radius: var(--cn-border-radius-small);
    }
  `;

  render() {
    if (this.images.length === 1) {
      return html`
      <figure class="single-figure">
        <img src="${this.images[0].src}" alt="${this.images[0].caption}" />
        <figcaption class="caption">${this.images[0].caption}</figcaption>
  </figure>
    `;
    }
    if (this.images.length > 1) {
      return html`
      <div class="flex-container">
        ${this.images.map(
          (image) => html`
            <figure class="square-figure">
              <img src="${image.src}" alt="${image.caption}" />
              <figcaption class="caption">${image.caption}</figcaption>
            </figure>
          `,
        )}
      </div>
    `;
    }
    return html``; // Nothing to render if no images
  }
}
