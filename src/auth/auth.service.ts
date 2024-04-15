import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService
    ) {}


    async signup(userDto: UserDto) {
        await this.userService.createUser(userDto);
    }

    async signin(userDto: UserDto) {
        const username = await this.userService.validateUserPassword(userDto);

        if(!username) {
            throw new UnauthorizedException('Invalid credentials')
        }

        console.log(username)
    }
    
}
