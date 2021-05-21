import UserDto from "../../dto/UserDto";
import User from "../../infra/typeorm/entities/User";
import IUsersRepository from "../IUsersRepository";

export default class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create(userDto: UserDto): Promise<UserDto> {
        const user = new User();
        Object.assign(user, userDto);

        this.users.push(user);

        return user;
    }
    async list(): Promise<UserDto[]> {
        return this.users;
    }

    async findByEmail(email: string): Promise<UserDto> {
        return this.users.find((user) => user.email === email);
    }
    async findById(id: string): Promise<UserDto> {
        return this.users.find((user) => user.id === id);
    }
}
