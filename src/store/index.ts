import { configureStore } from '@reduxjs/toolkit'
import charactersReducer, { type CharactersState } from './slices/charactersSlice'
import filtersReducer, { type FiltersState } from './slices/filtersSlice'
import squadReducer, { type SquadState } from './slices/squadSlice'

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    filters: filtersReducer,
    squad: squadReducer,
  },
})

export interface RootState {
  characters: CharactersState
  filters: FiltersState
  squad: SquadState
}
export type AppDispatch = typeof store.dispatch


