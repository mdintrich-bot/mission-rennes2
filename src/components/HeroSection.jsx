import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Target, ArrowRight, Eye, Download } from 'lucide-react';
import { lerp, pinProgress, range } from '../lib/math';
import { onFrame } from '../lib/scroll';

import heroVideoAsset from '../assets/hero-video.mp4';

export function HeroSection() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const videoSrc = heroVideoAsset || `${import.meta.env.BASE_URL}hero-video.mp4`;

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Forcer le premier rendu du frame 0 de la vidéo
    video.pause();
    try {
      video.currentTime = 0.001;
    } catch {
      // ignore
    }

    let targetTime = 0;
    let currentTime = 0;

    return onFrame(() => {
      const root = rootRef.current;
      if (!root || !video.duration) return;
      const { p, rect, vh } = pinProgress(root);
      if (rect.bottom < -vh || rect.top > vh) return;

      // 1. Scrubbing complet et fluide de la vidéo de 0% à 100% de sa durée
      // On atteint 100% de la durée à p = 0.82 pour que la totalité de la vidéo se lise entièrement avant que la section ne sorte
      const videoP = range(p, 0, 0.82);
      targetTime = videoP * video.duration;

      // Interpolation réactive pour rattraper tout scroll rapide sans à-coup
      const dist = Math.abs(targetTime - currentTime);
      const factor = dist > 2 ? 0.35 : 0.22;
      currentTime = lerp(currentTime, targetTime, factor);

      // Verrouillage précis à la fin pour garantir la lecture à 100%
      if (videoP >= 0.98 && Math.abs(video.duration - currentTime) < 0.25) {
        currentTime = video.duration;
      }
      if (videoP <= 0.005) {
        currentTime = 0.001;
      }

      if (Math.abs(video.currentTime - currentTime) > 0.003) {
        video.currentTime = currentTime;
      }

      // 2. Animation douce du contenu existant du Hero au fil du scroll
      if (contentRef.current) {
        const fadeOut = 1 - range(p, 0.72, 0.95);
        contentRef.current.style.opacity = String(fadeOut);
        contentRef.current.style.transform = `translate3d(0, ${-p * 12}vh, 0)`;
      }
    });
  }, []);

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative full-bleed-pinned hero-scroll-section"
      style={{ height: '320svh', padding: 0 }}
    >
      <div className="sticky top-0 h-screen-s overflow-hidden hero-sticky-container">
        {/* Vidéo de fond scrubbée au scroll */}
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 size-full object-cover"
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            v.pause();
            v.currentTime = 0.001;
          }}
        />

        {/* Voile sombre pour lisibilité optimale du texte et ambiance cyber/dark */}
        <div className="hero-dark-overlay absolute inset-0" />

        {/* Contenu textuel et interactif existant */}
        <div className="hero-content-viewport absolute inset-0 flex flex-col justify-center">
          <div
            ref={contentRef}
            className="hero-content-inner"
            style={{ willChange: 'transform, opacity' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.35rem 0.9rem',
                  background: 'rgba(0, 240, 255, 0.08)',
                  border: '1px solid rgba(0, 240, 255, 0.25)',
                  marginBottom: '1rem',
                  borderRadius: '2px',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--accent-color)',
                    boxShadow: '0 0 8px var(--accent-color)',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.8rem',
                    letterSpacing: '0.14em',
                    color: 'var(--accent-color)',
                    fontWeight: 'bold',
                  }}
                >
                  DOSSIER DE CANDIDATURE ACADÉMIQUE & STRATÉGIE PROFESSIONNELLE
                </span>
              </div>

              <p
                className="hero-subtitle"
                style={{
                  fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)',
                  marginBottom: '0.4rem',
                  letterSpacing: '0.04em',
                }}
              >
                MATHIS DINTRICH · BUT MMI NANCY-CHARLEMAGNE · PARCOURS CRÉATION NUMÉRIQUE
              </p>
              <h1
                className="hero-title"
                style={{
                  fontSize: 'clamp(2.4rem, 5.2vw, 4.6rem)',
                  lineHeight: 1.02,
                  marginBottom: '1rem',
                }}
              >
                OBJECTIF :<br />
                <span style={{ color: 'var(--accent-color)' }}>MASTER CRÉATION NUMÉRIQUE</span>
                <br />
                <span style={{ fontSize: '0.55em', opacity: 0.9 }}>UNIVERSITÉ RENNES 2</span>
              </h1>

              {/* Encadré Problématique Centrale */}
              <div
                style={{
                  background: 'rgba(5, 5, 8, 0.85)',
                  borderLeft: '4px solid var(--accent-color)',
                  borderTop: '1px solid rgba(0, 240, 255, 0.2)',
                  borderRight: '1px solid rgba(0, 240, 255, 0.2)',
                  borderBottom: '1px solid rgba(0, 240, 255, 0.2)',
                  padding: '1.2rem 1.5rem',
                  margin: '1.2rem 0',
                  maxWidth: '850px',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--accent-color)',
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    marginBottom: '0.4rem',
                    letterSpacing: '0.12em',
                  }}
                >
                  <Target size={17} /> PROBLÉMATIQUE CENTRALE DU PROJET
                </div>
                <p
                  style={{
                    fontSize: 'clamp(1rem, 1.35vw, 1.15rem)',
                    color: 'var(--text-primary)',
                    lineHeight: 1.55,
                    fontStyle: 'italic',
                  }}
                >
                  « En quoi l’analyse critique des <strong>modalités d’admission</strong> au{' '}
                  <strong>Master Création Numérique (Rennes 2)</strong> structure-t-elle la
                  construction stratégique de mon parcours de formation, de mes choix de stages et
                  de mon <strong>projet professionnel</strong> de futur Directeur Artistique et
                  entrepreneur ? »
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  marginTop: '1.2rem',
                }}
              >
                <button
                  className="btn-primary"
                  onClick={() =>
                    document.getElementById('rennes2')?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  DÉCOUVRIR LE MASTER RENNES 2 <ArrowRight size={18} />
                </button>

                <button
                  className="btn-secondary"
                  onClick={() =>
                    document.getElementById('modalites')?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  MODALITÉS D'ADMISSION <Eye size={18} />
                </button>

                <a
                  href="./portfolio-images/CV_DINTRICH_MATHIS.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{
                    borderColor: 'rgba(0, 240, 255, 0.4)',
                    color: 'var(--text-primary)',
                  }}
                >
                  TÉLÉCHARGER LE CV (PDF) <Download size={18} color="var(--accent-color)" />
                </a>
              </div>

              <div
                style={{
                  marginTop: '2.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  color: 'var(--accent-color)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.2em',
                }}
              >
                <span style={{ opacity: 0.8 }}>DÉCOUVRIR LE DOSSIER D'ADMISSION</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6 }}
                >
                  ↓
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
