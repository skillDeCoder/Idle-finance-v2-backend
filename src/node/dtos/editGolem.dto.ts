import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class EditGolemDto {
    @ApiPropertyOptional({
        description: "Cores allocated to the Golem",
        example: 4
    })
    @IsOptional()
    @IsNumber()
    cores?: number;

    @ApiPropertyOptional({
        description: "Memory allocated to the Golem in GiB",
        example: "10.5GB"
    })
    @IsOptional()
    @IsString()
    memory?: string;

    @ApiPropertyOptional({
        description: "Disk space allocated to the Golem in GiB",
        example: "100GB"
    })
    @IsOptional()
    @IsString()
    disk?: string;

    @ApiPropertyOptional({
        description: "Starting fee for the Golem",
        example: "0.01 GLM"
    })
    @IsOptional()
    @IsString()
    starting_fee?: string;

    @ApiPropertyOptional({
        description: "Hourly fee for the Golem",
        example: "0.001 GLM"
    })
    @IsOptional()
    @IsString()
    env_per_hour?: string;

    @ApiPropertyOptional({
        description: "CPU cost per hour for the Golem",
        example: "0.0001 GLM"
    })
    @IsOptional()
    @IsString()
    cpu_per_hour?: string;

    @ApiPropertyOptional({
        description: "Account address associated with the Golem",
        example: "0x1234567890abcdef1234567890abcdef12345678"
    })
    @IsOptional()
    @IsString()
    account?: string;
}