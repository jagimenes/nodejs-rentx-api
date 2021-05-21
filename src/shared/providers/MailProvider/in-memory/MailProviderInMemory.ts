import IMailProvider from "../IMailProvider";

export default class MailProviderInMemory implements IMailProvider {
    private messages: any[] = [];
    async sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string
    ): Promise<void> {
        await this.messages.push({
            to,
            subject,
            variables,
            path,
        });
    }
}
