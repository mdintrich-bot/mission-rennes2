import React, { useEffect, useRef, useState } from 'react';
import { clamp, easeOutCubic, pinProgress, range } from '../lib/math';
import { onFrame } from '../lib/scroll';

const SECTION_VH = 380;
const WINDOW = [0.06, 0.92];
const DISTANCE = 650; // Distance réelle Nancy -> Rennes en km

// Positionnement géographique : Nancy à l'Est (droite), Rennes 2 à l'Ouest (gauche)
const NANCY = { cx: 960, cy: 310, r: 54 };
const RENNES = { cx: 240, cy: 290, r: 76 };

const LEGS = [
  // 1. Départ de l'IUT Nancy-Charlemagne
  `M${NANCY.cx} ${NANCY.cy - 92} a92 92 0 1 1 -0.1 0 a92 92 0 0 1 -78 42`,
  // 2. Traversée Est → Ouest (650 km)
  `M${NANCY.cx - 78} ${NANCY.cy - 50} C 700 80, 480 90, ${RENNES.cx + 42} ${RENNES.cy - 102}`,
  // 3. Approche de Rennes
  `M${RENNES.cx + 42} ${RENNES.cy - 102} a110 110 0 1 0 0.1 0.2 a110 110 0 0 0 -42 -10`,
  // 4. Arrivée à l'Université Rennes 2
  `M${RENNES.cx} ${RENNES.cy - 112} Q ${RENNES.cx - 35} ${RENNES.cy - 80} ${RENNES.cx - 24} ${RENNES.cy - 42}`,
];

const LEGS_DATA = [
  {
    step: 'Étape 01 · Nancy',
    title: 'IUT Nancy-Charlemagne',
    body: 'Socle technique et créatif en création numérique, développement web et production multimédia.',
  },
  {
    step: 'Étape 02 · Transition',
    title: 'Cap à l’Ouest',
    body: '650 kilomètres du Grand Est vers la Bretagne pour poursuivre et approfondir ce parcours.',
  },
  {
    step: 'Étape 03 · Approche',
    title: 'Arrivée à Rennes',
    body: 'Transition vers un nouvel écosystème universitaire, culturel et créatif.',
  },
  {
    step: 'Étape 04 · Rennes',
    title: 'Université Rennes 2',
    body: 'Nouvelle étape académique et perfectionnement au sein du campus de Rennes 2.',
  },
];

