# Plano de Implementação - Biologia ENEM

## Visão Geral
Site de biologia para ENEM com foco em: conteúdos de maior incidência histórica, explicações simples mas aprofundadas, exemplos práticos do cotidiano, visual autêntico (não-padrão IA), muitas ilustrações customizadas, stack moderna TypeScript.

---

## 1. Stack Tecnológica

### Core
- **Next.js 14+** (App Router, RSC, Server Actions)
- **TypeScript 5+** (strict mode)
- **Tailwind CSS 3.4+** (design system customizado)
- **MDX** para conteúdo rico com componentes React
- **Framer Motion** para animações
- **Lucide React** para ícones base

### Content & Data
- **Contentlayer** ou **next-mdx-remote** para processamento de MDX
- **Zod** para validação de schemas de conteúdo
- **date-fns** para datas

### Visualization & Illustrations
- **D3.js** (seletivo) para visualizações de dados complexas
- **SVG customizados** (illustrations/ folder) - NÃO stock
- **CSS-in-JS mínimo** (apenas para animações SVG complexas)

### Quality & Performance
- **ESLint** + **Prettier** + **TypeScript strict**
- **Husky** + **lint-staged**
- **next-sitemap** para SEO
- **next-pwa** para offline support

---

## 2. Design System Autêntico (Já Parcialmente Implementado)

### Paleta de Cores (Natureza/Biologia)
```css
/* Cores principais - inspiradas em natureza real */
--verde-50: #f0f7f0;   --verde-900: #144d14;
--musgo-50: #f2f4f0;   --musgo-900: #2d3d2d;
--terra-50: #fdf8f3;   --terra-900: #4a2c1a;
--argila-50: #fef7f2;  --argila-900: #7c3a2a;
--flor-50: #fdf2f8;    --flor-900: #7a1a4a;
--ceu-50: #f0f5fa;     --ceu-900: #1a3a5c;
--papel-50: #fafafa;   --papel-900: #1a1a1a;
```

### Tipografia
- **Display**: Fraunces (serif variável, orgânica, humana)
- **Body**: DM Sans (sans variável, legível, moderna)
- **Mono**: JetBrains Mono (código, dados)

### Princípios Visuais
1. **Textura de papel sutil** (SVG noise filter)
2. **Bordas orgânicas** (border-radius variado, clip-path polygon)
3. **Sombras suaves** (layered, não duras)
4. **Animações baseadas em física** (spring, não linear)
5. **Ilustrações feitas à mão** (estilo sketch/field journal)

---

## 3. Estrutura de Conteúdo - Tópicos ENEM (Baseado em Dados Históricos)

### Análise de Frequência (2010-2024)

| Prioridade | Tópico | Frequência | Subtópicos Críticos |
|------------|--------|------------|---------------------|
| **ALTA** | Genética | ★★★★★ | Mendel, não-mendeliana, molecular, biotecnologia |
| **ALTA** | Ecologia | ★★★★★ | Cadeias/teias, ciclos, sucessão, impacto humano |
| **ALTA** | Evolução | ★★★★★ | Seleção natural, especiação, evidências, origem da vida |
| **ALTA** | Citologia | ★★★★☆ | Organelas, membrana, divisão celular, transporte |
| **ALTA** | Fisiologia Humana | ★★★★☆ | Sistemas, homeostase, regulação hormonal/nervosa |
| **MÉDIA** | Botânica | ★★★☆☆ | Tecidos, reprodução, hormônios vegetais, fotossíntese |
| **MÉDIA** | Zoologia | ★★★☆☆ | Sistemas comparados, comportamento, filogenia |
| **MÉDIA** | Biotecnologia | ★★★☆☆ | PCR, transgênicos, terapia gênica, ética |
| **BAIXA** | Microbiologia | ★★☆☆☆ | Vírus, bactérias, doenças, imunidade |
| **BAIXA** | História da Vida | ★★☆☆☆ | Eras, fósseis, extinções |

### Estrutura de Dados por Tópico (Zod Schema)

