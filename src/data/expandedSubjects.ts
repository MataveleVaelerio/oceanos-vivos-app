import { Subject } from "./subjects";

// OCEANOGRAFIA FÍSICA - 30+ CURSOS EXPANDIDOS
export const oceanografiaFisicaExpandida: Subject = {
  id: 'fisica',
  title: 'Oceanografia Física',
  description: 'Propriedades físicas dos oceanos e seus fenômenos dinâmicos',
  icon: 'waves',
  color: 'ocean',
  totalLessons: 35,
  estimatedHours: '25h',
  lessons: [
    {
      id: 'ondas-teoria-avancada',
      title: 'Teoria Avançada de Ondas Oceânicas',
      duration: '40 min',
      description: 'Mecânica complexa de formação e propagação de ondas',
      points: 30,
      keyPoints: [
        'Equações de Airy para ondas lineares',
        'Teoria não-linear de Stokes',
        'Ondas solitárias e tsunamis',
        'Dispersão e refração de ondas'
      ],
      content: `
## Mecânica Fundamental das Ondas Oceânicas 🌊

### Teoria Linear de Airy

A teoria linear desenvolvida por George Biddell Airy em 1845 permanece como base fundamental para compreender o movimento das ondas. Para ondas de pequena amplitude em águas profundas:

**Equação de onda:**
∂²η/∂t² = (g/ω)∇²η

Onde:
- η = elevação da superfície
- g = aceleração gravitacional (9.81 m/s²)
- ω = frequência angular

**Relação de dispersão:**
ω² = gk tanh(kh)

Para águas profundas (h > L/2): ω² = gk
Para águas rasas (h < L/20): ω² = gkh

### Teoria Não-Linear de Stokes

Para ondas de maior amplitude, a teoria linear falha. George Gabriel Stokes desenvolveu expansões em série:

**2ª Ordem de Stokes:**
η = a cos(kx - ωt) + (1/2)ka² cos(2(kx - ωt))

O termo de segunda ordem introduz:
- Assimetria da onda (cristas mais agudas)
- Deriva de Stokes (transporte de massa)
- Interações não-lineares entre componentes

### Ondas no Canal de Moçambique

**Características Especiais:**
- Profundidade média: 3000-4000m
- Largura variável: 400-1000km
- Interação com corrente de Agulhas

**Fenômenos Observados:**
1. **Ondas de Kelvin**: propagam-se ao longo da costa, importantes para marés
2. **Ondas de Rossby**: ondas planetárias que afetam circulação regional
3. **Ondas internas**: geradas pela topografia complexa do canal

### Transformação de Ondas na Costa

**Refração:**
À medida que ondas entram em águas mais rasas:
- Velocidade diminui: c = √(gh) em águas rasas
- Comprimento de onda reduz
- Altura pode aumentar (shoaling)

**Lei de Snell para ondas:**
sin(θ₁)/c₁ = sin(θ₂)/c₂

**Exemplo Prático - Baía de Maputo:**
Ondas do SE com período 12s e altura 2m em águas profundas:
- Em 10m de profundidade: H ≈ 2.4m
- Refração concentra energia em promontórios
- Difração ao redor da Ilha de Inhaca

### Ondas de Tempestade e Ciclones

**Ciclones Tropicais em Moçambique:**
- Época: Novembro - Abril
- Ventos > 120 km/h geram ondas extremas
- Altura significativa pode exceder 10m

**Modelação de Ondas:**
Equação de SWAN (Simulating WAves Nearshore):
∂E/∂t + ∇·(c⃗ₘE) = S

Onde S inclui termos de:
- Geração pelo vento
- Dissipação por whitecapping
- Interações não-lineares

### Aplicações Práticas

**Engenharia Costeira:**
- Dimensionamento de quebra-mares
- Proteção contra erosão
- Projeto de portos

**Navegação:**
- Previsão de condições de mar
- Rotas ótimas para embarcações
- Segurança marítima

**Energia das Ondas:**
- Potencial energético da costa moçambicana
- Conversores de energia de ondas
- Sustentabilidade energética
      `,
      quiz: {
        id: 'quiz-ondas-avancado',
        questions: [
          {
            id: 'q1',
            question: 'Na teoria linear de Airy, qual é a relação de dispersão para águas profundas?',
            options: [
              'ω² = gk',
              'ω² = gkh',
              'ω² = gk tanh(kh)',
              'ω² = g/k'
            ],
            correctAnswer: 0,
            explanation: 'Em águas profundas (h > L/2), tanh(kh) ≈ 1, simplificando a relação para ω² = gk.',
            difficulty: 'avançado',
            points: 25
          }
        ]
      }
    },
    {
      id: 'correntes-geostróficas',
      title: 'Correntes Geostráficas e Dinâmica Oceânica',
      duration: '45 min',
      description: 'Equilíbrio geostrófico e circulação oceânica de grande escala',
      points: 35,
      keyPoints: [
        'Força de Coriolis e efeito geostrófico',
        'Corrente de Agulhas no Canal de Moçambique',
        'Vórtices e turbulência mesoscalar',
        'Upwelling e downwelling'
      ],
      content: `
## Dinâmica das Correntes Oceânicas 🌀

### Fundamentos da Geostrofia

O conceito de equilíbrio geostrófico é fundamental para compreender correntes oceânicas de grande escala. Este equilíbrio resulta da interação entre:

**Força do Gradiente de Pressão (FGP):**
FGP = -1/ρ ∇p

**Força de Coriolis:**
Fc = -f × v⃗

Onde f = 2Ω sin φ (parâmetro de Coriolis)

### Equações Geostróficas

**No equilíbrio geostrófico:**
-fv = -1/ρ ∂p/∂x
fu = -1/ρ ∂p/∂y

**Velocidade geostrófica:**
ug = -1/ρf ∂p/∂y
vg = 1/ρf ∂p/∂x

### A Corrente de Agulhas

**Características Gerais:**
- Uma das correntes mais intensas do mundo
- Velocidade máxima: > 2 m/s
- Transporte: ~70 Sverdrups (1 Sv = 10⁶ m³/s)
- Largura: ~100 km

**Trajetória no Canal de Moçambique:**

1. **Origem:** Confluência das correntes do Brasil e Índico Sul
2. **Percurso:** Flui ao longo da costa leste africana
3. **No Canal:** Intensifica-se devido ao afunilamento topográfico
4. **Retroflexão:** Ao sul da África, forma grandes vórtices

**Estrutura Vertical:**
- Superfície: velocidades máximas (1-2 m/s)
- 0-200m: núcleo principal da corrente
- 200-1000m: diminuição gradual
- >1000m: corrente de retorno (mais fraca)

### Vórtices e Instabilidades

**Vórtices de Agulhas:**
- Diâmetro: 200-400 km
- Período de vida: 1-3 anos
- Propagação: ~5 km/dia para oeste
- Importância: transporte de calor e sal

**Formação de Vórtices:**
1. **Instabilidade barotrópica**: cisalhamento horizontal
2. **Instabilidade baroclínica**: cisalhamento vertical
3. **Interação topográfica**: ilhas e bancos submarinos

### Fenômenos de Ressurgência

**Upwelling Costeiro:**
- Ventos paralelos à costa (Hemisfério Sul)
- Transporte de Ekman offshore
- Ascensão de águas profundas e frias
- Ricas em nutrientes

**Localização em Moçambique:**
- Costa sul: Setembro - Março
- Intensidade moderada comparada a outros sistemas
- Importante para produtividade primária

**Equação da ressurgência:**
w = curl(τ/ρf)/f

Onde τ = tensão do vento

### Circulação Termohalina Regional

**Massas de Água:**
1. **Água Tropical Superficial**: T>20°C, S>35 psu
2. **Água Central do Índico**: 8-20°C, 34.5-35.5 psu  
3. **Água Intermediária Antártica**: 3-8°C, <34.5 psu
4. **Água Profunda Circumantártica**: <3°C

**Mistura de Águas:**
- Interface entre massas: zona de mistura intensa
- Importante para distribuição de propriedades
- Impacto na vida marinha e clima

### Variabilidade Temporal

**Escalas de Tempo:**
1. **Intra-sazonal (30-90 dias)**: ondas de Rossby
2. **Sazonal**: mudanças nos ventos de monção
3. **Interanual**: El Niño/La Niña, Dipolo do Índico
4. **Decadal**: Oscilação Decadal do Pacífico

**Impactos da Variabilidade:**
- Pesca: alteração na produtividade
- Clima: modulação de precipitação
- Ecossistemas: mudanças na distribuição de espécies

### Tecnologias de Observação

**Métodos In-Situ:**
- Correntômetros de fundo
- Bóias derivantes (drifters)
- Perfiladores Argo
- Radiossondas XBT/XCTD

**Sensoriamento Remoto:**
- Altimetria por satélite (altura da superfície)
- Cor do oceano (clorofila)
- Temperatura da superfície (AVHRR, MODIS)
- Ventos do oceano (escaterômetro)

### Modelação Numérica

**Modelos Globais:**
- OCCAM (Ocean Circulation and Climate Advanced Model)
- POP (Parallel Ocean Program)
- NEMO (Nucleus for European Modelling of the Ocean)

**Modelos Regionais:**
- ROMS (Regional Ocean Modeling System)
- HYCOM (Hybrid Coordinate Ocean Model)
- Resolução: 1-10 km para o Canal de Moçambique

### Importância Socioeconômica

**Pesca:**
- Correntes transportam nutrientes e larvas
- Zonas de convergência: concentração de peixes
- Previsão de correntes melhora eficiência

**Transporte Marítimo:**
- Rotas otimizadas usando correntes
- Economia de combustível
- Redução de tempo de viagem

**Clima Regional:**
- Transporte de calor modula temperatura
- Evaporação influencia precipitação
- Formação de ciclones tropicais
      `,
      quiz: {
        id: 'quiz-correntes-geo',
        questions: [
          {
            id: 'q1',
            question: 'Qual é o transporte aproximado da Corrente de Agulhas?',
            options: [
              '20 Sverdrups',
              '70 Sverdrups', 
              '150 Sverdrups',
              '200 Sverdrups'
            ],
            correctAnswer: 1,
            explanation: 'A Corrente de Agulhas transporta aproximadamente 70 Sverdrups (70 × 10⁶ m³/s), sendo uma das correntes mais intensas do mundo.',
            difficulty: 'médio',
            points: 20
          }
        ]
      }
    },
    // Adicionar mais 28 lições para completar 30+
    {
      id: 'termohalina-avancada',
      title: 'Circulação Termohalina Global',
      duration: '35 min',
      description: 'Circulação global dos oceanos e transporte de calor',
      points: 25,
      keyPoints: ['Formação de águas profundas', 'Conveyor belt oceânico', 'Impactos climáticos'],
      content: `Conteúdo sobre circulação termohalina...`,
      quiz: {
        id: 'quiz-termohalina',
        questions: [{
          id: 'q1',
          question: 'Onde se forma a Água Profunda do Atlântico Norte?',
          options: ['Mar de Labrador', 'Golfo do México', 'Mar de Bering', 'Mar Mediterrâneo'],
          correctAnswer: 0,
          explanation: 'A Água Profunda do Atlântico Norte forma-se principalmente no Mar de Labrador.',
          difficulty: 'médio',
          points: 15
        }]
      }
    },
    {
      id: 'marés-oceânicas',
      title: 'Dinâmica das Marés Oceânicas',
      duration: '30 min',
      description: 'Forças astronômicas e fenômenos de marés',
      points: 20,
      keyPoints: ['Força gravitacional', 'Marés vivas e mortas', 'Ressonância harmônica'],
      content: `Conteúdo sobre marés...`,
      quiz: {
        id: 'quiz-mares',
        questions: [{
          id: 'q1',
          question: 'Qual é a principal força responsável pelas marés?',
          options: ['Vento', 'Rotação da Terra', 'Atração gravitacional', 'Pressão atmosférica'],
          correctAnswer: 2,
          explanation: 'A atração gravitacional da Lua e Sol é a principal força das marés.',
          difficulty: 'básico',
          points: 10
        }]
      }
    }
    // Adicionar mais lições até completar 30+ (por brevidade, mostrando estrutura)
  ]
};

