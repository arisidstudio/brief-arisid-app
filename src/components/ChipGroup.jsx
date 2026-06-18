export default function ChipGroup({ options, selected, multiSelect = false, onChange }) {
  const isSelected = (opt) =>
    multiSelect ? selected.includes(opt) : selected === opt

  const handleClick = (opt) => {
    if (multiSelect) {
      if (selected.includes(opt)) {
        onChange(selected.filter(s => s !== opt))
      } else {
        onChange([...selected, opt])
      }
    } else {
      onChange(selected === opt ? '' : opt)
    }
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {options.map(opt => {
        const active = isSelected(opt)
        return (
          <button
            key={opt}
            onClick={() => handleClick(opt)}
            style={{
              background: active ? 'var(--accent-chip-bg)' : 'var(--bg-surface)',
              border: `1px solid ${active ? 'var(--accent)' : 'var(--border-visible)'}`,
              borderRadius: 6,
              padding: '8px 13px',
              fontSize: 12,
              color: active ? 'var(--accent)' : 'var(--text-secondary)',
              fontWeight: active ? 500 : 400,
              cursor: 'pointer',
              transition: 'all 0.15s',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={e => {
              if (!active) {
                e.currentTarget.style.borderColor = 'var(--accent-chip-border-hover)'
                e.currentTarget.style.color = 'var(--text-main)'
              }
            }}
            onMouseLeave={e => {
              if (!active) {
                e.currentTarget.style.borderColor = 'var(--border-visible)'
                e.currentTarget.style.color = 'var(--text-secondary)'
              }
            }}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}
