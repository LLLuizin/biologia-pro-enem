'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Icon, Button, Card, CardContent, Badge } from '@/components/ui'
import { topics, categories, type Topic } from '@/content/topics'
import { TopicIllustration } from '@/components/illustrations/TopicIllustration'

interface TopicContentProps {
  topic: Topic
}

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

export function TopicContent({ topic }: TopicContentProps) {
  const categoryInfo = categories.find(c => c.id === topic.category)

  return (
    <article className="section">
      <div className="container-custom">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
          aria-label="Navegação estrutural"
        >
          <ol className="flex flex-wrap items-center gap-2 text-sm text-tinta-500">
            <li>
              <Link href="/" className="hover:text-verde-700 transition-colors flex items-center gap-1">
                <Icon name="home" size="sm" />
                Início
              </Link>
            </li>
            <li><Icon name="chevronRight" size="sm" /></li>
            <li>
              <Link href="/topicos" className="hover:text-verde-700 transition-colors">Tópicos</Link>
            </li>
            <li><Icon name="chevronRight" size="sm" /></li>
            {categoryInfo && (
              <>
                <li>
                  <Link href={`/topicos?categoria=${topic.category}`} className="hover:text-verde-700 transition-colors">
                    {categoryInfo.name}
                  </Link>
                </li>
                <li><Icon name="chevronRight" size="sm" /></li>
              </>
            )}
            <li className="text-tinta-900 font-medium truncate max-w-[300px]" aria-current="page">
              {topic.title}
            </li>
          </ol>
        </motion.nav>

        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-8">
            <div className="flex-1">
              {categoryInfo && (
                <Badge
                  variant={getCategoryBadgeVariant(topic.category)}
                  className="mb-3"
                >
                  <Icon name={categoryInfo.icon} size="xs" />
                  {categoryInfo.name}
                </Badge>
              )}
              <h1 className="text-display-lg font-display font-semibold text-tinta-900 mb-4 line-clamp-2">
                {topic.title}
              </h1>
              <p className="text-lead text-tinta-600 max-w-2xl">{topic.description}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <div className="flex items-center gap-4 text-tinta-600">
                <div className="flex items-center gap-1">
                  <Icon name="clock" size="sm" />
                  <span className="font-medium">{topic.estimatedReadTime} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="star" size="sm" className="text-argila-500 fill-current" />
                  <span className="font-medium">{topic.frequency}/5</span>
                </div>
              </div>
              <Badge
                variant={topic.priority === 'alta' ? 'argila' : topic.priority === 'media' ? 'verde' : 'ceu'}
                className="text-sm"
              >
                Prioridade {topic.priority.charAt(0).toUpperCase() + topic.priority.slice(1)}
              </Badge>
            </div>
          </div>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2">
            {topic.keywords.map(kw => (
              <span key={kw} className="px-3 py-1 text-sm bg-papel-100 border border-papel-200 text-tinta-700 rounded-full hover:bg-papel-200 transition-colors">
                {kw}
              </span>
            ))}
          </div>
        </motion.header>

        {/* Main Illustration */}
        {topic.illustrations.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <TopicIllustration illustrations={topic.illustrations} />
          </motion.section>
        )}

        {/* Real Life Examples */}
        {topic.realLifeExamples.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-display-md font-display font-semibold text-tinta-900 flex items-center gap-3">
                <span className="w-10 h-10 rounded-organic bg-gradient-to-br from-verde-500 to-musgo-600 flex items-center justify-center">
                  <Icon name="sparkles" size="md" className="text-papel-50" />
                </span>
                Biologia na vida real
              </h2>
              <span className="text-body-sm text-tinta-500">
                {topic.realLifeExamples.length} exemplo{topic.realLifeExamples.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {topic.realLifeExamples.map((example, i) => (
                <motion.article
                  key={example.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 shrink-0 rounded-organic bg-gradient-to-br from-verde-500 to-musgo-600 flex items-center justify-center">
                          <Icon name={example.icon} size="lg" className="text-papel-50" />
                        </div>
                        <div className="flex-1">
                          <Badge
                            variant={
                              example.context === 'saude' ? 'argila' :
                              example.context === 'tecnologia' ? 'ceu' :
                              example.context === 'meio-ambiente' ? 'verde' :
                              example.context === 'alimentacao' ? 'flor' : 'musgo'
                            }
                            className="mb-2 text-xs"
                          >
                            {example.context.charAt(0).toUpperCase() + example.context.slice(1)}
                          </Badge>
                          <h3 className="font-medium text-tinta-900">{example.title}</h3>
                        </div>
                      </div>
                      <p className="text-body-sm text-tinta-600 flex-1">{example.description}</p>
                    </CardContent>
                  </Card>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {/* Study Checklist */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-display-md font-display font-semibold text-tinta-900 mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-organic bg-gradient-to-br from-argila-500 to-terra-600 flex items-center justify-center">
              <Icon name="check" size="md" className="text-papel-50" />
            </span>
            Checklist de estudo
          </h2>

          <Card>
            <CardContent className="p-6">
              <ul className="space-y-3" role="list">
                {topic.keywords.slice(0, 8).map((kw, i) => (
                  <motion.li
                    key={kw}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                    className="flex items-center gap-3 p-3 bg-papel-50 rounded-organic hover:bg-papel-100 transition-colors group"
                  >
                    <div className="w-6 h-6 rounded-full border-2 border-papel-300 flex items-center justify-center group-hover:border-verde-500 group-hover:bg-verde-500 transition-colors">
                      <Icon name="check" size="xs" className="text-verde-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-body text-tinta-700">{kw}</span>
                    <span className="ml-auto text-caption text-tinta-400">Conceito-chave</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-papel-200 flex items-center gap-2 text-sm text-tinta-500">
                <Icon name="info" size="sm" />
                <span>Marque os conceitos que já domina. Foque nos que ficaram em branco.</span>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Navigation to related topics */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-display-md font-display font-semibold text-tinta-900 mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-organic bg-gradient-to-br from-ceu-500 to-flor-600 flex items-center justify-center">
              <Icon name="arrowRight" size="md" className="text-papel-50" />
            </span>
            Continuar estudando
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topics
              .filter(t => t.category === topic.category && t.id !== topic.id)
              .slice(0, 3)
              .map((related, i) => (
                <motion.article
                  key={related.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  <Link href={`/topicos/${related.id}`} className="block h-full">
                    <Card className="h-full">
                      <CardContent className="p-6 h-full flex flex-col">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <Badge
                            variant={getCategoryBadgeVariant(related.category)}
                            className="shrink-0"
                          >
                            {related.category.charAt(0).toUpperCase() + related.category.slice(1)}
                          </Badge>
                          <div className="flex items-center gap-1 text-argila-600">
                            {related.frequency}
                            <Icon name="star" size="xs" className="fill-current" />
                          </div>
                        </div>
                        <h3 className="text-display-sm font-display font-semibold text-tinta-900 mb-2 line-clamp-2">
                          {related.title}
                        </h3>
                        <p className="text-body-sm text-tinta-600 mb-4 flex-1 line-clamp-2">{related.description}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-papel-200">
                          <span className="text-sm font-medium text-verde-700">
                            Ler tópico <Icon name="arrowRight" size="xs" />
                          </span>
                          <span className="text-caption text-tinta-500">{related.estimatedReadTime} min</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.article>
              ))}
          </div>

          <div className="text-center mt-8">
            <Link href={`/topicos?categoria=${topic.category}`} className="btn-secondary">
              Ver todos de {categoryInfo?.name} <Icon name="arrowRight" size="sm" />
            </Link>
          </div>
        </motion.section>
      </div>
    </article>
  )
}