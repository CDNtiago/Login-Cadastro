"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider>
      <Toaster position="top-center" richColors />
      {children}
    </SessionProvider>
  );
} 