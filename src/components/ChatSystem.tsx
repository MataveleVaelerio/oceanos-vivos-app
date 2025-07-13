import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  Send, 
  Search, 
  Phone, 
  Video, 
  MoreVertical,
  Clock
} from "lucide-react";
import { type ChatConversation, type ChatMessage, type User, mockUsers } from "@/types/social";

interface ChatSystemProps {
  currentUser: User;
}

const mockConversations: ChatConversation[] = [
  {
    id: '1',
    participants: ['1', '2'],
    participantNames: ['Ana Mondlane', 'Carlos Mutola'],
    lastMessage: {
      id: '1',
      senderId: '2',
      senderName: 'Carlos Mutola',
      receiverId: '1',
      content: 'Obrigado pela explicação sobre as correntes!',
      timestamp: new Date('2024-07-12T15:30:00'),
      isRead: false
    },
    unreadCount: 1
  }
];

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    senderId: '1',
    senderName: 'Ana Mondlane',
    receiverId: '2',
    content: 'Olá Carlos! Vi o teu comentário sobre poluição marinha. Muito interessante!',
    timestamp: new Date('2024-07-12T14:15:00'),
    isRead: true
  },
  {
    id: '2',
    senderId: '2',
    senderName: 'Carlos Mutola',
    receiverId: '1',
    content: 'Olá Ana! Sim, é um tema que me preocupa muito. Podes me explicar mais sobre as correntes do Canal?',
    timestamp: new Date('2024-07-12T14:20:00'),
    isRead: true
  },
  {
    id: '3',
    senderId: '1',
    senderName: 'Ana Mondlane',
    receiverId: '2',
    content: 'Claro! As correntes do Canal de Moçambique são influenciadas principalmente pelos ventos sazonais e pela topografia submarina. A corrente principal flui para sul...',
    timestamp: new Date('2024-07-12T14:25:00'),
    isRead: true
  },
  {
    id: '4',
    senderId: '2',
    senderName: 'Carlos Mutola',
    receiverId: '1',
    content: 'Obrigado pela explicação sobre as correntes!',
    timestamp: new Date('2024-07-12T15:30:00'),
    isRead: false
  }
];

export const ChatSystem = ({ currentUser }: ChatSystemProps) => {
  const [conversations, setConversations] = useState<ChatConversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const selectedConversationData = conversations.find(c => c.id === selectedConversation);
  const conversationMessages = messages.filter(m => 
    selectedConversationData?.participants.includes(m.senderId) &&
    selectedConversationData?.participants.includes(m.receiverId)
  );

  const otherUser = selectedConversationData ? 
    mockUsers.find(u => u.id !== currentUser.id && selectedConversationData.participants.includes(u.id)) :
    null;

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation || !otherUser) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      receiverId: otherUser.id,
      content: newMessage,
      timestamp: new Date(),
      isRead: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Atualizar a conversa
    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation
        ? { ...conv, lastMessage: message }
        : conv
    ));
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-PT', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex h-[600px] border rounded-lg overflow-hidden">
      {/* Lista de Conversas */}
      <div className="w-1/3 border-r bg-muted/30">
        <div className="p-4 border-b">
          <h3 className="font-semibold mb-3">Mensagens</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Pesquisar conversas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-9"
            />
          </div>
        </div>
        
        <ScrollArea className="h-[calc(100%-120px)]">
          <div className="p-2">
            {conversations.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-sm">
                  Nenhuma conversa ainda
                </p>
              </div>
            ) : (
              conversations.map((conversation) => {
                const otherParticipant = mockUsers.find(u => 
                  u.id !== currentUser.id && conversation.participants.includes(u.id)
                );
                
                return (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors mb-2 ${
                      selectedConversation === conversation.id 
                        ? 'bg-primary/10 border border-primary/20' 
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={otherParticipant?.avatar} />
                          <AvatarFallback>
                            {otherParticipant?.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {otherParticipant?.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm truncate">
                            {otherParticipant?.name}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(conversation.lastMessage.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage.content}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <Badge variant="outline" className="text-xs">
                            {otherParticipant?.university}
                          </Badge>
                          {conversation.unreadCount > 0 && (
                            <Badge className="bg-primary text-xs px-1.5 h-5">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Área de Chat */}
      <div className="flex-1 flex flex-col">
        {selectedConversation && otherUser ? (
          <>
            {/* Header do Chat */}
            <div className="p-4 border-b bg-background">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={otherUser.avatar} />
                    <AvatarFallback>
                      {otherUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{otherUser.name}</p>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${otherUser.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span className="text-sm text-muted-foreground">
                        {otherUser.isOnline ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Mensagens */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {conversationMessages.map((message) => {
                  const isCurrentUser = message.senderId === currentUser.id;
                  return (
                    <div 
                      key={message.id}
                      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] rounded-lg p-3 ${
                        isCurrentUser 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          isCurrentUser 
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            {/* Input de Mensagem */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Escreve a tua mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">Seleciona uma conversa</h3>
              <p className="text-muted-foreground">
                Escolhe uma conversa para começar a trocar mensagens
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};