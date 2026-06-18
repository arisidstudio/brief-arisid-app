import GuideBlock from '../components/GuideBlock'
import QuestionBlock from '../components/QuestionBlock'
import ChipGroup from '../components/ChipGroup'
import TextareaNote from '../components/TextareaNote'

const ANCIENNETE = ["Je lance", "Moins d'1 an", "1–3 ans", "3–10 ans", "Plus de 10 ans"]
const CANAUX = ["Instagram", "LinkedIn", "TikTok", "Facebook", "Pinterest", "Site web", "Boutique physique", "E-commerce"]

export default function S2Entreprise({ data, onChange }) {
  return (
    <GuideBlock title="Votre entreprise" subtitle="Comprendre l'activité et l'ADN de la marque">
      <QuestionBlock number={1} label="Quel est votre secteur d'activité ?">
        <TextareaNote
          value={data.secteur || ''}
          onChange={v => onChange('secteur', v)}
          placeholder="Mode, beauté, tech, conseil, alimentation…"
        />
      </QuestionBlock>

      <QuestionBlock number={2} label="Depuis combien de temps existe votre entreprise ?">
        <ChipGroup
          options={ANCIENNETE}
          selected={data.anciennete || ''}
          multiSelect={false}
          onChange={v => onChange('anciennete', v)}
        />
        <div style={{ marginTop: 12 }}>
          <TextareaNote
            value={data.ancienneteNotes || ''}
            onChange={v => onChange('ancienneteNotes', v)}
            placeholder="Précisions…"
            minHeight={80}
          />
        </div>
      </QuestionBlock>

      <QuestionBlock number={3} label="Quel produit ou service vendez-vous exactement ?">
        <TextareaNote
          value={data.produit || ''}
          onChange={v => onChange('produit', v)}
          placeholder="Décrivez précisément votre offre…"
        />
      </QuestionBlock>

      <QuestionBlock number={4} label="À qui vous adressez-vous ? (cible, âge, mode de vie, centres d'intérêt)">
        <TextareaNote
          value={data.cible || ''}
          onChange={v => onChange('cible', v)}
          placeholder="Femmes 25–40 ans, CSP+, urbaines, sensibles à l'éco-responsabilité…"
        />
      </QuestionBlock>

      <QuestionBlock number={5} label="D'où vient le nom de votre marque ?">
        <TextareaNote
          value={data.nomOrigine || ''}
          onChange={v => onChange('nomOrigine', v)}
          placeholder="Histoire, étymologie, acronyme, prénom…"
        />
      </QuestionBlock>

      <QuestionBlock number={6} label="Quelle histoire ou intention se cache derrière ce nom ?">
        <TextareaNote
          value={data.nomIntention || ''}
          onChange={v => onChange('nomIntention', v)}
          placeholder="La signification profonde, le message voulu…"
        />
      </QuestionBlock>

      <QuestionBlock number={7} label="Comment souhaitez-vous que les gens ressentent votre marque en entendant ce nom ?">
        <TextareaNote
          value={data.nomRessentis || ''}
          onChange={v => onChange('nomRessentis', v)}
          placeholder="Confiance, modernité, chaleur, exclusivité…"
        />
      </QuestionBlock>

      <QuestionBlock number={8} label="Quelles sont vos valeurs fondamentales ?">
        <TextareaNote
          value={data.valeurs || ''}
          onChange={v => onChange('valeurs', v)}
          placeholder="Authenticité, innovation, durabilité, excellence…"
        />
      </QuestionBlock>

      <QuestionBlock number={9} label="Qu'est-ce qui vous différencie de vos concurrents ?">
        <TextareaNote
          value={data.differenciation || ''}
          onChange={v => onChange('differenciation', v)}
          placeholder="Votre proposition de valeur unique…"
        />
      </QuestionBlock>

      <QuestionBlock number={10} label="Citez 2–3 concurrents directs">
        <TextareaNote
          value={data.concurrents || ''}
          onChange={v => onChange('concurrents', v)}
          placeholder="Nom des marques concurrentes…"
        />
      </QuestionBlock>

      <QuestionBlock number={11} label="Sur quels canaux êtes-vous présent(e) ?" last>
        <ChipGroup
          options={CANAUX}
          selected={data.canaux || []}
          multiSelect
          onChange={v => onChange('canaux', v)}
        />
        <div style={{ marginTop: 12 }}>
          <TextareaNote
            value={data.canauxNotes || ''}
            onChange={v => onChange('canauxNotes', v)}
            placeholder="Précisions sur votre présence en ligne…"
            minHeight={80}
          />
        </div>
      </QuestionBlock>
    </GuideBlock>
  )
}
