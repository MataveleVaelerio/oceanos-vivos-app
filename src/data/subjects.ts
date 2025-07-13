// Estrutura de dados para conteúdo educacional
export interface Lesson {
  id: string;
  title: string;
  duration: string;
  description: string;
  content: string;
  keyPoints: string[];
  images?: string[];
  quiz?: Quiz;
  points: number;
}

export interface Quiz {
  id: string;
  questions: Question[];
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'básico' | 'médio' | 'avançado';
  points: number;
}

export interface Subject {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
  totalLessons: number;
  estimatedHours: string;
}

// Dados de Oceanografia Física
export const oceanografiaFisica: Subject = {
  id: 'fisica',
  title: 'Oceanografia Física',
  description: 'Propriedades físicas dos oceanos e seus fenômenos',
  icon: 'waves',
  color: 'ocean',
  totalLessons: 12,
  estimatedHours: '8h',
  lessons: [
    {
      id: 'ondas-formacao',
      title: 'Formação e Tipos de Ondas',
      duration: '25 min',
      description: 'Como se formam as ondas e seus diferentes tipos no Canal de Moçambique',
      points: 15,
      keyPoints: [
        'Vento como principal gerador de ondas',
        'Diferença entre ondas de superfície e profundas',
        'Influência dos ciclones tropicais em Moçambique',
        'Ondas de tempestade e proteção costeira'
      ],
      content: `
## Como Nascem as Ondas do Nosso Oceano 🌊

Imagina o vento soprando sobre a superfície da água na Baía de Maputo. É exatamente assim que nascem a maioria das ondas que vemos nas nossas praias!

### O Processo de Formação

**1. O Vento Toca a Água**
Quando o vento sopra sobre o oceano, ele transfere energia para a superfície da água através do atrito. É como quando sopras sobre uma chávena de chá quente - a superfície se move!

**2. Ondas Pequenas Crescem**
No Canal de Moçambique, os ventos alísios constantes criam primeiro pequenas ondulações. Essas ondulações capturam mais vento e crescem gradualmente.

**3. Ondas Maduras**
À medida que viajam pelo oceano, as ondas organizam-se em padrões regulares. No nosso canal, podem viajar centenas de quilômetros desde a zona central até às nossas costas.

### Tipos de Ondas em Moçambique

**Ondas de Vento Local**
- Formadas pelos ventos costeiros
- Comuns na Baía de Maputo e Beira
- Geralmente menores (1-3 metros)

**Ondas de Tempestade**
- Geradas pelos ciclones tropicais
- Podem exceder 8 metros de altura
- Causam erosão nas praias de Xai-Xai e Inhambane

**Ondas de Monção**
- Relacionadas com os ventos sazonais
- Mudam direção entre Maio-Setembro
- Importantes para a pesca tradicional

### Impacto nas Comunidades Costeiras

As ondas não são apenas fenómenos bonitos - elas moldam a vida das nossas comunidades:

- **Pesca**: Pescadores de Vilanculos usam o conhecimento das ondas para prever o melhor momento para sair ao mar
- **Erosão**: Em Quelimane, as ondas de tempestade ameaçam habitações costeiras
- **Turismo**: As praias de Tofo são famosas pelas ondas ideais para surf

### Curiosidade Local 🐠
Os pescadores tradicionais de Moçambique há muito tempo observam que certas ondas vêm acompanhadas de cardumes específicos. Isto acontece porque as ondas transportam nutrientes que atraem peixes!
      `,
      quiz: {
        id: 'quiz-ondas-1',
        questions: [
          {
            id: 'q1',
            question: 'Qual é a principal fonte de energia para a formação das ondas no Canal de Moçambique?',
            options: [
              'As correntes marinhas profundas',
              'Os ventos que sopram sobre a superfície',
              'As diferenças de temperatura da água',
              'Os movimentos tectónicos do fundo marinho'
            ],
            correctAnswer: 1,
            explanation: 'O vento é o principal gerador de ondas. Quando sopra sobre a superfície do oceano, transfere energia através do atrito, criando as ondulações que se desenvolvem em ondas.',
            difficulty: 'básico',
            points: 10
          },
          {
            id: 'q2',
            question: 'Durante a época dos ciclones tropicais em Moçambique, que tipo de ondas são mais comuns?',
            options: [
              'Ondas pequenas de vento local',
              'Ondas de monção regulares',
              'Ondas de tempestade de grande altura',
              'Ondas internas profundas'
            ],
            correctAnswer: 2,
            explanation: 'Os ciclones tropicais geram ventos muito fortes que criam ondas de tempestade, que podem exceder 8 metros de altura e causar erosão significativa nas costas moçambicanas.',
            difficulty: 'médio',
            points: 15
          }
        ]
      }
    },
    {
      id: 'mares-canal-mocambique',
      title: 'Marés no Canal de Moçambique',
      duration: '30 min',
      description: 'Como funcionam as marés e sua importância para Moçambique',
      points: 15,
      keyPoints: [
        'Influência da lua e sol nas marés',
        'Marés vivas e mortas',
        'Variação das marés ao longo da costa moçambicana',
        'Importância para pesca e navegação'
      ],
      content: `
## As Marés: O Respirar do Nosso Oceano 🌙

As marés são um dos fenómenos mais regulares e previsíveis do oceano. Em Moçambique, elas determinam o ritmo de vida das comunidades costeiras há gerações.

### O Que Causa as Marés?

**A Dança da Lua e do Sol**
As marés resultam da atração gravitacional da Lua e do Sol sobre as águas dos oceanos. A Lua, por estar mais próxima, tem maior influência.

**Como Funciona:**
1. A água "estira-se" em direção à Lua
2. Cria-se uma protuberância do lado da Lua
3. Outra protuberância forma-se do lado oposto
4. Enquanto a Terra roda, essas protuberâncias causam a subida e descida das águas

### Tipos de Marés em Moçambique

**Marés Vivas (Sizígias)**
- Ocorrem na lua nova e lua cheia
- Amplitude máxima: até 3,5 metros em Maputo
- Ideais para coleta de marisco em Inhambane

**Marés Mortas (Quadraturas)**
- Lua em quarto crescente ou minguante
- Amplitude menor: cerca de 1,5 metros
- Melhores para pesca em recifes

### Variações ao Longo da Costa

**Maputo (Sul)**
- Marés semi-diurnas (duas por dia)
- Amplitude: 1,5 a 3,5 metros
- Forte influência na Lagoa de Maputo

**Beira (Centro)**
- Marés mistas
- Amplitude: 2 a 4 metros
- Importantes para o Porto da Beira

**Pemba (Norte)**
- Marés diurnas predominantes
- Amplitude: 1 a 2,5 metros
- Influenciam a pesca tradicional

### Importância Cultural e Económica

**Para os Pescadores:**
- Determinam horários de pesca
- Maré baixa: acesso a recifes para coleta
- Maré alta: saída de barcos maiores

**Para as Mulheres Marisqueiras:**
- Maré baixa revela bancos de marisco
- Conhecimento tradicional de ciclos lunares
- Sustento familiar baseado nas marés

**Para o Turismo:**
- Marés baixas revelam piscinas naturais
- Melhores épocas para mergulho
- Planejamento de atividades aquáticas

### Previsão e Tradição 📅

Em Moçambique, as comunidades costeiras desenvolveram conhecimentos tradicionais sofisticados sobre marés:

- **Calendário Lunar**: Pescadores de Angoche preveem marés pela fase da lua
- **Observação Natural**: Mudanças no comportamento de aves indicam marés extremas
- **Conhecimento Geracional**: Sabedoria passada de avós para netos

### Impactos Modernos

Com as mudanças climáticas, as marés em Moçambique estão a mudar:
- Marés mais altas devido ao aquecimento global
- Maior frequência de marés de tempestade
- Necessidade de adaptar conhecimentos tradicionais
      `
    }
  ]
};

