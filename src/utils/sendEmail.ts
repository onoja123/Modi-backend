import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { EmailOptions } from '../types/interfaces/mail.inter';

dotenv.config();

interface TemplateOptions {
  [key: string]: string;
}

const sendEmail = async (options: EmailOptions, templateName: string, templateOptions: TemplateOptions): Promise<void> => {
  try {
    const user = process.env.SMTP_USER || ''; 
    const pass = process.env.SMTP_PASS || ''; 
    const host = process.env.SMTP_HOST || ''; 
    const port = parseInt(process.env.SMTP_PORT || '587'); 

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host,
      port,
      auth: {
        user,
        pass,
      },
    });

    // Read the HTML template
    const templatePath = path.resolve(__dirname, `../templates/${templateName}.html`);
    let htmlContent = fs.readFileSync(templatePath, 'utf-8');

    // Replace placeholders with actual values
    for (const [key, value] of Object.entries(templateOptions)) {
      const placeholder = `{{${key}}}`;
      htmlContent = htmlContent.replace(new RegExp(placeholder, 'g'), value);
    }

    // Define mail options
    const mailOptions = {
      from: '', 
      to: options.to,
      subject: options.subject,
      html: htmlContent,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (err) {
    console.error('Error sending email:', err);
  }
};

export default sendEmail;



