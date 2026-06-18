export default function ScaleInput({ min = 1, max = 5, value, onChange, labelMin, labelMax }) {
  const steps = Array.from({ length: max - min + 1 }, (_, i) => i + min)

  return (
    <div>
      <div style={{ display: 'flex', gap: 8 }}>
        {steps.map(step => {
          const active = value === step
          return (
            <button
              key={step}
              onClick={() => onChange(active ? null : step)}
              style={{
                width: 44,
                height: 44,
                background: active ? 'var(--accent-chip-bg)' : 'var(--bg-surface)',
                border: `1px solid ${active ? 'var(--accent)' : 'var(--border-visible)'}`,
                borderRadius: 6,
                color: active ? 'var(--accent)' : 'var(--text-secondary)',
                fontSize: 14,
                fontWeight: active ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.15s',
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
              {step}
            </button>
          )
        })}
      </div>
      {(labelMin || labelMax) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{labelMin}</span>
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{labelMax}</span>
        </div>
      )}
    </div>
  )
}
