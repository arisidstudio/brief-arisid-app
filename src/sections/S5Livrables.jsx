import GuideBlock from '../components/GuideBlock'
import QuestionBlock from '../components/QuestionBlock'
import ChipGroup from '../components/ChipGroup'
import TextareaNote from '../components/TextareaNote'
import ScaleInput from '../components/ScaleInput'

const SUPPORTS = [
  "Logo principal + variantes", "Charte graphique", "Carte de visite",
  "En-tête/Papier à lettre", "Affiche/Poster", "Flyer", "Packaging",
  "Étiquette/Label", "Templates réseaux sociaux", "Bannières web",
  "Signalétique", "Goodies/Merch"
]
const FORMATS = [
  "PDF imprimable", "SVG/AI vectoriel", "PNG transparent",
  "JPEG", "Fichiers sources", "Figma"
]

export default function S5Livrables({ data, onChange }) {
  return (
    <GuideBlock title="Livrables & contraintes" subtitle="Ce dont le client a besoin concrètement">
      <QuestionBlock number={1} label="Supports à créer">
        <ChipGroup
          options={SUPPORTS}
          selected={data.supports || []}
          multiSelect
          onChange={v => onChange('supports', v)}
        />
        <div style={{ marginTop: 12 }}>
          <TextareaNote
            value={data.supportsNotes || ''}
            onChange={v => onChange('supportsNotes', v)}
            placeholder="Autres supports, précisions sur les formats…"
            minHeight={80}
          />
        </div>
      </QuestionBlock>

      <QuestionBlock number={2} label="Formats de fichiers attendus">
        <ChipGroup
          options={FORMATS}
          selected={data.formats || []}
          multiSelect
          onChange={v => onChange('formats', v)}
        />
        <div style={{ marginTop: 12 }}>
          <TextareaNote
            value={data.formatsNotes || ''}
            onChange={v => onChange('formatsNotes', v)}
            placeholder="Autres formats, logiciels utilisés par le client…"
            minHeight={80}
          />
        </div>
      </QuestionBlock>

      <QuestionBlock number={3} label="Contraintes techniques">
        <TextareaNote
          value={data.contraintes || ''}
          onChange={v => onChange('contraintes', v)}
          placeholder="Impression offset, CMJN, dimensions imposées, gabarit existant, impression locale…"
        />
      </QuestionBlock>

      <QuestionBlock number={4} label="Niveau de finition visée" last>
        <ScaleInput
          min={1}
          max={5}
          value={data.finition}
          onChange={v => onChange('finition', v)}
          labelMin="Fonctionnel"
          labelMax="Haut de gamme / Premium"
        />
        <div style={{ marginTop: 12 }}>
          <TextareaNote
            value={data.finitionNotes || ''}
            onChange={v => onChange('finitionNotes', v)}
            placeholder="Budget approximate, attentes qualitatives…"
            minHeight={80}
          />
        </div>
      </QuestionBlock>
    </GuideBlock>
  )
}
