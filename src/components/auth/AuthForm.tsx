import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Waves } from "lucide-react";

interface AuthFormProps {
  onAuth: (user: any) => void;
}

export function AuthForm({ onAuth }: AuthFormProps) {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    nome: "",
    email: "",
    password: "",
    confirmPassword: "",
    universidade: "",
    curso: "",
    ano: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular login
    const user = {
      id: "1",
      nome: "Estudante Demo",
      email: loginForm.email,
      universidade: "UEM",
      curso: "Oceanografia",
      pontos: 0,
      nivel: "Iniciante"
    };
    localStorage.setItem("user", JSON.stringify(user));
    onAuth(user);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    
    const user = {
      id: Date.now().toString(),
      nome: registerForm.nome,
      email: registerForm.email,
      universidade: registerForm.universidade,
      curso: registerForm.curso,
      ano: registerForm.ano,
      pontos: 0,
      nivel: "Iniciante"
    };
    localStorage.setItem("user", JSON.stringify(user));
    onAuth(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-ocean p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Waves className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">Oceanos Vivos</CardTitle>
          <CardDescription>
            Plataforma educacional de ciências marinhas de Moçambique
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="register">Registar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Sua senha"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Entrar
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    placeholder="Seu nome completo"
                    value={registerForm.nome}
                    onChange={(e) => setRegisterForm({...registerForm, nome: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="universidade">Universidade</Label>
                  <Select onValueChange={(value) => setRegisterForm({...registerForm, universidade: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione sua universidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UEM">Universidade Eduardo Mondlane (UEM)</SelectItem>
                      <SelectItem value="UniLurio">Universidade Lúrio (UniLúrio)</SelectItem>
                      <SelectItem value="UP">Universidade Pedagógica (UP)</SelectItem>
                      <SelectItem value="UCM">Universidade Católica de Moçambique (UCM)</SelectItem>
                      <SelectItem value="ISCTEM">ISCTEM</SelectItem>
                      <SelectItem value="Outra">Outra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="curso">Curso</Label>
                  <Select onValueChange={(value) => setRegisterForm({...registerForm, curso: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione seu curso" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Oceanografia">Oceanografia</SelectItem>
                      <SelectItem value="Biologia Marinha">Biologia Marinha</SelectItem>
                      <SelectItem value="Ciências Marinhas e Costeiras">Ciências Marinhas e Costeiras</SelectItem>
                      <SelectItem value="Geologia Marinha">Geologia Marinha</SelectItem>
                      <SelectItem value="Engenharia Costeira">Engenharia Costeira</SelectItem>
                      <SelectItem value="Biologia">Biologia</SelectItem>
                      <SelectItem value="Geografia">Geografia</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ano">Ano de Estudo</Label>
                  <Select onValueChange={(value) => setRegisterForm({...registerForm, ano: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o ano" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1º Ano</SelectItem>
                      <SelectItem value="2">2º Ano</SelectItem>
                      <SelectItem value="3">3º Ano</SelectItem>
                      <SelectItem value="4">4º Ano</SelectItem>
                      <SelectItem value="5">5º Ano</SelectItem>
                      <SelectItem value="Mestrado">Mestrado</SelectItem>
                      <SelectItem value="Doutoramento">Doutoramento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Senha</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    placeholder="Crie uma senha"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Senha</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirme sua senha"
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Registar
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}