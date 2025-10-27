import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SquadState {
  ids: number[]
  limit: number
}

export const initialState: SquadState = {
  ids: [],
  limit: 6,
}

const squadSlice = createSlice({
  name: 'squad',
  initialState,
  reducers: {
    addToSquad(state, action: PayloadAction<number>) {
      const id = action.payload
      if (state.ids.includes(id)) return
      if (state.ids.length >= state.limit) return
      state.ids.push(id)
    },
    removeFromSquad(state, action: PayloadAction<number>) {
      const id = action.payload
      state.ids = state.ids.filter(existingId => existingId !== id)
    },
    clearSquad(state) {
      state.ids = []
    },
  },
})

export const { addToSquad, removeFromSquad, clearSquad } = squadSlice.actions
export default squadSlice.reducer


