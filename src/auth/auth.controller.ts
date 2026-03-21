import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Realiza o login e retorna o token JWT' })
    @ApiResponse({ status: 200, description: 'Login bem-sucedido.' })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get('profile')
    @ApiOperation({ summary: 'Retorna os dados do utilizador autenticado' })
    getProfile(@Request() req) {
        return req.user;
    }
}
