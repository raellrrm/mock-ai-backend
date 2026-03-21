import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from 'src/prisma.service';
import { AiService } from './ai.service';
import { Role } from '@prisma/client';

@Injectable()
export class MessagesService {

  constructor(
    private prisma: PrismaService,
    private aiService: AiService
  ) { }

  async createFromAudio(chatId: string, userId: string, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo de audio foi enviado');
    }

    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId }
    });

    if (!chat) {
      throw new NotFoundException('Chat não encontrado.');
    }

    if (chat.userId !== userId) {
      throw new ForbiddenException('Você não tem permissão para enviar mensagens neste chat.');
    }

    const context = `Título: ${chat.title}. Tópicos: ${chat.tags.join(', ')}`;

    const aiResult = await this.aiService.processAudioAndGetFeedback(
      file.buffer,
      file.mimetype,
      context,
    );

    const [userMessage, aiMessage] = await this.prisma.$transaction([
      this.prisma.message.create({
        data: {
          chatId,
          role: Role.USER,
          content: aiResult.transcription,
          audioUrl: 'link_temporario_para_o_arquivo_de_audio',
        },
      }),

      this.prisma.message.create({
        data: {
          chatId,
          role: Role.AI,
          content: aiResult.aiResponse,
          aiFeedback: {
            score: aiResult.score,
            feedback: aiResult.feedback,
          },
        },
      }),
    ])

    return aiMessage;
  }

  async findAllByChat(chatId: string, userId: string) {
    const chat = await this.prisma.chat.findUnique({ where: { id: chatId } });
    if (!chat || chat.userId !== userId) {
      throw new ForbiddenException('Acesso negado.');
    }

    return this.prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: 'asc' }
    });
  }

  findAll() {
    return `This action returns all messages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
