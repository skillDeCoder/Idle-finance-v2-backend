import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignUpDto {
    @ApiProperty({
        description: "User's username",
        example: 'johndoe'
    })
    @IsString()
    @IsNotEmpty()
    username: string;

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