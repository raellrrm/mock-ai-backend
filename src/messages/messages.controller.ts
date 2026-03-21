// src/messages/messages.controller.ts
import { Controller, Post, Get, Param, UseGuards, Request, UploadedFile, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('Messages')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('chat/:chatId/audio')
  @ApiOperation({ summary: 'Envia um áudio para o chat e recebe resposta da IA' })
  @ApiConsumes('multipart/form-data') 
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { 
          type: 'string',
          format: 'binary',
          description: 'Arquivo de áudio (webm, mp3, wav) máx 10MB',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file')) 
  uploadAudio(
    @Param('chatId') chatId: string,
    @Request() req,
    @UploadedFile(
      new ParseFilePipe({
        validators: [

          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), 
          new FileTypeValidator({ fileType: 'audio/*' }), 
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const userId = req.user.sub;
    return this.messagesService.createFromAudio(chatId, userId, file);
  }

  @Get('chat/:chatId')
  @ApiOperation({ summary: 'Lista todas as mensagens de um chat específico' })
  findAll(@Param('chatId') chatId: string, @Request() req) {
    const userId = req.user.sub;
    return this.messagesService.findAllByChat(chatId, userId);
  }
}