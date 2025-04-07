import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login | Sistema de Login",
  description: "Faça login para acessar o sistema",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md px-4">
        <LoginForm />
      </div>
    </div>
  );
} 