"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function UserAuthMenu() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      toast.success("Logout realizado com sucesso!");
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error("Ocorreu um erro ao fazer logout.");
    }
  };

  if (status === "loading") {
    return <div className="animate-pulse">Carregando...</div>;
  }

  if (status === "unauthenticated" || !session) {
    return (
      <div className="flex space-x-2">
        <Button variant="outline" onClick={() => router.push("/login")}>
          Login
        </Button>
        <Button onClick={() => router.push("/register")}>
          Registrar
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="text-sm">
        Olá, <span className="font-semibold">{session.user?.name}</span>
      </div>
      <Button variant="outline" size="sm" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
} 