import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({ example: 'israel.dev@email.com' })
    @IsEmail({}, {message: 'Forneça un endereço de email válido.'})
    email: string;

    @ApiProperty({example: 'senha_forte_123'})
    @IsString()
    @IsNotEmpty({message: 'A senha é obrigatória.'})
    password: string;
}