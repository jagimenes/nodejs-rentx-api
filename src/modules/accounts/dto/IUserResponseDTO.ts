export default interface IUserResponseDTO {
    id: string;
    email: string;
    name: string;
    avatar: string;
    avatar_url(): string;
}
