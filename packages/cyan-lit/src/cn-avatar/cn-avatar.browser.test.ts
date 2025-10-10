import { describe, expect, it } from 'vitest';
import './cn-avatar.js';
import type { CnAvatar } from './cn-avatar.js';

describe('CnAvatar Browser Tests', () => {
  it('should render avatar frame with correct styles', async () => {
    const element = document.createElement('cn-avatar') as CnAvatar;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const frame = element.shadowRoot?.querySelector(
      '.avatarFrame',
    ) as HTMLElement;
    expect(frame).toBeTruthy();

    const computedStyle = window.getComputedStyle(frame);
    expect(computedStyle.borderRadius).toBe('50%');
    expect(computedStyle.display).toBe('flex');
    expect(computedStyle.aspectRatio).toBe('1 / 1');

    document.body.removeChild(element);
  });

  it('should apply elevation styles correctly', async () => {
    const element = document.createElement('cn-avatar') as CnAvatar;
    element.elevation = 1;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.hasAttribute('elevation')).toBe(true);
    expect(element.getAttribute('elevation')).toBe('1');

    element.elevation = 2;
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(element.getAttribute('elevation')).toBe('2');

    document.body.removeChild(element);
  });

  it('should handle image loading', async () => {
    const element = document.createElement('cn-avatar') as CnAvatar;
    element.src =
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjRkYwMDAwIi8+Cjwvc3ZnPgo=';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar');
    await new Promise((resolve) => setTimeout(resolve, 100));

    const img = element.shadowRoot?.querySelector('img') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.src).toContain('data:image/svg+xml');

    const computedStyle = window.getComputedStyle(img);
    expect(computedStyle.borderRadius).toBe('50%');
    expect(computedStyle.objectFit).toBe('cover');

    document.body.removeChild(element);
  });

  it('should display initials with correct styling', async () => {
    const element = document.createElement('cn-avatar') as CnAvatar;
    element.nick = 'Test User';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const placeholder = element.shadowRoot?.querySelector(
      'div.placeholder',
    ) as HTMLElement;
    expect(placeholder).toBeTruthy();
    expect(placeholder.textContent).toBe('Te');

    const computedStyle = window.getComputedStyle(placeholder);
    expect(computedStyle.textAlign).toBe('center');
    expect(computedStyle.textTransform).toBe('uppercase');

    document.body.removeChild(element);
  });

  it('should generate consistent background colors for same nick', async () => {
    const element1 = document.createElement('cn-avatar') as CnAvatar;
    const element2 = document.createElement('cn-avatar') as CnAvatar;

    element1.nick = 'Same User';
    element2.nick = 'Same User';

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

    expect(frame1.style.backgroundColor).toBe(frame2.style.backgroundColor);

    document.body.removeChild(element1);
    document.body.removeChild(element2);
  });

  it('should show cn-icon for default state', async () => {
    const element = document.createElement('cn-avatar') as CnAvatar;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar');
    // Wait a bit more for cn-icon to be defined
    await new Promise((resolve) => setTimeout(resolve, 100));

    const icon = element.shadowRoot?.querySelector('cn-icon');
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute('noun')).toBe('avatar');

    document.body.removeChild(element);
  });

  it('should handle hover state changes', async () => {
    const element = document.createElement('cn-avatar') as CnAvatar;
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const frame = element.shadowRoot?.querySelector(
      '.avatarFrame',
    ) as HTMLElement;
    expect(frame).toBeTruthy();

    // Test cursor style
    const computedStyle = window.getComputedStyle(frame);
    expect(computedStyle.cursor).toBe('pointer');
    expect(computedStyle.userSelect).toBe('none');

    document.body.removeChild(element);
  });

  it('should fall back to initials when image fails to load', async () => {
    const element = document.createElement('cn-avatar') as CnAvatar;
    element.src = 'https://invalid-url-that-does-not-exist-12345.com/image.jpg';
    element.nick = 'Test User';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Initially should try to show image
    let img = element.shadowRoot?.querySelector('img');
    expect(img).toBeTruthy();

    // Simulate image load error
    img?.dispatchEvent(new Event('error'));
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Should now show initials instead
    const placeholder = element.shadowRoot?.querySelector('div.placeholder');
    expect(placeholder).toBeTruthy();
    expect(placeholder?.textContent).toBe('Te');

    // Image should no longer be present
    img = element.shadowRoot?.querySelector('img');
    expect(img).toBeFalsy();

    document.body.removeChild(element);
  });

  it('should fall back to icon when image fails and no nick is provided', async () => {
    const element = document.createElement('cn-avatar') as CnAvatar;
    element.src = 'https://invalid-url-that-does-not-exist-12345.com/image.jpg';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Simulate image load error
    const img = element.shadowRoot?.querySelector('img');
    img?.dispatchEvent(new Event('error'));
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Should show default icon
    const icon = element.shadowRoot?.querySelector('cn-icon');
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute('noun')).toBe('avatar');

    document.body.removeChild(element);
  });

  it('should use lazy loading for images', async () => {
    const element = document.createElement('cn-avatar') as CnAvatar;
    element.src =
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjRkYwMDAwIi8+Cjwvc3ZnPgo=';
    document.body.appendChild(element);

    await customElements.whenDefined('cn-avatar');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const img = element.shadowRoot?.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('loading')).toBe('lazy');

    document.body.removeChild(element);
  });
});
