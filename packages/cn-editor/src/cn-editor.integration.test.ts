import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import type { CnEditor } from './cn-editor.js';

// Import the test version that has access to protected methods
import './cn-editor.test.js'; // This registers the test-cn-editor component

describe('CnEditor Form Integration Demo', () => {
  let form: HTMLFormElement;
  let editor: CnEditor;
  let submitButton: HTMLButtonElement;

  beforeEach(async () => {
    document.body.innerHTML = '';
    
    // Create a form similar to what would be used in real applications
    form = document.createElement('form');
    form.innerHTML = `
      <test-cn-editor name="content" required placeholder="Enter content..."></test-cn-editor>
      <button type="submit">Submit</button>
    `;
    
    document.body.appendChild(form);
    
    editor = form.querySelector('test-cn-editor') as CnEditor;
    submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    
    await customElements.whenDefined('test-cn-editor');
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Bug Fix Verification', () => {
    it('should emit input and change events when value is set programmatically (Bug Fix)', async () => {
      const inputEvents: Event[] = [];
      const changeEvents: Event[] = [];
      
      editor.addEventListener('input', (e) => inputEvents.push(e));
      editor.addEventListener('change', (e) => changeEvents.push(e));
      
      // This is the scenario from the bug report - setting value programmatically
      editor.value = 'programmatically set content';
      
      await new Promise((resolve) => setTimeout(resolve, 0));
      
      // Before the fix: these events would NOT be emitted
      // After the fix: these events ARE emitted
      expect(inputEvents).toHaveLength(1);
      expect(changeEvents).toHaveLength(1);
      expect(inputEvents[0].bubbles).toBe(true);
      expect(changeEvents[0].bubbles).toBe(true);
    });

    it('should emit blur event when focus leaves (Bug Fix)', async () => {
      const blurEvents: Event[] = [];
      editor.addEventListener('blur', (e) => blurEvents.push(e));
      
      // Simulate focus leaving the editor
      const focusOutEvent = new FocusEvent('focusout', { relatedTarget: submitButton });
      (editor as unknown as { simulateFocusOut: (event: FocusEvent) => void }).simulateFocusOut(focusOutEvent);
      
      // Before the fix: blur event would NOT be emitted
      // After the fix: blur event IS emitted
      expect(blurEvents).toHaveLength(1);
      expect(blurEvents[0].bubbles).toBe(true);
    });

    it('should support HTML5 required validation (Bug Fix)', async () => {
      // The editor should be invalid when required and empty
      editor.value = '';
      await new Promise((resolve) => setTimeout(resolve, 0));
      
      // Check internal validation state
      const mockInternals = (editor as unknown as { getInternals: () => { setValidity: any; setFormValue: any } }).getInternals();
      expect(mockInternals.setValidity).toHaveBeenCalledWith(
        { valueMissing: true },
        'Please fill out this field.',
        expect.anything()
      );
      
      // Add content and check it becomes valid
      editor.value = 'valid content';
      await new Promise((resolve) => setTimeout(resolve, 0));
      
      expect(mockInternals.setValidity).toHaveBeenCalledWith({});
    });

    it('should work with form validation patterns (Integration)', async () => {
      // Before setting content, editor should be invalid (required but empty)
      editor.value = '';
      await new Promise((resolve) => setTimeout(resolve, 0));
      
      let mockInternals = (editor as unknown as { getInternals: () => { setValidity: any; setFormValue: any } }).getInternals();
      expect(mockInternals.setValidity).toHaveBeenCalledWith(
        { valueMissing: true },
        'Please fill out this field.',
        expect.anything()
      );
      
      // Set content programmatically (this was the main bug)
      editor.value = 'form content';
      await new Promise((resolve) => setTimeout(resolve, 0));
      
      // Should now be valid and have form value set
      mockInternals = (editor as unknown as { getInternals: () => { setValidity: any; setFormValue: any } }).getInternals();
      expect(mockInternals.setFormValue).toHaveBeenCalledWith('form content');
      expect(mockInternals.setValidity).toHaveBeenCalledWith({});
    });

    it('should work with Playwright-style interaction patterns', async () => {
      // This simulates what Playwright would do when using page.fill()
      const inputSpy = vi.fn();
      const changeSpy = vi.fn();
      
      editor.addEventListener('input', inputSpy);
      editor.addEventListener('change', changeSpy);
      
      // Simulate Playwright setting the value
      editor.value = 'playwright content';
      
      // Simulate focus leaving (which Playwright might trigger)
      const focusOutEvent = new FocusEvent('focusout', { relatedTarget: null });
      (editor as unknown as { simulateFocusOut: (event: FocusEvent) => void }).simulateFocusOut(focusOutEvent);
      
      await new Promise((resolve) => setTimeout(resolve, 0));
      
      // All events should have been fired automatically
      expect(inputSpy).toHaveBeenCalled();
      expect(changeSpy).toHaveBeenCalled();
    });
  });

  describe('Form Workflow Examples', () => {
    it('should handle typical form submission workflow', async () => {
      const formEvents: Event[] = [];
      
      // Listen for all form-related events
      ['input', 'change', 'blur'].forEach(eventType => {
        editor.addEventListener(eventType, (e) => {
          formEvents.push(e);
        });
      });
      
      // Step 1: User (or code) sets content
      editor.value = 'User content';
      await new Promise((resolve) => setTimeout(resolve, 0));
      
      // Step 2: User tabs away from field
      (editor as unknown as { simulateFocusOut: (event: FocusEvent) => void }).simulateFocusOut(new FocusEvent('focusout', { relatedTarget: submitButton }));
      
      // Should have input, change, and blur events
      const eventTypes = formEvents.map(e => e.type);
      expect(eventTypes).toContain('input');
      expect(eventTypes).toContain('change');
      expect(eventTypes).toContain('blur');
    });

    it('should maintain form state consistency', async () => {
      const mockInternals = (editor as unknown as { getInternals: () => { setValidity: any; setFormValue: any } }).getInternals();
      
      // Initially invalid (required but empty)
      expect(editor.required).toBe(true);
      editor.value = '';
      await new Promise((resolve) => setTimeout(resolve, 0));
      
      expect(mockInternals.setValidity).toHaveBeenCalledWith(
        { valueMissing: true },
        'Please fill out this field.',
        expect.anything()
      );
      
      // Add content - becomes valid
      editor.value = 'valid content';
      await new Promise((resolve) => setTimeout(resolve, 0));
      
      expect(mockInternals.setFormValue).toHaveBeenCalledWith('valid content');
      expect(mockInternals.setValidity).toHaveBeenCalledWith({});
      
      // Clear content - becomes invalid again
      editor.value = '';
      await new Promise((resolve) => setTimeout(resolve, 0));
      
      expect(mockInternals.setValidity).toHaveBeenCalledWith(
        { valueMissing: true },
        'Please fill out this field.',
        expect.anything()
      );
    });
  });
});
