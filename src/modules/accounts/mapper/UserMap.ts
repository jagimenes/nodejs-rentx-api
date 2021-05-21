import { classToClass } from "class-transformer";

import IUserResponseDTO from "../dto/IUserResponseDTO";
import ICreateUserDto from "../dto/UserDto";

export default class UserMap {
    static toDto({
        email,
        name,
        id,
        avatar,
        avatar_url,
    }: ICreateUserDto): IUserResponseDTO {
        const user = classToClass({
            email,
            name,
            id,
            avatar,
            avatar_url,
        });
        return user;
    }
}
