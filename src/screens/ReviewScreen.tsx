import { CAMP_LABEL } from '../data/roles'
import type { Role } from '../types'

type Props = {
  assigned: Role[]
  onSwap: (index: number) => void
  onInfo: (role: Role) => void
  onAddCustom: () => void
  onConfirm: () => void
  onBack: () => void
}

export function ReviewScreen({
  assigned,
  onSwap,
  onInfo,
  onAddCustom,
  onConfirm,
  onBack,
}: Props) {
  return (
    <section className="panel">
      <button className="btn ghost back-btn" type="button" onClick={onBack}>
        ← Retour
      </button>
      <div className="role-list">
        {assigned.map((role, index) => (
          <div key={`${role.id}-${index}`} className="role-row">
            <span className="emoji">{role.emoji}</span>
            <div>
              <div className="name">{role.nom}</div>
              <span className={`chip ${role.camp}`}>{CAMP_LABEL[role.camp]}</span>
            </div>
            <button className="tiny" type="button" onClick={() => onInfo(role)}>
              Info
            </button>
            <button className="tiny" type="button" onClick={() => onSwap(index)}>
              Swap
            </button>
          </div>
        ))}
      </div>
      <div className="row-actions">
        <button className="btn secondary" type="button" onClick={onAddCustom}>
          + Ajouter un rôle custom
        </button>
        <button className="btn" type="button" onClick={onConfirm}>
          Confirmer
        </button>
      </div>
    </section>
  )
}
