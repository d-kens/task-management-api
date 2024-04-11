import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CredentialsDto } from 'src/users/dto/credential.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('/signup')
    signup(@Body(ValidationPipe) credentialsDto: CredentialsDto) {
       return this.authService.signup(credentialsDto)
    }
}
