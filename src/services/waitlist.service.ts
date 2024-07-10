import sendEmail from '../utils/sendEmail';
import { Iwaitlist } from '../types/interfaces/waitlist.inter';
import Waitlist from '../models/waitlist.model';

export default class WaitlistService{

    static async findUserByEmail(email: string): Promise<Iwaitlist | null> {
        const data =  await Waitlist.findOne({ email })
  
        return data
    }


    static async addUser(userData: { email: string }): Promise<Iwaitlist | null> {
      const { email } = userData;
        const newUser = await Waitlist.create({ email });
        const message = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Moospire Waitlist Email</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f5f5f5;
                }
                .email-container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                }
                .header {
                    background-color: #E74C3C;
                    color: #ffffff;
                    padding: 20px;
                    border-radius: 8px 8px 0 0;
                }
                .header h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .content {
                    padding: 20px;
                }
                .content h2 {
                    font-size: 20px;
                    color: #333333;
                }
                .content p {
                    font-size: 16px;
                    color: #555555;
                    line-height: 1.5;
                }
                .content ul {
                    padding-left: 20px;
                }
                .content ul li {
                    font-size: 16px;
                    color: #555555;
                    margin-bottom: 10px;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    color: #888888;
                    font-size: 14px;
                }
                .social-media {
                    text-align: center;
                    margin-top: 20px;
                }
                .social-media img {
                    margin: 0 10px;
                    width: 24px;
                    height: 24px;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>You're on the Waitlist!</h1>
                </div>
                <div class="content">
                    <h2>Hi ${newUser.email.split('@')[0]},</h2>
                    <p>Thank you for registering on the waitlist for Moospire! We're thrilled to have you on board and can't wait to show you what we've been working on.</p>
                    <h2>What's Next?</h2>
                    <p>As a waitlist member, you’ll be among the first to know about our official launch. We’re putting the final touches on Moospire to ensure you have the best experience possible. In the meantime, here’s what you can look forward to:</p>
                    <ul>
                        <li>AI-Powered Moodboard Generation: Quickly create moodboards from your ideas, sketches, and even voice notes.</li>
                        <li>Seamless Integration with Figma: Copy moodboards directly into your Figma canvas without switching tabs.</li>
                        <li>...and many more.</li>
                    </ul>
                    <h2>Stay Connected</h2>
                    <p>We’ll keep you updated with our progress and let you know as soon as Moospire is ready for you to explore. In the meantime, feel free to follow us on social media for sneak peeks and more exciting updates.</p>
                    <p>Best regards,<br>The Moospire Team</p>
                </div>
                <div class="footer">
                    &copy; 2024 Moospire. All rights reserved.
                </div>
                <div class="social-media">
                    <a href="#"><img src="path/to/facebook-icon.png" alt="Facebook"></a>
                    <a href="#"><img src="path/to/twitter-icon.png" alt="Twitter"></a>
                    <a href="#"><img src="path/to/instagram-icon.png" alt="Instagram"></a>
                    <a href="#"><img src="path/to/youtube-icon.png" alt="YouTube"></a>
                </div>
            </div>
        </body>
        </html>
      `;
    
        await sendEmail({
            to: newUser.email,
            subject: 'Welcome to moospire 🚀',
            message,
        });

        return newUser;
    }
    

}