import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaService } from 'src/prisma.service';
import { AiService } from './ai.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [MessagesController],
  providers: [MessagesService, PrismaService,
    AiService],
})
export class MessagesModule { }
