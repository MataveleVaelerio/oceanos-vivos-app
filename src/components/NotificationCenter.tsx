import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bell, Calendar, Award, MessageSquare, BookOpen, Users, AlertCircle } from "lucide-react";

interface Notification {
  id: string;
  type: 'quiz' | 'achievement' | 'social' | 'lesson' | 'challenge' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
}

interface NotificationCenterProps {
  onBack: () => void;
  onNavigate?: (url: string) => void;
}

export const NotificationCenter = ({ onBack, onNavigate }: NotificationCenterProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'challenge',
      title: 'Novo Desafio Semanal Disponível',
      message: 'O desafio "Biodiversidade do Canal de Moçambique" já está disponível. Complete-o para ganhar 75 pontos!',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min atrás
      read: false,
      actionUrl: '/weekly-challenge',
      actionText: 'Ver Desafio'
    },
    {
      id: '2',
      type: 'achievement',
      title: 'Conquista Desbloqueada!',
      message: 'Parabéns! Completou 10 quizzes e ganhou a medalha "Estudante Dedicado". +50 pontos de bónus.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2h atrás
      read: false
    },
    {
      id: '3',
      type: 'social',
      title: 'Nova Publicação no Fórum',
      message: 'Carlos Nhantumbo publicou uma pergunta interessante sobre "Correntes de Agulhas" no fórum de Oceanografia Física.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4h atrás
      read: false,
      actionUrl: '/social',
      actionText: 'Ver Fórum'
    },
    {
      id: '4',
      type: 'quiz',
      title: 'Quiz Diário Disponível',
      message: 'O quiz diário de hoje está pronto! Teste os seus conhecimentos e ganhe até 75 pontos.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6h atrás
      read: true,
      actionUrl: '/daily-quiz',
      actionText: 'Fazer Quiz'
    },
    {
      id: '5',
      type: 'lesson',
      title: 'Nova Aula Desbloqueada',
      message: 'Ganhou acesso à aula "Ondas Internas no Canal de Moçambique" em Oceanografia Física.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 dia atrás
      read: true,
      actionUrl: '/lessons',
      actionText: 'Ver Aula'
    },
    {
      id: '6',
      type: 'social',
      title: 'Comentário na Sua Publicação',
      message: 'Maria Santos comentou na sua publicação sobre "Recifes de Coral em Moçambique".',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 dias atrás
      read: true,
      actionUrl: '/social',
      actionText: 'Ver Comentário'
    },
    {
      id: '7',
      type: 'system',
      title: 'Atualização do Sistema',
      message: 'Novas funcionalidades foram adicionadas ao glossário marinho. Explore mais de 100 termos técnicos!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 dias atrás
      read: true,
      actionUrl: '/glossary',
      actionText: 'Explorar Glossário'
    },
    {
      id: '8',
      type: 'achievement',
      title: 'Nível Subido!',
      message: 'Evoluiu para "Guardião Costeiro"! Desbloqueou novas aulas e funcionalidades especiais.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 dias atrás
      read: true
    }
  ]);

  const getNotificationIcon = (type: string) => {
    const icons = {
      quiz: BookOpen,
      achievement: Award,
      social: MessageSquare,
      lesson: BookOpen,
      challenge: Calendar,
      system: AlertCircle
    };
    return icons[type as keyof typeof icons] || Bell;
  };

  const getNotificationColor = (type: string) => {
    const colors = {
      quiz: "text-blue-500",
      achievement: "text-yellow-500",
      social: "text-green-500",
      lesson: "text-purple-500",
      challenge: "text-orange-500",
      system: "text-gray-500"
    };
    return colors[type as keyof typeof colors] || "text-gray-500";
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      quiz: "Quiz",
      achievement: "Conquista",
      social: "Social",
      lesson: "Aula",
      challenge: "Desafio",
      system: "Sistema"
    };
    return labels[type as keyof typeof labels] || type;
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, read: true }
          : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.actionUrl && onNavigate) {
      onNavigate(notification.actionUrl);
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins} min atrás`;
    } else if (diffHours < 24) {
      return `${diffHours}h atrás`;
    } else {
      return `${diffDays} dias atrás`;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button variant="outline" size="sm" onClick={markAllAsRead}>
                    Marcar todas como lidas
                  </Button>
                )}
                <Badge variant={unreadCount > 0 ? "destructive" : "secondary"}>
                  {unreadCount} não lidas
                </Badge>
              </div>
            </div>
            
            <CardTitle className="flex items-center mt-4">
              <Bell className="mr-2 h-6 w-6" />
              Central de Notificações
            </CardTitle>
            
            <p className="text-muted-foreground">
              Mantenha-se atualizado com todas as atividades e novidades do Oceanos Vivos.
            </p>
          </CardHeader>
        </Card>

        {/* Filtros rápidos */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 overflow-x-auto">
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                Filtrar por:
              </span>
              <div className="flex space-x-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  Todas ({notifications.length})
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  Não lidas ({unreadCount})
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  Conquistas ({notifications.filter(n => n.type === 'achievement').length})
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  Social ({notifications.filter(n => n.type === 'social').length})
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Notificações */}
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            const iconColor = getNotificationColor(notification.type);
            
            return (
              <Card 
                key={notification.id}
                className={`transition-all hover:shadow-md cursor-pointer ${
                  !notification.read ? 'border-primary/50 bg-primary/5' : 'hover:bg-muted/30'
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    <div className={`p-2 rounded-full bg-muted ${iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                            {notification.title}
                          </h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {getTypeLabel(notification.type)}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                          </div>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {notification.message}
                      </p>
                      
                      {notification.actionUrl && (
                        <div className="pt-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNotificationClick(notification);
                            }}
                          >
                            {notification.actionText || 'Ver Mais'}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {notifications.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">Nenhuma notificação</h3>
              <p className="text-sm text-muted-foreground">
                Quando tiver atividades novas, elas aparecerão aqui.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};