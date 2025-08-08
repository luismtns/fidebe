import './tailwind/theme.css?inline'
import styles from './tailwind/theme.css?inline'
export * from './components'

/**
 * Automatically inject the component styles when the library is imported.
 * This allows consumers to use the widget without manually importing the
 * generated CSS file.
 */
if (typeof document !== 'undefined' && !document.querySelector('style[data-fidebe]')) {
  const style = document.createElement('style')
  style.setAttribute('data-fidebe', '')
  style.textContent = styles
  document.head.append(style)
}
