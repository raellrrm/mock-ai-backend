import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString({ message: 'O nome deve ser um texto válido.' })
    @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
    name: string;

    @IsEmail({}, { message: 'Forneça um endereço de email válido.' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
    password: string;
}
