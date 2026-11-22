'use client'

import { CellIllustration, DNAIllustration, MitosisIllustration } from '@/components/illustrations'

interface TopicIllustrationProps {
  illustrations: string[]
}

export function TopicIllustration({ illustrations }: TopicIllustrationProps) {
  const getIllustrationComponent = (name: string) => {
    switch (name) {
      case 'cell-animal':
        return <CellIllustration type="animal" size="lg" />
      case 'cell-vegetal':
        return <CellIllustration type="vegetal" size="lg" />
      case 'cell-bacteria':
        return <CellIllustration type="bacteria" size="lg" />
      case 'dna-structure':
        return <DNAIllustration size="lg" showLabels />
      case 'mitosis-all':
        return <MitosisIllustration size="lg" phase="all" />
      default:
        return <CellIllustration type="animal" size="lg" />
    }
  }

  if (illustrations.length === 0) return null

  return (
    <section className="mb-12">
      <div className="card-base p-6 lg:p-8 text-center">
        <h2 className="text-display-sm font-display font-semibold text-tinta-900 mb-6">
          Visualização interativa
        </h2>
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-full max-w-2xl mx-auto">
            {illustrations.map((ill, i) => (
              <div key={ill} className={i === 0 ? 'block' : 'hidden'}>
                {getIllustrationComponent(ill)}
              </div>
            ))}
          </div>
          {illustrations.length > 1 && (
            <div className="flex gap-2" role="tablist" aria-label="Ilustrações">
              {illustrations.map((ill, i) => (
                <button
                  key={ill}
                  role="tab"
                  aria-selected={i === 0}
                  aria-label={ill.replace(/-/g, ' ')}
                  className={`px-4 py-1.5 text-sm font-medium rounded-organic transition-all ${
                    i === 0
                      ? 'bg-verde-600 text-papel-50'
                      : 'bg-papel-200 text-tinta-600 hover:bg-papel-300'
                  }`}
                >
                  {ill.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}