import { z } from "zod";

/**
 * Esquema de validação para login de usuários
 * 
 * Valida os campos:
 * - email: Deve ser um email válido e não pode estar vazio
 * - password: Deve ter pelo menos 6 caracteres
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

/**
 * Esquema de validação para registro de novos usuários
 * 
 * Valida os campos:
 * - name: Nome completo do usuário (entre 1 e 100 caracteres)
 * - email: Deve ser um email válido e não pode estar vazio
 * - password: Deve ter pelo menos 6 caracteres
 * - confirmPassword: Deve ser igual ao campo password
 * 
 * Inclui uma validação refinada (.refine) para garantir que as senhas coincidem
 */
export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nome é obrigatório" })
    .max(100, { message: "Nome não pode ter mais que 100 caracteres" }),
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Confirmação de senha é obrigatória" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

// Tipos TypeScript derivados dos esquemas Zod para uso nos formulários
export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>; 