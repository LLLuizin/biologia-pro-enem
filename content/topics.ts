export interface Topic {
  id: string
  title: string
  description: string
  category: 'celular' | 'genetica' | 'evolucao' | 'ecologia' | 'fisiologia' | 'botanica' | 'zoologia'
  frequency: 1 | 2 | 3 | 4 | 5
  priority: 'alta' | 'media' | 'baixa'
  keywords: string[]
  realLifeExamples: RealLifeExample[]
  illustrations: string[]
  estimatedReadTime: number
}

export interface RealLifeExample {
  title: string
  description: string
  icon: string
  context: 'cotidiano' | 'saude' | 'tecnologia' | 'meio-ambiente' | 'alimentacao'
}

export const topics: Topic[] = [
  {
    id: 'celula-estrutura',
    title: 'Estrutura e Função Celular',
    description: 'A célula como unidade fundamental da vida. Organelas, membranas, diferenças entre procariontes e eucariontes, célula animal vs vegetal.',
    category: 'celular',
    frequency: 5,
    priority: 'alta',
    keywords: ['organelas', 'membrana plasmática', 'núcleo', 'mitocôndria', 'cloroplasto', 'ribossomo', 'retículo endoplasmático', 'complexo de Golgi', 'lisossomo', 'vacúolo', 'centríolo', 'citoesqueleto'],
    estimatedReadTime: 12,
    illustrations: ['cell-animal', 'cell-vegetal', 'cell-bacteria'],
    realLifeExamples: [
      {
        title: 'Por que seu coração bate sem você mandar?',
        description: 'As células do marcapasso cardíaco têm canais de íons especializados na membrana que geram impulsos elétricos rítmicos. É biologia pura mantendo você vivo agora.',
        icon: 'heart',
        context: 'saude'
      },
      {
        title: 'Seu músculo dói após exercício intenso?',
        description: 'Quando faltou oxigênio, suas mitocôndrias não deram conta. A célula fez fermentação lática, produzindo ácido lático. Aquela queimação é química celular em tempo real.',
        icon: 'zap',
        context: 'cotidiano'
      },
      {
        title: 'Antibiótico só mata bactéria, não seu corpo?',
        description: 'Bactérias têm parede de peptidoglicano e ribossomos 70S. Suas células não têm parede e usam ribossomos 80S. O remédio ataca alvos que só existem nelas.',
        icon: 'bacteria',
        context: 'saude'
      },
      {
        title: 'Por que plantas não precisam "comer"?',
        description: 'Cloroplastos fazem fotossíntese: transformam luz + CO₂ + H₂O em glicose + O₂. É uma fábrica de alimento movida a energia solar dentro da célula.',
        icon: 'leaf',
        context: 'alimentacao'
      }
    ]
  },
  {
    id: 'divisao-celular',
    title: 'Divisão Celular: Mitose e Meiose',
    description: 'Ciclo celular, fases da mitose, meiose I e II, crossing over, gametogênese, erros cromossômicos e câncer.',
    category: 'celular',
    frequency: 5,
    priority: 'alta',
    keywords: ['ciclo celular', 'interfase', 'prófase', 'metáfase', 'anáfase', 'telófase', 'citocinese', 'meiose', 'cromossomos homólogos', 'crossing over', 'gametas', 'zigoto', 'aneuploidia'],
    estimatedReadTime: 15,
    illustrations: ['mitosis-all', 'meiosis-comparison'],
    realLifeExamples: [
      {
        title: 'Como um zigoto vira um bebê de trilhões de células?',
        description: 'Mitose: uma célula vira duas idênticas. Duas viram quatro. Em 47 divisões, uma célula vira ~140 trilhões. Cada divisão copia 3 bilhões de pares de bases sem (quase) erros.',
        icon: 'cell',
        context: 'cotidiano'
      },
      {
        title: 'Por que irmãos são diferentes se vêm dos mesmos pais?',
        description: 'Meiose embaralha: crossing over troca pedaços entre cromossomos do pai e da mãe. Separação aleatória dos homólogos. 2²³ combinações possíveis só na separação. Você é único.',
        icon: 'dna',
        context: 'cotidiano'
      },
      {
        title: 'Síndrome de Down: um cromossomo a mais',
        description: 'Não-disjunção na meiose: cromossomo 21 não separa. Gameta fica com 24 cromossomos. Fecundação gera 47. Pequeno erro na divisão, grande impacto na vida.',
        icon: 'chromosome',
        context: 'saude'
      },
      {
        title: 'Câncer: mitose sem freio',
        description: 'Genes supressores de tumor (p53, RB) são os "freios" do ciclo celular. Mutações neles = célula divide sem controle. Quimioterapia ataca células em divisão rápida.',
        icon: 'alert',
        context: 'saude'
      }
    ]
  },
  {
    id: 'dna-rna-proteina',
    title: 'DNA, RNA e Síntese Protéica',
    description: 'Estrutura do DNA, replicação, transcrição, tradução, código genético, mutações, regulação gênica.',
    category: 'genetica',
    frequency: 5,
    priority: 'alta',
    keywords: ['DNA', 'RNA', 'hélice dupla', 'replicação', 'transcrição', 'tradução', 'código genético', 'códon', 'anticódon', 'mRNA', 'tRNA', 'rRNA', 'ribossomo', 'mutação', 'regulação gênica', 'operon'],
    estimatedReadTime: 18,
    illustrations: ['dna-structure', 'replication', 'transcription', 'translation'],
    realLifeExamples: [
      {
        title: 'Seu DNA tem 2 metros em cada célula',
        description: 'Se esticar o DNA de UMA célula, dá 2 metros. No seu corpo todo: 20 bilhões de km. Ida e volta a Plutão umas 70 vezes. Tudo enrolado em histonas dentro do núcleo microscópico.',
        icon: 'dna',
        context: 'cotidiano'
      },
      {
        title: 'Vacina mRNA: biologia salvando milhões',
        description: 'Pfizer/Moderna injetam mRNA da proteína Spike. Suas células leem e produzem a proteína. Sistema imune aprende a reconhecer. Sem vírus vivo, só a instrução genética.',
        icon: 'flask',
        context: 'saude'
      },
      {
        title: 'Por que gêmeos idênticos têm digitais diferentes?',
        description: 'Mesmo DNA, mas ambiente uterino diferente (posição, pressão, nutrição) afeta expressão gênica durante desenvolvimento. Epigenética: o ambiente "liga/desliga" genes.',
        icon: 'info',
        context: 'cotidiano'
      },
      {
        title: 'Lactose intolerância: gene desligado na idade adulta',
        description: 'Gene LCT produz lactase. Na maioria dos humanos, desliga após infância. Mutação regulatória (não no gene!) mantém ligado em alguns povos pastoris. Evolução em ação.',
        icon: 'droplet',
        context: 'alimentacao'
      }
    ]
  },
  {
    id: 'genetica-mendeliana',
    title: 'Genética Mendeliana e Padrões de Herança',
    description: 'Leis de Mendel, cruzamentos, quadrado de Punnett, herança autossômica, ligada ao X, alelos letais, epistasia, heredograma.',
    category: 'genetica',
    frequency: 4,
    priority: 'alta',
    keywords: ['Mendel', 'alelo', 'genótipo', 'fenótipo', 'homozigoto', 'heterozigoto', 'dominante', 'recessivo', 'Punnett', 'herança autossômica', 'herança ligada ao X', 'aleleo letal', 'epistasia', 'heredograma'],
    estimatedReadTime: 14,
    illustrations: ['punnett-square', 'pedigree'],
    realLifeExamples: [
      {
        title: 'Tipo sanguíneo: herança de 3 alelos (A, B, O)',
        description: 'A e B são codominantes, O é recessivo. Pai A (AO) + Mãe B (BO) = filhos A, B, AB ou O. Por isso filho tipo O pode nascer de pais A e B. Transfusão errada mata.',
        icon: 'droplet',
        context: 'saude'
      },
      {
        title: 'Daltonismo atinge mais homens? Cromossomo X.',
        description: 'Gene do daltonismo é recessivo no X. Homem (XY) tem um X só: se vier com mutação, ele é daltônico. Mulher (XX) precisa de dois X mutados. Por isso 8% homens vs 0.5% mulheres.',
        icon: 'eye',
        context: 'saude'
      },
      {
        title: 'Doença falciforme: heterozigoto tem vantagem',
        description: 'HbS HbS = anemia falciforme (grave). HbA HbS = traço falciforme (resistência à malária). Em regiões de malária, heterozigoto sobrevive mais. Seleção natural mantém o alelo "ruim".',
        icon: 'cell',
        context: 'meio-ambiente'
      },
      {
        title: 'Teste de paternidade: DNA não mente',
        description: 'Filho herda 50% do pai, 50% da mãe. Marcadores STR (repetições curtas) são únicos. Se alegado pai não compartilha alelos obrigatórios, exclusão 100%. Inclusão > 99.99%.',
        icon: 'dna',
        context: 'tecnologia'
      }
    ]
  },
  {
    id: 'evolucao',
    title: 'Evolução e Seleção Natural',
    description: 'Evidências da evolução, seleção natural, deriva gênica, fluxo gênico, especiação, radiação adaptativa, evolução humana.',
    category: 'evolucao',
    frequency: 5,
    priority: 'alta',
    keywords: ['evolução', 'seleção natural', 'deriva gênica', 'fluxo gênico', 'mutação', 'especiação', 'isolamento reprodutivo', 'radiação adaptativa', 'homologia', 'analogia', 'fóssil', 'datação', 'evolução humana', 'australopiteco', 'homo'],
    estimatedReadTime: 16,
    illustrations: ['phylogenetic-tree', 'natural-selection', 'human-evolution'],
    realLifeExamples: [
      {
        title: 'Bactérias resistentes: evolução em tempo real',
        description: 'Antibiótico mata 99.9%. O 0.1% com mutação aleatória sobrevive e se multiplica. Em dias, população toda é resistente. Por isso não pare o tratamento no meio.',
        icon: 'bacteria',
        context: 'saude'
      },
      {
        title: 'Seu apêndice: órgão vestigial',
        description: 'Ancestrais herbívoros usavam ceco grande para digerir celulose. Dieta mudou, ceco encolheu. Hoje é apêndice: sem função digestiva, só causa apendicite. Evolução não "apaga", só reduz.',
        icon: 'info',
        context: 'cotidiano'
      },
      {
        title: 'Pimenta queima: defesa química da planta',
        description: 'Capsaicina ativa receptor TRPV1 (calor/dor) em mamíferos. Pássaros não sentem. Planta "quer" que pássaros comam e dispersem sementes, não mamíferos que trituram. Coevolução.',
        icon: 'flower',
        context: 'alimentacao'
      },
      {
        title: 'Lactase persistência: evolução cultural',
        description: 'Pastoreio de gado → leite na dieta adulta → mutação mantém lactase ligada → vantagem nutricional → gene se espalha. Europa/Norte da África: 90% têm. Ásia/África subsaariana: <10%. Gene-cultura.',
        icon: 'droplet',
        context: 'alimentacao'
      }
    ]
  },
  {
    id: 'ecologia',
    title: 'Ecologia: Populações, Comunidades e Ecossistemas',
    description: 'Níveis de organização, fatores bióticos/abióticos, cadeias/teias alimentares, ciclos biogeoquímicos, sucessão ecológica, biomas brasileiros, impacto ambiental.',
    category: 'ecologia',
    frequency: 5,
    priority: 'alta',
    keywords: ['ecologia', 'população', 'comunidade', 'ecossistema', 'bioma', 'cadeia alimentar', 'teia alimentar', 'nível trófico', 'produtor', 'consumidor', 'decompositor', 'ciclo do carbono', 'ciclo do nitrogênio', 'ciclo da água', 'sucessão ecológica', 'biomas brasileiros', 'amazônia', 'cerrado', 'pantanal', 'mata atlântica', 'caatinga', 'pampa', 'impacto ambiental', 'sustentabilidade'],
    estimatedReadTime: 18,
    illustrations: ['food-web', 'biogeochemical-cycles', 'brazilian-biomes', 'ecological-succession'],
    realLifeExamples: [
      {
        title: 'Por que queimada na Amazônia afeta chuva em SP?',
        description: 'Árvores transpiram → "rios voadores" levam umidade pro Sul → chuvas no Sudeste. Menos floresta = menos evapotranspiração = seca nos reservatórios. Floresta em pé = água na torneira.',
        icon: 'droplet',
        context: 'meio-ambiente'
      },
      {
        title: 'Seu lixo orgânico vira gás metano no aterro',
        description: 'Sem oxigênio, bactérias fazem fermentação: matéria orgânica → CH₄ (metano). Metano retém 28x mais calor que CO₂. Compostagem caseira = aeróbica = CO₂ + adubo. Escolha sua pegada.',
        icon: 'leaf',
        context: 'cotidiano'
      },
      {
        title: 'Abelha some, seu café encarece',
        description: '75% culturas dependem de polinizadores. Café, morango, melancia, amêndoa. Abelhas nativas (não só Apis) polinizam melhor certas plantas. Perda de habitat = perda de polinização = comida mais cara.',
        icon: 'flower',
        context: 'alimentacao'
      },
      {
        title: 'Carro elétrico não é "emissão zero" se energia vem de carvão',
        description: 'Análise de ciclo de vida: extração lítio/cobalto + geração elétrica + fabricação. No Brasil (matriz 85% renovável), carro elétrico emite ~70% menos CO₂/km que combustão. Contexto importa.',
        icon: 'zap',
        context: 'tecnologia'
      }
    ]
  },
  {
    id: 'fisiologia-humana',
    title: 'Fisiologia Humana: Sistemas Integrados',
    description: 'Sistema nervoso, endócrino, circulatório, respiratório, digestório, excretor, imune, reprodutor. Homeostase, feedback negativo/positivo.',
    category: 'fisiologia',
    frequency: 5,
    priority: 'alta',
    keywords: ['homeostase', 'feedback negativo', 'feedback positivo', 'sistema nervoso', 'neurônio', 'sinapse', 'neurotransmissor', 'sistema endócrino', 'hormônio', 'insulina', 'glucagon', 'sistema circulatório', 'coração', 'vasos', 'pressão arterial', 'sistema respiratório', 'hemoglobina', 'sistema digestório', 'enzimas', 'sistema excretor', 'rim', 'nephron', 'sistema imune', 'anticorpo', 'vacina', 'sistema reprodutor', 'ciclo menstrual', 'espermatogênese'],
    estimatedReadTime: 20,
    illustrations: ['neuron-synapse', 'heart-cycle', 'nephron', 'immune-response', 'hormonal-feedback'],
    realLifeExamples: [
      {
        title: 'Por que você treme quando tem frio?',
        description: 'Termorreceptores na pele → hipotálamo (termostato) → nervos motores → contração muscular rápida (tremor) → calor metabólico. Feedback negativo: temperatura sobe → para de tremer. Homeostase pura.',
        icon: 'zap',
        context: 'cotidiano'
      },
      {
        title: 'Diabetes: insulina é a "chave" que abre a célula',
        description: 'Tipo 1: sistema imune destrói células beta do pâncreas → zero insulina. Tipo 2: fechaduras (receptores) emperradas → insulina sobe mas glicose não entra. Exercício abre fechaduras independentes de insulina.',
        icon: 'droplet',
        context: 'saude'
      },
      {
        title: 'Seu rim filtra 180L de sangue por dia',
        description: 'Você tem ~5L de sangue. Rim filtra tudo 36x/dia. Reabsorve 99% (água, glicose, aminoácidos, íons). Excreta 1-2L urina com toxinas. Um rim faz trabalho de dois. Doação viva é possível.',
        icon: 'flask',
        context: 'saude'
      },
      {
        title: 'Vacina: treino do sistema imune sem o perigo',
        description: 'Antígeno inativado/atenuado/mRNA → células apresentadoras → linfócitos T/B → memória imunológica. Segunda exposição: resposta 100x mais rápida. Você "já conhece" o inimigo. Imunidade de rebanho protege quem não pode vacinar.',
        icon: 'heart',
        context: 'saude'
      }
    ]
  },
  {
    id: 'botanica',
    title: 'Botânica: Fisiologia Vegetal e Diversidade',
    description: 'Fotossíntese, respiração vegetal, transpiração, hormônios vegetais, fotoperiodismo, reprodução de angiospermas, frutos e sementes, biomas vegetais.',
    category: 'botanica',
    frequency: 4,
    priority: 'media',
    keywords: ['fotossíntese', 'clorofila', 'fotossistema', 'ciclo de Calvin', 'fotoquiosse', 'respiração vegetal', 'transpiração', 'xilema', 'floema', 'hormônios vegetais', 'auxina', 'gibberelina', 'citocinina', 'ácido abscísico', 'etileno', 'fotoperiodismo', 'florada', 'angiosperma', 'gimnosperma', 'fruto', 'semente', 'dispersão'],
    estimatedReadTime: 15,
    illustrations: ['photosynthesis', 'plant-hormones', 'flower-structure', 'seed-dispersal'],
    realLifeExamples: [
      {
        title: 'Planta "sabe" a hora de florir: relógio biológico',
        description: 'Fitochrome (pigmento) mede noite longa vs curta. Planta de dia curto floresce quando noite > crítico (ex: crisântemo, soja). Planta de dia longo floresce quando noite < crítico (ex: trigo, espinafre). Agricultor manipula com luz artificial.',
        icon: 'flower',
        context: 'alimentacao'
      },
      {
        title: 'Banana madura apodrece as outras: etileno',
        description: 'Etileno = hormônio gasoso da maturação. Banana libera muito → acelera maturação de frutas climactéricas (maçã, tomate, abacate) por perto. Guarde separadas. Indústria usa câmaras com etileno controlado.',
        icon: 'droplet',
        context: 'cotidiano'
      },
      {
        title: 'Arroz dourado: vitamina A no grão via engenharia',
        description: 'Arroz normal não tem betacaroteno no endosperma. Genes de narciso + bactéria inseridos → via metabólica completa → grão dourado com pró-vitamina A. Pode prevenir cegueira em milhões de crianças. Biotecnologia humanitária.',
        icon: 'seedling',
        context: 'tecnologia'
      },
      {
        title: 'Madeira é carbono sequestrado da atmosfera',
        description: 'Fotossíntese: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. Árvore de 1 tonelada seca = ~500 kg carbono = ~1.8 toneladas CO₂ removidas. Construir com madeira certificada = edifício que "guarda" carbono. Cidade floresta.',
        icon: 'tree',
        context: 'meio-ambiente'
      }
    ]
  },
  {
    id: 'zoologia',
    title: 'Zoologia: Diversidade Animal e Adaptações',
    description: 'Principais filos, simetria, celoma, metamorfose, sistemas corporais, adaptações ao ambiente, comportamento animal, conservação.',
    category: 'zoologia',
    frequency: 3,
    priority: 'media',
    keywords: ['filo', 'porífero', 'cnidário', 'platelminto', 'nematódeo', 'anelídeo', 'molusco', 'artrópode', 'equinoderme', 'cordado', 'simetria', 'celoma', 'metamorfose', 'adaptação', 'mimetismo', 'camuflagem', 'comportamento', 'aprendizado', 'instinto', 'conservação', 'espécie ameaçada'],
    estimatedReadTime: 14,
    illustrations: ['animal-phylogeny', 'metamorphosis', 'adaptations'],
    realLifeExamples: [
      {
        title: 'Veneno de cascavel: coagulante natural',
        description: 'Fosfolipase A2 + metaloproteinase destroem membrana e coagulação. Em dose minúscula, derivados viram medicamentos: captopril (pressão alta) veio de jararaca. Biodiversidade = farmácia natural. Extinção = remédios perdidos.',
        icon: 'alert',
        context: 'saude'
      },
      {
        title: 'Polvo: inteligência sem vértebra',
        description: '500 milhões de neurônios (cão tem 500M). 2/3 nos braços: cada braço "pensa" sozinho. Resolve labirintos, abre potes, usa ferramentas, tem personalidade. Evolução convergente: cérebro complexo surgiu 2x (vertebrados + cefalópodes).',
        icon: 'brain',
        context: 'cotidiano'
      },
      {
        title: 'Corais: animais que fazem "casa" de pedra',
        description: 'Pólipo (cnidário) + zooxantelas (algas) = simbiose. Alga faz fotossíntese → dá açúcar ao coral. Coral dá CO₂ + nutrientes + proteção. Branqueamento = estresse térmico expulsa alga → coral morre. Recife = 25% biodiversidade marinha em 0.1% oceano.',
        icon: 'ecology',
        context: 'meio-ambiente'
      },
      {
        title: 'Seu apêndice não é inútil: refúgio de bactérias boas',
        description: 'Após diarreia grave (cólera, disenteria), flora intestinal é dizimada. Apêndice serve de "reserva" de bactérias benéficas para repovoar o intestino. Em países com saneamento precário, quem tem apêndice sobrevive mais. Função descoberta em 2007.',
        icon: 'bacteria',
        context: 'saude'
      }
    ]
  },
  {
    id: 'biotecnologia',
    title: 'Biotecnologia e Engenharia Genética',
    description: 'DNA recombinante, PCR, transgênicos, edição gênica (CRISPR), terapia gênica, células-tronco, bioética, aplicações médicas/agrícolas/industriais.',
    category: 'genetica',
    frequency: 4,
    priority: 'alta',
    keywords: ['DNA recombinante', 'vetor', 'enzima de restrição', 'ligação', 'transformação', 'PCR', 'primers', 'Taq polimerase', 'transgênico', 'CRISPR', 'Cas9', 'RNA guia', 'edição gênica', 'terapia gênica', 'células-tronco', 'pluripotência', 'iPSC', 'bioética', 'patenteamento de genes', 'biossegurança'],
    estimatedReadTime: 16,
    illustrations: ['pcr-cycle', 'crisper-mechanism', 'gene-therapy'],
    realLifeExamples: [
      {
        title: 'PCR: a "fotocopiadora" de DNA que mudou tudo',
        description: 'Kary Mullis (1983): ciclos de 95°C (desnatura) → 55°C (primers) → 72°C (polimerase). 30 ciclos = 1 bilhão de cópias. Usa Taq polimerosa de bactéria de fonte termal (Thermus aquaticus). COVID test = PCR. CSI = PCR. Paternidade = PCR.',
        icon: 'flask',
        context: 'tecnologia'
      },
      {
        title: 'CRISPR: tesoura molecular programável',
        description: 'Bactéria usa CRISPR como "memória imune" de vírus. Doudna/Charpentier (2020 Nobel) adaptaram: RNA guia + Cas9 = corta DNA em coordenada exata. Já cura anemia falciforme em testes. Edita embriões? Bioética urgente.',
        icon: 'dna',
        context: 'saude'
      },
      {
        title: 'Insulina humana: primeira droga recombinante (1982)',
        description: 'Antes: insulina de porco/vaca (alergias, impurezas). Gene humano inserido em E. coli → bactéria fábrica de insulina idêntica à humana. Hoje 100% insulina humana é recombinante. Biotecnologia salvando diabéticos há 40 anos.',
        icon: 'droplet',
        context: 'saude'
      },
      {
        title: 'Soja RR: tolerante a glifosato, polêmica no prato',
        description: 'Gene CP4 EPSPS de bactéria do solo → soja não morre com glifosato. Agricultor mata erva-daninha sem matar cultura. Menos herbicidas variados, mas uso massivo de um só → resistência em ervas-daninhas. Tecnologia ≠ solução mágica; manejo integrado é chave.',
        icon: 'seedling',
        context: 'alimentacao'
      }
    ]
  }
]

