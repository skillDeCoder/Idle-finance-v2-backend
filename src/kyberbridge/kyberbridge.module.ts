import { Module } from '@nestjs/common';
import { KyberbridgeService } from './providers/kyberbridge.service';
import { HttpModule } from '@nestjs/axios';
import { KyberbridgeController } from './kyberbridge.controller';

@Module({
  imports: [HttpModule],
  providers: [KyberbridgeService],
  controllers: [KyberbridgeController],
})
export class KyberbridgeModule {}
