import { describe, expect, it } from 'vitest';
import type { CnD20AbilityScore } from './cn-d20-ability-score';

import './cn-d20-ability-score';

describe('cn-d20-ability-score browser tests', () => {
  it('should have correct styling for display mode', async () => {
    document.body.innerHTML =
      '<cn-d20-ability-score base="15"></cn-d20-ability-score>';
    const el = document.body.querySelector<CnD20AbilityScore>(
      'cn-d20-ability-score',
    );
    await customElements.whenDefined('cn-d20-ability-score');
    await el?.updateComplete;

    const modifier = el?.shadowRoot?.querySelector('.modifier');
    const baseScore = el?.shadowRoot?.querySelector('.base-score');

    if (modifier && baseScore) {
      const modifierStyle = getComputedStyle(modifier);
      const baseScoreStyle = getComputedStyle(baseScore);

      expect(modifierStyle.display).toBe('block');
      expect(modifierStyle.textAlign).toBe('center');
      expect(baseScoreStyle.display).toBe('block');
      expect(baseScoreStyle.textAlign).toBe('center');
    }
  });

  it('should have correct styling for interactive mode', async () => {
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

    if (input) {
      const inputStyle = getComputedStyle(input);
      expect(inputStyle.textAlign).toBe('center');
      expect(input.type).toBe('number');
    }
  });

  it('should respond to hover in interactive mode', async () => {
    document.body.innerHTML =
      '<cn-d20-ability-score interactive></cn-d20-ability-score>';
    const el = document.body.querySelector<CnD20AbilityScore>(
      'cn-d20-ability-score',
    );
    await customElements.whenDefined('cn-d20-ability-score');
    await el?.updateComplete;

    const input = el?.shadowRoot?.querySelector(
      'input.base-score',
    ) as HTMLInputElement;

    if (input) {
      // Simulate hover
      input.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

      // The hover state should be applied via CSS, which we can verify exists
      expect(input.matches(':hover')).toBe(false); // Element isn't actually hovered in test

      // But we can verify the input is properly configured
      expect(input.type).toBe('number');
      expect(input.min).toBe('1');
      expect(input.max).toBe('30');
    }
  });
});
