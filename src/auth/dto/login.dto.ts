import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Transform } from "class-transformer";

export class LoginDto {
    @ApiProperty({ example: 'israel.dev@email.com' })
    @Transform(({ value }) => value?.trim().toLowerCase()) 
    @IsEmail({}, { message: 'Forneça um endereço de email válido.' })
    @MaxLength(255, { message: 'O email não pode ter mais de 255 caracteres.' }) 
    email: string;

    @ApiProperty({ example: 'senha_forte_123' })
    @IsString()
    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    @MaxLength(100, { message: 'A senha excede o limite máximo permitido.' })
    password: string;
}