// Dados de Oceanografia Biológica
export const oceanografiaBiologica: Subject = {
  id: 'biologica',
  title: 'Oceanografia Biológica',
  description: 'Vida marinha e ecossistemas oceânicos',
  icon: 'fish',
  color: 'wave',
  totalLessons: 15,
  estimatedHours: '10h',
  lessons: [
    {
      id: 'plancton-base-vida',
      title: 'Plâncton: A Base da Vida Marinha',
      duration: '35 min',
      description: 'O mundo microscópico que sustenta todo o oceano',
      points: 20,
      keyPoints: [
        'Fitoplâncton: produtores primários',
        'Zooplâncton: primeiro nível de consumidores',
        'Importância na cadeia alimentar',
        'Plâncton no Canal de Moçambique'
      ],
      content: `
## O Mundo Invisível Que Alimenta o Oceano 🦠

Quando olhamos para as águas cristalinas da Ilha de Moçambique, raramente pensamos nas bilhões de criaturas microscópicas que tornam toda a vida marinha possível. Este é o fascinante mundo do plâncton!

### O Que É o Plâncton?

O plâncton são organismos que flutuam ou nadam fracamente na água, sendo transportados pelas correntes. A palavra vem do grego "planktos" que significa "errante" ou "à deriva".

**Dois Grupos Principais:**

### Fitoplâncton: As Plantas do Mar 🌱

**O Que São:**
- Organismos microscópicos fotossintéticos
- Maioritariamente algas unicelulares
- Produzem seu próprio alimento usando luz solar

**Importância Fundamental:**
- Produzem 50% do oxigénio que respiramos
- Base de toda a cadeia alimentar marinha
- Absorvem CO2 da atmosfera

**No Canal de Moçambique:**
- Mais abundantes durante a época fresca (Maio-Setembro)
- Concentram-se nas zonas de ressurgência
- Diatomáceas são dominantes perto da costa

### Zooplâncton: Os Animais Microscópicos 🦐

**Características:**
- Pequenos animais que se alimentam de fitoplâncton
- Incluem larvas de peixes, crustáceos e moluscos
- Migram verticalmente durante o dia e noite

**Grupos Principais em Moçambique:**
- **Copépodos**: pequenos crustáceos, muito abundantes
- **Krill tropical**: alimento preferido de baleias jubarte
- **Larvas de peixe**: futuros peixes comerciais
- **Medusas pequenas**: predadores do zooplâncton

### A Cadeia Alimentar Planctónica

Fitoplâncton → Zooplâncton → Peixes pequenos → Peixes grandes → Tubarões/Baleias

**Exemplo Local:**
Na Baía de Inhambane, as diatomáceas (fitoplâncton) alimentam copépodos (zooplâncton), que por sua vez alimentam as sardinhas jovens, que sustentam os tubarões-baleia que visitam a região!

### Importância Económica

**Para a Pesca:**
- Zonas ricas em plâncton = zonas ricas em peixe
- Pescadores de Angoche seguem "água verde" (rica em fitoplâncton)
- Época de reprodução do peixe coincide com picos planctónicos

**Para o Turismo:**
- Tubarões-baleia em Tofo seguem o plâncton
- Mergulho em águas ricas em vida microscópica
- Observação de baleias jubarte que se alimentam de krill

### Mudanças Climáticas e Plâncton

**Impactos Observados:**
- Aquecimento das águas altera composição planctónica
- Acidificação prejudica plâncton com conchas
- Mudanças nos padrões de vento afetam ressurgência

**Consequências para Moçambique:**
- Alterações nas rotas migratórias de peixes
- Impacto na produtividade pesqueira
- Necessidade de adaptação das práticas de pesca

### Observando o Plâncton 🔬

**Sinais de Abundância:**
- Água com cor esverdeada ou avermelhada
- Concentração de aves marinhas
- Presença de peixes pequenos à superfície
- Bioluminescência nocturna (plâncton que brilha)

### Curiosidade Fascinante ✨

Nas noites quentes em Vilanculos, quando perturbas a água, ela pode brilhar com uma luz azul-esverdeada. Isto é causado por dinoflagelados (um tipo de fitoplâncton) que produzem luz quando agitados - um fenómeno chamado bioluminescência!
      `,
      quiz: {
        id: 'quiz-plancton-1',
        questions: [
          {
            id: 'q1-plancton',
            question: 'Qual é a principal importância do fitoplâncton para a vida na Terra?',
            options: [
              'Produz comida para os tubarões-baleia',
              'Produz 50% do oxigénio que respiramos',
              'Cria as correntes marinha',
              'Forma os recifes de coral'
            ],
            correctAnswer: 1,
            explanation: 'O fitoplâncton é responsável por cerca de 50% da produção de oxigénio do planeta através da fotossíntese, sendo fundamental para a vida terrestre.',
            difficulty: 'básico',
            points: 10
          },
          {
            id: 'q2-plancton',
            question: 'Por que os tubarões-baleia visitam as águas de Tofo e Inhambane?',
            options: [
              'Águas mais quentes para reprodução',
              'Seguem cardumes de fitoplâncton e zooplâncton',
              'Procuram águas mais profundas',
              'Fogem de predadores'
            ],
            correctAnswer: 1,
            explanation: 'Os tubarões-baleia são filtradores que se alimentam principalmente de plâncton. Eles seguem as concentrações de zooplâncton, especialmente krill, que são abundantes nas águas ricas em nutrientes de Moçambique.',
            difficulty: 'médio',
            points: 15
          }
        ]
      }
    },
    {
      id: 'recifes-coral-mocambique',
      title: 'Recifes de Coral em Moçambique',
      duration: '45 min',
      description: 'Ecossistemas de coral e sua importância para a biodiversidade',
      points: 25,
      keyPoints: [
        'Tipos de corais em Moçambique',
        'Simbiose coral-zooxantelas',
        'Ameaças aos recifes',
        'Conservação e proteção'
      ],
      content: `
## Os Jardins Subaquáticos de Moçambique 🪸

Os recifes de coral de Moçambique são verdadeiras cidades submarinas, abrigando 25% de toda a vida marinha mundial em apenas 1% da área oceânica. Estas estruturas vivas são fundamentais para a economia e cultura das nossas comunidades costeiras.

### O Que São os Corais?

**Animais, Não Plantas!**
Muita gente pensa que corais são plantas ou pedras, mas na verdade são animais! Cada coral é formado por milhares de pequenos pólipos - animais simples aparentados com águas-vivas.

**Estrutura Básica:**
- **Pólipo**: animal individual (2-3mm)
- **Esqueleto calcário**: casa construída pelo pólipo
- **Zooxantelas**: algas simbióticas que vivem dentro do coral

### Tipos de Recifes em Moçambique

**Recifes Franjeantes:**
- Crescem junto à costa
- Comuns em Vilanculos e Xai-Xai
- Facilmente acessíveis para mergulho

**Recifes de Barreira:**
- Separados da costa por lagoa
- Exemplo: Bazaruto e Benguerra
- Protegem a costa de ondas fortes

**Atóis:**
- Estruturas circulares em águas profundas
- Poucos exemplos em Moçambique
- Bassas da Índia (território francês)

### A Simbiose Milagrosa

**Coral + Zooxantela = Sucesso**

Os corais têm uma parceria fantástica com algas microscópicas chamadas zooxantelas:

1. **O coral oferece**: casa segura e nutrientes (nitrogénio, fósforo)
2. **A alga oferece**: açúcar produzido por fotossíntese (90% da energia do coral)
3. **Resultado**: crescimento rápido e cores vibrantes

**Por Que os Corais São Coloridos?**
As cores vêm das zooxantelas! Quando estão stressados, os corais expulsam as algas e ficam brancos - este é o "branqueamento de corais".

### Biodiversidade dos Recifes Moçambicanos

**Corais Duros (Construtores de Recife):**
- **Acropora**: corais ramificados, dominantes em águas rasas
- **Porites**: corais maciços, resistentes a ondas
- **Montipora**: corais folhosos, em águas mais fundas

**Corais Moles:**
- **Sinularia**: corais "couve-flor"
- **Sarcophyton**: corais "cogumelo"
- **Dendronephthya**: corais árvore coloridos

**Vida Associada:**
- **Peixes**: mais de 2000 espécies
- **Crustáceos**: caranguejos, camarões, lagostas
- **Moluscos**: caracóis, polvos, lulas
- **Tartarugas**: verdes, de pente, cabeçudas

### Importância Económica e Cultural

**Para as Comunidades:**
- **Pesca**: 80% da pesca artesanal depende dos recifes
- **Proteção costeira**: reduzem energia das ondas em 70%
- **Turismo**: mergulho, snorkeling, observação

**Valores Tradicionais:**
- Locais sagrados para algumas comunidades
- Conhecimento tradicional de pesca
- Calendários lunares baseados na vida dos recifes

### Ameaças aos Recifes

**Mudanças Climáticas:**
- Aquecimento: branqueamento em massa
- Acidificação: dissolução dos esqueletos calcários
- Subida do nível do mar: alteração das condições de luz

**Pressões Humanas:**
- **Pesca destrutiva**: redes de arrasto, bombas
- **Poluição**: esgotos, pesticidas, plásticos
- **Sedimentação**: erosão devido ao desmatamento
- **Turismo descontrolado**: danos físicos, âncoras

**Eventos Observados em Moçambique:**
- Branqueamento em 1998 e 2016
- Ciclones Idai e Kenneth (2019)
- Pressão pesqueira crescente

### Conservação e Proteção

**Áreas Marinhas Protegidas:**
- **Parque Nacional do Arquipélago de Bazaruto**: pioneiro na proteção
- **Reserva Marinha Parcial da Ilha de Inhaca**: pesquisa e educação
- **Santuário de Dugongos de Maputo**: proteção de espécies ameaçadas

**Práticas Sustentáveis:**
- Pesca com anzol em vez de redes
- Períodos de defeso respeitados
- Turismo responsável
- Restauração de corais

### Tecnologias de Restauração

**Métodos Inovadores:**
- **Fragmentação**: cortar e replantar pedaços de coral
- **Viveiros de coral**: crescer corais em estruturas artificiais
- **Biorock**: estruturas elétricas que aceleram crescimento
- **Corais resistentes**: seleção de variedades tolerantes ao calor

### Como Ajudar os Recifes

**Como Mergulhador/Turista:**
- Não tocar nos corais
- Usar protetor solar sem químicos prejudiciais
- Não comprar souvenirs de coral
- Escolher operadores responsáveis

**Como Cidadão:**
- Reduzir uso de plásticos
- Não usar pesticidas perto da costa
- Apoiar áreas marinhas protegidas
- Educar outros sobre a importância dos recifes

### Curiosidade Fascinante 🐠

O maior pólipo de coral já encontrado em Moçambique tinha o tamanho de um prato! Foi descoberto em Pemba e estima-se que tinha mais de 100 anos. Alguns corais podem viver mais de 1000 anos - são mais velhos que as primeiras chegadas dos portugueses a Moçambique!

### Experiência de Campo 🤿

**O Que Observar Durante um Mergulho:**
1. **Manhã**: peixes herbívoros pastando algas
2. **Meio-dia**: corais com pólipos retraídos (proteção solar)
3. **Tarde**: peixes predadores caçando
4. **Noite**: pólipos estendidos para se alimentar

Os recifes são mais ativos durante a noite - é quando realmente "ganham vida"!
      `
    }
  ]
};

