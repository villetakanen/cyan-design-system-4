import { describe, expect, it } from 'vitest'
import './cn-navigation-icon.js'
import '../cn-icon/cn-icon.js'
import type { CnNavigationIcon } from './cn-navigation-icon.js'

describe('CnNavigationIcon - Browser Tests', () => {
  it('should have proper default styling', async () => {
    const element = document.createElement('cn-navigation-icon') as CnNavigationIcon
    document.body.appendChild(element)

    await customElements.whenDefined('cn-navigation-icon')
    await new Promise((resolve) => setTimeout(resolve, 0))

    const styles = getComputedStyle(element)
    expect(styles.display).toBe('flex')
    expect(styles.position).toBe('relative')

    document.body.removeChild(element)
  })

  it('should render navigation icon without label', async () => {
    const element = document.createElement('cn-navigation-icon') as CnNavigationIcon
    element.noun = 'home'
    document.body.appendChild(element)

    await customElements.whenDefined('cn-navigation-icon')
    await new Promise((resolve) => setTimeout(resolve, 0))

    const icon = element.shadowRoot?.querySelector('cn-icon')
    const label = element.shadowRoot?.querySelector('.navigation-icon-label')
    
    expect(icon).toBeTruthy()
    expect(label).toBeFalsy()

    document.body.removeChild(element)
  })

  it('should render navigation icon with label', async () => {
    const element = document.createElement('cn-navigation-icon') as CnNavigationIcon
    element.noun = 'profile'
    element.label = 'Profile'
    document.body.appendChild(element)

    await customElements.whenDefined('cn-navigation-icon')
    await new Promise((resolve) => setTimeout(resolve, 0))

    const icon = element.shadowRoot?.querySelector('cn-icon')
    const label = element.shadowRoot?.querySelector('.navigation-icon-label')
    
    expect(icon).toBeTruthy()
    expect(label).toBeTruthy()
    expect(label?.textContent).toBe('Profile')

    document.body.removeChild(element)
  })

  it('should apply active state', async () => {
    const element = document.createElement('cn-navigation-icon') as CnNavigationIcon
    element.noun = 'settings'
    element.active = true
    document.body.appendChild(element)

    await customElements.whenDefined('cn-navigation-icon')
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(element.hasAttribute('active')).toBe(true)

    document.body.removeChild(element)
  })

  it('should reflect properties as attributes', async () => {
    const element = document.createElement('cn-navigation-icon') as CnNavigationIcon
    element.noun = 'test'
    element.label = 'Test Label'
    element.active = true
    document.body.appendChild(element)

    await customElements.whenDefined('cn-navigation-icon')
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(element.getAttribute('noun')).toBe('test')
    expect(element.getAttribute('label')).toBe('Test Label')
    expect(element.hasAttribute('active')).toBe(true)

    document.body.removeChild(element)
  })
})
