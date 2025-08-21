import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('cn-dice')
export class CnDice extends LitElement {
  static styles = css`
  :host {
    display: flex;
    height: var(--_cn-dice-size);
    box-sizing: border-box;
    aspect-ratio: 1;
    position: relative;
    container-type: inline-size;
    container-name: cn-dice;
    align-items: center;
    justify-content: center;
  }
  /* CSS for the dice container */
  .dice-container { 
    height: 100cqi;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--_cn-dice-font-family);
    font-weight: var(--_cn-dice-font-weight);
    font-size: var(--_cn-dice-font-size);
    overflow: visible;
    position: relative;
  }
  .dice-value {
    text-shadow: var(--_cn-dice-text-shadow);
    opacity: 1;
    position: relative;
    z-index: 1;
  }
  
  .dice-container::before {
    aspect-ratio: 1;
    content: '';
    position: absolute;
    z-index: 1;
    transform: rotate(2.25deg) scale(1.2);
  }

  /* CSS Shapes and Colors for different dice */
  .d4::before {
    height: 90cqi;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%); 
    background-color: var(--cn-dice-color-d4, #c3ef48); 
  }
  .d6::before {
    height: 80cqi; 
    clip-path: none;
    background-color: var(--cn-dice-color-d6, #7bcb52); 
  }
  .d8::before {
    height: 100cqi; 
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); 
    background-color: var(--cn-dice-color-d8, #59b752);
  }
  .d10::before { 
    height: 95cqi;
    clip-path: polygon(50% 0%, 95% 40%, 95% 60%, 50% 100%, 5% 60%, 5% 40%);
    background-color: var(--cn-dice-color-d10, #288f57);
  }
  .d12::before { 
    height: 100cqi;
    clip-path: polygon(
        34.54915% 2.44717%,
        65.45085% 2.44717%,
        90.45085% 20.61074%,
        100% 50%,
        90.45085% 79.38926%,
        65.45085% 97.55283%,
        34.54915% 97.55283%,
        9.54915% 79.38926%,
        0% 50%,
        9.54915% 20.61074%
    );
    background-color: var(--cn-dice-color-d12, #006655);
  }
  .d20::before { 
    height: 90cqi;
    aspect-ratio: 1/cos(30deg);
    clip-path: polygon(50% -50%,100% 50%,50% 150%,0 50%);
    background-color: var(--cn-dice-color-d20, #0a89de);
    transform: rotate(35deg);
  }
  `;

  @property({ type: Number, reflect: true })
  public sides = 6;
  @property({ type: Number, reflect: true })
  public value = 1;
  @property({ type: Boolean, reflect: true })
  public roll = false;

  sideOptions = [4, 6, 8, 10, 12, 20];

  render() {
    const shapeClass = this.sideOptions.includes(this.sides)
      ? `d${this.sides}`
      : 'd6';

    const shapeValue =
      this.value > 1 && this.value < this.sides + 1 ? this.value : this.sides;

    return html`
      <div class="dice-container ${shapeClass}"> 
        <div class="dice-value">${shapeValue}</div> 
      </div>
    `;
  }
}
