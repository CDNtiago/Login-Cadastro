# Sistema de Autenticação com Next.js, Prisma e NextAuth

Um sistema completo de autenticação construído com tecnologias modernas, focado em segurança, escalabilidade e manutenibilidade. Este projeto implementa login e cadastro de usuários, com validação de dados, proteção contra ataques comuns e uma arquitetura organizada.

## 🚀 Tecnologias

- **Next.js 15** - Framework React com suporte a SSR e API Routes
- **TypeScript** - Tipagem estática para desenvolvimento mais seguro
- **Prisma ORM** - ORM para gerenciamento de banco de dados
- **SQLite** - Banco de dados relacional leve para armazenar dados de usuários
- **NextAuth.js** - Framework de autenticação completo
- **Zod** - Validação de esquemas e tipos
- **bcrypt** - Hash seguro de senhas
- **React Hook Form** - Gerenciamento de formulários
- **ShadCN UI** - Componentes de interface modernos e acessíveis

## 📋 Funcionalidades

### Sistema de Login
- Autenticação via email/senha com NextAuth
- Validação completa de formulários
- Proteção contra tentativas de acesso não autorizadas
- Feedback visual durante o processo de login
- Sessões persistentes baseadas em JWT

### Sistema de Cadastro
- Formulário completo de registro com validação
- Verificação de senhas (confirmação)
- Proteção contra cadastros duplicados
- Rate limiting básico contra ataques de força bruta
- Hash seguro de senhas com bcrypt

### Segurança
- Proteção de rotas via middleware
- Armazenamento seguro de senhas (hash)
- Validação de dados em múltiplas camadas
- Sanitização de inputs
- Mensagens de erro genéricas (sem vazamento de informações)

## 🏗️ Estrutura do Projeto

```
login-system/
├── prisma/                 # Configuração do Prisma e banco de dados
│   ├── schema.prisma       # Schema do banco de dados
│   └── seed.ts             # Script para criar usuário de teste
│
├── src/
│   ├── app/                # Páginas e rotas da aplicação
│   │   ├── api/            # Rotas de API
│   │   │   └── auth/       # Endpoints de autenticação
│   │   ├── login/          # Página de login
│   │   ├── register/       # Página de registro
│   │   └── dashboard/      # Área protegida (exemplo)
│   │
│   ├── components/         # Componentes React reutilizáveis
│   │   ├── auth/           # Componentes de autenticação
│   │   │   ├── login-form.tsx       # Formulário de login
│   │   │   ├── register-form.tsx    # Formulário de registro
│   │   │   └── auth-provider.tsx    # Provedor global de autenticação
│   │   └── ui/             # Componentes de interface
│   │
│   ├── lib/                # Utilitários e configurações
│   │   ├── auth.ts         # Configuração do NextAuth
│   │   ├── session.ts      # Utilitários para gerenciar sessão
│   │   └── validations/    # Esquemas de validação Zod
│   │       └── auth.ts     # Validações de login e registro
│   │
│   └── middleware.ts       # Middleware para proteção de rotas
```

## 🚀 Como Executar

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente (copie o `.env.example` para `.env`):
   ```
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="seu-segredo-aqui"
   ```
4. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev
   ```
5. Crie um usuário de teste:
   ```bash
   npm run seed
   ```
6. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## 📝 Uso

### Usuário de Teste
- **Email**: teste@exemplo.com
- **Senha**: senha123

### Fluxo de Autenticação
1. Acesse a página inicial
2. Navegue para "Login" ou "Criar Conta"
3. Após autenticação, você será redirecionado para o Dashboard
4. O botão de Logout está disponível no Dashboard

## 🛡️ Proteção de Rotas

O sistema utiliza um middleware personalizado que protege rotas específicas:
- Rotas como `/dashboard` exigem autenticação
- Usuários já logados são redirecionados do login para o dashboard
- Páginas públicas são acessíveis sem autenticação

## 🧩 Componentes Principais

### Login
O formulário de login gerencia todo o processo de autenticação, incluindo:
- Validação de campos em tempo real
- Prevenção contra submissões múltiplas
- Feedback visual durante o processo
- Redirecionamento após sucesso

### Registro
O formulário de registro implementa:
- Validação completa em tempo real
- Verificação de confirmação de senha
- Comunicação com API para criação de conta
- Tratamento de erros (email duplicado, etc.)

## 🔄 Ciclo de Vida da Autenticação

1. **Registro**: Criação de conta via formulário e API
2. **Login**: Autenticação via NextAuth.js e credenciais
3. **Sessão**: Manutenção do estado de autenticação via JWT
4. **Proteção**: Middleware garantindo acesso apenas a usuários autenticados
5. **Logout**: Encerramento seguro da sessão

## 📚 Extensibilidade

O sistema foi projetado para ser facilmente adaptável e escalável:

- Adicione novos provedores de autenticação (Google, GitHub)
- Estenda os modelos de usuário com campos adicionais
- Implemente verificação de email ou autenticação de dois fatores
- Integre com outros bancos de dados (PostgreSQL, MySQL)