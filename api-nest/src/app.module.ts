import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AccountsModule } from './accounts/accounts.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';

const getDataSourceOptions = (configService: ConfigService): DataSourceOptions => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST', 'db'),
    port: configService.get<number>('DB_PORT', 5432),
    username: configService.get<string>('DB_USER', 'postgres'),
    password: configService.get<string>('DB_PASSWORD', 'senhasegura'),
    database: configService.get<string>('DB_NAME', 'open_banking'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    synchronize: configService.get<string>('NODE_ENV') === 'development',
    logging: configService.get<string>('NODE_ENV') !== 'production',
    migrationsRun: true,
    poolSize: 10,
    connectTimeoutMS: 2000,
});

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            ignoreEnvFile: process.env.NODE_ENV === 'production',
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => getDataSourceOptions(configService),
            dataSourceFactory: async (options) => {
                const dataSource = new DataSource(options!);
                await dataSource.initialize();
                await dataSource.runMigrations();
                return dataSource;
            },
        }),
        UsersModule,
        AccountsModule,
        TransactionsModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }