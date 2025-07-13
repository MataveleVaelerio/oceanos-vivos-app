// Tipos para funcionalidades sociais do aplicativo

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  university: string;
  course: string;
  researchInterests: string[];
  points: number;
  level: string;
  joinDate: Date;
  isOnline: boolean;
  canPublish: boolean; // baseado em pontuação mínima
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  images?: string[];
  subject?: string; // área de estudo relacionada
  likes: number;
  comments: Comment[];
  createdAt: Date;
  isScientific: boolean; // indica se é conteúdo científico
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: Date;
  likes: number;
}

export interface ForumTopic {
  id: string;
  title: string;
  description: string;
  subject: string; // física, biológica, etc
  university?: string; // para fóruns específicos de universidade
  authorId: string;
  authorName: string;
  createdAt: Date;
  lastActivity: Date;
  posts: ForumPost[];
  isSticky: boolean;
}

export interface ForumPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: Date;
  likes: number;
  isAnswer: boolean; // se foi marcado como resposta
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export interface ChatConversation {
  id: string;
  participants: string[];
  participantNames: string[];
  lastMessage: ChatMessage;
  unreadCount: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: 'básico' | 'médio' | 'avançado';
  points: number;
  startDate: Date;
  endDate: Date;
  participants: string[];
  questions: any[]; // Para evitar dependência circular
  isActive: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'message' | 'challenge' | 'achievement' | 'forum';
  title: string;
  content: string;
  relatedId?: string; // ID do post, mensagem, etc
  isRead: boolean;
  createdAt: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  rarity: 'comum' | 'raro' | 'épico' | 'lendário';
  unlockedAt?: Date;
}

// Dados mockados para desenvolvimento
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana Mondlane',
    email: 'ana@uem.mz',
    university: 'UEM - ESCMC',
    course: 'Oceanografia',
    researchInterests: ['Correntes Marinhas', 'Biodiversidade'],
    points: 165,
    level: 'Aprendiz do Mar',
    joinDate: new Date('2024-01-15'),
    isOnline: true,
    canPublish: true
  },
  {
    id: '2',
    name: 'Carlos Mutola',
    email: 'carlos@unilúrio.mz',
    university: 'UniLúrio',
    course: 'Ciências Marinhas',
    researchInterests: ['Poluição Marinha', 'Química Oceânica'],
    points: 89,
    level: 'Iniciante',
    joinDate: new Date('2024-02-01'),
    isOnline: false,
    canPublish: false
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    authorId: '1',
    authorName: 'Ana Mondlane',
    content: 'Descobri dados fascinantes sobre as correntes do Canal de Moçambique! A velocidade média é surpreendente 🌊',
    subject: 'física',
    likes: 12,
    comments: [
      {
        id: '1',
        authorId: '2',
        authorName: 'Carlos Mutola',
        content: 'Muito interessante! Podes partilhar a fonte?',
        createdAt: new Date('2024-07-12T10:30:00'),
        likes: 3
      }
    ],
    createdAt: new Date('2024-07-12T09:15:00'),
    isScientific: true
  }
];