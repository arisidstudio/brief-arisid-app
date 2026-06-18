import GuideBlock from '../components/GuideBlock'
import QuestionBlock from '../components/QuestionBlock'
import ChipGroup from '../components/ChipGroup'
import TextareaNote from '../components/TextareaNote'

const TYPE_PROJET = [
  "Logo/Identité visuelle", "Charte graphique complète", "Print", "Packaging",
  "Réseaux sociaux", "Web design/UI", "Signalétique", "Autre"
]
const OBJECTIF = [
  "Lancer une nouvelle marque", "Rebranding/Modernisation", "Unifier les supports",
  "Gagner en crédibilité", "Monter en gamme", "Me démarquer"
]
const DELAI = ["Urgent 2 semaines", "1 mois", "2–3 mois", "Flexible"]
const DECISION = ["Moi seul(e)", "Une équipe", "Un dirigeant/investisseur"]

export default function S3Projet({ data, onChange }) {
  return (
    <GuideBlock title="Le projet" subtitle="Ce que le client souhaite créer">
      <QuestionBlock number={1} label="Type(s) de projet">
        <ChipGroup
          options={TYPE_PROJET}
          selected={data.typeProjet || []}
          multiSelect
          onChange={v => onChange('typeProjet', v)}
        />
        <div style={{ marginTop: 12 }}>
          <TextareaNote
            value={data.typeProjetNotes || ''}
            onChange={v => onChange('typeProjetNotes', v)}
            placeholder="Précisions sur le type de projet…"
            minHeight={80}
          />
        </div>
      </QuestionBlock>

      <QuestionBlock number={2} label="Objectif principal">
        <ChipGroup
          options={OBJECTIF}
          selected={data.objectif || ''}
          multiSelect={false}
          onChange={v => onChange('objectif', v)}
        />
        <div style={{ marginTop: 12 }}>
          <TextareaNote
            value={data.objectifNotes || ''}
            onChange={v => onChange('objectifNotes', v)}
            placeholder="Précisions sur l'objectif…"
            minHeight={80}
          />
        </div>
      </QuestionBlock>

      <QuestionBlock number={3} label="Pourquoi maintenant ? Qu'est-ce qui déclenche ce projet ?">
        <TextareaNote
          value={data.declencheur || ''}
          onChange={v => onChange('declencheur', v)}
          placeholder="Contexte du lancement, événement déclencheur…"
        />
      </QuestionBlock>

      <QuestionBlock number={4} label="À quoi ressemble le succès pour vous à la fin de ce projet ?">
        <TextareaNote
          value={data.succes || ''}
          onChange={v => onChange('succes', v)}
          placeholder="Résultats attendus, vision du succès…"
        />
      </QuestionBlock>

      <QuestionBlock number={5} label="Avez-vous une date butoir ?">
        <ChipGroup
          options={DELAI}
          selected={data.delai || ''}
          multiSelect={false}
          onChange={v => onChange('delai', v)}
        />
        <div style={{ marginTop: 12 }}>
          <TextareaNote
            value={data.delaiNotes || ''}
            onChange={v => onChange('delaiNotes', v)}
            placeholder="Date précise, événement lié…"
            minHeight={80}
          />
        </div>
      </QuestionBlock>

      <QuestionBlock number={6} label="Qui prend la décision finale ?" last>
        <ChipGroup
          options={DECISION}
          selected={data.decision || ''}
          multiSelect={false}
          onChange={v => onChange('decision', v)}
        />
        <div style={{ marginTop: 12 }}>
          <TextareaNote
            value={data.decisionNotes || ''}
            onChange={v => onChange('decisionNotes', v)}
            placeholder="Précisions sur le processus de décision…"
            minHeight={80}
          />
        </div>
      </QuestionBlock>
    </GuideBlock>
  )
}