```typescript
// src/lib/schemas.ts
import { z } from 'zod'

export const RealLifeExampleSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.enum(['cotidiano', 'saude', 'tecnologia', 'meio-ambiente', 'curiosidade']),
  image: z.string().optional(),
  relatedTopics: z.array(z.string()),
  source: z.string().optional(),
})

export const SubtopicSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  frequency: z.number().min(1).max(5),
  priority: z.enum(['alta', 'media', 'baixa']),
  content: z.string(),
  keyConcepts: z.array(z.string()),
  commonQuestions: z.array(z.object({
    question: z.string(),
    answer: z.string(),
    year: z.number().optional(),
  })),
  realLifeExamples: z.array(z.string()),
  illustrations: z.array(z.string()),
  estimatedReadTime: z.number(),
})

export const TopicSchema = z.object({
  slug: z.string(),
  title: z.string(),
  shortTitle: z.string(),
  description: z.string(),
  icon: z.string(),
  color: z.string(),
  frequency: z.number().min(1).max(5),
  priority: z.enum(['alta', 'media', 'baixa']),
  subtopics: z.array(SubtopicSchema),
  realLifeExamples: z.array(RealLifeExampleSchema),
  studyOrder: z.number(),
  prerequisites: z.array(z.string()),
  relatedTopics: z.array(z.string()),
  tags: z.array(z.string()),
  lastUpdated: z.string(),
})

export type Topic = z.infer<typeof TopicSchema>
export type Subtopic = z.infer<typeof SubtopicSchema>
export type RealLifeExample = z.infer<typeof RealLifeExampleSchema>
```

---

## 4. Arquitetura de Componentes

### Componentes UI Base (`src/components/ui/`)

```
ui/
├── Button.tsx
├── Card.tsx
├── Badge.tsx
├── Icon.tsx
├── Input.tsx
├── Select.tsx
├── Tabs.tsx
├── Accordion.tsx
├── Tooltip.tsx
├── Modal.tsx
├── Progress.tsx
├── Skeleton.tsx
├── Table.tsx
└── index.ts
```

### Componentes de Layout (`src/components/layout/`)

```
layout/
├── Header.tsx
├── Footer.tsx
├── Sidebar.tsx
├── MobileDrawer.tsx
├── Breadcrumbs.tsx
├── TableOfContents.tsx
├── ReadingProgress.tsx
└── ThemeProvider.tsx
```

### Componentes de Conteúdo (`src/components/content/`)

```
content/
├── TopicHero.tsx
├── TopicCard.tsx
├── SubtopicContent.tsx
├── KeyConceptBox.tsx
├── CommonQuestionCard.tsx
├── RealLifeExampleCard.tsx
├── IllustrationFigure.tsx
├── ComparisonTable.tsx
├── ProcessFlow.tsx
├── PhylogeneticTree.tsx
├── GeneticCross.tsx
├── EcosystemWeb.tsx
├── StudyChecklist.tsx
├── RelatedTopics.tsx
└── ShareButtons.tsx
```

### Visualizações Customizadas (`src/components/visualizations/`)

```
visualizations/
├── charts/
│   ├── FrequencyChart.tsx
│   ├── PriorityRadar.tsx
│   ├── StudyHeatmap.tsx
│   └── PerformanceChart.tsx
├── biology/
│   ├── CellDiagram.tsx
│   ├── DNAReplication.tsx
│   ├── ProteinSynthesis.tsx
│   ├── MitosisMeiosis.tsx
│   ├── PunnettSquare.tsx
│   ├── PedigreeChart.tsx
│   ├── FoodWeb.tsx
│   ├── CarbonCycle.tsx
│   ├── NitrogenCycle.tsx
│   ├── WaterCycle.tsx
│   ├── PhylogeneticTree.tsx
│   ├── HormonePathway.tsx
│   ├── NeuronSynapse.tsx
│   ├── KidneyNephron.tsx
│   └── HeartCycle.tsx
├── dataviz/
│   ├── BarChart.tsx
│   ├── LineChart.tsx
│   ├── RadarChart.tsx
│   ├── Heatmap.tsx
│   └── validators/
│       └── validatePalette.ts
└── index.ts
```

---

## 5. Sistema de Ilustrações (Não-Stock, Autêntico)

### Estratégia
- **SVGs desenhados à mão** (estilo field journal / scientific illustration)
- **Animações CSS/SMIL** para processos biológicos
- **Interatividade** (hover, click, drag) para exploração
- **Acessibilidade**: `role="img"`, `aria-labelledby`, `title`, `desc`

### Categorias de Ilustração

