export default interface ICreateAuthenticateUserResponseDto {
    user: {
        name: string;
        email: string;
    };
    token: string;
    refresh_token: string;
}
