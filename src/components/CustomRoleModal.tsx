import { useState } from 'react'
import { EMOJI_PICKER } from '../data/roles'
import type { Camp, Role } from '../types'

type Props = {
  onSave: (role: Role, addToGame: boolean) => void
  onClose: () => void
}

export function CustomRoleModal({ onSave, onClose }: Props) {
  const [nom, setNom] = useState('')
  const [emoji, setEmoji] = useState('⭐')
  const [camp, setCamp] = useState<Camp>('village')
  const [description, setDescription] = useState('')

  function submit(addToGame: boolean) {
    const trimmed = nom.trim()
    if (!trimmed) return
    onSave(
      {
        id: `custom-${Date.now()}`,
        nom: trimmed,
        emoji,
        camp,
        description: description.trim(),
        custom: true,
      },
      addToGame,
    )
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <h2>Ajouter un rôle custom</h2>
        <label className="field">
          <span>Nom</span>
          <input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom du rôle" />
        </label>
        <div className="field">
          <span>Emoji</span>
          <div className="emoji-grid">
            {EMOJI_PICKER.map((item) => (
              <button
                key={item}
                type="button"
                className={item === emoji ? 'selected' : ''}
                onClick={() => setEmoji(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <label className="field">
          <span>Camp</span>
          <select value={camp} onChange={(e) => setCamp(e.target.value as Camp)}>
            <option value="village">Village</option>
            <option value="loup">Loup</option>
            <option value="neutre">Neutre</option>
          </select>
        </label>
        <label className="field">
          <span>Description (optionnelle)</span>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Sera affichée à la distribution"
          />
        </label>
        <div className="row-actions">
          <button className="btn" type="button" disabled={!nom.trim()} onClick={() => submit(true)}>
            Ajouter à la partie
          </button>
          <button className="btn secondary" type="button" disabled={!nom.trim()} onClick={() => submit(false)}>
            Enregistrer pour un swap
          </button>
          <button className="btn ghost" type="button" onClick={onClose}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  )
}
