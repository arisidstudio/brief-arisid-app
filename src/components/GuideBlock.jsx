export default function GuideBlock({ title, subtitle, children }) {
  return (
    <div
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-visible)',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 32,
        boxShadow: 'var(--shadow-card)',
        transition: 'background 0.25s ease, border-color 0.25s ease',
      }}
    >
      <div
        style={{
          padding: '20px 24px 16px',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <h2
          style={{
            fontFamily: 'Clash Display, system-ui, sans-serif',
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--text-main)',
            marginBottom: subtitle ? 4 : 0,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{subtitle}</p>
        )}
      </div>

      <div style={{ padding: '24px 24px 24px' }}>
        {children}
      </div>
    </div>
  )
}
