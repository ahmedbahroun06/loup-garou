import type { Theme } from '../types'

type Props = {
  theme: Theme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: Props) {
  return (
    <button
      className="icon-btn"
      type="button"
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
