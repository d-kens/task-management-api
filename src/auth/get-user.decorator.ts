import { createParamDecorator } from "@nestjs/common";
import { User } from "src/users/user.entity";

// custom nest decorator
// that retrieves the currently aithenticated user from the request object
// and injects it into the decorated parameter

export const GetUser = createParamDecorator((data, req): User => {
    console.log(req)
    return req.user
})
