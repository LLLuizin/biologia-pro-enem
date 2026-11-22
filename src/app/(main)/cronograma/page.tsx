'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Icon, Button, Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui'
import { topics, categories, getHighPriorityTopics } from '@/content/topics'
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

interface StudyPlan {
  topicId: string
  day: number
  completed: boolean
}

const STORAGE_KEY = 'biologia-enem-study-plan'

export default function CronogramaPage() {
  const [studyPlan, setStudyPlan] = useState<StudyPlan[]>([])
  const [daysUntilExam, setDaysUntilExam] = useState(60)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showCompleted, setShowCompleted] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setStudyPlan(JSON.parse(saved))
      } catch {
        setStudyPlan([])
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(studyPlan))
  }, [studyPlan])

  const highPriority = getHighPriorityTopics()
  const topicsToShow = selectedCategory
    ? topics.filter(t => t.category === selectedCategory)
    : highPriority

  const totalTopics = topicsToShow.length
  const completedCount = studyPlan.filter(p => topicsToShow.some(t => t.id === p.topicId) && p.completed).length
  const progress = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0

  const toggleComplete = (topicId: string) => {
    setStudyPlan(prev => {
      const existing = prev.find(p => p.topicId === topicId)
      if (existing) {
        return prev.map(p => p.topicId === topicId ? { ...p, completed: !p.completed } : p)
      }
      return [...prev, { topicId, day: 0, completed: true }]
    })
  }

  const isCompleted = (topicId: string) => {
    return studyPlan.some(p => p.topicId === topicId && p.completed)
  }

  const generatePlan = () => {
    const newPlan: StudyPlan[] = []
    let currentDay = 1

    topicsToShow.forEach((topic, i) => {
      const daysForTopic = Math.max(1, Math.ceil(topic.estimatedReadTime / 30))
      for (let d = 0; d < daysForTopic; d++) {
        if (currentDay + d <= daysUntilExam) {
          newPlan.push({
            topicId: topic.id,
            day: currentDay + d,
            completed: false
          })
        }
      }
      currentDay += daysForTopic + 1 // 1 day buffer
    })

    setStudyPlan(prev => {
      const existingCompleted = prev.filter(p => p.completed)
      return [...newPlan, ...existingCompleted]
    })
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
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-display-lg font-display font-semibold text-tinta-900 mb-2">
                Meu cronograma de estudos
              </h1>
              <p className="text-body text-tinta-600">
                Organize seus estudos por prioridade, acompanhe o progresso e chegue preparado no dia da prova.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" onClick={generatePlan} disabled={studyPlan.length > 0}>
                <Icon name="sparkles" size="sm" />
                Gerar plano automático
              </Button>
              <Button variant="ghost" onClick={() => {
                if (confirm('Tem certeza que quer limpar todo o progresso?')) {
                  setStudyPlan([])
                  localStorage.removeItem(STORAGE_KEY)
                }
              }}>
                <Icon name="x" size="sm" />
                Limpar progresso
              </Button>
            </div>
          </div>

          {/* Progress Overview */}
          <Card>
            <CardContent className="p-6 lg:p-8">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="text-center">
                  <div className="text-display-lg font-display font-bold text-verde-700 mb-1">{progress}%</div>
                  <div className="text-body-sm text-tinta-500">Progresso geral</div>
                  <div className="mt-2 h-2 bg-papel-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-verde-500 to-musgo-600"
                    />
                  </div>
                </div>
                <div className="text-center border-l border-papel-200 pl-6 lg:border-l lg:border-t-0 lg:border-b lg:pl-0 lg:pt-6">
                  <div className="text-display-lg font-display font-bold text-tinta-900 mb-1">{completedCount}</div>
                  <div className="text-body-sm text-tinta-500">Tópicos concluídos</div>
                </div>
                <div className="text-center border-l border-papel-200 pl-6 lg:border-l lg:border-t-0 lg:border-b lg:pl-0 lg:pt-6">
                  <div className="text-display-lg font-display font-bold text-tinta-900 mb-1">{totalTopics - completedCount}</div>
                  <div className="text-body-sm text-tinta-500">Tópicos restantes</div>
                </div>
                <div className="text-center border-l border-papel-200 pl-6 lg:border-l lg:border-t-0 lg:border-b lg:pl-0 lg:pt-6">
                  <div className="text-display-lg font-display font-bold text-tinta-900 mb-1">{daysUntilExam}</div>
                  <div className="text-body-sm text-tinta-500">Dias até o ENEM</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.header>

        {/* Controls */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <label htmlFor="days" className="text-sm font-medium text-tinta-700">Dias até a prova:</label>
                  <input
                    id="days"
                    type="number"
                    min="1"
                    max="365"
                    value={daysUntilExam}
                    onChange={e => setDaysUntilExam(Number(e.target.value))}
                    className="w-24 px-3 py-2 bg-papel-100 border border-papel-200 rounded-organic text-tinta-900 focus:outline-none focus:ring-2 focus:ring-verde-500"
                  />
                </div>
                <div className="flex items-center gap-2 flex-wrap lg:ml-auto">
                  <label className="text-sm font-medium text-tinta-700">Filtrar:</label>
                  <select
                    value={selectedCategory || ''}
                    onChange={e => setSelectedCategory(e.target.value || null)}
                    className="px-3 py-2 bg-papel-100 border border-papel-200 rounded-organic text-tinta-900 focus:outline-none focus:ring-2 focus:ring-verde-500"
                  >
                    <option value="">Todas (prioridade alta)</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name} ({cat.count})</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="show-completed"
                    checked={showCompleted}
                    onChange={e => setShowCompleted(e.target.checked)}
                    className="w-4 h-4 rounded border-papel-300 text-verde-600 focus:ring-verde-500"
                  />
                  <label htmlFor="show-completed" className="text-sm text-tinta-600">Mostrar concluídos</label>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Study Plan */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-display-md font-display font-semibold text-tinta-900">
              {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : 'Tópicos de prioridade alta'}
            </h2>
            {studyPlan.length === 0 && (
              <Button onClick={generatePlan} className="text-sm">
                <Icon name="sparkles" size="sm" />
                Criar meu plano
              </Button>
            )}
          </div>

          {studyPlan.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Icon name="calendar" size="xl" className="text-papel-300 mx-auto mb-4" />
                <h3 className="text-display-sm font-display font-medium text-tinta-700 mb-2">Nenhum cronograma criado</h3>
                <p className="text-body text-tinta-500 mb-6 max-w-md mx-auto">
                  Clique em "Criar meu plano" para gerar automaticamente um cronograma baseado nos dias disponíveis e tempo de leitura de cada tópico.
                </p>
                <Button onClick={generatePlan}>
                  <Icon name="sparkles" size="sm" />
                  Gerar cronograma agora
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3" role="list" aria-label="Cronograma de estudos">
              {studyPlan
                .filter(p => {
                  const topic = topics.find(t => t.id === p.topicId)
                  return topic && (showCompleted || !p.completed)
                })
                .sort((a, b) => a.day - b.day)
                .map((plan, i) => {
                  const topic = topics.find(t => t.id === plan.topicId)
                  if (!topic) return null
                  const completed = isCompleted(topic.id)
                  return (
                    <motion.article
                      key={`${plan.topicId}-${plan.day}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.02 * i, duration: 0.3 }}
                      role="listitem"
                      className={cn(
                        'card-base p-4 flex items-center gap-4 transition-all',
                        completed && 'bg-verde-50/50 border-verde-200'
                      )}
                    >
                      <div className="w-14 h-14 rounded-organic bg-papel-100 flex items-center justify-center shrink-0 group-hover:bg-verde-100 transition-colors">
                        <span className="font-display font-bold text-lg text-tinta-600">{plan.day}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant={getCategoryBadgeVariant(topic.category)}
                            className="text-xs"
                          >
                            {topic.category.charAt(0).toUpperCase() + topic.category.slice(1)}
                          </Badge>
                          <span className="text-caption text-tinta-500">Dia {plan.day}</span>
                        </div>
                        <h3 className={cn('font-medium text-tinta-900', completed && 'line-through text-tinta-400')}>
                          {topic.title}
                        </h3>
                        <p className={cn('text-body-sm', completed && 'text-tinta-400', 'text-tinta-500')}>
                          ~{topic.estimatedReadTime} min de leitura
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          onClick={() => toggleComplete(topic.id)}
                          className={cn(
                            'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                            completed
                              ? 'bg-verde-500 text-papel-50'
                              : 'bg-papel-100 text-tinta-400 hover:bg-verde-100 hover:text-verde-600'
                          )}
                          aria-label={completed ? 'Marcar como não concluído' : 'Marcar como concluído'}
                          aria-pressed={completed}
                        >
                          {completed ? (
                            <Icon name="check" size="md" />
                          ) : (
                            <Icon name="circle" size="md" className="text-papel-300" />
                          )}
                        </button>
                        <Link
                          href={`/topicos/${topic.id}`}
                          className="btn-ghost text-sm px-3 py-1.5"
                        >
                          Estudar
                        </Link>
                      </div>
                    </motion.article>
                  )
                })}
            </div>
          )}

          {studyPlan.length > 0 && (
            <div className="mt-8 text-center">
              <Link href="/topicos" className="btn-secondary">
                <Icon name="book" size="sm" />
                Ver todos os tópicos
              </Link>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  )
}