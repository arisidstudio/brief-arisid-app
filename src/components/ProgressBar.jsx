export default function ProgressBar({ current, total }) {
  const percent = ((current - 1) / (total - 1)) * 100

  return (
    <div style={{ height: 2, background: 'var(--border-subtle)', width: '100%' }}>
      <div
        style={{
          height: '100%',
          width: `${percent}%`,
          background: 'linear-gradient(90deg, var(--accent), var(--accent-hover))',
          transition: 'width 0.4s ease',
          boxShadow: '0 0 8px var(--accent-glow)',
        }}
      />
    </div>
  )
}
