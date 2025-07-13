import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Bot, 
  Send, 
  Sparkles, 
  BookOpen, 
  Brain,
  MessageSquare,
  Lightbulb,
  HelpCircle
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  subject?: string;
}

const quickQuestions = [
  {
    question: "Como se formam as ondas no oceano?",
    subject: "física"
  },
  {
    question: "Qual a importância do plâncton?",
    subject: "biológica"
  },
  {
    question: "Como é que a erosão costeira afeta Moçambique?",
    subject: "geológica"
  },
  {
    question: "O que é a acidificação dos oceanos?",
    subject: "química"
  }
];

const assistantResponses: { [key: string]: string } = {
  "como se formam as ondas no oceano": "As ondas oceânicas formam-se principalmente pela ação do vento sobre a superfície da água. No Canal de Moçambique, os ventos alísios e monções são os principais responsáveis pela geração de ondas. A energia do vento transfere-se para a água criando ondulações que se propagam através do oceano. A altura e frequência das ondas dependem da velocidade do vento, da duração e da extensão da área sobre a qual o vento atua.",
  
  "qual a importância do plâncton": "O plâncton é fundamental para os ecossistemas marinhos! Nas águas moçambicanas, o fitoplâncton produz cerca de 50% do oxigénio que respiramos e forma a base da cadeia alimentar marinha. O zooplâncton alimenta-se do fitoplâncton e serve de alimento para peixes, camarões e outros organismos. Durante as correntes de ressurgência no Canal de Moçambique, há um aumento significativo de nutrientes que promove o crescimento do plâncton.",
  
  "como é que a erosão costeira afeta moçambique": "A erosão costeira é um grande desafio para Moçambique! Com mais de 2.700 km de costa, várias comunidades enfrentam perda de terra devido ao aumento do nível do mar e à ação das ondas. Cidades como Beira e Quelimane são particularmente vulneráveis. A erosão destrói infraestruturas, afeta a pesca artesanal e força comunidades a deslocar-se. Os mangais funcionam como barreiras naturais importantes contra a erosão.",
  
  "o que é a acidificação dos oceanos": "A acidificação dos oceanos acontece quando o CO₂ da atmosfera dissolve-se na água do mar, tornando-a mais ácida. Isto afeta gravemente os corais e organismos com carapaças calcárias nas águas moçambicanas. Os recifes de coral do Arquipélago de Bazaruto e da Ilha de Moçambique são especialmente vulneráveis. A acidificação dificulta a formação de esqueletos calcários e pode levar ao branqueamento dos corais."
};

export const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Olá! Sou o teu assistente de oceanografia. Posso ajudar-te a esclarecer dúvidas sobre os oceanos, especialmente sobre a costa moçambicana e o Canal de Moçambique. Que gostarias de saber?',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const getSubjectColor = (subject?: string) => {
    const colors = {
      física: "bg-ocean text-white",
      biológica: "bg-wave text-white",
      geológica: "bg-deep text-white",
      química: "bg-coral text-white"
    };
    return subject ? colors[subject as keyof typeof colors] || "bg-muted" : "bg-muted";
  };

  const handleSendMessage = async (content?: string) => {
    const messageContent = content || newMessage;
    if (!messageContent.trim()) return;

    // Adicionar mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageContent,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simular resposta da IA
    setTimeout(() => {
      const lowerContent = messageContent.toLowerCase();
      let response = "Essa é uma excelente pergunta! Baseando-me no conhecimento sobre oceanografia e a realidade moçambicana, posso explicar-te melhor. Podes ser mais específico sobre que aspeto te interessa mais?";
      let subject;

      // Encontrar resposta correspondente
      for (const [key, value] of Object.entries(assistantResponses)) {
        if (lowerContent.includes(key)) {
          response = value;
          break;
        }
      }

      // Determinar área temática
      if (lowerContent.includes('onda') || lowerContent.includes('corrente') || lowerContent.includes('maré')) {
        subject = 'física';
      } else if (lowerContent.includes('plâncton') || lowerContent.includes('coral') || lowerContent.includes('peix') || lowerContent.includes('biodiversidade')) {
        subject = 'biológica';
      } else if (lowerContent.includes('erosão') || lowerContent.includes('sedimento') || lowerContent.includes('fundo')) {
        subject = 'geológica';
      } else if (lowerContent.includes('acidificação') || lowerContent.includes('poluição') || lowerContent.includes('químic')) {
        subject = 'química';
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date(),
        subject
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header da IA */}
      <Card className="bg-gradient-surface border-primary/20">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/20 rounded-full">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                Assistente de Oceanografia
                <Sparkles className="w-4 h-4 text-primary" />
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Especializado em ciências marinhas e águas moçambicanas
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Perguntas Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Perguntas Frequentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickQuestions.map((item, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-3 text-left justify-start"
                onClick={() => handleSendMessage(item.question)}
              >
                <div className="flex items-center gap-2 w-full">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm">{item.question}</p>
                    <Badge className={`${getSubjectColor(item.subject)} text-xs mt-1`}>
                      {item.subject}
                    </Badge>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat */}
      <Card className="h-[400px] flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Conversa com a IA
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 px-6">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>
                        {message.type === 'user' ? 'U' : <Bot className="w-4 h-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`rounded-lg p-3 ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs ${
                          message.type === 'user' 
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {message.timestamp.toLocaleTimeString('pt-PT', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                        {message.subject && (
                          <Badge className={`${getSubjectColor(message.subject)} text-xs ml-2`}>
                            {message.subject}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder="Faz a tua pergunta sobre oceanografia..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button 
                onClick={() => handleSendMessage()}
                disabled={!newMessage.trim() || isTyping}
                size="sm"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};