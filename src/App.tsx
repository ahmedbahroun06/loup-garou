import { useEffect, useMemo, useState } from 'react'
import { CustomRoleModal } from './components/CustomRoleModal'
import { RoleInfoModal } from './components/RoleInfoModal'
import { SwapModal } from './components/SwapModal'
import { ThemeToggle } from './components/ThemeToggle'
import { generateGame, maxPlayers, MIN_PLAYERS, shuffleRoles, unusedRoles } from './lib/shuffle'
import { applyTheme, loadGame, saveGame } from './lib/storage'
import { DistributionScreen } from './screens/DistributionScreen'
import { ReviewScreen } from './screens/ReviewScreen'
import { SetupScreen } from './screens/SetupScreen'
import { SummaryScreen } from './screens/SummaryScreen'
import type { PersistedGame, Role, Theme } from './types'

export default function App() {
  const [game, setGame] = useState<PersistedGame>(() => loadGame())
  const [swapIndex, setSwapIndex] = useState<number | null>(null)
  const [infoRole, setInfoRole] = useState<Role | null>(null)
  const [customOpen, setCustomOpen] = useState(false)

  const max = useMemo(() => maxPlayers(game.customRoles), [game.customRoles])

  useEffect(() => {
    applyTheme(game.theme)
  }, [game.theme])

  useEffect(() => {
    saveGame(game)
  }, [game])

  useEffect(() => {
    setGame((current) => {
      let playerCount = current.playerCount
      if (playerCount > max && max >= MIN_PLAYERS) playerCount = max
      if (playerCount < MIN_PLAYERS) playerCount = MIN_PLAYERS
      if (playerCount === current.playerCount) return current
      return { ...current, playerCount }
    })
  }, [max])

  function patch(partial: Partial<PersistedGame>) {
    setGame((current) => ({ ...current, ...partial }))
  }

  function toggleTheme() {
    const theme: Theme = game.theme === 'dark' ? 'light' : 'dark'
    patch({ theme })
  }

  function generate() {
    const { assigned, captainIndex } = generateGame(game.playerCount, game.customRoles)
    patch({
      assigned,
      summaryAssigned: [],
      captainIndex,
      screen: 'review',
      distributionIndex: 0,
      revealed: false,
    })
  }

  function swapRole(next: Role) {
    if (swapIndex == null) return
    const assigned = game.assigned.map((role, i) => (i === swapIndex ? next : role))
    patch({ assigned, playerCount: assigned.length })
    setSwapIndex(null)
  }

  function saveCustom(role: Role, addToGame: boolean) {
    const customRoles = [...game.customRoles, role]
    if (addToGame) {
      patch({
        customRoles,
        assigned: [...game.assigned, role],
        playerCount: game.assigned.length + 1,
      })
    } else {
      patch({ customRoles })
    }
    setCustomOpen(false)
  }

  function nextDistribution() {
    const last = game.distributionIndex >= game.assigned.length - 1
    if (last) {
      patch({ screen: 'summary', summaryAssigned: shuffleRoles(game.assigned), revealed: false })
      return
    }
    patch({
      distributionIndex: game.distributionIndex + 1,
      revealed: false,
    })
  }

  function newGame() {
    patch({
      screen: 'setup',
      assigned: [],
      summaryAssigned: [],
      captainIndex: -1,
      distributionIndex: 0,
      revealed: false,
      playerCount: Math.max(MIN_PLAYERS, Math.min(game.playerCount, maxPlayers(game.customRoles))),
    })
  }

  const unused = unusedRoles(game.assigned, game.customRoles)
  const currentRole = game.assigned[game.distributionIndex]
  const titles: Record<PersistedGame['screen'], string> = {
    setup: 'Nouvelle partie',
    review: 'Composition',
    distribution: 'Distribution',
    summary: 'Récap narrateur',
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <small>Loup Garou</small>
          <h1>{titles[game.screen]}</h1>
        </div>
        <ThemeToggle theme={game.theme} onToggle={toggleTheme} />
      </header>

      {game.screen === 'setup' ? (
        <SetupScreen
          playerCount={Math.min(Math.max(game.playerCount, MIN_PLAYERS), max)}
          max={max}
          onChange={(playerCount) => patch({ playerCount })}
          onGenerate={generate}
        />
      ) : null}

      {game.screen === 'review' ? (
        <ReviewScreen
          assigned={game.assigned}
          onSwap={setSwapIndex}
          onInfo={setInfoRole}
          onAddCustom={() => setCustomOpen(true)}
          onConfirm={() => {
            const captain = game.assigned[game.captainIndex]
            const assigned = shuffleRoles(game.assigned)
            patch({
              assigned,
              captainIndex: captain ? assigned.findIndex((role) => role.id === captain.id) : -1,
              screen: 'distribution',
              distributionIndex: 0,
              revealed: false,
            })
          }}
          onBack={() => patch({ screen: 'setup' })}
        />
      ) : null}

      {game.screen === 'distribution' && currentRole ? (
        <DistributionScreen
          role={currentRole}
          isCaptain={game.distributionIndex === game.captainIndex}
          remaining={game.assigned.length - game.distributionIndex}
          total={game.assigned.length}
          revealed={game.revealed}
          onReveal={() => patch({ revealed: true })}
          onNext={nextDistribution}
          onBack={newGame}
        />
      ) : null}

      {game.screen === 'summary' ? (
        <SummaryScreen
          assigned={game.summaryAssigned.length ? game.summaryAssigned : game.assigned}
          onNewGame={newGame}
        />
      ) : null}

      {swapIndex != null ? (
        <SwapModal unused={unused} onPick={swapRole} onClose={() => setSwapIndex(null)} />
      ) : null}
      {infoRole ? <RoleInfoModal role={infoRole} onClose={() => setInfoRole(null)} /> : null}
      {customOpen ? (
        <CustomRoleModal onSave={saveCustom} onClose={() => setCustomOpen(false)} />
      ) : null}
    </div>
  )
}
