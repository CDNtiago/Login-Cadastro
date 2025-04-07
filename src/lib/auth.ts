import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

const prisma = new PrismaClient();

/**
 * Configuração do NextAuth.js
 * 
 * Este objeto contém todas as configurações necessárias para o sistema de autenticação:
 * - Adapter para integração com Prisma e persistência em banco de dados
 * - Estratégia de sessão baseada em JWT
 * - Páginas personalizadas
 * - Providers de autenticação
 * - Callbacks para personalização de tokens e sessões
 */
export const authOptions: NextAuthOptions = {
  // Adapter para integração com o Prisma
  adapter: PrismaAdapter(prisma),

  // Configuração de sessão usando JWT
  session: {
    strategy: "jwt",
  },

  // Páginas personalizadas para autenticação
  pages: {
    signIn: "/login",
  },

  // Providers de autenticação
  providers: [
    CredentialsProvider({
      name: "Credentials",
      
      // Definição dos campos do formulário de login
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },

      /**
       * Função de autorização
       * 
       * Verifica as credenciais do usuário e retorna os dados se forem válidas
       * Implementa:
       * - Validação de entrada com Zod
       * - Busca de usuário no banco de dados
       * - Verificação segura de senha usando bcrypt
       * 
       * @param credentials - Credenciais fornecidas pelo usuário
       * @returns Dados do usuário se autenticado, ou null se falhar
       */
      async authorize(credentials) {
        // Validando as credenciais usando Zod
        const credentialsSchema = z.object({
          email: z.string().email("Email inválido"),
          password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
        });

        const parsedCredentials = credentialsSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          console.error("Validação de credenciais falhou", parsedCredentials.error);
          return null;
        }

        const { email, password } = parsedCredentials.data;

        // Procurando o usuário no banco de dados
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          console.error("Usuário não encontrado");
          return null;
        }

        // Verificando a senha
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
          console.error("Senha inválida");
          return null;
        }

        // Retornando as informações do usuário (exceto a senha)
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],

  // Callbacks para personalização de tokens e sessões
  callbacks: {
    /**
     * Callback JWT
     * 
     * Executado sempre que um token JWT é criado ou atualizado
     * Adiciona o ID do usuário ao token
     */
    async jwt({ token, user }) {
      // Incluindo o ID do usuário no token
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },

    /**
     * Callback Session
     * 
     * Executado sempre que uma sessão é verificada
     * Adiciona o ID do usuário à sessão a partir do token
     */
    async session({ session, token }) {
      // Incluindo o ID do usuário na sessão
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
}; 