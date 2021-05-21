import { getRepository, Repository } from "typeorm";

import UserTokenDto from "../../../dto/UserTokenDto";
import IUsersTokensRepository from "../../../repositories/IUsersTokensRepository";
import UserToken from "../entities/UserToken";

export default class UsersTokensRepository implements IUsersTokensRepository {
    private userTokensRepository: Repository<UserToken>;

    constructor() {
        this.userTokensRepository = getRepository(UserToken);
    }
    async create(userTokenDto: UserTokenDto): Promise<UserToken> {
        const userToken = this.userTokensRepository.create();
        Object.assign(userToken, userTokenDto);

        const createdUserToken = await this.userTokensRepository.save(
            userToken
        );

        return createdUserToken;
    }
    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken> {
        const userTokens = await this.userTokensRepository.findOne({
            user_id,
            refresh_token,
        });
        return userTokens;
    }

    async deleteByTokenId(id: string): Promise<void> {
        await this.userTokensRepository.delete(id);
    }

    async findByRefreshToken(refresh_token: string): Promise<UserToken> {
        const userToken = await this.userTokensRepository.findOne({
            refresh_token,
        });

        return userToken;
    }
}
