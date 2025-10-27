import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectSquadMembers } from '../store/selectors'
import { removeFromSquad } from '../store/slices/squadSlice'

export const SquadAvatars: React.FC = () => {
  const dispatch = useAppDispatch()
  const members = useAppSelector(selectSquadMembers)

  if (members.length === 0) return null

  return (
    <div className="avatars">
      {members.map(m => (
        <div key={m.id} className="avatar" title={m.name}>
          <img src={m.thumbnail} alt={m.name} />
          <div className="avatar__overlay" onClick={() => dispatch(removeFromSquad(m.id))}>Remove</div>
        </div>
      ))}
    </div>
  )
}

export default SquadAvatars


