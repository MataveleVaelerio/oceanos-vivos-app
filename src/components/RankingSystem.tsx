import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Award, TrendingUp } from "lucide-react";

interface RankingUser {
  id: string;
  name: string;
  university: string;
  points: number;
  level: number;
  medalCount: number;
  completedLessons: number;
}

interface RankingSystemProps {
  users: RankingUser[];
  currentUserId: string;
  className?: string;
}

export const RankingSystem = ({ users, currentUserId, className = "" }: RankingSystemProps) => {
  // Ordenar usuários por pontos (decrescente)
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);
  
  // Top 3 + usuário atual se não estiver no top 3
  const currentUserRank = sortedUsers.findIndex(user => user.id === currentUserId) + 1;
  const currentUser = sortedUsers.find(user => user.id === currentUserId);
  
  const topThree = sortedUsers.slice(0, 3);
  const shouldShowCurrentUser = currentUserRank > 3;

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
            {position}
          </div>
        );
    }
  };

  const getRankBadge = (position: number) => {
    switch (position) {
      case 1:
        return <Badge className="bg-yellow-500 text-white">🥇 Campeão</Badge>;
      case 2:
        return <Badge className="bg-gray-400 text-white">🥈 Vice-Campeão</Badge>;
      case 3:
        return <Badge className="bg-amber-600 text-white">🥉 3º Lugar</Badge>;
      default:
        return <Badge variant="outline">{position}º lugar</Badge>;
    }
  };

  const formatInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Ranking Global
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Pódio Top 3 */}
          <div className="space-y-3">
            {topThree.map((user, index) => {
              const position = index + 1;
              const isCurrentUser = user.id === currentUserId;
              
              return (
                <Card
                  key={user.id}
                  className={`transition-all ${
                    isCurrentUser 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:shadow-md'
                  } ${position === 1 ? 'border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50' : ''}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getRankIcon(position)}
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary text-white text-sm">
                            {formatInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">
                            {user.name}
                            {isCurrentUser && <span className=" text-primary"> (Você)</span>}
                          </h4>
                          <p className="text-sm text-muted-foreground">{user.university}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {getRankBadge(position)}
                        <div className="mt-1 space-y-1">
                          <div className="text-lg font-bold text-primary">
                            {user.points.toLocaleString()} pts
                          </div>
                          <div className="flex space-x-2 text-xs text-muted-foreground">
                            <span>Nível {user.level}</span>
                            <span>•</span>
                            <span>{user.medalCount} medalhas</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Usuário atual se não estiver no top 3 */}
          {shouldShowCurrentUser && currentUser && (
            <>
              <div className="text-center text-sm text-muted-foreground py-2">
                ⋯
              </div>
              <Card className="ring-2 ring-primary bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getRankIcon(currentUserRank)}
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-white text-sm">
                          {formatInitials(currentUser.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">
                          {currentUser.name}
                          <span className="text-primary"> (Você)</span>
                        </h4>
                        <p className="text-sm text-muted-foreground">{currentUser.university}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getRankBadge(currentUserRank)}
                      <div className="mt-1 space-y-1">
                        <div className="text-lg font-bold text-primary">
                          {currentUser.points.toLocaleString()} pts
                        </div>
                        <div className="flex space-x-2 text-xs text-muted-foreground">
                          <span>Nível {currentUser.level}</span>
                          <span>•</span>
                          <span>{currentUser.medalCount} medalhas</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Estatísticas */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{sortedUsers.length}</div>
              <div className="text-xs text-muted-foreground">Estudantes</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary">
                {currentUserRank}º
              </div>
              <div className="text-xs text-muted-foreground">Sua Posição</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary">
                {Math.max(0, sortedUsers.length - currentUserRank)}
              </div>
              <div className="text-xs text-muted-foreground">Para Superar</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};