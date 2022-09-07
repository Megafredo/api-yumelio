//~ Dotenv
import 'dotenv/config';

//~ Import Debug
import debug from 'debug';
const logger = debug('NodeMailer');

//~ Node Mailer
import nodemailer from 'nodemailer';
import dataMailer from './dataMailer.json' assert { type: 'json' };

//~ TRANSPORTER
//& Config transporter "Gmail"
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.USER_MAILER,
        pass: process.env.PASSWORD_MAILER
    }
});

//~ EMAIL CONTENT
//& Config content email
const sendEmail = {

    toUser(email: string, context:any) {
        logger('Email sent to user:', email);
        logger("dataMailer: ", dataMailer[`${context}`].subject);
        return transporter.sendMail({
            from: `"Yumelio 👻" <'${process.env.USER_MAILER}'>`, // sender address
            to: `${email}`, // list of receivers
            subject: dataMailer[`${context}`].subject, // Subject line
            text: dataMailer[`${context}`].text, // plain text body
            html: dataMailer[`${context}`].html // html body
        });
        
    }
};

export { sendEmail };