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

    
        await sendEmail(
            {
              to: newUser.email,
              subject: 'Welcome to🚀',
            },
            'index',
            {
              fullname: newUser.email,
            }
          ); 

        return newUser;
    }
    

}