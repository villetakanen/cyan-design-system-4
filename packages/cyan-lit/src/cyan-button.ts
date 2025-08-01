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
      background-color: red;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
      transition: all 0.2s ease;
      box-shadow: 0 2px 4px rgba(0, 123, 255, 0.2);
    }
    button:hover {
      background-color: #0056b3;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
    }
    button:active {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(0, 123, 255, 0.2);
    }
    button:focus {
      outline: 2px solid #007bff;
      outline-offset: 2px;
    }
  `;

  render() {
    return html`<button>${this.label}</button>`;
  }
}
