import { useRef, type TouchEvent } from 'react'
import { CAMP_LABEL, CAPITAINE_BADGE } from '../data/roles'
import type { Role } from '../types'

type Props = {
  role: Role
  isCaptain: boolean
  remaining: number
  total: number
  revealed: boolean
  onReveal: () => void
  onNext: () => void
  onBack: () => void
}

export function DistributionScreen({
  role,
  isCaptain,
  remaining,
  total,
  revealed,
  onReveal,
  onNext,
  onBack,
}: Props) {
  const startX = useRef<number | null>(null)

  function onTouchStart(e: TouchEvent<HTMLDivElement>) {
    startX.current = e.changedTouches[0]?.clientX ?? null
  }

  function onTouchEnd(e: TouchEvent<HTMLDivElement>) {
    const start = startX.current
    startX.current = null
    if (start == null) return
    const dx = (e.changedTouches[0]?.clientX ?? start) - start
    if (revealed && dx < -56) onNext()
  }

  return (
    <section className="distribute">
      <button className="btn ghost back-btn" type="button" onClick={onBack}>
        ← Menu principal
      </button>
      <p className="counter">
        {remaining}/{total} restants
      </p>
      <div className="stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {revealed ? (
          <div className="role-card">
            <div className="big">{role.emoji}</div>
            <h2>{role.nom}</h2>
            <p>{CAMP_LABEL[role.camp]}</p>
            {role.description.trim() ? <p>{role.description}</p> : null}
            {isCaptain ? (
              <>
                <div className="big captain-emoji">{CAPITAINE_BADGE.emoji}</div>
                <h2>{CAPITAINE_BADGE.nom}</h2>
              </>
            ) : null}
          </div>
        ) : (
          <button className="curtain" type="button" onClick={onReveal}>
            Tape pour révéler
            <span>ton rôle</span>
          </button>
        )}
      </div>
      <button className="btn" type="button" disabled={!revealed} onClick={onNext}>
        {remaining === 1 ? 'Voir le récap' : 'Suivant'}
      </button>
    </section>
  )
}
