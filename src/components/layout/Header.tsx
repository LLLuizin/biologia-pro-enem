'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import { Icon } from '@/components/ui/Icon'
import { categories } from '@/content/topics'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-papel-50/95 backdrop-blur-md border-b border-papel-200 shadow-soft'
          : 'bg-transparent'
      )}
    >
      <nav className="container-custom" aria-label="Navegação principal">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Biologia ENEM - Início">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-9 h-9 rounded-organic bg-gradient-to-br from-verde-600 to-musgo-700 flex items-center justify-center"
            >
              <Icon name="dna" size="lg" className="text-papel-50" />
            </motion.div>
            <span className="font-display font-semibold text-display-sm text-tinta-900 hidden sm:block">
              Biologia ENEM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {categories.map(cat => (
              <div
                key={cat.id}
                className="relative"
                onMouseEnter={() => setActiveDropdown(cat.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={cn(
                    'flex items-center gap-1.5 px-4 py-2.5 rounded-organic font-medium text-tinta-700 transition-all duration-200',
                    activeDropdown === cat.id
                      ? 'bg-papel-100 text-verde-700'
                      : 'hover:bg-papel-100 hover:text-tinta-900'
                  )}
                  aria-expanded={activeDropdown === cat.id}
                  aria-haspopup="true"
                >
                  <Icon name={cat.icon} size="sm" />
                  {cat.name}
                  <Icon name="chevronDown" size="sm" className="transition-transform" style={{ transform: activeDropdown === cat.id ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </button>

                <AnimatePresence>
                  {activeDropdown === cat.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scaleY: 0.9 }}
                      animate={{ opacity: 1, y: 0, scaleY: 1 }}
                      exit={{ opacity: 0, y: -10, scaleY: 0.9 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute top-full left-0 mt-2 w-56 bg-papel-50 border border-papel-200 rounded-organic-lg shadow-medium py-2 z-50"
                      role="menu"
                    >
                      <Link
                        href={`/topicos?categoria=${cat.id}`}
                        className="block px-4 py-2 text-sm text-tinta-700 hover:bg-papel-100 hover:text-verde-700 transition-colors"
                        role="menuitem"
                        onClick={() => setActiveDropdown(null)}
                      >
                        Ver todos {cat.name}
                      </Link>
                      <hr className="my-2 border-papel-200" />
                      {categories.filter(c => c.id !== cat.id).slice(0, 3).map(other => (
                        <Link
                          key={other.id}
                          href={`/topicos?categoria=${other.id}`}
                          className="block px-4 py-2 text-sm text-tinta-600 hover:bg-papel-100 hover:text-tinta-900 transition-colors"
                          role="menuitem"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {other.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex md:items-center md:gap-3">
            <Link href="/busca" className="btn-ghost text-sm">
              <Icon name="search" size="sm" />
              Buscar
            </Link>
            <Link href="/cronograma" className="btn-primary text-sm">
              Meu Cronograma
              <Icon name="arrowRight" size="sm" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-organic text-tinta-700 hover:bg-papel-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            <Icon name={isMobileMenuOpen ? 'x' : 'menu'} size="lg" />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-papel-200 bg-papel-50 pt-4 pb-6"
            >
              <div className="flex flex-col gap-2">
                {categories.map(cat => (
                  <div key={cat.id} className="border-b border-papel-200 pb-3 last:border-0 last:pb-0">
                    <Link
                      href={`/topicos?categoria=${cat.id}`}
                      className="flex items-center gap-3 px-2 py-2 text-tinta-700 hover:text-verde-700 font-medium transition-colors"
                    >
                      <Icon name={cat.icon} size="md" className="text-verde-600" />
                      {cat.name}
                      <span className="ml-auto text-xs text-tinta-400">{cat.count} tópicos</span>
                    </Link>
                  </div>
                ))}
                <div className="flex flex-col gap-2 pt-4 border-t border-papel-200">
                  <Link href="/busca" className="btn-secondary w-full justify-center">
                    <Icon name="search" size="sm" />
                    Buscar tópicos
                  </Link>
                  <Link href="/cronograma" className="btn-primary w-full justify-center">
                    Meu Cronograma de Estudos
                    <Icon name="arrowRight" size="sm" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}