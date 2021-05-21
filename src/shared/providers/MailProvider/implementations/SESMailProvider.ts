import aws from "aws-sdk";
import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import IMailProvider from "../IMailProvider";

@injectable()
export default class SESMailProvider implements IMailProvider {
    private client: Transporter;
    constructor() {
        this.client = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: "2010-12-01",
                region: process.env.AWS_REGION,
            }),
        });
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

        await this.client.sendMail({
            to,
            from: "RentX <contato@jagimenes.com>",
            subject,
            html: templateHTML,
        });
    }
}
