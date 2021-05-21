import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import IUserResponseDTO from "../../dto/IUserResponseDTO";
import UserMap from "../../mapper/UserMap";
import IUsersRepository from "../../repositories/IUsersRepository";

@injectable()
export default class ShowUserProfileUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute(id: string): Promise<IUserResponseDTO> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        return UserMap.toDto(user);
    }
}
