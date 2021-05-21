import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { AppError } from "../../../../shared/errors/AppError";
import DayJsDateProvider from "../../../../shared/providers/DateProvider/implementations/DayjsDateProvider";
import ICreateAuthenticatedUserRequestDto from "../../dto/AuthenticatedUserRequest";
import ICreateAuthenticateUserResponseDto from "../../dto/AuthenticatedUserResponseDto";
import IUsersRepository from "../../repositories/IUsersRepository";
import IUsersTokensRepository from "../../repositories/IUsersTokensRepository";

@injectable()
export default class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository
    ) {}
    async execute({
        email,
        password,
    }: ICreateAuthenticatedUserRequestDto): Promise<ICreateAuthenticateUserResponseDto> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect");
        }

        if (!compare(password, user.password)) {
            throw new AppError("Email or password incorrect");
        }

        const token = sign({}, auth.secret_token, {
            subject: user.id,
            expiresIn: auth.expires_in_token,
        });

        const refresh_token = sign({ email }, auth.refresh_token, {
            subject: user.id,
            expiresIn: auth.expires_in_refresh_token,
        });

        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token,
            expires_date: new DayJsDateProvider().addDays(
                auth.expires_in_refresh_token_days
            ),
        });

        delete user.id;
        delete user.password;
        delete user.driver_license;
        delete user.avatar;
        delete user.created_at;

        return { user, token, refresh_token };
    }
}
