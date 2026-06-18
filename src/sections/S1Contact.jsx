import { useState } from 'react'
import GuideBlock from '../components/GuideBlock'
import QuestionBlock from '../components/QuestionBlock'

const fields = [
  { key: 'nom', label: 'Nom complet', placeholder: 'Prénom Nom' },
  { key: 'entreprise', label: 'Entreprise / Marque', placeholder: 'Nom de la marque' },
  { key: 'email', label: 'Email', placeholder: 'contact@marque.com', type: 'email' },
  { key: 'telephone', label: 'Téléphone', placeholder: '+33 6 00 00 00 00', type: 'tel' },
  { key: 'siteWeb', label: 'Site web existant', placeholder: 'www.votresite.com', type: 'url' },
  { key: 'paysVille', label: 'Pays / Ville', placeholder: 'Paris, France' },
]

function InputField({ value, onChange, placeholder, type = 'text' }) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      type={type}
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

export default function S1Contact({ data, onChange }) {
  return (
    <GuideBlock title="Vos coordonnées" subtitle="Informations de contact du client">
      {fields.map((field, i) => (
        <QuestionBlock
          key={field.key}
          number={i + 1}
          label={field.label}
          last={i === fields.length - 1}
        >
          <InputField
            value={data[field.key] || ''}
            onChange={val => onChange(field.key, val)}
            placeholder={field.placeholder}
            type={field.type}
          />
        </QuestionBlock>
      ))}
    </GuideBlock>
  )
}
