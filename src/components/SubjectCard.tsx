import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface SubjectCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  color: "ocean" | "wave" | "deep" | "coral";
  onStart: () => void;
}

const colorVariants = {
  ocean: "from-blue-600 to-blue-800",
  wave: "from-teal-400 to-cyan-500", 
  deep: "from-blue-800 to-blue-900",
  coral: "from-orange-400 to-red-500"
};

export const SubjectCard = ({
  title,
  description,
  icon: Icon,
  progress,
  totalLessons,
  completedLessons,
  color,
  onStart
}: SubjectCardProps) => {
  return (
    <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-ocean border-accent/20">
      <CardHeader className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${colorVariants[color]} opacity-10 group-hover:opacity-20 transition-opacity`} />
        <div className="relative flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${colorVariants[color]} text-white shadow-lg`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <Badge variant="secondary" className="mt-1">
                {completedLessons}/{totalLessons} aulas
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <Button 
          variant={color} 
          className="w-full group-hover:scale-105 transition-transform"
          onClick={onStart}
        >
          {progress > 0 ? "Continuar Estudos" : "Começar Agora"}
        </Button>
      </CardContent>
    </Card>
  );
};