import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class ResetPasswordDto {
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

    @ApiProperty({
        description: "User's new password",
        example: 'password123'
    })
    @IsString()
    @IsNotEmpty()
    newPassword: string;
}
