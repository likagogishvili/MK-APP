import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setSearch, toggleTag, clearFilters, toggleMyTeam } from '../store/slices/filtersSlice'
import { selectAllTags } from '../store/selectors'
import searchIcon from '../assets/search.svg'

export const FilterBar: React.FC = () => {
  const dispatch = useAppDispatch()
  const search = useAppSelector(s => s.filters.search)
  const selectedTags = useAppSelector(s => s.filters.tags)
  const myTeamOnly = useAppSelector(s => s.filters.myTeamOnly)
  const tags = useAppSelector(selectAllTags)

  return (
    <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
      <div className="search-wrap">
        <div className="search-divider" />
        <div className="search-container">
          <span className="search-icon">
            <img src={searchIcon} alt="" aria-hidden="true" width={16} height={16} />
          </span>
          <input
            placeholder="Search characters"
            value={search}
            onChange={e => dispatch(setSearch(e.target.value))}
            className="search"
          />
        </div>
      </div>
      <div className="chips-wrap">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-start' }}>
          {tags.map(tag => {
            const active = selectedTags.includes(tag)
            return (
              <button
                key={tag}
                onClick={() => dispatch(toggleTag(tag))}
                className={`chip ${active ? 'chip--active' : ''}`}
              >
                {tag}
              </button>
            )
          })}
          <button onClick={() => dispatch(toggleMyTeam())} className={`chip ${myTeamOnly ? 'chip--active' : ''}`}>My Team</button>
          <span onClick={() => dispatch(clearFilters())} className="clear-link" style={{ marginLeft: 8 }}>Clear all</span>
        </div>
      </div>
    </div>
  )
}

export default FilterBar


