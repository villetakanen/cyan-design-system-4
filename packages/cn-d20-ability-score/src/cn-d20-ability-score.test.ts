import { describe, expect, it } from 'vitest';
import type { CnD20AbilityScore } from './cn-d20-ability-score';

import './cn-d20-ability-score';

describe('cn-d20-ability-score', () => {
  it('should render', () => {
    document.body.innerHTML = '<cn-d20-ability-score></cn-d20-ability-score>';
    const el = document.body.querySelector('cn-d20-ability-score');
    expect(el).not.toBeNull();
  });

  it('should have default properties', async () => {
    document.body.innerHTML = '<cn-d20-ability-score></cn-d20-ability-score>';
    const el = document.body.querySelector<CnD20AbilityScore>(
      'cn-d20-ability-score',
    );
    await customElements.whenDefined('cn-d20-ability-score');
    expect(el?.base).toBe(10);
    expect(el?.interactive).toBe(false);
    expect(el?.min).toBe(1);
    expect(el?.max).toBe(30);
  });

  it('should calculate modifier correctly', async () => {
    document.body.innerHTML =
      '<cn-d20-ability-score base="15"></cn-d20-ability-score>';
    const el = document.body.querySelector<CnD20AbilityScore>(
      'cn-d20-ability-score',
    );
    await customElements.whenDefined('cn-d20-ability-score');
    await el?.updateComplete;

    if (!el) throw new Error('Element is null');

    // Access private method for testing through type assertion
    const modifier = (
      el as unknown as { _calculateModifier: () => number }
    )._calculateModifier();
    expect(modifier).toBe(2); // (15 - 10) / 2 = 2.5, floored to 2
  });

  it('should render display mode correctly', async () => {
    document.body.innerHTML =
      '<cn-d20-ability-score base="14"></cn-d20-ability-score>';
    const el = document.body.querySelector<CnD20AbilityScore>(
      'cn-d20-ability-score',
    );
    await customElements.whenDefined('cn-d20-ability-score');
    await el?.updateComplete;

    const modifier = el?.shadowRoot?.querySelector('.modifier');
    const baseScore = el?.shadowRoot?.querySelector('.base-score');

    expect(modifier?.textContent).toBe('+2');
    expect(baseScore?.textContent).toBe('14');
  });

  it('should render negative modifier correctly', async () => {
    document.body.innerHTML =
      '<cn-d20-ability-score base="8"></cn-d20-ability-score>';
    const el = document.body.querySelector<CnD20AbilityScore>(
      'cn-d20-ability-score',
    );
    await customElements.whenDefined('cn-d20-ability-score');
    await el?.updateComplete;

    const modifier = el?.shadowRoot?.querySelector('.modifier');
    expect(modifier?.textContent).toBe('-1');
  });

  it('should render interactive mode', async () => {
    document.body.innerHTML =
      '<cn-d20-ability-score interactive base="12"></cn-d20-ability-score>';
    const el = document.body.querySelector<CnD20AbilityScore>(
      'cn-d20-ability-score',
    );
    await customElements.whenDefined('cn-d20-ability-score');
    await el?.updateComplete;

    const input = el?.shadowRoot?.querySelector(
      'input.base-score',
    ) as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input?.value).toBe('12');
  });

  it('should handle input changes and dispatch events', async () => {
    document.body.innerHTML =
      '<cn-d20-ability-score interactive base="10"></cn-d20-ability-score>';
    const el = document.body.querySelector<CnD20AbilityScore>(
      'cn-d20-ability-score',
    );
    await customElements.whenDefined('cn-d20-ability-score');
    await el?.updateComplete;

    let eventFired = false;
    let eventDetail: { base: number; modifier: number } | null = null;

    el?.addEventListener('score-change', (event: unknown) => {
      eventFired = true;
      eventDetail = (event as CustomEvent).detail;
    });

    const input = el?.shadowRoot?.querySelector(
      'input.base-score',
    ) as HTMLInputElement;
    input.value = '16';
    input.dispatchEvent(new Event('input'));

    await el?.updateComplete;

    expect(eventFired).toBe(true);
    if (!eventDetail) throw new Error('Event detail is null');
    expect((eventDetail as { base: number }).base).toBe(16);
    expect((eventDetail as { modifier: number }).modifier).toBe(3);
    expect(el?.base).toBe(16);
  });

  it('should clamp values to min/max', async () => {
    document.body.innerHTML =
      '<cn-d20-ability-score interactive min="8" max="18"></cn-d20-ability-score>';
    const el = document.body.querySelector<CnD20AbilityScore>(
      'cn-d20-ability-score',
    );
    await customElements.whenDefined('cn-d20-ability-score');
    await el?.updateComplete;

    const input = el?.shadowRoot?.querySelector(
      'input.base-score',
    ) as HTMLInputElement;

    // Test maximum clamping
    input.value = '25';
    input.dispatchEvent(new Event('input'));
    await el?.updateComplete;
    expect(el?.base).toBe(18);
    expect(input.value).toBe('18');

    // Test minimum clamping
    input.value = '3';
    input.dispatchEvent(new Event('input'));
    await el?.updateComplete;
    expect(el?.base).toBe(8);
    expect(input.value).toBe('8');
  });
});
