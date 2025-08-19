import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('cn-loader')
export class CnLoader extends LitElement {
  @property({ type: String, reflect: true })
  noun = 'fox';

  @property({ type: Boolean, reflect: true })
  inline = false;

  public render() {
    return html`
      <div class="lds-dual-ring"></div>
      <cn-icon
        noun="${this.noun}"
        ?large=${!this.inline}
      ></cn-icon>
    `;
  }

  public static styles = css`
    :host {
      display: grid;
      height: var(--cn-loader-size);
      width: var(--cn-loader-size);
      aspect-ratio: 1;
      place-content: center;
      position: relative;
    }
    :host([inline]) {
      height: calc(var(--cn-line) * 1);
      width: calc(var(--cn-line) * 1);
    }

    :host cn-icon {
      grid-area: 1 / 1;
      opacity: 0.44;
      color: var(--cn-loader-color);
    }
    .lds-dual-ring,
    .lds-dual-ring:after {
      box-sizing: border-box;
    }
    .lds-dual-ring {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    .lds-dual-ring:after {
      content: " ";
      opacity: 0.72;
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: var(--cn-loader-line-width) solid var(--cn-loader-color);
      border-color: var(--cn-loader-color) transparent var(--cn-loader-color) transparent;
      animation: lds-dual-ring 1.2s linear infinite;
    }
    @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;
}

// Make this available to react/preact/solid
declare global {
  interface HTMLElementTagNameMap {
    'cn-loader': CnLoader;
  }
  /* eslint-disable @typescript-eslint/no-namespace */
  namespace JSX {
    interface IntrinsicElements {
      'cn-loader': CnLoader;
    }
  }
}
