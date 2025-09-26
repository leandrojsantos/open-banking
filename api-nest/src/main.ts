import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Validação global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key']
  });

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Open Banking API')
    .setDescription('API para Open Banking com NestJS, Prisma e Clean Code')
    .setVersion('1.1.1')
    .addBearerAuth()
    .addTag('App', 'Informações da aplicação')
    .addTag('Authentication', 'Autenticação e autorização')
    .addTag('Users', 'Gestão de usuários')
    .addTag('Accounts', 'Contas bancárias')
    .addTag('Transactions', 'Transações financeiras')
    .addTag('Health', 'Health check')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Open Banking API Documentation',
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { font-size: 2.5em; }
    `,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger docs available at: http://localhost:${port}/api/docs`);
  console.log(`🏥 Health check available at: http://localhost:${port}/health`);
}

bootstrap();