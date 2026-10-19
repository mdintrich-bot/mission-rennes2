// Données synthétiques et visuelles pour la progression professionnelle
// Conçues pour un affichage compact, graphique (chips, badges, icônes) sans pavés de texte.

export const currentStateData = {
  bases: {
    id: 'bases',
    label: 'MES BASES ACTUELLES',
    badge: 'Acquis BUT MMI & Terrain',
    accentColor: 'var(--accent-color)',
    summary: 'Compétences opérationnelles validées lors des 2 premières années de BUT MMI et éprouvées en stages réels.',
    items: [
      {
        title: 'Graphisme & Typographie',
        tools: 'Illustrator · Photoshop',
        highlight: 'Affiches grand format, covers d’albums rap, photomontage et travail de texture vectorielle.',
        tags: ['Print & Affiches', 'Cover Art', 'Typographie']
      },
      {
        title: 'Audiovisuel & Cadrage',
        tools: 'Boîtier reflex · Prise de son',
        highlight: 'Captation en direct, gestion de la lumière et cadrage en conditions réelles (conférences, gala ASNL).',
        tags: ['Tournage terrain', 'Cadrage', 'Son']
      },
      {
        title: 'Montage Vidéo & Post-Prod',
        tools: 'Premiere Pro · CapCut',
        highlight: 'Montage rythmé par le son, formats courts 9:16 (TikTok/Reels boutique Hatshop) et teasers événementiels.',
        tags: ['Format 9:16', 'Rythme', 'Teaser']
      },
      {
        title: 'Communication Digitale',
        tools: 'Notion · Canva · Réseaux',
        highlight: 'Analyse des cibles, personas, stratégie de contenu et création de supports d’invitation d’entreprises.',
        tags: ['Stratégie de com', 'Personas', 'Réseaux']
      },
      {
        title: 'Intégration Web & UI',
        tools: 'HTML5 · CSS3 · JS · WordPress',
        highlight: 'Intégration d’interfaces responsives, administration CMS WordPress et maquettage interactif.',
        tags: ['Web responsive', 'WordPress', 'Maquettage']
      }
    ]
  },
  approfondir: {
    id: 'approfondir',
    label: 'COMPÉTENCES À APPROFONDIR',
    badge: 'Priorités Master Rennes 2',
    accentColor: '#ffb74d',
    summary: 'Domaines clés pour passer de la simple exécution technique à la direction créative et au design d’interaction.',
    items: [
      {
        title: 'Direction Artistique Globale',
        tools: 'Systèmes de marque · Typo avancée',
        highlight: 'Concevoir des identités visuelles complètes, cohérentes et déclinables sur tous supports print et digitaux.',
        tags: ['Identité de marque', 'Branding global', 'Charte']
      },
      {
        title: 'Motion Design & Cinétique',
        tools: 'After Effects avancé · Expressions',
        highlight: 'Perfectionner l’animation vectorielle, la cinétique typographique et les micro-interactions d’interface.',
        tags: ['Motion cinétique', 'After Effects', 'Micro-interactions']
      },
      {
        title: 'UX/UI & Design Systems',
        tools: 'Figma · Tests utilisateurs · Ergonomie',
        highlight: 'Structurer ma démarche : recherche utilisateur, prototypage interactif haute fidélité et design systems modulaires.',
        tags: ['Figma interactif', 'Design Systems', 'Accessibilité']
      },
      {
        title: 'Workflows IA Hybrides',
        tools: 'Prompting multimodal · Adobe Firefly',
        highlight: 'Intégrer de façon raisonnée et critique les modèles génératifs dans le pipeline créatif sans altérer la signature humaine.',
        tags: ['IA créative', 'Hybridation', 'Éthique visuelle']
      }
    ]
  },
  prochainesEtapes: {
    id: 'prochaines',
    label: 'MES PROCHAINES ÉTAPES',
    badge: 'Plan d’action concret',
    accentColor: '#00e676',
    summary: 'Actions stratégiques jalonnées entre la fin de mon BUT MMI, ma recherche d’alternance et mon admission au Master.',
    items: [
      {
        title: 'BUT 3 & Alternance 24 mois',
        tools: 'Semestres 3/4 · Contrat apprentissage',
        highlight: 'Consolider mes acquis académiques en BUT MMI et signer un contrat en agence créative ou studio rennais.',
        tags: ['Bassin rennais', 'Alternance', 'Agence créative']
      },
      {
        title: 'Projets orientés Graphisme & UX',
        tools: 'Projets d’auteur & Universitaires',
        highlight: 'Développer des cas concrets exigeants : identité transmédia, prototype d’interface et vidéo d’auteur.',
        tags: ['Identité transmédia', 'Prototype UI', 'Direction artistique']
      },
      {
        title: 'Curation exigeante du Portfolio',
        tools: 'Notes d’intention · Site interactif',
        highlight: 'Sélectionner 10 à 12 réalisations clés, documenter la démarche réflexive et peaufiner ce site web de candidature.',
        tags: ['Curation sélective', 'Notes de cadrage', 'Book en ligne']
      },
      {
        title: 'Veille continue IA & Design',
        tools: 'Feedly · Articles NN/g · Retours de pros',
        highlight: 'Nourrir ma réflexion théorique sur les interfaces hybrides pour alimenter mes futurs séminaires universitaires.',
        tags: ['Veille active', 'Recherche UX', 'Culture design']
      },
      {
        title: 'Admission au Master Rennes 2',
        tools: 'Dossier MonMaster · Oral de 20 min',
        highlight: 'Finaliser un dossier aligné sur les critères du jury et s’entraîner au pitch oral pour convaincre l’équipe pédagogique.',
        tags: ['Dossier MonMaster', 'Pitch oral', 'Rennes 2']
      }
    ]
  }
};

