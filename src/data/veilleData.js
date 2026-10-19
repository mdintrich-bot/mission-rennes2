// Données synthétiques et visuelles pour la Veille Informationnelle
// Optimisées pour un affichage interactif, direct et ergonomique.

export const veilleTools = [
  {
    id: 'feedly',
    name: 'FEEDLY',
    category: 'FLUX RSS SPÉCIALISÉS',
    tagline: 'Centralisation de flux de référence sans algorithme ni bruit publicitaire.',
    sources: [
      'Nielsen Norman Group (Recherche UX)',
      'Figma Blog & Design Systems',
      'Étapes: (Culture visuelle & Graphisme)',
      'UX Collective & Creative Review'
    ],
    concreteBenefit: 'Lecture quotidienne classée par dossiers thématiques pour nourrir mes références universitaires.',
    badge: 'Curation quotidienne'
  },
  {
    id: 'alerts',
    name: 'GOOGLE ALERTS',
    category: 'ALERTES PAR MOTS-CLÉS',
    tagline: 'Surveillance proactive des études institutionnelles et actualités logicielles.',
    queries: [
      '"IA générative" AND graphisme',
      '"Generative UI" OR "interfaces hybrides"',
      '"Master création numérique" Rennes',
      '"design d’interaction" AND IA'
    ],
    concreteBenefit: 'Captation immédiate des publications officielles et des études de fond dès leur parution.',
    badge: 'Veille stratégique'
  },
  {
    id: 'linkedin',
    name: 'LINKEDIN',
    category: 'ÉCOSYSTÈME PROFESSIONNEL',
    tagline: 'Suivi de terrain des studios rennais, des directeurs artistiques et des offres.',
    networkFollowed: [
      'Agences & studios rennais (Voyelle, Mediapilote, etc.)',
      'Festival Maintenant / Association Electroni[k]',
      'Directeurs artistiques & Lead UX Designers',
      'Alumni du Master Création Numérique Rennes 2'
    ],
    concreteBenefit: 'Identification des compétences émergentes recherchées en alternance sur le bassin rennais.',
    badge: 'Réseau & Marché'
  }
];

export const verifiedStudy = {
  subject: "Rupture de paradigme d'interaction : de la commande directe à la spécification par intention",
  sourceOrg: "Nielsen Norman Group (NN/g)",
  author: "Jakob Nielsen, Ph.D. — 11 juin 2023",
  title: "AI: First New UI Paradigm in 60 Years",
  url: "https://www.nngroup.com/articles/ai-paradigm/",
  status: "Source vérifiée en libre accès",
  keyFindings: "Après 60 ans d'interfaces graphiques où l'utilisateur ordonne étape par étape comment faire (clics, menus), l'IA générative introduit un paradigme basé sur l'intention (l'utilisateur spécifie ce qu'il veut). L'avenir réside dans des interfaces hybrides mariant la puissance de l'intention et le contrôle précis de la manipulation visuelle.",
  personalAnalysis: "Pour un futur graphiste et UX designer, l'IA ne supprime pas l'interface : elle déplace la valeur du designer vers la conception de systèmes de feedback, de contrôles réversibles et de guidage pour garantir que l'humain garde la pleine maîtrise créative face aux réponses probabilistes.",
  projectApplication: {
    skill: "Prototypage d'interfaces hybrides adaptatives sous Figma et React (gestion des états d'attente et contrôles réversibles).",
    portfolioProject: "Étude de cas d'un outil créatif alliant saisie d'intention et ajustements manuels par curseurs.",
    masterApplication: "Démonstration d'une posture de chercheur-créateur doté d'une culture théorique solide lors de l'oral de Rennes 2."
  }
};

export const researchAxes = [
  {
    id: 'graphisme',
    title: 'IA ET GRAPHISME',
    subtitle: 'Possibilités, limites et singularité plastique',
    question: 'Comment les modèles génératifs d’images redéfinissent-ils la singularité plastique et la propriété intellectuelle du graphiste ?',
    keywords: ['DA augmentée', 'Droits d’auteur', 'Adobe Firefly', 'Singularité plastique'],
    projectRelevance: 'Positionner ma valeur ajoutée d’auteur dans mes projets d’affiches et de covers d’albums.',
    badge: 'Axe 01'
  },
  {
    id: 'ux',
    title: 'IA ET UX DESIGN',
    subtitle: 'Nouvelles pratiques et place de l’humain',
    question: 'Quelles règles d’ergonomie cognitive permettent de concevoir des interfaces génératives transparentes et contrôlables ?',
    keywords: ['Generative UI', 'Interfaces hybrides', 'Contrôle utilisateur', 'Design éthique'],
    projectRelevance: 'Apprendre à prototyper des systèmes interactifs adaptatifs, cœur du Master Rennes 2.',
    badge: 'Axe 02'
  },
  {
    id: 'metiers',
    title: 'ÉVOLUTION DES MÉTIERS',
    subtitle: 'Compétences recherchées et adaptation des studios',
    question: 'Quelles compétences hybrides (Art × Code, esprit critique) les agences du bassin rennais valorisent-elles chez un alternant ?',
    keywords: ['Profil hybride Art × Tech', 'Bassin rennais', 'Electroni[k]', 'Posture critique'],
    projectRelevance: 'Cibler précisément mon alternance de 24 mois auprès d’agences créatives bretonnes.',
    badge: 'Axe 03'
  }
];

export const veilleWorkflowSteps = [
  { num: '01', label: 'VEILLE', desc: 'Curation quotidienne ciblée (Feedly, Alerts, LinkedIn)' },
  { num: '02', label: 'SÉLECTION', desc: 'Filtrage critique des sources et rejet du sensationnalisme' },
  { num: '03', label: 'ANALYSE', desc: 'Mise en perspective théorique et impact sur le design' },
  { num: '04', label: 'APPLICATION', desc: 'Traduction concrète en compétences, projets et dossier Master' }
];
