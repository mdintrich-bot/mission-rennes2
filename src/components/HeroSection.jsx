import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Target, ArrowRight, Eye, Download } from 'lucide-react';
import { clamp, lerp, pinProgress, range } from '../lib/math';
import { onFrame } from '../lib/scroll';

export function HeroSection() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);
  const videoSrc = `${import.meta.env.BASE_URL}hero-video.mp4`;

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
    let smoothTime = 0;

    const applySeek = () => {
      if (!video.seeking && Math.abs(video.currentTime - smoothTime) > 0.008) {
        video.currentTime = smoothTime;
      }
    };

    video.addEventListener('seeked', applySeek);

    const unsubscribe = onFrame(() => {
      const root = rootRef.current;
      if (!root) return;
      const { p, rect, vh } = pinProgress(root);
      if (rect.bottom < -vh || rect.top > vh) return;

      const duration = video.duration;
      if (Number.isFinite(duration) && duration > 0) {
        targetTime = clamp(p, 0, 0.999) * duration;
        smoothTime = lerp(smoothTime, targetTime, 0.25);

        applySeek();
      }

      // 2. Disparition rapide et fluide des textes pour admirer la vidéo en pleine clarté
      if (contentRef.current) {
        const fadeOut = 1 - range(p, 0.02, 0.20);
        contentRef.current.style.opacity = String(fadeOut);
        contentRef.current.style.transform = `translate3d(0, ${-p * 20}vh, 0)`;
        contentRef.current.style.pointerEvents = fadeOut <= 0.02 ? 'none' : 'auto';
      }

      // Atténuation du voile sombre pour une visibilité cristalline de la vidéo
      if (overlayRef.current) {
        const clearVideo = 1 - range(p, 0.02, 0.22) * 0.85;
        const exitDarken = range(p, 0.88, 1.0) * 0.85;
        overlayRef.current.style.opacity = String(Math.min(1, Math.max(0.15, clearVideo + exitDarken)));
      }
    });

    return () => {
      unsubscribe();
      video.removeEventListener('seeked', applySeek);
    };
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

        {/* Voile sombre pour lisibilité initiale, s'éclaircit au scroll */}
        <div ref={overlayRef} className="hero-dark-overlay absolute inset-0" />

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
