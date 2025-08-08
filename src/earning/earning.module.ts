import { Module } from '@nestjs/common';
// import { EarningService } from './providers/earning.service';
import { EarningController } from './earning.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Earnings } from './entities/earning.entity';

@Module({
  // providers: [EarningService],
  controllers: [EarningController],
  // imports: [TypeOrmModule.forFeature([Earnings]),]
})
export class EarningModule { }
