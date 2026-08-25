import type { Role } from '../types'

type Props = {
  assigned: Role[]
  onNewGame: () => void
}

export function SummaryScreen({ assigned, onNewGame }: Props) {
  return (
    <section className="panel">
      <div className="role-list">
        {assigned.map((role) => (
          <div
            key={role.id}
            className="role-row"
            style={{ gridTemplateColumns: 'auto 1fr' }}
          >
            <span className="emoji">{role.emoji}</span>
            <span className="name">{role.nom}</span>
          </div>
        ))}
      </div>
      <div className="summary-footer">
        <button className="new-game-control" type="button" onClick={onNewGame}>
          ↻ Nouvelle partie
        </button>
      </div>
    </section>
  )
}
