import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('senha123', 10);

  // Limpa o banco de dados antes de inserir novos dados
  await prisma.user.deleteMany();

  // Cria um usuário de teste
  const testUser = await prisma.user.create({
    data: {
      name: 'Usuário Teste',
      email: 'teste@exemplo.com',
      password: password,
    },
  });

  console.log({ testUser });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }); 