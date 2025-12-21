import { describe, expect, it, vi } from 'vitest';
import { CnReplyDialog } from './cn-reply-dialog';
import './cn-reply-dialog';

describe('CnReplyDialog', () => {
  it('should be defined', () => {
    const element = document.createElement('cn-reply-dialog');
    expect(element).toBeInstanceOf(CnReplyDialog);
  });

  it('should be closed by default', () => {
    const element = document.createElement('cn-reply-dialog') as CnReplyDialog;
    expect(element.open).toBe(false);
  });

  it('should reflect mobile property', async () => {
    const element = document.createElement('cn-reply-dialog') as CnReplyDialog;
    element.mobile = true;
    document.body.appendChild(element);
    await element.updateComplete;
    expect(element.hasAttribute('mobile')).toBe(true);
    element.remove();
  });

  it('should dispatch close event when close is called', async () => {
    const element = document.createElement('cn-reply-dialog') as CnReplyDialog;
    const spy = vi.fn();
    element.addEventListener('close', spy);
    element.open = true;
    element.close();
    expect(spy).toHaveBeenCalled();
    expect(element.open).toBe(false);
  });

  it('should render actions slot in desktop mode', async () => {
    const element = document.createElement('cn-reply-dialog') as CnReplyDialog;
    const button = document.createElement('button');
    button.textContent = 'Submit';
    button.slot = 'actions';
    element.appendChild(button);
    element.mobile = false;
    element.open = true;
    document.body.appendChild(element);
    await element.updateComplete;

    const actionsDiv = element.shadowRoot?.querySelector('.actions');
    expect(actionsDiv).toBeTruthy();

    element.remove();
  });

  it('should render actions slot in mobile mode', async () => {
    const element = document.createElement('cn-reply-dialog') as CnReplyDialog;
    const button = document.createElement('button');
    button.textContent = 'Submit';
    button.slot = 'actions';
    element.appendChild(button);
    element.mobile = true;
    element.open = true;
    document.body.appendChild(element);
    await element.updateComplete;

    const actionsDiv = element.shadowRoot?.querySelector('.actions');
    expect(actionsDiv).toBeTruthy();

    element.remove();
  });
});
