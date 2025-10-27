import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectSquadMembers, selectSquadIds, selectSquadLimit } from '../store/selectors'
import { removeFromSquad, clearSquad } from '../store/slices/squadSlice'

export const SquadPanel: React.FC = () => {
  const dispatch = useAppDispatch()
  const members = useAppSelector(selectSquadMembers)
  const ids = useAppSelector(selectSquadIds)
  const limit = useAppSelector(selectSquadLimit)

  return (
    <div style={{ padding: '12px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <h2 style={{ margin: 0 }}>Squad ({ids.length}/{limit})</h2>
        <button onClick={() => dispatch(clearSquad())} style={{ marginLeft: 'auto' }} disabled={ids.length === 0}>Clear</button>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {ids.length === 0 && <div>No characters selected</div>}
        {members.map(m => (
          <div key={m.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src={m.thumbnail} alt={m.name} style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 4 }} />
            <div style={{ fontWeight: 600 }}>{m.name}</div>
            <button onClick={() => dispatch(removeFromSquad(m.id))}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SquadPanel


