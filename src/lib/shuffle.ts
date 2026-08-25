import { LOUP_ROLES, VILLAGE_ROLES } from '../data/roles'
import type { Role } from '../types'

const WOLF_RATIO = 0.35
export const MIN_PLAYERS = 5

/** Arrondi classique half-up (2.45 → 2, 2.5 → 3). */
export function roundHalfUp(value: number): number {
  return Math.floor(value + 0.5)
}

/**
 * 35 % tant qu'il reste des rôles loup uniques.
 * Au-delà (typiquement > 12 joueurs), on ne force plus le ratio :
 * on prend tous les loups dispo, le reste va au village / neutres.
 */
export function wolfCountFor(playerCount: number, loupDisponibles?: number): number {
  const wanted = Math.max(1, roundHalfUp(playerCount * WOLF_RATIO))
  if (loupDisponibles == null) return wanted
  return Math.min(wanted, loupDisponibles)
}

export function allRoles(customRoles: Role[]): Role[] {
  return [...LOUP_ROLES, ...VILLAGE_ROLES, ...customRoles]
}

function loupPool(customRoles: Role[]): Role[] {
  return [...LOUP_ROLES, ...customRoles.filter((r) => r.camp === 'loup')]
}

function otherPool(customRoles: Role[]): Role[] {
  return [
    ...VILLAGE_ROLES,
    ...customRoles.filter((r) => r.camp !== 'loup'),
  ]
}

/** Max = nombre de rôles uniques disponibles (base + customs). */
export function maxPlayers(customRoles: Role[]): number {
  return allRoles(customRoles).length
}

export function unusedRoles(assigned: Role[], customRoles: Role[]): Role[] {
  const used = new Set(assigned.map((r) => r.id))
  return allRoles(customRoles).filter((r) => !used.has(r.id))
}

function shuffleInPlace<T>(items: T[]): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = items[i]
    items[i] = items[j]
    items[j] = tmp
  }
  return items
}

export function shuffleRoles(roles: Role[]): Role[] {
  return shuffleInPlace([...roles])
}

export type GeneratedGame = {
  assigned: Role[]
  captainIndex: number
}

export function generateGame(playerCount: number, customRoles: Role[]): GeneratedGame {
  const max = maxPlayers(customRoles)
  if (playerCount < MIN_PLAYERS || playerCount > max) {
    throw new Error('Nombre de joueurs invalide')
  }

  const loupsDispo = loupPool(customRoles)
  const nbLoup = wolfCountFor(playerCount, loupsDispo.length)
  const nbAutres = playerCount - nbLoup

  const loups = loupsDispo.slice(0, nbLoup)
  const autres = otherPool(customRoles).slice(0, nbAutres)
  const assigned = shuffleRoles([...loups, ...autres])
  const captainIndex = Math.floor(Math.random() * assigned.length)

  return { assigned, captainIndex }
}
