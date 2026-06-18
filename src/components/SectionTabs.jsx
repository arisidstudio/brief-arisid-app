import { Check } from 'lucide-react'

const TABS = [
  { id: 1, label: 'Contact' },
  { id: 2, label: 'Entreprise' },
  { id: 3, label: 'Projet' },
  { id: 4, label: 'Univers' },
  { id: 5, label: 'Livrables' },
  { id: 6, label: 'Final' },
]

export default function SectionTabs({ current, onSelect }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 4,
        overflowX: 'auto',
        paddingBottom: 2,
        scrollbarWidth: 'none',
      }}
    >
      {TABS.map(tab => {
        const isActive = tab.id === current
        const isDone = tab.id < current

        return (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '9px 16px',
              background: 'transparent',
              border: 'none',
              borderBottom: isActive
                ? '2px solid var(--accent)'
                : '2px solid transparent',
              color: isActive
                ? 'var(--text-main)'
                : isDone
                ? 'var(--tab-done-color)'
                : 'var(--text-secondary)',
              fontSize: 13,
              fontWeight: isActive ? 500 : 400,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => {
              if (!isActive) e.currentTarget.style.color = 'var(--text-main)'
            }}
            onMouseLeave={e => {
              if (!isActive)
                e.currentTarget.style.color = isDone ? 'var(--tab-done-color)' : 'var(--text-secondary)'
            }}
          >
            {isDone && <Check size={12} color="var(--tab-done-color)" />}
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
