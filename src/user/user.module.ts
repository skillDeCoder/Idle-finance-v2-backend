import { Module } from '@nestjs/common';
import { UserService } from './providers/user.service';
import { UserController } from './user.controller';
import { WalletModule } from 'src/wallet/wallet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ContractService } from './providers/contract.service';
import { BcryptService } from './providers/bcrypt.service';
import { JwtService } from './providers/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './providers/email.service';

@Module({
  providers: [UserService, ContractService, BcryptService, JwtService, EmailService],
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([User]),
    WalletModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({}),
      inject: [ConfigService],
    }),
  ],
  exports: [UserService, ContractService, BcryptService, JwtService, EmailService],
})
export class UserModule {}
