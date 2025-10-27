import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from './index'
import type { Character } from '../types'

export const selectAllCharacters = (state: RootState) => state.characters.all
export const selectFilters = (state: RootState) => state.filters
export const selectSquadIds = (state: RootState) => state.squad.ids
export const selectSquadLimit = (state: RootState) => state.squad.limit

export const ABILITY_ORDER: ReadonlyArray<'Power' | 'Mobility' | 'Technique' | 'Survivability' | 'Energy'> = [
  'Power',
  'Mobility',
  'Technique',
  'Survivability',
  'Energy',
]

export const selectUniverses = createSelector([selectAllCharacters], (chars): string[] => {
  const set = new Set<string>()
  chars.forEach(c => set.add(c.universe))
  return Array.from(set).sort()
})

export const selectAllTags = createSelector([selectAllCharacters], (chars): string[] => {
  const set = new Set<string>()
  chars.forEach((c: Character) => c.tags?.forEach((t: { tag_name: string }) => set.add(t.tag_name)))
  return Array.from(set).sort()
})

export const selectFilteredCharacters = createSelector(
  [selectAllCharacters, selectFilters, selectSquadIds],
  (chars, filters, squadIds): Character[] => {
    const searchLower = filters.search.trim().toLowerCase()
    return chars.filter((c: Character) => {
      if (filters.universe && c.universe !== filters.universe) return false
      if (searchLower) {
        const nameMatches = c.name.toLowerCase().includes(searchLower)
        const tagMatches = (c.tags || []).some((t: { tag_name: string }) => t.tag_name.toLowerCase().includes(searchLower))
        if (!nameMatches && !tagMatches) return false
      }
      if (filters.myTeamOnly && !squadIds.includes(c.id)) return false
      if (filters.tags.length > 0) {
        const charTags = new Set((c.tags || []).map((t: { tag_name: string }) => t.tag_name))
        const hasAll = filters.tags.every((tag: string) => charTags.has(tag))
        if (!hasAll) return false
      }
      return true
    })
  }
)

export const selectSquadMembers = createSelector(
  [selectAllCharacters, selectSquadIds],
  (chars, ids): Character[] => ids.map((id: number) => chars.find((c: Character) => c.id === id)!).filter(Boolean) as Character[]
)

export const selectCanAddToSquad = createSelector(
  [selectSquadIds, selectSquadLimit],
  (ids, limit) => ids.length < limit
)

export interface AbilityAverages {
  Power: number | null
  Mobility: number | null
  Technique: number | null
  Survivability: number | null
  Energy: number | null
}

export const selectSquadAbilityAverages = createSelector([selectSquadMembers], (members): AbilityAverages => {
  if (members.length === 0) {
    return { Power: null, Mobility: null, Technique: null, Survivability: null, Energy: null }
  }
  const sums: Record<string, number> = { Power: 0, Mobility: 0, Technique: 0, Survivability: 0, Energy: 0 }
  members.forEach((m: Character) => {
    ABILITY_ORDER.forEach((key) => {
      const ability = m.abilities.find(a => a.abilityName === key)
      if (ability) sums[key] += ability.abilityScore
    })
  })
  const avg = (v: number) => Number((v / members.length).toFixed(2))
  const result: AbilityAverages = {
    Power: avg(sums['Power']),
    Mobility: avg(sums['Mobility']),
    Technique: avg(sums['Technique']),
    Survivability: avg(sums['Survivability']),
    Energy: avg(sums['Energy']),
  }
  return result
})


