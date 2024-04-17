import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('/signup')
    signup(@Body(ValidationPipe) userDto: UserDto) {
       return this.authService.signup(userDto)
    }

    @Post('/signin')
    signin(@Body(ValidationPipe) userDto: UserDto): Promise<{ accessToken: string }> {
        return this.authService.signin(userDto);
    }
}
