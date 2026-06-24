import { useState } from 'react'
import { X, FileDown, Loader, StickyNote } from 'lucide-react'

function formatDateTime() {
  return new Date().toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function formatDateShort() {
  return new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')
}

function buildNotesPDF(entreprise, notes) {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"/>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', Arial, sans-serif; color: #1a1a1a; background: #fff; font-size: 13px; line-height: 1.6; }
  .page { padding: 48px 56px; max-width: 800px; margin: 0 auto; }
  .header {
    display: flex; justify-content: space-between; align-items: flex-start;
    padding-bottom: 24px; border-bottom: 2px solid #7c2d9e; margin-bottom: 32px;
  }
  .logo-arisid { font-size: 22px; font-weight: 700; letter-spacing: 0.1em; color: #1a1a1a; }
  .logo-studio { font-size: 9px; letter-spacing: 0.28em; text-transform: uppercase; color: #888; }
  .header-right { text-align: right; }
  .header-date { font-size: 11px; color: #888; margin-bottom: 4px; }
  .header-title { font-size: 13px; font-weight: 600; color: #7c2d9e; letter-spacing: 0.04em; text-transform: uppercase; }
  .entreprise-block {
    margin-bottom: 28px; padding: 16px 20px;
    background: #faf7ff; border-left: 3px solid #7c2d9e; border-radius: 4px;
  }
  .entreprise-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #888; margin-bottom: 4px; }
  .entreprise-name { font-size: 18px; font-weight: 700; color: #1a1a1a; }
  .notes-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #888; margin-bottom: 12px; }
  .notes-content { font-size: 13px; color: #1a1a1a; line-height: 1.8; white-space: pre-wrap; }
  .footer {
    margin-top: 48px; padding-top: 20px; border-top: 1px solid #e8e8e8;
    display: flex; justify-content: space-between; font-size: 10px; color: #aaa;
  }
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <div>
      <div class="logo-arisid">ARISID</div>
      <div class="logo-studio">STUDIO</div>
    </div>
    <div class="header-right">
      <div class="header-date">${formatDateTime()}</div>
      <div class="header-title">Notes de réunion</div>
    </div>
  </div>

  ${entreprise ? `
  <div class="entreprise-block">
    <div class="entreprise-label">Entreprise / Marque</div>
    <div class="entreprise-name">${entreprise}</div>
  </div>` : ''}

  <div class="notes-label">Notes</div>
  <div class="notes-content">${notes ? notes.replace(/</g, '&lt;').replace(/>/g, '&gt;') : '—'}</div>

  <div class="footer">
    <span>Notes générées par ARISID STUDIO — arisidstudio.com</span>
    <span>${formatDateShort()}</span>
  </div>
</div>
</body>
</html>`
}

export default function QuickNotes({ onClose }) {
  const [entreprise, setEntreprise] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const { default: jsPDF } = await import('jspdf')
      const { default: html2canvas } = await import('html2canvas')

      const html = buildNotesPDF(entreprise, notes)
      const container = document.createElement('div')
      container.style.cssText = 'position:fixed;left:-9999px;top:0;width:800px;background:#fff;'
      container.innerHTML = html
      document.body.appendChild(container)

      await new Promise(r => setTimeout(r, 500))

      const canvas = await html2canvas(container, {
        scale: 2, useCORS: true, backgroundColor: '#ffffff', width: 800, windowWidth: 800,
      })
      document.body.removeChild(container)

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const pdfW = pdf.internal.pageSize.getWidth()
      const pdfH = pdf.internal.pageSize.getHeight()
      const imgH = (canvas.height * pdfW) / canvas.width
      let heightLeft = imgH
      let position = 0

      pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, position, pdfW, imgH)
      heightLeft -= pdfH
      while (heightLeft > 0) {
        position = heightLeft - imgH
        pdf.addPage()
        pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, position, pdfW, imgH)
        heightLeft -= pdfH
      }

      const nom = entreprise ? entreprise.replace(/\s+/g, '_') : 'Notes'
      pdf.save(`Notes_${nom}_${formatDateShort()}.pdf`)
      onClose()
    } catch (err) {
      console.error('Erreur PDF:', err)
      alert('Erreur lors de la génération du PDF.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 300, padding: 24,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-visible)',
          borderRadius: 14,
          width: '100%', maxWidth: 680,
          maxHeight: '90vh',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
          overflow: 'hidden',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--accent-chip-bg)',
              border: '1px solid rgba(124,45,158,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <StickyNote size={15} color="var(--accent)" />
            </div>
            <div>
              <h2 style={{
                fontFamily: 'Clash Display, system-ui, sans-serif',
                fontWeight: 700, fontSize: 15,
                letterSpacing: '0.05em', textTransform: 'uppercase',
                color: 'var(--text-main)',
              }}>
                Notes rapides
              </h2>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 1 }}>
                Prise de notes libre — export PDF en un clic
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32, height: 32, borderRadius: 6,
              background: 'transparent',
              border: '1px solid var(--border-visible)',
              color: 'var(--text-secondary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-visible)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 24px 0' }}>
          {/* Champ entreprise */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: 'block', fontSize: 11, fontWeight: 500,
              textTransform: 'uppercase', letterSpacing: '0.08em',
              color: 'var(--text-secondary)', marginBottom: 8,
            }}>
              Entreprise / Marque
            </label>
            <input
              type="text"
              value={entreprise}
              onChange={e => setEntreprise(e.target.value)}
              placeholder="Nom de l'entreprise ou de la marque…"
              onFocus={() => setFocusedField('entreprise')}
              onBlur={() => setFocusedField(null)}
              style={{
                width: '100%',
                background: 'var(--input-bg)',
                border: `1px solid ${focusedField === 'entreprise' ? 'var(--accent)' : 'var(--border-visible)'}`,
                borderRadius: 10, padding: '12px 15px',
                fontSize: 14, color: 'var(--text-main)',
                outline: 'none', fontFamily: 'Inter, system-ui, sans-serif',
                transition: 'all 0.15s',
                boxShadow: focusedField === 'entreprise' ? '0 0 0 3px var(--accent-glow-soft)' : 'none',
              }}
            />
          </div>

          {/* Zone de notes */}
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: 'block', fontSize: 11, fontWeight: 500,
              textTransform: 'uppercase', letterSpacing: '0.08em',
              color: 'var(--text-secondary)', marginBottom: 8,
            }}>
              Notes
            </label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Écrivez librement vos notes de réunion, observations, idées, points importants…"
              onFocus={() => setFocusedField('notes')}
              onBlur={() => setFocusedField(null)}
              style={{
                width: '100%', minHeight: 320, resize: 'vertical',
                background: 'var(--input-bg)',
                border: `1px solid ${focusedField === 'notes' ? 'var(--accent)' : 'var(--border-visible)'}`,
                borderRadius: 10, padding: '14px 15px',
                fontSize: 14, color: 'var(--text-main)',
                outline: 'none', fontFamily: 'Inter, system-ui, sans-serif',
                lineHeight: 1.7, transition: 'all 0.15s',
                boxShadow: focusedField === 'notes' ? '0 0 0 3px var(--accent-glow-soft)' : 'none',
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexShrink: 0,
          background: 'var(--bg-surface)',
        }}>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-visible)',
              borderRadius: 8, color: 'var(--text-secondary)',
              fontSize: 13, padding: '10px 18px', cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            Annuler
          </button>

          <button
            onClick={handleGenerate}
            disabled={loading || !notes.trim()}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: loading || !notes.trim() ? 'var(--bg-surface2)' : 'var(--accent)',
              border: 'none', borderRadius: 8,
              color: loading || !notes.trim() ? 'var(--text-tertiary)' : '#ffffff',
              fontSize: 13, fontWeight: 600, padding: '10px 22px',
              cursor: loading || !notes.trim() ? 'not-allowed' : 'pointer',
              letterSpacing: '0.04em', textTransform: 'uppercase',
              transition: 'all 0.2s',
              boxShadow: loading || !notes.trim() ? 'none' : '0 4px 16px var(--accent-glow)',
            }}
            onMouseEnter={e => { if (!loading && notes.trim()) e.currentTarget.style.background = 'var(--accent-hover)' }}
            onMouseLeave={e => { if (!loading && notes.trim()) e.currentTarget.style.background = 'var(--accent)' }}
          >
            {loading
              ? <><Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /> Génération…</>
              : <><FileDown size={14} /> Terminer & générer le PDF</>
            }
          </button>
        </div>
      </div>
    </div>
  )
}
