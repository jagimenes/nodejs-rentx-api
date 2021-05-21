import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { AppError } from "../../../../shared/errors/AppError";
import DayJsDateProvider from "../../../../shared/providers/DateProvider/implementations/DayjsDateProvider";
import IUsersTokensRepository from "../../repositories/IUsersTokensRepository";

interface IPayload {
    sub: string;
    email: string;
}

interface ITokenReturn {
    token: string;
    refresh_token: string;
}

@injectable()
export default class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository
    ) {}
    async execute(token: string): Promise<ITokenReturn> {
        const decode = verify(token, auth.refresh_token) as IPayload;
        const user_id = decode.sub;
        const { email } = decode;

        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
            user_id,
            token
        );

        if (!userToken) {
            throw new AppError("Refresh token does not exist.");
        }

        await this.usersTokensRepository.deleteByTokenId(userToken.id);

        const refresh_token = sign({ email }, auth.refresh_token, {
            subject: user_id,
            expiresIn: auth.expires_in_refresh_token,
        });

        const createdToken = await this.usersTokensRepository.create({
            expires_date: new DayJsDateProvider().addDays(
                auth.expires_in_refresh_token_days
            ),
            refresh_token,
            user_id,
        });

        const newToken = sign({}, auth.secret_token, {
            subject: user_id,
            expiresIn: auth.expires_in_token,
        });

        return {
            token: newToken,
            refresh_token,
        };
    }
}
