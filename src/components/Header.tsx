import React from 'react'
import logo from '../assets/Mortal-Kombat-Logo.png'
import { useAppSelector } from '../store/hooks'

export const Header: React.FC = () => {
  const hasSquad = useAppSelector(s => s.squad.ids.length > 0)
  return (
    <>
      <div className="topbar">
        <div className="logo-overlap" id="app-logo">
          <img src={logo} alt="Mortal Kombat" />
        </div>
      </div>
      <div className="header">
        <h1 style={{ marginTop: 12, marginBottom: 4 }}>{hasSquad ? 'Your champions!' : 'Select your squad to defend earthrealm'}</h1>
      </div>
    </>
  )
}

export default Header


