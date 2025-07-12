import { useState } from "react";
import { subjectsData, Subject, Lesson } from "@/data/subjects";
import { OceanHeader } from "@/components/OceanHeader";
import { LessonViewer } from "@/components/LessonViewer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Clock, Award, BookOpen, Brain } from "lucide-react";

interface SubjectDetailProps {
  subjectId: string;
  onBack: () => void;
  onPointsEarned: (points: number) => void;
}

export const SubjectDetail = ({ subjectId, onBack, onPointsEarned }: SubjectDetailProps) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const subject = subjectsData[subjectId as keyof typeof subjectsData];

  if (!subject) {
    return <div>Disciplina não encontrada</div>;
  }

  if (selectedLesson) {
    return (
      <LessonViewer
        lesson={selectedLesson}
        onBack={() => setSelectedLesson(null)}
        onComplete={(points) => {
          setCompletedLessons([...completedLessons, selectedLesson.id]);
          setSelectedLesson(null);
          onPointsEarned(points);
        }}
      />
    );
  }

  const progressPercentage = (completedLessons.length / subject.lessons.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <OceanHeader userPoints={250} userName="Ana Mondlane" notifications={3} />
      
      <div className="max-w-6xl mx-auto p-4 pt-8">
        {/* Header da Disciplina */}
        <Card className="mb-8 border-primary/20 bg-gradient-surface">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Dashboard
              </Button>
              <Badge variant="secondary" className="text-sm">
                {subject.estimatedHours} de estudo
              </Badge>
            </div>
            
            <CardTitle className="text-3xl mb-2">{subject.title}</CardTitle>
            <p className="text-lg text-muted-foreground mb-6">{subject.description}</p>
            
            {/* Progresso da Disciplina */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso Geral</span>
                <span className="font-medium">{progressPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {completedLessons.length} de {subject.lessons.length} lições concluídas
              </p>
            </div>
          </CardHeader>
        </Card>

        {/* Lista de Lições */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <BookOpen className="mr-3 h-6 w-6 text-primary" />
            Lições Disponíveis
          </h2>
          
          {subject.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isLocked = index > 0 && !completedLessons.includes(subject.lessons[index - 1].id);
            
            return (
              <Card 
                key={lesson.id} 
                className={`transition-all hover:shadow-wave ${
                  isLocked ? 'opacity-50' : 'hover:scale-[1.02] cursor-pointer'
                } ${isCompleted ? 'border-green-500 bg-green-50/50' : ''}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCompleted ? 'bg-green-500 text-white' : 
                          isLocked ? 'bg-gray-300 text-gray-500' : 'bg-primary text-white'
                        }`}>
                          {isCompleted ? '✓' : index + 1}
                        </div>
                        <h3 className="text-xl font-semibold">{lesson.title}</h3>
                        {isLocked && <Badge variant="secondary">🔒 Bloqueada</Badge>}
                        {isCompleted && <Badge variant="default" className="bg-green-500">✅ Concluída</Badge>}
                      </div>
                      
                      <p className="text-muted-foreground mb-4 ml-11">{lesson.description}</p>
                      
                      {/* Pontos-chave */}
                      <div className="flex flex-wrap gap-2 mb-4 ml-11">
                        {lesson.keyPoints.slice(0, 3).map((point, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {point}
                          </Badge>
                        ))}
                        {lesson.keyPoints.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{lesson.keyPoints.length - 3} mais
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {lesson.duration}
                        </div>
                        <div className="flex items-center">
                          <Award className="mr-1 h-3 w-3" />
                          {lesson.points} pts
                        </div>
                        {lesson.quiz && (
                          <div className="flex items-center">
                            <Brain className="mr-1 h-3 w-3" />
                            Quiz
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        variant={isCompleted ? "secondary" : "ocean"}
                        disabled={isLocked}
                        onClick={() => setSelectedLesson(lesson)}
                        className="min-w-[120px]"
                      >
                        {isCompleted ? 'Revisar' : isLocked ? 'Bloqueada' : 'Estudar'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Resumo da Disciplina */}
        <Card className="mt-8 bg-gradient-ocean text-white">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">📊 Resumo da Disciplina</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{subject.lessons.length}</div>
                <div className="text-sm opacity-90">Total de Lições</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{completedLessons.length}</div>
                <div className="text-sm opacity-90">Concluídas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{subject.estimatedHours}</div>
                <div className="text-sm opacity-90">Horas de Estudo</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {subject.lessons.reduce((total, lesson) => total + lesson.points, 0)}
                </div>
                <div className="text-sm opacity-90">Pontos Disponíveis</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};