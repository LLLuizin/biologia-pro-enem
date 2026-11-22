import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  preload: true,
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://biologiaenem.com'),
  title: {
    default: 'Biologia ENEM - Conteúdos que caem, explicados para a vida real',
    template: '%s | Biologia ENEM',
  },
  description: 'O site de biologia mais completo para o ENEM. Tópicos por frequência histórica, explicações profundas mas acessíveis, exemplos do cotidiano, ilustrações customizadas. Feito por estudantes, para estudantes.',
  keywords: ['biologia', 'ENEM', 'vestibular', 'estudo', 'genética', 'ecologia', 'evolução', 'fisiologia', 'citologia', 'botânica', 'zoologia'],
  authors: [{ name: 'Comunidade Biologia ENEM' }],
  creator: 'Biologia ENEM',
  publisher: 'Biologia ENEM',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://biologiaenem.com',
    siteName: 'Biologia ENEM',
    title: 'Biologia ENEM - Conteúdos que caem, explicados para a vida real',
    description: 'Estude biologia para o ENEM com conteúdos priorizados por frequência, exemplos da vida real e ilustrações que ensinam.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Biologia ENEM - Site de estudos para o ENEM',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biologia ENEM',
    description: 'Conteúdos que caem no ENEM, explicados para a vida real.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf5' },
    { media: '(prefers-color-scheme: dark)', color: '#24221e' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen flex flex-col bg-papel-50 text-tinta-900 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 btn-primary"
        >
          Pular para o conteúdo principal
        </a>
        <Header />
        <main id="main-content" className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}