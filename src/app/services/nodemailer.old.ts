//~ Dotenv
import 'dotenv/config';

//~ Import modules
import { Request, Response } from 'express';

//~ Import Debug
import debug from 'debug';
const logger = debug('NodeMailer');

//~ Node Mailer
import nodemailer from 'nodemailer';

async function nodeMailer(req: Request, res: Response) {

  try {
    //~ TRANSPORTER
    //& Config transporter "Outlook/Hotmail"
    // let transporter = nodemailer.createTransport({
    //   host: "smtp-mail.outlook.com",
    //   port: 535,
    //   secure: false,
    //   tls:{
    //     ciphers:'SSLv3'
    //   },
    //   auth: {
    //     user: process.env.USER_MAILER,
    //     pass: process.env.PASSWORD_MAILER, 
    //   },
    // });

    //& Config transporter "Gmail"
    // let transporter = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 465,
    //   secure: true, // true for 465, false for other ports
    //   auth: {
    //     user: `${process.env.USER_MAILER}`, // generated ethereal user
    //     pass: `${process.env.PASSWORD_MAILER}`, // generated ethereal password
    //   },
    // });

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
        // type: 'OAuth2',
        user: process.env.USER_MAILER,
        pass: process.env.PASSWORD_MAILER,
        // clientId: process.env.OAUTH_CLIENTID,
        // clientSecret: process.env.OAUTH_CLIENT_SECRET,
        // refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
    });
   
    //~ EMAIL CONTENT
    //& Config content email
    const mailSent = await transporter.sendMail({
      from: `"Fred Foo 👻" <'${process.env.USER_MAILER}'>`, // sender address
      to: "yumelio.message@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    console.log("mailSent: ", mailSent);

    return logger('Email successfully sent !');

  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}
// nodeMailer()
export { nodeMailer }