import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import { AppError } from "../../../../shared/errors/AppError";
import DayJsDateProvider from "../../../../shared/providers/DateProvider/implementations/DayjsDateProvider";
import IMailProvider from "../../../../shared/providers/MailProvider/IMailProvider";
import IUsersRepository from "../../repositories/IUsersRepository";
import IUsersTokensRepository from "../../repositories/IUsersTokensRepository";

@injectable()
export default class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("MailProvider")
        private mailProvider: IMailProvider
    ) {}
    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        const templatePath = resolve(
            "src",
            "shared",
            "template",
            "email",
            "forgotPassword.hbs"
        );

        if (!user) {
            throw new AppError("User does not exist");
        }

        const token = uuidv4();
        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date: new DayJsDateProvider().addHours(3),
        });

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`,
        };

        await this.mailProvider.sendMail(
            email,
            "Recuperação de senha",
            variables,
            templatePath
        );
    }
}
