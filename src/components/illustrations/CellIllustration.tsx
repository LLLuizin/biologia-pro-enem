'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CellIllustrationProps {
  type: 'animal' | 'vegetal' | 'bacteria'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

interface Organelle {
  id: string
  cx: number
  cy: number
  r?: number
  w?: number
  h?: number
  label: string
  color: string
  strokeOnly?: boolean
}

const sizeClasses = {
  sm: 'w-48 h-48',
  md: 'w-72 h-72',
  lg: 'w-96 h-96',
}

const organelles: Record<string, Organelle[]> = {
  animal: [
    { id: 'nucleus', cx: 50, cy: 50, r: 14, label: 'Núcleo', color: 'argila' },
    { id: 'mitochondria1', cx: 30, cy: 30, r: 5, label: 'Mitocôndria', color: 'terra' },
    { id: 'mitochondria2', cx: 65, cy: 65, r: 4, label: 'Mitocôndria', color: 'terra' },
    { id: 'mitochondria3', cx: 25, cy: 60, r: 5, label: 'Mitocôndria', color: 'terra' },
    { id: 'er', cx: 50, cy: 20, w: 30, h: 8, label: 'Retículo Endoplasmático', color: 'ceu' },
    { id: 'golgi', cx: 70, cy: 35, w: 12, h: 15, label: 'Complexo de Golgi', color: 'flor' },
    { id: 'lysosome1', cx: 35, cy: 70, r: 4, label: 'Lisossomo', color: 'argila' },
    { id: 'lysosome2', cx: 55, cy: 75, r: 3, label: 'Lisossomo', color: 'argila' },
    { id: 'centrioles', cx: 50, cy: 65, r: 3, label: 'Centríolos', color: 'musgo' },
    { id: 'ribosomes', cx: 40, cy: 40, r: 1.5, label: 'Ribossomos', color: 'tinta' },
  ],
  vegetal: [
    { id: 'cellWall', cx: 50, cy: 50, r: 48, label: 'Parede Celular', color: 'musgo', strokeOnly: true },
    { id: 'nucleus', cx: 50, cy: 50, r: 12, label: 'Núcleo', color: 'argila' },
    { id: 'chloroplast1', cx: 28, cy: 32, r: 8, label: 'Cloroplasto', color: 'verde' },
    { id: 'chloroplast2', cx: 68, cy: 32, r: 7, label: 'Cloroplasto', color: 'verde' },
    { id: 'chloroplast3', cx: 25, cy: 65, r: 6, label: 'Cloroplasto', color: 'verde' },
    { id: 'vacuole', cx: 50, cy: 55, r: 22, label: 'Vacúolo Central', color: 'ceu', strokeOnly: true },
    { id: 'mitochondria1', cx: 35, cy: 70, r: 4, label: 'Mitocôndria', color: 'terra' },
    { id: 'mitochondria2', cx: 62, cy: 68, r: 4, label: 'Mitocôndria', color: 'terra' },
    { id: 'er', cx: 50, cy: 18, w: 28, h: 6, label: 'Retículo Endoplasmático', color: 'ceu' },
    { id: 'golgi', cx: 72, cy: 40, w: 10, h: 12, label: 'Complexo de Golgi', color: 'flor' },
  ],
  bacteria: [
    { id: 'cellWall', cx: 50, cy: 50, r: 45, label: 'Parede Celular (Peptidoglicano)', color: 'musgo', strokeOnly: true },
    { id: 'membrane', cx: 50, cy: 50, r: 42, label: 'Membrana Plasmática', color: 'verde' },
    { id: 'nucleoid', cx: 50, cy: 50, r: 18, label: 'Nucleoide (DNA)', color: 'argila' },
    { id: 'ribosome1', cx: 35, cy: 35, r: 2, label: 'Ribossomo 70S', color: 'tinta' },
    { id: 'ribosome2', cx: 60, cy: 40, r: 2, label: 'Ribossomo 70S', color: 'tinta' },
    { id: 'ribosome3', cx: 30, cy: 65, r: 2, label: 'Ribossomo 70S', color: 'tinta' },
    { id: 'ribosome4', cx: 65, cy: 60, r: 2, label: 'Ribossomo 70S', color: 'tinta' },
    { id: 'plasmid', cx: 40, cy: 70, r: 3, label: 'Plasmídeo', color: 'flor' },
    { id: 'flagellum', cx: 50, cy: 95, r: 2, label: 'Flagelo', color: 'ceu' },
    { id: 'pili1', cx: 20, cy: 50, r: 1.5, label: 'Pili', color: 'argila' },
    { id: 'pili2', cx: 80, cy: 50, r: 1.5, label: 'Pili', color: 'argila' },
  ],
}

