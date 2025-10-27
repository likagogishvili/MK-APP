import React, { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectFilteredCharacters } from '../store/selectors'
import { addToSquad, removeFromSquad } from '../store/slices/squadSlice'

const thStyle: React.CSSProperties = { textAlign: 'left', padding: '16px 20px', color: '#1c2b3a' }
const tdStyle: React.CSSProperties = { padding: '16px 20px', verticalAlign: 'middle' }
const tdCenter: React.CSSProperties = { ...tdStyle, textAlign: 'center' }

type Ability = {
  abilityName: string
  abilityScore: number
}

interface CharacterRowProps {
  id: number
  name: string
  thumbnail: string
  tags: { slot: number; tag_name: string }[]
  abilities: Ability[]
  inSquad: boolean
  onToggle: (id: number) => void
}

const CharacterRow: React.FC<CharacterRowProps> = React.memo(({ id, name, thumbnail, tags, abilities, inSquad, onToggle }) => {
  return (
    <tr className={inSquad ? 'row--selected' : undefined}>
      <td style={tdStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <input type="checkbox" checked={inSquad} onChange={() => onToggle(id)} />
          <img src={thumbnail} alt={name} style={{ width: 40, height: 40, borderRadius: '50%' }} />
          <div style={{ fontWeight: 700, fontSize: 18 }}>{name}</div>
        </div>
      </td>
      <td style={tdStyle}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {tags?.map(t => (
            <span key={t.slot} className="chip">
              {t.tag_name}
            </span>
          ))}
        </div>
      </td>
      {abilities.map(a => (
        <td key={a.abilityName} style={{ ...tdCenter, fontWeight: 700 }}>
          <span className={a.abilityScore === 10 ? 'ability-10' : undefined}>{a.abilityScore}</span>
        </td>
      ))}
    </tr>
  )
})

export const CharacterTable: React.FC = () => {
  const dispatch = useAppDispatch()
  const characters = useAppSelector(selectFilteredCharacters)
  const squadIds = useAppSelector(s => s.squad.ids)
  const squadSet = useMemo(() => new Set(squadIds), [squadIds])
  const handleToggle = useCallback((id: number) => {
    if (squadSet.has(id)) dispatch(removeFromSquad(id))
    else dispatch(addToSquad(id))
  }, [dispatch, squadSet])

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="table">
        <thead>
          <tr>
            <th style={thStyle}>Character</th>
            <th style={thStyle}>Tags</th>
            <th style={thStyle}>Power</th>
            <th style={thStyle}>Mobility</th>
            <th style={thStyle}>Technique</th>
            <th style={thStyle}>Survivability</th>
            <th style={thStyle}>Energy</th>
          </tr>
        </thead>
        <tbody>
          {characters.map(c => (
            <CharacterRow
              key={c.id}
              id={c.id}
              name={c.name}
              thumbnail={c.thumbnail}
              tags={c.tags}
              abilities={c.abilities as Ability[]}
              inSquad={squadSet.has(c.id)}
              onToggle={handleToggle}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CharacterTable


