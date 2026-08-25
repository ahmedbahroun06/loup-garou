import { MIN_PLAYERS } from '../lib/shuffle'

type Props = {
  playerCount: number
  max: number
  onChange: (n: number) => void
  onGenerate: () => void
}

export function SetupScreen({ playerCount, max, onChange, onGenerate }: Props) {
  const canGenerate = playerCount >= MIN_PLAYERS && playerCount <= max

  return (
    <section className="panel">
      <div className="stepper">
        <button
          type="button"
          aria-label="Moins de joueurs"
          disabled={playerCount <= MIN_PLAYERS}
          onClick={() => onChange(playerCount - 1)}
        >
          −
        </button>
        <div className="count">{playerCount}</div>
        <button
          type="button"
          aria-label="Plus de joueurs"
          disabled={playerCount >= max}
          onClick={() => onChange(playerCount + 1)}
        >
          +
        </button>
      </div>
      <button className="btn" type="button" disabled={!canGenerate} onClick={onGenerate}>
        Générer
      </button>
    </section>
  )
}
