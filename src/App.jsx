import { useState, useCallback, useEffect } from 'react'
import Navbar from './components/Navbar'
import ProgressBar from './components/ProgressBar'
import SectionTabs from './components/SectionTabs'
import PDFExport from './components/PDFExport'
import S1Contact from './sections/S1Contact'
import S2Entreprise from './sections/S2Entreprise'
import S3Projet from './sections/S3Projet'
import S4Univers from './sections/S4Univers'
import S5Livrables from './sections/S5Livrables'
import S6Final from './sections/S6Final'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import QuickNotes from './components/QuickNotes'

const TOTAL_SECTIONS = 6

const initialState = {
  s1: {}, s2: {}, s3: {}, s4: {}, s5: {}, s6: {}
}

export default function App() {
  const [current, setCurrent] = useState(1)
  const [data, setData] = useState(initialState)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [showQuickNotes, setShowQuickNotes] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark(d => !d)

  const updateSection = useCallback((section, key, value) => {
    setData(prev => ({
      ...prev,
      [section]: { ...prev[section], [key]: value }
    }))
  }, [])

  const goTo = (n) => {
    setCurrent(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const confirmReset = () => {
    setData(initialState)
    setCurrent(1)
    setShowResetConfirm(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const sections = {
    1: <S1Contact data={data.s1} onChange={(k, v) => updateSection('s1', k, v)} />,
    2: <S2Entreprise data={data.s2} onChange={(k, v) => updateSection('s2', k, v)} />,
    3: <S3Projet data={data.s3} onChange={(k, v) => updateSection('s3', k, v)} />,
    4: <S4Univers data={data.s4} onChange={(k, v) => updateSection('s4', k, v)} />,
    5: <S5Livrables data={data.s5} onChange={(k, v) => updateSection('s5', k, v)} />,
    6: <S6Final data={data.s6} onChange={(k, v) => updateSection('s6', k, v)} />,
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--radial)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.25s ease',
      }}
    >
      <Navbar
        currentSection={current}
        totalSections={TOTAL_SECTIONS}
        onReset={() => setShowResetConfirm(true)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onQuickNotes={() => setShowQuickNotes(true)}
      />
      <ProgressBar current={current} total={TOTAL_SECTIONS} />

      <main style={{ flex: 1, padding: '32px 28px 60px', maxWidth: 860, width: '100%', margin: '0 auto' }}>
        <div style={{ marginBottom: 28, borderBottom: '1px solid var(--border-subtle)' }}>
          <SectionTabs current={current} onSelect={goTo} />
        </div>

        {sections[current]}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, gap: 12 }}>
          <button
            onClick={() => goTo(current - 1)}
            disabled={current === 1}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'transparent',
              border: '1px solid var(--border-visible)',
              borderRadius: 8,
              color: current === 1 ? 'var(--border-visible)' : 'var(--text-secondary)',
              fontSize: 13,
              padding: '11px 20px',
              cursor: current === 1 ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              if (current !== 1) {
                e.currentTarget.style.borderColor = 'var(--text-secondary)'
                e.currentTarget.style.color = 'var(--text-main)'
              }
            }}
            onMouseLeave={e => {
              if (current !== 1) {
                e.currentTarget.style.borderColor = 'var(--border-visible)'
                e.currentTarget.style.color = 'var(--text-secondary)'
              }
            }}
          >
            <ChevronLeft size={15} />
            Section précédente
          </button>

          {current === TOTAL_SECTIONS && (
            <PDFExport allData={data} />
          )}

          <button
            onClick={() => goTo(current + 1)}
            disabled={current === TOTAL_SECTIONS}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: current === TOTAL_SECTIONS ? 'transparent' : 'var(--accent)',
              border: current === TOTAL_SECTIONS ? '1px solid var(--border-visible)' : 'none',
              borderRadius: 8,
              color: current === TOTAL_SECTIONS ? 'var(--border-visible)' : '#ffffff',
              fontSize: 13,
              fontWeight: current === TOTAL_SECTIONS ? 400 : 600,
              padding: '11px 20px',
              cursor: current === TOTAL_SECTIONS ? 'not-allowed' : 'pointer',
              letterSpacing: current === TOTAL_SECTIONS ? 0 : '0.04em',
              transition: 'all 0.15s',
              boxShadow: current === TOTAL_SECTIONS ? 'none' : '0 4px 16px var(--accent-glow)',
            }}
            onMouseEnter={e => {
              if (current !== TOTAL_SECTIONS) e.currentTarget.style.background = 'var(--accent-hover)'
            }}
            onMouseLeave={e => {
              if (current !== TOTAL_SECTIONS) e.currentTarget.style.background = 'var(--accent)'
            }}
          >
            Section suivante
            <ChevronRight size={15} />
          </button>
        </div>
      </main>

      <footer
        style={{
          borderTop: '1px solid var(--footer-border)',
          padding: '16px 28px',
          textAlign: 'center',
          color: 'var(--text-tertiary)',
          fontSize: 11,
          letterSpacing: '0.04em',
          transition: 'border-color 0.25s ease',
        }}
      >
        © 2025 ARISID STUDIO — Tous droits réservés
      </footer>

      {/* Quick Notes modal */}
      {showQuickNotes && (
        <QuickNotes onClose={() => setShowQuickNotes(false)} />
      )}

      {/* Reset modal */}
      {showResetConfirm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
          }}
          onClick={() => setShowResetConfirm(false)}
        >
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-visible)',
              borderRadius: 12,
              padding: '32px 36px',
              maxWidth: 400,
              width: '90%',
              boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <h3
              style={{
                fontFamily: 'Clash Display, system-ui, sans-serif',
                fontWeight: 700,
                fontSize: 17,
                color: 'var(--text-main)',
                marginBottom: 10,
                letterSpacing: '0.04em',
              }}
            >
              Réinitialiser l'entretien ?
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 24, lineHeight: 1.6 }}>
              Toutes les données saisies seront définitivement effacées. Cette action est irréversible.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowResetConfirm(false)}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-visible)',
                  borderRadius: 6,
                  color: 'var(--text-secondary)',
                  fontSize: 13,
                  padding: '9px 18px',
                  cursor: 'pointer',
                }}
              >
                Annuler
              </button>
              <button
                onClick={confirmReset}
                style={{
                  background: 'var(--accent)',
                  border: 'none',
                  borderRadius: 6,
                  color: '#ffffff',
                  fontSize: 13,
                  fontWeight: 600,
                  padding: '9px 18px',
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                }}
              >
                Oui, réinitialiser
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        input::placeholder, textarea::placeholder {
          color: var(--text-tertiary);
        }
      `}</style>
    </div>
  )
}
