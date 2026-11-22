'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Icon, Button, Card, CardContent, Badge } from '@/components/ui'
import { topics, categories, getAllKeywords } from '@/content/topics'
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

interface SearchResult {
  topic: typeof topics[0]
  matches: string[]
  score: number
}

export default function BuscaPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const allKeywords = getAllKeywords()

  useEffect(() => {
    const saved = localStorage.getItem('biologia-enem-recent-searches')
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved))
      } catch {}
    }
  }, [])

  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsSearching(true)
    setShowSuggestions(false)

    const q = searchQuery.toLowerCase().trim()
    const words = q.split(/\s+/).filter(w => w.length > 1)

    const scored = topics.map(topic => {
      let score = 0
      const matches: string[] = []

      // Title match (highest weight)
      if (topic.title.toLowerCase().includes(q)) {
        score += 100
        matches.push('título')
      }

      // Description match
      if (topic.description.toLowerCase().includes(q)) {
        score += 50
        matches.push('descrição')
      }

      // Keywords match
      topic.keywords.forEach(kw => {
        if (kw.toLowerCase().includes(q)) {
          score += 30
          matches.push(`palavra-chave: ${kw}`)
        }
        words.forEach(w => {
          if (kw.toLowerCase().includes(w)) {
            score += 10
          }
        })
      })

      // Category match
      if (topic.category.toLowerCase().includes(q)) {
        score += 20
        matches.push('categoria')
      }

      return score > 0 ? { topic, matches: [...new Set(matches)], score } : null
    }).filter(Boolean) as SearchResult[]

    scored.sort((a, b) => b.score - a.score)
    setResults(scored)
    setIsSearching(false)

    // Save to recent searches
    setRecentSearches(prev => {
      const updated = [q, ...prev.filter(s => s !== q)].slice(0, 5)
      localStorage.setItem('biologia-enem-recent-searches', JSON.stringify(updated))
      return updated
    })
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      performSearch(query)
    }, 200)
    return () => clearTimeout(timeout)
  }, [query])

  const filteredResults = useMemo(() => {
    return results.filter(r => {
      if (selectedCategory && r.topic.category !== selectedCategory) return false
      if (selectedPriority && r.topic.priority !== selectedPriority) return false
      return true
    })
  }, [results, selectedCategory, selectedPriority])

  const suggestions = useMemo(() => {
    if (!query.trim() || query.length < 2) return []
    const q = query.toLowerCase()
    return allKeywords
      .filter(k => k.toLowerCase().includes(q) && !k.toLowerCase().startsWith(q))
      .slice(0, 5)
  }, [query])

  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion)
    setShowSuggestions(false)
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setSelectedCategory(null)
    setSelectedPriority(null)
    setShowSuggestions(false)
  }

  return (
    <div className="section">
      <div className="container-custom">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="text-display-lg font-display font-semibold text-tinta-900 mb-2">Busca inteligente</h1>
          <p className="text-body text-tinta-600">
            Encontre tópicos, conceitos e palavras-chave instantaneamente. Busca por título, descrição, categoria ou palavras-chave.
          </p>
        </motion.header>

        {/* Search Input */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="relative">
                <div className="relative">
                  <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-tinta-400" size="lg" />
                  <input
                    type="search"
                    value={query}
                    onChange={e => {
                      setQuery(e.target.value)
                      setShowSuggestions(true)
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder="Digite para buscar... (ex: mitose, DNA, fotossíntese, ecologia)"
                    className="w-full pl-12 pr-4 py-4 bg-papel-100 border border-papel-200 rounded-organic-lg text-tinta-900 placeholder-tinta-400 focus:outline-none focus:ring-2 focus:ring-verde-500 focus:border-transparent transition-all text-lg"
                    aria-label="Buscar tópicos"
                    autoFocus
                  />
                  {query && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-tinta-400 hover:text-tinta-600 transition-colors"
                      aria-label="Limpar busca"
                    >
                      <Icon name="x" size="md" />
                    </button>
                  )}
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-papel-50 border border-papel-200 rounded-organic-lg shadow-medium overflow-hidden z-10"
                  >
                    <div className="p-2">
                      <p className="px-3 py-2 text-xs font-medium text-tinta-500 uppercase tracking-wider">Sugestões</p>
                      {suggestions.map(s => (
                        <button
                          key={s}
                          onClick={() => handleSelectSuggestion(s)}
                          className="w-full px-3 py-2 text-left text-body text-tinta-700 hover:bg-papel-200 rounded-organic transition-colors flex items-center gap-2"
                        >
                          <Icon name="sparkles" size="sm" className="text-verde-500" />
                          {s}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Recent Searches */}
                {showSuggestions && !query && recentSearches.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-papel-50 border border-papel-200 rounded-organic-lg shadow-medium overflow-hidden z-10"
                  >
                    <div className="p-2">
                      <div className="flex items-center justify-between px-3 py-2">
                        <p className="text-xs font-medium text-tinta-500 uppercase tracking-wider">Buscas recentes</p>
                        <button
                          onClick={() => {
                            localStorage.removeItem('biologia-enem-recent-searches')
                            setRecentSearches([])
                          }}
                          className="text-xs text-tinta-400 hover:text-tinta-600"
                        >
                          Limpar
                        </button>
                      </div>
                      {recentSearches.map(s => (
                        <button
                          key={s}
                          onClick={() => handleSelectSuggestion(s)}
                          className="w-full px-3 py-2 text-left text-body text-tinta-700 hover:bg-papel-200 rounded-organic transition-colors flex items-center gap-2"
                        >
                          <Icon name="clock" size="sm" className="text-tinta-400" />
                          {s}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Quick Filters */}
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="text-sm font-medium text-tinta-500 self-center">Filtros rápidos:</span>
                {['genética', 'ecologia', 'evolução', 'citologia', 'fisiologia', 'botânica', 'biotecnologia'].map(kw => (
                  <button
                    key={kw}
                    onClick={() => { setQuery(kw); setShowSuggestions(false); }}
                    className="px-3 py-1.5 text-sm bg-papel-100 border border-papel-200 text-tinta-600 rounded-full hover:bg-verde-100 hover:border-verde-300 hover:text-verde-700 transition-all"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Advanced Filters */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <label className="text-sm font-medium text-tinta-700">Categoria:</label>
                  <select
                    value={selectedCategory || ''}
                    onChange={e => setSelectedCategory(e.target.value || null)}
                    className="px-3 py-2 bg-papel-100 border border-papel-200 rounded-organic text-tinta-900 focus:outline-none focus:ring-2 focus:ring-verde-500"
                  >
                    <option value="">Todas</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name} ({cat.count})</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <label className="text-sm font-medium text-tinta-700">Prioridade:</label>
                  <select
                    value={selectedPriority || ''}
                    onChange={e => setSelectedPriority(e.target.value || null)}
                    className="px-3 py-2 bg-papel-100 border border-papel-200 rounded-organic text-tinta-900 focus:outline-none focus:ring-2 focus:ring-verde-500"
                  >
                    <option value="">Todas</option>
                    <option value="alta">Alta</option>
                    <option value="media">Média</option>
                    <option value="baixa">Baixa</option>
                  </select>
                </div>
                {(selectedCategory || selectedPriority) && (
                  <Button variant="ghost" onClick={() => { setSelectedCategory(null); setSelectedPriority(null); }}>
                    <Icon name="x" size="sm" />
                    Limpar filtros
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Results */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-display-md font-display font-semibold text-tinta-900">
                {isSearching ? 'Buscando...' : `${filteredResults.length} resultado${filteredResults.length !== 1 ? 's' : ''}`}
              </h2>
              {query && (
                <Badge variant="verde" className="text-sm">
                  <Icon name="search" size="xs" />
                  "{query}"
                </Badge>
              )}
            </div>
            {filteredResults.length > 0 && (
              <span className="text-body-sm text-tinta-500">
                Ordenado por relevância
              </span>
            )}
          </div>

          {isSearching ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6 h-full">
                    <div className="h-4 bg-papel-200 rounded w-3/4 mb-4" />
                    <div className="h-4 bg-papel-200 rounded w-1/2 mb-2" />
                    <div className="h-4 bg-papel-200 rounded w-5/6 mb-2" />
                    <div className="h-4 bg-papel-200 rounded w-4/5 mb-4" />
                    <div className="flex gap-2">
                      <div className="h-5 bg-papel-200 rounded-full w-16" />
                      <div className="h-5 bg-papel-200 rounded-full w-20" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Resultados da busca">
              {filteredResults.map((result, i) => (
                <motion.article
                  key={result.topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 * i, duration: 0.4 }}
                  role="listitem"
                >
                  <Link href={`/topicos/${result.topic.id}`} className="block h-full">
                    <Card className="h-full overflow-hidden">
                      <CardContent className="p-6 lg:p-8 h-full flex flex-col">
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="flex-1 min-w-0">
                            <Badge
                              variant={getCategoryBadgeVariant(result.topic.category)}
                              className="mb-2"
                            >
                              {result.topic.category.charAt(0).toUpperCase() + result.topic.category.slice(1)}
                            </Badge>
                            <h3 className="text-display-sm font-display font-semibold text-tinta-900 line-clamp-2">
                              {result.topic.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-1 text-argila-600 shrink-0">
                            {result.topic.frequency}
                            <Icon name="star" size="sm" className="fill-current" />
                          </div>
                        </div>

                        <p className="text-body-sm text-tinta-600 mb-4 flex-1 line-clamp-3">{result.topic.description}</p>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {result.topic.keywords.slice(0, 5).map(kw => (
                            <span key={kw} className="px-2 py-0.5 text-xs bg-papel-200 text-tinta-600 rounded-full">{kw}</span>
                          ))}
                          {result.topic.keywords.length > 5 && (
                            <span className="px-2 py-0.5 text-xs bg-papel-200 text-tinta-500 rounded-full">+{result.topic.keywords.length - 5}</span>
                          )}
                        </div>

                        {result.matches.length > 0 && (
                          <div className="mb-4 p-3 bg-verde-50/50 border border-verde-100 rounded-organic">
                            <p className="text-xs font-medium text-verde-800 mb-1 flex items-center gap-1">
                              <Icon name="check" size="xs" />
                              Encontrado em: {result.matches.slice(0, 3).join(', ')}
                              {result.matches.length > 3 && ` +${result.matches.length - 3} mais`}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-papel-200">
                          <div className="flex items-center gap-3 text-sm text-tinta-500">
                            <span className="flex items-center gap-1">
                              <Icon name="clock" size="sm" />
                              {result.topic.estimatedReadTime} min
                            </span>
                            <Badge variant={result.topic.priority === 'alta' ? 'argila' : result.topic.priority === 'media' ? 'verde' : 'ceu'} className="!px-2 !py-0.5 !text-xs">
                              {result.topic.priority.charAt(0).toUpperCase() + result.topic.priority.slice(1)}
                            </Badge>
                          </div>
                          <span className="text-sm font-medium text-verde-700 group-hover:underline flex items-center gap-1">
                            Acessar <Icon name="arrowRight" size="xs" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : query ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Icon name="alert" size="xl" className="text-papel-300 mx-auto mb-4" />
              <h2 className="text-display-sm font-display font-medium text-tinta-700 mb-2">Nenhum resultado encontrado</h2>
              <p className="text-body text-tinta-500 mb-6 max-w-md mx-auto">
                Não encontramos tópicos para "<strong className="text-tinta-700">{query}</strong>". Tente termos mais genéricos ou remova os filtros.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="secondary" onClick={() => setQuery('')}>
                  <Icon name="x" size="sm" />
                  Limpar busca
                </Button>
                <Button variant="ghost" onClick={() => { setSelectedCategory(null); setSelectedPriority(null); }}>
                  <Icon name="filter" size="sm" />
                  Remover filtros
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Icon name="search" size="xl" className="text-papel-300 mx-auto mb-4" />
              <h2 className="text-display-sm font-display font-medium text-tinta-700 mb-2">Comece a buscar</h2>
              <p className="text-body text-tinta-500 mb-6 max-w-md mx-auto">
                Digite acima para encontrar tópicos, conceitos, palavras-chave ou categorias de biologia para o ENEM.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {['genética', 'ecologia', 'mitose', 'DNA', 'fotossíntese', 'evolução'].map(kw => (
                  <Button
                    key={kw}
                    variant="secondary"
                    onClick={() => setQuery(kw)}
                    className="text-sm"
                  >
                    {kw}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.section>
      </div>
    </div>
  )
}