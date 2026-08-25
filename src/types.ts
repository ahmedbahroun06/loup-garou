export type Camp = 'village' | 'loup' | 'neutre'

export type Role = {
  id: string
  nom: string
  emoji: string
  camp: Camp
  description: string
  custom: boolean
}

export type Screen = 'setup' | 'review' | 'distribution' | 'summary'

export type Theme = 'dark' | 'light'

export type PersistedGame = {
  screen: Screen
  playerCount: number
  assigned: Role[]
  summaryAssigned: Role[]
  captainIndex: number
  distributionIndex: number
  revealed: boolean
  customRoles: Role[]
  theme: Theme
}