export const categories = [
  { id: 'celular', name: 'Biologia Celular', icon: 'cell', color: 'verde', count: 2 },
  { id: 'genetica', name: 'Genética e Biotecnologia', icon: 'dna', color: 'argila', count: 3 },
  { id: 'evolucao', name: 'Evolução', icon: 'evolution', color: 'flor', count: 1 },
  { id: 'ecologia', name: 'Ecologia', icon: 'ecology', color: 'musgo', count: 1 },
  { id: 'fisiologia', name: 'Fisiologia Humana', icon: 'physiology', color: 'terra', count: 1 },
  { id: 'botanica', name: 'Botânica', icon: 'botany', color: 'verde', count: 1 },
  { id: 'zoologia', name: 'Zoologia', icon: 'zoology', color: 'ceu', count: 1 },
] as const

export function getTopicById(id: string): Topic | undefined {
  return topics.find(t => t.id === id)
}

export function getTopicsByCategory(category: Topic['category']): Topic[] {
  return topics.filter(t => t.category === category)
}

export function getHighPriorityTopics(): Topic[] {
  return topics.filter(t => t.priority === 'alta').sort((a, b) => b.frequency - a.frequency)
}

export function getAllKeywords(): string[] {
  const keywords = new Set<string>()
  topics.forEach(t => t.keywords.forEach(k => keywords.add(k)))
  return Array.from(keywords).sort()
}