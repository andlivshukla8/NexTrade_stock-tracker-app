import nodemailer from 'nodemailer';
import {WELCOME_EMAIL_TEMPLATE, NEWS_SUMMARY_EMAIL_TEMPLATE} from "@/lib/nodemailer/templates";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    pool: true,
    maxConnections: parseInt(process.env.NODEMAILER_MAX_CONNECTIONS || '5', 10),
    maxMessages: parseInt(process.env.NODEMAILER_MAX_MESSAGES || '100', 10),
    rateDelta: 1000,
    rateLimit: parseInt(process.env.NODEMAILER_RATE_LIMIT || '5', 10),
    connectionTimeout: parseInt(process.env.NODEMAILER_CONNECTION_TIMEOUT || '10000', 10),
    socketTimeout: parseInt(process.env.NODEMAILER_SOCKET_TIMEOUT || '10000', 10),
    greetingTimeout: parseInt(process.env.NODEMAILER_GREETING_TIMEOUT || '5000', 10),
    auth: {
        user: process.env.NODEMAILER_EMAIL!,
        pass: process.env.NODEMAILER_PASSWORD!,
    }
})

export const sendWelcomeEmail = async ({ email, name, intro }: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        .replace('{{name}}', name)
        .replace('{{intro}}', intro);

    const mailOptions = {
        from: `"NexTrade" <nextrade@jsmastery.pro>`,
        to: email,
        subject: `Welcome to NexTrade - your stock market toolkit is ready!`,
        text: 'Thanks for joining NexTrade',
        html: htmlTemplate,
    }

    await transporter.sendMail(mailOptions);
}

export const sendNewsSummaryEmail = async (
    { email, date, newsContent }: { email: string; date: string; newsContent: string }
): Promise<void> => {
    const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE
        .replace('{{date}}', date)
        .replace('{{newsContent}}', newsContent);

    const mailOptions = {
        from: `"NexTrade News" <nextrade@jsmastery.pro>`,
        to: email,
        subject: `📈 Market News Summary Today - ${date}`,
        text: `Today's market news summary from NexTrade`,
        html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
};