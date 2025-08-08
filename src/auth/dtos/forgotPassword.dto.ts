import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
    @ApiProperty({
        description: 'User email address',
        example: 'johndoe@example.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;
}