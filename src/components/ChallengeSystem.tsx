import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Target, Trophy, Clock, Star, Award } from "lucide-react";
import { subjects } from "@/data/subjects";
import { toast } from "@/hooks/use-toast";

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly';
  target: number;
  current: number;
  points: number;
  deadline: Date;
  completed: boolean;
  icon: string;
}

interface ChallengeSystemProps {
  onComplete: (points: number) => void;
  userProgress: any;
}

export const ChallengeSystem = ({ onComplete, userProgress }: ChallengeSystemProps) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    generateChallenges();
  }, []);

  const generateChallenges = () => {
    const today = new Date();
    const weekFromToday = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const tomorrowFromToday = new Date(today.getTime() + 24 * 60 * 60 * 1000);

    const dailyChallenges: Challenge[] = [
      {
        id: 'daily-quiz-streak',
        title: 'Sequência Diária',
        description: 'Complete 3 quizzes consecutivos hoje',
        type: 'daily',
        target: 3,
        current: 0,
        points: 50,
        deadline: tomorrowFromToday,
        completed: false,
        icon: '🔥'
      },
      {
        id: 'daily-lesson-complete',
        title: 'Estudante Dedicado',
        description: 'Complete 2 lições hoje',
        type: 'daily',
        target: 2,
        current: 0,
        points: 40,
        deadline: tomorrowFromToday,
        completed: false,
        icon: '📚'
      },
      {
        id: 'daily-perfect-score',
        title: 'Perfeccionista',
        description: 'Acerte 100% em um quiz hoje',
        type: 'daily',
        target: 1,
        current: 0,
        points: 60,
        deadline: tomorrowFromToday,
        completed: false,
        icon: '🎯'
      }
    ];

    const weeklyChallenges: Challenge[] = [
      {
        id: 'weekly-ocean-explorer',
        title: 'Explorador dos Oceanos',
        description: 'Complete 10 lições em Oceanografia Física',
        type: 'weekly',
        target: 10,
        current: 0,
        points: 200,
        deadline: weekFromToday,
        completed: false,
        icon: '🌊'
      },
      {
        id: 'weekly-marine-biologist',
        title: 'Biólogo Marinho',
        description: 'Complete 8 lições em Oceanografia Biológica',
        type: 'weekly',
        target: 8,
        current: 0,
        points: 180,
        deadline: weekFromToday,
        completed: false,
        icon: '🐟'
      },
      {
        id: 'weekly-knowledge-seeker',
        title: 'Buscador de Conhecimento',
        description: 'Acumule 500 pontos esta semana',
        type: 'weekly',
        target: 500,
        current: userProgress.points || 0,
        points: 250,
        deadline: weekFromToday,
        completed: false,
        icon: '⭐'
      }
    ];

    setChallenges([...dailyChallenges, ...weeklyChallenges]);
  };

  const handleCompleteChallenge = (challengeId: string) => {
    setChallenges(prev => 
      prev.map(challenge => {
        if (challenge.id === challengeId && !challenge.completed) {
          toast({
            title: "Desafio Concluído! 🎉",
            description: `${challenge.title} - +${challenge.points} pontos`,
          });
          onComplete(challenge.points);
          return { ...challenge, completed: true, current: challenge.target };
        }
        return challenge;
      })
    );
  };

  const updateChallengeProgress = (challengeId: string, increment: number = 1) => {
    setChallenges(prev => 
      prev.map(challenge => {
        if (challenge.id === challengeId && !challenge.completed) {
          const newCurrent = Math.min(challenge.current + increment, challenge.target);
          const completed = newCurrent >= challenge.target;
          
          if (completed && !challenge.completed) {
            toast({
              title: "Desafio Concluído! 🎉",
              description: `${challenge.title} - +${challenge.points} pontos`,
            });
            onComplete(challenge.points);
          }
          
          return { 
            ...challenge, 
            current: newCurrent, 
            completed 
          };
        }
        return challenge;
      })
    );
  };

  const getDaysUntilDeadline = (deadline: Date) => {
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const dailyChallenges = challenges.filter(c => c.type === 'daily');
  const weeklyChallenges = challenges.filter(c => c.type === 'weekly');

  return (
    <div className="space-y-6">
      {/* Desafios Diários */}
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-primary" />
          Desafios Diários
        </h3>
        <div className="grid gap-4">
          {dailyChallenges.map(challenge => (
            <Card 
              key={challenge.id} 
              className={`transition-all ${
                challenge.completed 
                  ? 'border-green-500 bg-green-50' 
                  : 'hover:shadow-md'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{challenge.icon}</div>
                    <div>
                      <h4 className="font-semibold">{challenge.title}</h4>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={challenge.completed ? "default" : "secondary"}>
                      <Award className="mr-1 h-3 w-3" />
                      {challenge.points} pts
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">
                      <Clock className="inline mr-1 h-3 w-3" />
                      {getDaysUntilDeadline(challenge.deadline)}d restantes
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso</span>
                    <span>{challenge.current}/{challenge.target}</span>
                  </div>
                  <Progress 
                    value={(challenge.current / challenge.target) * 100} 
                    className="h-2"
                  />
                </div>

                {challenge.completed && (
                  <Badge variant="default" className="mt-3 bg-green-500">
                    ✅ Concluído
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Desafios Semanais */}
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Target className="mr-2 h-5 w-5 text-purple-500" />
          Desafios Semanais
        </h3>
        <div className="grid gap-4">
          {weeklyChallenges.map(challenge => (
            <Card 
              key={challenge.id} 
              className={`transition-all ${
                challenge.completed 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'hover:shadow-md'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{challenge.icon}</div>
                    <div>
                      <h4 className="font-semibold">{challenge.title}</h4>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={challenge.completed ? "default" : "secondary"} className="bg-purple-500 text-white">
                      <Trophy className="mr-1 h-3 w-3" />
                      {challenge.points} pts
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">
                      <Clock className="inline mr-1 h-3 w-3" />
                      {getDaysUntilDeadline(challenge.deadline)}d restantes
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso</span>
                    <span>{challenge.current}/{challenge.target}</span>
                  </div>
                  <Progress 
                    value={(challenge.current / challenge.target) * 100} 
                    className="h-2"
                  />
                </div>

                {challenge.completed && (
                  <Badge variant="default" className="mt-3 bg-purple-500">
                    ✅ Concluído
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Ações de Teste (temporário para demonstração) */}
      <Card className="border-dashed border-2">
        <CardContent className="p-4">
          <h4 className="font-semibold mb-3">Ações de Teste (Desenvolvimento)</h4>
          <div className="flex flex-wrap gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => updateChallengeProgress('daily-quiz-streak')}
            >
              +1 Quiz Feito
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => updateChallengeProgress('daily-lesson-complete')}
            >
              +1 Lição Concluída
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleCompleteChallenge('daily-perfect-score')}
            >
              Quiz Perfeito
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};