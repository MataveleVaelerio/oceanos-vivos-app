import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lesson, Question } from "@/data/subjects";
import { ArrowLeft, Clock, Award, CheckCircle, XCircle } from "lucide-react";

interface LessonViewerProps {
  lesson: Lesson;
  onBack: () => void;
  onComplete: (points: number) => void;
}

export const LessonViewer = ({ lesson, onBack, onComplete }: LessonViewerProps) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizResults, setQuizResults] = useState<boolean[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setCurrentQuestion(0);
    setQuizResults([]);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !lesson.quiz) return;

    const question = lesson.quiz.questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    setQuizResults([...quizResults, isCorrect]);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (!lesson.quiz) return;

    setShowExplanation(false);
    setSelectedAnswer(null);

    if (currentQuestion < lesson.quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      const correctAnswers = quizResults.filter(result => result).length;
      const totalPoints = correctAnswers * 10; // 10 pontos por resposta correta
      onComplete(lesson.points + totalPoints);
    }
  };

  const renderContent = () => {
    // Converter markdown simples para JSX
    const contentLines = lesson.content.split('\n');
    
    return contentLines.map((line, index) => {
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold mt-6 mb-4 text-primary">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-semibold mt-4 mb-3 text-foreground">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="font-semibold mt-3 mb-2">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.startsWith('- ')) {
        return <li key={index} className="ml-4 mb-1">{line.replace('- ', '')}</li>;
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="mb-2 leading-relaxed">{line}</p>;
    });
  };

  if (showQuiz && lesson.quiz && !quizCompleted) {
    const question = lesson.quiz.questions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    🧠 Quiz: {lesson.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Questão {currentQuestion + 1} de {lesson.quiz.questions.length}
                  </p>
                </div>
                <Badge variant={question.difficulty === 'básico' ? 'secondary' : question.difficulty === 'médio' ? 'default' : 'destructive'}>
                  {question.difficulty}
                </Badge>
              </div>
              <Progress value={((currentQuestion + 1) / lesson.quiz.questions.length) * 100} className="mt-4" />
            </CardHeader>
            
            <CardContent className="space-y-6">
              <h3 className="text-lg font-medium">{question.question}</h3>
              
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <Card 
                    key={index}
                    className={`p-4 cursor-pointer transition-all ${
                      selectedAnswer === index 
                        ? 'border-primary bg-primary/5' 
                        : 'hover:bg-muted/50'
                    } ${showExplanation && index === question.correctAnswer ? 'border-green-500 bg-green-50' : ''}
                    ${showExplanation && selectedAnswer === index && index !== question.correctAnswer ? 'border-red-500 bg-red-50' : ''}`}
                    onClick={() => !showExplanation && handleAnswerSelect(index)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === index ? 'border-primary bg-primary text-white' : 'border-muted-foreground'
                      }`}>
                        {selectedAnswer === index && <CheckCircle className="w-4 h-4" />}
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
                  Voltar à Lição
                </Button>
                
                {!showExplanation ? (
                  <Button 
                    variant="ocean" 
                    onClick={handleSubmitAnswer} 
                    disabled={selectedAnswer === null}
                  >
                    Confirmar Resposta
                  </Button>
                ) : (
                  <Button variant="ocean" onClick={handleNextQuestion}>
                    {currentQuestion < lesson.quiz.questions.length - 1 ? 'Próxima Questão' : 'Finalizar Quiz'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (quizCompleted && lesson.quiz) {
    const correctAnswers = quizResults.filter(result => result).length;
    const totalQuestions = lesson.quiz.questions.length;
    const percentage = (correctAnswers / totalQuestions) * 100;
    const earnedPoints = lesson.points + (correctAnswers * 10);

    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/20">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Quiz Concluído! 🎉</h2>
                <p className="text-muted-foreground">Parabéns por completar o quiz sobre {lesson.title}</p>
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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header da Lição */}
        <Card className="mb-6 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
              <Badge variant="secondary" className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                {lesson.duration}
              </Badge>
            </div>
            
            <CardTitle className="text-2xl mt-4">{lesson.title}</CardTitle>
            <p className="text-muted-foreground">{lesson.description}</p>
            
            {/* Pontos-chave */}
            <div className="flex flex-wrap gap-2 mt-4">
              {lesson.keyPoints.map((point, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {point}
                </Badge>
              ))}
            </div>
          </CardHeader>
        </Card>

        {/* Conteúdo da Lição */}
        <Card className="mb-6">
          <CardContent className="p-8 prose prose-lg max-w-none">
            {renderContent()}
          </CardContent>
        </Card>

        {/* Ações finais */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-2">Lição Concluída!</h3>
                <p className="text-sm text-muted-foreground">
                  Ganhou {lesson.points} pontos por ler esta lição
                </p>
              </div>
              
              <div className="flex space-x-3">
                {lesson.quiz && (
                  <Button variant="wave" onClick={handleStartQuiz}>
                    🧠 Fazer Quiz
                  </Button>
                )}
                <Button variant="ocean" onClick={() => onComplete(lesson.points)}>
                  <Award className="mr-2 h-4 w-4" />
                  Concluir Lição
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};