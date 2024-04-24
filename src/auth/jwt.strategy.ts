import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from "./jwt-payload.interface";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'oiuytrewrghjkmnbvcxsw234567890876rewdsfghbvcxzcghew2134567890000000-=-0987trdfghjbvcxswe'
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;

        const user = await this.userService.findOne(username);

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    } 
}