import { Waves, User, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface OceanHeaderProps {
  userPoints?: number;
  userName?: string;
  notifications?: number;
  onNotificationClick?: () => void;
}

export const OceanHeader = ({ 
  userPoints = 0, 
  userName = "Estudante", 
  notifications = 0,
  onNotificationClick
}: OceanHeaderProps) => {
  return (
    <header className="bg-gradient-ocean shadow-ocean border-b border-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo e Nome */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Waves className="h-8 w-8 text-white animate-wave" />
              <div className="absolute inset-0 animate-ripple opacity-30">
                <Waves className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Oceanos Vivos</h1>
              <p className="text-xs text-white/80">Ciências Marinhas</p>
            </div>
          </div>

          {/* Pontuação e Perfil */}
          <div className="flex items-center space-x-4">
            {/* Pontos */}
            <div className="hidden sm:flex items-center space-x-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                ⭐ {userPoints} pontos
              </Badge>
            </div>

            {/* Notificações */}
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 relative" onClick={onNotificationClick}>
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-coral text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* Perfil */}
            <Button variant="ghost" className="text-white hover:bg-white/20 flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">{userName}</span>
            </Button>

            {/* Menu Mobile */}
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 sm:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};