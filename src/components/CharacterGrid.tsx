import React from 'react'
import CharacterCard from './CharacterCard'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addToSquad, removeFromSquad } from '../store/slices/squadSlice'
import { selectFilteredCharacters, selectCanAddToSquad, selectSquadIds } from '../store/selectors'

export const CharacterGrid: React.FC = () => {
  const dispatch = useAppDispatch()
  const characters = useAppSelector(selectFilteredCharacters)
  const canAdd = useAppSelector(selectCanAddToSquad)
  const squadIds = useAppSelector(selectSquadIds)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
      {characters.map(c => {
        const inSquad = squadIds.includes(c.id)
        return (
          <CharacterCard
            key={c.id}
            character={c}
            inSquad={inSquad}
            disabledAdd={!canAdd}
            onToggle={() => dispatch(inSquad ? removeFromSquad(c.id) : addToSquad(c.id))}
          />
        )
      })}
    </div>
  )
}

export default CharacterGrid


