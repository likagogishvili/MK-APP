import React from 'react'
import type { Character } from '../types'

interface Props {
  character: Character
  inSquad: boolean
  disabledAdd: boolean
  onToggle: () => void
}

export const CharacterCard: React.FC<Props> = ({ character, inSquad, disabledAdd, onToggle }) => {
  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <img src={character.thumbnail} alt={character.name} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }} />
        <div>
          <div style={{ fontWeight: 600 }}>{character.name}</div>
          <div style={{ fontSize: 12, color: '#666' }}>{character.universe}</div>
        </div>
      </div>
      <button disabled={disabledAdd && !inSquad} onClick={onToggle}>
        {inSquad ? 'Remove' : disabledAdd ? 'Squad Full' : 'Add to Squad'}
      </button>
    </div>
  )
}

export default CharacterCard


