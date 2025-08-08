import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
    @ApiProperty({
        description: 'User email address',
        example: 'johndoe@example.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'User password',
        example: 'password123'
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}