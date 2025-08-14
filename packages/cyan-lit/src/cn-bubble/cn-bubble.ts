import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Bubble component for comments and replies in discussions.
 * Provides visual styling for chat-like conversations with support for
 * both regular comments and reply bubbles.
 */
@customElement('cn-bubble')
export class CnBubble extends LitElement {
  public static styles = css`
    :host {
      display: block;
      background: var(--color-bubble);
      color: var(--color-on-bubble);
      border-radius: 0 var(--cn-border-radius-medium) var(--cn-border-radius-medium) var(--cn-border-radius-medium);
      padding: var(--cn-grid);
      margin: 0;
      position: relative;
      box-sizing: border-box;
      min-height: calc(var(--cn-gap) * 4);
    }
    
    :host(:not([reply])) {
      margin-left: var(--cn-gap);
    }
    
    :host(:not([reply])):after {
      content: "";
      position: absolute;
      top: 0;
      border-style: solid;
      border-color: transparent var(--color-bubble);
      left: calc(-1 * var(--cn-gap));
      border-width: 0 var(--cn-gap) var(--cn-gap) 0;
      bottom: auto;
    }
    
    :host([reply]) {
      background: var(--color-reply-bubble);
      color: var(--color-on-reply-bubble);
      border-radius: var(--cn-border-radius-medium) 0px var(--cn-border-radius-medium) var(--cn-border-radius-medium);
      margin-right: var(--cn-gap);
    }
    
    :host([reply]):after {
      content: "";
      position: absolute;
      top: 0;
      border-style: solid;
      border-color: transparent var(--color-reply-bubble);
      right: calc(-1 * var(--cn-gap));
      border-width: 0 0 var(--cn-gap) var(--cn-gap);
      bottom: auto;
    }

    /* Content styling */
    ::slotted(*:first-child) {
      margin-top: 0;
    }

    ::slotted(.toolbar) {
      padding-left: 0;
      padding-right: 0;
    }

    ::slotted(.toolbar:first-child) {
      /* If a toolbar is the first child, it should not have a top margin/padding */
      margin-top: calc(-1 * var(--cn-gap));
    }

    ::slotted(.toolbar:last-child) {
      /* If a toolbar is the last child, it should not have a bottom margin/padding */
      margin-bottom: calc(-1 * var(--cn-grid));
    }
  `;

  @property({ type: Boolean, reflect: true })
  public reply = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'article');
  }

  public render() {
    return html`<slot></slot>`;
  }
}

// Make this available to react/preact/solid
declare global {
  interface HTMLElementTagNameMap {
    'cn-bubble': CnBubble;
  }
  /* eslint-disable @typescript-eslint/no-namespace */
  namespace JSX {
    interface IntrinsicElements {
      'cn-bubble': CnBubble;
    }
  }
}
