import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'
import { categories } from '@/content/topics'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-tinta-950 text-papel-200 border-t border-tinta-800">
      <div className="container-custom py-16 lg:py-22">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6" aria-label="Biologia ENEM - Início">
              <div className="w-10 h-10 rounded-organic bg-gradient-to-br from-verde-500 to-musgo-600 flex items-center justify-center">
                <Icon name="dna" size="lg" className="text-papel-50" />
              </div>
              <span className="font-display font-semibold text-display-sm text-papel-50">
                Biologia ENEM
              </span>
            </Link>
            <p className="text-body text-papel-400 max-w-sm mb-6 leading-relaxed">
              O site de biologia mais completo para o ENEM. Conteúdos que caem, explicados do jeito que a vida real funciona. Sem linguagem robótica, com ilustrações que ensinam.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-verde text-xs">Feito por estudantes</span>
              <span className="badge badge-musgo text-xs">Atualizado 2024</span>
              <span className="badge badge-argila text-xs">Foco no ENEM</span>
              <span className="badge badge-ceu text-xs">Gratuito sempre</span>
            </div>
          </div>

          {/* Categorias */}
          <nav aria-label="Categorias de conteúdo">
            <h3 className="font-display font-medium text-lg text-papel-50 mb-4">Conteúdos</h3>
            <ul className="space-y-3">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link
                    href={`/topicos?categoria=${cat.id}`}
                    className="flex items-center gap-2 text-body text-papel-300 hover:text-verde-300 transition-colors group"
                  >
                    <Icon name={cat.icon} size="sm" className="text-verde-400 group-hover:scale-110 transition-transform" />
                    <span>{cat.name}</span>
                    <span className="ml-auto text-caption text-papel-500">{cat.count} tópicos</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Recursos */}
          <nav aria-label="Recursos e ferramentas">
            <h3 className="font-display font-medium text-lg text-papel-50 mb-4">Ferramentas</h3>
            <ul className="space-y-3">
              {[
                { href: '/cronograma', label: 'Cronograma Personalizado', icon: 'clock' },
                { href: '/busca', label: 'Busca Inteligente', icon: 'search' },
                { href: '/simulados', label: 'Questões Comentadas', icon: 'book' },
                { href: '/mapa-mental', label: 'Mapas Mentais', icon: 'sparkles' },
                { href: '/glossario', label: 'Glossário Ilustrado', icon: 'info' },
              ].map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-body text-papel-300 hover:text-verde-300 transition-colors group"
                  >
                    <Icon name={item.icon} size="sm" className="text-verde-400 group-hover:scale-110 transition-transform" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato/Social */}
          <div>
            <h3 className="font-display font-medium text-lg text-papel-50 mb-4">Conecte-se</h3>
            <p className="text-body text-papel-400 mb-6 leading-relaxed">
              Dúvidas, sugestões ou quer contribuir? Somos uma comunidade de estudantes ajudando estudantes.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-organic bg-tinta-800 text-papel-300 hover:bg-tinta-700 hover:text-papel-50 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-organic bg-tinta-800 text-papel-300 hover:bg-tinta-700 hover:text-papel-50 transition-colors"
                aria-label="Discord"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.442.765-.692 1.167a19.276 19.276 0 0 0-5.062 0 12.56 12.56 0 0 0-.667-1.142.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.068.068 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.08.08 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .085-.028 14.09 14.09 0 0 0 1.226-1.994.077.077 0 0 1 .079-.037c.263-.11.548-.187.834-.225a15.17 15.17 0 0 0 2.475 0c.307.047.579.125.845.231a.076.076 0 0 1 .079.037 14.105 14.105 0 0 0 1.226 1.994.077.077 0 0 0 .085.028c1.984-.93 3.86-2.09 5.547-3.421a.077.077 0 0 0 .031-.057c.418-4.503-.398-9.01-1.886-13.569a.061.061 0 0 0-.032-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333 1.005-2.419 2.157-2.419 1.167 0 2.157 1.096 2.157 2.42 0 1.333-.99 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333 1.005-2.419 2.157-2.419 1.167 0 2.157 1.096 2.157 2.42 0 1.333-.99 2.418-2.157 2.418z"/></svg>
              </a>
              <a
                href="mailto:contato@biologiaenem.com"
                className="flex items-center justify-center w-10 h-10 rounded-organic bg-tinta-800 text-papel-300 hover:bg-tinta-700 hover:text-papel-50 transition-colors"
                aria-label="E-mail"
              >
                <Icon name="book" size="lg" />
              </a>
            </div>
            <p className="text-caption text-papel-500">
              Feito com carinho para quem estuda biologia de verdade.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-tinta-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-caption text-papel-500">
            © {currentYear} Biologia ENEM. Conteúdo educacional gratuito.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-caption text-papel-500">
            <Link href="/privacidade" className="hover:text-verde-400 transition-colors">Privacidade</Link>
            <Link href="/termos" className="hover:text-verde-400 transition-colors">Termos de uso</Link>
            <Link href="/acessibilidade" className="hover:text-verde-400 transition-colors">Acessibilidade</Link>
            <Link href="/creditos" className="hover:text-verde-400 transition-colors">Créditos</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}