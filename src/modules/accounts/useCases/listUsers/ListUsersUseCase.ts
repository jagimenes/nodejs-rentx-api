import { inject, injectable } from "tsyringe";

import ICreateUserDto from "../../dto/UserDto";
import IUsersRepository from "../../repositories/IUsersRepository";

@injectable()
export default class ListUsersUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute(): Promise<ICreateUserDto[]> {
        const users = await this.usersRepository.list();

        return users;
    }
}
