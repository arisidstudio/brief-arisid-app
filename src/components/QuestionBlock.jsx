export default function QuestionBlock({ number, label, children, last = false }) {
  return (
    <div
      style={{
        paddingBottom: last ? 0 : 28,
        marginBottom: last ? 0 : 28,
        borderBottom: last ? 'none' : '1px solid var(--border-subtle)',
      }}
    >
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: '50%',
            background: 'var(--accent-chip-bg)',
            border: '1px solid rgba(124,45,158,0.45)',
            color: 'var(--accent)',
            fontSize: 11,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: 2,
          }}
        >
          {number}
        </div>

        <div style={{ flex: 1 }}>
          <p
            style={{
              fontSize: 11,
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 12,
              fontWeight: 500,
            }}
          >
            {label}
          </p>
          {children}
        </div>
      </div>
    </div>
  )
}
