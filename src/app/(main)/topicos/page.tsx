'use client'

import { Suspense } from 'react'
import { TopicsPageContent } from './TopicsPageContent'

export default function TopicsPage() {
  return (
    <Suspense fallback={
      <div className="section">
        <div className="container-custom">
          <div className="flex items-center justify-center py-16">
            <div className="animate-pulse text-tinta-400">Carregando...</div>
          </div>
        </div>
      </div>
    }>
      <TopicsPageContent />
    </Suspense>
  )
}