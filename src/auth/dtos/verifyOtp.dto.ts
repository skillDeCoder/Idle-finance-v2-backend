import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifyOtpDto {
    @ApiProperty({
        description: 'User email address',
        example: 'johndoe@example.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'One-Time Password (OTP) sent to the user',
        example: '123456'
    })
    @IsNotEmpty()
    otp: string;
}