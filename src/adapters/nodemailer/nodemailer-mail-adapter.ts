import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f33d54ab5e8ad5",
    pass: "fa021389fafaa6"
  }
});


export class NodeMailerAdapter implements MailAdapter {

  async sendMail({ subject, body }: SendMailData) {
    console.log("🚀 ~ file: nodemailer-mail-adapter.ts ~ line 17 ~ NodeMailerAdapter ~ sendMail ~ body", body)
    transport.sendMail({
      from: "Equipe teste <teste@teste.com>",
      to: "Willian Onuki <willianonuki1@gmail.com>",
      subject,
      // config template email line for line with array
      html: body
    })
  };
}
