import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ArrowRight, 
  Target, 
  PenTool, 
  Layout, 
  MonitorPlay, 
  ExternalLink, 
  Download, 
  Sparkles, 
  X, 
  Briefcase, 
  GraduationCap, 
  Calendar,
  Building,
  Award,
  Search,
  CheckCircle2,
  Layers,
  Cpu,
  TrendingUp,
  Workflow,
  Network,
  Compass,
  Rss,
  Bell,
  BookOpen
} from 'lucide-react';
import { projects, experiences } from './data/projectsData';
import { currentStateData, roadmapSteps } from './data/progressionData';
import { veilleTools, verifiedStudy, researchAxes, veilleWorkflowSteps } from './data/veilleData';
import { startScroll } from './lib/scroll';
import { HeroSection } from './components/HeroSection';
import { PortfolioRail } from './components/PortfolioRail';
import { TrajectoryNancyRennes } from './components/TrajectoryNancyRennes';
import './index.css';

const navItems = [
  { id: 'hero', label: '00 / ACCUEIL' },
  { id: 'profil', label: '01 / CANDIDAT' },
  { id: 'destination', label: '02 / PROJET PRO' },
  { id: 'rennes2', label: '03 / RENNES 2' },
  { id: 'modalites', label: '04 / ADMISSION' },
  { id: 'lien-projet', label: '05 / IMPACT PRO' },
  { id: 'parcours', label: '06 / PARCOURS' },
  { id: 'veille', label: '07 / VEILLE' },
  { id: 'methodologie', label: '08 / ROADMAP & PROGRESSION' },
  { id: 'outils', label: '09 / OUTILS' },
  { id: 'portfolio', label: '10 / DOSSIER' },
  { id: 'conclusion', label: '11 / PERSPECTIVES' },
];

