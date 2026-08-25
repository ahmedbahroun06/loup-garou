import type { PersistedGame, Theme } from '../types'

const KEY = 'loup-garou-narrateur-v1'

const defaultState = (): PersistedGame => ({
  screen: 'setup',
  playerCount: 8,
  assigned: [],
  summaryAssigned: [],
  captainIndex: -1,
  distributionIndex: 0,
  revealed: false,
  customRoles: [],
  theme: 'dark',
})

export function loadGame(): PersistedGame {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw) as Partial<PersistedGame>
    return { ...defaultState(), ...parsed }
  } catch {
    return defaultState()
  }
}

export function saveGame(state: PersistedGame): void {
  localStorage.setItem(KEY, JSON.stringify(state))
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
}
