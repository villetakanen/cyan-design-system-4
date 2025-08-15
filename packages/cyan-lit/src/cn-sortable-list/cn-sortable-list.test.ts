import { describe, expect, it } from 'vitest';
import './cn-sortable-list.js';
import type { CnSortableList } from './cn-sortable-list.js';

describe('CnSortableList', () => {
  it('should be defined', () => {
    const element = document.createElement('cn-sortable-list');
    expect(element).toBeInstanceOf(HTMLElement);
  });

  it('should render a list of items', async () => {
    const element = document.createElement(
      'cn-sortable-list',
    ) as CnSortableList;
    element.items = [
      { key: '1', title: 'Item 1' },
      { key: '2', title: 'Item 2' },
      { key: '3', title: 'Item 3' },
    ];
    document.body.appendChild(element);

    await customElements.whenDefined('cn-sortable-list');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const items = element.shadowRoot?.querySelectorAll('li');
    expect(items?.length).toBe(3);

    document.body.removeChild(element);
  });

  it('should reorder items on drop', async () => {
    const element = document.createElement(
      'cn-sortable-list',
    ) as CnSortableList;
    element.items = [
      { key: '1', title: 'Item 1' },
      { key: '2', title: 'Item 2' },
      { key: '3', title: 'Item 3' },
    ];
    document.body.appendChild(element);

    await customElements.whenDefined('cn-sortable-list');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const dragIndex = 0;
    const dropIndex = 2;

    const dataTransfer = new DataTransfer();
    dataTransfer.setData('text/plain', dragIndex.toString());

    const dragStartEvent = new DragEvent('dragstart', { dataTransfer });
    const dropEvent = new DragEvent('drop', { dataTransfer });

    const itemToDrag = element.shadowRoot?.querySelectorAll('li')[dragIndex];
    const dropTarget = element.shadowRoot?.querySelectorAll('li')[dropIndex];

    itemToDrag?.dispatchEvent(dragStartEvent);
    dropTarget?.dispatchEvent(dropEvent);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.items[0].key).toBe('2');
    expect(element.items[1].key).toBe('3');
    expect(element.items[2].key).toBe('1');

    document.body.removeChild(element);
  });
});
