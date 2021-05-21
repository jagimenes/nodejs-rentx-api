import UserTokenDto from "../../dto/UserTokenDto";
import UserToken from "../../infra/typeorm/entities/UserToken";
import IUsersTokensRepository from "../IUsersTokensRepository";

export default class UsersTokensInMemory implements IUsersTokensRepository {
    private userTokens: UserToken[] = [];
    async create(userTokenDto: UserTokenDto): Promise<UserToken> {
        const userToken = new UserToken();
        Object.assign(userToken, userTokenDto);

        await this.userTokens.push(userToken);

        return userToken;
    }
    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken> {
        const userTokens = await this.userTokens.find(
            (userToken) =>
                userToken.user_id === user_id &&
                userToken.refresh_token === refresh_token
        );
        return userTokens;
    }

    async deleteByTokenId(id: string): Promise<void> {
        const userToken = await this.userTokens.find(
            (userToken) => userToken.id === id
        );
        await this.userTokens.splice(this.userTokens.indexOf(userToken));
    }

    async findByRefreshToken(refresh_token: string): Promise<UserToken> {
        const userToken = await this.userTokens.find(
            (userToken) => userToken.refresh_token === refresh_token
        );

        return userToken;
    }
}
