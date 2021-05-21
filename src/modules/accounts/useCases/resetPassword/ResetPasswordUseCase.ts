import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import DayJsDateProvider from "../../../../shared/providers/DateProvider/implementations/DayjsDateProvider";
import IUsersRepository from "../../repositories/IUsersRepository";
import IUsersTokensRepository from "../../repositories/IUsersTokensRepository";

@injectable()
export default class ResetPasswordUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository
    ) {}
    async execute(refresh_token: string, password: string): Promise<void> {
        const userToken = await this.usersTokensRepository.findByRefreshToken(
            refresh_token
        );

        if (!userToken) {
            throw new AppError("Invalid token.");
        }

        if (
            new DayJsDateProvider().compareIfBefore(
                userToken.expires_date,
                new Date()
            )
        ) {
            throw new AppError("Expired token.");
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        user.password = await hash(password, 8);

        await this.usersRepository.create(user);

        await this.usersTokensRepository.deleteByTokenId(userToken.id);
    }
}
