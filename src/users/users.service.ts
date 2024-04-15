import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    async createUser(userDto: UserDto) {
        const { username, password } = userDto;

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt()
        user.password = await this.hashPassword(password, user.salt);

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

    async validateUserPassword(userDto: UserDto) {
        const { username, password } = userDto;
        const user = await this.userRepository.findOne({ where: { username } });

        if(user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }
    }


    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt)
    }
}
