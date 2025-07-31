import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('cyan-button')
export class CyanButton extends LitElement {
  @property({ type: String })
  label = 'Button';

  static styles = css`
    :host {
      display: inline-block;
    }
    button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }
    button:hover {
      background-color: #0056b3;
    }
  `;

  render() {
    return html`<button>${this.label}</button>`;
  }
}