// Dados de Oceanografia Geológica
export const oceanografiaGeologica: Subject = {
  id: 'geologica',
  title: 'Oceanografia Geológica',
  description: 'Formação e evolução dos fundos oceânicos',
  icon: 'mountain',
  color: 'deep',
  totalLessons: 10,
  estimatedHours: '7h',
  lessons: [
    {
      id: 'formacao-canal-mocambique',
      title: 'Formação do Canal de Moçambique',
      duration: '40 min',
      description: 'Como se formou o canal entre Moçambique e Madagascar',
      points: 25,
      keyPoints: [
        'Separação de Gondwana',
        'Deriva continental',
        'Estruturas geológicas submarinas',
        'Influência na circulação oceânica'
      ],
      content: `
## A História Épica do Nascimento do Nosso Canal 🗺️

Há 165 milhões de anos, onde hoje temos o Canal de Moçambique, existia terra seca! A história da formação deste canal é uma das mais fascinantes da geologia marinha africana.

### O Grande Continente Gondwana

**Era uma vez...**
África, América do Sul, Antártica, Austrália e Madagascar formavam um super-continente chamado Gondwana. Dinossauros caminhavam livremente entre o que hoje é Maputo e Antananarivo!

**O Início da Separação (165 Ma)**
- Forças internas da Terra começaram a "rasgar" Gondwana
- Magma quente subiu, criando rifts (fraturas)
- Madagascar começou a separar-se de África

### O Nascimento do Canal

**Fase 1: O Rift Continental (165-120 Ma)**
- Formação de um vale entre África e Madagascar
- Vulcanismo intenso na região
- Deposição de sedimentos continentais

**Fase 2: Primeira Inundação (120-84 Ma)**
- O rift alargou e aprofundou
- Água do oceano começou a entrar
- Formação de lagoas e mares rasos

**Fase 3: Canal Oceânico Moderno (84 Ma-presente)**
- Separação completa Madagascar-África
- Estabelecimento da circulação oceânica atual
- Desenvolvimento da topografia submarina moderna

### Características Geológicas Únicas

**Profundidade Variável:**
- Norte: 1000-2000 metros (zona mais rasa)
- Centro: 2000-3000 metros (zona mais profunda)
- Sul: 1500-2500 metros (zona intermediária)

**Montes Submarinos:**
- **Banco de Bassas da Índia**: atol submerso
- **Banco Europa**: plataforma calcária
- **Ilhas Juan de Nova**: origem vulcânica

**Sedimentos do Fundo:**
- **Lamas terrígenas**: vindas dos rios moçambicanos
- **Lamas calcárias**: esqueletos de organismos marinhos
- **Areias quartzosas**: erosão das montanhas costeiras

### Influência na Vida Marinha

**Circulação de Águas:**
A forma do canal cria corredores para as correntes:
- Corrente de Moçambique (sul)
- Corrente Equatorial Sul (norte)
- Turbulência que traz nutrientes à superfície

**Zonas de Ressurgência:**
- Águas profundas sobem junto às costas
- Trazem nutrientes essenciais
- Sustentam ecossistemas ricos

### Recursos Geológicos

**Hidrocarbonetos:**
- Bacias sedimentares de Rovuma e Moçambique
- Gás natural offshore
- Petróleo em formações profundas

**Minerais Marinhos:**
- Areias pesadas com titânio
- Nódulos de manganês (futuro recurso)
- Depósitos de fosfato

### Impacto nas Comunidades Costeiras

**Pesca:**
- Montes submarinos concentram peixes
- Correntes trazem nutrientes e larvas
- Zonas de pesca tradicional sobre bancos

**Navegação:**
- Canal profundo permite navegação de grande calado
- Porto de Maputo beneficia da profundidade natural
- Rotas comerciais internacionais

**Riscos Geológicos:**
- Sismos relacionados com falhas ativas
- Deslizamentos submarinos
- Tsunamis (risco baixo mas existente)

### Evolução Futura

**Movimento Contínuo:**
Madagascar continua a afastar-se de África a 2-3 cm por ano - a velocidade do crescimento das unhas!

**Mudanças Previstas:**
- Canal continuará a alargar
- Novas estruturas geológicas podem formar-se
- Impacto das mudanças climáticas na sedimentação

### Conexão com o Presente 🌍

Quando pescas em Vilanculos ou mergulhas em Tofo, estás a explorar o resultado de 165 milhões de anos de evolução geológica. Cada rocha, cada banco de areia, cada monte submarino conta a história épica da separação de continentes que moldou o nosso oceano!

### Curiosidade Geológica 💎

As famosas pedras preciosas de Moçambique (rubis, esmeraldas, turmalinas) formaram-se durante os processos geológicos que criaram o Canal de Moçambique, quando as altas temperaturas e pressões alteraram as rochas durante a separação continental!
      `
    }
  ]
};

