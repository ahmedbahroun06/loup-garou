import { CAMP_LABEL } from '../data/roles'
import type { Role } from '../types'

type Props = {
  unused: Role[]
  onPick: (role: Role) => void
  onClose: () => void
}

export function SwapModal({ unused, onPick, onClose }: Props) {
  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <h2>Remplacer le rôle</h2>
        <p className="lede">
          Un rôle ne peut exister qu&apos;une fois. L&apos;ancien retourne dans le pool.
        </p>
        {unused.length === 0 ? (
          <p className="empty">Aucun rôle disponible pour un swap.</p>
        ) : (
          <div className="swap-list">
            {unused.map((role) => (
              <button
                key={role.id}
                className="role-row"
                type="button"
                style={{ gridTemplateColumns: 'auto 1fr auto', width: '100%', textAlign: 'left' }}
                onClick={() => onPick(role)}
              >
                <span className="emoji">{role.emoji}</span>
                <span className="name">{role.nom}</span>
                <span className={`chip ${role.camp}`}>{CAMP_LABEL[role.camp]}</span>
              </button>
            ))}
          </div>
        )}
        <button className="btn ghost" type="button" onClick={onClose}>
          Annuler
        </button>
      </div>
    </div>
  )
}
