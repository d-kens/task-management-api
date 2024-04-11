import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CredentialsDto } from 'src/users/dto/credential.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService
    ) {}


    async signup(credentialsDto: CredentialsDto) {
        await this.userService.create(credentialsDto);
    }
    
}
