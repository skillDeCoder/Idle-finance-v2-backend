import { BadRequestException, ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UserService } from 'src/user/providers/user.service';
import { BcryptService } from 'src/user/providers/bcrypt.service';
import { JwtService } from 'src/user/providers/jwt.service';
import { ValidatePasswordDto } from '../dtos/validatePassworddto';
import { SignUpDto } from '../dtos/signup.dto';
import { EmailService } from 'src/user/providers/email.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UserService,

        private readonly bcryptService: BcryptService,

        private readonly jwtService: JwtService,

        private readonly emailService: EmailService
    ) { }

    public async signIn(data: SignInDto) {
        const user = await this.usersService.getUser({ email: data.email });
        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }

        let isEqual: boolean = false;

        try {
            isEqual = await this.bcryptService.compare(
                data.password,
                user.password
            )
        } catch (error) {
            throw new RequestTimeoutException("Could not compare passwords")
        }

        if (!isEqual) {
            throw new BadRequestException('Invalid credentials');
        }

        const accessToken = this.jwtService.signAccessToken({ sub: user.id });
        const refreshToken = this.jwtService.signRefreshToken({ sub: user.id });

        return { user: { email: user.email, id: user.id, username: user.username }, token: { accessToken, refreshToken } };
    }

    public async signUp(data: SignUpDto) {
        const existingUser = await this.usersService.findUser({ email: data.email });
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const existingUsername = await this.usersService.findUser({ username: data.username });
        if (existingUsername) {
            throw new ConflictException('Username already exists');
        }

        const hashedPassword = await this.bcryptService.hash(data.password);
        const user = await this.usersService.createUser({
            email: data.email,
            password: hashedPassword,
            username: data.username
        });

        const accessToken = this.jwtService.signAccessToken({ sub: user.id });
        const refreshToken = this.jwtService.signRefreshToken({ sub: user.id });

        return { user: { email: user.email, id: user.id, username: user.username }, token: { accessToken, refreshToken } };
    }

    async refreshAccessToken(refreshToken: string) {
        try {
            const payload = this.jwtService.verifyRefreshToken(refreshToken);

            const user = await this.usersService.getUser({ id: payload.sub });
            if (!user) {
                throw new BadRequestException('User not found');
            }

            const newAccessToken = this.jwtService.signAccessToken({ sub: user.id });

            return newAccessToken;
        } catch (error) {
            throw new BadRequestException('Invalid refresh token');
        }
    }

    public async validatePassword(id: number, data: ValidatePasswordDto) {
        const user = await this.usersService.getUser({ id });

        const isEqual = await this.bcryptService.compare(data.password, user.password);

        return isEqual;
    }

    async sendPasswordResetOtp(email: string) {
        const user = await this.usersService.getUser({ email });
        if (!user) throw new BadRequestException('User not found');

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60000); // 10 mins

        await this.usersService.saveOtp(user.id, otp, expiresAt);
        await this.emailService.sendOtpEmail(email, otp);
    }

    async verifyOtp(email: string, otp: string): Promise<boolean> {
        const user = await this.usersService.getUser({ email });
        if (!user) throw new BadRequestException('User not found');

        if (!user.otp || user.otp !== otp) {
            return false;
        }

        if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
            return false;
        }

        await this.usersService.markOtpVerified(user.id);
        return true;
    }

    async resetPassword(email: string, newPassword: string) {
        const user = await this.usersService.getUser({ email });
        if (!user) throw new BadRequestException('User not found');

        if (!user.otpVerified) {
            throw new BadRequestException('OTP not verified');
        }

        const hashedPassword = await this.bcryptService.hash(newPassword);
        await this.usersService.updatePassword(user.id, hashedPassword);

        await this.usersService.clearOtp(user.id);
    }
}
