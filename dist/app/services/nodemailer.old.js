import 'dotenv/config';
import debug from 'debug';
const logger = debug('NodeMailer');
import nodemailer from 'nodemailer';
async function nodeMailer(req, res) {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.USER_MAILER,
                pass: process.env.PASSWORD_MAILER,
            }
        });
        const mailSent = await transporter.sendMail({
            from: `"Fred Foo 👻" <'${process.env.USER_MAILER}'>`,
            to: "yumelio.message@gmail.com",
            subject: "Hello ✔",
            text: "Hello world?",
            html: "<b>Hello world?</b>",
        });
        console.log("mailSent: ", mailSent);
        return logger('Email successfully sent !');
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
export { nodeMailer };
//# sourceMappingURL=nodemailer.old.js.map