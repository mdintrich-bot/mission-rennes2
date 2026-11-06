import React, { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const canvasRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const isHoveredRef = useRef(false);
  const isClickingRef = useRef(false);

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    isClickingRef.current = isClicking;
  }, [isClicking]);

  useEffect(() => {
    // Désactiver sur les terminaux tactiles / mobiles
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let ringRot = 0;
    let targetRot = 0;
    let animId;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Buffer de points pour la traînée lumineuse
    const trailPoints = [];
    const MAX_TRAIL = 20;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      setIsVisible(true);

      // Point central direct (zéro latence)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      trailPoints.unshift({
        x: mouseX,
        y: mouseY,
        time: performance.now(),
      });

      if (trailPoints.length > MAX_TRAIL) {
        trailPoints.pop();
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => {
      setIsVisible(false);
      trailPoints.length = 0;
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Détection des zones interactives
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      const isInteractive = Boolean(
        target.closest(
          'a, button, [role="button"], input, textarea, select, .nav-dot, .card, .criteria-card, .rail-project-card, .btn-primary, .btn-secondary, [data-cursor-hover]'
        )
      );
      setIsHovered(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    // Boucle d'animation fluide
    const render = () => {
      const now = performance.now();

      // 1. Déplacement lissé (lerp) de l'anneau extérieur
      const lerpFactor = 0.2;
      ringX += (mouseX - ringX) * lerpFactor;
      ringY += (mouseY - ringY) * lerpFactor;

      targetRot = isHoveredRef.current ? 45 : 0;
      ringRot += (targetRot - ringRot) * 0.15;

      const scale = isClickingRef.current ? 0.75 : isHoveredRef.current ? 1.4 : 1;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) rotate(${ringRot}deg) scale(${scale})`;
      }

      // 2. Tracé de la traînée de lumière sur le canvas
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Suppression des points expirés (durée de vie 280ms)
      const maxAge = 280;
      for (let i = trailPoints.length - 1; i >= 0; i--) {
        if (now - trailPoints[i].time > maxAge) {
          trailPoints.splice(i, 1);
        }
      }

      if (trailPoints.length > 2) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 0; i < trailPoints.length - 1; i++) {
          const p1 = trailPoints[i];
          const p2 = trailPoints[i + 1];

          const ageRatio = (now - p1.time) / maxAge;
          const life = Math.max(0, 1 - ageRatio);
          const factor = 1 - i / trailPoints.length;

          const strokeWidth = factor * (isHoveredRef.current ? 5.5 : 4);
          const alpha = life * factor * 0.75;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = Math.max(0.5, strokeWidth);
          ctx.shadowColor = '#00F0FF';
          ctx.shadowBlur = 10 * factor;

          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();

          // Étincelles le long de la comète
          if (i % 3 === 0 && factor > 0.25) {
            ctx.beginPath();
            ctx.fillStyle = `rgba(0, 240, 255, ${alpha * 0.85})`;
            ctx.arc(p1.x, p1.y, Math.max(0.8, factor * 2), 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      className={`cyber-cursor-wrapper ${isVisible ? 'visible' : ''}`}
      aria-hidden="true"
    >
      {/* Canvas haute performance pour la traînée néon */}
      <canvas
        ref={canvasRef}
        className="cyber-cursor-canvas"
      />

      {/* Anneau suiveur avec réticule DA / Cyber */}
      <div
        ref={ringRef}
        className={`cyber-cursor-ring ${isHovered ? 'hover' : ''} ${isClicking ? 'clicking' : ''}`}
      >
        <span className="cursor-reticle-top" />
        <span className="cursor-reticle-right" />
        <span className="cursor-reticle-bottom" />
        <span className="cursor-reticle-left" />
      </div>

      {/* Point central haute précision */}
      <div
        ref={dotRef}
        className={`cyber-cursor-dot ${isHovered ? 'hover' : ''} ${isClicking ? 'clicking' : ''}`}
      />
    </div>
  );
}