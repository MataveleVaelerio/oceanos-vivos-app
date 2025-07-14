import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Target, Calendar, Award, Clock, Users } from "lucide-react";

interface WeeklyChallengeProps {
  onBack: () => void;
  onComplete: (points: number) => void;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'médio' | 'avançado' | 'expert';
  points: number;
  timeLimit: string;
  tasks: string[];
  requirements: string[];
  category: string;
}

export const WeeklyChallenge = ({ onBack, onComplete }: WeeklyChallengeProps) => {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [completedTasks, setCompletedTasks] = useState<boolean[]>([]);
  const [challengeCompleted, setChallengeCompleted] = useState(false);

  const weeklyVariant = [
    {
      id: 'biodiversidade-canal',
      title: 'Biodiversidade do Canal de Moçambique',
      description: 'Identifique e caracterize 8 espécies endémicas do Canal de Moçambique, explicando sua importância ecológica e adaptações ao ambiente local.',
      difficulty: 'avançado' as const,
      points: 75,
      timeLimit: '7 dias',
      category: 'Oceanografia Biológica',
      tasks: [
        'Identifique 3 espécies de corais endémicas',
        'Liste 2 espécies de peixes pelágicos característicos',
        'Descreva 2 espécies de mamíferos marinhos',
        'Caracterize 1 espécie de tartaruga marinha',
        'Explique adaptações de cada espécie ao seu nicho',
        'Relate importância ecológica no ecossistema',
        'Analise ameaças e estratégias de conservação',
        'Apresente dados sobre distribuição geográfica'
      ],
      requirements: [
        'Usar fontes científicas credíveis',
        'Incluir nomes científicos corretos', 
        'Citar estudos específicos da região',
        'Relacionar com correntes oceânicas'
      ]
    },
    {
      id: 'correntes-agulhas',
      title: 'Dinâmica da Corrente de Agulhas',
      description: 'Analise os mecanismos de formação, propagação e impactos da Corrente de Agulhas no sistema climático regional.',
      difficulty: 'expert' as const,
      points: 100,
      timeLimit: '7 dias',
      category: 'Oceanografia Física',
      tasks: [
        'Descreva mecanismos de formação',
        'Calcule transporte de volume médio',
        'Analise variabilidade sazonal',
        'Explique interação com vórtices',
        'Relate impactos no clima regional',
        'Avalie influência na circulação global',
        'Discuta métodos de observação',
        'Proponha estratégias de monitorização'
      ],
      requirements: [
        'Usar dados oceanográficos reais',
        'Aplicar conceitos de dinâmica dos fluidos',
        'Citar literatura científica recente',
        'Incluir análise quantitativa'
      ]
    },
    {
      id: 'acidificacao-oceanos',
      title: 'Acidificação nos Oceanos Tropicais',
      description: 'Investigue os processos de acidificação oceânica na região tropical do Oceano Índico e seus impactos locais.',
      difficulty: 'médio' as const,
      points: 60,
      timeLimit: '7 dias',
      category: 'Oceanografia Química',
      tasks: [
        'Explique mecanismos químicos da acidificação',
        'Analise dados de pH regional',
        'Avalie impactos em organismos calcificadores',
        'Relate efeitos nos ecossistemas de coral',
        'Discuta variações sazonais',
        'Proponha métodos de monitorização',
        'Sugira estratégias de mitigação'
      ],
      requirements: [
        'Usar equações químicas relevantes',
        'Interpretar dados de carbono oceânico',
        'Citar estudos do Oceano Índico',
        'Relacionar com mudanças climáticas'
      ]
    },
    {
      id: 'sedimentacao-continental',
      title: 'Sedimentação na Margem Continental',
      description: 'Analise os processos sedimentares na margem continental de Moçambique e sua evolução geológica.',
      difficulty: 'avançado' as const,
      points: 85,
      timeLimit: '7 dias',
      category: 'Oceanografia Geológica',
      tasks: [
        'Caracterize tipos de sedimentos',
        'Analise processos de transporte',
        'Descreva padrões de deposição',
        'Explique evolução da margem continental',
        'Relacione com história geológica regional',
        'Discuta influência de rios',
        'Avalie potencial económico',
        'Proponha métodos de estudo'
      ],
      requirements: [
        'Usar classificação sedimentar padrão',
        'Incluir análise temporal',
        'Citar estudos geológicos regionais',
        'Aplicar princípios estratigráficos'
      ]
    }
  ];

  useEffect(() => {
    generateWeeklyChallenge();
  }, []);

  const generateWeeklyChallenge = () => {
    // Selecionar desafio baseado na semana do ano para consistência
    const weekNumber = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)) % weeklyVariant.length;
    const selectedChallenge = weeklyVariant[weekNumber];
    
    setCurrentChallenge(selectedChallenge);
    setCompletedTasks(new Array(selectedChallenge.tasks.length).fill(false));
  };

  const handleTaskToggle = (taskIndex: number) => {
    const newCompletedTasks = [...completedTasks];
    newCompletedTasks[taskIndex] = !newCompletedTasks[taskIndex];
    setCompletedTasks(newCompletedTasks);
  };

  const handleCompleteChallenge = () => {
    if (!currentChallenge) return;
    
    const completedCount = completedTasks.filter(Boolean).length;
    const totalTasks = completedTasks.length;
    
    if (completedCount >= totalTasks * 0.8) { // 80% das tarefas devem estar completas
      setChallengeCompleted(true);
      const earnedPoints = Math.floor((completedCount / totalTasks) * currentChallenge.points);
      onComplete(earnedPoints);
    }
  };

  if (!currentChallenge) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>A carregar desafio da semana...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (challengeCompleted) {
    const completedCount = completedTasks.filter(Boolean).length;
    const totalTasks = completedTasks.length;
    const percentage = (completedCount / totalTasks) * 100;
    const earnedPoints = Math.floor(percentage * currentChallenge.points / 100);

    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/20">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Desafio Concluído! 🏆</h2>
                <p className="text-muted-foreground">Excelente trabalho no desafio da semana</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-4 bg-gradient-surface">
                  <div className="text-2xl font-bold text-primary">{completedCount}/{totalTasks}</div>
                  <div className="text-sm text-muted-foreground">Tarefas Completas</div>
                </Card>
                <Card className="p-4 bg-gradient-surface">
                  <div className="text-2xl font-bold text-primary">{percentage.toFixed(0)}%</div>
                  <div className="text-sm text-muted-foreground">Progresso</div>
                </Card>
                <Card className="p-4 bg-gradient-surface">
                  <div className="text-2xl font-bold text-primary">+{earnedPoints}</div>
                  <div className="text-sm text-muted-foreground">Pontos Ganhos</div>
                </Card>
              </div>

              <Button variant="ocean" size="lg" onClick={onBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const completedCount = completedTasks.filter(Boolean).length;
  const progress = (completedCount / currentChallenge.tasks.length) * 100;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
              <Badge variant={currentChallenge.difficulty === 'médio' ? 'default' : currentChallenge.difficulty === 'avançado' ? 'secondary' : 'destructive'}>
                {currentChallenge.difficulty}
              </Badge>
            </div>
            
            <CardTitle className="flex items-center mt-4">
              <Target className="mr-2 h-6 w-6" />
              {currentChallenge.title}
            </CardTitle>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {currentChallenge.timeLimit}
              </div>
              <div className="flex items-center">
                <Award className="mr-1 h-4 w-4" />
                {currentChallenge.points} pontos
              </div>
              <Badge variant="outline">{currentChallenge.category}</Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Descrição e Progresso */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Descrição do Desafio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{currentChallenge.description}</p>
                
                <h4 className="font-semibold mb-2">Requisitos:</h4>
                <ul className="space-y-1">
                  {currentChallenge.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Tarefas */}
            <Card>
              <CardHeader>
                <CardTitle>Tarefas do Desafio</CardTitle>
                <Progress value={progress} className="mt-2" />
                <p className="text-sm text-muted-foreground mt-1">
                  {completedCount} de {currentChallenge.tasks.length} tarefas completas
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentChallenge.tasks.map((task, index) => (
                  <Card key={index} className="p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start space-x-3">
                      <Button
                        variant={completedTasks[index] ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleTaskToggle(index)}
                        className="mt-0.5"
                      >
                        {completedTasks[index] ? '✓' : index + 1}
                      </Button>
                      <div className="flex-1">
                        <p className={`${completedTasks[index] ? 'line-through text-muted-foreground' : ''}`}>
                          {task}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gradient-surface border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Estatísticas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{progress.toFixed(0)}%</div>
                  <div className="text-sm text-muted-foreground">Progresso Atual</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">{completedCount}/{currentChallenge.tasks.length}</div>
                  <div className="text-sm text-muted-foreground">Tarefas Completas</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Button 
                  variant="ocean" 
                  size="lg" 
                  onClick={handleCompleteChallenge}
                  disabled={completedCount < currentChallenge.tasks.length * 0.8}
                  className="w-full"
                >
                  <Award className="mr-2 h-4 w-4" />
                  Concluir Desafio
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Complete pelo menos 80% das tarefas
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};