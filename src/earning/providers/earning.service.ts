// import { Injectable } from "@nestjs/common";
// import { Cron, CronExpression } from "@nestjs/schedule";
// import { Repository } from "typeorm";
// import { Earnings } from "../entities/earning.entity";

// @Injectable()
// export class EarningService {
//     constructor(
//         private readonly earningsRepo: Repository<Earnings>
//     ) { }

//     // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
//     // async storeDailyEarnings() {
//     //     const today = new Date();

//     //     // Store daily snapshot
//     //     await this.earningsRepo.save({
//     //         user: { id: user.id },
//     //         amount: earnings,
//     //         date: today,
//     //     });
//     // }
// }