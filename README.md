# 🧬 Biologia ENEM

> **Conteúdos que caem, explicados para a vida real**

O site de biologia mais completo para o ENEM. Tópicos priorizados por frequência histórica (2010-2024), explicações profundas mas acessíveis, exemplos práticos do cotidiano e ilustrações customizadas que ensinam de verdade.

## ✨ Destaques

- 🎯 **Priorizado pelo ENEM** — Análise de 15 anos de provas. Cada tópico tem nota de frequência (1-5). Você estuda o que mais cai primeiro.
- 🌱 **Vida real, não robô** — Cada conceito vem com exemplos práticos: por que seu músculo dói após treino, como vacina mRNA funciona, por que queimada na Amazônia seca SP.
- 🎨 **Ilustrações que ensinam** — SVGs customizados, animados e interativos. Célula, DNA, mitose, teia alimentar, árvore filogenética. Visualização científica acessível.
- 📅 **Cronograma inteligente** — Gere seu plano de estudos automático baseado nos dias disponíveis e tempo de leitura.
- 🔍 **Busca instantânea** — Encontre tópicos, conceitos e palavras-chave em tempo real.
- 📱 **PWA Ready** — Funciona offline, instalável no celular, notificações de estudo.
- ♿ **Acessível** — WCAG 2.1 AA, modo escuro, navegação por teclado, leitores de tela.

## 🚀 Stack Tecnológica

| Camada | Tecnologia |
|--------|------------|
| **Framework** | Next.js 14 (App Router, RSC) |
| **Linguagem** | TypeScript (strict mode) |
| **Estilização** | Tailwind CSS + Design System customizado |
| **Animações** | Framer Motion |
| **Ícones** | Lucide React + SVGs customizados |
| **Conteúdo** | MDX (next-mdx-remote) + Zod schemas |
| **Qualidade** | ESLint + Prettier + Husky |
| **Deploy** | Vercel (otimizado para Edge) |

## 📁 Estrutura do Projeto

```
biologia-enem/
├── public/                 # Assets estáticos
│   ├── icon.svg           # Favicon SVG
│   ├── manifest.json      # PWA Manifest
│   └── robots.txt         # SEO
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── (main)/        # Route group principal
│   │   │   ├── topicos/   # Páginas de tópicos
│   │   │   │   ├── [slug]/      # Página individual do tópico
│   │   │   │   └── page.tsx     # Lista de tópicos com filtros
│   │   │   ├── cronograma/      # Plano de estudos
│   │   │   └── busca/           # Busca inteligente
│   │   ├── globals.css    # Estilos globais + design tokens
│   │   └── layout.tsx     # Layout raiz
│   ├── components/
│   │   ├── ui/            # Componentes base (Button, Card, Badge, Icon...)
│   │   ├── layout/        # Header, Footer, Sidebar...
│   │   ├── illustrations/ # Ilustrações SVG customizadas (Cell, DNA, Mitosis...)
│   │   ├── content/       # Componentes de conteúdo (TopicCard, RealLifeExample...)
│   │   └── visualizations/# Gráficos e visualizações de dados
│   ├── content/
│   │   └── topics.ts      # Dados dos tópicos (frequência, exemplos, ilustrações)
│   └── lib/
│       ├── utils.ts       # Helpers (cn, slugify, readingTime...)
│       └── schemas.ts     # Schemas Zod para validação
├── .github/workflows/     # CI/CD
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🎨 Design System

### Paleta de Cores (Inspirada na Natureza)

| Nome | Uso | Hex Principal |
|------|-----|---------------|
| **Verde** | Primária, sucesso, vida | `#16a34a` |
| **Musgo** | Secundária, ecologia | `#618055` |
| **Terra** | Acento, fisiologia | `#a16d42` |
| **Argila** | Acento, genética | `#cc7a3d` |
| **Flor** | Destaque, evolução | `#ec4899` |
| **Céu** | Informativo, zoologia | `#3b82f6` |
| **Papel** | Background, neutro quente | `#fafaf5` |
| **Tinta** | Texto, alto contraste | `#423f38` |

### Tipografia

- **Display**: Fraunces (serif variável, elegante)
- **Body**: DM Sans (sans-serif legível, moderna)
- **Mono**: JetBrains Mono (código, dados)

### Princípios Visuais

