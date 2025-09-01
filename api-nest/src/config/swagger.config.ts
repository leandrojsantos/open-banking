import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
    const options = new DocumentBuilder()
        .setTitle('Open Banking API')
        .setDescription(`
            ## 🏦 API Open Banking
            
            Esta API fornece funcionalidades para um sistema de Open Banking, incluindo:
            
            - **👤 Usuários**: Gerenciamento de usuários e autenticação
            - **🏦 Contas**: Criação e gerenciamento de contas bancárias
            - **💳 Transações**: Processamento de transações financeiras
            - **🔐 Autenticação**: Sistema JWT para segurança
            
            ## 🚀 Como usar
            
            1. **Registre-se**: Crie uma conta de usuário
            2. **Faça login**: Obtenha um token JWT
            3. **Crie contas**: Abra contas bancárias
            4. **Execute transações**: Faça depósitos, saques e transferências
            
            ## 🔐 Autenticação
            
            Use o botão "Authorize" acima para inserir seu token JWT no formato:
            \`Bearer <seu-token>\`
        `)
        .setVersion('1.1.1')
        .addTag('App', 'Endpoints básicos da aplicação')
        .addTag('users', 'Gerenciamento de usuários')
        .addTag('auth', 'Autenticação e autorização')
        .addTag('accounts', 'Gerenciamento de contas bancárias')
        .addTag('transactions', 'Processamento de transações financeiras')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'Enter JWT token',
                in: 'header',
            },
            'JWT-auth',
        )
        .addServer('/api/v1', 'API v1')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api/v1/docs', app, document, {
        customSiteTitle: 'Open Banking API - Documentação',
        customCss: `
            .swagger-ui .topbar { display: none }
            .swagger-ui .info .title { color: #2c3e50; font-size: 36px; }
            .swagger-ui .info .description { font-size: 16px; line-height: 1.6; }
        `,
        swaggerOptions: {
            persistAuthorization: true,
            displayRequestDuration: true,
            filter: true,
            docExpansion: 'list',
            showExtensions: true,
            showCommonExtensions: true,
        },
    });
}