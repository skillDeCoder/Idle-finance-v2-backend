import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class NodeAutomationProvider {
    private readonly automationBaseUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {
        this.automationBaseUrl = this.configService.get<string>('AUTOMATION_BASE_URL')!;
    }
}