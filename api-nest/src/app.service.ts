import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppInfo() {
    return {
      name: 'Open Banking API',
      version: '1.1.1',
      description: 'API para Open Banking utilizando NestJS com Clean Code e DDD',
      author: 'leandrojsantos',
      features: [
        '🔐 Autenticação JWT com roles',
        '👥 Gestão completa de usuários',
        '🏦 Contas bancárias (Corrente, Poupança, Investimento)',
        '💳 Transações financeiras (Depósito, Saque, Transferência)',
        '🛡️ Rate limiting e segurança',
        '📊 Auditoria e logs',
        '📚 Documentação Swagger',
        '🐳 Containerização Podman'
      ],
      stack: [
        'NestJS',
        'Prisma ORM',
        'PostgreSQL',
        'JWT',
        'Winston',
        'Swagger',
        'Podman'
      ]
    };
  }
}
