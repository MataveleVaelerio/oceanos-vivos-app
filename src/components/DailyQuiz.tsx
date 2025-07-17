import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Clock, Award, CheckCircle, XCircle, Calendar, AlertTriangle } from "lucide-react";
import { subjects } from "@/data/subjects";
import { QuizTimer } from "./QuizTimer";
import { toast } from "@/hooks/use-toast";

interface DailyQuizProps {
  onBack: () => void;
  onComplete: (points: number) => void;
}

export const DailyQuiz = ({ onBack, onComplete }: DailyQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizResults, setQuizResults] = useState<boolean[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [dailyQuestions, setDailyQuestions] = useState<any[]>([]);
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    generateDailyQuiz();
  }, []);

  const generateDailyQuiz = () => {
    // Gerar quiz diário com 5 questões aleatórias de diferentes disciplinas
    const allQuestions: any[] = [];
    
    subjects.forEach(subject => {
      subject.lessons.forEach(lesson => {
        if (lesson.quiz) {
          lesson.quiz.questions.forEach(question => {
            allQuestions.push({
              ...question,
              subject: subject.title,
              subjectColor: subject.color
            });
          });
        }
      });
    });

    // Embaralhar e selecionar 5 questões
    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 5);
    
    // Embaralhar alternativas de cada questão
    const questionsWithShuffledOptions = selected.map(q => ({
      ...q,
      originalOptions: [...q.options],
      options: [...q.options].sort(() => Math.random() - 0.5),
      correctAnswer: q.options.findIndex((option: string) => option === q.originalOptions[q.correctAnswer])
    }));

    setDailyQuestions(questionsWithShuffledOptions);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const question = dailyQuestions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    setQuizResults([...quizResults, isCorrect]);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setSelectedAnswer(null);

    if (currentQuestion < dailyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    setQuizCompleted(true);
    const correctAnswers = quizResults.filter(result => result).length;
    const totalPoints = correctAnswers * 8; // Reduzido de 15 para 8 pontos
    
    toast({
      title: "Quiz Diário Concluído! 🎉",
      description: `Você acertou ${correctAnswers} de ${dailyQuestions.length} questões e ganhou ${totalPoints} pontos!`,
    });
    
    onComplete(totalPoints);
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    setShowExplanation(true);
    toast({
      title: "Tempo Esgotado! ⏰",
      description: "O quiz diário será finalizado automaticamente.",
      variant: "destructive",
    });
    
    setTimeout(() => {
      handleQuizComplete();
    }, 2000);
  };

  if (dailyQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>A gerar quiz diário...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (quizCompleted) {
    const correctAnswers = quizResults.filter(result => result).length;
    const totalQuestions = dailyQuestions.length;
    const percentage = (correctAnswers / totalQuestions) * 100;
    const earnedPoints = correctAnswers * 8; // Reduzido para 8 pontos

    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/20">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">✅ Quiz Diário Concluído com Sucesso! 🎉</h2>
                <p className="text-muted-foreground">
                  Parabéns por completar o desafio de hoje
                  {timeUp && " (tempo esgotado)"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-4 bg-gradient-surface">
                  <div className="text-2xl font-bold text-primary">{correctAnswers}/{totalQuestions}</div>
                  <div className="text-sm text-muted-foreground">Respostas Corretas</div>
                </Card>
                <Card className="p-4 bg-gradient-surface">
                  <div className="text-2xl font-bold text-primary">{percentage.toFixed(0)}%</div>
                  <div className="text-sm text-muted-foreground">Aproveitamento</div>
                </Card>
                <Card className="p-4 bg-gradient-surface">
                  <div className="text-2xl font-bold text-primary">+{earnedPoints}</div>
                  <div className="text-sm text-muted-foreground">Pontos Ganhos</div>
                </Card>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Volte amanhã para um novo desafio!
                </p>
                <Button variant="ocean" size="lg" onClick={onBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar ao Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const question = dailyQuestions[currentQuestion];
  
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Quiz Diário - {new Date().toLocaleDateString('pt-PT')}
                  {timeUp && <AlertTriangle className="ml-2 h-5 w-5 text-red-500" />}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Questão {currentQuestion + 1} de {dailyQuestions.length} • {question.subject}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <QuizTimer 
                  duration={300} // 5 minutos
                  onTimeUp={handleTimeUp}
                  isActive={!timeUp && !quizCompleted}
                />
                <Badge variant={question.difficulty === 'básico' ? 'secondary' : question.difficulty === 'médio' ? 'default' : 'destructive'}>
                  {question.difficulty}
                </Badge>
              </div>
            </div>
            <Progress value={((currentQuestion + 1) / dailyQuestions.length) * 100} className="mt-4" />
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-gradient-surface p-4 rounded-lg">
              <h3 className="text-lg font-medium">{question.question}</h3>
            </div>
            
            <div className="space-y-3">
              {question.options.map((option: string, index: number) => (
                <Card 
                  key={index}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedAnswer === index 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:bg-muted/50'
                  } ${showExplanation && index === question.correctAnswer ? 'border-green-500 bg-green-50' : ''}
                  ${showExplanation && selectedAnswer === index && index !== question.correctAnswer ? 'border-red-500 bg-red-50' : ''}`}
                  onClick={() => !showExplanation && !timeUp && handleAnswerSelect(index)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index ? 'border-primary bg-primary text-white' : 'border-muted-foreground'
                    }`}>
                      <span className="text-sm font-bold">
                        {String.fromCharCode(65 + index)}
                      </span>
                    </div>
                    <span>{option}</span>
                    {showExplanation && index === question.correctAnswer && (
                      <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                    )}
                    {showExplanation && selectedAnswer === index && index !== question.correctAnswer && (
                      <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {showExplanation && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">💡 Explicação:</h4>
                  <p>{question.explanation}</p>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Sair do Quiz
              </Button>
              
              {!showExplanation ? (
                <Button 
                  variant="ocean" 
                  onClick={handleSubmitAnswer} 
                  disabled={selectedAnswer === null || timeUp}
                >
                  {timeUp ? 'Tempo Esgotado' : 'Confirmar Resposta'}
                </Button>
              ) : (
                <Button variant="ocean" onClick={handleNextQuestion}>
                  {currentQuestion < dailyQuestions.length - 1 ? 'Próxima Questão' : 'Finalizar Quiz'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};