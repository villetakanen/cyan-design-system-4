import { describe, expect, it } from 'vitest';
import { CyanButton } from '../src/cyan-button.js';

describe('CyanButton', () => {
  it('should create an instance', () => {
    const element = new CyanButton();
    expect(element).toBeInstanceOf(CyanButton);
  });

  it('should have default label', () => {
    const element = new CyanButton();
    expect(element.label).toBe('Button');
  });

  it('should accept custom label', () => {
    const element = new CyanButton();
    element.label = 'Custom Button';
    expect(element.label).toBe('Custom Button');
  });
});
