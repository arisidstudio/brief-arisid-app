import { useState } from 'react'

export default function TextareaNote({
  value,
  onChange,
  placeholder = 'Notes…',
  minHeight = 100,
  label,
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <span style={{ fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {label}
        </span>
      )}
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background: 'var(--input-bg)',
          border: `1px solid ${focused ? 'var(--accent)' : 'var(--border-visible)'}`,
          borderRadius: 10,
          padding: '12px 15px',
          fontSize: 14,
          color: 'var(--text-main)',
          minHeight,
          resize: 'vertical',
          outline: 'none',
          width: '100%',
          fontFamily: 'Inter, system-ui, sans-serif',
          lineHeight: 1.6,
          transition: 'border-color 0.15s, box-shadow 0.15s',
          boxShadow: focused ? '0 0 0 3px var(--accent-glow-soft)' : 'none',
        }}
      />
    </div>
  )
}
