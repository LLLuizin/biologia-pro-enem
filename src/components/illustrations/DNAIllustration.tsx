'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface DNAIllustrationProps {
  className?: string
  animated?: boolean
  size?: 'sm' | 'md' | 'lg'
  showLabels?: boolean
}

const sizes = { sm: 180, md: 280, lg: 400 }

export function DNAIllustration({ className, animated = true, size = 'md', showLabels = false }: DNAIllustrationProps) {
  const dimension = sizes[size]
  const pairs = [
    { y: 50, pair: 'AT' }, { y: 90, pair: 'TA' }, { y: 130, pair: 'GC' },
    { y: 170, pair: 'CG' }, { y: 210, pair: 'AT' }, { y: 250, pair: 'TA' }
  ]

  return (
    <div className={cn('relative inline-block', className)} style={{ width: dimension, height: dimension }}>
      <motion.svg viewBox="0 0 300 300" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} style={animated ? { animation: 'rotateSlow 20s linear infinite' } : {}}>
        <defs>
          <linearGradient id="backboneGradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#16a34a" /><stop offset="50%" stopColor="#15803d" /><stop offset="100%" stopColor="#166534" /></linearGradient>
          <radialGradient id="baseGradientA" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#22c55e" stopOpacity="0.9" /><stop offset="100%" stopColor="#16a34a" /></radialGradient>
          <radialGradient id="baseGradientT" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" /><stop offset="100%" stopColor="#1d4ed8" /></radialGradient>
          <radialGradient id="baseGradientG" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" /><stop offset="100%" stopColor="#d97706" /></radialGradient>
          <radialGradient id="baseGradientC" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ec4899" stopOpacity="0.9" /><stop offset="100%" stopColor="#be185d" /></radialGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <path d="M100 30 Q100 50 115 70 Q130 90 115 110 Q100 130 100 150 Q100 170 115 190 Q130 210 115 230 Q100 250 100 270" stroke="url(#backboneGradient)" strokeWidth="4" fill="none" strokeLinecap="round" filter="url(#glow)" />
        <path d="M200 30 Q200 50 185 70 Q170 90 185 110 Q200 130 200 150 Q200 170 185 190 Q170 210 185 230 Q200 250 200 270" stroke="url(#backboneGradient)" strokeWidth="4" fill="none" strokeLinecap="round" filter="url(#glow)" />
        {pairs.map(({ y, pair }, i) => {
          const [b1, b2] = pair.split('')
          const isAT = pair.includes('A') && pair.includes('T')
          const g1 = b1==='A'?'baseGradientA':b1==='T'?'baseGradientT':b1==='G'?'baseGradientG':'baseGradientC'
          const g2 = b2==='A'?'baseGradientA':b2==='T'?'baseGradientT':b2==='G'?'baseGradientG':'baseGradientC'
          return (
            <motion.g key={i} initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.2 + i * 0.1, duration: 0.4, ease: 'easeOut' }} style={animated ? { animation: `float 4s ease-in-out infinite ${i * 0.3}s` } : {}}>
              <g stroke="#78716c" strokeWidth={isAT ? 2 : 3} strokeOpacity="0.6" strokeDasharray="3 2">
                <line x1="115" y1={y} x2="185" y2={y} />
                {!isAT && <line x1="125" y1={y-3} x2="175" y2={y-3} />}
              </g>
              <g transform={`translate(115, ${y})`}><ellipse cx="0" cy="0" rx="22" ry="14" fill={`url(#${g1})`} stroke="#166534" strokeWidth="1.5" /><text x="0" y="4" textAnchor="middle" fontSize="16" fontWeight="700" fill="white" fontFamily="JetBrains Mono, monospace">{b1}</text></g>
              <g transform={`translate(185, ${y})`}><ellipse cx="0" cy="0" rx="22" ry="14" fill={`url(#${g2})`} stroke="#166534" strokeWidth="1.5" /><text x="0" y="4" textAnchor="middle" fontSize="16" fontWeight="700" fill="white" fontFamily="JetBrains Mono, monospace">{b2}</text></g>
              {showLabels && <text x="150" y={y-18} textAnchor="middle" fontSize="10" fill="#78716c" fontFamily="DM Sans, sans-serif" fontWeight="500">{isAT ? '2 ligações H' : '3 ligações H'}</text>}
            </motion.g>
          )
        })}
        <g stroke="#166534" strokeWidth="2" fill="#166534">
          <path d="M90 25 L100 35 L110 25" /><text x="100" y="20" textAnchor="middle" fontSize="11" fontWeight="600" fill="#166534" fontFamily="DM Sans, sans-serif">5'</text>
          <path d="M210 25 L200 35 L190 25" /><text x="200" y="20" textAnchor="middle" fontSize="11" fontWeight="600" fill="#166534" fontFamily="DM Sans, sans-serif">3'</text>
          <path d="M90 275 L100 265 L110 275" transform="rotate(180 100 275)" /><text x="100" y="285" textAnchor="middle" fontSize="11" fontWeight="600" fill="#166534" fontFamily="DM Sans, sans-serif">3'</text>
          <path d="M210 275 L200 265 L190 275" transform="rotate(180 200 275)" /><text x="200" y="285" textAnchor="middle" fontSize="11" fontWeight="600" fill="#166534" fontFamily="DM Sans, sans-serif">5'</text>
        </g>
        {showLabels && (
          <g transform="translate(20, 20)">
            {['A','T','G','C'].map((base, i) => {
              const g = base==='A'?'baseGradientA':base==='T'?'baseGradientT':base==='G'?'baseGradientG':'baseGradientC'
              const n = base==='A'?'Adenina':base==='T'?'Timina':base==='G'?'Guanina':'Citosina'
              const t = base==='A'||base==='G'?'Purina':'Pirimidina'
              return <g key={base} transform={`translate(0, ${i*28})`}><ellipse cx="12" cy="0" rx="12" ry="8" fill={`url(#${g})`} stroke="#166534" strokeWidth="1" /><text x="12" y="3" textAnchor="middle" fontSize="10" fontWeight="700" fill="white" fontFamily="JetBrains Mono, monospace">{base}</text><text x="30" y="3" textAnchor="start" fontSize="10" fill="#166534" fontFamily="DM Sans, sans-serif" fontWeight="500">{n} ({t})</text></g>
            })}
          </g>
        )}
      </motion.svg>
    </div>
  )
}