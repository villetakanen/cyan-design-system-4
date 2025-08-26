import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A navigation icon is a clickable icon that is used to navigate to a different page or
 * section of the application. It's intended to be used in application rail and bar navigation.
 *
 * The element is 56x56 pixels by default, but can be resized using the
 * `--cn-navigation-icon-size` CSS variable. Do note, that the contents are intentionally
 * smaller that the clickable area in size to create a visual effect when hovered over.
 *
 * When the `notification` property is set with a non-empty string, a pill-shaped indicator
 * appears at the lower-left corner of the icon to show notification count or status.
 */
@customElement('cn-navigation-icon')
export class CnNavigationIcon extends LitElement {
  public static styles = css`
    :host {
      display: flex;
      position: relative;
      height: var(--cn-navigation-button-size);
      width: var(--cn-navigation-button-size);
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    :host([label]) {
      justify-content: flex-start;
    }
    :host cn-icon {
      color: var(--color-on-rail-button);
      position: relative;
    }
    :host(:active) cn-icon,
    :host([active]) cn-icon{
      color: var(--color-text-high);
    }
    :host cn-icon::before {
      background: transparent;
      border-radius: 50%;
      content: '';
      display: block;
      position: absolute;
      height: var(--cn-navigation-icon-size);
      width: var(--cn-navigation-icon-size);
      z-index: -1;
      top: 0;
      left: 0;
      transition: background 0.2s ease;
    }
    :host([label]) cn-icon {
      margin-top: var(--cn-grid);
    }
    :host([label]) cn-icon::before {
      top: calc(-1.5 * var(--cn-grid));
      left: calc(-1.5 * var(--cn-grid));
    }
    :host([label='']) cn-icon::before {
      top: calc(-1 * var(--cn-grid));
      left: calc((-2 + 1.125) * var(--cn-grid));
    }

    :host(:hover) cn-icon::before {
      background: var(--color-surface-2);
    }
    
    :host(:active) cn-icon::before,
    :host([active]) cn-icon::before {
      background: var(--color-surface-1);
    }
    :host .navigation-icon-label {
      height: var(--cn-navigation-icon-label-height, calc(var(--cn-grid, 0.5rem) * 2));
      font-size: var(--cn-text-small-font-size, calc(var(--cn-grid, 0.5rem) / 8 * 14));
      line-height: var(--cn-navigation-icon-label-height, calc(var(--cn-grid, 0.5rem) * 2));
      display: block;
      text-align: center;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      text-decoration: none;
      flex-shrink: 0;
      padding-top: calc(var(--cn-grid));
      color: var(--color-text);
    }
    
    :host .notification-pill {
      position: absolute;
      bottom: calc(var(--cn-grid) * 1.5);
      right: calc(var(--cn-grid) * 1.5);
      background: var(--cn-notification-pill-background, var(--color-notify));
      color: var(--cn-notification-pill-color, var(--color-on-notify));
      font-size: var(--cn-notification-pill-font-size, var(--cn-caption-font-size));
      line-height: 1;
      padding: var(--cn-notification-pill-padding, calc(var(--cn-grid) * 0.25) calc(var(--cn-grid) * 0.5));
      border-radius: var(--cn-notification-pill-border-radius, calc(var(--cn-grid) * 1.5));
      min-width: var(--cn-notification-pill-min-width, calc(var(--cn-grid) * 1.5));
      text-align: center;
      font-weight: var(--cn-notification-pill-font-weight, 500);
      box-sizing: border-box;
      z-index: 1;
    }
    
    :host([label]) .notification-pill {
      bottom: calc(var(--cn-grid) * 3.5);
    }
  `;

  @property({ type: String, reflect: true })
  public noun = '';

  @property({ type: String, reflect: true })
  public label = '';

  @property({ type: Boolean, reflect: true })
  public active = false;

  @property({ type: String, reflect: true })
  public notification = '';

  public render() {
    const hasLabel = this.label !== '';
    const hasNotification =
      this.notification && this.notification.trim() !== '';

    return html`<cn-icon noun="${this.noun}" ?small=${hasLabel}></cn-icon> 
    ${
      this.label
        ? html`
      <div class="navigation-icon-label">${this.label}</div>`
        : ''
    }
    ${
      hasNotification
        ? html`
      <div class="notification-pill">${this.notification}</div>`
        : ''
    }`;
  }
}
