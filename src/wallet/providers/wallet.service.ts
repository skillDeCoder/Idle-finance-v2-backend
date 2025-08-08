import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as multichainWallet from 'multichain-crypto-wallet';

@Injectable()
export class WalletService {
    private readonly RPC_URL: string;

    constructor(
        private readonly configService: ConfigService
    ) {
        this.RPC_URL = this.configService.get<string>('RPC_URL');
    }

    createEvmWallet = (): Record<string, any> => {
        const wallet = multichainWallet.createWallet({
            network: 'ethereum',
        });

        return wallet;
    };

    encryptEvmWallet = async (
        password: string,
        privateKey: string
    ): Promise<Record<string, string>> => {
        const encrypted = await multichainWallet.getEncryptedJsonFromPrivateKey({
            network: 'ethereum',
            privateKey,
            password,
        });
        return encrypted;
    };

    decryptEvmWallet = async (
        password: string,
        encryptedWallet: string,
    ): Promise<Record<string, string>> => {
        const decrypted = await multichainWallet.getWalletFromEncryptedJson({
            network: 'ethereum',
            json: encryptedWallet,
            password,
        });
        return decrypted;
    };

    getNativeTokenBalance = async (
        address: string
    ): Promise<Record<string, number>> => {
        const balance = await multichainWallet.getBalance({
            address,
            network: 'ethereum',
            rpcUrl: this.RPC_URL,
        });
        return balance;
    };

    getERC20Balance = async (
        address: string,
        tokenAddress: string
    ): Promise<Record<string, number>> => {
        const balance = await multichainWallet.getBalance({
            address,
            network: 'ethereum',
            rpcUrl: this.RPC_URL,
            tokenAddress: tokenAddress,
        });
        return balance;
    };
}