| Categoria | Exemplos | Estilo |
|-----------|----------|--------|
| Estruturas | Célula, organelas, DNA, proteínas | Cutaway, labeled diagrams |
| Processos | Mitose, meiose, fotossíntese, respiração | Step-by-step animated |
| Sistemas | Coração, rim, neurônio, sinapse | Functional diagrams |
| Ecologia | Teias alimentares, ciclos, pirâmides | Network/flow diagrams |
| Genética | Cruzamentos, pedigree, quadrado Punnett | Interactive tools |
| Evolução | Árvore filogenética, especiação | Zoomable dendrogram |
| Vida Real | Vacinas, transgênicos, CRISPR, biocombustíveis | Infographic style |

### Convenção de Arquivos
```
public/illustrations/
├── structures/
├── processes/
├── systems/
├── ecology/
├── genetics/
├── evolution/
└── real-life/
```

---

## 6. Sistema "Biologia na Vida Real"

### Integração no Conteúdo
Cada subtópico possui `realLifeExamples: string[]` referenciando exemplos práticos.

### Categorias de Exemplo
1. **Cotidiano**: Fermentação (pão/cerveja), enzimas (detergente), osmose (conservas)
2. **Saúde**: Vacinas, antibióticos, diabetes/insulina, tipos sanguíneos, doenças genéticas
3. **Tecnologia**: PCR (teste COVID), CRISPR, transgênicos, sequenciamento, biocombustíveis
4. **Meio Ambiente**: Eutrofização, efeito estufa, biodiversidade, bioindicadores
5. **Curiosidade**: Bioluminescência, extremófilos, mimetismo, coevolução

---

## 7. Rotas e Páginas (App Router)

```
src/app/
├── (main)/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── topicos/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       ├── page.tsx
│   │       └── [subSlug]/
│   │           └── page.tsx
│   ├── simulados/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       ├── page.tsx
│   │       └── resultado/
│   │           └── page.tsx
│   ├── estatisticas/
│   │   └── page.tsx
│   └── sobre/
│       └── page.tsx
├── api/
│   ├── topics/
│   ├── search/
│   ├── progress/
│   └── illustrations/
├── sitemap.ts
├── robots.ts
└── manifest.ts
```

---

## 8. Dados Iniciais - Tópicos Prioritários (Fase 1)

### 5 Tópicos ALTA Prioridade (MVP)
1. **Genética** (`genetica`)
2. **Ecologia** (`ecologia`)
3. **Evolução** (`evolucao`)
4. **Citologia** (`citologia`)
5. **Fisiologia Humana** (`fisiologia-humana`)

### 3 Tópicos MÉDIA Prioridade (Fase 2)
6. **Botânica** (`botanica`)
7. **Zoologia** (`zoologia`)
8. **Microbiologia** (`microbiologia`)

---

## 9. Fases de Implementação

### FASE 1: Foundation (Semanas 1-2) - PARCIALMENTE FEITO
- [x] Next.js 14 + TypeScript + Tailwind configurado
- [x] Design system base (cores, tipografia, utilitários)
- [x] utils.ts com helpers
- [x] Estrutura de pastas criada
- [ ] Configurar Contentlayer/next-mdx-remote
- [ ] Schemas Zod para validação
- [ ] Componentes UI base
- [ ] Layout components
- [ ] Página Home estática

### FASE 2: Content System (Semanas 2-3)
- [ ] Sistema de carregamento MDX
- [ ] Página /topicos (index filtrable)
- [ ] Página /topicos/[slug]
- [ ] Página /topicos/[slug]/[subSlug]
- [ ] Componente SubtopicContent
- [ ] TableOfContents auto-gerado
- [ ] ReadingProgress bar
- [ ] Breadcrumbs

### FASE 3: Componentes de Conteúdo Rico (Semanas 3-4)
- [ ] KeyConceptBox, CommonQuestionCard, ComparisonTable
- [ ] ProcessFlow
- [ ] IllustrationFigure wrapper
- [ ] RealLifeExampleCard + sistema de exemplos
- [ ] StudyChecklist
- [ ] RelatedTopics

### FASE 4: Visualizações Biologia (Semanas 4-6)
**Prioridade Alta:**
- [ ] CellDiagram interativo
- [ ] MitosisMeiosis comparativo animado
- [ ] PunnettSquare interativo
- [ ] DNAReplication / ProteinSynthesis animado
- [ ] FoodWeb drag-and-drop
- [ ] CarbonCycle / NitrogenCycle animados
- [ ] PhylogeneticTree zoomable

