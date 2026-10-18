import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ChevronRight, ArrowRight, CheckSquare, Target, Code, PenTool, Layout, MonitorPlay, Zap, ExternalLink } from 'lucide-react';
import './index.css';

const navItems = [
  { id: 'hero', label: '00 / ACCUEIL' },
  { id: 'profil', label: '01 / PROFIL' },
  { id: 'parcours', label: '02 / PARCOURS' },
  { id: 'objectif', label: '03 / DESTINATION' },
  { id: 'rennes2', label: '04 / RENNES 2' },
  { id: 'admission', label: '05 / ADMISSION' },
  { id: 'veille', label: '06 / VEILLE' },
  { id: 'strategie', label: '07 / STRATÉGIE' },
  { id: 'portfolio', label: '08 / PREUVES' },
];

const SectionHeader = ({ num, title }) => (
  <motion.h2 
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="section-title"
  >
    {num} — <span>{title}</span>
  </motion.h2>
);

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + window.innerHeight / 2;
      
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
      
      {/* Top Progress Bar */}
      <motion.div 
        style={{ scaleX, transformOrigin: "0%", backgroundColor: "var(--accent-color)", height: "4px", position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }} 
      />

      {/* Side Navigation */}
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
        
        {/* HERO SECTION */}
        <section id="hero">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="hero-subtitle">MATHIS DINTRICH | BUT MMI — CRÉATION NUMÉRIQUE</p>
            <h1 className="hero-title">MISSION :<br/>RENNES 2</h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '2rem 0', lineHeight: 1.6 }}
            >
              « Construire aujourd’hui les compétences qui me permettront de créer demain. »
            </motion.p>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
              onClick={() => document.getElementById('profil')?.scrollIntoView({ behavior: 'smooth' })}
            >
              COMMENCER LA MISSION <ArrowRight size={20} />
            </motion.button>
            
            <div style={{ position: 'absolute', bottom: '2rem', left: '0', display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--accent-color)', fontSize: '0.85rem', letterSpacing: '0.2em' }}>
              <span className="animate-pulse">SCROLL TO EXPLORE</span>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                ↓
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* 01 PROFIL */}
        <section id="profil">
          <SectionHeader num="01" title="QUI SUIS-JE ?" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { icon: PenTool, title: "GRAPHISME" },
              { icon: Zap, title: "MOTION DESIGN" },
              { icon: Layout, title: "UX / UI" },
              { icon: MonitorPlay, title: "AUDIOVISUEL" },
              { icon: Target, title: "COM DIGITALE" }
            ].map((skill, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}
              >
                <skill.icon size={40} color="var(--accent-color)" />
                <h3 style={{ fontSize: '1.2rem', letterSpacing: '0.1em' }}>{skill.title}</h3>
              </motion.div>
            ))}
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontSize: '1.5rem', fontStyle: 'italic', color: 'var(--text-secondary)', borderLeft: '4px solid var(--accent-color)', paddingLeft: '1.5rem' }}
          >
            « Mon parcours en MMI m’a permis de développer une première polyvalence dans la création numérique. »
          </motion.p>
        </section>

        {/* 02 PARCOURS */}
        <section id="parcours">
          <SectionHeader num="02" title="LE PARCOURS" />
          <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '2px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {['BUT MMI', 'CRÉATION NUMÉRIQUE', 'PROJETS', 'EXPÉRIENCES', 'ALTERNANCE', 'MASTER'].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                style={{ position: 'relative' }}
              >
                <div style={{ position: 'absolute', left: '-33px', top: '50%', transform: 'translateY(-50%)', width: '14px', height: '14px', borderRadius: '50%', background: 'var(--bg-color)', border: '2px solid var(--accent-color)' }} />
                <div className="card glass-panel" style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--accent-color)' }}>{step}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 03 OBJECTIF */}
        <section id="objectif">
          <SectionHeader num="03" title="DESTINATION" />
          <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>OBJECTIF PROFESSIONNEL</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Graphiste Card */}
            <motion.div className="card" whileHover={{ scale: 1.02 }}>
              <h2 style={{ fontSize: '3rem', color: 'var(--accent-color)', marginBottom: '1.5rem' }}>GRAPHISTE</h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)' }}>
                {['Identité visuelle', 'Composition', 'Typographie', 'Direction artistique', 'Création numérique'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ChevronRight size={16} color="var(--accent-color)" /> {item}</li>
                ))}
              </ul>
            </motion.div>

            {/* UX Designer Card */}
            <motion.div className="card" whileHover={{ scale: 1.02 }}>
              <h2 style={{ fontSize: '3rem', color: 'var(--accent-color)', marginBottom: '1.5rem' }}>UX DESIGNER</h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)' }}>
                {['Conception d’interfaces', 'Expérience utilisateur', 'Wireframes', 'Prototypage', 'Réflexion sur les usages'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ChevronRight size={16} color="var(--accent-color)" /> {item}</li>
                ))}
              </ul>
            </motion.div>
          </div>
          <p style={{ marginTop: '3rem', fontSize: '1.25rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
            « Je souhaite approfondir ces deux directions avant de définir précisément mon orientation professionnelle. »
          </p>
        </section>

        {/* 04 RENNES 2 */}
        <section id="rennes2">
          <SectionHeader num="04" title="LA DESTINATION" />
          <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--text-primary)', marginBottom: '3rem', textTransform: 'uppercase' }}>
            MASTER CRÉATION NUMÉRIQUE<br/>
            <span style={{ color: 'var(--accent-color)' }}>UNIVERSITÉ RENNES 2</span>
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <motion.div className="card glass-panel" whileHover={{ y: -10 }}>
              <h4 style={{ fontSize: '2rem', marginBottom: '1rem' }}>01 — LE CONTENU</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>« Le contenu du master correspond à mon intérêt pour la création numérique et le croisement entre arts et technologies. »</p>
            </motion.div>
            <motion.div className="card glass-panel" whileHover={{ y: -10 }}>
              <h4 style={{ fontSize: '2rem', marginBottom: '1rem' }}>02 — LA VILLE</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>« Rennes m’intéresse également pour son environnement étudiant et son écosystème numérique et créatif. »</p>
            </motion.div>
          </div>
        </section>

        {/* 05 ADMISSION */}
        <section id="admission">
          <SectionHeader num="05" title="CHECKPOINT : ADMISSION" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
            {['BAC+3', 'EXAMEN DU DOSSIER', 'CURSUS / DIPLÔMES', 'RELEVÉS DE NOTES', 'CV', 'LETTRE DE MOTIVATION'].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckSquare color="var(--accent-color)" size={24} />
                <span style={{ fontWeight: 'bold' }}>{item}</span>
              </motion.div>
            ))}
          </div>
          
          <motion.div className="card" style={{ background: 'rgba(0, 240, 255, 0.05)', borderColor: 'var(--accent-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '2rem', color: 'var(--accent-color)' }}>TRAVAUX / CRÉATIONS</h3>
              <div style={{ color: 'var(--accent-color)', fontSize: '1.5rem', letterSpacing: '0.2rem' }}>★★★★★</div>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              « Ces critères correspondent à mon parcours en MMI et me permettent d’identifier les éléments que je dois particulièrement valoriser.<br/><br/>
              <strong style={{ color: 'var(--text-primary)' }}>Mes projets et mes créations seront importants pour montrer concrètement mes compétences.</strong> »
            </p>
          </motion.div>
        </section>

        {/* 06 VEILLE */}
        <section id="veille">
          <SectionHeader num="06" title="VEILLE : IA × CRÉATION" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {[
                { title: 'FEEDLY', desc: '→ suivre les tendances et actualités' },
                { title: 'GOOGLE ALERTS', desc: '→ recevoir les nouvelles informations' },
                { title: 'LINKEDIN', desc: '→ suivre les professionnels et métiers' }
              ].map((src, i) => (
                <div key={i} className="card" style={{ borderTop: '4px solid var(--accent-color)' }}>
                  <h4 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{src.title}</h4>
                  <p style={{ color: 'var(--text-secondary)' }}>{src.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              {['IA générative et création graphique', 'L’évolution du métier de graphiste', 'IA et conception d’interfaces', 'Nouveaux outils créatifs'].map((tag, i) => (
                <div key={i} style={{ padding: '0.5rem 1rem', background: '#111', border: '1px solid #333', borderRadius: '4px', fontSize: '0.9rem', color: '#ccc' }}>
                  # {tag}
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 07 STRATEGIE - Exploitation */}
        <section id="strategie">
          <SectionHeader num="07" title="DE LA VEILLE À L'ACTION" />
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '800px' }}>
            « Ma veille ne sert pas uniquement à suivre les tendances. Elle doit me permettre d’adapter mon projet professionnel et ma candidature. »
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
            {[
              { theme: 'IA + CRÉATION', action: 'développer mes connaissances' },
              { theme: 'NOUVELLES PRATIQUES', action: 'faire évoluer mes compétences' },
              { theme: 'TENDANCES DESIGN', action: 'améliorer mon portfolio' },
              { theme: 'ÉVOLUTION DES MÉTIERS', action: 'adapter mon projet professionnel' }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                className="card" 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 2rem', flexWrap: 'wrap', gap: '1rem' }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <h4 style={{ fontSize: '1.5rem', margin: 0 }}>{item.theme}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--accent-color)' }}>
                  <ArrowRight />
                  <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{item.action}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 08 PORTFOLIO */}
        <section id="portfolio">
          <SectionHeader num="08" title="LES PREUVES" />
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            {[
              { img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop', title: 'Identité Visuelle', cat: 'GRAPHISME', desc: 'Création d\'une marque fictive, logo et charte graphique.' },
              { img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600&auto=format&fit=crop', title: 'Application Mobile', cat: 'UX/UI', desc: 'Prototypage Figma et parcours utilisateur complet.' },
            ].map((proj, i) => (
              <motion.div key={i} className="card" style={{ padding: '0', overflow: 'hidden' }} whileHover={{ y: -10 }}>
                <img src={proj.img} alt={proj.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderBottom: '1px solid var(--border-color)' }} />
                <div style={{ padding: '1.5rem' }}>
                  <span style={{ color: 'var(--accent-color)', fontSize: '0.8rem', letterSpacing: '0.1em', fontWeight: 'bold' }}>{proj.cat}</span>
                  <h3 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>{proj.title}</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>{proj.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button className="btn-primary">VOIR MON PORTFOLIO <ExternalLink size={18} /></button>
          </div>
        </section>

        {/* FINAL SECTION */}
        <section id="final" style={{ minHeight: '80vh', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ padding: '4rem', background: '#111', border: '1px solid var(--accent-color)', width: '100%' }}
          >
            <h2 style={{ fontSize: '1.5rem', letterSpacing: '0.2em', marginBottom: '2rem', color: 'var(--accent-color)' }}>
              MISSION <span style={{ letterSpacing: '2px' }}>████████████████████</span> 100%
            </h2>
            <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1, marginBottom: '1rem' }}>À SUIVRE...</h1>
            <h3 style={{ fontSize: '2rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>GRAPHISTE / UX DESIGNER</h3>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-primary" style={{ background: 'var(--accent-color)', color: '#000' }}>VOIR MON PORTFOLIO</button>
              <button className="btn-primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>RECOMMENCER LA MISSION</button>
            </div>
          </motion.div>
        </section>

      </main>
    </>
  );
}

export default App;
