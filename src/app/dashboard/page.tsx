import { Metadata } from "next";
import { getCurrentUser } from "@/lib/session";
import { UserAuthMenu } from "@/components/auth/user-auth-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard | Sistema de Login",
  description: "Painel do usuário autenticado",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <UserAuthMenu />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bem-vindo ao Dashboard</CardTitle>
          <CardDescription>Esta é uma área protegida para usuários autenticados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-2">
              <h3 className="font-medium">Seus dados:</h3>
              <div className="rounded-lg border p-3">
                <div><strong>Nome:</strong> {user?.name}</div>
                <div><strong>Email:</strong> {user?.email}</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Você está logado com sucesso no sistema. Esta página só é acessível para usuários autenticados.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 