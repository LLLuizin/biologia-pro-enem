'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Icon, Card, CardContent, Badge } from '@/components/ui'
import { topics, categories } from '@/content/topics'
import { cn } from '@/lib/utils'

function getCategoryBadgeVariant(category: string): 'verde' | 'argila' | 'flor' | 'musgo' | 'terra' | 'ceu' {
  switch (category) {
    case 'celular':
    case 'botanica':
      return 'verde'
    case 'genetica':
    case 'biotecnologia':
      return 'argila'
    case 'evolucao':
      return 'flor'
    case 'ecologia':
      return 'musgo'
    case 'fisiologia':
      return 'terra'
    default:
      return 'ceu'
  }
}

function getFilteredTopics(searchParams: { categoria?: string; prioridade?: string; busca?: string }) {
  let filtered = [...topics]

  if (searchParams.categoria) {
    filtered = filtered.filter(t => t.category === searchParams.categoria)
  }

  if (searchParams.prioridade) {
    filtered = filtered.filter(t => t.priority === searchParams.prioridade)
  }

  if (searchParams.busca) {
    const query = searchParams.busca.toLowerCase()
    filtered = filtered.filter(t =>
      t.title.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      t.keywords.some(k => k.toLowerCase().includes(query))
    )
  }

  return filtered.sort((a, b) => {
    const priorityOrder = { alta: 3, media: 2, baixa: 1 }
    if (priorityOrder[b.priority] !== priorityOrder[a.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    }
    return b.frequency - a.frequency
  })
}

export function TopicsPageContent() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('busca') || '')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('categoria') || '')
  const [activePriority, setActivePriority] = useState(searchParams.get('prioridade') || '')

  const filteredTopics = getFilteredTopics({
    categoria: activeCategory || undefined,
    prioridade: activePriority || undefined,
    busca: searchQuery || undefined,
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="section">
      <div className="container-custom">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-display-lg font-display font-semibold text-tinta-900 mb-2">
                Todos os tópicos
              </h1>
              <p className="text-body text-tinta-600">
                {filteredTopics.length} tópico{filteredTopics.length !== 1 ? 's' : ''} encontrado{filteredTopics.length !== 1 ? 's' : ''}
                {activeCategory && ` na categoria "${categories.find(c => c.id === activeCategory)?.name}"`}
                {activePriority && ` com prioridade "${activePriority}"`}
                {searchQuery && ` para "${searchQuery}"`}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveCategory('')
                  setActivePriority('')
                }}
                className="btn-ghost"
              >
                <Icon name="x" size="sm" />
                Limpar filtros
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="card-base p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start lg:items-center">
              {/* Search */}
              <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
                <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-tinta-400" size="md" />
                <input
                  type="search"
                  placeholder="Buscar tópicos, palavras-chave..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-papel-100 border border-papel-200 rounded-organic text-tinta-900 placeholder-tinta-400 focus:outline-none focus:ring-2 focus:ring-verde-500 focus:border-transparent transition-all"
                  aria-label="Buscar tópicos"
                />
              </form>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory('')}
                  className={cn(
                    'inline-flex items-center gap-1.5 whitespace-nowrap rounded-organic px-4 py-2 text-sm font-medium transition-all',
                    !activeCategory
                      ? 'bg-verde-700 text-papel-50 hover:bg-verde-800'
                      : 'bg-transparent text-verde-700 border-2 border-verde-700 hover:bg-verde-700 hover:text-papel-50'
                  )}
                >
                  <Icon name="tag" size="sm" />
                  Todas ({topics.length})
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      'inline-flex items-center gap-1.5 whitespace-nowrap rounded-organic px-4 py-2 text-sm font-medium transition-all',
                      activeCategory === cat.id
                        ? 'bg-verde-700 text-papel-50 hover:bg-verde-800'
                        : 'bg-transparent text-verde-700 border-2 border-verde-700 hover:bg-verde-700 hover:text-papel-50'
                    )}
                  >
                    <Icon name={cat.icon} size="sm" />
                    {cat.name} ({cat.count})
                  </button>
                ))}
              </div>

              {/* Priority Filter */}
              <div className="flex flex-wrap gap-2 lg:ml-auto">
                {['alta', 'media', 'baixa'].map(p => (
                  <button
                    key={p}
                    onClick={() => setActivePriority(p)}
                    className={cn(
                      'inline-flex items-center gap-1.5 whitespace-nowrap rounded-organic px-4 py-2 text-sm font-medium transition-all',
                      activePriority === p
                        ? 'bg-verde-700 text-papel-50 hover:bg-verde-800'
                        : 'text-tinta-700 hover:bg-papel-200 hover:text-tinta-900'
                    )}
                  >
                    <Badge variant={p === 'alta' ? 'argila' : p === 'media' ? 'verde' : 'ceu'} className="!px-2 !py-1 !text-xs">
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.header>

        {/* Topics Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Lista de tópicos"
        >
          {filteredTopics.map((topic, i) => (
            <motion.article
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.03 * i, duration: 0.4 }}
              role="listitem"
            >
              <Link href={`/topicos/${topic.id}`} className="block h-full">
                <Card className="h-full overflow-hidden">
                  <CardContent className="p-6 lg:p-8 h-full flex flex-col">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex-1 min-w-0">
                        <Badge
                          variant={getCategoryBadgeVariant(topic.category)}
                          className="mb-2"
                        >
                          {topic.category.charAt(0).toUpperCase() + topic.category.slice(1)}
                        </Badge>
                        <h2 className="text-display-sm font-display font-semibold text-tinta-900 line-clamp-2">{topic.title}</h2>
                      </div>
                      <div className="flex items-center gap-1 text-argila-600 shrink-0">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Icon
                            key={i}
                            name={i < topic.frequency ? 'star' : 'starEmpty'}
                            size="sm"
                            className={i < topic.frequency ? 'fill-current text-argila-500' : 'text-papel-300'}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-body-sm text-tinta-600 mb-4 flex-1 line-clamp-3">{topic.description}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {topic.keywords.slice(0, 5).map(kw => (
                        <span key={kw} className="px-2 py-0.5 text-xs bg-papel-200 text-tinta-600 rounded-full">{kw}</span>
                      ))}
                      {topic.keywords.length > 5 && (
                        <span className="px-2 py-0.5 text-xs bg-papel-200 text-tinta-500 rounded-full">+{topic.keywords.length - 5}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-papel-200">
                      <div className="flex items-center gap-3 text-sm text-tinta-500">
                        <span className="flex items-center gap-1">
                          <Icon name="clock" size="sm" />
                          {topic.estimatedReadTime} min
                        </span>
                        <Badge variant={topic.priority === 'alta' ? 'argila' : topic.priority === 'media' ? 'verde' : 'ceu'} className="!px-2 !py-0.5 !text-xs">
                          {topic.priority.charAt(0).toUpperCase() + topic.priority.slice(1)}
                        </Badge>
                      </div>
                      <span className="text-sm font-medium text-verde-700 group-hover:underline flex items-center gap-1">
                        Ler tópico <Icon name="arrowRight" size="xs" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {filteredTopics.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Icon name="alert" size="xl" className="text-papel-300 mx-auto mb-4" />
            <h2 className="text-display-sm font-display font-medium text-tinta-700 mb-2">Nenhum tópico encontrado</h2>
            <p className="text-body text-tinta-500 mb-6">Tente ajustar os filtros ou buscar por outras palavras-chave.</p>
            <Link href="/topicos" className="btn-primary">
              <Icon name="arrowLeft" size="sm" />
              Ver todos os tópicos
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}