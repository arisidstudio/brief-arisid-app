import GuideBlock from '../components/GuideBlock'
import QuestionBlock from '../components/QuestionBlock'
import ChipGroup from '../components/ChipGroup'
import TextareaNote from '../components/TextareaNote'
import ScaleInput from '../components/ScaleInput'

const CONFIDENTIALITE = ["Non", "Oui — NDA souhaité"]
const CANAUX_DECOUVERTE = ["Instagram", "LinkedIn", "Bouche à oreille", "Google", "Behance/Dribbble", "Autre"]

export default function S6Final({ data, onChange }) {
  return (
    <GuideBlock title="Pour aller plus loin" subtitle="Contexte additionnel et clôture de l'entretien">
      <QuestionBlock number={1} label="Révisions attendues">
        <ScaleInput
          min={1}
          max={4}
          value={data.revisions}
          onChange={v => onChange('revisions', v)}
          labelMin="1 révision"
          labelMax="4+ révisions"
        />
        <div style={{ marginTop: 12 }}>
          <TextareaNote
            value={data.revisionsNotes || ''}
            onChange={v => onChange('revisionsNotes', v)}
            placeholder="Attentes sur le processus de révision…"
            minHeight={80}
          />
        </div>
      </QuestionBlock>

      <QuestionBlock number={2} label="Confidentialité">
        <ChipGroup
          options={CONFIDENTIALITE}
          selected={data.confidentialite || ''}
          multiSelect={false}
          onChange={v => onChange('confidentialite', v)}
        />
        <div style={{ marginTop: 12 }}>
          <TextareaNote
            value={data.confidentialiteNotes || ''}
            onChange={v => onChange('confidentialiteNotes', v)}
            placeholder="Précisions sur les clauses de confidentialité souhaitées…"
            minHeight={80}
          />
        </div>
      </QuestionBlock>

      <QuestionBlock number={3} label="Comment avez-vous connu ARISID STUDIO ?">
        <ChipGroup
          options={CANAUX_DECOUVERTE}
          selected={data.decouverte || []}
          multiSelect
          onChange={v => onChange('decouverte', v)}
        />
        <div style={{ marginTop: 12 }}>
          <TextareaNote
            value={data.decouverteNotes || ''}
            onChange={v => onChange('decouverteNotes', v)}
            placeholder="Précisions, nom de la personne qui a recommandé…"
            minHeight={80}
          />
        </div>
      </QuestionBlock>

      <QuestionBlock number={4} label="Observations générales / Notes libres de fin d'entretien" last>
        <TextareaNote
          value={data.notesFinales || ''}
          onChange={v => onChange('notesFinales', v)}
          placeholder="Impressions générales, points importants à retenir, prochaines étapes convenues…"
          minHeight={200}
        />
      </QuestionBlock>
    </GuideBlock>
  )
}
