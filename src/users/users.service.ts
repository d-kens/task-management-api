import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsDto } from './dto/credential.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    async create(credentialsDto: CredentialsDto) {
        const { username, password } = credentialsDto;

        const user = new User();
        user.username = username;
        user.password = password;

        try {
            await this.userRepository.save(user);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('username already taken');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
