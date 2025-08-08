import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('earnings')
export class EarningController {

    @Get('last-7-days')
    @ApiBearerAuth('jwt-auth')
    async getLast7Days() {
        const results = [];

        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const day = d.toISOString().split('T')[0];

            const randomEarning = parseFloat((Math.random() * (5 - 0.1) + 0.1).toFixed(4));

            results.push({ date: day, amount: randomEarning });
        }

        return results;
    }
}