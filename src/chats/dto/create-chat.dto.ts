import { ApiProperty } from "@nestjs/swagger";
import { ChatType } from "@prisma/client";
import { IsArray, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateChatDto {

    @ApiProperty({example: 'Entrevista Java + React'})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({enum: ChatType, example: ChatType.TECH_INTERVIEW})
    @IsEnum(ChatType, {message: 'O tipo deve ser TECH_INTERVIEW OU ENGLISH_PRACTICE'})
    type: ChatType;

    @ApiProperty({example: ['java', 'spring-boot', 'react']})
    @IsArray()
    @IsString({each: true})
    tags: String[];
}
