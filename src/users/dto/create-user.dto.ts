import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'Israel Rodrigues', description: 'Nome completo do usuário' })
    @IsString({ message: 'O nome deve ser um texto válido.' })
    @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
    name: string;

    @ApiProperty({ example: 'israel.dev@email.com', description: 'Email válido para login' })
    @IsEmail({}, { message: 'Forneça um endereço de email válido.' })
    email: string;

    @ApiProperty({ example: 'senha_forte_123', description: 'Senha de acesso', minLength: 6 })
    @IsString()
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
    password: string;
}
