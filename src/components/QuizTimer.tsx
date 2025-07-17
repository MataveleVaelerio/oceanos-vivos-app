import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle } from "lucide-react";

interface QuizTimerProps {
  duration: number; // em segundos (5 minutos = 300 segundos)
  onTimeUp: () => void;
  isActive: boolean;
}

export const QuizTimer = ({ duration = 300, onTimeUp, isActive }: QuizTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onTimeUp]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getVariant = () => {
    if (timeLeft > 120) return "secondary"; // Verde
    if (timeLeft > 60) return "default"; // Azul  
    return "destructive"; // Vermelho
  };

  const isWarning = timeLeft <= 60;

  return (
    <Badge 
      variant={getVariant()} 
      className={`flex items-center space-x-2 px-3 py-1 text-sm font-mono ${
        isWarning ? 'animate-pulse' : ''
      }`}
    >
      {isWarning ? (
        <AlertTriangle className="h-4 w-4" />
      ) : (
        <Clock className="h-4 w-4" />
      )}
      <span>{formatTime(timeLeft)}</span>
    </Badge>
  );
};