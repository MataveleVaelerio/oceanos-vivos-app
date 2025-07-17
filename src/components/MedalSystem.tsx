import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Medal, Award, Star } from "lucide-react";

export interface UserMedal {
  id: string;
  type: 'ouro' | 'prata' | 'bronze' | 'daily' | 'weekly' | 'level';
  title: string;
  description: string;
  achievedAt: Date;
  icon: string;
}

interface MedalSystemProps {
  medals: UserMedal[];
  userRanking?: number;
  className?: string;
}

export const MedalSystem = ({ medals, userRanking, className = "" }: MedalSystemProps) => {
  const getMedalIcon = (type: string) => {
    switch (type) {
      case 'ouro':
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 'prata':
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 'bronze':
        return <Award className="h-6 w-6 text-amber-600" />;
      case 'daily':
        return <Star className="h-6 w-6 text-blue-500" />;
      case 'weekly':
        return <Star className="h-6 w-6 text-purple-500" />;
      case 'level':
        return <Award className="h-6 w-6 text-green-500" />;
      default:
        return <Award className="h-6 w-6 text-gray-400" />;
    }
  };

  const getMedalColor = (type: string) => {
    switch (type) {
      case 'ouro':
        return 'from-yellow-400 to-yellow-600';
      case 'prata':
        return 'from-gray-300 to-gray-500';
      case 'bronze':
        return 'from-amber-500 to-amber-700';
      case 'daily':
        return 'from-blue-400 to-blue-600';
      case 'weekly':
        return 'from-purple-400 to-purple-600';
      case 'level':
        return 'from-green-400 to-green-600';
      default:
        return 'from-gray-300 to-gray-500';
    }
  };

  const recentMedals = medals.slice(0, 6);

  return (
    <div className={className}>
      {/* Ranking Atual */}
      {userRanking && userRanking <= 3 && (
        <Card className="mb-4 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-center space-x-3">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <div className="text-center">
                <h3 className="font-bold text-lg">
                  {userRanking === 1 ? '🥇 1º Lugar' : 
                   userRanking === 2 ? '🥈 2º Lugar' : '🥉 3º Lugar'}
                </h3>
                <p className="text-sm text-muted-foreground">Ranking Global</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Medalhas */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold flex items-center">
          <Award className="mr-2 h-5 w-5" />
          Medalhas ({medals.length})
        </h3>
        
        {medals.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-6 text-center">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">
                Complete desafios para ganhar medalhas!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {recentMedals.map((medal) => (
              <Card 
                key={medal.id} 
                className={`relative overflow-hidden border-2 transition-all hover:scale-105`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${getMedalColor(medal.type)} opacity-10`} />
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    {getMedalIcon(medal.type)}
                    <Badge variant="outline" className="text-xs">
                      {medal.type}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{medal.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {medal.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {medal.achievedAt.toLocaleDateString('pt-PT')}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {medals.length > 6 && (
          <Badge variant="outline" className="w-full justify-center py-2">
            +{medals.length - 6} medalhas adicionais
          </Badge>
        )}
      </div>
    </div>
  );
};