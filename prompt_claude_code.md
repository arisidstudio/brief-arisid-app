# Prompt pour Claude Code — App de Brief Client en Présentiel
## ARISID STUDIO

---

## CONTEXTE DU PROJET

Je suis Lutécia, fondatrice d'**ARISID STUDIO**, un studio de brand design et direction artistique. J'ai besoin d'une application web (webapp) que j'utiliserai sur **laptop** (et potentiellement tablette plus tard) lors de mes **rendez-vous clients en présentiel**.

Le principe : je rencontre un client pour la première fois, j'ouvre cette app, je pose les questions à voix haute et je note les réponses du client directement dans l'interface, question par question. À la fin de l'entretien, je génère un **PDF complet et bien formaté** de tout l'entretien.

---

## STACK TECHNIQUE

- **React 19 + Vite 7**
- **Tailwind CSS 3**
- **lucide-react** pour les icônes
- Librairie PDF : **jsPDF + html2canvas** (ou **@react-pdf/renderer** si tu juges que c'est plus adapté)
- Pas de backend, pas de base de données — tout fonctionne en local dans le navigateur
- Pas de localStorage

---

## CHARTE GRAPHIQUE ARISID STUDIO — À RESPECTER ABSOLUMENT

### Couleurs
- **Background principal** : `#1a1a1a` (noir charbon)
- **Surface / cards** : `#2a2a2a`
- **Surface secondaire** : `#313131`
- **Bordures subtiles** : `rgba(255,255,255,0.07)`
- **Bordures visibles** : `rgba(255,255,255,0.12)`
- **Accent principal** : `#7c2d9e` (violet profond)
- **Accent hover** : `#9535ba`
- **Glow accent** : `rgba(124,45,158,0.35)`
- **Texte principal** : `#f2f2f2`
- **Texte secondaire / labels** : `#888`
- **Texte tertiaire / placeholders** : `#555`

### Typographies
- **Titres / Headlines** : `Clash Display` (Bold 700) — à importer depuis cdnfonts.com ou fontsource
- **Corps de texte** : `Inter` ou fallback system-ui
- Les titres de section sont en **UPPERCASE**

### Style général
- Dark mode exclusivement
- Fond avec un **glow violet subtil** au centre (radial-gradient `rgba(124,45,158,0.18)`)
- Coins arrondis : `border-radius: 10px` pour les cards
- Effets de focus sur les inputs : `border-color: #7c2d9e` + `box-shadow: 0 0 0 3px rgba(124,45,158,0.18)`
- Bouton primaire : `background: #7c2d9e`, texte blanc, uppercase, `letter-spacing: 0.06em`
- Bouton secondaire : transparent avec bordure `rgba(255,255,255,0.12)`

### Logo dans la navbar
```
ARISID     ← Clash Display Bold, 19px, letter-spacing 0.1em
STUDIO     ← Inter Regular, 8.5px, letter-spacing 0.28em, uppercase, couleur #888
```

---

## STRUCTURE DE L'APPLICATION

### Layout général
- **Navbar sticky** en haut : logo ARISID STUDIO à gauche + indicateur de progression à droite (ex: "Section 2 / 6")
- **Barre de progression** (2px, couleur accent) qui avance au fil des sections — collée sous la navbar
- **Contenu principal** : max-width 860px, centré, padding horizontal 28px
- **Footer** discret en bas : copyright ARISID STUDIO

### Navigation entre sections
- **6 onglets/tabs** en haut du contenu (sous la navbar) : Contact · Entreprise · Projet · Univers · Livrables · Final
- Les tabs déjà complétés passent en état "done" (couleur atténuée)
- Le tab actif a un indicateur violet en dessous
- Boutons **"Section précédente"** et **"Section suivante"** en bas de chaque section
- Scroll automatique vers le haut à chaque changement de section

---

## LES 6 SECTIONS ET LEURS QUESTIONS

> **Important** : sous chaque question il doit y avoir une **zone de texte libre** (textarea) grande, sans hauteur minimale contraignante — elle doit pouvoir accueillir de longs textes. Le label de la question est affiché au-dessus en uppercase 11px. Un placeholder guide discret est affiché dans le textarea.

---

### SECTION 1 — VOS COORDONNÉES
*Sous-titre : Informations de contact du client*

Questions (champs texte simples, une ligne) :
1. Nom complet
2. Entreprise / Marque
3. Email
4. Téléphone
5. Site web existant
6. Pays / Ville

---

### SECTION 2 — VOTRE ENTREPRISE
*Sous-titre : Comprendre l'activité et l'ADN de la marque*

Questions (toutes avec textarea grande) :
1. Quel est votre secteur d'activité ?
2. Depuis combien de temps existe votre entreprise ? *(chips à sélection unique : "Je lance", "Moins d'1 an", "1–3 ans", "3–10 ans", "Plus de 10 ans" + textarea de notes en dessous)*
3. Quel produit ou service vendez-vous exactement ?
4. À qui vous adressez-vous ? *(cible, âge, mode de vie, centres d'intérêt)*
5. D'où vient le nom de votre marque ?
6. Quelle histoire ou intention se cache derrière ce nom ?
7. Comment souhaitez-vous que les gens ressentent votre marque en entendant ce nom ?
8. Quelles sont vos valeurs fondamentales ?
9. Qu'est-ce qui vous différencie de vos concurrents ?
10. Citez 2–3 concurrents directs
11. Sur quels canaux êtes-vous présent(e) ? *(chips multi-sélection : Instagram, LinkedIn, TikTok, Facebook, Pinterest, Site web, Boutique physique, E-commerce + textarea de notes)*

---

### SECTION 3 — LE PROJET
*Sous-titre : Ce que le client souhaite créer*

Questions :
1. Type(s) de projet *(chips multi-sélection : Logo/Identité visuelle, Charte graphique complète, Print, Packaging, Réseaux sociaux, Web design/UI, Signalétique, Autre + textarea de notes)*
2. Objectif principal *(chips à sélection unique : Lancer une nouvelle marque, Rebranding/Modernisation, Unifier les supports, Gagner en crédibilité, Monter en gamme, Me démarquer + textarea de notes)*
3. Pourquoi maintenant ? Qu'est-ce qui déclenche ce projet ? *(textarea)*
4. À quoi ressemble le succès pour vous à la fin de ce projet ? *(textarea)*
5. Avez-vous une date butoir ? *(chips : Urgent 2 semaines, 1 mois, 2–3 mois, Flexible + textarea de notes)*
6. Qui prend la décision finale ? *(chips : Moi seul(e), Une équipe, Un dirigeant/investisseur + textarea de notes)*

---

### SECTION 4 — UNIVERS VISUEL
*Sous-titre : L'ADN graphique de la marque*

Questions :
1. Décrivez votre marque en 3 mots *(input texte + textarea de notes)*
2. Quelle ambiance visuelle souhaitez-vous ? *(chips multi-sélection : Minimaliste, Luxe, Organique, Éditorial, Expressif, Tech/Futuriste, Vintage/Rétro, Artisanal, Coloré, Sombre, Épuré, Audacieux + textarea de notes)*
3. Préférences de couleurs *(chips multi-sélection : Neutrals, Earthy, Dark & violet, Pastels, Vivid, Mono, Green, Gold, Autre + si "Autre" sélectionné : champ texte libre pour préciser + textarea de notes)*
4. Références / Inspirations visuelles *(textarea)*
5. Ce que vous aimez — styles, logos, marques inspirants *(textarea)*
6. Ce que vous ne voulez absolument pas *(textarea)*
7. Avez-vous déjà une identité existante ? *(chips : Non — partir de zéro, Oui — à moderniser, Oui — rebrand partiel + textarea de notes)*

---

### SECTION 5 — LIVRABLES & CONTRAINTES
*Sous-titre : Ce dont le client a besoin concrètement*

Questions :
1. Supports à créer *(chips multi-sélection : Logo principal + variantes, Charte graphique, Carte de visite, En-tête/Papier à lettre, Affiche/Poster, Flyer, Packaging, Étiquette/Label, Templates réseaux sociaux, Bannières web, Signalétique, Goodies/Merch + textarea de notes)*
2. Formats de fichiers attendus *(chips multi-sélection : PDF imprimable, SVG/AI vectoriel, PNG transparent, JPEG, Fichiers sources, Figma + textarea de notes)*
3. Contraintes techniques *(textarea : impression offset, CMJN, dimensions imposées, gabarit existant…)*
4. Niveau de finition visée *(scale 1 à 5 avec labels "Fonctionnel" et "Haut de gamme/Premium" + textarea de notes)*

---

### SECTION 6 — POUR ALLER PLUS LOIN
*Sous-titre : Contexte additionnel et clôture de l'entretien*

Questions :
1. Révisions attendues *(scale 1 à 4 avec labels "1 révision" et "4+ révisions" + textarea de notes)*
2. Confidentialité *(chips : Non, Oui NDA souhaité + textarea de notes)*
3. Comment le client a-t-il connu ARISID STUDIO ? *(chips multi-sélection : Instagram, LinkedIn, Bouche à oreille, Google, Behance/Dribbble, Autre + textarea de notes)*
4. Observations générales / Notes libres de fin d'entretien *(grande textarea, min-height 200px)*

---

## COMPOSANTS UI RÉCURRENTS

### Chips (tags cliquables)
- État normal : `background: #2a2a2a`, `border: 1px solid rgba(255,255,255,0.12)`, texte `#888`
- État hover : `border-color: rgba(124,45,158,0.55)`, texte `#f2f2f2`
- État sélectionné : `background: rgba(124,45,158,0.18)`, `border-color: #7c2d9e`, texte `#f2f2f2`
- `border-radius: 6px`, `padding: 8px 13px`, `font-size: 12px`

### Textarea de notes
- `background: #2a2a2a` (légèrement plus clair que le fond)
- `border: 1px solid rgba(255,255,255,0.12)`
- `border-radius: 10px`
- `padding: 12px 15px`
- `font-size: 14px`, `color: #f2f2f2`
- `min-height: 100px`, `resize: vertical`
- Focus : `border-color: #7c2d9e` + glow violet
- Placeholder : `color: #555`

### Scale (1 à 5 ou 1 à 4)
- Boutons alignés horizontalement, flex
- État normal : même style que chips
- État sélectionné : même style que chips sélectionnés
- Labels texte sous les boutons (gauche/droite)

### Guide block
- Wrapper avec `background: #2a2a2a`, `border: 1px solid rgba(255,255,255,0.12)`, `border-radius: 10px`
- Chaque question dans un bloc séparé avec un numéro circulaire violet à gauche
- Séparateur `border-bottom: 1px solid rgba(255,255,255,0.07)` entre les questions

---

## EXPORT PDF

À la fin (section 6), bouton **"Générer le compte-rendu PDF"** :

### Contenu du PDF
- **En-tête** : Logo ARISID STUDIO + date de l'entretien + nom du client
- **6 sections** bien séparées avec titres en violet
- Pour chaque question : le libellé de la question + les chips sélectionnées (si applicable) + le contenu de la textarea
- **Pied de page** : "Brief généré par ARISID STUDIO — arisidstudio.com" + numéro de page
- **Style du PDF** : fond blanc, texte noir, titres de section en violet `#7c2d9e`, design propre et professionnel (lisible à l'impression)

### Comportement
- Le PDF se génère côté client (pas de serveur)
- Il se télécharge automatiquement avec le nom : `Brief_[NomClient]_[NomMarque]_[Date].pdf`
- Si le nom du client n'est pas renseigné : `Brief_ARISID_[Date].pdf`

---

## COMPORTEMENT GÉNÉRAL DE L'APP

- **Pas de validation obligatoire** — c'est une app de prise de notes en présentiel, le but n'est pas de bloquer si un champ est vide
- **Sauvegarde automatique en mémoire** — les données sont conservées tant que la page n'est pas rechargée (state React)
- **Bouton "Réinitialiser l'entretien"** accessible depuis la navbar ou le footer — avec une confirmation avant de tout effacer
- **Responsive** : optimisé pour laptop (1280px+), compatible tablette (768px+)
- **Pas de mode clair** — dark mode uniquement

---

## WORKFLOW DE LIVRAISON ATTENDU

1. **Tu construis l'app complète**
2. **Avant tout déploiement ou installation**, tu me montres une **prévisualisation** de ce que ça donne
3. Je te fais mes retours et demandes de modifications
4. Une fois que j'ai validé, tu procèdes au déploiement (Vercel de préférence, qui est déjà connecté)

---

## FICHIERS À CRÉER

```
/src
  /components
    Navbar.jsx
    ProgressBar.jsx
    SectionTabs.jsx
    ChipGroup.jsx
    ScaleInput.jsx
    GuideBlock.jsx
    QuestionBlock.jsx
    TextareaNote.jsx
    PDFExport.jsx (ou PdfGenerator.jsx)
  /sections
    S1Contact.jsx
    S2Entreprise.jsx
    S3Projet.jsx
    S4Univers.jsx
    S5Livrables.jsx
    S6Final.jsx
  /styles
    globals.css (variables CSS + styles de base)
  App.jsx
  main.jsx
index.html
vite.config.js
tailwind.config.js
package.json
```

---

## NOTES FINALES POUR CLAUDE CODE

- Respecte scrupuleusement la charte graphique — c'est non négociable
- Le nom Clash Display doit être chargé correctement (via @font-face ou fontsource)
- Les textareas doivent être **vraiment grandes et confortables** à utiliser en réunion
- Le PDF doit être **propre, lisible, professionnel** — c'est un document qui représente ARISID STUDIO
- Priorise la **fluidité et la lisibilité** sur laptop
- Montre-moi la prévisualisation AVANT tout déploiement
