import 'dotenv/config';
import debug from 'debug';
const logger = debug('NodeMailer');
import nodemailer from 'nodemailer';
import dataMailer from './dataMailer.json' assert { type: 'json' };
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.USER_MAILER,
        pass: process.env.PASSWORD_MAILER
    }
});
const sendEmail = {
    toUser(email, context) {
        logger('Email sent to user:', email);
        logger("dataMailer: ", dataMailer[`${context}`].subject);
        return transporter.sendMail({
            from: `"Yumelio 👻" <'${process.env.USER_MAILER}'>`,
            to: `${email}`,
            subject: dataMailer[`${context}`].subject,
            text: dataMailer[`${context}`].text,
            html: dataMailer[`${context}`].html
        });
    }
};
export { sendEmail };
//# sourceMappingURL=nodemailerAuto.js.map