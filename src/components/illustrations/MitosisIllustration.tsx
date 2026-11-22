'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MitosisIllustrationProps {
  className?: string
  animated?: boolean
  size?: 'sm' | 'md' | 'lg'
  phase?: 'interfase' | 'profase' | 'metaphase' | 'anafase' | 'telofase' | 'all'
}

const phases = [
  { id: 'interfase', name: 'Interfase', desc: 'Célula em atividade normal, DNA duplicado' },
  { id: 'profase', name: 'Prófase', desc: 'Cromossomos condensam, membrana nuclear se rompe' },
  { id: 'metaphase', name: 'Metáfase', desc: 'Cromossomos alinham no plano equatorial' },
  { id: 'anafase', name: 'Anáfase', desc: 'Cromátides-irmãs separam-se para polos opostos' },
  { id: 'telofase', name: 'Telófase', desc: 'Membranas nucleares se reorganizam, citocinese inicia' },
]

const phaseColors = {
  interfase: '#16a34a',
  profase: '#f59e0b',
  metaphase: '#3b82f6',
  anafase: '#ec4899',
  telofase: '#8b5cf6',
}

export function MitosisIllustration({ className, animated = true, size = 'md', phase = 'all' }: MitosisIllustrationProps) {
  const dimension = { sm: 300, md: 450, lg: 600 }[size]
  return (
    <div className={cn('relative', className)} style={{ width: dimension }}>
      <svg viewBox={`0 0 ${dimension} 160`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="softShadow"><feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#14532d" floodOpacity="0.1" /></filter>
        </defs>
        {phase === 'all' && (
          <g stroke="#16a34a" strokeWidth="2" fill="#16a34a" opacity="0.6">
            {[1,2,3,4].map(i => <g key={i} transform={`translate(${50 + i * 90 - 5}, 70)`}><path d="M0 -5 L10 0 L0 5" /><line x1="10" y1="0" x2="80" y2="0" strokeDasharray="6 4" /></g>)}
          </g>
        )}
        { (phase === 'all' ? phases.map(p => p.id) : [phase]).map((p, i) => {
          const color = phaseColors[p as keyof typeof phaseColors]
          const delay = i * 0.15
          const idx = phases.findIndex(ph => ph.id === p)
          return (
            <motion.g key={p} transform={`translate(${50 + idx * 90}, 70)`} initial={{ opacity: 0, scale: 0.8, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay, duration: 0.5, ease: 'easeOut' }} style={{ color }}>
              {p === 'interfase' && <><circle cx="0" cy="0" r="28" fill="#f0fdf4" stroke={color} strokeWidth="2" strokeOpacity="0.6" /><circle cx="0" cy="0" r="22" fill="#dcfce7" fillOpacity="0.5" /><g stroke={color} strokeWidth="1" strokeOpacity="0.4"><path d="M-20 -10 Q-10 -15 0 -10" /><path d="M-15 0 Q-5 -5 5 0" /><path d="M-20 10 Q-10 15 0 10" /><path d="M5 -15 Q15 -10 20 -15" /><path d="M5 5 Q15 10 20 5" /><path d="M5 15 Q15 20 20 15" /></g><circle cx="-8" cy="-8" r="4" fill={color} fillOpacity="0.3" /></>}
              {p === 'profase' && <><g stroke={color} strokeWidth="2.5" fill="none"><path d="M-22 -15 L-18 -15" /><path d="M-20 -17 L-20 -13" /><path d="M10 -15 L14 -15" /><path d="M12 -17 L12 -13" /><path d="M-22 5 L-18 5" /><path d="M-20 3 L-20 7" /><path d="M10 5 L14 5" /><path d="M12 3 L12 7" /><path d="M-8 -20 L-8 -16" /><path d="M-10 -18 L-6 -18" /><path d="M8 16 L8 20" /><path d="M6 18 L10 18" /></g><circle cx="0" cy="0" r="30" stroke={color} strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 4" fill="none" /></>}
              {p === 'metaphase' && <><line x1="-35" y1="0" x2="35" y2="0" stroke={color} strokeWidth="2" strokeOpacity="0.3" strokeDasharray="4 4" /><g stroke={color} strokeWidth="1.5" strokeOpacity="0.5"><line x1="-35" y1="-35" x2="-5" y2="-5" /><line x1="35" y1="-35" x2="5" y2="-5" /><line x1="-35" y1="35" x2="-5" y2="5" /><line x1="35" y1="35" x2="5" y2="5" /></g><g stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"><line x1="-4" y1="-12" x2="-4" y2="12" /><line x1="-2" y1="-14" x2="-2" y2="14" /><line x1="0" y1="-15" x2="0" y2="15" /><line x1="2" y1="-14" x2="2" y2="14" /><line x1="4" y1="-12" x2="4" y2="12" /></g><g fill={color}><circle cx="-4" cy="0" r="1.5" /><circle cx="-2" cy="0" r="1.5" /><circle cx="0" cy="0" r="2" /><circle cx="2" cy="0" r="1.5" /><circle cx="4" cy="0" r="1.5" /></g></>}
              {p === 'anafase' && <><g stroke={color} strokeWidth="1.5" strokeOpacity="0.5"><line x1="-35" y1="-35" x2="-15" y2="-15" /><line x1="35" y1="-35" x2="15" y2="-15" /><line x1="-35" y1="35" x2="-15" y2="15" /><line x1="35" y1="35" x2="15" y2="15" /></g><g stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"><line x1="-18" y1="-10" x2="-18" y2="10" /><line x1="-16" y1="-12" x2="-16" y2="12" /><line x1="16" y1="-12" x2="16" y2="12" /><line x1="18" y1="-10" x2="18" y2="10" /></g><g fill={color}><circle cx="-18" cy="0" r="1.5" /><circle cx="-16" cy="0" r="1.5" /><circle cx="16" cy="0" r="1.5" /><circle cx="18" cy="0" r="1.5" /></g><g stroke={color} strokeWidth="2" fill={color}><path d="M-18 -15 L-23 -20 L-13 -20" /><path d="M18 -15 L23 -20 L13 -20" /></g></>}
              {p === 'telofase' && <><g stroke={color} strokeWidth="2" fill="none" strokeDasharray="6 3"><ellipse cx="-18" cy="0" rx="22" ry="28" /><ellipse cx="18" cy="0" rx="22" ry="28" /></g><g stroke={color} strokeWidth="1.5" fill="none"><ellipse cx="-18" cy="0" rx="14" ry="18" /><ellipse cx="18" cy="0" rx="14" ry="18" /></g><g stroke={color} strokeWidth="1" strokeOpacity="0.5"><g transform="translate(-18, 0)"><path d="M-10 -8 Q-5 -12 0 -8" /><path d="M-8 0 Q-3 -4 2 0" /><path d="M-10 8 Q-5 12 0 8" /></g><g transform="translate(18, 0)"><path d="M-10 -8 Q-5 -12 0 -8" /><path d="M-8 0 Q-3 -4 2 0" /><path d="M-10 8 Q-5 12 0 8" /></g></g><g fill={color} fillOpacity="0.3"><circle cx="-22" cy="-6" r="3" /><circle cx="14" cy="-6" r="3" /></g><line x1="0" y1="-30" x2="0" y2="30" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.7" /></>}
              <text x="0" y="55" textAnchor="middle" fontSize="10" fontWeight="600" fill="#166534" fontFamily="DM Sans, sans-serif" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>{phases.find(ph => ph.id === p)?.name}</text>
            </motion.g>
          )
        })}
      </svg>
      {phase !== 'all' && <motion.div className="mt-4 text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><p className="text-body text-tinta-600 max-w-xs mx-auto">{phases.find(p => p.id === phase)?.desc}</p></motion.div>}
    </div>
  )
}