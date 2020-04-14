import nodemailer from 'nodemailer';

class Mailer {
  public testAccount: any;
  public transporter: any;

  constructor() {
    this.init();
  }

  async init(): Promise<void> {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    this.testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.testAccount.user, // generated ethereal user
        pass: this.testAccount.pass, // generated ethereal password
      },
    });
  }

  async sendMail(email: string, url: string): Promise<void> {
    // send mail with defined transport object
    const info = await this.transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: email, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: `<a href="${url}">${url}</a>`, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
}

export default new Mailer();
