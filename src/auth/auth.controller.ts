import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

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
}
