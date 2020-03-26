const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(
    smtpTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
        tls: { rejectUnauthorized: false },
    })
);
const sendMyMail = async (toEmail, fromName, subject, text, html) => {
    await transporter.sendMail({
        from: fromName,
        to: toEmail,
        subject,
        text,
        html,
    });
};

module.exports = sendMyMail;
