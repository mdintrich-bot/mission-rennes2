import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Target, ArrowRight, Eye, Download } from 'lucide-react';
import { clamp, pinProgress, range } from '../lib/math';
import { onFrame } from '../lib/scroll';

const TOTAL_FRAMES = 150;

export function HeroSection() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);

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
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // 1. Préchargement des frames WebP en RAM
    const baseUrl = import.meta.env.BASE_URL || '/';
    const images = new Array(TOTAL_FRAMES);
    let lastDrawnProgress = -1;

    const drawFrame = (progress) => {
      const exactFrame = clamp(progress, 0, 1) * (TOTAL_FRAMES - 1);
      const indexA = Math.floor(exactFrame);
      const indexB = Math.min(TOTAL_FRAMES - 1, indexA + 1);
      const blend = exactFrame - indexA; // Sous-frame entre 0 et 1

      const imgA = images[indexA];
      if (!imgA || !imgA.complete || imgA.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = imgA.naturalWidth;
      const ih = imgA.naturalHeight;

      // Calcul du ratio "object-cover"
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) * 0.5;
      const dy = (ch - dh) * 0.5;

      ctx.globalAlpha = 1;
      ctx.drawImage(imgA, dx, dy, dw, dh);

      // Interpolation inter-frame (fondu entre l'image actuelle et la suivante pour un ralenti ultra-lisse)
      const imgB = images[indexB];
      if (blend > 0.01 && indexB !== indexA && imgB && imgB.complete && imgB.naturalWidth > 0) {
        ctx.globalAlpha = blend;
        ctx.drawImage(imgB, dx, dy, dw, dh);
        ctx.globalAlpha = 1;
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = String(i + 1).padStart(4, '0');
      img.decoding = 'async';
      img.src = `${baseUrl}hero-frames/frame_${num}.webp`;
      if (i === 0) {
        img.onload = () => drawFrame(0);
      }
      images[i] = img;
    }

    // 2. Redimensionnement Retina / DPR du Canvas
    const syncSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      lastDrawnProgress = -1;
      const { p } = pinProgress(root);
      drawFrame(p);
    };
    syncSize();
    const ro = new ResizeObserver(syncSize);
    ro.observe(canvas);

    // 3. Synchronisation directe 1:1 avec Lenis dans la boucle rAF (zéro lag, zéro seeking)
    const unsubscribe = onFrame(() => {
      const { p, rect } = pinProgress(root);
      if (rect.bottom < 0) return;

      if (Math.abs(p - lastDrawnProgress) > 0.0001) {
        lastDrawnProgress = p;
        drawFrame(p);
      }

      if (contentRef.current) {
        const fadeOut = 1 - range(p, 0.8, 0.98);
        contentRef.current.style.opacity = String(fadeOut);
        contentRef.current.style.transform = `translate3d(0, ${-p * 8}vh, 0)`;
        contentRef.current.style.pointerEvents = fadeOut <= 0.02 ? 'none' : 'auto';
      }

      if (overlayRef.current) {
        const exitDarken = range(p, 0.82, 1.0) * 0.45;
        overlayRef.current.style.opacity = String(Math.min(0.95, 0.5 + exitDarken));
      }
    });

    return () => {
      ro.disconnect();
      unsubscribe();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative full-bleed-pinned hero-scroll-section"
      style={{ height: '500svh', padding: 0 }}
    >
      <div className="sticky top-0 h-screen-s overflow-hidden hero-sticky-container">
        {/* Canvas Image-Sequence haute performance */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full"
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
