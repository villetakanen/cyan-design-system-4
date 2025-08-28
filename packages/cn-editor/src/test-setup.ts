// Test setup for cn-editor
import { vi } from 'vitest';

// Mock CodeMirror's editor view for testing
vi.mock('@codemirror/view', async () => {
  const actual = await vi.importActual('@codemirror/view');
  return {
    ...actual,
    EditorView: vi.fn().mockImplementation(() => ({
      state: {
        doc: {
          toString: () => '',
          length: 0,
        },
      },
      contentDOM: document.createElement('div'),
      dispatch: vi.fn(),
      focus: vi.fn(),
      destroy: vi.fn(),
    })),
  };
});

// Mock the configuration
vi.mock('./cnEditorConfig.ts', () => ({
  createEditorState: vi.fn().mockReturnValue({}),
}));

// Add ElementInternals mock if not available
if (!('ElementInternals' in globalThis)) {
  class MockElementInternals {
    setFormValue = vi.fn();
    setValidity = vi.fn();
  }

  // Mock attachInternals on HTMLElement
  (
    HTMLElement.prototype as unknown as {
      attachInternals: () => MockElementInternals;
    }
  ).attachInternals = vi.fn(() => new MockElementInternals());
}
