import ICreateUserDto from "../dto/UserDto";

export default interface IUsersRepository {
    create(userDto: ICreateUserDto): Promise<ICreateUserDto>;
    list(): Promise<ICreateUserDto[]>;
    findByEmail(email: string): Promise<ICreateUserDto>;
    findById(id: string): Promise<ICreateUserDto>;
}
