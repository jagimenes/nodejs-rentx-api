import ICreateUserToken from "../dto/UserTokenDto";
import UserToken from "../infra/typeorm/entities/UserToken";

export default interface IUsersTokensRepository {
    create(userTokenDto: ICreateUserToken): Promise<UserToken>;
    findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken>;
    deleteByTokenId(id: string): Promise<void>;
    findByRefreshToken(refresh_token: string): Promise<UserToken>;
}
