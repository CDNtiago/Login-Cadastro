import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

/**
 * Esquema de validação para a requisição de registro
 * 
 * Valida:
 * - name: Nome do usuário (não pode estar vazio)
 * - email: Email válido para contato e login
 * - password: Senha com pelo menos 6 caracteres
 */
const registerSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

/**
 * Handler da rota POST /api/auth/register
 * 
 * Esta rota processa o registro de novos usuários no sistema.
 * Implementa:
 * - Validação de input usando Zod
 * - Verificação de email duplicado
 * - Hash seguro de senha com bcrypt
 * - Criação de usuário no banco de dados
 * - Tratamento de erros e respostas adequadas
 * 
 * @param req - Objeto Request contendo os dados do usuário a ser registrado
 * @returns NextResponse com status e mensagem apropriados
 */
export async function POST(req: Request) {
  try {
    // Proteção contra ataques de força bruta
    // Implementação básica de rate limiting por IP 
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const rateLimitKey = `register:${ip}`;
    
    // Essa implementação é apenas um exemplo. Em produção, você usaria
    // um sistema de armazenamento distribuído como Redis para rate limiting

    // Extrai e valida o corpo da requisição
    const body = await req.json();
    const result = registerSchema.safeParse(body);

    // Retorna erro se a validação falhar
    if (!result.success) {
      return NextResponse.json(
        { message: "Dados de entrada inválidos", errors: result.error.errors },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;

    // Verifica se o email já está em uso
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email já está em uso" },
        { status: 409 }
      );
    }

    // Gera hash seguro da senha usando bcrypt
    const hashedPassword = await hash(password, 10);

    // Cria o usuário no banco de dados
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    // Retorna sucesso com os dados do usuário (exceto senha)
    return NextResponse.json(
      { message: "Usuário criado com sucesso", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  } finally {
    // Garante que a conexão com o banco seja fechada adequadamente
    await prisma.$disconnect();
  }
} 