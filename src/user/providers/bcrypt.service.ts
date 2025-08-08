import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptService {
  private readonly saltRounds: string;

  constructor(private readonly configService: ConfigService) {
    this.saltRounds = this.configService.get<string>('SALT_ROUNDS');
  }

  async hash(data: string): Promise<string> {
    return bcrypt.hash(data, this.saltRounds);
  }

  async compare(raw: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(raw, hashed);
  }
}
