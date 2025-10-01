import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar usuário admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@openbanking.com' },
    update: {},
    create: {
      email: 'admin@openbanking.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'Sistema',
      role: 'ADMIN',
      isActive: true,
      emailVerified: true,
    },
  });

  console.log('✅ Usuário admin criado:', admin.email);

  // Criar usuário comum
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@openbanking.com' },
    update: {},
    create: {
      email: 'user@openbanking.com',
      password: userPassword,
      firstName: 'João',
      lastName: 'Silva',
      role: 'USER',
      isActive: true,
      emailVerified: true,
    },
  });

  console.log('✅ Usuário comum criado:', user.email);

  // Criar contas para o usuário
  const checkingAccount = await prisma.account.create({
    data: {
      userId: user.id,
      accountNumber: '12345678',
      accountType: 'CHECKING',
      balance: 1000.00,
      dailyLimit: 5000.00,
      monthlyLimit: 50000.00,
    },
  });

  const savingsAccount = await prisma.account.create({
    data: {
      userId: user.id,
      accountNumber: '87654321',
      accountType: 'SAVINGS',
      balance: 5000.00,
      dailyLimit: 2000.00,
      monthlyLimit: 20000.00,
    },
  });

  console.log('✅ Contas criadas:', {
    checking: checkingAccount.accountNumber,
    savings: savingsAccount.accountNumber,
  });

  // Criar algumas transações de exemplo
  const depositTransaction = await prisma.transaction.create({
    data: {
      userId: user.id,
      accountId: checkingAccount.id,
      type: 'DEPOSIT',
      status: 'COMPLETED',
      amount: 1000.00,
      description: 'Depósito inicial',
      reference: 'TXN001',
      processedAt: new Date(),
    },
  });

  const withdrawalTransaction = await prisma.transaction.create({
    data: {
      userId: user.id,
      accountId: checkingAccount.id,
      type: 'WITHDRAWAL',
      status: 'COMPLETED',
      amount: 200.00,
      description: 'Saque para despesas',
      reference: 'TXN002',
      processedAt: new Date(),
    },
  });

  console.log('✅ Transações de exemplo criadas');

  console.log('🎉 Seed concluído com sucesso!');
  console.log('\n📋 Credenciais de acesso:');
  console.log('Admin: admin@openbanking.com / admin123');
  console.log('User: user@openbanking.com / user123');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
