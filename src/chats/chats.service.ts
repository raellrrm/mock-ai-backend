import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
