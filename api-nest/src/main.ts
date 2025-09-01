import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { getValidationPipe } from './config/validation.config';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // 1. Criação da aplicação com logger detalhado
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    bufferLogs: true
  });

  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');
  const port = configService.get('PORT') || 3000;

  // 2. Configurações básicas
  app.useGlobalPipes(getValidationPipe());
  app.setGlobalPrefix('api/v1');

  // 3. Configuração de proxies e trust proxy
  app.set('trust proxy', 1);

  // 4. Configuração CORS melhorada
  app.enableCors({
    origin: configService.get('CORS_ORIGIN')?.split(',') || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'X-Requested-With',
      'X-CSRF-Token'
    ],
    maxAge: 3600 // 1 hora
  });

  // 5. Configuração Swagger (sempre ativo para desenvolvimento)
  setupSwagger(app);
  logger.log('Swagger documentation enabled at /api/v1/docs');

  // 6. Inicialização do servidor
  await app.listen(port, '0.0.0.0', () => {
    logger.log(`Application is running on port ${port}`);
    logger.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    logger.log(`Swagger UI: http://localhost:${port}/api/v1/docs`);
    logger.log(`Health Check: http://localhost:${port}/api/v1/health`);
  });
}

// 7. Tratamento de erros globais
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection at:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
});

bootstrap().catch((err) => {
  console.error('Application bootstrap failed:', err);
  process.exit(1);
});