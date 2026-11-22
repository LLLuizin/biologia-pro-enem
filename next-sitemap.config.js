/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://biologiaenem.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ['/server-sitemap.xml', '/api/*', '/_next/*', '/static/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/', '/_next/', '/static/', '/*.json$', '/*.xml$'] },
    ],
    additionalSitemaps: ['https://biologiaenem.com/sitemap.xml'],
  },
  transform: async (config, path) => {
    const priorityMap = {
      '/': 1.0,
      '/topicos': 0.9,
      '/cronograma': 0.8,
      '/busca': 0.7,
    }

    const changeFreqMap = {
      '/': 'weekly',
      '/topicos': 'daily',
      '/cronograma': 'weekly',
      '/busca': 'monthly',
    }

    const topicPaths = [
      'celula-estrutura',
      'divisao-celular',
      'dna-rna-proteina',
      'genetica-mendeliana',
      'evolucao',
      'ecologia',
      'fisiologia-humana',
      'botanica',
      'zoologia',
      'biotecnologia',
    ]

    if (topicPaths.some(t => path.includes(`/topicos/${t}`))) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.85,
        lastmod: new Date().toISOString(),
        alternateRefs: config.alternateRefs ?? [],
      }
    }

    return {
      loc: path,
      changefreq: changeFreqMap[path] || 'monthly',
      priority: priorityMap[path] || 0.5,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    }
  },
}