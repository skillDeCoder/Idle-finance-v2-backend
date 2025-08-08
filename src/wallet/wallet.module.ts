import { Module } from '@nestjs/common';
import { WalletService } from './providers/wallet.service';

@Module({
  providers: [WalletService],
  exports: [WalletService]
})
export class WalletModule {}
