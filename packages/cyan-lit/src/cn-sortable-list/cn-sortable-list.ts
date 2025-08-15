import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface CnListItem {
  key: string;
  title: string;
}

@customElement('cn-sortable-list')
export class CnSortableList extends LitElement {
  static styles = css`
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--cn-grid);
    }
    .item {
      display: flex;
      align-items: center;
      gap: var(--cn-grid);
      padding: var(--cn-grid);
      border: 1px solid var(--color-border);
      border-radius: var(--cn-border-radius-small);
      background-color: var(--color-surface);
      cursor: grab;
    }
    .item:hover {
      background-color: var(--color-surface-3);
    }
    .item:active {
      background-color: var(--color-surface-1);
      cursor: grabbing;
    }
  `;

  @property({ type: Array })
  items: CnListItem[] = [];

  render() {
    return html`
      <ul>
        ${this.items.map(
          (item, index) => html`
            <li
              class="item"
              draggable="true"
              @dragstart=${(e: DragEvent) => this._onDragStart(e, index)}
              @dragover=${this._onDragOver}
              @drop=${(e: DragEvent) => this._onDrop(e, index)}
            >
              <cn-icon noun="drag"></cn-icon>
              <span class="title">${item.title}</span>
            </li>
          `,
        )}
      </ul>
    `;
  }

  private _onDragStart(e: DragEvent, index: number) {
    if (e.dataTransfer) {
      e.dataTransfer.setData('text/plain', index.toString());
    }
  }

  private _onDragOver(e: DragEvent) {
    e.preventDefault();
  }

  private _onDrop(e: DragEvent, dropIndex: number) {
    e.preventDefault();
    const dataTransfer = e.dataTransfer;
    if (!dataTransfer) {
      return;
    }
    const dragIndex = Number.parseInt(dataTransfer.getData('text/plain'));
    if (dragIndex >= 0 && dragIndex !== dropIndex) {
      const updatedItems = [...this.items];
      const [removed] = updatedItems.splice(dragIndex, 1);
      updatedItems.splice(dropIndex, 0, removed);
      this.items = updatedItems;
      this.dispatchEvent(
        new CustomEvent('items-changed', {
          detail: { items: this.items },
        }),
      );
    }
  }
}
