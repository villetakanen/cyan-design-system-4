import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import './cn-snackbar.ts';
import type { CnSnackbar, SnackbarMessage } from './cn-snackbar.ts';

describe('CnSnackbar', () => {
  let element: CnSnackbar;

  beforeEach(() => {
    element = document.createElement('cn-snackbar') as CnSnackbar;
    document.body.appendChild(element);
    vi.useFakeTimers();
  });

  afterEach(() => {
    document.body.removeChild(element);
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(HTMLElement);
  });

  it('should not be visible by default', () => {
    expect(element.visible).toBe(false);
    expect(element.snackStack.length).toBe(0);
  });

  it('should show a snackbar when cn-snackbar-add event is dispatched', async () => {
    const message: SnackbarMessage = { message: 'Test message' };
    document.dispatchEvent(
      new CustomEvent('cn-snackbar-add', { detail: message }),
    );

    await element.updateComplete;
    expect(element.snackStack.length).toBe(1);
    expect(element.visible).toBe(true);
    expect(element.shadowRoot?.textContent).toContain('Test message');
  });

  it('should hide the snackbar after 5 seconds if no action is present', async () => {
    const message: SnackbarMessage = { message: 'Test message' };
    document.dispatchEvent(
      new CustomEvent('cn-snackbar-add', { detail: message }),
    );

    await element.updateComplete;
    expect(element.visible).toBe(true);

    vi.advanceTimersByTime(5000);
    await element.updateComplete;
    expect(element.visible).toBe(false);

    vi.advanceTimersByTime(300); // Wait for transition
    await element.updateComplete;
    expect(element.snackStack.length).toBe(0);
  });

  it('should not hide the snackbar automatically if an action is present', async () => {
    const actionCallback = vi.fn();
    const message: SnackbarMessage = {
      message: 'Test message with action',
      action: { label: 'Action', callback: actionCallback },
    };
    document.dispatchEvent(
      new CustomEvent('cn-snackbar-add', { detail: message }),
    );

    await element.updateComplete;
    expect(element.visible).toBe(true);

    vi.advanceTimersByTime(5000);
    await element.updateComplete;
    expect(element.visible).toBe(true); // Should still be visible
    expect(element.snackStack.length).toBe(1);
  });

  it('should execute action callback and hide snackbar when action button is clicked', async () => {
    const actionCallback = vi.fn();
    const message: SnackbarMessage = {
      message: 'Test message with action',
      action: { label: 'Action', callback: actionCallback },
    };
    document.dispatchEvent(
      new CustomEvent('cn-snackbar-add', { detail: message }),
    );

    await element.updateComplete;
    const actionButton = element.shadowRoot?.querySelector('button');
    expect(actionButton).toBeTruthy();

    actionButton?.click();
    await element.updateComplete;

    expect(actionCallback).toHaveBeenCalledTimes(1);
    expect(element.visible).toBe(false);

    vi.advanceTimersByTime(300); // Wait for transition
    await element.updateComplete;
    expect(element.snackStack.length).toBe(0);
  });

  it('should show next message in stack after current one is dismissed', async () => {
    const message1: SnackbarMessage = { message: 'Message 1' };
    const message2: SnackbarMessage = { message: 'Message 2' };

    document.dispatchEvent(
      new CustomEvent('cn-snackbar-add', { detail: message1 }),
    );
    await element.updateComplete;
    expect(element.snackStack.length).toBe(1);
    expect(element.shadowRoot?.textContent).toContain('Message 1');

    document.dispatchEvent(
      new CustomEvent('cn-snackbar-add', { detail: message2 }),
    );
    await element.updateComplete;
    expect(element.snackStack.length).toBe(2);
    expect(element.shadowRoot?.textContent).toContain('Message 1'); // Still showing message 1

    vi.advanceTimersByTime(5000); // Dismiss message 1
    await element.updateComplete;
    vi.advanceTimersByTime(300); // Wait for transition
    await element.updateComplete;

    expect(element.snackStack.length).toBe(1);
    expect(element.shadowRoot?.textContent).toContain('Message 2');
    expect(element.visible).toBe(true);

    vi.advanceTimersByTime(5000); // Dismiss message 2
    await element.updateComplete;
    vi.advanceTimersByTime(300); // Wait for transition
    await element.updateComplete;
    expect(element.snackStack.length).toBe(0);
    expect(element.visible).toBe(false);
  });

  it('should remove event listener on disconnectedCallback', async () => {
    const message: SnackbarMessage = { message: 'Test message' };
    const addSpy = vi.spyOn(element, 'handleAdd');

    element.disconnectedCallback();
    document.dispatchEvent(
      new CustomEvent('cn-snackbar-add', { detail: message }),
    );

    expect(addSpy).not.toHaveBeenCalled();
    addSpy.mockRestore();
  });
});
