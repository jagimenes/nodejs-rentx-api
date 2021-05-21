import { AppError } from "../../../../shared/errors/AppError";
import MailProviderInMemory from "../../../../shared/providers/MailProvider/in-memory/MailProviderInMemory";
import UsersRepositoryInMemory from "../../repositories/in-memory/UsersRepositoryInMemory";
import UsersTokensRepositoryInMemory from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import SendForgotPasswordMailUseCase from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepository: UsersRepositoryInMemory;
let usersTokensRepository: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send forgot mail", () => {
    beforeEach(() => {
        usersRepository = new UsersRepositoryInMemory();
        usersTokensRepository = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepository,
            usersTokensRepository,
            mailProvider
        );
    });

    it("Should be able to send a forgot mail", async () => {
        const sendMail = spyOn(mailProvider, "sendMail");

        const user = await usersRepository.create({
            driver_license: "1651687",
            email: "email@fork.com",
            name: "Name",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute(user.email);

        expect(sendMail).toHaveBeenCalled();
    });

    it("Should not be able to send email if user does not exist", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("blablabla")
        ).rejects.toEqual(new AppError("User does not exist"));
    });

    it("Should be able to create an users token", async () => {
        const generateToken = spyOn(usersTokensRepository, "create");

        const user = await usersRepository.create({
            driver_license: "792418",
            email: "email@blabla.com",
            name: "New user",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute(user.email);

        expect(generateToken).toHaveBeenCalled();
    });
});
