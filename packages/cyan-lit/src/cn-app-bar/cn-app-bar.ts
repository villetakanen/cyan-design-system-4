import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('cn-app-bar')
export class CnAppBar extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: #1976d2;
      color: white;
      padding: 0.75rem 1.5rem;
      font-size: 1.25rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.08);
    }
  `;

  render() {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }
}