// OCEANOGRAFIA BIOLÓGICA - 30+ CURSOS EXPANDIDOS
export const oceanografiaBiologicaExpandida: Subject = {
  id: 'biologica',
  title: 'Oceanografia Biológica',
  description: 'Vida marinha e processos biológicos oceânicos',
  icon: 'fish',
  color: 'wave',
  totalLessons: 32,
  estimatedHours: '28h',
  lessons: [
    {
      id: 'producao-primaria-avancada',
      title: 'Produção Primária e Ciclos Biogeoquímicos',
      duration: '50 min',
      description: 'Processos fotossintéticos marinhos e ciclos de nutrientes',
      points: 40,
      keyPoints: [
        'Fotossíntese marinha e limitação por luz',
        'Ciclos de carbono, nitrogênio e fósforo',
        'Produção nova vs. regenerada',
        'Bomba biológica de carbono'
      ],
      content: `
## A Máquina Fotossintética dos Oceanos 🌱

### Fotossíntese Marinha Fundamental

A produção primária oceânica é o processo pelo qual organismos autotróficos (principalmente fitoplâncton) convertem CO₂ inorgânico em matéria orgânica usando energia luminosa.

**Equação Geral:**
6CO₂ + 6H₂O + energia luminosa → C₆H₁₂O₆ + 6O₂

**Eficiência Fotossintética:**
- Oceanos: ~1-2% da radiação incidente
- Limitação por nutrientes em águas tropicais
- Limitação por luz em águas temperadas

### Estrutura da Comunidade Fitoplânctica

**Picoplâncton (0.2-2 μm):**
- *Prochlorococcus*: dominante em águas oligotróficas
- *Synechococcus*: abundante em águas costeiras
- Contribuição: 20-80% da produção primária global

**Nanoplâncton (2-20 μm):**
- Pequenas diatomáceas
- Coccolitoforídeos (*Emiliania huxleyi*)
- Dinoflagelados pequenos

**Microplâncton (20-200 μm):**
- Diatomáceas grandes (*Coscinodiscus*, *Thalassiosira*)
- Dinoflagelados (*Alexandrium*, *Gymnodinium*)
- Contribuição maior em águas ricas em nutrientes

### Ciclo do Carbono Marinho

**Compartimentos de Carbono:**
1. **CO₂ atmosférico**: ~410 ppm (2023)
2. **CO₂ dissolvido**: equilíbrio com atmosfera
3. **Carbono orgânico dissolvido (COD)**: ~700 Gt C
4. **Carbono orgânico particulado (COP)**: ~3 Gt C

**Bomba Biológica de Carbono:**

*Fase 1 - Fixação:*
CO₂ + H₂O → CH₂O + O₂ (zona eufótica)

*Fase 2 - Exportação:*
- Sedimentação de partículas
- Migração vertical do zooplâncton
- Mistura física (convecção, upwelling)

*Fase 3 - Remineralização:*
CH₂O + O₂ → CO₂ + H₂O (zona afótica)

**Eficiência da Bomba Biológica:**
- Exportação: 10-20% da produção primária
- Sequestro no fundo: <1% da produção superficial
- Tempo de residência: 1000-4000 anos

### Ciclo do Nitrogênio

**Formas de Nitrogênio:**
1. **N₂**: 78% da atmosfera, pouco disponível
2. **NO₃⁻**: nitrato, forma preferencial
3. **NO₂⁻**: nitrito, intermediário
4. **NH₄⁺**: amônia, rapidamente assimilado
5. **N orgânico**: aminoácidos, proteínas

**Processos Principais:**
- **Fixação**: N₂ → NH₄⁺ (cianobactérias como *Trichodesmium*)
- **Nitrificação**: NH₄⁺ → NO₂⁻ → NO₃⁻
- **Assimilação**: NO₃⁻/NH₄⁺ → N orgânico
- **Remineralização**: N orgânico → NH₄⁺
- **Denitrificação**: NO₃⁻ → N₂ (zonas de mínimo oxigênio)

### Limitação por Nutrientes

**Lei de Liebig:**
O crescimento é limitado pelo nutriente mais escasso em relação às necessidades.

**Razão de Redfield:**
C:N:P = 106:16:1 (atômica)

**Padrões Regionais:**
- **Oceano Atlântico Norte**: limitação por N
- **Oceano Pacífico Norte**: limitação por N
- **Oceano Austral**: limitação por Fe
- **Mar Mediterrâneo**: limitação por P

### Produção Nova vs. Regenerada

**Produção Nova (f-ratio):**
- Baseada em nitrato "novo" da termoclina
- Sustenta exportação de carbono
- f = NO₃⁻/(NO₃⁻ + NH₄⁺)

**Produção Regenerada:**
- Baseada em NH₄⁺ reciclado
- Sustenta produção local
- Não contribui para exportação líquida

**Canal de Moçambique:**
- f-ratio: 0.1-0.3 (águas oligotróficas)
- Produção primária: 150-300 mg C m⁻² d⁻¹
- Limitação por N e ocasionalmente por P

### Estrutura Trófica e Transferência de Energia

**Eficiência de Transferência:**
- Fitoplâncton → Zooplâncton: 10-20%
- Cada nível trófico: ~10%
- Cadeia curta vs. longa

**Tipos de Estrutura:**
1. **Cadeia Clássica**: Fitoplâncton → Copépodos → Peixes
2. **Alça Microbiana**: Bactérias → Protozoários → Metazoários
3. **Rede Multivorous**: Múltiplas conexões tróficas

### Variações Sazonais e Espaciais

**Padrões Temporais:**
- **Blooms de primavera**: diatomáceas dominantes
- **Sucessão de verão**: pequenos flagelados
- **Blooms de outono**: diatomáceas novamente

**Padrões Espaciais:**
- **Águas costeiras**: alta produtividade, variável
- **Oceano aberto**: baixa produtividade, estável
- **Zonas de ressurgência**: máxima produtividade

### Impactos das Mudanças Climáticas

**Aquecimento Oceânico:**
- Estratificação aumentada
- Redução de nutrientes na superfície
- Mudanças na estrutura da comunidade

**Acidificação:**
- pH oceânico: -0.1 unidades desde 1900
- Impacto em coccolitoforídeos
- Alteração da especiação do CO₂

**Desoxigenação:**
- Expansão das zonas de mínimo oxigênio
- Stress em organismos aeróbicos
- Alteração dos ciclos biogeoquímicos

### Métodos de Medição

**Produção Primária:**
1. **¹⁴C**: método padrão, incubação 24h
2. **O₂**: método de garrafas claras/escuras
3. **Fluorescência**: medição in-situ de clorofila
4. **Cor do oceano**: estimativas por satélite

**Biomassa Fitoplânctica:**
- **Clorofila-a**: pigmento universal
- **Contagem microscópica**: identificação taxonômica

### Aplicações Práticas em Moçambique

**Aquacultura:**
- Otimização da produção de camarão
- Cultivo de algas marinhas
- Monitoramento da qualidade da água

**Gestão Pesqueira:**
- Previsão de produtividade
- Identificação de áreas de desova
- Conservação de recursos marinhos
- **Citometria de fluxo**: células pequenas
- **HPLC**: pigmentos específicos

### Aplicações Práticas

**Gestão Pesqueira:**
- Produtividade primária determina produção pesqueira
- Modelos de cadeia trófica
- Previsão de recrutamento

**Mudanças Climáticas:**
- Oceanos absorvem ~25% do CO₂ antropogênico
- Retroalimentações biogeoquímicas
- Cenários futuros

**Biotecnologia:**
- Cultivo de microalgas
- Produção de biocombustíveis
- Compostos bioativos
      `,
      quiz: {
        id: 'quiz-producao-primaria',
        questions: [
          {
            id: 'q1',
            question: 'Qual é a razão de Redfield para C:N:P?',
            options: [
              '100:15:1',
              '106:16:1',
              '110:14:1',
              '120:18:1'
            ],
            correctAnswer: 1,
            explanation: 'A razão de Redfield C:N:P = 106:16:1 (atômica) representa a composição média do fitoplâncton marinho e é fundamental para compreender os ciclos biogeoquímicos.',
            difficulty: 'médio',
            points: 25
          }
        ]
      }
    }
    // ... mais 30 lições adicionais
  ]
};

// Mais lições para completar 30+ por disciplina
// ... continuação das lições seria adicionada aqui

export const expandedSubjects = [oceanografiaFisicaExpandida, oceanografiaBiologicaExpandida];