import { useState } from 'react'
import { FileDown, Loader } from 'lucide-react'

function formatDate() {
  return new Date().toLocaleDateString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  })
}

function formatDateTime() {
  return new Date().toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

function chips(arr) {
  if (!arr || arr.length === 0) return '—'
  return arr.join(', ')
}

function val(v) {
  if (!v && v !== 0) return '—'
  return String(v)
}

function buildPDFContent(allData) {
  const { s1, s2, s3, s4, s5, s6 } = allData
  const clientName = s1.nom || 'Client'
  const brandName = s1.entreprise || ''

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"/>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Inter', Arial, sans-serif;
    color: #1a1a1a;
    background: #fff;
    font-size: 13px;
    line-height: 1.6;
  }
  .page { padding: 48px 56px; max-width: 800px; margin: 0 auto; }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 28px;
    border-bottom: 2px solid #7c2d9e;
    margin-bottom: 36px;
  }
  .logo-block { display: flex; flex-direction: column; gap: 2px; }
  .logo-arisid {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #1a1a1a;
  }
  .logo-studio {
    font-size: 9px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #888;
    font-weight: 400;
  }
  .header-right { text-align: right; }
  .header-date { font-size: 12px; color: #666; margin-bottom: 4px; }
  .header-client { font-size: 15px; font-weight: 600; color: #1a1a1a; }
  .header-brand { font-size: 12px; color: #666; }
  .section-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #7c2d9e;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e8e8e8;
  }
  .section-block { margin-bottom: 36px; page-break-inside: avoid; }
  .question-row { margin-bottom: 14px; }
  .question-label {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: #888;
    margin-bottom: 4px;
  }
  .question-value { font-size: 13px; color: #1a1a1a; }
  .question-chips {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 4px;
  }
  .chip {
    background: #f3e8ff;
    border: 1px solid #d8b4fe;
    border-radius: 4px;
    padding: 2px 8px;
    font-size: 11px;
    color: #6b21a8;
    font-weight: 500;
  }
  .empty { color: #aaa; font-style: italic; }
  .scale-badge {
    display: inline-block;
    background: #7c2d9e;
    color: white;
    border-radius: 4px;
    padding: 2px 10px;
    font-weight: 700;
    font-size: 13px;
    margin-right: 6px;
  }
  .footer {
    margin-top: 48px;
    padding-top: 20px;
    border-top: 1px solid #e8e8e8;
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: #aaa;
  }
  .divider { height: 1px; background: #f0f0f0; margin: 20px 0; }
</style>
</head>
<body>
<div class="page">

  <div class="header">
    <div class="logo-block">
      <span class="logo-arisid">ARISID</span>
      <span class="logo-studio">STUDIO</span>
    </div>
    <div class="header-right">
      <div class="header-date">Brief d'entretien — ${formatDateTime()}</div>
      <div class="header-client">${val(s1.nom)}</div>
      ${s1.entreprise ? `<div class="header-brand">${s1.entreprise}</div>` : ''}
    </div>
  </div>

  <!-- SECTION 1 -->
  <div class="section-block">
    <div class="section-title">1 — Coordonnées</div>
    ${row('Nom complet', s1.nom)}
    ${row('Entreprise / Marque', s1.entreprise)}
    ${row('Email', s1.email)}
    ${row('Téléphone', s1.telephone)}
    ${row('Site web', s1.siteWeb)}
    ${row('Pays / Ville', s1.paysVille)}
  </div>

  <!-- SECTION 2 -->
  <div class="section-block">
    <div class="section-title">2 — Entreprise</div>
    ${row('Secteur d\'activité', s2.secteur)}
    ${rowChipNote("Ancienneté", s2.anciennete ? [s2.anciennete] : [], s2.ancienneteNotes)}
    ${row('Produit / Service', s2.produit)}
    ${row('Cible', s2.cible)}
    ${row('Origine du nom', s2.nomOrigine)}
    ${row('Intention derrière le nom', s2.nomIntention)}
    ${row('Ressenti souhaité', s2.nomRessentis)}
    ${row('Valeurs fondamentales', s2.valeurs)}
    ${row('Différenciation', s2.differenciation)}
    ${row('Concurrents directs', s2.concurrents)}
    ${rowChipNote("Canaux de présence", s2.canaux, s2.canauxNotes)}
  </div>

  <!-- SECTION 3 -->
  <div class="section-block">
    <div class="section-title">3 — Projet</div>
    ${rowChipNote("Type de projet", s3.typeProjet, s3.typeProjetNotes)}
    ${rowChipNote("Objectif principal", s3.objectif ? [s3.objectif] : [], s3.objectifNotes)}
    ${row('Déclencheur', s3.declencheur)}
    ${row('Vision du succès', s3.succes)}
    ${rowChipNote("Date butoir", s3.delai ? [s3.delai] : [], s3.delaiNotes)}
    ${rowChipNote("Décideur final", s3.decision ? [s3.decision] : [], s3.decisionNotes)}
  </div>

  <!-- SECTION 4 -->
  <div class="section-block">
    <div class="section-title">4 — Univers visuel</div>
    ${rowNoteOnly('3 mots pour la marque', s4.troisMots, s4.troisMotsNotes)}
    ${rowChipNote("Ambiances visuelles", s4.ambiances, s4.ambiancesNotes)}
    ${rowChipNote("Préférences couleurs", s4.couleurs, s4.couleursNotes, s4.autresCouleurs)}
    ${row('Références / Inspirations', s4.references)}
    ${row('Ce qui est aimé', s4.aime)}
    ${row('Ce qui est à éviter', s4.naime)}
    ${rowChipNote("Identité existante", s4.identiteExistante ? [s4.identiteExistante] : [], s4.identiteExistanteNotes)}
  </div>

  <!-- SECTION 5 -->
  <div class="section-block">
    <div class="section-title">5 — Livrables & contraintes</div>
    ${rowChipNote("Supports à créer", s5.supports, s5.supportsNotes)}
    ${rowChipNote("Formats attendus", s5.formats, s5.formatsNotes)}
    ${row('Contraintes techniques', s5.contraintes)}
    ${rowScale("Niveau de finition", s5.finition, "Fonctionnel", "Haut de gamme", 5, s5.finitionNotes)}
  </div>

  <!-- SECTION 6 -->
  <div class="section-block">
    <div class="section-title">6 — Pour aller plus loin</div>
    ${rowScale("Révisions attendues", s6.revisions, "1 révision", "4+ révisions", 4, s6.revisionsNotes)}
    ${rowChipNote("Confidentialité", s6.confidentialite ? [s6.confidentialite] : [], s6.confidentialiteNotes)}
    ${rowChipNote("Découverte d'ARISID STUDIO", s6.decouverte, s6.decouverteNotes)}
    ${row('Notes libres de fin d\'entretien', s6.notesFinales)}
  </div>

  <div class="footer">
    <span>Brief généré par ARISID STUDIO — arisidstudio.com</span>
    <span>${formatDate()}</span>
  </div>

</div>
</body>
</html>
  `

  function row(label, value) {
    const display = value && value.trim() ? value.replace(/\n/g, '<br/>') : '<span class="empty">Non renseigné</span>'
    return `<div class="question-row"><div class="question-label">${label}</div><div class="question-value">${display}</div></div>`
  }

  function rowChipNote(label, chipsArr, notes, extra) {
    const hasChips = chipsArr && chipsArr.length > 0
    const hasNotes = notes && notes.trim()
    const hasExtra = extra && extra.trim()
    let content = ''
    if (hasChips) {
      content += `<div class="question-chips">${chipsArr.map(c => `<span class="chip">${c}</span>`).join('')}</div>`
      if (hasExtra) content += `<div class="question-value" style="margin-bottom:4px">${extra}</div>`
    }
    if (hasNotes) content += `<div class="question-value">${notes.replace(/\n/g, '<br/>')}</div>`
    if (!hasChips && !hasNotes) content = '<span class="empty">Non renseigné</span>'
    return `<div class="question-row"><div class="question-label">${label}</div><div class="question-value">${content}</div></div>`
  }

  function rowNoteOnly(label, mainVal, notes) {
    let content = ''
    if (mainVal && mainVal.trim()) content += `<div class="question-value" style="font-weight:500;margin-bottom:4px">${mainVal}</div>`
    if (notes && notes.trim()) content += `<div class="question-value">${notes.replace(/\n/g, '<br/>')}</div>`
    if (!content) content = '<span class="empty">Non renseigné</span>'
    return `<div class="question-row"><div class="question-label">${label}</div>${content}</div>`
  }

  function rowScale(label, scaleVal, lMin, lMax, maxVal, notes) {
    let content = ''
    if (scaleVal) {
      content += `<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px"><span class="scale-badge">${scaleVal}/${maxVal}</span><span style="color:#666;font-size:12px">${lMin} → ${lMax}</span></div>`
    }
    if (notes && notes.trim()) content += `<div class="question-value">${notes.replace(/\n/g, '<br/>')}</div>`
    if (!content) content = '<span class="empty">Non renseigné</span>'
    return `<div class="question-row"><div class="question-label">${label}</div><div class="question-value">${content}</div></div>`
  }
}

export default function PDFExport({ allData }) {
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const { default: jsPDF } = await import('jspdf')
      const { default: html2canvas } = await import('html2canvas')

      const htmlContent = buildPDFContent(allData)

      const container = document.createElement('div')
      container.style.cssText = 'position:fixed;left:-9999px;top:0;width:800px;background:#fff;'
      container.innerHTML = htmlContent
      document.body.appendChild(container)

      await new Promise(r => setTimeout(r, 600))

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 800,
        windowWidth: 800,
      })

      document.body.removeChild(container)

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const pdfW = pdf.internal.pageSize.getWidth()
      const pdfH = pdf.internal.pageSize.getHeight()
      const imgW = pdfW
      const imgH = (canvas.height * imgW) / canvas.width
      const pageH = pdfH
      let heightLeft = imgH
      let position = 0

      pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, position, imgW, imgH)
      heightLeft -= pageH

      while (heightLeft > 0) {
        position = heightLeft - imgH
        pdf.addPage()
        pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, position, imgW, imgH)
        heightLeft -= pageH
      }

      const s1 = allData.s1
      const nom = s1.nom ? s1.nom.replace(/\s+/g, '_') : 'ARISID'
      const marque = s1.entreprise ? '_' + s1.entreprise.replace(/\s+/g, '_') : ''
      const date = new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')
      pdf.save(`Brief_${nom}${marque}_${date}.pdf`)
    } catch (err) {
      console.error('Erreur PDF:', err)
      alert('Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleGenerate}
      disabled={loading}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: loading ? '#555' : '#7c2d9e',
        color: '#f2f2f2',
        border: 'none',
        borderRadius: 8,
        padding: '14px 28px',
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
        boxShadow: loading ? 'none' : '0 4px 20px rgba(124,45,158,0.35)',
      }}
      onMouseEnter={e => {
        if (!loading) e.currentTarget.style.background = '#9535ba'
      }}
      onMouseLeave={e => {
        if (!loading) e.currentTarget.style.background = '#7c2d9e'
      }}
    >
      {loading ? <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <FileDown size={16} />}
      {loading ? 'Génération en cours…' : 'Générer le compte-rendu PDF'}
    </button>
  )
}
