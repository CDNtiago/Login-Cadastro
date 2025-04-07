import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();

  return session?.user;
}

export async function ensureAuth() {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Não autenticado");
  }

  return session.user;
} 