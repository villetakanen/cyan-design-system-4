import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type LabelPosition = 'top' | 'bottom';
type Layout = 'rows' | 'grid-2' | 'grid-3';

@customElement('cn-stat-block')
export class CnStatBlock extends LitElement {
  @property({ type: String, reflect: true })
  label = '';

  @property({ type: String, attribute: 'label-position', reflect: true })
  labelPosition: LabelPosition = 'top';

  @property({ type: String, reflect: true })
  layout: Layout = 'rows';

  private renderLabel() {
    if (!this.label) return html``;
    
    return html`<div class="label" part="label">${this.label}</div>`;
  }

  protected render() {
    return html`
      <div class="stat-block-container" part="container">
        ${this.labelPosition === 'top' ? this.renderLabel() : ''}
        <main class="content-wrapper layout--${this.layout}">
          <slot></slot>
        </main>
        ${this.labelPosition === 'bottom' ? this.renderLabel() : ''}
      </div>
    `;
  }

  public static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
    }

    .stat-block-container {
      background: var(--cn-card-background);
      border: 1px solid var(--color-border);
      border-radius: var(--cn-border-radius-medium);
      box-shadow: var(--cn-card-box-shadow);
      padding: var(--cn-grid);
      display: flex;
      flex-direction: column;
      gap: var(--cn-grid);
    }

    .label {
      font-family: var(--cn-font-family);
      font-weight: var(--cn-font-weight-h4);
      font-size: var(--cn-font-size-h4);
      line-height: var(--cn-line-height-h4);
      color: var(--color-heading-2);
      margin: 0;
    }

    .content-wrapper {
      display: flex;
      flex-direction: column;
      gap: calc(var(--cn-grid) / 2);
    }

    .content-wrapper.layout--grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--cn-grid);
    }

    .content-wrapper.layout--grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: var(--cn-grid);
    }

    /* Responsive behavior for grid layouts */
    @media (max-width: 480px) {
      .content-wrapper.layout--grid-2,
      .content-wrapper.layout--grid-3 {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 720px) {
      .content-wrapper.layout--grid-3 {
        grid-template-columns: 1fr 1fr;
      }
    }

    /* Ensure slotted content fits properly */
    ::slotted(*) {
      min-width: 0;
      box-sizing: border-box;
    }
  `;
}

// Make this available to react/preact/solid
declare global {
  interface HTMLElementTagNameMap {
    'cn-stat-block': CnStatBlock;
  }
  /* eslint-disable @typescript-eslint/no-namespace */
  namespace JSX {
    interface IntrinsicElements {
      'cn-stat-block': CnStatBlock;
    }
  }
}