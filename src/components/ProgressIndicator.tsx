import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Target, BookOpen } from "lucide-react";

interface ProgressIndicatorProps {
  currentLevel: string;
  nextLevel: string;
  currentPoints: number;
  pointsToNext: number;
  totalLessonsCompleted: number;
  quizzesCompleted: number;
}

export const ProgressIndicator = ({
  currentLevel,
  nextLevel,
  currentPoints,
  pointsToNext,
  totalLessonsCompleted,
  quizzesCompleted
}: ProgressIndicatorProps) => {
  const progressPercentage = (currentPoints / (currentPoints + pointsToNext)) * 100;

  return (
    <Card className="bg-gradient-surface border-accent/30">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Nível Atual */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary rounded-full">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{currentLevel}</h3>
                <p className="text-sm text-muted-foreground">Nível atual</p>
              </div>
            </div>
            <Badge variant="default" className="bg-primary">
              {currentPoints} pontos
            </Badge>
          </div>

          {/* Progresso para próximo nível */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Próximo: {nextLevel}</span>
              <span className="font-medium">{pointsToNext} pontos restantes</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-accent/30">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">{totalLessonsCompleted}</p>
                <p className="text-xs text-muted-foreground">Aulas concluídas</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">{quizzesCompleted}</p>
                <p className="text-xs text-muted-foreground">Quizzes resolvidos</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};