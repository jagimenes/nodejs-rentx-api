import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import ICreateUserDto from "../../dto/UserDto";
import UserMap from "../../mapper/UserMap";
import IUsersRepository from "../../repositories/IUsersRepository";

@injectable()
export default class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    async execute({
        name,
        email,
        password,
        driver_license,
    }: ICreateUserDto): Promise<ICreateUserDto> {
        const verifyUser = await this.usersRepository.findByEmail(email);
        if (verifyUser) {
            throw new AppError("User already exists");
        }

        const passwordHashed = await hash(password, 8);
        const user = await this.usersRepository.create({
            name,
            email,
            password: passwordHashed,
            driver_license,
        });
        return UserMap.toDto(user);
    }
}
