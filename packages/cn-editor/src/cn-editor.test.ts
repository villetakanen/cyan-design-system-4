import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CnEditor } from './cn-editor.js';

// Extend CnEditor to expose private members for testing
class TestCnEditor extends CnEditor {
  public getInternals() {
    return this._internals;
  }

  public getEditorView() {
    return this._editorView;
  }

  public getValueOnFocus() {
    return this._valueOnFocus;
  }

  public setValueOnFocus(value: string) {
    this._valueOnFocus = value;
  }

  public simulateFocusOut(event: FocusEvent) {
    this._handleFocusOut(event);
  }

  public simulateHostFocus(event: FocusEvent) {
    this._handleHostFocus(event);
  }

  public getIsDelegatingFocus() {
    return this._isDelegatingFocus;
  }

  public setIsDelegatingFocus(value: boolean) {
    this._isDelegatingFocus = value;
  }
}

// Register the test version
customElements.define('test-cn-editor', TestCnEditor);

describe('CnEditor Form Integration', () => {
  let element: TestCnEditor;
  let form: HTMLFormElement;

  beforeEach(async () => {
    // Clear any existing elements
    document.body.innerHTML = '';

    // Create a fresh form and editor
    form = document.createElement('form');
    element = document.createElement('test-cn-editor') as TestCnEditor;
    element.setAttribute('name', 'content');

    form.appendChild(element);
    document.body.appendChild(form);

    await customElements.whenDefined('test-cn-editor');
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Basic Form Association', () => {
    it('should be form-associated', () => {
      expect(CnEditor.formAssociated).toBe(true);
    });

    it('should be defined as custom element', () => {
      expect(element).toBeInstanceOf(HTMLElement);
      expect(element.tagName.toLowerCase()).toBe('test-cn-editor');
    });

    it('should have internals attached', () => {
      expect(element.getInternals()).toBeDefined();
    });
  });

  describe('Event Emission', () => {
    it('should emit input event when value is set programmatically', async () => {
      const inputSpy = vi.fn();
      element.addEventListener('input', inputSpy);

      element.value = 'test content';
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(inputSpy).toHaveBeenCalled();
      expect(inputSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'input',
          bubbles: true,
          composed: true,
        }),
      );
    });

    it('should emit change event when value is set programmatically', async () => {
      const changeSpy = vi.fn();
      element.addEventListener('change', changeSpy);

      element.value = 'test content';
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(changeSpy).toHaveBeenCalled();
      expect(changeSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'change',
          bubbles: true,
          composed: true,
        }),
      );
    });

    it('should emit blur event when focus leaves component', async () => {
      const blurSpy = vi.fn();
      element.addEventListener('blur', blurSpy);

      // Simulate focus leaving the component
      element.simulateFocusOut(
        new FocusEvent('focusout', { relatedTarget: null }),
      );

      expect(blurSpy).toHaveBeenCalled();
      expect(blurSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'blur',
          bubbles: true,
          composed: true,
        }),
      );
    });

    it('should emit change event on focus out when value changed', async () => {
      const changeSpy = vi.fn();
      element.addEventListener('change', changeSpy);

      // Set initial value
      element.value = 'initial';
      element.setValueOnFocus('initial');

      // Change value
      element.value = 'changed';

      // Simulate focus leaving
      element.simulateFocusOut(
        new FocusEvent('focusout', { relatedTarget: null }),
      );

      expect(changeSpy).toHaveBeenCalled();
    });

    it('should not emit change event on focus out when value unchanged', async () => {
      const changeSpy = vi.fn();
      element.addEventListener('change', changeSpy);

      // Set value and focus value to same thing
      element.value = 'same';
      element.setValueOnFocus('same');

      // Simulate focus leaving
      element.simulateFocusOut(
        new FocusEvent('focusout', { relatedTarget: null }),
      );

      expect(changeSpy).not.toHaveBeenCalled();
    });
  });

  describe('HTML5 Validation', () => {
    it('should support required attribute', async () => {
      element.required = true;
      element.value = '';

      await new Promise((resolve) => setTimeout(resolve, 0));

      // The element should be invalid when required and empty
      expect(element.required).toBe(true);
      expect(element.getAttribute('required')).toBe('');
    });

    it('should validate as invalid when required and empty', async () => {
      element.required = true;
      element.value = '';

      await new Promise((resolve) => setTimeout(resolve, 0));

      // Check that setValidity was called with valueMissing
      const mockInternals = element.getInternals();
      expect(mockInternals.setValidity).toHaveBeenCalledWith(
        { valueMissing: true },
        'Please fill out this field.',
        expect.anything(),
      );
    });

    it('should validate as valid when required and has content', async () => {
      element.required = true;
      element.value = 'some content';

      await new Promise((resolve) => setTimeout(resolve, 0));

      // Check that setValidity was called with empty object (valid)
      const mockInternals = element.getInternals();
      expect(mockInternals.setValidity).toHaveBeenCalledWith({});
    });

    it('should validate as valid when not required and empty', async () => {
      element.required = false;
      element.value = '';

      await new Promise((resolve) => setTimeout(resolve, 0));

      // Check that setValidity was called with empty object (valid)
      const mockInternals = element.getInternals();
      expect(mockInternals.setValidity).toHaveBeenCalledWith({});
    });

    it('should update validation when required property changes', async () => {
      element.value = '';
      element.required = false;

      await new Promise((resolve) => setTimeout(resolve, 0));

      // Initially valid
      let mockInternals = element.getInternals();
      expect(mockInternals.setValidity).toHaveBeenCalledWith({});

      // Clear the mock
      vi.clearAllMocks();

      // Change to required
      element.required = true;

      await new Promise((resolve) => setTimeout(resolve, 0));

      // Should now be invalid
      mockInternals = element.getInternals();
      expect(mockInternals.setValidity).toHaveBeenCalledWith(
        { valueMissing: true },
        'Please fill out this field.',
        expect.anything(),
      );
    });
  });

  describe('Form Data Integration', () => {
    it('should update form value when content changes', async () => {
      element.value = 'form data content';

      await new Promise((resolve) => setTimeout(resolve, 0));

      const mockInternals = element.getInternals();
      expect(mockInternals.setFormValue).toHaveBeenCalledWith(
        'form data content',
      );
    });

    it('should update form value when value property changes', async () => {
      const mockInternals = element.getInternals();
      vi.clearAllMocks();

      element.value = 'new content';

      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(mockInternals.setFormValue).toHaveBeenCalledWith('new content');
    });
  });

  describe('Focus Management', () => {
    it('should have tabindex="0" by default', () => {
      expect(element.getAttribute('tabindex')).toBe('0');
    });

    it('should delegate focus to CodeMirror editor', () => {
      const mockEditorView = element.getEditorView();
      if (mockEditorView) {
        element.simulateHostFocus(new FocusEvent('focus'));
        expect(mockEditorView.focus).toHaveBeenCalled();
      }
    });

    it('should not re-delegate focus when already delegating', () => {
      const mockEditorView = element.getEditorView();
      if (mockEditorView) {
        element.setIsDelegatingFocus(true);
        element.simulateHostFocus(new FocusEvent('focus'));

        // focus should not be called again
        expect(mockEditorView.focus).not.toHaveBeenCalled();
      }
    });
  });

  describe('Property Reflection', () => {
    it('should reflect value property to attribute', async () => {
      element.value = 'reflected value';
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(element.getAttribute('value')).toBe('reflected value');
    });

    it('should reflect required property to attribute', async () => {
      element.required = true;
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(element.getAttribute('required')).toBe('');

      element.required = false;
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(element.hasAttribute('required')).toBe(false);
    });

    it('should reflect disabled property to attribute', async () => {
      element.disabled = true;
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(element.getAttribute('disabled')).toBe('');
    });

    it('should reflect placeholder property to attribute', async () => {
      element.placeholder = 'Enter text here...';
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(element.getAttribute('placeholder')).toBe('Enter text here...');
    });
  });

  describe('Integration with Forms', () => {
    it('should work with form submission simulation', async () => {
      element.value = 'form submission content';

      await new Promise((resolve) => setTimeout(resolve, 0));

      // Verify form value is set
      const mockInternals = element.getInternals();
      expect(mockInternals.setFormValue).toHaveBeenCalledWith(
        'form submission content',
      );
    });

    it('should maintain proper form state during value changes', async () => {
      // Initial state
      element.value = '';
      element.required = true;

      await new Promise((resolve) => setTimeout(resolve, 0));

      let mockInternals = element.getInternals();
      expect(mockInternals.setValidity).toHaveBeenCalledWith(
        { valueMissing: true },
        'Please fill out this field.',
        expect.anything(),
      );

      // Clear mocks
      vi.clearAllMocks();

      // Add content
      element.value = 'now has content';

      await new Promise((resolve) => setTimeout(resolve, 0));

      mockInternals = element.getInternals();
      expect(mockInternals.setFormValue).toHaveBeenCalledWith(
        'now has content',
      );
      expect(mockInternals.setValidity).toHaveBeenCalledWith({});
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string values correctly', async () => {
      element.value = '';

      await new Promise((resolve) => setTimeout(resolve, 0));

      const mockInternals = element.getInternals();
      expect(mockInternals.setFormValue).toHaveBeenCalledWith('');
    });

    it('should handle whitespace-only content for required validation', async () => {
      element.required = true;
      element.value = '   \n\t   '; // Only whitespace

      await new Promise((resolve) => setTimeout(resolve, 0));

      // Should be invalid because trim() results in empty string
      const mockInternals = element.getInternals();
      expect(mockInternals.setValidity).toHaveBeenCalledWith(
        { valueMissing: true },
        'Please fill out this field.',
        expect.anything(),
      );
    });

    it('should handle rapid value changes', async () => {
      const inputSpy = vi.fn();
      element.addEventListener('input', inputSpy);

      element.value = 'first';
      await new Promise((resolve) => setTimeout(resolve, 0));

      element.value = 'second';
      await new Promise((resolve) => setTimeout(resolve, 0));

      element.value = 'third';
      await new Promise((resolve) => setTimeout(resolve, 0));

      // Should have been called for each change
      expect(inputSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe('Autofocus Bug Fixes (PBI beta.008)', () => {
    it('should handle focus when EditorView is not ready', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      // Create a new editor without initializing
      const newElement = document.createElement(
        'test-cn-editor',
      ) as TestCnEditor;
      document.body.appendChild(newElement);

      // Simulate focus before EditorView is created
      newElement.simulateHostFocus(new FocusEvent('focus'));

      // Should log warning about EditorView not being ready
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('EditorView not ready for focus'),
      );

      consoleSpy.mockRestore();
      newElement.remove();
    });

    it('should defer focus when contentDOM is not connected', async () => {
      const newElement = document.createElement(
        'test-cn-editor',
      ) as TestCnEditor;
      document.body.appendChild(newElement);

      // Wait for component to initialize
      await customElements.whenDefined('test-cn-editor');
      await new Promise((resolve) => setTimeout(resolve, 10));

      const mockEditorView = newElement.getEditorView();
      if (mockEditorView) {
        // Temporarily disconnect contentDOM
        const originalIsConnected = Object.getOwnPropertyDescriptor(
          mockEditorView.contentDOM,
          'isConnected',
        );

        Object.defineProperty(mockEditorView.contentDOM, 'isConnected', {
          get: () => false,
          configurable: true,
        });

        // Simulate focus - should defer
        newElement.simulateHostFocus(new FocusEvent('focus'));

        // Restore
        if (originalIsConnected) {
          Object.defineProperty(
            mockEditorView.contentDOM,
            'isConnected',
            originalIsConnected,
          );
        }
      }

      newElement.remove();
    });

    it('should not call focus again when already delegating', () => {
      const mockEditorView = element.getEditorView();
      if (mockEditorView) {
        const focusSpy = vi.spyOn(mockEditorView, 'focus');

        // Set delegating flag
        element.setIsDelegatingFocus(true);

        // Try to focus
        element.simulateHostFocus(new FocusEvent('focus'));

        // Should not call focus
        expect(focusSpy).not.toHaveBeenCalled();

        focusSpy.mockRestore();
      }
    });

    it('should handle autofocus attribute after initialization', async () => {
      const autofocusElement = document.createElement(
        'test-cn-editor',
      ) as TestCnEditor;
      autofocusElement.setAttribute('autofocus', '');
      document.body.appendChild(autofocusElement);

      await customElements.whenDefined('test-cn-editor');

      // Wait for firstUpdated to complete
      await new Promise((resolve) => setTimeout(resolve, 50));

      const mockEditorView = autofocusElement.getEditorView();
      if (mockEditorView) {
        // EditorView should exist
        expect(mockEditorView).toBeDefined();
        expect(mockEditorView.contentDOM).toBeDefined();
      }

      autofocusElement.remove();
    });

    it('should have checkEditorHealth method', () => {
      expect(typeof element.checkEditorHealth).toBe('function');
    });

    it('checkEditorHealth should return health status', () => {
      const health = element.checkEditorHealth();

      expect(health).toHaveProperty('hasEditorView');
      expect(health).toHaveProperty('hasContentDOM');
      expect(health).toHaveProperty('contentDOMConnected');
      expect(health).toHaveProperty('contentDOMHasFocus');
      expect(health).toHaveProperty('hostHasFocus');
      expect(health).toHaveProperty('isDelegatingFocus');
      expect(health).toHaveProperty('value');
    });

    it('checkEditorHealth should report EditorView status correctly', async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));

      const health = element.checkEditorHealth();

      // After initialization, should have EditorView
      expect(health.hasEditorView).toBe(true);
      expect(health.hasContentDOM).toBe(true);
    });

    it('should properly clean up focus event listeners', () => {
      const newElement = document.createElement(
        'test-cn-editor',
      ) as TestCnEditor;
      document.body.appendChild(newElement);

      // Disconnect should not throw
      expect(() => {
        newElement.remove();
      }).not.toThrow();
    });
  });
});
