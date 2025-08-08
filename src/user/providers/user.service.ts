import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { WalletService } from 'src/wallet/providers/wallet.service';
import { ConfigService } from '@nestjs/config';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private walletService: WalletService,
        private configService: ConfigService
    ) { }

    async createUser(data: Partial<IUser>): Promise<IUser> {
        const exists = await this.userRepo.findOne({ where: { email: data.email } });
        if (exists) throw new ConflictException('Email already exists');

        const user = this.userRepo.create(data);
        await this.userRepo.save(user);

        return user;
    }

    async getUser(query: Partial<IUser>): Promise<User> {
        const user = await this.findUser(query);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async findUser(query: Partial<IUser> = {}): Promise<User> {
        return await this.userRepo.findOne({ where: query });
    }

    async updateUser(id: number, data: Partial<IUser>): Promise<User> {
        const user = await this.getUser({ id });
        Object.assign(user, data);
        return await this.userRepo.save(user);
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.getUser({ id });
        await this.userRepo.remove(user);
    }
    
    async saveOtp(userId: number, otp: string, expiresAt: Date) {
        return this.userRepo.update(userId, { otp, otpExpiresAt: expiresAt, otpVerified: false });
    }

    async getOtp(userId: number) {
        return this.userRepo.findOne({
            where: { id: userId },
            select: ['id', 'otp', 'otpExpiresAt', 'otpVerified']
        });
    }

    async markOtpVerified(userId: number) {
        return this.userRepo.update(userId, { otpVerified: true });
    }

    async clearOtp(userId: number) {
        return this.userRepo.update(userId, { otp: null, otpExpiresAt: null, otpVerified: false });
    }

    async updatePassword(userId: number, hashedPassword: string) {
        return this.userRepo.update(userId, { password: hashedPassword });
    }
}
