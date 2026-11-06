import React, { useEffect, useRef } from 'react';

export function BackgroundAtmosphere() {
  const containerRef = useRef(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let animId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Inertie douce pour le spotlight interactif
    const update = () => {
      currentX += (mouseX - currentX) * 0.07;
      currentY += (mouseY - currentY) * 0.07;

      if (containerRef.current) {
        containerRef.current.style.setProperty('--mouse-x', `${currentX}px`);
        containerRef.current.style.setProperty('--mouse-y', `${currentY}px`);
      }
      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-atmosphere" aria-hidden="true">
      {/* 1. Spotlight interactif suivant délicatement la souris */}
      <div className="bg-spotlight" />

      {/* 2. Grandes nébuleuses atmosphériques animées en perpétuelle dérive */}
      <div className="bg-nebula bg-nebula-cyan" />
      <div className="bg-nebula bg-nebula-indigo" />
      <div className="bg-nebula bg-nebula-emerald" />

      {/* 3. Grille technique avec repères et intersections cyan */}
      <div className="bg-tech-grid" />

      {/* 4. Vignettage périphérique focalisant la lecture au centre */}
      <div className="bg-vignette" />

      {/* 5. Texture de grain cinéma anti-banding */}
      <div className="bg-noise" />
    </div>
  );
}