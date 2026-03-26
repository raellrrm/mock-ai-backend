import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Transform } from "class-transformer";

export class CreateUserDto {
    @ApiProperty({ example: 'João da Silva' })
    @Transform(({ value }) => value?.trim()) 
    @IsString()
    @IsNotEmpty({ message: 'O nome é obrigatório.' })
    @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres.' })
    @MaxLength(100)
    name: string;

    @ApiProperty({ example: 'israel.dev@email.com' })
    @Transform(({ value }) => value?.trim().toLowerCase())
    @IsEmail({}, { message: 'Forneça um endereço de email válido.' })
    @MaxLength(255)
    email: string;

    @ApiProperty({ example: 'senha_forte_123' })
    @IsString()
    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
    @MaxLength(100)
    password: string;
}