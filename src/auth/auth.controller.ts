import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from 'src/users/user.entity';

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

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        console.log(user)
    }
}
