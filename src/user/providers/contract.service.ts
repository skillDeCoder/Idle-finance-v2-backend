import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { UserService } from 'src/user/providers/user.service';
import { WalletService } from 'src/wallet/providers/wallet.service';

@Injectable()
export class ContractService {
    private provider: ethers.JsonRpcProvider;

    constructor(
        private configService: ConfigService,
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
        private walletService: WalletService
    ) {
        this.provider = new ethers.JsonRpcProvider(
            this.configService.get<string>('RPC_URL'),
        );
    }
}