import { useState } from 'react'
import GuideBlock from '../components/GuideBlock'
import QuestionBlock from '../components/QuestionBlock'
import ChipGroup from '../components/ChipGroup'
import TextareaNote from '../components/TextareaNote'

const AMBIANCES = [
  "Minimaliste", "Luxe", "Organique", "Éditorial", "Expressif",
  "Tech/Futuriste", "Vintage/Rétro", "Artisanal", "Coloré", "Sombre", "Épuré", "Audacieux"
]
const COULEURS = ["Neutrals", "Earthy", "Dark & violet", "Pastels", "Vivid", "Mono", "Green", "Gold", "Autre"]
const IDENTITE = ["Non — partir de zéro", "Oui — à moderniser", "Oui — rebrand partiel"]

function InputField({ value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: '100%',
        background: 'var(--input-bg)',
        border: `1px solid ${focused ? 'var(--accent)' : 'var(--border-visible)'}`,
        borderRadius: 10,
        padding: '12px 15px',
        fontSize: 14,
        color: 'var(--text-main)',
        outline: 'none',
        fontFamily: 'Inter, system-ui, sans-serif',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        boxShadow: focused ? '0 0 0 3px var(--accent-glow-soft)' : 'none',
      }}
    />
  )
}

export default function S4Univers({ data, onChange }) {
  const showAutreCouleur = (data.couleurs || []).includes('Autre')

  return (
    <GuideBlock title="Univers visuel" subtitle="L'ADN graphique de la marque">
      <QuestionBlock number={1} label="Décrivez votre marque en 3 mots">
        <InputField
          value={data.troisMots || ''}
          onChange={v => onChange('troisMots', v)}
          placeholder="Ex : élégante, audacieuse, humaine"
        />
        <div style={{ marginTop: 12 }}>
          <TextareaNote
            value={data.troisMotsNotes || ''}
            onChange={v => onChange('troisMotsNotes', v)}
            placeholder="Développez si besoin…"
            minHeight={80}
          />
        </div>
      </QuestionBlock>

      <QuestionBlock number={2} label="Quelle ambiance visuelle souhaitez-vous ?">
        <ChipGroup
          options={AMBIANCES}
          selected={data.ambiances || []}
          multiSelect
          onChange={v => onChange('ambiances', v)}
        />
        <div style={{ marginTop: 12 }}>
          <TextareaNote
            value={data.ambiancesNotes || ''}
            onChange={v => onChange('ambiancesNotes', v)}
            placeholder="Précisions sur l'ambiance souhaitée…"
            minHeight={80}
          />
        </div>
      </QuestionBlock>

      <QuestionBlock number={3} label="Préférences de couleurs">
        <ChipGroup
          options={COULEURS}
          selected={data.couleurs || []}
          multiSelect
          onChange={v => onChange('couleurs', v)}
        />
        {showAutreCouleur && (
          <div style={{ marginTop: 10 }}>
            <InputField
              value={data.autresCouleurs || ''}
              onChange={v => onChange('autresCouleurs', v)}
              placeholder="Précisez vos couleurs (ex: rouge bordeaux, bleu nuit…)"
            />
          </div>
        )}
        <div style={{ marginTop: 12 }}>
          <TextareaNote
            value={data.couleursNotes || ''}
            onChange={v => onChange('couleursNotes', v)}
            placeholder="Couleurs à éviter, codes hex si vous en avez…"
            minHeight={80}
          />
        </div>
      </QuestionBlock>

      <QuestionBlock number={4} label="Références / Inspirations visuelles">
        <TextareaNote
          value={data.references || ''}
          onChange={v => onChange('references', v)}
          placeholder="URL, noms de marques, descriptions d'ambiances…"
        />
      </QuestionBlock>

      <QuestionBlock number={5} label="Ce que vous aimez — styles, logos, marques inspirants">
        <TextareaNote
          value={data.aime || ''}
          onChange={v => onChange('aime', v)}
          placeholder="Exemples de visuels, logos, marques qui vous inspirent…"
        />
      </QuestionBlock>

      <QuestionBlock number={6} label="Ce que vous ne voulez absolument pas">
        <TextareaNote
          value={data.naime || ''}
          onChange={v => onChange('naime', v)}
          placeholder="Styles, couleurs, approches à éviter absolument…"
        />
      </QuestionBlock>

      <QuestionBlock number={7} label="Avez-vous déjà une identité existante ?" last>
        <ChipGroup
          options={IDENTITE}
          selected={data.identiteExistante || ''}
          multiSelect={false}
          onChange={v => onChange('identiteExistante', v)}
        />
        <div style={{ marginTop: 12 }}>
          <TextareaNote
            value={data.identiteExistanteNotes || ''}
            onChange={v => onChange('identiteExistanteNotes', v)}
            placeholder="Description de l'identité actuelle, éléments à conserver…"
            minHeight={80}
          />
        </div>
      </QuestionBlock>
    </GuideBlock>
  )
}
