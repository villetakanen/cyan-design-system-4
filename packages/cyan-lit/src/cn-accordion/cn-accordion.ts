import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('cn-accordion')
export class CnAccordion extends LitElement {
  static styles = css`
    :host {
      display: block;
      border-radius: var(--cn-border-radius-m);
      background-color: var(--cn-accordion-background);
      transition: all var(--cn-accordion-transition-duration) ease-in-out;
      overflow: hidden;
      border: var(--cn-accordion-border);
    }
    :host([expanded]) {
      background-color: var(--cn-background-elevation-3);
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--cn-accordion-padding);
      cursor: pointer;
      transition: background-color var(--cn-accordion-transition-duration) ease-in-out;
      color: var(--cn-accordion-header-text);
      background-color: var(--cn-accordion-header-background);
    }
    .header:hover {
      background-color: var(--cn-accordion-header-background-hover);
    }
    .header-content {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .header-icon {
      flex-shrink: 0;
    }
    cn-icon.toggle {
      transition: transform var(--cn-accordion-transition-duration) ease-in-out;
      transform: rotate(-90deg);
    }
    :host([expanded]) cn-icon.toggle {
      transform: scaleY(-1) rotate(-90deg);
    }
    .content {
      padding: 0 var(--cn-accordion-padding);
      max-height: 0;
      overflow: hidden;
      transition: max-height var(--cn-accordion-transition-duration) ease-in-out, padding var(--cn-accordion-transition-duration) ease-in-out;
    }
    :host([expanded]) .content {
      padding: var(--cn-accordion-padding);
      max-height: 500px; /* Should be enough for most content */
    }
  `;

  @property({ type: Boolean, reflect: true })
  expanded = false;

  @property({ type: String })
  label = '';

  @property({ type: String })
  noun = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  toggle() {
    if (this.disabled) return;
    this.expanded = !this.expanded;
    this.dispatchEvent(
      new CustomEvent('cn-accordion-toggle', {
        detail: { expanded: this.expanded },
        bubbles: true,
        composed: true,
      }),
    );
  }

  handleKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.toggle();
    }
  }

  render() {
    return html`
      <div 
        class="header" 
        @click=${this.toggle}
        @keydown=${this.handleKeyDown}
        part="header" 
        role="button" 
        tabindex="0"
        aria-expanded=${this.expanded}
        aria-disabled=${this.disabled}
      >
        <div class="header-content">
          ${this.noun ? html`<cn-icon noun="${this.noun}" class="header-icon" small aria-hidden="true"></cn-icon>` : ''}
          <slot name="header">${this.label}</slot>
        </div>
        <cn-icon class="toggle" noun="chevron-left" part="icon" aria-hidden="true"></cn-icon>
      </div>
      <div class="content" part="content" aria-hidden=${!this.expanded}>
        <slot></slot>
      </div>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'cn-accordion': CnAccordion;
  }
}
