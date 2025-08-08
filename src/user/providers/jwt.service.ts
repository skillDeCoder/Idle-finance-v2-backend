import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwtPayload.interface';

@Injectable()
export class JwtService {
    private readonly ACCESS_TOKEN_EXPIRATION: string;
    private readonly REFRESH_TOKEN_EXPIRATION: string;
    private readonly ACCESS_TOKEN_SECRET: string;
    private readonly REFRESH_TOKEN_SECRET: string;

    constructor(
        private readonly jwt: NestJwtService,
        private readonly config: ConfigService
    ) {
        this.ACCESS_TOKEN_EXPIRATION = this.config.get<string>('APP_CONFIG.JWT_ACCESS_EXPIRATION');
        this.REFRESH_TOKEN_EXPIRATION = this.config.get<string>('APP_CONFIG.JWT_REFRESH_EXPIRATION');
        this.ACCESS_TOKEN_SECRET = this.config.get<string>('APP_CONFIG.JWT_ACCESS_SECRET');
        this.REFRESH_TOKEN_SECRET = this.config.get<string>('APP_CONFIG.JWT_REFRESH_SECRET');
    }

    signAccessToken(payload: JwtPayload): string {
        return this.jwt.sign(payload, {
            secret: this.ACCESS_TOKEN_SECRET,
            expiresIn: this.ACCESS_TOKEN_EXPIRATION
        });
    }

    signRefreshToken(payload: JwtPayload): string {
        return this.jwt.sign(payload, {
            secret: this.REFRESH_TOKEN_SECRET,
            expiresIn: this.REFRESH_TOKEN_EXPIRATION
        });
    }

    verifyAccessToken(token: string): JwtPayload {
        return this.jwt.verify(token, {
            secret: this.ACCESS_TOKEN_SECRET
        });
    }

    verifyRefreshToken(token: string): JwtPayload {
        return this.jwt.verify(token, {
            secret: this.REFRESH_TOKEN_SECRET
        });
    }

    decode(token: string) {
        return this.jwt.decode(token);
    }
}