import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, BookOpen, Filter } from "lucide-react";

interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
  scientificName?: string;
  synonyms?: string[];
  relatedTerms?: string[];
}

interface MarineGlossaryProps {
  onBack: () => void;
}

export const MarineGlossary = ({ onBack }: MarineGlossaryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const glossaryTerms: GlossaryTerm[] = [
    {
      term: "Abissal",
      definition: "Relativo às grandes profundidades oceânicas, geralmente entre 3000-6000m. Zona caracterizada por completa ausência de luz, temperaturas baixas (2-4°C) e pressões extremas.",
      category: "Física",
      relatedTerms: ["Batial", "Hadal", "Zona Afótica"]
    },
    {
      term: "Agulhas",
      definition: "Corrente oceânica quente que flui ao longo da costa leste da África do Sul, transportando águas tropicais do Oceano Índico. Fundamental para o clima regional e circulação global.",
      category: "Física",
      relatedTerms: ["Corrente", "Retroflexão", "Vórtices"]
    },
    {
      term: "Acidificação Oceânica",
      definition: "Processo contínuo de diminuição do pH dos oceanos causado pela absorção de CO₂ atmosférico. O pH oceânico diminuiu de 8.2 para 8.1 desde a era pré-industrial.",
      category: "Química",
      relatedTerms: ["pH", "Carbonato de Cálcio", "Saturação de Aragonite"]
    },
    {
      term: "Afloramento (Upwelling)",
      definition: "Movimento ascendente de águas profundas, ricas em nutrientes, para a superfície. Essential para produtividade primária e suporte de ecossistemas marinhos.",
      category: "Física",
      relatedTerms: ["Nutrientes", "Produtividade Primária", "Termoclina"]
    },
    {
      term: "Algas Calcárias",
      definition: "Algas que depositam carbonato de cálcio nas suas estruturas, importantes na formação de recifes e como indicadores de saúde dos ecossistemas coralinos.",
      category: "Biológica",
      scientificName: "Rhodophyta calcárias",
      relatedTerms: ["Recifes de Coral", "Carbonato de Cálcio", "Coralinas"]
    },
    {
      term: "Anóxia",
      definition: "Condição de completa ausência de oxigénio dissolvido na água do mar. Pode ocorrer naturalmente em algumas bacias ou ser induzida por eutrofização.",
      category: "Química",
      relatedTerms: ["Hipóxia", "Zona Morta", "Eutrofização"]
    },
    {
      term: "Aragonite",
      definition: "Forma cristalina do carbonato de cálcio utilizada por corais, moluscos e outros organismos marinhos para construção de esqueletos e conchas.",
      category: "Química",
      relatedTerms: ["Calcite", "Carbonato de Cálcio", "Saturação"]
    },
    {
      term: "Atol",
      definition: "Formação coralina em forma de anel que envolve uma lagoa central, geralmente formada sobre vulcões submersos ou montes submarinos.",
      category: "Geológica",
      relatedTerms: ["Recife de Coral", "Lagoa", "Subsistência"]
    },
    {
      term: "Batimetria",
      definition: "Estudo e medição das profundidades oceânicas e topografia do fundo marinho. Essencial para navegação, estudos geológicos e compreensão da circulação oceânica.",
      category: "Geológica",
      relatedTerms: ["Topografia Submarina", "Sonar", "Cartografia Marinha"]
    },
    {
      term: "Biomassa",
      definition: "Quantidade total de matéria orgânica presente numa determinada área ou volume de água, expressa geralmente em peso seco por unidade de área ou volume.",
      category: "Biológica",
      relatedTerms: ["Produtividade", "Cadeia Alimentar", "Fitoplâncton"]
    },
    {
      term: "Branqueamento de Corais",
      definition: "Processo pelo qual corais expelem suas zooxantelas simbióticas devido ao stress, resultando na perda de cor e fonte de energia do coral.",
      category: "Biológica",
      relatedTerms: ["Zooxantelas", "Stress Térmico", "Simbiose"]
    },
    {
      term: "Cianobactérias",
      definition: "Bactérias fotossintéticas também conhecidas como algas azuis-verdes. Algumas espécies podem formar blooms tóxicos em condições de eutrofização.",
      category: "Biológica",
      scientificName: "Cyanobacteria",
      relatedTerms: ["Bloom Algal", "Toxinas", "Fotossíntese"]
    },
    {
      term: "Circulação Termohalina",
      definition: "Circulação oceânica global impulsionada por diferenças de densidade causadas por variações de temperatura e salinidade. Também conhecida como 'correia transportadora global'.",
      category: "Física",
      relatedTerms: ["Densidade", "Salinidade", "Correntes Profundas"]
    },
    {
      term: "Convergência",
      definition: "Zona onde duas massas de água ou correntes se encontram, geralmente resultando em movimento descendente de água e concentração de material flutuante.",
      category: "Física",
      relatedTerms: ["Divergência", "Frontes Oceânicos", "Subsidência"]
    },
    {
      term: "Diatomáceas",
      definition: "Algas unicelulares com esqueleto silicoso, constituindo grande parte do fitoplâncton e base da cadeia alimentar marinha. Importante indicador de qualidade da água.",
      category: "Biológica",
      scientificName: "Diatomeae",
      relatedTerms: ["Fitoplâncton", "Sílica", "Produtores Primários"]
    },
    {
      term: "Dinoflagelados",
      definition: "Protistas unicelulares flagelados que constituem parte importante do fitoplâncton. Algumas espécies causam marés vermelhas e produzem toxinas perigosas.",
      category: "Biológica",
      scientificName: "Dinoflagellata",
      relatedTerms: ["Maré Vermelha", "Toxinas", "HAB"]
    },
    {
      term: "Ecótono",
      definition: "Zona de transição entre dois ecossistemas diferentes, caracterizada pela mistura de espécies de ambos os sistemas e frequentemente alta biodiversidade.",
      category: "Biológica",
      relatedTerms: ["Biodiversidade", "Gradiente", "Zona de Transição"]
    },
    {
      term: "El Niño",
      definition: "Fenómeno climático caracterizado pelo aquecimento anormal das águas superficiais do Pacífico equatorial, com impactos globais no clima e ecossistemas marinhos.",
      category: "Física",
      relatedTerms: ["La Niña", "ENSO", "Oscilação Climática"]
    },
    {
      term: "Endémico",
      definition: "Espécie que ocorre naturalmente apenas numa região geográfica específica. Moçambique possui muitas espécies marinhas endémicas no Canal de Moçambique.",
      category: "Biológica",
      relatedTerms: ["Biodiversidade", "Conservação", "Especiação"]
    },
    {
      term: "Epipelágico",
      definition: "Zona superficial do oceano (0-200m) onde ocorre fotossíntese. Também conhecida como zona eufótica ou fótica, caracterizada pela presença de luz solar.",
      category: "Física",
      relatedTerms: ["Zona Fótica", "Fotossíntese", "Termoclina"]
    },
    {
      term: "Estuário",
      definition: "Corpo de água costeiro semi-fechado onde a água doce do rio se mistura com a água salgada do mar, criando gradientes únicos de salinidade e nutrientes.",
      category: "Física",
      relatedTerms: ["Salinidade", "Gradiente", "Zona de Mistura"]
    },
    {
      term: "Eutrofização",
      definition: "Processo de enriquecimento excessivo de nutrientes (especialmente azoto e fósforo) que pode levar ao crescimento descontrolado de algas e depleção de oxigénio.",
      category: "Química",
      relatedTerms: ["Nutrientes", "Bloom Algal", "Hipóxia"]
    },
    {
      term: "Fitoplâncton",
      definition: "Organismos microscópicos fotossintéticos que flutuam na coluna de água, formando a base da cadeia alimentar marinha e produzindo grande parte do oxigénio atmosférico.",
      category: "Biológica",
      relatedTerms: ["Produtores Primários", "Zooplâncton", "Clorofila"]
    },
    {
      term: "Frente Oceânica",
      definition: "Zona de contacto entre duas massas de água com características diferentes (temperatura, salinidade, densidade), frequentemente associada a alta atividade biológica.",
      category: "Física",
      relatedTerms: ["Massa de Água", "Gradiente", "Convergência"]
    },
    {
      term: "Giro Oceânico",
      definition: "Sistema circular de correntes oceânicas em larga escala, impulsionado por ventos e força de Coriolis. O Oceano Índico possui um giro subtropical característico.",
      category: "Física",
      relatedTerms: ["Correntes", "Coriolis", "Circulação"]
    },
    {
      term: "Haloclina",
      definition: "Zona na coluna de água onde ocorre rápida mudança de salinidade com a profundidade, geralmente coincidente com a termoclina nos oceanos tropicais.",
      category: "Física",
      relatedTerms: ["Salinidade", "Termoclina", "Estratificação"]
    },
    {
      term: "Hipóxia",
      definition: "Condição de baixas concentrações de oxigénio dissolvido (<2 mg/L), que pode ser letal para muitos organismos marinhos e alterar ecossistemas.",
      category: "Química",
      relatedTerms: ["Anóxia", "Zona Morta", "Oxigénio Dissolvido"]
    },
    {
      term: "Isotérmico",
      definition: "Condição ou camada de água onde a temperatura permanece constante, comum em águas profundas e durante mistura vertical completa.",
      category: "Física",
      relatedTerms: ["Temperatura", "Mistura Vertical", "Estratificação"]
    },
    {
      term: "Lagoa Costeira",
      definition: "Corpo de água costeiro raso, parcialmente isolado do oceano por barreiras sedimentares, comum na costa de Moçambique e importante para biodiversidade.",
      category: "Geológica",
      relatedTerms: ["Barreira", "Sedimentação", "Ecossistema Costeiro"]
    },
    {
      term: "Maré Vermelha",
      definition: "Floração de algas (geralmente dinoflagelados) que pode produzir toxinas e colorir a água, causando mortandade de peixes e riscos para a saúde humana.",
      category: "Biológica",
      relatedTerms: ["HAB", "Dinoflagelados", "Biotoxinas"]
    },
    {
      term: "Mesopelagico",
      definition: "Zona oceânica entre 200-1000m de profundidade, caracterizada por pouca luz (zona disótica) e importante migração vertical diária de organismos.",
      category: "Física",
      relatedTerms: ["Zona Disótica", "Migração Vertical", "Twilight Zone"]
    },
    {
      term: "Monção",
      definition: "Sistema de ventos sazonais que influencia fortemente o clima e oceanografia do Oceano Índico, alterando padrões de correntes e precipitação.",
      category: "Física",
      relatedTerms: ["Ventos Sazonais", "Correntes", "Clima Tropical"]
    },
    {
      term: "Nécton",
      definition: "Organismos aquáticos que nadam ativamente e podem mover-se independentemente das correntes, incluindo peixes, cefalópodes e mamíferos marinhos.",
      category: "Biológica",
      relatedTerms: ["Plâncton", "Bentos", "Migração Ativa"]
    },
    {
      term: "Nutriclina",
      definition: "Zona na coluna de água onde ocorre rápido aumento da concentração de nutrientes com a profundidade, geralmente abaixo da termoclina.",
      category: "Química",
      relatedTerms: ["Nutrientes", "Termoclina", "Zona Eufótica"]
    },
    {
      term: "Ossificação",
      definition: "Processo de formação de estruturas calcárias ou silicosas em organismos marinhos, influenciado pela saturação mineral da água do mar.",
      category: "Química",
      relatedTerms: ["Carbonato de Cálcio", "Saturação", "Esqueleto"]
    },
    {
      term: "Pelágico",
      definition: "Relativo à coluna de água aberta, longe do fundo marinho. Inclui organismos e processos que ocorrem na massa de água oceânica.",
      category: "Física",
      relatedTerms: ["Coluna de Água", "Bentónico", "Oceano Aberto"]
    },
    {
      term: "Picoplâncton",
      definition: "Plâncton de tamanho muito pequeno (0.2-2 μm), incluindo bactérias e arqueas marinhas que desempenham papel fundamental nos ciclos biogeoquímicos.",
      category: "Biológica",
      relatedTerms: ["Nanoplâncton", "Microplâncton", "Alça Microbiana"]
    },
    {
      term: "Produtividade Primária",
      definition: "Taxa de produção de matéria orgânica pelos organismos fotossintéticos, medida geralmente em carbono fixado por unidade de área e tempo.",
      category: "Biológica",
      relatedTerms: ["Fotossíntese", "Carbono", "Fitoplâncton"]
    },
    {
      term: "Quimiossíntese",
      definition: "Processo pelo qual alguns organismos produzem energia utilizando compostos químicos em vez da luz solar, comum em ambientes de águas profundas.",
      category: "Química",
      relatedTerms: ["Fotossíntese", "Hidrotermalismo", "Bactérias"]
    },
    {
      term: "Ressurgência",
      definition: "Movimento ascendente de águas profundas ricas em nutrientes, crucial para a produtividade de ecossistemas costeiros e pesca.",
      category: "Física",
      synonyms: ["Upwelling"],
      relatedTerms: ["Nutrientes", "Produtividade", "Pesca"]
    },
    {
      term: "Salinidade",
      definition: "Medida da quantidade total de sais dissolvidos na água do mar, expressa em unidades práticas de salinidade (PSU) ou g/kg.",
      category: "Química",
      relatedTerms: ["Densidade", "Condutividade", "Haloclina"]
    },
    {
      term: "Sedimentação",
      definition: "Processo de deposição de partículas sólidas no fundo marinho, fundamental para a formação de rochas sedimentares e preservação de fósseis.",
      category: "Geológica",
      relatedTerms: ["Erosão", "Transporte", "Deposição"]
    },
    {
      term: "Simbiose",
      definition: "Relação próxima entre diferentes espécies, como a associação entre corais e zooxantelas, fundamental para o funcionamento de ecossistemas tropicais.",
      category: "Biológica",
      relatedTerms: ["Zooxantelas", "Mutualismo", "Corais"]
    },
    {
      term: "Termoclina",
      definition: "Zona na coluna de água onde ocorre rápida diminuição da temperatura com a profundidade, geralmente entre 100-1000m nos oceanos tropicais.",
      category: "Física",
      relatedTerms: ["Temperatura", "Estratificação", "Mistura Vertical"]
    },
    {
      term: "Tsunami",
      definition: "Onda oceânica de longo período gerada por perturbações súbitas do fundo marinho, como terremotos, erupções vulcânicas ou deslizamentos.",
      category: "Física",
      relatedTerms: ["Ondas", "Sismologia", "Geologia Marinha"]
    },
    {
      term: "Turbidez",
      definition: "Medida da claridade da água, influenciada pela presença de partículas em suspensão como sedimentos, plâncton ou matéria orgânica.",
      category: "Física",
      relatedTerms: ["Transparência", "Sedimentos", "Disco de Secchi"]
    },
    {
      term: "Upwelling",
      definition: "Movimento ascendente de águas profundas e frias ricas em nutrientes para a superfície, fundamental para a alta produtividade em certas regiões costeiras.",
      category: "Física",
      synonyms: ["Ressurgência", "Afloramento"],
      relatedTerms: ["Nutrientes", "Produtividade", "Ventos"]
    },
    {
      term: "Vórtice",
      definition: "Estrutura circular de movimento de água, podendo ser ciclónica (anti-horária no hemisfério sul) ou anticiclónica, importante para transporte e mistura oceânica.",
      category: "Física",
      relatedTerms: ["Correntes", "Rotação", "Mistura"]
    },
    {
      term: "Zona Afótica",
      definition: "Região oceânica onde não penetra luz solar suficiente para fotossíntese (>200m), caracterizada por dependência de material orgânico produzido na superfície.",
      category: "Física",
      relatedTerms: ["Zona Fótica", "Fotossíntese", "Produção Primária"]
    },
    {
      term: "Zona Morta",
      definition: "Área oceânica com concentrações de oxigénio tão baixas que não suportam vida animal, geralmente resultado de eutrofização ou circulação restrita.",
      category: "Química",
      relatedTerms: ["Hipóxia", "Anóxia", "Eutrofização"]
    },
    {
      term: "Zooplâncton",
      definition: "Animais microscópicos e pequenos que flutuam na coluna de água, incluindo copépodes, krill e larvas de peixes, essenciais na cadeia alimentar marinha.",
      category: "Biológica",
      relatedTerms: ["Fitoplâncton", "Cadeia Alimentar", "Copépodes"]
    },
    {
      term: "Zooxantelas",
      definition: "Algas simbióticas que vivem nos tecidos de corais e outros organismos, fornecendo energia através da fotossíntese em troca de abrigo e nutrientes.",
      category: "Biológica",
      scientificName: "Symbiodinium spp.",
      relatedTerms: ["Simbiose", "Corais", "Fotossíntese"]
    }
  ];

  const categories = ["all", "Física", "Química", "Biológica", "Geológica"];

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter(term => {
      const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           term.synonyms?.some(syn => syn.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "all" || term.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const getCategoryColor = (category: string) => {
    const colors = {
      Física: "bg-ocean",
      Química: "bg-coral",
      Biológica: "bg-wave",
      Geológica: "bg-deep"
    };
    return colors[category as keyof typeof colors] || "bg-muted";
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
              <Badge variant="secondary">{filteredTerms.length} termos</Badge>
            </div>
            
            <CardTitle className="flex items-center mt-4">
              <BookOpen className="mr-2 h-6 w-6" />
              Glossário de Ciências Marinhas
            </CardTitle>
            
            <p className="text-muted-foreground">
              Dicionário técnico especializado em oceanografia e ciências marinhas, 
              com foco nos ecossistemas de Moçambique e Oceano Índico.
            </p>
          </CardHeader>
        </Card>

        {/* Filtros e Pesquisa */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar termos, definições ou sinónimos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <div className="flex space-x-2">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category === "all" ? "Todos" : category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Termos do Glossário */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTerms.map((term, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{term.term}</CardTitle>
                  <Badge className={getCategoryColor(term.category)}>
                    {term.category}
                  </Badge>
                </div>
                {term.scientificName && (
                  <p className="text-sm italic text-muted-foreground">
                    {term.scientificName}
                  </p>
                )}
              </CardHeader>
              
              <CardContent className="space-y-3">
                <p className="text-sm leading-relaxed">{term.definition}</p>
                
                {term.synonyms && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">
                      Sinónimos:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {term.synonyms.map((synonym, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {synonym}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {term.relatedTerms && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">
                      Termos Relacionados:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {term.relatedTerms.map((related, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {related}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">Nenhum termo encontrado</h3>
              <p className="text-sm text-muted-foreground">
                Tente ajustar os filtros ou usar termos de pesquisa diferentes.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};