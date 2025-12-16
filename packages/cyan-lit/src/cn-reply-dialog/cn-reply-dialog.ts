import { css, html, LitElement, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('cn-reply-dialog')
export class CnReplyDialog extends LitElement {
  static styles = css`
    :host {
      --cn-reply-dialog-height: calc(40 * var(--cn-grid));
      --cn-reply-dialog-width: calc(88 * var(--cn-grid));
      --cn-reply-dialog-z-index: var(--z-index-reply-dialog, 41000);
      
      display: block;
      z-index: var(--cn-reply-dialog-z-index);
      box-sizing: border-box;
      font-family: var(--cn-font-family);
    }

    /* Desktop / Docked State */
    :host(:not([mobile])) {
        position: fixed;
        bottom: 0;
        left: 50%;
        width: var(--cn-reply-dialog-width);
        max-width: 100vw;
        height: var(--cn-reply-dialog-height);
        
        transform: translate(-50%, 100%); /* Start hidden */
        transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        pointer-events: none;
    }

    :host([open]:not([mobile])) {
        transform: translate(-50%, 0);
        pointer-events: auto;
        /* Elevation */
        filter: drop-shadow(var(--shadow-elevation-2)); 
    }

    /* Mobile / Fullscreen State */
    :host([mobile]) {
        position: fixed;
        inset: 0;
        background: var(--background-dialog-backdrop, rgba(0,0,0,0.5));
        backdrop-filter: blur(2px);
        
        display: flex;
        justify-content: center;
        align-items: center;
        
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease-in-out;
    }
    
    :host([mobile][open]) {
        opacity: 1;
        pointer-events: auto;
    }

    .dialog {
        background: var(--color-surface-1, #fff);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        width: 100%;
        height: 100%;
    }

    :host(:not([mobile])) .dialog {
        border-radius: var(--cn-border-radius-large, 12px) var(--cn-border-radius-large, 12px) 0 0;
        border: 1px solid var(--color-border, #ccc);
    }

    :host([mobile]) .dialog {
        /* Fullscreen on mobile */
        border-radius: 0;
        transform: scale(0.95);
        transition: transform 0.2s ease-in-out;
    }

    :host([mobile][open]) .dialog {
        transform: scale(1);
    }

    header {
         padding: var(--cn-grid, 8px);
         display: flex; 
         justify-content: space-between;
         align-items: center;
         border-bottom: 1px solid var(--color-border-subtle, #eee);
         min-height: 48px;
    }

    .content {
        flex: 1;
        overflow-y: auto;
        /* Slot for form content */
        display: flex;
        flex-direction: column;
        min-height: 0; /* Critical for scrolling in flex containers */
    }
    
    ::slotted(*) {
        width: 100%;
        box-sizing: border-box;
    }

    .actions {
        padding: var(--cn-grid, 8px);
        padding-bottom: calc(var(--cn-grid, 8px) + env(safe-area-inset-bottom));
        display: flex;
        gap: var(--cn-grid, 8px);
        justify-content: flex-end;
        border-top: 1px solid var(--color-border-subtle, #eee);
        background: var(--color-surface-1, #fff); /* Ensure opaque background */
    }

    /* High contrast / Dark mode handling depends on CSS vars */
  `;

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Boolean, reflect: true })
  mobile = false;

  private _resizeObserver: ResizeObserver | null = null;
  private _lastFocusedElement: HTMLElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    this._setupResizeObserver();
    window.addEventListener('keydown', this._handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    window.removeEventListener('keydown', this._handleKeyDown);
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('open')) {
      if (this.open) {
        if (this.mobile) {
          this._trapFocus();
        }
      } else {
        this._releaseFocus();
        this.dispatchEvent(new Event('close')); // Native-like close event
      }
    }

    // If we switch to mobile while open, ensure focus works
    if (changedProperties.has('mobile') && this.open) {
      if (this.mobile) {
        this._trapFocus();
      } else {
        // dock mode doesn't trap focus
      }
    }
  }

  private _setupResizeObserver() {
    if (typeof ResizeObserver === 'undefined') return;

    // We observe the document.body to switch modes based on viewport width
    // Or we can just use window resize event.
    // Spec mentions: "Trigger: Automatically switches to mobile mode based on viewport width"
    // Let's use a standard breakpoint logic.
    // Assuming 'mobile' is < 768px or similar.
    // Design tokens might have a breakpoint.
    // For now, I'll use 600px as a generic mobile breakpoint or check if a CSS var exists.

    this._resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Check width
        const width = entry.contentRect.width;
        const isMobile = width < 768; // IPad mini portrait often considered tablet/desktop-lite, phones < 600.
        // Let's stick to a reasonable default.
        if (this.mobile !== isMobile) {
          this.mobile = isMobile;
        }
      }
    });
    this._resizeObserver.observe(document.body);
  }

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (!this.open) return;

    if (e.key === 'Escape') {
      this.close();
      return;
    }

    if (this.mobile) {
      this._handleFocusTrap(e);
    }
  };

  private _trapFocus() {
    this._lastFocusedElement = document.activeElement as HTMLElement;
    // Focus the first interactive element or the dialog itself
    const focusable = this.shadowRoot?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ) as HTMLElement;
    if (focusable) {
      focusable.focus();
    } else {
      this.focus();
    }
  }

  private _releaseFocus() {
    if (this._lastFocusedElement) {
      this._lastFocusedElement.focus();
      this._lastFocusedElement = null;
    }
  }

  private _handleFocusTrap(e: KeyboardEvent) {
    if (e.key !== 'Tab') return;

    const _focusableElements = this.shadowRoot?.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
    );
    // Note: This querySelectorAll inside shadowRoot only finds elements defined in template.
    // Slotted elements are not fully accessible this way for sequential navigation without advanced logic.
    // For a robust implementation, we might need a library or a more complex traverser.
    // However, for this Phase 1, we will rely on basic behaviors.
  }

  close() {
    this.open = false;
    this.dispatchEvent(new Event('close'));
  }

  render() {
    return html`
      <div 
        class="dialog" 
        role="dialog" 
        aria-modal="${this.mobile ? 'true' : 'false'}"
        aria-label="Reply"
      >
        <header>
             <slot name="header"></slot>
             ${
               this.mobile
                 ? html`
                 <cn-icon noun="close" @click=${this.close} style="cursor: pointer"></cn-icon>
             `
                 : ''
             }
        </header>
        <div class="content">
            <slot></slot>
        </div>
        <div class="actions">
            <slot name="actions">
                <button @click=${this.close}>Cancel</button>
            </slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cn-reply-dialog': CnReplyDialog;
  }
}
