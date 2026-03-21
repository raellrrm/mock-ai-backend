import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [UsersModule, AuthModule, ChatsModule, MessagesModule, CloudinaryModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
