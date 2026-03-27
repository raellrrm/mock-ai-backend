import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChatsService {

  constructor(private prisma: PrismaService) { }

  async create(createChatDto: CreateChatDto, userId: string) {
    return this.prisma.chat.create({
      data: {
        title: createChatDto.title,
        type: createChatDto.type,
        tags: createChatDto.tags as string[],
        userId: userId
      }
    });
  }

  async findAllByUser(userId: string) {
    return this.prisma.chat.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string, userId: string) {
    const chat = await this.prisma.chat.findFirst({
      where: {
        id: id,
        userId: userId
      }
    });

    if(!chat) {
      throw new NotFoundException(`Sessão de chat não encontrada ou sem permissão de acesso.`);
    }

    return chat;
  }

  /*async update(id: string, updateChatDto: UpdateChatDto, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.chat.update({
      where: { id: id },
      data: updateChatDto,
    });
  }*/

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.chat.delete({
      where: { id: id },
    });
  }
}
