import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Pin, 
  Clock, 
  Users, 
  Waves,
  Fish,
  Mountain,
  Beaker,
  Plus,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { type ForumTopic, type User } from "@/types/social";

interface ForumSectionProps {
  currentUser: User;
}

const mockForumTopics: ForumTopic[] = [
  {
    id: '1',
    title: 'Impacto das Marés na Biodiversidade Costeira',
    description: 'Discussão sobre como as variações das marés afetam os ecossistemas costeiros moçambicanos',
    subject: 'física',
    authorId: '1',
    authorName: 'Ana Mondlane',
    createdAt: new Date('2024-07-10'),
    lastActivity: new Date('2024-07-12'),
    posts: [],
    isSticky: true
  },
  {
    id: '2', 
    title: 'Poluição por Plásticos no Canal de Moçambique',
    description: 'Análise dos dados recentes sobre microplásticos em águas moçambicanas',
    subject: 'química',
    authorId: '2',
    authorName: 'Carlos Mutola',
    createdAt: new Date('2024-07-11'),
    lastActivity: new Date('2024-07-12'),
    posts: [],
    isSticky: false
  },
  {
    id: '3',
    title: 'Descoberta de Nova Espécie de Coral',
    description: 'Partilha de informações sobre recente descoberta científica',
    subject: 'biológica',
    authorId: '1',
    authorName: 'Ana Mondlane',
    createdAt: new Date('2024-07-09'),
    lastActivity: new Date('2024-07-11'),
    posts: [],
    isSticky: false
  }
];

export const ForumSection = ({ currentUser }: ForumSectionProps) => {
  const [topics, setTopics] = useState<ForumTopic[]>(mockForumTopics);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("todos");

  const getSubjectIcon = (subject: string) => {
    const icons = {
      física: Waves,
      biológica: Fish,
      geológica: Mountain,
      química: Beaker
    };
    return icons[subject as keyof typeof icons] || MessageSquare;
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      física: "bg-ocean text-white",
      biológica: "bg-wave text-white",
      geológica: "bg-deep text-white", 
      química: "bg-coral text-white"
    };
    return colors[subject as keyof typeof colors] || "bg-muted";
  };

  const filteredTopics = topics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "todos" || topic.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const subjectCounts = {
    física: topics.filter(t => t.subject === 'física').length,
    biológica: topics.filter(t => t.subject === 'biológica').length,
    geológica: topics.filter(t => t.subject === 'geológica').length,
    química: topics.filter(t => t.subject === 'química').length
  };

  return (
    <div className="space-y-6">
      {/* Header do Fórum */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Fórum Académico</h2>
          <p className="text-muted-foreground">
            Discussões científicas sobre oceanografia e ciências marinhas
          </p>
        </div>
        <Button className="bg-gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Novo Tópico
        </Button>
      </div>

      {/* Barra de Pesquisa */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Pesquisar tópicos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filtros por Área */}
      <Tabs value={selectedSubject} onValueChange={setSelectedSubject}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="todos">
            Todos ({topics.length})
          </TabsTrigger>
          <TabsTrigger value="física" className="flex items-center gap-1">
            <Waves className="w-3 h-3" />
            Física ({subjectCounts.física})
          </TabsTrigger>
          <TabsTrigger value="biológica" className="flex items-center gap-1">
            <Fish className="w-3 h-3" />
            Biológica ({subjectCounts.biológica})
          </TabsTrigger>
          <TabsTrigger value="geológica" className="flex items-center gap-1">
            <Mountain className="w-3 h-3" />
            Geológica ({subjectCounts.geológica})
          </TabsTrigger>
          <TabsTrigger value="química" className="flex items-center gap-1">
            <Beaker className="w-3 h-3" />
            Química ({subjectCounts.química})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedSubject} className="space-y-4 mt-6">
          {/* Lista de Tópicos */}
          {filteredTopics.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">Nenhum tópico encontrado</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? "Tente pesquisar com outros termos" : "Seja o primeiro a criar um tópico!"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredTopics.map((topic) => {
              const SubjectIcon = getSubjectIcon(topic.subject);
              return (
                <Card 
                  key={topic.id} 
                  className="hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="flex items-center space-x-2">
                          {topic.isSticky && <Pin className="w-4 h-4 text-amber-500" />}
                          <Badge className={getSubjectColor(topic.subject)}>
                            <SubjectIcon className="w-3 h-3 mr-1" />
                            {topic.subject}
                          </Badge>
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg hover:text-primary transition-colors">
                            {topic.title}
                          </CardTitle>
                          <p className="text-muted-foreground text-sm mt-1">
                            {topic.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">
                              {topic.authorName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">
                            por {topic.authorName}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {topic.posts.length} respostas
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>
                          {topic.lastActivity.toLocaleDateString('pt-PT')}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};