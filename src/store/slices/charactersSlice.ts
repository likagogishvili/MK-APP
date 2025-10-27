import { createSlice } from '@reduxjs/toolkit'
import data from '../../data/characters.json'
import type { Character } from '../../types'

export interface CharactersState {
  all: Character[]
}

export const initialState: CharactersState = {
  all: data as unknown as Character[],
}

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
})

export default charactersSlice.reducer


