import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import APP_CONFIG from './config/app.config';
import environmentValidation from './config/environment.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { NodeModule } from './node/node.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './auth/guards/authentication.guard';
import { KyberbridgeModule } from './kyberbridge/kyberbridge.module';
import { EarningModule } from './earning/earning.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [APP_CONFIG],
      validationSchema: environmentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        synchronize: configService.get('APP_CONFIG.DATABASE_SYNC'),
        autoLoadEntities: true,
        port: configService.get('APP_CONFIG.DB_PORT'),
        username: configService.get('APP_CONFIG.DB_USERNAME'),
        password: configService.get('APP_CONFIG.DB_PASSWORD'),
        host: configService.get('APP_CONFIG.DB_HOST'),
        database: configService.get('APP_CONFIG.DB_NAME'),
        ssl: { rejectUnauthorized: false },
      }),
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'sqlite',
    //     database: 'idle-finance.db',
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     synchronize: configService.get('APP_CONFIG.DATABASE_SYNC'),
    //   }),
    // }),
    UserModule,
    WalletModule,
    NodeModule,
    KyberbridgeModule,
    ScheduleModule.forRoot(),
    AuthModule,
    EarningModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