export function TrajectoryNancyRennes() {
  const rootRef = useRef(null);
  const legRefs = useRef([]);
  const markerRef = useRef(null);
  const kmRef = useRef(null);
  const [leg, setLeg] = useState(0);

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
    let lastP = -1;
    let current = 0;
    return onFrame(() => {
      const root = rootRef.current;
      if (!root) return;
      const { p, rect, vh } = pinProgress(root);
      if (rect.bottom < 0 || rect.top > vh) return;
      if (Math.abs(p - lastP) < 0.00005) return;
      lastP = p;

      const u = range(p, WINDOW[0], WINDOW[1]) * LEGS.length;
      const s = clamp(Math.floor(u), 0, LEGS.length - 1);
      if (s !== current) {
        current = s;
        setLeg(s);
      }
      legRefs.current.forEach((path, i) => {
        if (!path) return;
        const k = easeOutCubic(clamp(u - i));
        path.style.strokeDashoffset = String(1 - k);
        if (i === s && markerRef.current) {
          const pt = path.getPointAtLength(path.getTotalLength() * k);
          markerRef.current.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
        }
      });
      const coast = easeOutCubic(clamp(u - 1));
      if (kmRef.current) {
        kmRef.current.textContent = Math.round(coast * DISTANCE).toLocaleString('fr-FR');
      }
    });
  }, []);

  const current = LEGS_DATA[leg];

  return (
    <section
      ref={rootRef}
      id="trajectoire"
      aria-labelledby="trajectory-title"
      className="relative full-bleed-pinned trajectory-section"
      style={{ height: `${SECTION_VH}svh`, padding: 0 }}
    >
      <div className="sticky top-0 flex h-screen-s flex-col overflow-hidden px-6 pt-16 pb-8 md:px-[6vw] md:pt-20 trajectory-sticky">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between trajectory-top-bar">
          <div>
            <p className="font-mono text-xs tracking-[0.16em] uppercase trajectory-tag">
              Trajectoire
            </p>
            <h2 id="trajectory-title" className="mt-2 max-w-[24ch] text-2xl font-bold md:text-4xl lg:text-5xl trajectory-heading">
              De Nancy à Rennes 2, tracé au fil du scroll.
            </h2>
          </div>
          <p className="font-mono text-xs tracking-[0.16em] uppercase trajectory-counter" aria-live="off">
            Distance parcourue <span ref={kmRef} className="tabular-nums trajectory-km">0</span> km
          </p>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center trajectory-map-wrapper">
          <svg
            viewBox="0 0 1200 600"
            className="h-auto max-h-full w-full trajectory-svg"
            role="img"
            aria-label="Trajectoire reliant l'IUT Nancy-Charlemagne à l'Université Rennes 2."
          >
            <defs>
              <radialGradient id="nancy-glow">
                <stop offset="0" stopColor="#f2e6c9" stopOpacity="0.45" />
                <stop offset="0.7" stopColor="#f2e6c9" stopOpacity="0.12" />
                <stop offset="1" stopColor="#f2e6c9" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="rennes-glow">
                <stop offset="0" stopColor="#00F0FF" stopOpacity="0.5" />
                <stop offset="0.7" stopColor="#00F0FF" stopOpacity="0.15" />
                <stop offset="1" stopColor="#00F0FF" stopOpacity="0" />
              </radialGradient>
              <filter id="cyan-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Points de repère en fond */}
            <g fill="currentColor" opacity="0.3">
              {Array.from({ length: 50 }, (_, i) => (
                <circle
                  key={i}
                  cx={(i * 173) % 1200}
                  cy={(i * 97) % 600}
                  r={i % 7 === 0 ? 1.6 : 0.8}
                  opacity={0.15 + ((i * 37) % 45) / 100}
                />
              ))}
            </g>

            {/* Pôle Est : IUT Nancy-Charlemagne */}
            <circle cx={NANCY.cx} cy={NANCY.cy} r={NANCY.r * 1.6} fill="url(#nancy-glow)" />
            <circle
              cx={NANCY.cx}
              cy={NANCY.cy}
              r={NANCY.r}
              fill="#0b0f18"
              stroke="#f2e6c9"
              strokeOpacity="0.6"
              strokeWidth="1.5"
            />
            <circle cx={NANCY.cx} cy={NANCY.cy} r="6" fill="#f2e6c9" />

            {/* Pôle Ouest : Université Rennes 2 */}
            <circle cx={RENNES.cx} cy={RENNES.cy} r={RENNES.r * 1.5} fill="url(#rennes-glow)" />
            <circle
              cx={RENNES.cx}
              cy={RENNES.cy}
              r={RENNES.r}
              fill="#0b0f18"
              stroke="#00F0FF"
              strokeOpacity="0.8"
              strokeWidth="1.5"
            />
            <circle cx={RENNES.cx} cy={RENNES.cy} r="8" fill="#00F0FF" filter="url(#cyan-glow)" />

            {/* Tracé en pointillés + Tracé actif au scroll */}
            {LEGS.map((d, i) => (
              <path
                key={`g${i}`}
                d={d}
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.15"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />
            ))}
            {LEGS.map((d, i) => (
              <path
                key={i}
                ref={(el) => {
                  if (el) legRefs.current[i] = el;
                }}
                d={d}
                pathLength={1}
                fill="none"
                stroke={i === 0 ? '#f2e6c9' : '#00F0FF'}
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeDasharray="1 1"
                strokeDashoffset="1"
                filter={i >= 1 ? 'url(#cyan-glow)' : undefined}
              />
            ))}

            {/* Curseur mobile */}
            <g ref={markerRef} transform={`translate(${NANCY.cx}, ${NANCY.cy - 92})`}>
              <circle r="14" fill="#00F0FF" opacity="0.35" />
              <circle r="5" fill="#fff" />
            </g>

            {/* Labels des deux campus */}
            <g fontFamily="var(--font-body), monospace" fontSize="12" letterSpacing="2" fill="#9ea3ae">
              <text x={NANCY.cx} y={NANCY.cy + NANCY.r + 38} textAnchor="middle" fill="#f2e6c9" fontWeight="600">
                IUT NANCY-CHARLEMAGNE
              </text>
              <text x={NANCY.cx} y={NANCY.cy + NANCY.r + 58} textAnchor="middle" fontSize="10" opacity="0.7">
                48.68°N · 6.16°E
              </text>

              <text x={RENNES.cx} y={RENNES.cy + RENNES.r + 38} textAnchor="middle" fill="#00F0FF" fontWeight="600">
                UNIVERSITÉ RENNES 2
              </text>
              <text x={RENNES.cx} y={RENNES.cy + RENNES.r + 58} textAnchor="middle" fontSize="10" opacity="0.7">
                48.12°N · 1.70°W
              </text>
            </g>
          </svg>
        </div>

        {/* Détail de l'étape active en bas */}
        <div className="trajectory-bottom-panel grid gap-4 border-t border-white/10 pt-4 md:grid-cols-[auto_1fr_auto] md:items-end md:gap-10">
          <p className="font-mono text-xs tracking-[0.16em] uppercase trajectory-step-badge">
            {current.step} · {leg + 1}/{LEGS_DATA.length}
          </p>
          <div key={leg} className="trajectory-step-info animate-[leg-in_0.6s_cubic-bezier(0.2,0.7,0.1,1)]" aria-live="polite">
            <h3 className="text-lg font-bold tracking-[0.08em] uppercase md:text-xl trajectory-step-title">
              {current.title}
            </h3>
            <p className="mt-1 max-w-[42rem] text-sm opacity-85 md:text-base trajectory-step-body">{current.body}</p>
          </div>
          <div className="flex gap-2 trajectory-step-pills" aria-hidden="true">
            {LEGS_DATA.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-8 rounded-full transition-colors duration-500 ${
                  i <= leg ? 'active-pill' : 'inactive-pill'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
