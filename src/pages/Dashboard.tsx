import { useState } from "react";
import { OceanHeader } from "@/components/OceanHeader";
import { SubjectCard } from "@/components/SubjectCard";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { SubjectDetail } from "@/components/SubjectDetail";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Waves, Fish, Mountain, Beaker, TrendingUp, BookOpen, MessageSquare } from "lucide-react";
import heroImage from "@/assets/hero-ocean.jpg";

const subjects = [
  {
    id: "fisica",
    title: "Oceanografia Física",
    description: "Explore as propriedades físicas do oceano: ondas, marés, correntes e temperatura. Descubra como estes fenômenos influenciam a vida marinha e o clima em Moçambique.",
    icon: Waves,
    color: "ocean" as const,
    progress: 15,
    totalLessons: 12,
    completedLessons: 2
  },
  {
    id: "biologica", 
    title: "Oceanografia Biológica",
    description: "Mergulhe no mundo da vida marinha: plâncton, peixes, corais e ecossistemas. Aprenda sobre a biodiversidade única do Canal de Moçambique.",
    icon: Fish,
    color: "wave" as const,
    progress: 30,
    totalLessons: 15,
    completedLessons: 4
  },
  {
    id: "geologica",
    title: "Oceanografia Geológica", 
    description: "Entenda a formação dos fundos oceânicos, sedimentos e a geologia costeira. Descubra como se formaram as ilhas e costas moçambicanas.",
    icon: Mountain,
    color: "deep" as const,
    progress: 8,
    totalLessons: 10,
    completedLessons: 1
  },
  {
    id: "quimica",
    title: "Oceanografia Química",
    description: "Analise a composição química da água do mar, nutrientes e poluição. Compreenda os impactos ambientais nas águas costeiras.",
    icon: Beaker,
    color: "coral" as const,
    progress: 0,
    totalLessons: 8,
    completedLessons: 0
  }
];

export const Dashboard = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState({
    currentLevel: "Aprendiz do Mar",
    nextLevel: "Guardião Costeiro", 
    currentPoints: 165,
    pointsToNext: 85,
    totalLessonsCompleted: 7,
    quizzesCompleted: 12
  });

  const handleSubjectStart = (subjectId: string) => {
    setSelectedSubject(subjectId);
  };

  const handlePointsEarned = (points: number) => {
    setUserProgress(prev => ({
      ...prev,
      currentPoints: prev.currentPoints + points,
      totalLessonsCompleted: prev.totalLessonsCompleted + 1
    }));
  };

  if (selectedSubject) {
    return (
      <SubjectDetail
        subjectId={selectedSubject}
        onBack={() => setSelectedSubject(null)}
        onPointsEarned={handlePointsEarned}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <OceanHeader 
        userPoints={userProgress.currentPoints}
        userName="Ana Mondlane" 
        notifications={3}
      />
      
      {/* Hero Section */}
      <section className="relative h-64 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Oceano Moçambicano" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold text-white mb-4">
                Bem-vinda aos Oceanos Vivos! 🌊
              </h1>
              <p className="text-xl text-white/90 mb-6">
                Mergulhe no fascinante mundo das ciências marinhas e explore os mistérios do Canal de Moçambique
              </p>
              <Button variant="wave" size="lg" className="animate-float">
                <BookOpen className="mr-2 h-5 w-5" />
                Continuar Aprendizagem
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal - Disciplinas */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Waves className="mr-3 h-6 w-6 text-primary" />
                Áreas de Estudo
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subjects.map((subject) => (
                  <SubjectCard
                    key={subject.id}
                    title={subject.title}
                    description={subject.description}
                    icon={subject.icon}
                    progress={subject.progress}
                    totalLessons={subject.totalLessons}
                    completedLessons={subject.completedLessons}
                    color={subject.color}
                    onStart={() => handleSubjectStart(subject.id)}
                  />
                ))}
              </div>
            </div>

            {/* Atividades Recentes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-3 h-5 w-5 text-primary" />
                  Atividade Recente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <p className="text-sm">Completou o quiz "Formação de Ondas" (+10 pontos)</p>
                    <span className="text-xs text-muted-foreground ml-auto">2h atrás</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <p className="text-sm">Leu a aula "Correntes do Canal de Moçambique" (+5 pontos)</p>
                    <span className="text-xs text-muted-foreground ml-auto">1 dia</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <p className="text-sm">Comentou no fórum "Biodiversidade Marinha" (+3 pontos)</p>
                    <span className="text-xs text-muted-foreground ml-auto">2 dias</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Progresso e Ações */}
          <div className="space-y-6">
            <ProgressIndicator {...userProgress} />
            
            {/* Ações Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Quiz Diário
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Fórum da Turma
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Fish className="mr-2 h-4 w-4" />
                  Glossário Marinho
                </Button>
              </CardContent>
            </Card>

            {/* Dica do Dia */}
            <Card className="bg-gradient-surface border-accent/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  💡 Dica do Dia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  <strong>Você sabia?</strong> As correntes marinhas do Canal de Moçambique transportam mais de 20 milhões de metros cúbicos de água por segundo - isso é mais de 100 vezes o fluxo do Rio Zambeze!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};