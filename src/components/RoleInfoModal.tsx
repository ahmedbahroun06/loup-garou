import { CAMP_LABEL } from '../data/roles'
import type { Role } from '../types'

type Props = {
  role: Role
  onClose: () => void
}

export function RoleInfoModal({ role, onClose }: Props) {
  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <h2>
          {role.emoji} {role.nom}
        </h2>
        <p className="lede" style={{ marginBottom: 8 }}>
          Camp : {CAMP_LABEL[role.camp]}
        </p>
        <p className="info-text">
          {role.description.trim()
            ? role.description
            : 'Description à venir. Ce champ est prêt pour le texte du rôle.'}
        </p>
        <div className="row-actions">
          <button className="btn" type="button" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}