**Prioridade Média:**
- [ ] HormonePathway, NeuronSynapse, KidneyNephron, HeartCycle
- [ ] PedigreeChart interativo

### FASE 5: Dashboards e Analytics (Semanas 6-7)
- [ ] /estatisticas - FrequencyChart, PriorityRadar, StudyHeatmap
- [ ] /simulados - lista, execução, resultado
- [ ] API de progresso do usuário
- [ ] PerformanceChart evolução

### FASE 6: Ilustrações Customizadas (Paralelo contínuo)
- [ ] Criar 50+ SVGs customizados
- [ ] Otimizar SVGs (SVGO)
- [ ] Sistema de labels interativos
- [ ] Animações SMIL/CSS

### FASE 7: Polish & Launch (Semanas 7-8)
- [ ] SEO completo
- [ ] PWA
- [ ] Testes acessibilidade
- [ ] Performance (Lighthouse > 90)
- [ ] Analytics
- [ ] Documentação deploy (Vercel)

---

## 10. Convenções de Código

### Naming
- Componentes: PascalCase
- Hooks: use prefix
- Utils: camelCase
- Constantes: UPPER_SNAKE_CASE
- CSS: kebab-case

### TypeScript
- strict: true
- Interfaces sobre types
- Zod schemas como source of truth
- never para exaustividade

### React/Next.js
- Server Components por default
- Client Components apenas quando necessário
- Suspense boundaries
- next/image para ilustrações

### Acessibilidade (WCAG 2.1 AA)
- Semantic HTML
- Focus visible states
- ARIA labels
- Contraste >= 4.5:1
- prefers-reduced-motion

---

## 11. Scripts de Automação

```
scripts/
├── validate-content.ts
├── generate-sitemap.ts
├── optimize-svgs.ts
├── check-broken-links.ts
├── extract-toc.ts
├── generate-search-index.ts
└── validate-palette.ts
```

---

## 12. Métricas de Sucesso

| Métrica | Target |
|---------|--------|
| Lighthouse Performance | > 90 |
| Lighthouse Accessibility | 100 |
| Lighthouse SEO | 100 |
| FCP | < 1.5s |
| TTI | < 3s |
| Core Web Vitals | Green |
| Cobertura tópicos alta prioridade | 100% |
| Exemplos vida real por subtópico | >= 2 |
| Ilustrações customizadas | >= 50 |

---

## 13. Arquivos Críticos para Implementação

### Core Config
- package.json
- tsconfig.json
- tailwind.config.ts
- next.config.js
- src/lib/schemas.ts

### Layout & Theme
- src/app/(main)/layout.tsx
- src/app/globals.css
- src/components/layout/ThemeProvider.tsx
- src/components/layout/Header.tsx

### Content System
- src/lib/content.ts
- src/app/(main)/topicos/[slug]/page.tsx
- src/app/(main)/topicos/[slug]/[subSlug]/page.tsx
- src/components/content/SubtopicContent.tsx

### Visualizations (Biologia)
- src/components/visualizations/biology/CellDiagram.tsx
- src/components/visualizations/biology/MitosisMeiosis.tsx
- src/components/visualizations/biology/PunnettSquare.tsx
- src/components/visualizations/biology/FoodWeb.tsx
- src/components/visualizations/biology/PhylogeneticTree.tsx

### Dataviz (Charts)
- src/components/visualizations/charts/FrequencyChart.tsx
- src/components/visualizations/charts/StudyHeatmap.tsx
- src/components/visualizations/dataviz/validators/validatePalette.ts

### UI Base
- src/components/ui/Button.tsx
- src/components/ui/Card.tsx
- src/components/ui/Badge.tsx
- src/components/ui/Tooltip.tsx

---

## 14. Próximos Passos Imediatos

1. Instalar dependências faltantes:
   npm install framer-motion lucide-react next-mdx-remote zod date-fns
   npm install -D @types/node contentlayer next-contentlayer

2. Criar src/lib/schemas.ts com schemas Zod completos

3. Criar src/lib/content.ts para carregar/processar MDX

4. Criar dados iniciais em src/content/topicos/ (5 tópicos alta prioridade)

5. Implementar componentes UI base restantes

6. Construir páginas de tópicos com roteamento dinâmico