const SectionHeader = ({ num, title, subtitle, rubricBadge }) => (
  <motion.div 
    initial={{ opacity: 0, x: -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    style={{ marginBottom: '3rem' }}
  >
    {rubricBadge && (
      <div className="rubric-badge">
        <span className="rubric-score">{rubricBadge.score}</span>
        <span>{rubricBadge.text}</span>
      </div>
    )}
    <h2 className="section-title">
      {num} — <span>{title}</span>
    </h2>
    {subtitle && (
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', marginTop: '-1.5rem', maxWidth: '850px', lineHeight: 1.6 }}>
        {subtitle}
      </p>
    )}
  </motion.div>
);

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [activeModalProject, setActiveModalProject] = useState(null);

  // États interactifs pour les onglets bento et hub de veille
  const [activeStatusTab, setActiveStatusTab] = useState('bases');
  const [activeVeilleTab, setActiveVeilleTab] = useState('outils');
  const [activeRoadmapStep, setActiveRoadmapStep] = useState('CONSOLIDER');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    return startScroll();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="bg-grid" />
      
      {/* Top Reading Progress Bar */}
      <motion.div 
        style={{ 
          scaleX, 
          transformOrigin: "0%", 
          backgroundColor: "var(--accent-color)", 
          height: "3px", 
          position: "fixed", 
          top: 0, 
          left: 0, 
          right: 0, 
          zIndex: 1000,
          boxShadow: '0 0 10px var(--accent-glow)'
        }} 
      />

      {/* Side Navigation Dots */}
      <nav className="nav-indicator">
        {navItems.map((item) => (
          <div 
            key={item.id}
            data-label={item.label}
            className={`nav-dot ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => {
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        ))}
      </nav>

      <main className="container">
        
        {/* ========================================================= */}
        {/* 00 HERO SECTION : MISSION, OBJECTIF & PROBLÉMATIQUE       */}
        {/* ========================================================= */}
        <HeroSection />

        {/* ========================================================= */}
        {/* 01 PROFIL DU CANDIDAT & APTITUDES POUR LE MASTER          */}
        {/* ========================================================= */}
        <section id="profil">
          <SectionHeader 
            num="01" 
            title="LE CANDIDAT" 
            subtitle="Profil académique et créatif de Mathis Dintrich : adéquation de mes aptitudes avec les exigences du Master."
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center', marginBottom: '3.5rem' }}>
            
            {/* Real Portrait Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="card glass-panel"
              style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px solid rgba(0, 240, 255, 0.3)' }}
            >
              <div style={{ position: 'relative', width: '100%', height: '420px', overflow: 'hidden', background: '#0a0a0c', border: '1px solid var(--border-color)' }}>
                <img 
                  src="./portfolio-images/IMG_7196-768x1024.png" 
                  alt="Mathis Dintrich" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(5, 5, 5, 0.85)', padding: '0.5rem 1rem', borderLeft: '3px solid var(--accent-color)', backdropFilter: 'blur(4px)' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>MATHIS DINTRICH</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-color)', letterSpacing: '0.1em' }}>19 ANS · ÉTUDIANT CANDIDAT MASTER</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span>BUT MMI Nancy-Charlemagne</span>
                <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>Spécialité Création Numérique</span>
              </div>
            </motion.div>

            {/* Bio & Candidate Pillars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="card" style={{ borderLeft: '4px solid var(--accent-color)' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  UN PROFIL TAILLÉ POUR LE MASTER CRÉATION NUMÉRIQUE
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem', marginBottom: '1rem' }}>
                  Étudiant en 2e année de BUT Métiers du Multimédia et de l’Internet (MMI) à l’IUT Nancy-Charlemagne, j’ai orienté l’ensemble de mon cursus vers le parcours <strong>Création Numérique</strong> avec une seule ambition : intégrer le <strong>Master Création Numérique de l’Université Rennes 2</strong>.
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem' }}>
                  Loin de me cantonner à l’exécution technique, je développe une vision globale combinant <strong>direction artistique, rigueur sémiologique et culture technologique</strong>. Mon profil répond directement aux attendus universitaires d’un cursus de recherche-création de haut niveau.
                </p>
              </div>

              {/* 3 Pillars tied to Master requirements */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="card" style={{ padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>⚽ RIGUEUR TACTIQUE</div>
                  <div style={{ color: 'var(--accent-color)', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>12 ANS DE FOOTBALL</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                    Milieu de terrain : vision d’ensemble, anticipation des mouvements collectifs, résistance aux contraintes de temps et discipline indispensables pour la gestion de projet en Master.
                  </p>
                </div>

                <div className="card" style={{ padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>🎤 CULTURE URBAINE & RAP</div>
                  <div style={{ color: 'var(--accent-color)', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>DIRECTION ARTISTIQUE</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                    Sensibilité aiguë aux identités visuelles fortes, au cover art, à la scénographie de marque et à la narration visuelle contemporaine qui nourrissent ma recherche plastique.
                  </p>
                </div>

                <div className="card" style={{ padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>🎨 PASSION DESIGN & VIDÉO</div>
                  <div style={{ color: 'var(--accent-color)', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>PRATIQUE CONTINUE</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                    Maîtrise quotidienne de la Suite Adobe CC (Photoshop, Illustrator, Premiere Pro, After Effects) et curiosité pour l’IA générative appliquée aux workflows de création.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Où j'en suis aujourd'hui : Navigation par onglets interactifs & Bento Grid épurée */}
          <div style={{ marginTop: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)', fontSize: '0.82rem', fontWeight: 'bold', letterSpacing: '0.15em', marginBottom: '0.4rem' }}>
                  <Compass size={16} /> ÉTAT DES LIEUX OBJECTIF DU PARCOURS
                </div>
                <h3 style={{ fontSize: '1.85rem', color: 'var(--text-primary)' }}>
                  OÙ J'EN SUIS AUJOURD'HUI
                </h3>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.03)', padding: '0.4rem 0.8rem', border: '1px solid var(--border-color)', borderRadius: '2px' }}>
                3 PILIERS D'ÉVALUATION · NAVIGATION INTERACTIVE
              </div>
            </div>

            {/* Segmented Tabs Bar */}
            <div className="segmented-tabs-wrapper">
              <button
                type="button"
                className={`segmented-tab-btn ${activeStatusTab === 'bases' ? 'active' : ''}`}
                onClick={() => setActiveStatusTab('bases')}
              >
                <CheckCircle2 size={16} color={activeStatusTab === 'bases' ? 'var(--accent-color)' : 'var(--text-secondary)'} />
                <span>1. MES BASES ACTUELLES</span>
                <span className="tab-count-badge">{currentStateData.bases.items.length}</span>
              </button>

              <button
                type="button"
                className={`segmented-tab-btn ${activeStatusTab === 'approfondir' ? 'active' : ''}`}
                onClick={() => setActiveStatusTab('approfondir')}
                style={activeStatusTab === 'approfondir' ? { borderColor: '#ffb74d', color: '#ffb74d', background: 'rgba(255, 183, 77, 0.1)' } : {}}
              >
                <TrendingUp size={16} color={activeStatusTab === 'approfondir' ? '#ffb74d' : 'var(--text-secondary)'} />
                <span>2. À APPROFONDIR</span>
                <span className="tab-count-badge" style={activeStatusTab === 'approfondir' ? { background: '#ffb74d', color: '#000' } : {}}>{currentStateData.approfondir.items.length}</span>
              </button>

              <button
                type="button"
                className={`segmented-tab-btn ${activeStatusTab === 'prochaines' ? 'active' : ''}`}
                onClick={() => setActiveStatusTab('prochaines')}
                style={activeStatusTab === 'prochaines' ? { borderColor: '#00e676', color: '#00e676', background: 'rgba(0, 230, 118, 0.1)' } : {}}
              >
                <Target size={16} color={activeStatusTab === 'prochaines' ? '#00e676' : 'var(--text-secondary)'} />
                <span>3. PROCHAINES ÉTAPES</span>
                <span className="tab-count-badge" style={activeStatusTab === 'prochaines' ? { background: '#00e676', color: '#000' } : {}}>{currentStateData.prochainesEtapes.items.length}</span>
              </button>
            </div>

            {/* Active Tab Header Context */}
            {(() => {
              const currentCategory = activeStatusTab === 'bases' 
                ? currentStateData.bases 
                : activeStatusTab === 'approfondir' 
                  ? currentStateData.approfondir 
                  : currentStateData.prochainesEtapes;
              return (
                <div style={{ marginBottom: '1.25rem', padding: '0.9rem 1.25rem', background: 'rgba(255, 255, 255, 0.02)', borderLeft: `3px solid ${currentCategory.accentColor}`, borderTop: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', margin: 0, lineHeight: 1.5 }}>
                    {currentCategory.summary}
                  </p>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: currentCategory.accentColor, background: 'rgba(255,255,255,0.04)', padding: '0.25rem 0.6rem', border: `1px solid ${currentCategory.accentColor}`, borderRadius: '2px' }}>
                    {currentCategory.badge}
                  </span>
                </div>
              );
            })()}

            {/* Bento Grid */}
            <div className="bento-grid">
              {(activeStatusTab === 'bases' 
                ? currentStateData.bases.items 
                : activeStatusTab === 'approfondir' 
                  ? currentStateData.approfondir.items 
                  : currentStateData.prochainesEtapes.items
              ).map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.04 }}
                  className="bento-card"
                >
                  <div className="bento-card-header">
                    <h4 className="bento-title">{item.title}</h4>
                    <span className="bento-tool-pill">{item.tools}</span>
                  </div>
                  <p className="bento-highlight">{item.highlight}</p>
                  <div className="bento-tags-row">
                    {(item.tags || []).map((tag, tIdx) => (
                      <span key={tIdx} className="bento-tag">#{tag}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 02 DESTINATION & PROJET PROFESSIONNEL                     */}
        {/* ========================================================= */}
        <section id="destination">
          <SectionHeader 
            num="02" 
            title="LE PROJET PROFESSIONNEL" 
            subtitle="Une trajectoire claire et ambitieuse en 3 étapes : Master en alternance, Direction Artistique en agence, puis création de mon agence créative."
          />
          
          {/* 3 Step Trajectory */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div className="card" style={{ borderTop: '4px solid var(--accent-color)' }}>
              <div style={{ color: 'var(--accent-color)', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
                ÉTAPE 1 · 2026-2028 (COURT TERME)
              </div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '0.8rem', color: '#fff' }}>
                MASTER CRÉATION NUMÉRIQUE EN ALTERNANCE
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Intégrer l'Université Rennes 2 et réaliser les 2 années de Master en <strong>alternance</strong> (contrat d'apprentissage) au sein d'une agence de communication ou d'un studio créatif du bassin rennais.
              </p>
            </div>

            <div className="card" style={{ borderTop: '4px solid #fff' }}>
              <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
                ÉTAPE 2 · 2028-2030 (MOYEN TERME)
              </div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '0.8rem', color: '#fff' }}>
                DIRECTEUR ARTISTIQUE & LEAD MOTION
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Exercer en agence de branding ou studio de production digitale pour piloter des identités visuelles d’envergure, encadrer des créations graphiques et maîtriser la gestion de clientèle exigeante.
              </p>
            </div>

            <div className="card" style={{ borderTop: '4px solid var(--accent-color)' }}>
              <div style={{ color: 'var(--accent-color)', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
                ÉTAPE 3 · HORIZON 2030+ (LONG TERME)
              </div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '0.8rem', color: '#fff' }}>
                CRÉATION D’UNE AGENCE CRÉATIVE INDÉPENDANTE
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Fonder ma propre structure de création visuelle et audiovisuelle pluridisciplinaire, spécialisée dans les identités de marque percutantes, les campagnes transmédia et la production vidéo dynamique.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <motion.div className="card" whileHover={{ scale: 1.02 }} style={{ borderTop: '4px solid var(--accent-color)' }}>
              <h3 style={{ fontSize: '2.2rem', color: 'var(--accent-color)', marginBottom: '1.2rem' }}>
                DIRECTION ARTISTIQUE & GRAPHISME
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Créer des identités visuelles fortes, composer des affiches percutantes et concevoir des supports de communication pérennes pour des marques et des institutions.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-secondary)' }}>
                {['Composition avancée & Typographie de caractère', 'Identité de marque & Storytelling transmédia', 'Cover Art & Culture Visuelle Urbaine', 'Maîtrise approfondie Photoshop & Illustrator'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                    <ChevronRight size={16} color="var(--accent-color)" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div className="card" whileHover={{ scale: 1.02 }} style={{ borderTop: '4px solid #fff' }}>
              <h3 style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '1.2rem' }}>
                VIDÉO & MOTION DESIGN RYTHMÉ
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Raconter des histoires par le rythme visuel et sonore, concevoir des animations graphiques pour les nouveaux médias et les plateformes numériques.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-secondary)' }}>
                {['Montage rythmé dynamique sous Premiere Pro', 'Animations graphiques After Effects & Design d\'Interaction', 'Captation terrain & sonorisation immersive', 'Formats courts réseaux sociaux (Reels/TikTok) & Teasers'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                    <ChevronRight size={16} color="var(--accent-color)" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 03 RENNES 2 : L'UNIVERSITÉ CIBLE                           */}
        {/* ========================================================= */}
        <section id="rennes2">
          <SectionHeader 
            num="03" 
            title="L'UNIVERSITÉ RENNES 2" 
            subtitle="Pourquoi le Master Création Numérique de l'Université Rennes 2 est la formation idéale pour accomplir mon projet."
          />
          <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--text-primary)', marginBottom: '3rem', textTransform: 'uppercase' }}>
            MASTER CRÉATION NUMÉRIQUE<br/>
            <span style={{ color: 'var(--accent-color)' }}>UNIVERSITÉ RENNES 2</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <motion.div className="card glass-panel" whileHover={{ y: -8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
                <Sparkles size={28} color="var(--accent-color)" />
                <h4 style={{ fontSize: '1.6rem', margin: 0 }}>01 — LE CROISEMENT ART × TECH</h4>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1rem' }}>
                Le programme du Master Création Numérique de Rennes 2 se distingue par son approche sensible et contemporaine des technologies émergentes. Il fait écho direct à mes expérimentations en motion design, narration transmédia et design d’auteur, enrichi par des séminaires de recherche de haut niveau.
              </p>
            </motion.div>

            <motion.div className="card glass-panel" whileHover={{ y: -8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
                <Building size={28} color="var(--accent-color)" />
                <h4 style={{ fontSize: '1.6rem', margin: 0 }}>02 — L’ÉCOSYSTÈME RENNAIS</h4>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1rem' }}>
                Rennes est une métropole créative et technologique de premier plan, dynamique tant au niveau universitaire que dans le tissu des agences de branding, studios audiovisuels et de l'événementiel numérique, idéal pour l'alternance et l'insertion.
              </p>
            </motion.div>

            <motion.div className="card glass-panel" whileHover={{ y: -8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
                <Workflow size={28} color="var(--accent-color)" />
                <h4 style={{ fontSize: '1.6rem', margin: 0 }}>03 — FORMULE EN ALTERNANCE</h4>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1rem' }}>
                L'organisation en contrat d'apprentissage sur 24 mois permet une immersion totale dans les réalités de production d’une agence, finançant les études tout en garantissant une montée en compétences opérationnelle immédiate.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 04 MODALITÉS D'ADMISSION (POINT 1 DU BARÈME · 3 POINTS)   */}
        {/* ========================================================= */}
        <section id="modalites">
          <SectionHeader 
            num="04" 
            title="ANALYSE DES MODALITÉS D’ADMISSION" 
            subtitle="Compréhension exhaustive des 4 critères d’admission du Master Création Numérique (Rennes 2) et mise en perspective avec le projet professionnel."
            rubricBadge={{ score: "3 POINTS", text: "Point 1 du barème universitaire" }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.8rem', marginBottom: '3rem' }}>
            
            {/* Critère 1 : Académique */}
            <div className="criteria-card">
              <div className="criteria-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-color)' }}>
                  <GraduationCap size={26} />
                  <span style={{ fontSize: '0.8rem', letterSpacing: '0.12em', fontWeight: 'bold' }}>CRITÈRE 01</span>
                </div>
                <span style={{ fontSize: '0.75rem', background: '#222', padding: '0.2rem 0.5rem', color: '#aaa', border: '1px solid #333' }}>PRÉ-REQUIS</span>
              </div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '0.8rem', color: 'var(--text-primary)' }}>
                CRITÈRES ACADÉMIQUES & THÉORIQUES
              </h3>
              
              <div className="criteria-subcard jury">
                <strong style={{ color: '#ffb74d', display: 'block', marginBottom: '0.3rem' }}>ATTENTES DU JURY RENNES 2 :</strong>
                Validation d’un diplôme Bac+3 (BUT MMI, Licence Arts/Info-Com, 180 ECTS). Analyse fine des relevés de notes des 6 semestres, notamment dans les UE de création visuelle, sémiologie de l’image, audiovisuel et culture numérique. Capacité à intégrer des séminaires de recherche-création.
              </div>

              <div className="criteria-subcard candidate">
                <strong style={{ color: 'var(--accent-color)', display: 'block', marginBottom: '0.3rem' }}>POSITIONNEMENT DU CANDIDAT :</strong>
                Validation du BUT MMI à Nancy-Charlemagne avec choix précoce de la spécialité <strong>Création Numérique</strong> au S4. Validation rigoureuse des 5 compétences nationales MMI et résultats solides dans les ateliers de conception graphique et audiovisuelle.
              </div>

              <div className="criteria-subcard impact">
                <strong style={{ color: '#00e676', display: 'block', marginBottom: '0.3rem' }}>LIEN AVEC LE PROJET PROFESSIONNEL :</strong>
                Ce socle académique dote le futur Directeur Artistique d’une grille de lecture sémiotique et conceptuelle, évitant le statut de simple exécutant technique pour concevoir des identités de marque douées de sens.
              </div>
            </div>

            {/* Critère 2 : Professionnel */}
            <div className="criteria-card">
              <div className="criteria-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-color)' }}>
                  <Briefcase size={26} />
                  <span style={{ fontSize: '0.8rem', letterSpacing: '0.12em', fontWeight: 'bold' }}>CRITÈRE 02</span>
                </div>
                <span style={{ fontSize: '0.75rem', background: '#222', padding: '0.2rem 0.5rem', color: '#aaa', border: '1px solid #333' }}>TERRAIN</span>
              </div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '0.8rem', color: 'var(--text-primary)' }}>
                EXPÉRIENCES PRO & ALTERNANCE
              </h3>
              
              <div className="criteria-subcard jury">
                <strong style={{ color: '#ffb74d', display: 'block', marginBottom: '0.3rem' }}>ATTENTES DU JURY RENNES 2 :</strong>
                Preuve d'une maturité professionnelle immédiate via des stages significatifs. Capacité démontrée à trouver et assumer un contrat d’apprentissage de 24 mois en entreprise (autonomie, respect des contraintes clients, deadlines strictes).
              </div>

              <div className="criteria-subcard candidate">
                <strong style={{ color: 'var(--accent-color)', display: 'block', marginBottom: '0.3rem' }}>POSITIONNEMENT DU CANDIDAT :</strong>
                Deux stages complémentaires réalisés : <strong>Hatshop</strong> (formats courts réseaux, réactivité) et <strong>ATP Nancy Porte Nord</strong> (10 semaines au contact de 170 entreprises, vidéos ASNL, supports institutionnels). Prospection d'alternance déjà engagée à Rennes.
              </div>

              <div className="criteria-subcard impact">
                <strong style={{ color: '#00e676', display: 'block', marginBottom: '0.3rem' }}>LIEN AVEC LE PROJET PROFESSIONNEL :</strong>
                L’alternance en Master est le laboratoire grandeur nature du projet d'agence : elle apprend la rentabilité de projet, le dialogue avec des annonceurs et la gestion du stress en production réelle.
              </div>
            </div>

            {/* Critère 3 : Portfolio / Tests */}
            <div className="criteria-card">
              <div className="criteria-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-color)' }}>
                  <Award size={26} />
                  <span style={{ fontSize: '0.8rem', letterSpacing: '0.12em', fontWeight: 'bold' }}>CRITÈRE 03</span>
                </div>
                <span style={{ fontSize: '0.75rem', background: '#222', padding: '0.2rem 0.5rem', color: '#aaa', border: '1px solid #333' }}>SÉLECTIF</span>
              </div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '0.8rem', color: 'var(--text-primary)' }}>
                DOSSIER DE TRAVAUX (PORTFOLIO / BOOK)
              </h3>
              
              <div className="criteria-subcard jury">
                <strong style={{ color: '#ffb74d', display: 'block', marginBottom: '0.3rem' }}>ATTENTES DU JURY RENNES 2 :</strong>
                Pièce maîtresse du dossier : sélection raisonnée de travaux. Le jury n’évalue pas seulement la forme esthétique mais la démarche réflexive : notes d’intention, justification des choix graphiques, variété des médiums (print, vidéo, motion, UI).
              </div>

              <div className="criteria-subcard candidate">
                <strong style={{ color: 'var(--accent-color)', display: 'block', marginBottom: '0.3rem' }}>POSITIONNEMENT DU CANDIDAT :</strong>
                Ce site web interactif sert lui-même de preuve vivante, couplé à une sélection de 12 réalisations authentiques et documentées (covers rap, affiches grand format, vidéos événementielles, teasers et campagnes d'engagement).
              </div>

              <div className="criteria-subcard impact">
                <strong style={{ color: '#00e676', display: 'block', marginBottom: '0.3rem' }}>LIEN AVEC LE PROJET PROFESSIONNEL :</strong>
                Savoir concevoir et défendre un book d’admission préfigure la capacité à élaborer les propositions commerciales et le portfolio d’agence qui convaincront les futurs clients.
              </div>
            </div>

            {/* Critère 4 : Entretien oral */}
            <div className="criteria-card">
              <div className="criteria-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-color)' }}>
                  <Target size={26} />
                  <span style={{ fontSize: '0.8rem', letterSpacing: '0.12em', fontWeight: 'bold' }}>CRITÈRE 04</span>
                </div>
                <span style={{ fontSize: '0.75rem', background: '#222', padding: '0.2rem 0.5rem', color: '#aaa', border: '1px solid #333' }}>ORAL DÉCISIF</span>
              </div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '0.8rem', color: 'var(--text-primary)' }}>
                ENTRETIEN DE SÉLECTION DEVANT LE JURY
              </h3>
              
              <div className="criteria-subcard jury">
                <strong style={{ color: '#ffb74d', display: 'block', marginBottom: '0.3rem' }}>ATTENTES DU JURY RENNES 2 :</strong>
                Soutenance orale de 15 à 20 min : capacité à pitcher son parcours, à argumenter ses choix créatifs, à faire preuve de recul critique sur ses propres réalisations et à démontrer une veille active sur les mutations du secteur (notamment l'IA).
              </div>

              <div className="criteria-subcard candidate">
                <strong style={{ color: 'var(--accent-color)', display: 'block', marginBottom: '0.3rem' }}>POSITIONNEMENT DU CANDIDAT :</strong>
                Entraînement régulier aux soutenances universitaires en BUT MMI, aisance relationnelle éprouvée sur le terrain associatif et discours structuré autour de la complémentarité entre création humaine et outils émergents.
              </div>

              <div className="criteria-subcard impact">
                <strong style={{ color: '#00e676', display: 'block', marginBottom: '0.3rem' }}>LIEN AVEC LE PROJET PROFESSIONNEL :</strong>
                L’oral d'admission est le miroir direct des pitchs d'agence et des soutenances de recommandations stratégiques devant les annonceurs et partenaires institutionnels.
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 05 LIEN ENTRE ADMISSION ET PROJET PRO (POINT 2 · 4 POINTS) */}
        {/* ========================================================= */}
        <section id="lien-projet">
          <SectionHeader 
            num="05" 
            title="LIEN ENTRE ADMISSIONS ET PROJET PRO" 
            subtitle="Explication claire de la manière dont les critères d'admission ont guidé mes choix de formation, de stages et d'opportunités professionnelles."
            rubricBadge={{ score: "4 POINTS", text: "Point 2 du barème universitaire" }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            
            {/* 1. Choix de formation */}
            <div className="card" style={{ borderLeft: '4px solid var(--accent-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-color)', marginBottom: '0.8rem' }}>
                <Compass size={24} />
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '0.12em' }}>INFLUENCE 01</span>
              </div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                SUR LE CHOIX DE FORMATION
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                Pourquoi avoir visé précisément le <strong>Master Création Numérique de Rennes 2</strong> ? Parce que les modalités d'admission de ce Master valorisent une double compétence rare : l’hybridation entre <strong>sensibilité artistique d'auteur</strong> et <strong>maîtrise des technologies émergentes</strong>.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <ChevronRight size={16} color="var(--accent-color)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Rétroaction sur le BUT MMI :</strong> C’est l’anticipation des attendus de ce Master qui a motivé mon choix de la spécialité <em>Création Numérique</em> dès le S4 à Nancy.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <ChevronRight size={16} color="var(--accent-color)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Refus des cursus purement techniques :</strong> Rennes 2 apporte la dimension recherche-création indispensable pour devenir un Directeur Artistique stratège.</span>
                </li>
              </ul>
            </div>

            {/* 2. Choix des stages */}
            <div className="card" style={{ borderLeft: '4px solid #fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#fff', marginBottom: '0.8rem' }}>
                <Layers size={24} />
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '0.12em' }}>INFLUENCE 02</span>
              </div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                SUR LE CHOIX DES STAGES & DE L'ALTERNANCE
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                Les exigences de sélection du Master excluent les stages passifs. Chaque immersion en entreprise a été <strong>stratégiquement choisie</strong> pour combler un critère d'évaluation précis :
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <ChevronRight size={16} color="var(--accent-color)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Stage S2 (Hatshop) :</strong> Choisi pour prouver la capacité à produire des formats courts viraux et comprendre la culture urbaine.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <ChevronRight size={16} color="var(--accent-color)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Stage S3 (ATP Nancy Porte Nord) :</strong> Choisi pour la légitimité institutionnelle face à 170 entreprises, la vidéo événementielle (ASNL) et la rigueur print.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <ChevronRight size={16} color="var(--accent-color)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Alternance Master :</strong> Ciblage d'agences de branding et studios audiovisuels rennais pour s'aligner sur les débouchés du diplôme.</span>
                </li>
              </ul>
            </div>

            {/* 3. Opportunités professionnelles */}
            <div className="card" style={{ borderLeft: '4px solid var(--accent-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-color)', marginBottom: '0.8rem' }}>
                <Network size={24} />
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '0.12em' }}>INFLUENCE 03</span>
              </div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                SUR LES OPPORTUNITÉS & LE RÉSEAU
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                L'admission au Master n'est pas une simple étape scolaire, c'est l'accès à un <strong>catalyseur d'opportunités</strong> décisif pour la création d'agence :
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <ChevronRight size={16} color="var(--accent-color)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Bassin Rennais dynamique :</strong> Écosystème labellisé French Tech, festival Maintenant / Electroni[k], tissu d'agences innovantes.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <ChevronRight size={16} color="var(--accent-color)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Constitution de l'équipe fondatrice :</strong> Le Master réunit des profils complémentaires (designers, motion designers, développeurs créatifs), futurs associés potentiels.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <ChevronRight size={16} color="var(--accent-color)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span><strong>Sécurisation de l'entrepreneuriat :</strong> 2 ans d'alternance + expertise universitaire = maturité financière et réseau client indispensables avant le lancement.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Matrice de rétroaction stratégique */}
          <div className="card glass-panel" style={{ padding: '2rem', border: '1px solid rgba(0, 240, 255, 0.3)' }}>
            <h4 style={{ fontSize: '1.3rem', color: 'var(--accent-color)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <TrendingUp size={20} /> MATRICE DE RÉTROACTION : DE L'EXIGENCE DU MASTER À LA DÉCISION DU PARCOURS
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              <div style={{ borderLeft: '2px solid var(--accent-color)', paddingLeft: '1rem' }}>
                <div style={{ fontSize: '0.85rem', color: '#ffb74d', fontWeight: 'bold', marginBottom: '0.3rem' }}>EXIGENCE D'ADMISSION</div>
                <div style={{ fontSize: '1.05rem', color: '#fff', fontWeight: 'bold', marginBottom: '0.4rem' }}>Excellence en conception visuelle</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Spécialisation Création Numérique précoce en BUT2 + création continue de projets personnels (covers, affiches).</div>
              </div>
              <div style={{ borderLeft: '2px solid var(--accent-color)', paddingLeft: '1rem' }}>
                <div style={{ fontSize: '0.85rem', color: '#ffb74d', fontWeight: 'bold', marginBottom: '0.3rem' }}>EXIGENCE D'ADMISSION</div>
                <div style={{ fontSize: '1.05rem', color: '#fff', fontWeight: 'bold', marginBottom: '0.4rem' }}>Maturité en milieu professionnel</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Stage S3 de 10 semaines en association économique auprès de 170 chefs d'entreprises du Grand Nancy.</div>
              </div>
              <div style={{ borderLeft: '2px solid var(--accent-color)', paddingLeft: '1rem' }}>
                <div style={{ fontSize: '0.85rem', color: '#ffb74d', fontWeight: 'bold', marginBottom: '0.3rem' }}>EXIGENCE D'ADMISSION</div>
                <div style={{ fontSize: '1.05rem', color: '#fff', fontWeight: 'bold', marginBottom: '0.4rem' }}>Faisabilité de l'alternance 24 mois</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Prospection ciblée dès le S4 auprès des agences créatives et studios de motion rennais avec book interactif.</div>
              </div>
              <div style={{ borderLeft: '2px solid var(--accent-color)', paddingLeft: '1rem' }}>
                <div style={{ fontSize: '0.85rem', color: '#ffb74d', fontWeight: 'bold', marginBottom: '0.3rem' }}>FINALITÉ DU PROJET PRO</div>
                <div style={{ fontSize: '1.05rem', color: 'var(--accent-color)', fontWeight: 'bold', marginBottom: '0.4rem' }}>Création d'agence indépendante</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Capitaliser sur le double statut diplômé Master Rennes 2 + 2 ans d'alternance pour fonder ma propre agence.</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 06 LE PARCOURS & EXPÉRIENCES PROFESSIONNELLES              */}
        {/* ========================================================= */}
        <section id="parcours">
          <SectionHeader 
            num="06" 
            title="LE PARCOURS DE FORMATION" 
            subtitle="Une formation rigoureuse en BUT MMI complétée par des expériences concrètes sur le terrain qui valident les attendus du Master."
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {experiences.map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="card glass-panel"
                style={{ padding: '2rem', borderLeft: '4px solid var(--accent-color)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>
                      <Calendar size={14} /> {exp.period}
                    </div>
                    <h3 style={{ fontSize: '1.7rem', color: 'var(--text-primary)' }}>{exp.role}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.2rem' }}>
                      <Building size={16} color="var(--accent-color)" />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.4rem 0.8rem', borderRadius: '2px', fontSize: '0.85rem', color: 'var(--text-secondary)', border: '1px solid #333' }}>
                    {exp.context}
                  </div>
                </div>

                <div style={{ margin: '1.5rem 0' }}>
                  <h4 style={{ fontSize: '1rem', letterSpacing: '0.1em', color: 'var(--accent-color)', marginBottom: '0.75rem' }}>
                    MISSIONS RÉALISÉES & COMPÉTENCES DÉVELOPPÉES :
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {exp.missions.map((m, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                        <ChevronRight size={16} color="var(--accent-color)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  {exp.tools.map((t, idx) => (
                    <span key={idx} style={{ fontSize: '0.78rem', background: '#111', padding: '0.3rem 0.6rem', border: '1px solid #333', color: '#bbb' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* 5 National BUT MMI Competencies Card */}
          <div className="card" style={{ marginTop: '3rem', background: 'rgba(0, 240, 255, 0.03)', borderColor: 'rgba(0, 240, 255, 0.2)' }}>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--accent-color)', marginBottom: '1.5rem' }}>
              RÉFÉRENTIEL DES 5 COMPÉTENCES NATIONALES DU BUT MMI VALIDÉES
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
              {[
                { name: '1. COMPRENDRE', desc: 'Analyse sémiotique des contextes, écosystèmes et cibles (Lego × Clash Royale, poules en batterie).' },
                { name: '2. CONCEVOIR', desc: 'Stratégie de communication transmédia et conception UI/UX d\'interfaces interactives.' },
                { name: '3. EXPRIMER', desc: 'Cœur de mon profil : affiches grand format, tournages vidéo, montage Premiere Pro et motion design.' },
                { name: '4. DÉVELOPPER', desc: 'Bases solides en intégration web HTML5/CSS3/JavaScript, CMS WordPress et applications FlutterFlow.' },
                { name: '5. ENTREPRENDRE', desc: 'Gestion de projet, travail en équipe pluridisciplinaire, respect des délais et pitchs devant jury.' }
              ].map((c, i) => (
                <div key={i} style={{ borderLeft: '2px solid var(--accent-color)', paddingLeft: '1rem' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>{c.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* TRAJECTOIRE ACADÉMIQUE & GÉOGRAPHIQUE NANCY -> RENNES 2    */}
        {/* ========================================================= */}
        <TrajectoryNancyRennes />

        {/* ========================================================= */}
        {/* 07 DÉMARCHE DE VEILLE INFORMATIONNELLE (POINT 3 · 3 PTS)  */}
        {/* ========================================================= */}
        <section id="veille">
          <SectionHeader 
            num="07" 
            title="DÉMARCHE DE VEILLE INFORMATIONNELLE" 
            subtitle="Protocole de recherche raisonnée, analyse critique de l'IA et application concrète au Master Création Numérique."
            rubricBadge={{ score: "3 POINTS", text: "Point 3 du barème universitaire" }}
          />

          <div className="veille-hub-box">
            
            {/* Ruban Méthodologique Compact en 4 étapes */}
            <div className="compact-workflow-strip">
              {veilleWorkflowSteps.map((step, i) => (
                <React.Fragment key={i}>
                  <div className="compact-workflow-item">
                    <span className="compact-workflow-num">{step.num}</span>
                    <div>
                      <div style={{ color: '#fff', fontSize: '0.82rem', fontWeight: 'bold' }}>{step.label}</div>
                      <div style={{ color: '#888', fontSize: '0.72rem' }}>{step.desc}</div>
                    </div>
                  </div>
                  {i < veilleWorkflowSteps.length - 1 && (
                    <ArrowRight size={14} color="var(--accent-color)" style={{ opacity: 0.5, flexShrink: 0 }} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Onglets Interactifs du Hub de Veille */}
            <div className="segmented-tabs-wrapper" style={{ margin: '1.5rem 0' }}>
              <button
                type="button"
                className={`segmented-tab-btn ${activeVeilleTab === 'outils' ? 'active' : ''}`}
                onClick={() => setActiveVeilleTab('outils')}
              >
                <Search size={16} />
                <span>01 · MES 3 OUTILS DE VEILLE</span>
                <span className="tab-count-badge">3</span>
              </button>

              <button
                type="button"
                className={`segmented-tab-btn ${activeVeilleTab === 'etude' ? 'active' : ''}`}
                onClick={() => setActiveVeilleTab('etude')}
              >
                <BookOpen size={16} />
                <span>02 · ÉTUDE DE CAS VÉRIFIÉE (NN/G)</span>
                <span className="tab-count-badge" style={{ background: 'var(--accent-color)', color: '#000' }}>VÉRIFIÉ</span>
              </button>

              <button
                type="button"
                className={`segmented-tab-btn ${activeVeilleTab === 'axes' ? 'active' : ''}`}
                onClick={() => setActiveVeilleTab('axes')}
              >
                <Compass size={16} />
                <span>03 · 3 AXES DE RECHERCHE</span>
                <span className="tab-count-badge">3</span>
              </button>
            </div>

            {/* CONTENU ONGLETS */}
            <AnimatePresence mode="wait">
              {/* ONGLET 1 : LES 3 OUTILS DE VEILLE */}
              {activeVeilleTab === 'outils' && (
                <motion.div
                  key="tab-outils"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="tools-compact-grid"
                >
                  {veilleTools.map((tool) => (
                    <div key={tool.id} className="tool-compact-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          {tool.id === 'feedly' && <Rss size={20} color="var(--accent-color)" />}
                          {tool.id === 'alerts' && <Bell size={20} color="var(--accent-color)" />}
                          {tool.id === 'linkedin' && (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                              <rect x="2" y="9" width="4" height="12" />
                              <circle cx="4" cy="4" r="2" />
                            </svg>
                          )}
                          <h4 style={{ fontSize: '1.25rem', color: '#fff', margin: 0 }}>{tool.name}</h4>
                        </div>
                        <span className="tool-compact-badge">{tool.badge}</span>
                      </div>

                      <div style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        {tool.category}
                      </div>

                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                        {tool.tagline}
                      </p>

                      <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.75rem', borderLeft: '2px solid var(--accent-color)', marginTop: '0.25rem' }}>
                        <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--accent-color)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                          {tool.id === 'feedly' ? 'Flux suivis :' : tool.id === 'alerts' ? 'Requêtes ciblées :' : 'Écosystème ciblé :'}
                        </span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                          {(tool.sources || tool.queries || tool.networkFollowed || []).map((item, idx) => (
                            <span key={idx} className="bento-tag" style={{ fontSize: '0.7rem' }}>
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ marginTop: 'auto', paddingTop: '0.6rem', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', color: '#ccc', lineHeight: 1.45 }}>
                        <strong style={{ color: '#00e676', fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                          Impact pour mon projet :
                        </strong>
                        {tool.concreteBenefit}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* ONGLET 2 : CAS PRATIQUE NN/G */}
              {activeVeilleTab === 'etude' && (
                <motion.div
                  key="tab-etude"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="study-compact-layout"
                >
                  {/* Left Column: Context & Metadata */}
                  <div className="study-left-pane">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span className="verified-source-badge" style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}>
                        <CheckCircle2 size={13} /> {verifiedStudy.status}
                      </span>
                      <a
                        href={verifiedStudy.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', gap: '0.4rem', textDecoration: 'none' }}
                      >
                        VOIR SUR NN/G <ExternalLink size={13} />
                      </a>
                    </div>

                    <h4 style={{ fontSize: '1.4rem', color: '#fff', margin: '0.3rem 0' }}>
                      « {verifiedStudy.title} »
                    </h4>

                    <div style={{ fontSize: '0.82rem', color: 'var(--accent-color)', fontWeight: 600 }}>
                      {verifiedStudy.author} · {verifiedStudy.sourceOrg}
                    </div>

                    <div className="study-sub-card">
                      <strong style={{ fontSize: '0.75rem', color: '#ffb74d', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        01 · Le constat théorique clé (NN/g)
                      </strong>
                      <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                        {verifiedStudy.keyFindings}
                      </p>
                    </div>

                    <div className="study-sub-card" style={{ borderLeftColor: 'var(--accent-color)' }}>
                      <strong style={{ fontSize: '0.75rem', color: 'var(--accent-color)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        02 · Mon analyse critique de futur designer
                      </strong>
                      <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                        {verifiedStudy.personalAnalysis}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Direct Applications to Master */}
                  <div className="study-right-pane">
                    <div style={{ background: 'rgba(0, 230, 118, 0.05)', border: '1px solid rgba(0, 230, 118, 0.25)', padding: '1.25rem', borderRadius: '2px', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#00e676', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
                        <Target size={16} /> 03 · APPLICATION CONCRÈTE AU MASTER RENNES 2
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <div style={{ borderLeft: '2px solid #00e676', paddingLeft: '0.75rem' }}>
                          <span style={{ fontSize: '0.72rem', color: '#00e676', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Compétence ciblée</span>
                          <p style={{ fontSize: '0.84rem', color: '#ddd', margin: '0.2rem 0 0 0', lineHeight: 1.45 }}>{verifiedStudy.projectApplication.skill}</p>
                        </div>

                        <div style={{ borderLeft: '2px solid #00e676', paddingLeft: '0.75rem' }}>
                          <span style={{ fontSize: '0.72rem', color: '#00e676', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Projet de portfolio</span>
                          <p style={{ fontSize: '0.84rem', color: '#ddd', margin: '0.2rem 0 0 0', lineHeight: 1.45 }}>{verifiedStudy.projectApplication.portfolioProject}</p>
                        </div>

                        <div style={{ borderLeft: '2px solid #00e676', paddingLeft: '0.75rem' }}>
                          <span style={{ fontSize: '0.72rem', color: '#00e676', fontWeight: 800, textTransform: 'uppercase', display: 'block' }}>Oral d'admission</span>
                          <p style={{ fontSize: '0.84rem', color: '#ddd', margin: '0.2rem 0 0 0', lineHeight: 1.45 }}>{verifiedStudy.projectApplication.masterApplication}</p>
                        </div>
                      </div>

                      <div style={{ marginTop: 'auto', background: 'rgba(0,0,0,0.4)', padding: '0.75rem', border: '1px solid rgba(255,255,255,0.06)', fontSize: '0.78rem', color: '#aaa', lineHeight: 1.4 }}>
                        <strong style={{ color: '#fff' }}>Preuve d'autonomie intellectuelle :</strong> Capacité à mobiliser la recherche internationale sur les paradigmes d'interface pour orienter sa pratique plastique et technique.
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ONGLET 3 : 3 AXES DE RECHERCHE */}
              {activeVeilleTab === 'axes' && (
                <motion.div
                  key="tab-axes"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="axes-compact-grid"
                >
                  {researchAxes.map((axis) => (
                    <div key={axis.id} className="axis-compact-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="axis-status-tag">{axis.badge}</span>
                        <Compass size={16} color="var(--accent-color)" />
                      </div>

                      <h4 style={{ fontSize: '1.25rem', color: '#fff', margin: 0 }}>{axis.title}</h4>
                      <div style={{ fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: 600 }}>
                        {axis.subtitle}
                      </div>

                      <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.75rem', borderLeft: '2px solid #ffb74d' }}>
                        <span style={{ fontSize: '0.7rem', color: '#ffb74d', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                          Question de recherche :
                        </span>
                        <p style={{ fontSize: '0.82rem', color: '#ddd', fontStyle: 'italic', margin: 0, lineHeight: 1.45 }}>
                          « {axis.question} »
                        </p>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {axis.keywords.map((kw, idx) => (
                          <span key={idx} className="bento-tag">
                            #{kw}
                          </span>
                        ))}
                      </div>

                      <div style={{ marginTop: 'auto', paddingTop: '0.6rem', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        <strong style={{ color: '#00e676', fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                          Intérêt pour mon projet :
                        </strong>
                        {axis.projectRelevance}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ruban Synergie Méthodologique */}
            <div className="synergy-strip">
              <div className="synergy-flow-text">
                <span className="synergy-flow-item accent">SYNERGIE MÉTHODOLOGIQUE :</span>
                <span>Curation active</span>
                <span>➔</span>
                <span>Analyse critique (NN/g)</span>
                <span>➔</span>
                <span className="synergy-flow-item">Feuille de route Master</span>
              </div>
              <button
                type="button"
                className="btn-primary"
                onClick={() => document.getElementById('methodologie')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ padding: '0.5rem 1.1rem', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                VOIR LA PROGRESSION PROFESSIONNELLE (SECTION 08) <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 08 MÉTHODOLOGIE & ROADMAP PROFESSIONNELLE (POINT 4 · 3 PTS)*/}
        {/* ========================================================= */}
        <section id="methodologie">
          <SectionHeader 
            num="08" 
            title="MÉTHODOLOGIE ET PROGRESSION PROFESSIONNELLE" 
            subtitle="Feuille de route actionnable en 4 étapes concrètes : Consolider, Expérimenter, Valoriser et Candidater."
            rubricBadge={{ score: "3 POINTS", text: "Point 4 du barème universitaire" }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Démarche fondée sur des actions réelles */}
            <div className="card glass-panel" style={{ padding: '2rem', borderLeft: '4px solid var(--accent-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-color)', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '0.5rem', letterSpacing: '0.12em' }}>
                <Workflow size={18} /> GESTION DE PROJET DE CANDIDATURE
              </div>
              <h3 style={{ fontSize: '1.65rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                UNE PROGRESSION FONDÉE SUR DES ACTIONS ET DES LIVRABLES CONCRETS
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.02rem', marginBottom: '1rem' }}>
                Pour garantir une transition réussie entre mon BUT MMI et le Master Création Numérique de Rennes 2 en alternance, j'ai banni tout indicateur arbitraire au profit d'une <strong>roadmap séquentielle jalonnée par des objectifs opérationnels</strong>. Cette stratégie relie directement les enseignements théoriques, les retours de ma veille active et les exigences de sélection universitaire.
              </p>
              <div style={{ padding: '0.75rem 1rem', background: 'rgba(255, 183, 77, 0.05)', border: '1px solid rgba(255, 183, 77, 0.25)', fontSize: '0.85rem', color: '#ffb74d' }}>
                <strong>Précision méthodologique :</strong> Il s'agit d'une feuille de route active orientée résultats, et non d'un tableau d'acquis certifiés ou de résultats déjà bouclés.
              </div>
            </div>

            {/* B. Les 4 étapes de la Roadmap */}
            <div>
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '1.35rem', color: '#fff', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>
                  LES QUATRE ÉTAPES DE MA FEUILLE DE ROUTE
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                  Chaque étape est adossée à des actions spécifiques et aboutit à un livrable tangible évaluable par le jury.
                </p>
              </div>

              <div className="roadmap-grid">
                {roadmapSteps.map((st) => {
                  const isSelected = activeRoadmapStep === st.code;
                  return (
                    <motion.div 
                      key={st.code} 
                      className="roadmap-card"
                      style={{ 
                        borderColor: isSelected ? 'var(--accent-color)' : 'var(--border-color)',
                        background: isSelected ? 'rgba(18, 19, 22, 0.95)' : 'var(--bg-card)'
                      }}
                      onClick={() => setActiveRoadmapStep(st.code)}
                      whileHover={{ y: -4 }}
                    >
                      <div className="roadmap-step-header">
                        <div>
                          <div className="roadmap-step-num">{st.step}</div>
                          <div style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#fff', marginTop: '0.2rem' }}>
                            {st.code}
                          </div>
                        </div>
                        <span 
                          className="roadmap-status-badge"
                          style={{ 
                            background: `rgba(0, 240, 255, 0.08)`, 
                            color: st.statusBadgeColor, 
                            border: `1px solid ${st.statusBadgeColor}` 
                          }}
                        >
                          {st.status}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.78rem', color: '#888', fontWeight: 'bold', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        Période : {st.period}
                      </div>

                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {st.objective}
                      </p>

                      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.8rem' }}>
                        <strong style={{ display: 'block', fontSize: '0.78rem', color: 'var(--accent-color)', letterSpacing: '0.08em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                          Actions concrètes :
                        </strong>
                        <ul className="roadmap-actions-list">
                          {(st.actions || st.concreteActions || []).map((act, idx) => (
                            <li key={idx} className="roadmap-action-item">
                              <ChevronRight size={14} color="var(--accent-color)" style={{ flexShrink: 0, marginTop: '2px' }} />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="roadmap-deliverable-box">
                        <strong style={{ color: 'var(--accent-color)', display: 'block', marginBottom: '0.2rem' }}>LIVRABLE CONCRET :</strong>
                        {st.deliverable}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* C. Relier la Veille à cette progression (Boucle dynamique) */}
            <div className="card glass-panel" style={{ padding: '2rem', border: '1px solid rgba(0, 240, 255, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-color)', marginBottom: '1rem' }}>
                <TrendingUp size={20} />
                <h4 style={{ fontSize: '1.3rem', color: '#fff', margin: 0 }}>
                  BOUCLE VERTUEUSE : DE LA VEILLE AUX PROJETS DU PORTFOLIO
                </h4>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                L'alignement entre ma veille et ma feuille de route crée un écosystème d'apprentissage autonome. La veille ne reste jamais passive : elle se convertit systématiquement en compétence technique, puis en création plastique pour enrichir le portfolio.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{ background: '#0a0b0e', borderLeft: '3px solid var(--accent-color)', padding: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: 'bold' }}>1. VEILLE ACTIVE</div>
                  <div style={{ fontSize: '0.85rem', color: '#ddd', marginTop: '0.3rem' }}>Identification des évolutions de l'IA générative et des attentes en design d'interaction.</div>
                </div>
                <div style={{ background: '#0a0b0e', borderLeft: '3px solid #ffb74d', padding: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', color: '#ffb74d', fontWeight: 'bold' }}>2. ANALYSE CRITIQUE</div>
                  <div style={{ fontSize: '0.85rem', color: '#ddd', marginTop: '0.3rem' }}>Repérage précis des compétences à approfondir (interfaces hybrides, typographie avancée).</div>
                </div>
                <div style={{ background: '#0a0b0e', borderLeft: '3px solid #ab47bc', padding: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', color: '#ab47bc', fontWeight: 'bold' }}>3. PROJETS CIBLÉS</div>
                  <div style={{ fontSize: '0.85rem', color: '#ddd', marginTop: '0.3rem' }}>Mise en pratique dans des projets personnels et en stage (covers, prototypes Figma, vidéos ASNL).</div>
                </div>
                <div style={{ background: '#0a0b0e', borderLeft: '3px solid #00e676', padding: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', color: '#00e676', fontWeight: 'bold' }}>4. PORTFOLIO & ORAL</div>
                  <div style={{ fontSize: '0.85rem', color: '#ddd', marginTop: '0.3rem' }}>Valorisation dans ce book et soutenance argumentée face au jury du Master Rennes 2.</div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 09 OUTILS NUMÉRIQUES ET USAGE PRATIQUE (POINT 5 · 3 PTS)  */}
        {/* ========================================================= */}
        <section id="outils">
          <SectionHeader 
            num="09" 
            title="OUTILS NUMÉRIQUES ET UTILISATION PRATIQUE" 
            subtitle="Pertinence et emploi logique des outils numériques pour la veille, la gestion de projet, la création artistique et la présentation."
            rubricBadge={{ score: "3 POINTS", text: "Point 5 du barème universitaire" }}
          />

          <div className="tools-showcase-grid">
            <div className="tool-item">
              <div className="tool-icon-wrapper">
                <Layout size={24} color="var(--accent-color)" />
              </div>
              <div style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>GESTION DE PROJET & ORGANISATION</div>
              <h4 style={{ fontSize: '1.4rem', marginBottom: '0.6rem', color: '#fff' }}>TRELLO & NOTION</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Gestion en mode Kanban des livrables de candidature, suivi des candidatures d'alternance à Rennes, centralisation des notes de veille et rétroplanning jalonné.
              </p>
            </div>

            <div className="tool-item">
              <div className="tool-icon-wrapper">
                <Search size={24} color="var(--accent-color)" />
              </div>
              <div style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>VEILLE & CURATION ACTIVE</div>
              <h4 style={{ fontSize: '1.4rem', marginBottom: '0.6rem', color: '#fff' }}>FEEDLY, ALERTS & LINKEDIN</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Méthode de veille active : curation manuelle régulière de flux RSS ciblés via Feedly, alertes par e-mail sur les mutations de l'IA créative et observation des studios rennais sur LinkedIn.
              </p>
            </div>

            <div className="tool-item">
              <div className="tool-icon-wrapper">
                <PenTool size={24} color="var(--accent-color)" />
              </div>
              <div style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>CONCEPTION GRAPHIQUE & PRINT</div>
              <h4 style={{ fontSize: '1.4rem', marginBottom: '0.6rem', color: '#fff' }}>PHOTOSHOP & ILLUSTRATOR</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Production des affiches grand format, covers d’albums, détourages complexes, photomontages haute fidélité et compositions typographiques vectorielles.
              </p>
            </div>

            <div className="tool-item">
              <div className="tool-icon-wrapper">
                <MonitorPlay size={24} color="var(--accent-color)" />
              </div>
              <div style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>AUDIOVISUEL & POST-PRODUCTION</div>
              <h4 style={{ fontSize: '1.4rem', marginBottom: '0.6rem', color: '#fff' }}>PREMIERE PRO & AFTER EFFECTS</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Montage rythmé en conditions réelles (gala ASNL, teasers), étalonnage colorimétrique, mixage sonore et animations graphiques pour les réseaux et l'événementiel.
              </p>
            </div>

            <div className="tool-item">
              <div className="tool-icon-wrapper">
                <Cpu size={24} color="var(--accent-color)" />
              </div>
              <div style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>PRÉSENTATION WEB INTERACTIVE</div>
              <h4 style={{ fontSize: '1.4rem', marginBottom: '0.6rem', color: '#fff' }}>REACT 19 · VITE · FRAMER MOTION</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Conception et déploiement de ce site interactif hébergé sur GitHub Pages : démonstration concrète de rigueur technique et d’autonomie dans la présentation du dossier.
              </p>
            </div>

            <div className="tool-item">
              <div className="tool-icon-wrapper">
                <Network size={24} color="var(--accent-color)" />
              </div>
              <div style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>RÉSEAUX & SUITE GOOGLE</div>
              <h4 style={{ fontSize: '1.4rem', marginBottom: '0.6rem', color: '#fff' }}>CANVA, GOOGLE SUITE & LINKEDIN</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Création de supports rapides d'invitations corporate (Afterwork ATP), stockage cloud partagé pour les captations et prospection active auprès des directeurs artistiques rennais.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 10 DOSSIER DE TRAVAUX (BOOK INTERACTIF / PREUVES)         */}
        {/* ========================================================= */}
        <PortfolioRail projects={projects} onSelectProject={setActiveModalProject} />

        {/* ========================================================= */}
        {/* LIGHTBOX MODAL                                             */}
        {/* ========================================================= */}
        <AnimatePresence>
          {activeModalProject && (
            <div className="modal-overlay" onClick={() => setActiveModalProject(null)}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setActiveModalProject(null)}
                  style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', zIndex: 10 }}
                >
                  <X size={24} color="var(--accent-color)" />
                </button>

                {/* Left side: Video player or High-res image */}
                <div style={{ 
                  background: '#050505', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  border: '1px solid var(--border-color)', 
                  height: '100%', 
                  width: '100%',
                  minHeight: '480px',
                  overflow: 'hidden' 
                }}>
                  {activeModalProject.videoUrl ? (
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <iframe 
                        src={activeModalProject.videoUrl} 
                        title={activeModalProject.title} 
                        style={{ width: '100%', height: '100%', flex: 1, minHeight: '460px', border: 'none', display: 'block' }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen 
                      />
                      {activeModalProject.youtubeLink && (
                        <div style={{ padding: '0.85rem', background: '#111', display: 'flex', justifyContent: 'center', borderTop: '1px solid #222', flexShrink: 0, marginTop: 'auto' }}>
                          <a 
                            href={activeModalProject.youtubeLink} 
                            target="_blank" 
                            rel="noreferrer" 
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 'bold' }}
                          >
                            VOIR LA VIDÉO SUR YOUTUBE <ExternalLink size={14} />
                          </a>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '1rem' }}>
                      <img 
                        src={activeModalProject.image} 
                        alt={activeModalProject.title} 
                        style={{ maxWidth: '100%', maxHeight: '75vh', objectFit: 'contain' }}
                      />
                    </div>
                  )}
                </div>

                {/* Right side: Detailed presentation */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'inline-block', background: 'rgba(0, 240, 255, 0.1)', color: 'var(--accent-color)', padding: '0.3rem 0.8rem', fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid var(--accent-color)', marginBottom: '0.75rem' }}>
                      {activeModalProject.category} · {activeModalProject.date}
                    </div>

                    <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                      {activeModalProject.title}
                    </h2>

                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                      Contexte : {activeModalProject.context}
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                      {activeModalProject.description}
                    </p>

                    {activeModalProject.highlights && (
                      <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--accent-color)', marginBottom: '0.5rem' }}>
                          POINTS CLÉS DU PROJET :
                        </h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          {activeModalProject.highlights.map((h, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>
                              <ChevronRight size={14} color="var(--accent-color)" /> {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                    <h4 style={{ fontSize: '0.85rem', color: 'var(--accent-color)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                      OUTILS UTILISÉS :
                    </h4>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {activeModalProject.tools.map((tool, i) => (
                        <span key={i} style={{ background: '#18191d', padding: '0.3rem 0.8rem', fontSize: '0.85rem', border: '1px solid #333', color: '#fff' }}>
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ========================================================= */}
        {/* 11 CONCLUSION ET PERSPECTIVES (POINT 6 DU BARÈME · 2 PTS) */}
        {/* ========================================================= */}
        <section id="conclusion" style={{ minHeight: '85vh', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <SectionHeader 
            num="11" 
            title="CONCLUSION & PERSPECTIVES" 
            subtitle="Clôture du projet : réponse claire à la problématique d'admission et perspectives d’évolution future."
            rubricBadge={{ score: "2 POINTS", text: "Point 6 du barème universitaire" }}
          />

          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="card"
            style={{ padding: '3.5rem 2.5rem', background: 'rgba(14, 15, 18, 0.95)', border: '1px solid var(--accent-color)', width: '100%', maxWidth: '950px' }}
          >
            {/* Réponse claire à la problématique */}
            <div style={{ background: 'rgba(0, 240, 255, 0.05)', borderLeft: '4px solid var(--accent-color)', padding: '1.5rem', textAlign: 'left', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <CheckCircle2 size={20} /> RÉPONSE DIRECTE À LA PROBLÉMATIQUE DU PROJET
              </div>
              <p style={{ color: 'var(--text-primary)', fontSize: '1.15rem', lineHeight: 1.7 }}>
                L’analyse approfondie des modalités d’admission au <strong>Master Création Numérique de l’Université Rennes 2</strong> a agi comme une boussole structurante. Loin d'être une simple formalité académique, ces critères ont dicté le choix de ma spécialisation en BUT MMI, orienté mes stages vers des milieux exigeants (ATP Nancy Porte Nord, Hatshop) et transformé ma veille en atout stratégique. 
                <br/><br/>
                Intégrer ce Master en <strong>alternance</strong> est la clé de voûte indispensable pour asseoir ma crédibilité de Directeur Artistique et poser les bases de ma future agence créative.
              </p>
            </div>

            {/* 3 Perspectives d'avenir */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', textAlign: 'left', marginBottom: '3rem' }}>
              <div style={{ background: '#0a0b0e', border: '1px solid #222', padding: '1.25rem' }}>
                <div style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>PERSPECTIVE 2026-2028</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>Master Rennes 2 en Alternance</div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Validation du diplôme national de Master, production de projets en recherche-création et 24 mois d'immersion professionnelle en agence créative bretonne.
                </p>
              </div>

              <div style={{ background: '#0a0b0e', border: '1px solid #222', padding: '1.25rem' }}>
                <div style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>PERSPECTIVE 2028-2030</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>Direction Artistique & Motion</div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Prise de responsabilités en agence de branding / studio de production digitale, pilotage de campagnes d'envergure et fidélisation client.
                </p>
              </div>

              <div style={{ background: '#0a0b0e', border: '1px solid #222', padding: '1.25rem' }}>
                <div style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>PERSPECTIVE HORIZON 2030+</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>Création de mon Agence</div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Lancement officiel d'une agence créative indépendante pluridisciplinaire réunissant des talents formés à Rennes 2 et des partenaires du secteur.
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href="./portfolio-images/CV_DINTRICH_MATHIS.pdf" 
                target="_blank" 
                rel="noreferrer" 
                className="btn-primary"
                style={{ background: 'var(--accent-color)', color: '#050505' }}
              >
                TÉLÉCHARGER LE CV OFFICIEL <Download size={18} />
              </a>

              <button 
                className="btn-secondary" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                REMONTER EN HAUT DU DOSSIER ↑
              </button>
            </div>
          </motion.div>
        </section>

      </main>
    </>
  );
}

export default App;
