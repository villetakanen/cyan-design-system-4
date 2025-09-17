import { css, html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A D&D 5e ability score component that can be a display or an input.
 *
 * @element cn-d20-ability-score
 * @prop {number} base - The base ability score. Defaults to 10.
 * @prop {string} label - Optional label text displayed above the ability score (e.g., "STR", "DEX"). Defaults to empty.
 * @prop {boolean} interactive - If true, renders as an input field. Defaults to false.
 * @prop {number} min - The minimum allowed score in interactive mode. Defaults to 1.
 * @prop {number} max - The maximum allowed score in interactive mode. Defaults to 30.
 * @fires score-change - Dispatched when the score is changed in interactive mode, containing the base and modifier in the detail.
 */
@customElement('cn-d20-ability-score')
export class CnD20AbilityScore extends LitElement {
  @property({ type: Number })
  base = 10;

  @property({ type: Boolean, reflect: true })
  interactive = false;

  @property({ type: Number })
  min = 1;

  @property({ type: Number })
  max = 30;

  @property({ type: String })
  label = '';

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: var(--_cn-d20-ability-score-size);
      min-height: var(--_cn-d20-ability-score-size);
      flex-shrink: 0;
      flex-grow: 0;
      flex-basis: var(--_cn-d20-ability-score-size);
      position: relative;
      box-sizing: border-box;
      padding-bottom: var(--cn-grid);
    }

    .label {
      font-size: var(--cn-font-size-overline);
      font-weight: var(--cn-font-weight-text-strong);
      line-height: var(--cn-line-height-overline);
      letter-spacing: var(--cn-letter-spacing-overline);
      text-transform: uppercase;
      color: var(--color-text-low-emphasis);
      text-align: center;
      margin-bottom: calc(var(--cn-grid) / 2);
      width: 100%;
    }
    
    .modifier {
      border: solid 2px var(--color-on-surface);
      border-radius: var(--cn-border-radius);
      width: 100%;
      text-align: center;
      font-size: var(--_cn-d20-ability-score-modifier-font-size);
      font-weight: var(--_cn-d20-ability-score-font-weight);
      line-height: calc(var(--_cn-d20-ability-score-size) - var(--cn-gap));
      margin: 0;
      padding: 0;
      padding-bottom: var(--cn-grid);
      background-color: var(--color-surface);
      transition: all 0.2s ease-in-out;
      box-sizing: border-box;
      color: var(--color-on-surface);
    }
    
    .base-score {
      display: block;
      font-family: inherit;
      background: var(--color-on-surface);
      color: var(--color-surface);
      border-radius: var(--cn-border-radius);
      font-size: var(--_cn-d20-ability-score-base-font-size);
      font-weight: var(--_cn-d20-ability-score-font-weight);
      line-height: var(--_cn-d20-ability-score-base-line-height);
      height: var(--_cn-d20-ability-score-base-line-height);
      width: auto;
      margin: 0 var(--_cn-d20-ability-score-base-margin);
      padding: 0 var(--cn-grid);
      margin-top: var(--_cn-d20-ability-score-base-margin-top);
      text-align: center;
      transition: all 0.2s ease-in-out;
      box-sizing: border-box;
      border: none;
    }
    
    :host([interactive]) input.base-score {
      -moz-appearance: textfield; /* Firefox */ 
      border: solid 2px var(--color-on-surface);
      margin: 0 var(--_cn-d20-ability-score-input-margin);
      margin-top: var(--_cn-d20-ability-score-base-margin-top);
    }
    
    :host([interactive]:hover) input.base-score {
      color: var(--color-on-input);
      background: var(--color-input-hover);
      border: solid 2px var(--color-on-input);
    }
    
    :host([interactive]:focus-within) input.base-score {
      color: var(--color-on-input);
      background: var(--color-input);
      border: solid 2px var(--color-on-input);
    }

    :host([interactive]) input.base-score::-webkit-outer-spin-button,
    :host([interactive]) input.base-score::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `;

  /**
   * Calculates the D&D 5e ability modifier.
   * @returns {number} The calculated modifier.
   */
  private _calculateModifier(): number {
    return Math.floor((this.base - 10) / 2);
  }

  /**
   * Handles input changes, clamps the value, and dispatches a 'score-change' event.
   * @param {Event} e - The input event.
   */
  private _onInputChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    let newBase = Number.parseInt(target.value, 10) || 0;

    // Clamp the value to the min/max range
    if (newBase > this.max) {
      newBase = this.max;
    }
    // No need to check for min, as the input's min attribute handles it, but good for robustness
    if (newBase < this.min) {
      newBase = this.min;
    }

    this.base = newBase;

    // It's good practice to ensure the input visually reflects the clamped value
    target.value = String(this.base);

    const event = new CustomEvent('score-change', {
      detail: {
        base: this.base,
        modifier: this._calculateModifier(),
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  /**
   * Renders the display-only view with modifier and base score.
   */
  private _renderDisplay(): TemplateResult {
    const modifier = this._calculateModifier();
    const sign = modifier >= 0 ? '+' : '';
    return html`
      ${this.label ? html`<div class="label">${this.label}</div>` : ''}
      <div class="modifier">${sign}${modifier}</div>
      <div class="base-score">${this.base}</div>
    `;
  }

  /**
   * Renders the interactive input field.
   */
  private _renderInput(): TemplateResult {
    const modifier = this._calculateModifier();
    const sign = modifier >= 0 ? '+' : '';
    return html`
      ${this.label ? html`<div class="label">${this.label}</div>` : ''}
      <div class="modifier">${sign}${modifier}</div>
      <input
        class="base-score"
        type="number"
        .value=${String(this.base)}
        @input=${this._onInputChange}
        min=${this.min}
        max=${this.max}
        aria-label="Ability Score Input"
      />
    `;
  }

  render(): TemplateResult {
    return this.interactive ? this._renderInput() : this._renderDisplay();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cn-d20-ability-score': CnD20AbilityScore;
  }
}
