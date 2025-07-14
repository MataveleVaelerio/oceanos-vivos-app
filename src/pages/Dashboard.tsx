import { useState, useEffect } from "react";
import { OceanHeader } from "@/components/OceanHeader";
import { SubjectCard } from "@/components/SubjectCard";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { SubjectDetail } from "@/components/SubjectDetail";
import { AuthForm } from "@/components/auth/AuthForm";
import { DailyQuiz } from "@/components/DailyQuiz";
import { WeeklyChallenge } from "@/components/WeeklyChallenge";
import { MarineGlossary } from "@/components/MarineGlossary";
import { NotificationCenter } from "@/components/NotificationCenter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Waves, Fish, Mountain, Beaker, TrendingUp, BookOpen, MessageSquare, Users, LogOut, Bell, Target } from "lucide-react";
import { subjects } from "@/data/subjects";
import heroImage from "@/assets/hero-ocean.jpg";


export const Dashboard = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'quiz' | 'challenge' | 'glossary' | 'notifications'>('dashboard');
  const [user, setUser] = useState<any>(null);
  const [userProgress, setUserProgress] = useState({
    currentLevel: "Aprendiz do Mar",
    nextLevel: "Guardião Costeiro", 
    currentPoints: 0,
    pointsToNext: 150,
    totalLessonsCompleted: 0,
    quizzesCompleted: 0
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setUserProgress(prev => ({
        ...prev,
        currentPoints: userData.pontos || 165
      }));
    }
  }, []);

  const handleAuth = (userData: any) => {
    // Reset progress for new users
    const newUserProgress = {
      currentLevel: "Aprendiz do Mar",
      nextLevel: "Guardião Costeiro", 
      currentPoints: 0,
      pointsToNext: 150,
      totalLessonsCompleted: 0,
      quizzesCompleted: 0
    };
    
    setUser(userData);
    setUserProgress(newUserProgress);
    
    // Save reset progress to localStorage
    const updatedUser = { ...userData, pontos: 0 };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleSubjectStart = (subjectId: string) => {
    setSelectedSubject(subjectId);
  };

  const handlePointsEarned = (points: number) => {
    const newPoints = userProgress.currentPoints + points;
    setUserProgress(prev => ({
      ...prev,
      currentPoints: newPoints,
      totalLessonsCompleted: prev.totalLessonsCompleted + 1
    }));
    
    // Update user in localStorage
    if (user) {
      const updatedUser = { ...user, pontos: newPoints };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  if (!user) {
    return <AuthForm onAuth={handleAuth} />;
  }

  if (selectedSubject) {
    return (
      <SubjectDetail
        subjectId={selectedSubject}
        onBack={() => setSelectedSubject(null)}
        onPointsEarned={handlePointsEarned}
      />
    );
  }

  if (currentView === 'quiz') {
    return <DailyQuiz onBack={() => setCurrentView('dashboard')} onComplete={handlePointsEarned} />;
  }

  if (currentView === 'challenge') {
    return <WeeklyChallenge onBack={() => setCurrentView('dashboard')} onComplete={handlePointsEarned} />;
  }

  if (currentView === 'glossary') {
    return <MarineGlossary onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'notifications') {
    return <NotificationCenter onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <OceanHeader 
        userPoints={userProgress.currentPoints}
        userName={user.nome} 
        notifications={3}
        onNotificationClick={() => setCurrentView('notifications')}
      />
      
      {/* User Header */}
      <div className="bg-card/50 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-primary">Bem-vindo, {user.nome}!</h2>
            <p className="text-sm text-muted-foreground">{user.universidade} - {user.curso}</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>
      
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
                    icon={subject.icon === "waves" ? Waves : subject.icon === "fish" ? Fish : subject.icon === "mountain" ? Mountain : Beaker}
                    progress={Math.floor(Math.random() * 30)}
                    totalLessons={subject.totalLessons}
                    completedLessons={Math.floor(Math.random() * 5)}
                    color={subject.color as any}
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
                <Button variant="outline" className="w-full justify-start" onClick={() => setCurrentView('quiz')}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Quiz Diário
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setCurrentView('challenge')}>
                  <Target className="mr-2 h-4 w-4" />
                  Desafio Semanal
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/social">
                    <Users className="mr-2 h-4 w-4" />
                    Rede Social
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setCurrentView('glossary')}>
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