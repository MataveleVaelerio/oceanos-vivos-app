import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SocialFeed } from "@/components/SocialFeed";
import { ForumSection } from "@/components/ForumSection";
import { ChatSystem } from "@/components/ChatSystem";
import { AIAssistant } from "@/components/AIAssistant";
import { OceanHeader } from "@/components/OceanHeader";
import { 
  MessageSquare, 
  Users, 
  Bot, 
  TrendingUp,
  Award,
  Target,
  Calendar
} from "lucide-react";
import { mockUsers, type User } from "@/types/social";

export const SocialHub = () => {
  const [currentUser] = useState<User>(mockUsers[0]); // Ana Mondlane como usuário atual

  const quickStats = [
    {
      title: "Pontos Totais",
      value: currentUser.points,
      icon: Award,
      change: "+25 hoje"
    },
    {
      title: "Nível Atual", 
      value: currentUser.level,
      icon: Target,
      change: "85 pts para próximo"
    },
    {
      title: "Publicações",
      value: "12",
      icon: TrendingUp,
      change: "+3 esta semana"
    },
    {
      title: "Conectado há",
      value: "15 dias",
      icon: Calendar,
      change: "Sequência ativa"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <OceanHeader 
        userPoints={currentUser.points}
        userName={currentUser.name} 
        notifications={3}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-primary">{stat.change}</p>
                    </div>
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Abas Principais */}
        <Tabs defaultValue="feed" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
            <TabsTrigger value="feed" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Feed
            </TabsTrigger>
            <TabsTrigger value="forum" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Fórum
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              IA
            </TabsTrigger>
          </TabsList>

          {/* Feed Social */}
          <TabsContent value="feed">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <SocialFeed currentUser={currentUser} />
              </div>
              <div className="space-y-6">
                {/* Usuários Online */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Colegas Online
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockUsers.filter(u => u.isOnline && u.id !== currentUser.id).map(user => (
                        <div key={user.id} className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-primary">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.university}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {user.points} pts
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Desafios Ativos */}
                <Card className="bg-gradient-surface border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Desafio da Semana
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Biodiversidade Marinha</h4>
                      <p className="text-sm text-muted-foreground">
                        Identifica 5 espécies endémicas do Canal de Moçambique
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-wave text-white">+50 pontos</Badge>
                        <span className="text-xs text-muted-foreground">Termina em 3 dias</span>
                      </div>
                      <Button size="sm" className="w-full">
                        Participar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Fórum */}
          <TabsContent value="forum">
            <ForumSection currentUser={currentUser} />
          </TabsContent>

          {/* Chat */}
          <TabsContent value="chat">
            <ChatSystem currentUser={currentUser} />
          </TabsContent>

          {/* Assistente IA */}
          <TabsContent value="ai">
            <AIAssistant />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};