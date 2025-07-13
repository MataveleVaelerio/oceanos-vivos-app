import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share2, Send, BookOpen, Users } from "lucide-react";
import { mockPosts, mockUsers, type Post, type User } from "@/types/social";

interface SocialFeedProps {
  currentUser: User;
}

export const SocialFeed = ({ currentUser }: SocialFeedProps) => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [newPost, setNewPost] = useState("");

  const getSubjectColor = (subject?: string) => {
    const colors = {
      física: "bg-ocean",
      biológica: "bg-wave", 
      geológica: "bg-deep",
      química: "bg-coral"
    };
    return subject ? colors[subject as keyof typeof colors] || "bg-muted" : "bg-muted";
  };

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (!newPost.trim() || !currentUser.canPublish) return;

    const post: Post = {
      id: Date.now().toString(),
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      content: newPost,
      likes: 0,
      comments: [],
      createdAt: new Date(),
      isScientific: false
    };

    setPosts(prev => [post, ...prev]);
    setNewPost("");
  };

  return (
    <div className="space-y-6">
      {/* Criar Publicação */}
      {currentUser.canPublish ? (
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>{currentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{currentUser.name}</p>
                <p className="text-sm text-muted-foreground">{currentUser.university}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Partilha a tua descoberta científica..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-20"
            />
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="text-xs">
                <BookOpen className="w-3 h-3 mr-1" />
                Conteúdo Académico
              </Badge>
              <Button 
                onClick={handleCreatePost}
                disabled={!newPost.trim()}
                size="sm"
              >
                <Send className="w-4 h-4 mr-2" />
                Publicar
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed">
          <CardContent className="text-center py-8">
            <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">Desbloqueie as Publicações</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Precisa de {150 - currentUser.points} pontos para publicar conteúdo
            </p>
            <Badge variant="secondary">
              {currentUser.points}/150 pontos
            </Badge>
          </CardContent>
        </Card>
      )}

      {/* Feed de Publicações */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={post.authorAvatar} />
                    <AvatarFallback>{post.authorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{post.authorName}</p>
                    <p className="text-sm text-muted-foreground">
                      {post.createdAt.toLocaleDateString('pt-PT')}
                    </p>
                  </div>
                </div>
                {post.subject && (
                  <Badge className={getSubjectColor(post.subject)}>
                    {post.subject}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground leading-relaxed">{post.content}</p>
              
              <div className="flex items-center space-x-4 pt-2 border-t">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  className="hover:text-red-500"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {post.comments.length}
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Partilhar
                </Button>
              </div>

              {/* Comentários */}
              {post.comments.length > 0 && (
                <div className="space-y-3 pt-4 border-t">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={comment.authorAvatar} />
                        <AvatarFallback className="text-xs">
                          {comment.authorName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-muted rounded-lg p-3">
                          <p className="font-medium text-sm">{comment.authorName}</p>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Button variant="ghost" size="sm" className="h-6 text-xs">
                            <Heart className="w-3 h-3 mr-1" />
                            {comment.likes}
                          </Button>
                          <span className="text-xs text-muted-foreground">
                            {comment.createdAt.toLocaleDateString('pt-PT')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};