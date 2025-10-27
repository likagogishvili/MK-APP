import './App.css'
import { useAppDispatch } from './store/hooks'
import Header from './components/Header'
import AbilitySummary from './components/AbilitySummary'
import SquadAvatars from './components/SquadAvatars'
import FilterBar from './components/FilterBar'
import CharacterTable from './components/CharacterTable'

function App() {
  useAppDispatch()

  return (
    <div>
      <Header />
      <SquadAvatars />
      <AbilitySummary />
      <div className="container">
        <FilterBar />
        <CharacterTable />
      </div>
    </div>
  )
}

export default App
