import { RotateCcw, Sun, Moon } from 'lucide-react'

export default function Navbar({ currentSection, totalSections, onReset, isDark, onToggleTheme }) {
  return (
    <nav
      style={{
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'background 0.25s ease',
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: '0 28px',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <img
          src="/LOGO ARISID STUDIO Blanc.png"
          alt="ARISID STUDIO"
          style={{
            height: 34,
            width: 'auto',
            objectFit: 'contain',
            filter: 'var(--logo-filter)',
            transition: 'filter 0.25s ease',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
            Section{' '}
            <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{currentSection}</span>
            {' '}/{' '}
            <span>{totalSections}</span>
          </span>

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            title={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 34,
              height: 34,
              background: 'transparent',
              border: '1px solid var(--border-visible)',
              borderRadius: 6,
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--accent)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-visible)'
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button
            onClick={onReset}
            title="Réinitialiser l'entretien"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'transparent',
              border: '1px solid var(--border-visible)',
              borderRadius: 6,
              color: 'var(--text-secondary)',
              fontSize: 12,
              padding: '6px 12px',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(124,45,158,0.55)'
              e.currentTarget.style.color = 'var(--text-main)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-visible)'
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
          >
            <RotateCcw size={13} />
            Réinitialiser
          </button>
        </div>
      </div>
    </nav>
  )
}