- ✅ **Bordas orgânicas** (1.25rem - 3rem) — nada de cantos retos
- ✅ **Sombras suaves em camadas** — profundidade natural
- ✅ **Textura de papel sutil** — sensação tátil
- ✅ **Animações spring** — movimento natural, não robótico
- ✅ **Micro-interações** — feedback em hover, focus, tap

## 📚 Conteúdo - Tópicos por Prioridade

### 🔴 Prioridade ALTA (Frequência 5★)

| Tópico | Frequência | Tempo | Categoria |
|--------|------------|-------|-----------|
| Estrutura e Função Celular | ★★★★★ | 12 min | Celular |
| Divisão Celular (Mitose/Meiose) | ★★★★★ | 15 min | Celular |
| DNA, RNA e Síntese Protéica | ★★★★★ | 18 min | Genética |
| Genética Mendeliana | ★★★★☆ | 14 min | Genética |
| Evolução e Seleção Natural | ★★★★★ | 16 min | Evolução |
| Ecologia | ★★★★★ | 18 min | Ecologia |
| Fisiologia Humana | ★★★★★ | 20 min | Fisiologia |
| Biotecnologia | ★★★★☆ | 16 min | Genética |

### 🟡 Prioridade MÉDIA (Frequência 3-4★)

| Tópico | Frequência | Tempo | Categoria |
|--------|------------|-------|-----------|
| Botânica | ★★★★☆ | 15 min | Botânica |

### 🟢 Prioridade BAIXA (Frequência 2-3★)

| Tópico | Frequência | Tempo | Categoria |
|--------|------------|-------|-----------|
| Zoologia | ★★★☆☆ | 14 min | Zoologia |

## 🛠️ Desenvolvimento

### Pré-requisitos

- Node.js 18.17+
- npm 10+

### Instalação

```bash
# Clone o repositório
git clone https://github.com/usuario/biologia-enem.git
cd biologia-enem

# Instale dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:3000`

### Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção + sitemap
npm run start        # Servidor de produção
npm run lint         # ESLint
npm run lint:fix     # ESLint com auto-fix
npm run format       # Prettier format
npm run format:check # Verificar formatação
npm run type-check   # TypeScript check
npm run sitemap      # Gerar sitemap
npm run clean        # Limpar build artifacts
```

## 📦 Deploy

### Vercel (Recomendado)

```bash
# Instale Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Ou conecte o repositório no [Vercel Dashboard](https://vercel.com/dashboard) para deploy automático.

### Variáveis de Ambiente

```env
# .env.local (opcional)
NEXT_PUBLIC_SITE_URL=https://biologiaenem.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 🧪 Qualidade de Código

- **TypeScript strict mode** — zero `any`, tipos inferidos
- **ESLint** — Next.js core-web-vitals + regras customizadas
- **Prettier** — Formatação consistente + plugin Tailwind
- **Husky** — Pre-commit hooks (lint + format)
- **Zod** — Validação de runtime para dados de conteúdo

## ♿ Acessibilidade

- ✅ WCAG 2.1 AA
- ✅ Semântica HTML5 correta
- ✅ Navegação por teclado completa
- ✅ ARIA labels e roles apropriados
- ✅ Contraste de cores validado
- ✅ Modo escuro (prefers-color-scheme)
- ✅ Redução de movimento (prefers-reduced-motion)
- ✅ Textos alternativos em todas as ilustrações
- ✅ Foco visível e ordenado

## 📈 Performance

- **Lighthouse Score**: > 90 em todas as métricas
- **Core Web Vitals**: Otimizado
- **Static Export**: Deploy em qualquer CDN
- **Imagens**: Otimizadas (quando adicionadas)
- **Fonts**: `next/font` com `display: swap`
- **CSS**: Crítico inlined, não-crítico assíncrono

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### Padrões de Commit

```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação (prettier)
refactor: refatoração
test: testes
chore: manutenção
```

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- **Comunidade de estudantes** que testaram e deram feedback
- **Professores de biologia** que validaram o conteúdo
- **Designers** que inspiraram o design system
- **Open source** — Next.js, Tailwind, Framer Motion, Lucide, e tantos outros

---

**Feito com 💚 por estudantes, para estudantes**

> "A biologia não está nos livros. Está no seu coração batendo, na sua digestão, na vacina que você tomou, na árvore que dá sombra. Este site existe para mostrar isso." — Equipe Biologia ENEM