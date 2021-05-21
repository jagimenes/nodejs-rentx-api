import { AppError } from "../../../../shared/errors/AppError";
import UsersRepositoryInMemory from "../../repositories/in-memory/UsersRepositoryInMemory";
import UsersTokensInMemory from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import IUsersRepository from "../../repositories/IUsersRepository";
import IUsersTokensRepository from "../../repositories/IUsersTokensRepository";
import CreateUserUseCase from "../createUser/CreateUserUseCase";
import AuthenticateUserUseCase from "./AuthenticateUserUseCase";

let repository: IUsersRepository;
let tokenRepository: IUsersTokensRepository;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
const userMock = {
    name: "Test user",
    email: "mail@test.com",
    password: "banana",
};

describe("Authenticate user", () => {
    beforeEach(() => {
        repository = new UsersRepositoryInMemory();
        tokenRepository = new UsersTokensInMemory();
        createUserUseCase = new CreateUserUseCase(repository);
        authenticateUserUseCase = new AuthenticateUserUseCase(
            repository,
            tokenRepository
        );
    });

    it("Should be able to authenticate", async () => {
        await createUserUseCase.execute(userMock);

        const result = await authenticateUserUseCase.execute(userMock);

        expect(result).toHaveProperty("token");
    });

    it("Should not be able to authenticate a non existent user", async () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "non-existent@mail.com",
                password: "123",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
