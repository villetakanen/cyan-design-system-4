import { describe, expect, it } from 'vitest';
import './cn-avatar.js';
import type { CnAvatar } from './cn-avatar.js';

describe('CnAvatar', () => {
  it('should be defined', () => {
    const element = document.createElement('cn-avatar');
    expect(element).toBeInstanceOf(HTMLElement);
  });

  it('should render default placeholder icon when no src or nick is provided', async () => {
    const element = document.createElement('cn-avatar') as CnAvatar;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const icon = element.shadowRoot?.querySelector('cn-icon');
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute('noun')).toBe('avatar');

    document.body.removeChild(element);
  });

  it('should render image when src is provided', async () => {
    const element = document.createElement('cn-avatar') as CnAvatar;
    element.src = '/test/avatar.jpg';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const img = element.shadowRoot?.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe('/test/avatar.jpg');
    expect(img?.getAttribute('alt')).toBe('Avatar');

    document.body.removeChild(element);
  });

  it('should render initials when nick is provided but no src', async () => {
    const element = document.createElement('cn-avatar') as CnAvatar;
    element.nick = 'John Doe';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const placeholder = element.shadowRoot?.querySelector('div.placeholder');
    expect(placeholder).toBeTruthy();
    expect(placeholder?.textContent).toBe('Jo');

    document.body.removeChild(element);
  });

  it('should prefer image over initials when both src and nick are provided', async () => {
    const element = document.createElement('cn-avatar') as CnAvatar;
    element.src = '/test/avatar.jpg';
    element.nick = 'John Doe';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const img = element.shadowRoot?.querySelector('img');
    const placeholder = element.shadowRoot?.querySelector('div.placeholder');

    expect(img).toBeTruthy();
    expect(placeholder).toBeFalsy();

    document.body.removeChild(element);
  });

  it('should handle elevation attribute', async () => {
    const element = document.createElement('cn-avatar') as CnAvatar;
    element.elevation = 1;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.getAttribute('elevation')).toBe('1');

    document.body.removeChild(element);
  });

  it('should reflect properties as attributes', async () => {
    const element = document.createElement('cn-avatar') as CnAvatar;
    element.src = '/test.jpg';
    element.nick = 'Test User';
    element.elevation = 2;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.getAttribute('src')).toBe('/test.jpg');
    expect(element.getAttribute('nick')).toBe('Test User');
    expect(element.getAttribute('elevation')).toBe('2');

    document.body.removeChild(element);
  });

  it('should generate different background colors for different nicks', async () => {
    const element1 = document.createElement('cn-avatar') as CnAvatar;
    element1.nick = 'Alice';
    const element2 = document.createElement('cn-avatar') as CnAvatar;
    element2.nick = 'Bob';

    document.body.appendChild(element1);
    document.body.appendChild(element2);

    await customElements.whenDefined('cn-avatar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const frame1 = element1.shadowRoot?.querySelector(
      '.avatarFrame',
    ) as HTMLElement;
    const frame2 = element2.shadowRoot?.querySelector(
      '.avatarFrame',
    ) as HTMLElement;

    // Both should have color-mix styles but they should be different
    expect(frame1?.style.backgroundColor).toContain('color-mix');
    expect(frame2?.style.backgroundColor).toContain('color-mix');
    expect(frame1?.style.backgroundColor).not.toBe(
      frame2?.style.backgroundColor,
    );

    document.body.removeChild(element1);
    document.body.removeChild(element2);
  });

  it('should set aria-label attribute', async () => {
    const element = document.createElement('cn-avatar') as CnAvatar;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.getAttribute('aria-label')).toBe('Avatar');

    document.body.removeChild(element);
  });

  it('should add loading="lazy" attribute to images', async () => {
    const element = document.createElement('cn-avatar') as CnAvatar;
    element.src = '/test/avatar.jpg';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const img = element.shadowRoot?.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('loading')).toBe('lazy');

    document.body.removeChild(element);
  });

  it('should reset image error state when src changes', async () => {
    const element = document.createElement('cn-avatar') as CnAvatar;
    element.src = '/invalid/image.jpg';
    element.nick = 'Test User';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Trigger error
    const img = element.shadowRoot?.querySelector('img');
    img?.dispatchEvent(new Event('error'));
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Should show fallback
    const placeholder = element.shadowRoot?.querySelector('div.placeholder');
    expect(placeholder).toBeTruthy();

    // Change src - should try to load image again
    element.src = '/new/image.jpg';
    await new Promise((resolve) => setTimeout(resolve, 0));

    const newImg = element.shadowRoot?.querySelector('img');
    expect(newImg).toBeTruthy();
    expect(newImg?.getAttribute('src')).toBe('/new/image.jpg');

    document.body.removeChild(element);
  });
});
