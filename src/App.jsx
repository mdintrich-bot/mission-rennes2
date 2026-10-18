import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ArrowRight, 
  CheckSquare, 
  Target, 
  PenTool, 
  Layout, 
  MonitorPlay, 
  Zap, 
  ExternalLink, 
  Download, 
  Eye, 
  Sparkles, 
  X, 
  Play,
  Briefcase, 
  GraduationCap, 
  Calendar,
  Building
} from 'lucide-react';
import { projects, skillsList, experiences } from './data/projectsData';
import './index.css';

const navItems = [
  { id: 'hero', label: '00 / ACCUEIL' },
  { id: 'profil', label: '01 / PROFIL' },
  { id: 'parcours', label: '02 / PARCOURS' },
  { id: 'destination', label: '03 / DESTINATION' },
  { id: 'rennes2', label: '04 / RENNES 2' },
  { id: 'admission', label: '05 / ADMISSION' },
  { id: 'veille', label: '06 / VEILLE' },
  { id: 'strategie', label: '07 / STRATÉGIE' },
  { id: 'portfolio', label: '08 / PREUVES' },
];

const SectionHeader = ({ num, title, subtitle }) => (
  <motion.div 
    initial={{ opacity: 0, x: -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    style={{ marginBottom: '3rem' }}
  >
    <h2 className="section-title">
      {num} — <span>{title}</span>
    </h2>
    {subtitle && (
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', marginTop: '-1.5rem', maxWidth: '750px' }}>
        {subtitle}
      </p>
    )}
  </motion.div>
);

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

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

  const filteredProjects = selectedCategory === 'ALL'
    ? projects
    : projects.filter(p => p.category === selectedCategory || (selectedCategory === 'GRAPHISME' && p.category.includes('GRAPHISME')));

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
        {/* 00 HERO SECTION                                            */}
        {/* ========================================================= */}
        <section id="hero" style={{ minHeight: '95vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.4rem 1rem', background: 'rgba(0, 240, 255, 0.08)', border: '1px solid rgba(0, 240, 255, 0.25)', marginBottom: '1.5rem', borderRadius: '2px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)', boxShadow: '0 0 8px var(--accent-color)' }} />
              <span style={{ fontSize: '0.85rem', letterSpacing: '0.15em', color: 'var(--accent-color)', fontWeight: 'bold' }}>
                DOSSIER DE CANDIDATURE OFFICIEL
              </span>
            </div>

            <p className="hero-subtitle">MATHIS DINTRICH · BUT MMI CRÉATION NUMÉRIQUE</p>
            <h1 className="hero-title">
              MISSION :<br/>
              <span style={{ color: 'var(--accent-color)' }}>RENNES 2</span>
            </h1>
            
            <p style={{ fontSize: '1.35rem', color: 'var(--text-secondary)', maxWidth: '680px', margin: '2rem 0', lineHeight: 1.6, borderLeft: '3px solid var(--accent-color)', paddingLeft: '1.25rem' }}>
              « Construire aujourd’hui les compétences qui me permettront de créer demain. »
            </p>
            
            <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', marginTop: '2.5rem' }}>
              <button 
                className="btn-primary"
                onClick={() => document.getElementById('profil')?.scrollIntoView({ behavior: 'smooth' })}
              >
                EXPLORER LE DOSSIER <ArrowRight size={18} />
              </button>
              
              <button 
                className="btn-secondary"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                VOIR LES PREUVES VISUELLES <Eye size={18} />
              </button>

              <a 
                href="./portfolio-images/CV_DINTRICH_MATHIS.pdf" 
                target="_blank" 
                rel="noreferrer"
                className="btn-secondary"
                style={{ borderColor: 'rgba(0, 240, 255, 0.4)', color: 'var(--text-primary)' }}
              >
                TÉLÉCHARGER LE CV (PDF) <Download size={18} color="var(--accent-color)" />
              </a>
            </div>

            <div style={{ marginTop: '5rem', display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--accent-color)', fontSize: '0.85rem', letterSpacing: '0.2em' }}>
              <span style={{ opacity: 0.8 }}>SCROLL POUR COMMENCER L'ANALYSE</span>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
                ↓
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ========================================================= */}
        {/* 01 PROFIL & IDENTITÉ                                       */}
        {/* ========================================================= */}
        <section id="profil">
          <SectionHeader 
            num="01" 
            title="QUI SUIS-JE ?" 
            subtitle="Étudiant passionné par la communication visuelle, la direction artistique et l'audiovisuel."
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
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-color)', letterSpacing: '0.1em' }}>19 ANS · NANCY</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span>BUT MMI Nancy-Charlemagne</span>
                <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>Spécialité Création Numérique</span>
              </div>
            </motion.div>

            {/* Bio Text & Pillars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="card" style={{ borderLeft: '4px solid var(--accent-color)' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  CRÉATEUR VISUEL & PASSIONNÉ
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem', marginBottom: '1rem' }}>
                  Je m'appelle <strong>Mathis Dintrich</strong>, j’ai 19 ans et je suis étudiant en 2e année de BUT MMI à l’IUT Nancy-Charlemagne. Dès le Semestre 4, j'ai choisi la spécialisation <strong>Création Numérique</strong>.
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem' }}>
                  Curieux et créatif, j’aime autant concevoir une identité graphique percutante que monter une vidéo rythmée ou imaginer une stratégie de communication complète. C’est cette polyvalence technique et artistique que je souhaite approfondir au sein du Master Création Numérique de <strong>l’Université Rennes 2</strong>.
                </p>
              </div>

              {/* 3 Real Pillars / Passions */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="card" style={{ padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>⚽ FOOTBALL</div>
                  <div style={{ color: 'var(--accent-color)', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>12 ANS DE PRATIQUE</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                    Milieu de terrain : rigueur tactique, esprit d'équipe, vision globale du jeu et persévérance au service du collectif.
                  </p>
                </div>

                <div className="card" style={{ padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>🎤 RAP FRANÇAIS</div>
                  <div style={{ color: 'var(--accent-color)', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>CULTURE & UNIVERS</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                    Passion pour les identités visuelles fortes, le cover art, la direction artistique des clips et la scénographie d'artistes.
                  </p>
                </div>

                <div className="card" style={{ padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>🎨 GRAPHISME</div>
                  <div style={{ color: 'var(--accent-color)', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>VOCATION & MÉTIER</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                    Curiosité visuelle continue : décortiquer les affiches, typographies et logos pour concevoir des œuvres à fort impact.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Software & Skills Badges */}
          <div style={{ marginTop: '2rem' }}>
            <h4 style={{ fontSize: '1.3rem', letterSpacing: '0.1em', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              COMPÉTENCES TECHNIQUES & LOGICIELLES
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {skillsList.map((skill, i) => (
                <motion.div 
                  key={i} 
                  className="card"
                  whileHover={{ y: -5 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h5 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>{skill.name}</h5>
                    <span style={{ color: 'var(--accent-color)', fontWeight: 'bold', fontSize: '0.85rem' }}>{skill.score}</span>
                  </div>
                  <div style={{ color: 'var(--accent-color)', fontSize: '0.85rem', fontWeight: 'bold' }}>
                    {skill.tools}
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                    {skill.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 02 LE PARCOURS & EXPÉRIENCES                               */}
        {/* ========================================================= */}
        <section id="parcours">
          <SectionHeader 
            num="02" 
            title="LE PARCOURS" 
            subtitle="Une formation rigoureuse en BUT MMI complétée par des expériences concrètes sur le terrain."
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
                    MISSIONS RÉALISÉES :
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
              RÉFÉRENTIEL DES 5 COMPÉTENCES NATIONALES BUT MMI VALIDÉES
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
              {[
                { name: '1. COMPRENDRE', desc: 'Analyse des contextes, écosystèmes et cibles (ex: Lego × Clash Royale, poules en batterie).' },
                { name: '2. CONCEVOIR', desc: 'Stratégie de communication complète et conception UI/UX (ex: App mobile FlutterFlow).' },
                { name: '3. EXPRIMER', desc: 'Cœur de mon parcours : tournage vidéo, montage Premiere Pro, affiches et motion design.' },
                { name: '4. DÉVELOPPER', desc: 'Bases solides en intégration web HTML5/CSS3/PHP et architectures CMS WordPress.' },
                { name: '5. ENTREPRENDRE', desc: 'Gestion de projet, travail en équipe, respect des délais et défense de choix créatifs.' }
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
        {/* 03 DESTINATION & OBJECTIF                                  */}
        {/* ========================================================= */}
        <section id="destination">
          <SectionHeader 
            num="03" 
            title="DESTINATION" 
            subtitle="Un cap clair : approfondir la direction artistique et le motion design avant d'entreprendre."
          />
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <motion.div className="card" whileHover={{ scale: 1.02 }} style={{ borderTop: '4px solid var(--accent-color)' }}>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--accent-color)', marginBottom: '1.2rem' }}>
                DIRECTION ARTISTIQUE & GRAPHISME
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Créer des identités visuelles fortes, composer des affiches percutantes et concevoir des supports de communication pérennes.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-secondary)' }}>
                {['Composition & Typographie', 'Identité de marque & Storytelling', 'Cover Art & Culture Urbaine', 'Maîtrise Photoshop & Illustrator'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                    <ChevronRight size={16} color="var(--accent-color)" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div className="card" whileHover={{ scale: 1.02 }} style={{ borderTop: '4px solid #fff' }}>
              <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '1.2rem' }}>
                VIDÉO & MOTION DESIGN
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Raconter des histoires par le rythme visuel et sonore, concevoir des animations graphiques pour les nouveaux médias.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-secondary)' }}>
                {['Montage rythmé sous Premiere Pro', 'Animations After Effects', 'Captation terrain & sonorisation', 'Formats courts réseaux & teasers'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                    <ChevronRight size={16} color="var(--accent-color)" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="card glass-panel" style={{ marginTop: '2.5rem', padding: '2rem', textAlign: 'center' }}>
            <h4 style={{ fontSize: '1.4rem', color: 'var(--accent-color)', marginBottom: '0.8rem' }}>
              PROJET D'ENTREPRENEURIAT À LONG TERME
            </h4>
            <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7 }}>
              « Après mon BUT MMI, j'ai l'ambition d'intégrer le <strong>Master Création Numérique</strong> en <strong>alternance</strong> pour aiguiser mes compétences en conditions réelles. À plus long terme, mon objectif est de <strong>créer ma propre agence créative</strong> pour accompagner des projets innovants et passionnants. »
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 04 RENNES 2 : L'UNIVERSITÉ CIBLE                           */}
        {/* ========================================================= */}
        <section id="rennes2">
          <SectionHeader 
            num="04" 
            title="RENNES 2" 
            subtitle="Pourquoi le Master Création Numérique de l'Université Rennes 2 est mon premier choix."
          />
          <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--text-primary)', marginBottom: '3rem', textTransform: 'uppercase' }}>
            MASTER CRÉATION NUMÉRIQUE<br/>
            <span style={{ color: 'var(--accent-color)' }}>UNIVERSITÉ RENNES 2</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <motion.div className="card glass-panel" whileHover={{ y: -8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
                <Sparkles size={28} color="var(--accent-color)" />
                <h4 style={{ fontSize: '1.8rem', margin: 0 }}>01 — LE CROISEMENT ART × TECH</h4>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1rem' }}>
                Le programme du Master Création Numérique de Rennes 2 se distingue par son approche sensible et contemporaine des nouvelles technologies. Il fait écho direct à mes expérimentations en motion design, narration transmédia et design d’auteur.
              </p>
            </motion.div>

            <motion.div className="card glass-panel" whileHover={{ y: -8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
                <Building size={28} color="var(--accent-color)" />
                <h4 style={{ fontSize: '1.8rem', margin: 0 }}>02 — L’ÉCOSYSTÈME RENNAIS</h4>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1rem' }}>
                Rennes est un pôle créatif et technologique majeur, dynamique tant au niveau universitaire que dans le tissu des agences de design, des studios audiovisuels et de l'événementiel numérique, idéal pour mon alternance.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 05 CHECKPOINT : ADMISSION                                  */}
        {/* ========================================================= */}
        <section id="admission">
          <SectionHeader 
            num="05" 
            title="CHECKPOINT : ADMISSION" 
            subtitle="Conformité et anticipation de l'ensemble des critères d'évaluation du jury."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
            {[
              'BAC+3 EN COURS (BUT)',
              'CURSUS CRÉATION NUMÉRIQUE',
              'RELEVÉS DE NOTES MMI',
              'EXPÉRIENCES EN STAGE',
              'CV OFFICIEL ACTUALISÉ',
              'LETTRE DE MOTIVATION CIBLÉE'
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                transition={{ delay: i * 0.08 }} 
                className="card" 
                style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
              >
                <CheckSquare color="var(--accent-color)" size={22} style={{ flexShrink: 0 }} />
                <span style={{ fontWeight: 'bold', fontSize: '0.88rem' }}>{item}</span>
              </motion.div>
            ))}
          </div>
          
          <motion.div className="card" style={{ background: 'rgba(0, 240, 255, 0.05)', borderColor: 'var(--accent-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={{ fontSize: '2rem', color: 'var(--accent-color)' }}>
                LE DOSSIER DE TRAVAUX (PORTFOLIO)
              </h3>
              <div style={{ color: 'var(--accent-color)', fontSize: '1.4rem', letterSpacing: '0.2rem' }}>
                ★★★★★ PIÈCE MAÎTRESSE
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7 }}>
              Dans une sélection en Master Création Numérique, le portfolio est l'élément déterminant pour prouver la sensibilité graphique, la créativité, la rigueur d'exécution et la curiosité artistique du candidat.
              <br/><br/>
              <strong style={{ color: 'var(--text-primary)' }}>
                C’est pourquoi chaque création ci-dessous est documentée avec son contexte, ses objectifs réels et ses choix techniques.
              </strong>
            </p>
          </motion.div>
        </section>

        {/* ========================================================= */}
        {/* 06 VEILLE : IA & CRÉATION                                  */}
        {/* ========================================================= */}
        <section id="veille">
          <SectionHeader 
            num="06" 
            title="VEILLE : IA × CRÉATION" 
            subtitle="Explorer comment l'intelligence artificielle redéfinit les frontières du graphisme et du motion design."
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {[
                { title: 'FEEDLY & CURATION', desc: '→ veille quotidienne sur les flux RSS design, typographie et IA créative.' },
                { title: 'GOOGLE ALERTS', desc: '→ alertes thématiques sur les nouveaux moteurs génératifs et l’éthique de l’image.' },
                { title: 'COMMUNAUTÉS & LINKEDIN', desc: '→ échanges avec des directeurs artistiques et motion designers en agence.' }
              ].map((src, i) => (
                <div key={i} className="card" style={{ borderTop: '4px solid var(--accent-color)' }}>
                  <h4 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{src.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>{src.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              {[
                'IA générative et composition graphique',
                'Évolution du rôle du Directeur Artistique',
                'Typographie augmentée & Motion IA',
                'Nouveaux outils Suite Adobe Firefly',
                'Prototypage rapide & UX éthique'
              ].map((tag, i) => (
                <div key={i} style={{ padding: '0.5rem 1rem', background: '#0e0f12', border: '1px solid #2a2d34', borderRadius: '2px', fontSize: '0.88rem', color: '#ccc' }}>
                  # {tag}
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 07 STRATÉGIE — DE LA VEILLE À L'ACTION                    */}
        {/* ========================================================= */}
        <section id="strategie">
          <SectionHeader 
            num="07" 
            title="DE LA VEILLE À L'ACTION" 
            subtitle="Transformer les observations de veille en compétences opérationnelles et en vision stratégique."
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
            {[
              { theme: 'IA + CRÉATION VISUELLE', action: 'Dompter les outils comme multiplicateurs d’idées tout en gardant une signature humaine unique' },
              { theme: 'NOUVELLES PRATIQUES MOTION', action: 'Expérimenter l’animation procédurale et le sound design immersif' },
              { theme: 'TENDANCES COVER & TYPO', action: 'Alimenter mon univers graphique avec les codes des scènes musicales contemporaines' },
              { theme: 'ÉVOLUTION VERS LE MASTER', action: 'Positionner ma candidature sur la vision d’un créateur polyvalent et rigoureux' }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                className="card" 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 2rem', flexWrap: 'wrap', gap: '1rem' }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <h4 style={{ fontSize: '1.35rem', margin: 0, color: 'var(--text-primary)' }}>{item.theme}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--accent-color)' }}>
                  <ArrowRight size={20} />
                  <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>{item.action}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 08 LES PREUVES : PORTFOLIO RÉEL & INTERACTIF               */}
        {/* ========================================================= */}
        <section id="portfolio">
          <SectionHeader 
            num="08" 
            title="LES PREUVES" 
            subtitle="Sélection de travaux authentiques issus de mon parcours en BUT MMI, stages et projets personnels."
          />
          
          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {[
              { id: 'ALL', label: 'TOUS LES TRAVAUX' },
              { id: 'GRAPHISME', label: 'GRAPHISME & AFFICHES' },
              { id: 'STAGES', label: 'STAGES PROFESSIONNELS' },
              { id: 'COMMUNICATION', label: 'STRATÉGIE DE COM' },
              { id: 'PHOTOGRAPHIE', label: 'PHOTOGRAPHIE' },
              { id: 'AUDIOVISUEL', label: 'AUDIOVISUEL & VIDÉO' }
            ].map(cat => (
              <button
                key={cat.id}
                className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3.5rem' }}>
            {filteredProjects.map((proj) => (
              <motion.div 
                key={proj.id} 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="project-card"
                onClick={() => setActiveModalProject(proj)}
              >
                <div className="img-wrapper">
                  <img src={proj.image} alt={proj.title} loading="lazy" />
                  {proj.isVideo && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.4)' }}>
                      <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(0, 240, 255, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 25px var(--accent-glow)' }}>
                        <Play size={24} color="#050505" fill="#050505" style={{ marginLeft: '3px' }} />
                      </div>
                    </div>
                  )}
                  <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'rgba(5, 5, 5, 0.85)', padding: '0.35rem 0.75rem', borderRadius: '2px', fontSize: '0.75rem', color: 'var(--accent-color)', fontWeight: 'bold', border: '1px solid rgba(0, 240, 255, 0.3)' }}>
                    {proj.tag}
                  </div>
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--accent-color)', fontSize: '0.8rem', letterSpacing: '0.1em', fontWeight: 'bold' }}>
                      {proj.category}
                    </span>
                    <span style={{ color: '#777', fontSize: '0.8rem' }}>{proj.date}</span>
                  </div>

                  <h3 style={{ fontSize: '1.4rem', margin: '0.4rem 0 0.8rem', color: 'var(--text-primary)' }}>
                    {proj.title}
                  </h3>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.2rem', flexGrow: 1 }}>
                    {proj.description}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {proj.tools.slice(0, 2).map((t, idx) => (
                        <span key={idx} style={{ fontSize: '0.75rem', background: '#111', padding: '0.2rem 0.5rem', border: '1px solid #333', color: '#aaa' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent-color)', fontSize: '0.85rem', fontWeight: 'bold' }}>
                      {proj.isVideo ? 'VOIR LA VIDÉO' : 'DÉTAILS'} {proj.isVideo ? <Play size={14} fill="currentColor" /> : <Eye size={14} />}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href="./portfolio-images/CV_DINTRICH_MATHIS.pdf" 
              target="_blank" 
              rel="noreferrer"
              className="btn-primary"
            >
              TÉLÉCHARGER MON CV COMPLET (PDF) <Download size={18} />
            </a>
          </div>
        </section>

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
        {/* FINAL SECTION                                              */}
        {/* ========================================================= */}
        <section id="final" style={{ minHeight: '80vh', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="card"
            style={{ padding: '4rem 2rem', background: 'rgba(14, 15, 18, 0.9)', border: '1px solid var(--accent-color)', width: '100%', maxWidth: '900px' }}
          >
            <h2 style={{ fontSize: '1.25rem', letterSpacing: '0.25em', marginBottom: '1.5rem', color: 'var(--accent-color)' }}>
              MISSION RENNES 2 · DOSSIER 100% COMPLET
            </h2>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05, marginBottom: '1.5rem' }}>
              MATHIS DINTRICH
            </h1>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
              CRÉATION NUMÉRIQUE · GRAPHISME · VIDÉO
            </h3>

            <p style={{ maxWidth: '650px', margin: '0 auto 2.5rem', color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
              Prêt à mettre mon énergie, ma polyvalence et ma créativité au service du Master Création Numérique et d'une entreprise en alternance.
            </p>
            
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