// Dados de Oceanografia Química
export const oceanografiaQuimica: Subject = {
  id: 'quimica',
  title: 'Oceanografia Química',
  description: 'Composição química e processos dos oceanos',
  icon: 'beaker',
  color: 'coral',
  totalLessons: 8,
  estimatedHours: '6h',
  lessons: [
    {
      id: 'salinidade-aguas-mocambique',
      title: 'Salinidade das Águas Moçambicanas',
      duration: '30 min',
      description: 'Por que o mar é salgado e como varia a salinidade',
      points: 15,
      keyPoints: [
        'Origem da salinidade marinha',
        'Variação sazonal em Moçambique',
        'Influência dos rios',
        'Impacto na vida marinha'
      ],
      content: `
## Por Que o Nosso Mar é Salgado? 🧂

Já pensaste por que quando engoles água do mar em Xai-Xai ela tem aquele gosto salgado intenso? A história da salinidade dos oceanos é fascinante e tem impactos diretos na vida marinha de Moçambique.

### A Origem do Sal nos Oceanos

**Processo Milenar:**
1. **Erosão das Rochas**: Chuva dissolve minerais das rochas continentais
2. **Transporte Fluvial**: Rios levam minerais dissolvidos para o mar
3. **Concentração**: Água evapora, mas sais ficam no oceano
4. **Acumulação**: Processo continua há bilhões de anos

**Principais Sais:**
- **Cloreto de sódio (NaCl)**: 85% do sal marinho
- **Sulfato de magnésio**: importante para organismos
- **Cloreto de magnésio**: influencia densidade
- **Outros**: cálcio, potássio, brometo

### Salinidade no Canal de Moçambique

**Valores Típicos:**
- **Oceano Aberto**: 35 partes por mil (ppt)
- **Próximo à Costa**: 32-34 ppt
- **Estuários**: 15-30 ppt (mistura água doce/salgada)
- **Lagoas Costeiras**: muito variável

**Variação Sazonal:**

**Época Seca (Maio-Outubro):**
- Salinidade mais alta (34-35 ppt)
- Menos chuva = menos diluição
- Evaporação intensa

**Época Chuvosa (Novembro-Abril):**
- Salinidade mais baixa (32-34 ppt)
- Rios trazem água doce
- Exemplo: Zambeze baixa salinidade até 50 km da costa

### Influência dos Rios Principais

**Rio Zambeze:**
- Maior influência na costa central
- Cria pluma de água menos salgada
- Extensão varia com época do ano

**Rio Limpopo:**
- Influencia Baía de Maputo
- Mistura complexa na lagoa
- Gradiente salino visível

**Rios do Norte (Rovuma, Messalo):**
- Influência mais localizada
- Importantes para mangais
- Criam microambientes únicos

### Impacto na Vida Marinha

**Adaptações dos Organismos:**

**Peixes Marinhos:**
- Bebem água salgada e excretam sal pelas guelras
- Rins especializados
- Exemplo: robalo-gigante de Inhambane

**Peixes de Estuário:**
- Toleram variações de salinidade
- Migram entre água doce e salgada
- Exemplo: salmão africano do Zambeze

**Plantas Marinhas:**
- Algas adaptadas a alta salinidade
- Mangais toleram água salobra
- Ervas marinhas em diferentes zonas

### Salinidade e Densidade

**Princípio Físico:**
Água mais salgada é mais densa e tende a afundar

**Consequências:**
- Estratificação da coluna de água
- Circulação termohalina
- Transporte de nutrientes

**Exemplo Local:**
Na Baía de Maputo, água doce do Limpopo "flutua" sobre água salgada, criando duas camadas distintas que se podem observar durante mergulho!

### Impactos Humanos na Salinidade

**Mudanças Observadas:**
- Construção de barragens reduz aporte de água doce
- Irrigação intensiva concentra sais nos rios
- Mudanças climáticas alteram padrões de chuva

**Consequências:**
- Aumento da salinidade em alguns estuários
- Impacto na pesca artesanal
- Alteração de ecossistemas costeiros

### Medição da Salinidade 🔬

**Métodos Tradicionais:**
- Pescadores observam "cor" da água
- Mudanças no comportamento dos peixes
- Variação no gosto da água

**Métodos Científicos:**
- Condutivímetros eletrónicos
- Refratómetros
- Sensores automáticos

### Aplicações Práticas

**Para Aquacultura:**
- Camarão precisa de salinidade específica
- Monitoring em quintas de Maputo
- Optimização da produção

**Para Navegação:**
- Água mais salgada = maior flutuabilidade
- Cálculo de carga de navios
- Previsão de correntes

**Para Conservação:**
- Monitoring de ecossistemas estuarinos
- Proteção de mangais
- Gestão de áreas marinhas protegidas

### Curiosidade Salina 💡

Se evaporasses toda a água do Canal de Moçambique, ficarias com uma camada de sal de aproximadamente 40 metros de altura! É sal suficiente para temperar a comida de toda África durante 10.000 anos!

### Experiência Simples 🧪

**Teste Caseiro de Salinidade:**
1. Recolhe água do mar e água de um rio
2. Deixa evaporar ao sol em pratos separados
3. Observa os cristais de sal que ficam
4. Compara a quantidade - o mar deixará muito mais sal!
      `
    }
  ]
};

// Array principal de disciplinas exportado
export const subjects: Subject[] = [
  oceanografiaFisica,
  oceanografiaBiologica,
  oceanografiaGeologica,
  oceanografiaQuimica
];

export const subjectsData = {
  fisica: oceanografiaFisica,
  biologica: oceanografiaBiologica,
  geologica: oceanografiaGeologica,
  quimica: oceanografiaQuimica
};