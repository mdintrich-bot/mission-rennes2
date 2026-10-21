import React, { useEffect, useRef, useState } from 'react';
import { Play, Eye, Download } from 'lucide-react';
import { clamp, pinProgress, range } from '../lib/math';
import { onFrame } from '../lib/scroll';

const CATEGORIES = [
  { id: 'ALL', label: 'TOUS LES TRAVAUX' },
  { id: 'GRAPHISME', label: 'GRAPHISME & AFFICHES' },
  { id: 'STAGES', label: 'STAGES PROFESSIONNELS' },
  { id: 'COMMUNICATION', label: 'STRATÉGIE DE COM' },
  { id: 'PHOTOGRAPHIE', label: 'PHOTOGRAPHIE' },
  { id: 'AUDIOVISUEL', label: 'AUDIOVISUEL & VIDÉO' },
];

export function PortfolioRail({ projects, onSelectProject }) {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);
  const countRef = useRef(null);
  const cardRefs = useRef([]);
  const imgRefs = useRef([]);

  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredProjects =
    selectedCategory === 'ALL'
      ? projects
      : projects.filter(
          (p) =>
            p.category === selectedCategory ||
            (selectedCategory === 'GRAPHISME' && p.category.includes('GRAPHISME'))
        );

  // Synchronisation plein écran sans débordement
  useEffect(() => {
    const updateBleed = () => {
      if (!rootRef.current) return;
      rootRef.current.style.marginLeft = '0px';
      rootRef.current.style.width = '100vw';
      const naturalLeft = rootRef.current.getBoundingClientRect().left;
      rootRef.current.style.marginLeft = `-${naturalLeft}px`;
    };
    updateBleed();
    window.addEventListener('resize', updateBleed);
    return () => window.removeEventListener('resize', updateBleed);
  }, []);

  // Réinitialiser les refs lors d'un changement de filtre
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, filteredProjects.length);
    imgRefs.current = imgRefs.current.slice(0, filteredProjects.length);
  }, [filteredProjects]);

  useEffect(() => {
    return onFrame(() => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track) return;

      const { p, rect, vh } = pinProgress(root);
      if (rect.bottom < 0 || rect.top > vh) return;

      const vw = window.innerWidth;
      const k = range(p, 0.04, 0.96);
      const travel = Math.max(0, track.offsetLeft + track.scrollWidth - vw * 0.94);
      track.style.transform = `translate3d(${-k * travel}px, 0, 0)`;

      let nearest = 0;
      let best = Infinity;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const r = card.getBoundingClientRect();
        const off = (r.left + r.width / 2 - vw * 0.62) / vw; // Focus près du centre
        const a = clamp(Math.abs(off) * 1.6);
        card.style.opacity = String(1 - a * 0.55);
        card.style.transform = `scale(${1 - a * 0.07})`;
        if (imgRefs.current[i]) {
          imgRefs.current[i].style.transform = `translate3d(${off * -60}px, 0, 0) scale(1.15)`;
        }
        if (Math.abs(off) < best) {
          best = Math.abs(off);
          nearest = i;
        }
      });
      if (barRef.current) barRef.current.style.transform = `scaleX(${k})`;
      if (countRef.current)
        countRef.current.textContent = String(nearest + 1).padStart(2, '0');
    });
  }, [filteredProjects]);

  return (
    <section
      ref={rootRef}
      id="portfolio"
      className="relative full-bleed-pinned portfolio-rail-section"
      style={{ height: '340svh', padding: 0 }}
    >
      <div className="sticky top-0 flex h-screen-s overflow-hidden portfolio-rail-sticky">
        {/* Colonne de gauche épinglée */}
        <div className="portfolio-rail-sidebar md:w-[32vw]">
          <div className="portfolio-rail-header">
            <h2 className="section-title">
              10 — <span>LE DOSSIER DE TRAVAUX (BOOK)</span>
            </h2>
            <p className="portfolio-rail-subtitle">
              Sélection de travaux authentiques démontrant la maturité créative, la sensibilité
              visuelle et l'autonomie technique requises pour le Master.
            </p>
          </div>

          {/* Filtres par catégories */}
          <div className="portfolio-rail-filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Compteur dynamique et Barre de progression */}
          <div className="portfolio-rail-indicators">
            <div className="rail-counter-wrapper">
              <span className="rail-counter-label">PROJET</span>
              <div className="rail-counter-display">
                <span ref={countRef} className="rail-counter-current">
                  01
                </span>
                <span className="rail-counter-divider">/</span>
                <span className="rail-counter-total">
                  {String(filteredProjects.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Barre de progression horizontale */}
            <div className="rail-progress-track">
              <div
                ref={barRef}
                className="rail-progress-bar"
                style={{ transform: 'scaleX(0)', transformOrigin: '0% 50%' }}
              />
            </div>
          </div>

          {/* Téléchargement CV */}
          <div className="portfolio-rail-cv">
            <a
              href="./portfolio-images/CV_DINTRICH_MATHIS.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ padding: '0.65rem 1.2rem', fontSize: '0.82rem' }}
            >
              TÉLÉCHARGER LE CV (PDF) <Download size={15} color="var(--accent-color)" />
            </a>
          </div>
        </div>

        {/* Rail horizontal contenant les cartes de projets */}
        <div className="portfolio-rail-track-area">
          <ol ref={trackRef} className="portfolio-rail-track">
            {filteredProjects.map((proj, i) => (
              <li
                key={proj.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="project-card rail-project-card"
                onClick={() => onSelectProject(proj)}
              >
                <div className="img-wrapper">
                  <img
                    ref={(el) => {
                      imgRefs.current[i] = el;
                    }}
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                  />
                  {proj.isVideo && (
                    <div className="rail-video-overlay">
                      <div className="rail-play-button">
                        <Play size={24} color="#050505" fill="#050505" style={{ marginLeft: '3px' }} />
                      </div>
                    </div>
                  )}
                  <div className="rail-card-tag">{proj.tag}</div>
                </div>

                <div className="rail-card-content">
                  <div className="rail-card-meta">
                    <span className="rail-card-category">{proj.category}</span>
                    <span className="rail-card-date">{proj.date}</span>
                  </div>

                  <h3 className="rail-card-title">{proj.title}</h3>

                  <p className="rail-card-desc">{proj.description}</p>

                  <div className="rail-card-footer">
                    <div className="rail-tools-list">
                      {proj.tools.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="rail-tool-pill">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="rail-cta-action">
                      {proj.isVideo ? 'VOIR LA VIDÉO' : 'DÉTAILS'}{' '}
                      {proj.isVideo ? <Play size={14} fill="currentColor" /> : <Eye size={14} />}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