export function CellIllustration({ type, size = 'md', className }: CellIllustrationProps) {
  const organs = organelles[type]
  const containerSize = sizeClasses[size]

  return (
    <div className={cn('relative flex items-center justify-center', containerSize, className)}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        role="img"
        aria-label={`Célula ${type}`}
      >
        <defs>
          {/* Membrana plasmática gradient */}
          <linearGradient id="membrane-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-verde-400)" />
            <stop offset="100%" stopColor="var(--color-verde-700)" />
          </linearGradient>
          <linearGradient id="cytoplasm-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-papel-50)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--color-verde-50)" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="nucleus-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-argila-100)" />
            <stop offset="100%" stopColor="var(--color-argila-400)" />
          </radialGradient>
          <radialGradient id="chloroplast-gradient" cx="30%" cy="30%" r="60%">
            <stop offset="0%" stopColor="var(--color-verde-300)" />
            <stop offset="100%" stopColor="var(--color-verde-700)" />
          </radialGradient>
          <radialGradient id="mito-gradient" cx="30%" cy="30%" r="60%">
            <stop offset="0%" stopColor="var(--color-terra-200)" />
            <stop offset="100%" stopColor="var(--color-terra-600)" />
          </radialGradient>
          <radialGradient id="vacuole-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-ceu-100)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--color-ceu-400)" stopOpacity="0.3" />
          </radialGradient>
        </defs>

        {/* Citoplasma */}
        <ellipse
          cx="50"
          cy="52"
          rx={type === 'bacteria' ? 40 : 44}
          ry={type === 'bacteria' ? 38 : 42}
          fill="url(#cytoplasm-gradient)"
          className="filter-drop-shadow"
        />

        {/* Parede celular para vegetal e bactéria */}
        {type === 'vegetal' && (
          <ellipse
            cx="50"
            cy="50"
            rx="48"
            ry="46"
            fill="none"
            stroke="var(--color-musgo-500)"
            strokeWidth="2.5"
            strokeDasharray="8 4"
            className="opacity-60"
          />
        )}

        {type === 'bacteria' && (
          <ellipse
            cx="50"
            cy="50"
            rx="45"
            ry="43"
            fill="none"
            stroke="var(--color-musgo-500)"
            strokeWidth="3"
          />
        )}

        {/* Membrana plasmática */}
        <ellipse
          cx="50"
          cy="52"
          rx={type === 'bacteria' ? 40 : 44}
          ry={type === 'bacteria' ? 38 : 42}
          fill="none"
          stroke="url(#membrane-gradient)"
          strokeWidth={type === 'bacteria' ? 2.5 : 2}
          className="filter-drop-shadow"
        />

        {/* Organelas */}
        {organs.map((organ) => {
          const key = organ.id
          const delay = parseInt(key.replace(/\D/g, '')) * 0.05 || 0

          if (organ.r) {
            // Circular organelles
            return (
              <motion.g key={key} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 + delay, duration: 0.4, type: 'spring', stiffness: 200 }}>
                <circle
                  cx={organ.cx}
                  cy={organ.cy}
                  r={organ.r}
                  fill={organ.strokeOnly ? 'none' : `var(--color-${organ.color}-${organ.color === 'tinta' ? '600' : '400'})`}
                  stroke={organ.strokeOnly ? `var(--color-${organ.color}-500)` : 'none'}
                  strokeWidth={organ.strokeOnly ? 2 : 0}
                  strokeDasharray={organ.id === 'vacuole' ? '6 3' : 'none'}
                  className={organ.strokeOnly ? 'opacity-50' : 'filter-drop-shadow'}
                />
                {organ.id === 'nucleus' && (
                  <>
                    <circle cx={organ.cx} cy={organ.cy} r={organ.r * 0.3} fill="var(--color-argila-600)" className="filter-drop-shadow" />
                    <circle cx={organ.cx - 2} cy={organ.cy - 2} r={organ.r * 0.12} fill="var(--color-argila-200)" />
                  </>
                )}
                {organ.id === 'chloroplast1' || organ.id === 'chloroplast2' || organ.id === 'chloroplast3' ? (
                  <g fill="var(--color-verde-600)">
                    <ellipse cx={organ.cx} cy={organ.cy} rx={organ.r * 0.6} ry={organ.r * 0.3} />
                    <ellipse cx={organ.cx} cy={organ.cy + 2} rx={organ.r * 0.6} ry={organ.r * 0.3} />
                    <ellipse cx={organ.cx} cy={organ.cy - 2} rx={organ.r * 0.6} ry={organ.r * 0.3} />
                  </g>
                ) : null}
                {organ.id === 'mitochondria1' || organ.id === 'mitochondria2' || organ.id === 'mitochondria3' ? (
                  <path
                    d={`M${organ.cx - organ.r} ${organ.cy} Q${organ.cx} ${organ.cy - organ.r * 1.2} ${organ.cx + organ.r} ${organ.cy} Q${organ.cx} ${organ.cy + organ.r * 1.2} ${organ.cx - organ.r} ${organ.cy}`}
                    fill="var(--color-terra-400)"
                    stroke="var(--color-terra-600)"
                    strokeWidth="1"
                  />
                ) : null}
                {organ.id === 'golgi' ? (
                  <g>
                    <ellipse cx={organ.cx} cy={organ.cy - 5} rx={organ.w! / 2} ry={organ.h! / 6} fill="var(--color-flor-300)" stroke="var(--color-flor-500)" strokeWidth="1" />
                    <ellipse cx={organ.cx} cy={organ.cy} rx={organ.w! / 2} ry={organ.h! / 6} fill="var(--color-flor-300)" stroke="var(--color-flor-500)" strokeWidth="1" />
                    <ellipse cx={organ.cx} cy={organ.cy + 5} rx={organ.w! / 2} ry={organ.h! / 6} fill="var(--color-flor-300)" stroke="var(--color-flor-500)" strokeWidth="1" />
                    <ellipse cx={organ.cx} cy={organ.cy + 10} rx={organ.w! / 2} ry={organ.h! / 6} fill="var(--color-flor-300}" stroke="var(--color-flor-500)" strokeWidth="1" />
                  </g>
                ) : null}
                {organ.id === 'er' ? (
                  <g stroke="var(--color-ceu-500)" strokeWidth="1.5" fill="none">
                    <path d={`M${organ.cx - organ.w! / 2} ${organ.cy} Q${organ.cx} ${organ.cy - organ.h!} ${organ.cx + organ.w! / 2} ${organ.cy}`} />
                    <path d={`M${organ.cx - organ.w! / 2} ${organ.cy + 3} Q${organ.cx} ${organ.cy - organ.h! + 3} ${organ.cx + organ.w! / 2} ${organ.cy + 3}`} />
                    <path d={`M${organ.cx - organ.w! / 2} ${organ.cy - 3} Q${organ.cx} ${organ.cy - organ.h! - 3} ${organ.cx + organ.w! / 2} ${organ.cy - 3}`} />
                  </g>
                ) : null}
                {organ.id === 'centrioles' ? (
                  <g stroke="var(--color-musgo-500)" strokeWidth="2">
                    <line x1={organ.cx - 4} y1={organ.cy - 4} x2={organ.cx - 4} y2={organ.cy + 4} />
                    <line x1={organ.cx + 4} y1={organ.cy - 4} x2={organ.cx + 4} y2={organ.cy + 4} />
                  </g>
                ) : null}
                {organ.id === 'plasmid' ? (
                  <ellipse cx={organ.cx} cy={organ.cy} rx={organ.r} ry={organ.r * 0.5} fill="none" stroke="var(--color-flor-500)" strokeWidth="1.5" />
                ) : null}
                {organ.id === 'flagellum' ? (
                  <path d={`M${organ.cx} ${organ.cy + 43} Q${organ.cx + 5} ${organ.cy + 45} ${organ.cx} ${organ.cy + 47} Q${organ.cx - 5} ${organ.cy + 45} ${organ.cx} ${organ.cy + 43}`} fill="none" stroke="var(--color-ceu-500)" strokeWidth="2" strokeLinecap="round" />
                ) : null}
                {(organ.id === 'pili1' || organ.id === 'pili2') && (
                  <line
                    x1={organ.id === 'pili1' ? organ.cx + 2 : organ.cx - 2}
                    y1={organ.cy - 5}
                    x2={organ.id === 'pili1' ? organ.cx + 2 : organ.cx - 2}
                    y2={organ.cy + 5}
                    stroke="var(--color-argila-500)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                )}
              </motion.g>
            )
          }

          if (organ.w && organ.h) {
            // Rectangular organelles (Golgi, ER)
            return (
              <motion.g key={key} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 + delay, duration: 0.4, type: 'spring', stiffness: 200 }}>
                {organ.id === 'golgi' ? (
                  <g>
                    <ellipse cx={organ.cx} cy={organ.cy - 5} rx={organ.w / 2} ry={organ.h / 6} fill="var(--color-flor-300)" stroke="var(--color-flor-500)" strokeWidth="1" />
                    <ellipse cx={organ.cx} cy={organ.cy} rx={organ.w / 2} ry={organ.h / 6} fill="var(--color-flor-300)" stroke="var(--color-flor-500)" strokeWidth="1" />
                    <ellipse cx={organ.cx} cy={organ.cy + 5} rx={organ.w / 2} ry={organ.h / 6} fill="var(--color-flor-300}" stroke="var(--color-flor-500)" strokeWidth="1" />
                    <ellipse cx={organ.cx} cy={organ.cy + 10} rx={organ.w / 2} ry={organ.h / 6} fill="var(--color-flor-300}" stroke="var(--color-flor-500)" strokeWidth="1" />
                  </g>
                ) : null}
                {organ.id === 'er' ? (
                  <g stroke="var(--color-ceu-500)" strokeWidth="1.5" fill="none">
                    <path d={`M${organ.cx - organ.w / 2} ${organ.cy} Q${organ.cx} ${organ.cy - organ.h} ${organ.cx + organ.w / 2} ${organ.cy}`} />
                    <path d={`M${organ.cx - organ.w / 2} ${organ.cy + 3} Q${organ.cx} ${organ.cy - organ.h + 3} ${organ.cx + organ.w / 2} ${organ.cy + 3}`} />
                    <path d={`M${organ.cx - organ.w / 2} ${organ.cy - 3} Q${organ.cx} ${organ.cy - organ.h - 3} ${organ.cx + organ.w / 2} ${organ.cy - 3}`} />
                  </g>
                ) : null}
              </motion.g>
            )
          }

          return null
        })}

        {/* Ribossomos livres - pontinhos */}
        {type !== 'bacteria' && (
          <g fill="var(--color-tinta-500)" opacity="0.6">
            {[35, 45, 55, 62, 28, 58, 42, 68, 32, 62].map((x, i) => (
              <motion.circle
                key={`ribo-free-${i}`}
                cx={x}
                cy={[38, 42, 35, 58, 48, 72, 68, 45, 55, 35][i]}
                r="1.2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.03, duration: 0.2 }}
              />
            ))}
          </g>
        )}
      </svg>

      {/* Legenda */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xs px-3 py-2 bg-papel-100/90 backdrop-blur-sm rounded-organic border border-papel-200 text-center text-xs text-tinta-600">
        Célula {type === 'animal' ? 'animal' : type === 'vegetal' ? 'vegetal' : 'procarionte (bactéria)'}
      </div>
    </div>
  )
}