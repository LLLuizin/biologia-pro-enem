'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Icon, Button, Card, CardContent, Badge } from '@/components/ui'
import { topics, categories, getHighPriorityTopics } from '@/content/topics'

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

const highPriorityTopics = getHighPriorityTopics()

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative section overflow-hidden" aria-labelledby="hero-title">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <Badge variant="verde" className="text-sm mb-4 inline-flex items-center gap-1.5">
                <Icon name="sparkles" size="sm" />
                Atualizado para o ENEM 2027
              </Badge>
            </motion.div>

            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-display-xl font-display font-semibold text-tinta-900 mb-6 text-balance"
            >
              Biologia para o ENEM que <span className="text-gradient">faz sentido</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-lead text-tinta-600 mb-10 max-w-3xl mx-auto text-balance"
            >
              Conteúdos que mais caem, explicados do jeito que a biologia está presente na sua vida. Sem linguagem robótica, com ilustrações que ensinam de verdade.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/topicos?prioridade=alta">
                <Button size="lg" className="w-full sm:w-auto">
                  <Icon name="book" size="sm" />
                  Começar a estudar agora
                </Button>
              </Link>
              <Link href="/cronograma">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  <Icon name="clock" size="sm" />
                  Meu cronograma personalizado
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-tinta-500"
            >
              <div className="flex items-center gap-1.5">
                <Icon name="check" size="sm" className="text-verde-600" />
                <span>100% gratuito</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="check" size="sm" className="text-verde-600" />
                <span>Sem cadastro</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="check" size="sm" className="text-verde-600" />
                <span>Funciona offline</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="check" size="sm" className="text-verde-600" />
                <span>Atualizado 2024</span>
              </div>
            </motion.div>
          </div>

          {/* Decorative floating elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-verde-200/30 to-musgo-200/30 rounded-organic-xl blur-3xl animate-float" style={{ animationDelay: '0s' }} />
            <div className="absolute top-1/3 right-10 w-24 h-24 bg-gradient-to-br from-argila-200/30 to-terra-200/30 rounded-organic-xl blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-br from-flor-200/30 to-argila-200/30 rounded-organic-xl blur-3xl animate-float" style={{ animationDelay: '4s' }} />
            <div className="absolute bottom-10 right-20 w-28 h-28 bg-gradient-to-br from-ceu-200/30 to-verde-200/30 rounded-organic-xl blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-papel-100 border-y border-papel-200 py-8" aria-label="Estatísticas do site">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: topics.length, label: 'Tópicos completos', icon: 'book' },
              { value: categories.length, label: 'Categorias', icon: 'tag' },
              { value: topics.reduce((sum, t) => sum + t.estimatedReadTime, 0), label: 'Horas de conteúdo', icon: 'clock' },
              { value: topics.filter(t => t.priority === 'alta').length, label: 'Prioridade alta', icon: 'star' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Icon name={stat.icon} size="md" className="text-verde-600" />
                  <span className="text-display-md font-display font-bold text-tinta-900">{stat.value}+</span>
                </div>
                <p className="text-body-sm text-tinta-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section" aria-labelledby="how-title">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 id="how-title" className="text-display-md font-display font-semibold text-tinta-900 mb-4">
              Como funciona
            </h2>
            <p className="text-lead text-tinta-600">
              Três pilares para você estudar biologia de forma eficiente e realmente aprender
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: 'flask',
                title: 'Priorizado pelo ENEM',
                description: 'Analisamos 15 anos de provas. Cada tópico tem nota de frequência (1-5). Você estuda o que mais cai primeiro.',
                color: 'verde',
              },
              {
                icon: 'dna',
                title: 'Vida real, não robô',
                description: 'Cada conceito vem com exemplos práticos: por que seu músculo dói após treino, como vacina mRNA funciona, por que queimada na Amazônia seca SP.',
                color: 'argila',
              },
              {
                icon: 'sparkles',
                title: 'Ilustrações que ensinam',
                description: 'SVGs customizados, animados e interativos. Célula, DNA, mitose, teia alimentar, árvore filogenética. Visualização científica acessível.',
                color: 'flor',
              },
            ].map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="card-base p-6 lg:p-8 hover:shadow-strong"
              >
                <div className="w-14 h-14 rounded-organic bg-gradient-to-br from-{item.color}-500 to-{item.color}-600 flex items-center justify-center mb-5">
                  <Icon name={item.icon} size="xl" className="text-papel-50" />
                </div>
                <h3 className="text-display-sm font-display font-semibold text-tinta-900 mb-3">{item.title}</h3>
                <p className="text-body text-tinta-600 leading-relaxed">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* High Priority Topics */}
      <section className="section bg-papel-100" aria-labelledby="topics-title">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <h2 id="topics-title" className="text-display-md font-display font-semibold text-tinta-900 mb-2">
                Comece pelo que mais cai
              </h2>
              <p className="text-body text-tinta-600">
                {highPriorityTopics.length} tópicos de prioridade alta, ordenados por frequência histórica no ENEM
              </p>
            </div>
            <Link href="/topicos?prioridade=alta" className="btn-secondary self-start">
              Ver todos <Icon name="arrowRight" size="sm" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {highPriorityTopics.slice(0, 6).map((topic, i) => (
              <motion.article
                key={topic.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i, duration: 0.5 }}
              >
                <Link href={`/topicos/${topic.id}`} className="block h-full">
                  <Card className="h-full overflow-hidden">
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex-1">
                          <Badge variant={getCategoryBadgeVariant(topic.category)} className="mb-2">
                            {topic.category.charAt(0).toUpperCase() + topic.category.slice(1)}
                          </Badge>
                          <h3 className="text-display-sm font-display font-semibold text-tinta-900 line-clamp-2">{topic.title}</h3>
                        </div>
                        <div className="flex items-center gap-1 text-argila-600 shrink-0">
                          {topic.frequency}
                          <Icon name="star" size="sm" className="fill-current" />
                        </div>
                      </div>

                      <p className="text-body-sm text-tinta-600 mb-4 flex-1 line-clamp-3">{topic.description}</p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {topic.keywords.slice(0, 4).map(kw => (
                          <span key={kw} className="px-2 py-0.5 text-xs bg-papel-200 text-tinta-600 rounded-full">{kw}</span>
                        ))}
                        {topic.keywords.length > 4 && (
                          <span className="px-2 py-0.5 text-xs bg-papel-200 text-tinta-500 rounded-full">+{topic.keywords.length - 4}</span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-papel-200">
                        <div className="flex items-center gap-1.5 text-sm text-tinta-500">
                          <Icon name="clock" size="sm" />
                          <span>{topic.estimatedReadTime} min de leitura</span>
                        </div>
                        <span className="text-sm font-medium text-verde-700 group-hover:underline">
                          Ler tópico <Icon name="arrowRight" size="xs" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="section" aria-labelledby="categories-title">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 id="categories-title" className="text-display-md font-display font-semibold text-tinta-900 mb-4">
              Todas as áreas da biologia
            </h2>
            <p className="text-lead text-tinta-600">
              Navegue por categoria ou use a busca para encontrar exatamente o que precisa
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {categories.map((cat, i) => (
              <motion.article
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
              >
                <Link
                  href={`/topicos?categoria=${cat.id}`}
                  className="card-base p-6 text-center group h-full transition-all duration-300 hover:shadow-strong hover:-translate-y-1"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-organic bg-gradient-to-br from-{cat.color}-500 to-{cat.color}-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <Icon name={cat.icon} size="xl" className="text-papel-50" />
                  </div>
                  <h3 className="font-display font-medium text-lg text-tinta-900 mb-1">{cat.name}</h3>
                  <p className="text-body-sm text-tinta-500 mb-3">{cat.count} tópicos</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-verde-700 group-hover:underline">
                    Explorar <Icon name="arrowRight" size="xs" />
                  </span>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Real Life Examples Preview */}
      <section className="section bg-papel-100" aria-labelledby="reallife-title">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 id="reallife-title" className="text-display-md font-display font-semibold text-tinta-900 mb-4">
              Biologia no seu dia a dia
            </h2>
            <p className="text-lead text-tinta-600">
              Cada tópico traz exemplos práticos conectando o conteúdo do ENEM com a realidade
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { topic: 'Citologia', example: 'Por que seu coração bate sem você mandar? Canais de íons nas células do marcapasso geram impulsos elétricos rítmicos.', icon: 'heart', category: 'saude' },
              { topic: 'Genética', example: 'Vacina mRNA: suas células leem o mRNA injetado e produzem a proteína Spike. Sistema imune aprende sem vírus vivo.', icon: 'flask', category: 'tecnologia' },
              { topic: 'Ecologia', example: 'Queimada na Amazônia → menos evapotranspiração → menos "rios voadores" → seca nos reservatórios de SP. Floresta em pé = água na torneira.', icon: 'droplet', category: 'meio-ambiente' },
              { topic: 'Evolução', example: 'Bactérias resistentes: antibiótico mata 99.9%. O 0.1% com mutação aleatória sobrevive e se multiplica. Em dias, população toda é resistente.', icon: 'bacteria', category: 'saude' },
              { topic: 'Fisiologia', example: 'Diabetes tipo 2: fechaduras (receptores de insulina) emperradas. Exercício abre portas independentes de insulina. Movimento é remédio.', icon: 'zap', category: 'cotidiano' },
              { topic: 'Botânica', example: 'Banana madura libera etileno (hormônio gasoso) que acelera maturação de frutas climactéricas por perto. Guarde separadas.', icon: 'flower', category: 'cotidiano' },
            ].map((item, i) => (
              <motion.article
                key={item.topic}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i, duration: 0.5 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 shrink-0 rounded-organic bg-gradient-to-br from-verde-500 to-musgo-600 flex items-center justify-center">
                        <Icon name={item.icon} size="lg" className="text-papel-50" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Badge variant={item.category === 'saude' ? 'argila' : item.category === 'tecnologia' ? 'ceu' : item.category === 'meio-ambiente' ? 'verde' : 'musgo'} className="mb-2 text-xs">
                          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </Badge>
                        <p className="font-medium text-tinta-900 mb-1">{item.topic}</p>
                        <p className="text-body-sm text-tinta-600">{item.example}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/topicos" className="btn-secondary">
              Ver todos os exemplos práticos
              <Icon name="arrowRight" size="sm" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" aria-labelledby="cta-title">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center p-8 lg:p-12 rounded-organic-xl bg-gradient-to-br from-verde-600 via-musgo-700 to-argila-800 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.05%22/%3E%3C/svg%3E')]" aria-hidden="true" />
            <div className="relative">
              <Icon name="seedling" size="xl" className="text-papel-50/30 mx-auto mb-6" />
              <h2 id="cta-title" className="text-display-md font-display font-semibold text-papel-50 mb-4">
                Pronto para começar?
              </h2>
              <p className="text-lead text-papel-300 mb-8 max-w-xl mx-auto">
                Escolha um tópico de prioridade alta, monte seu cronograma ou explore por categoria. O importante é começar hoje.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/topicos?prioridade=alta" className="btn-primary bg-papel-50 text-verde-900 hover:bg-papel-100 w-full sm:w-auto">
                  <Icon name="book" size="sm" />
                  Estudar o que mais cai
                </Link>
                <Link href="/cronograma" className="btn-secondary border-papel-300 text-papel-50 hover:bg-papel-50 w-full sm:w-auto">
                  <Icon name="clock" size="sm" />
                  Meu cronograma
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}