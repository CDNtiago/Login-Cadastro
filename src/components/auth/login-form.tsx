"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { LoginFormValues, loginSchema } from "@/lib/validations/auth";

/**
 * Componente de Formulário de Login
 * 
 * Este componente renderiza um formulário de login completo com validação
 * utilizando React Hook Form e Zod para validação de campos.
 * 
 * Funcionalidades:
 * - Validação de email e senha
 * - Feedback visual de erros de validação
 * - Indicador de carregamento durante o processo de login
 * - Redirecionamento após login bem-sucedido
 * - Mensagens de toast para feedback ao usuário
 */
export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Configuração do formulário com validação Zod
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * Função que processa o envio do formulário
   * 
   * @param data - Dados validados do formulário (email e senha)
   */
  async function onSubmit(data: LoginFormValues) {
    try {
      setIsLoading(true);

      // Tenta fazer login usando NextAuth
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      // Verifica se ocorreu algum erro durante o login
      if (result?.error) {
        toast.error("Credenciais inválidas. Tente novamente.");
        return;
      }

      // Redirecionar para a página inicial após o login bem-sucedido
      router.push("/dashboard");
      router.refresh();
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error("Ocorreu um erro ao fazer login. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Faça login para acessar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Campo de Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="seuemail@exemplo.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Campo de Senha */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••••" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Botão de Envio */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Não tem uma conta?{" "}
          <Link href="/register" className="font-medium underline underline-offset-4 hover:text-primary">
            Registre-se
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
} 