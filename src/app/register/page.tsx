import { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Criar conta | Sistema de Login",
  description: "Crie uma nova conta no sistema",
};

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md px-4">
        <RegisterForm />
      </div>
    </div>
  );
} 