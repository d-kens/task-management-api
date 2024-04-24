import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}


    async signup(userDto: UserDto) {
        await this.userService.createUser(userDto);
    }

    async signin(userDto: UserDto): Promise<{ accessToken: string }> {
        const username = await this.userService.validateUserPassword(userDto);

        if(!username) { // falsy - invalid credentials
            throw new UnauthorizedException('Invalid credentials')
        }

        const payload: JwtPayload = { username }
        const accessToken = await this.jwtService.sign(payload);

       return { accessToken };
    }
    
}
