import { injectable, inject } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import IStorageProvider from "../../../../shared/providers/StorageProvider/IStorageProvider";
import ICreateUserDto from "../../dto/UserDto";
import IUsersRepository from "../../repositories/IUsersRepository";

interface IRequest {
    user_id: string;
    avatar_file: string;
}

@injectable()
export default class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {}

    async execute({ user_id, avatar_file }: IRequest): Promise<ICreateUserDto> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        if (user.avatar) {
            await this.storageProvider.delete(user.avatar, "avatar");
        }

        await this.storageProvider.save(avatar_file, "avatar");

        user.avatar = avatar_file;

        const updatedUser = await this.usersRepository.create(user);

        return updatedUser;
    }
}
