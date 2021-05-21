import ICreateUserDto from "../../modules/accounts/dto/UserDto";

declare global {
    namespace Express {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        interface Request {
            user: {
                id: string;
            };
        }
    }
}
