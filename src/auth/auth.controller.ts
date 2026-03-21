import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Realiza o login e define o cookie HttpOnly' })
    async login(
        @Body() loginDto: LoginDto,
        @Res({ passthrough: true }) response: Response
    ) {
        return this.authService.login(loginDto, response as any);
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Remove o cookie de autenticação' })
    async logout(@Res({ passthrough: true }) response: Response) {
        return this.authService.logout(response as any);
    }
}
