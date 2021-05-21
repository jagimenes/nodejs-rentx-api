import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import IMailProvider from "../IMailProvider";

@injectable()
export default class EtherealMailProvider implements IMailProvider {
    private client: Transporter;
    constructor() {
        nodemailer
            .createTestAccount()
            .then((account) => {
                this.client = nodemailer.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass,
                    },
                });
            })
            .catch((error) => console.log(error));
    }
    async sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string
    ): Promise<void> {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const templateFile = fs.readFileSync(path).toString("utf-8");
        const templateParsed = handlebars.compile(templateFile);
        const templateHTML = templateParsed(variables);

        const message = await this.client.sendMail({
            to,
            from: "RentX <noreply@rentx.com.br>",
            subject,
            html: templateHTML,
        });

        console.log(`Message sent: ${message.messageId}`);
        console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
    }
}
