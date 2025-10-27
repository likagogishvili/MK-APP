## Squad of Champions (MKAPP)

I built a small React + TypeScript app where you assemble a squad of fighting game characters. You can search and filter the roster, pick up to 6 champions, and see an at‑a‑glance ability summary for your team.

### Features

- **Search and filter**: Type to search by name or tag. Toggle tags with chips. Use **My Team** to show only selected characters. Clear all with one click.
- **Select up to 6**: Add/remove characters from the squad. Adding is disabled when the squad is full; removing always works.
- **Character table**: See character name, tags, and abilities: **Power**, **Mobility**, **Technique**, **Survivability**, **Energy**. Max scores (10) are highlighted.
- **Squad avatars**: Selected characters appear as large avatars; hover to quickly remove.
- **Ability summary**: Shows the average score per ability across the current squad.

### Quickstart

Prerequisites: Node.js (16+ recommended) and npm.

```bash
npm install
npm start
```

Build for production:

```bash
npm run build
```

Run tests:

```bash
npm test
```

### Tech stack

- **React 18 + TypeScript**
- **Redux Toolkit** for state management, **React‑Redux** typed hooks
- **Memoized selectors** via `createSelector`
- **Styling**: `normalize.css` and custom CSS with tokens in `src/styles/tokens.css`

### Data

Character data lives in `src/data/characters.json` and is loaded into the store at startup. The app does not mutate this file.

### Architecture overview

- **Store** (`src/store/`)
  - `charactersSlice`: loads all characters from JSON
  - `filtersSlice`: search text, selected tags, universe (reserved), and My Team toggle
  - `squadSlice`: selected character IDs with a limit of 6
  - `selectors.ts`: derived data (filtered list, squad members, ability averages)
  - `hooks.ts`: typed `useAppDispatch` and `useAppSelector`
- **Components** (`src/components/`)
  - `Header`: app title that reflects whether a squad exists
  - `SquadAvatars`: big, removable avatars for selected characters
  - `AbilitySummary`: averages for each ability across the squad
  - `FilterBar`: search input, tag chips, My Team toggle, Clear all
  - `CharacterTable`: sortable‑style table rendering characters and abilities
  - `CharacterCard` / `CharacterGrid`: alternative card/grid view (kept in codebase)
- **Entry**: `App.tsx` composes the header, avatars, summary, filters, and table

### Performance notes

- **Selectors** are memoized to avoid unnecessary re‑renders when filters/squad don’t change.
- **Rows** in the table are wrapped with `React.memo` and keyed by character ID.
- **Set lookup** via `useMemo` speeds up in‑squad checks.

### Accessibility & UX

- Table rows use a checkbox to add/remove from squad and highlight when selected.
- Controls are keyboard accessible, and interactive elements have clear focus/hover states.

### Project scripts

- `npm start`: run the dev server
- `npm run build`: build production assets
- `npm test`: run tests
- `npm run eject`: CRA eject (not recommended)

### Folder structure (high level)

- `src/components/` UI building blocks
- `src/store/` Redux slices, selectors, and typed hooks
- `src/data/` static characters JSON
- `src/styles/` CSS tokens and styling

### License

See `LICENSE` for license details.