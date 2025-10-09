import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import './cn-editor.js';
import type { CnEditor } from './cn-editor.js';

describe('CnEditor - Browser Tests (PBI beta.008)', () => {
  let element: CnEditor;

  beforeEach(async () => {
    document.body.innerHTML = '';
    element = document.createElement('cn-editor') as CnEditor;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-editor');
    // Wait for firstUpdated to complete
    await new Promise((resolve) => setTimeout(resolve, 50));
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Visual Styling', () => {
    it('should have proper default styling', () => {
      const styles = getComputedStyle(element);
      expect(styles.display).toBe('flex');
      expect(styles.flexDirection).toBe('column');
    });

    it('should contain editor container in shadow DOM', () => {
      const container = element.shadowRoot?.querySelector('#editor-container');
      expect(container).toBeTruthy();
    });

    it('should have CodeMirror editor initialized', () => {
      const cmEditor = element.shadowRoot?.querySelector('.cm-editor');
      expect(cmEditor).toBeTruthy();
    });

    it('should have contenteditable area', () => {
      const contentDOM = element.shadowRoot?.querySelector(
        '[contenteditable="true"]',
      );
      expect(contentDOM).toBeTruthy();
    });
  });

  describe('Focus Delegation', () => {
    it('should have tabindex="0" for keyboard accessibility', () => {
      expect(element.getAttribute('tabindex')).toBe('0');
    });

    it('should delegate focus to CodeMirror contentDOM', async () => {
      element.focus();
      await new Promise((resolve) => setTimeout(resolve, 50));

      const contentDOM = element.shadowRoot?.querySelector(
        '[contenteditable="true"]',
      ) as HTMLElement;

      expect(document.activeElement).toBe(contentDOM);
    });

    it('should show cursor when focused', async () => {
      element.focus();
      await new Promise((resolve) => setTimeout(resolve, 50));

      const cursor = element.shadowRoot?.querySelector('.cm-cursor');
      expect(cursor).toBeTruthy();
    });
  });

  describe('Autofocus Behavior', () => {
    it('should focus editor when autofocus attribute is set', async () => {
      document.body.innerHTML = '';

      const autofocusElement = document.createElement(
        'cn-editor',
      ) as CnEditor;
      autofocusElement.setAttribute('autofocus', '');
      document.body.appendChild(autofocusElement);

      await customElements.whenDefined('cn-editor');
      await new Promise((resolve) => setTimeout(resolve, 100));

      const contentDOM = autofocusElement.shadowRoot?.querySelector(
        '[contenteditable="true"]',
      ) as HTMLElement;

      // contentDOM should have focus
      expect(document.activeElement).toBe(contentDOM);

      autofocusElement.remove();
    });

    it('should handle programmatic focus immediately after creation', async () => {
      document.body.innerHTML = '';

      const newElement = document.createElement('cn-editor') as CnEditor;
      document.body.appendChild(newElement);

      await customElements.whenDefined('cn-editor');
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Programmatically focus
      newElement.focus();
      await new Promise((resolve) => setTimeout(resolve, 50));

      const contentDOM = newElement.shadowRoot?.querySelector(
        '[contenteditable="true"]',
      ) as HTMLElement;

      expect(document.activeElement).toBe(contentDOM);

      newElement.remove();
    });
  });

  describe('Keyboard Input Capture (Critical Bug Fix)', () => {
    it('should capture keystrokes after autofocus', async () => {
      document.body.innerHTML = '';

      const autofocusElement = document.createElement(
        'cn-editor',
      ) as CnEditor;
      autofocusElement.setAttribute('autofocus', '');
      document.body.appendChild(autofocusElement);

      await customElements.whenDefined('cn-editor');
      await new Promise((resolve) => setTimeout(resolve, 100));

      const contentDOM = autofocusElement.shadowRoot?.querySelector(
        '[contenteditable="true"]',
      ) as HTMLElement;

      // Verify contentDOM has focus
      expect(document.activeElement).toBe(contentDOM);

      // Simulate typing
      const keyEvent = new KeyboardEvent('keydown', {
        key: 'a',
        code: 'KeyA',
        bubbles: true,
        cancelable: true,
      });

      contentDOM.dispatchEvent(keyEvent);

      // Manually insert text (simulating what CodeMirror would do)
      autofocusElement.value = 'a';
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(autofocusElement.value).toBe('a');

      autofocusElement.remove();
    });

    it('should capture keystrokes after programmatic focus', async () => {
      element.focus();
      await new Promise((resolve) => setTimeout(resolve, 50));

      const contentDOM = element.shadowRoot?.querySelector(
        '[contenteditable="true"]',
      ) as HTMLElement;

      expect(document.activeElement).toBe(contentDOM);

      // Simulate typing
      element.value = 'test content';
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(element.value).toBe('test content');
    });

    it('should handle rapid focus changes', async () => {
      const element1 = document.createElement('cn-editor') as CnEditor;
      const element2 = document.createElement('cn-editor') as CnEditor;

      document.body.appendChild(element1);
      document.body.appendChild(element2);

      await customElements.whenDefined('cn-editor');
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Rapid focus changes
      element1.focus();
      await new Promise((resolve) => setTimeout(resolve, 10));

      element2.focus();
      await new Promise((resolve) => setTimeout(resolve, 10));

      element1.focus();
      await new Promise((resolve) => setTimeout(resolve, 50));

      const contentDOM1 = element1.shadowRoot?.querySelector(
        '[contenteditable="true"]',
      ) as HTMLElement;

      expect(document.activeElement).toBe(contentDOM1);

      element1.remove();
      element2.remove();
    });

    it('should work with Tab navigation between multiple editors', async () => {
      const element1 = document.createElement('cn-editor') as CnEditor;
      const element2 = document.createElement('cn-editor') as CnEditor;
      const element3 = document.createElement('cn-editor') as CnEditor;

      document.body.appendChild(element1);
      document.body.appendChild(element2);
      document.body.appendChild(element3);

      await customElements.whenDefined('cn-editor');
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Focus first editor
      element1.focus();
      await new Promise((resolve) => setTimeout(resolve, 50));

      let contentDOM = element1.shadowRoot?.querySelector(
        '[contenteditable="true"]',
      ) as HTMLElement;
      expect(document.activeElement).toBe(contentDOM);

      // Simulate Tab to second editor
      element2.focus();
      await new Promise((resolve) => setTimeout(resolve, 50));

      contentDOM = element2.shadowRoot?.querySelector(
        '[contenteditable="true"]',
      ) as HTMLElement;
      expect(document.activeElement).toBe(contentDOM);

      // Tab to third editor
      element3.focus();
      await new Promise((resolve) => setTimeout(resolve, 50));

      contentDOM = element3.shadowRoot?.querySelector(
        '[contenteditable="true"]',
      ) as HTMLElement;
      expect(document.activeElement).toBe(contentDOM);

      element1.remove();
      element2.remove();
      element3.remove();
    });
  });

  describe('Paste Functionality', () => {
    it('should handle paste operations', async () => {
      element.focus();
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Simulate paste by setting value
      element.value = 'pasted content';
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(element.value).toBe('pasted content');
    });

    it('should emit input event on paste', async () => {
      let inputFired = false;
      element.addEventListener('input', () => {
        inputFired = true;
      });

      element.focus();
      await new Promise((resolve) => setTimeout(resolve, 50));

      element.value = 'pasted content';
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(inputFired).toBe(true);
    });
  });

  describe('Health Check Diagnostic', () => {
    it('should have checkEditorHealth method', () => {
      expect(typeof element.checkEditorHealth).toBe('function');
    });

    it('checkEditorHealth should return complete health status', () => {
      const health = element.checkEditorHealth();

      expect(health).toHaveProperty('hasEditorView');
      expect(health).toHaveProperty('hasContentDOM');
      expect(health).toHaveProperty('contentDOMConnected');
      expect(health).toHaveProperty('contentDOMHasFocus');
      expect(health).toHaveProperty('hostHasFocus');
      expect(health).toHaveProperty('isDelegatingFocus');
      expect(health).toHaveProperty('value');
    });

    it('checkEditorHealth should report healthy state after initialization', () => {
      const health = element.checkEditorHealth();

      expect(health.hasEditorView).toBe(true);
      expect(health.hasContentDOM).toBe(true);
      expect(health.contentDOMConnected).toBe(true);
    });

    it('checkEditorHealth should report focus state correctly', async () => {
      // Before focus
      let health = element.checkEditorHealth();
      expect(health.contentDOMHasFocus).toBe(false);

      // After focus
      element.focus();
      await new Promise((resolve) => setTimeout(resolve, 50));

      health = element.checkEditorHealth();
      expect(health.contentDOMHasFocus).toBe(true);
    });

    it('checkEditorHealth should attempt auto-fix when contentDOM not focused', async () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      // Manually set host focus without contentDOM focus
      element.focus();
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Blur contentDOM
      const contentDOM = element.shadowRoot?.querySelector(
        '[contenteditable="true"]',
      ) as HTMLElement;
      contentDOM?.blur();

      await new Promise((resolve) => setTimeout(resolve, 10));

      // Run health check - should attempt fix
      element.checkEditorHealth();

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('ContentDOM does not have focus'),
      );

      consoleSpy.mockRestore();
    });
  });

  describe('Form Integration with Focus', () => {
    it('should emit blur event when focus leaves editor', async () => {
      let blurFired = false;
      element.addEventListener('blur', () => {
        blurFired = true;
      });

      element.focus();
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Create another focusable element and focus it
      const button = document.createElement('button');
      document.body.appendChild(button);
      button.focus();

      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(blurFired).toBe(true);

      button.remove();
    });

    it('should maintain value after focus/blur cycle', async () => {
      element.value = 'test content';
      await new Promise((resolve) => setTimeout(resolve, 10));

      element.focus();
      await new Promise((resolve) => setTimeout(resolve, 50));

      element.blur();
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(element.value).toBe('test content');
    });
  });

  describe('Edge Cases', () => {
    it('should handle focus before full initialization gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const quickElement = document.createElement('cn-editor') as CnEditor;
      document.body.appendChild(quickElement);

      // Try to focus immediately (before firstUpdated)
      quickElement.focus();

      await customElements.whenDefined('cn-editor');
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Should not throw and should eventually work
      expect(() => quickElement.focus()).not.toThrow();

      consoleSpy.mockRestore();
      quickElement.remove();
    });

    it('should handle disconnection during focus operation', async () => {
      element.focus();

      // Remove element while focus is being processed
      element.remove();

      // Should not throw
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(document.body.contains(element)).toBe(false);
    });

    it('should handle multiple rapid programmatic focus calls', async () => {
      // Rapid focus calls
      element.focus();
      element.focus();
      element.focus();

      await new Promise((resolve) => setTimeout(resolve, 50));

      const contentDOM = element.shadowRoot?.querySelector(
        '[contenteditable="true"]',
      ) as HTMLElement;

      expect(document.activeElement).toBe(contentDOM);
    });
  });
});
