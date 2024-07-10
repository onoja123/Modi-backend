import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { EmailOptions } from '../types/interfaces/mail.inter';

dotenv.config();



const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const user = process.env.SMTP_USER || ''; 
    const pass = process.env.SMTP_PASS || ''; 
    const host = process.env.SMTP_HOST || ''; 
    const port = parseInt(process.env.SMTP_PORT || ''); 
    const MAIL_NAME = 'No-Reply';

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host,
      port,
      auth: {
        user,
        pass,
      },
    });

    // Define mail options
    const mailOptions = {
      from: 'moospire@gmail.com',
      to: options.to,
      subject: options.subject,
      html: options.message,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (err) {
    console.error('Error sending email:', err);
  }
};

export default sendEmail;