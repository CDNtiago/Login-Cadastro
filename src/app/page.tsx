import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAuthMenu } from "@/components/auth/user-auth-menu";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Sistema de Login</h1>
        <UserAuthMenu />
      </div>

      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Bem-vindo ao Sistema de Login</CardTitle>
          <CardDescription>
            Um sistema de autenticação seguro construído com Next.js, Prisma e NextAuth
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Este sistema de login foi desenvolvido utilizando as melhores práticas de segurança e 
            uma arquitetura limpa e escalável.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Autenticação segura com NextAuth.js</li>
            <li>Banco de dados SQLite com Prisma ORM</li>
            <li>Hash de senhas com bcrypt</li>
            <li>Validação de formulários com Zod</li>
            <li>UI moderna com componentes do ShadCN UI</li>
            <li>Proteção de rotas com middleware</li>
          </ul>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/login">Fazer Login</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/register">Criar Conta</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
