import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FiltersState {
  search: string
  universe: string | null
  tags: string[]
  myTeamOnly: boolean
}

export const initialState: FiltersState = {
  search: '',
  universe: null,
  tags: [],
  myTeamOnly: false,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    setUniverse(state, action: PayloadAction<string | null>) {
      state.universe = action.payload
    },
    toggleTag(state, action: PayloadAction<string>) {
      const tag = action.payload
      const index = state.tags.indexOf(tag)
      if (index >= 0) state.tags.splice(index, 1)
      else state.tags.push(tag)
    },
    clearFilters(state) {
      state.search = ''
      state.universe = null
      state.tags = []
      state.myTeamOnly = false
    },
    toggleMyTeam(state) {
      state.myTeamOnly = !state.myTeamOnly
    },
  },
})

export const { setSearch, setUniverse, toggleTag, clearFilters, toggleMyTeam } = filtersSlice.actions
export default filtersSlice.reducer