export const roadmapSteps = [
  {
    step: '01',
    code: 'CONSOLIDER',
    period: 'S3 & S4 BUT MMI',
    status: 'En cours',
    statusBadgeColor: 'var(--accent-color)',
    objective: 'Développer les acquis fondamentaux en BUT MMI et identifier les axes de progression prioritaires.',
    actions: [
      'Bilan critique des compétences graphiques, audiovisuelles et web',
      'Renforcement de la culture typographique et de la composition',
      'Pratique d’intégration et de prototypage sous contraintes de temps'
    ],
    deliverable: 'Plan individuel de montée en compétences'
  },
  {
    step: '02',
    code: 'EXPÉRIMENTER',
    period: 'Ateliers & Projets Perso',
    status: 'Phase active',
    statusBadgeColor: '#ffb74d',
    objective: 'Concevoir des projets personnels et tester de nouveaux workflows hybrides alliant design et IA.',
    actions: [
      'Expérimentation de workflows de DA assistés par IA (Adobe Firefly)',
      'Prototypage d’interfaces interactives sous Figma (paradigme hybride)',
      'Créations d’affiches d’auteur et de productions audiovisuelles'
    ],
    deliverable: '3 études de cas documentées (graphisme, vidéo, prototype UI)'
  },
  {
    step: '03',
    code: 'VALORISER',
    period: 'Curation & Book',
    status: 'Curation active',
    statusBadgeColor: '#ab47bc',
    objective: 'Sélectionner mes réalisations les plus probantes et expliciter ma démarche conceptuelle.',
    actions: [
      'Sélection rigoureuse des 10 à 12 projets les plus représentatifs',
      'Rédaction de notes d’intention réflexives pour chaque réalisation',
      'Déploiement de ce site interactif sur GitHub Pages'
    ],
    deliverable: 'Book complet haute fidélité avec démarches argumentées'
  },
  {
    step: '04',
    code: 'CANDIDATER',
    period: 'Campagne MonMaster',
    status: 'Stratégie finale',
    statusBadgeColor: '#00e676',
    objective: 'Finaliser le dossier universitaire et défendre la cohérence du projet face au jury de Rennes 2.',
    actions: [
      'Conformité avec les 4 critères d’admission du Master Création Numérique',
      'Prospection ciblée auprès des agences rennaises pour l’alternance',
      'Entraînement au pitch oral de 15 à 20 min devant le jury'
    ],
    deliverable: 'Candidature MonMaster déposée et oral d’admission rodé'
  }
];

export const progressionLoopSteps = [
  {
    id: '01',
    title: 'VEILLE ACTIVE',
    role: 'Identifier les mutations',
    desc: 'Curation continue (Feedly, Alerts, LinkedIn) pour repérer les nouveaux usages de l’IA et les attentes des agences.'
  },
  {
    id: '02',
    title: 'ANALYSE CRITIQUE',
    role: 'Cibler les compétences',
    desc: 'Décryptage d’études de référence (NN/g) pour identifier les compétences clés : design d’interaction, hybridation, éthique.'
  },
  {
    id: '03',
    title: 'PROJETS CIBLÉS',
    role: 'Expérimenter sur le terrain',
    desc: 'Application concrète dans mes projets personnels et en stage (covers, vidéos ASNL, prototypes Figma).'
  },
  {
    id: '04',
    title: 'PORTFOLIO DOCUMENTÉ',
    role: 'Prouver la démarche',
    desc: 'Chaque réalisation est documentée par une note d’intention démontrant ma réflexion plastique et technique.'
  },
  {
    id: '05',
    title: 'ADMISSION RENNES 2',
    role: 'Convaincre le jury',
    desc: 'Démonstration d’une maturité de chercheur-créateur pour intégrer le Master Création Numérique en alternance.'
  }
];
