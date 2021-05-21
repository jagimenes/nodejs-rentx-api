import { getRepository, Repository } from "typeorm";

import UserDto from "../../../dto/UserDto";
import IUsersRepository from "../../../repositories/IUsersRepository";
import User from "../entities/User";

export default class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async findByEmail(email: string): Promise<UserDto> {
        const user = await this.repository.findOne({ email });
        return user;
    }

    async findById(id: string): Promise<UserDto> {
        const user = await this.repository.findOne(id);
        return user;
    }

    async list(): Promise<UserDto[]> {
        const users = await this.repository.find();
        return users;
    }

    async create(userDto: UserDto): Promise<UserDto> {
        const user = this.repository.create();
        Object.assign(user, userDto);

        const createdUser = await this.repository.save(user);

        return createdUser;
    }
}
