import User from '../models/user.model';
import { Iuser } from '../types/interfaces/user.inter';

export default class AuthService{
  
    static async findUserByEmail(email: string): Promise<Iuser | null> {
      const data =  await User.findOne({ email }).select('+password');

      return data
  }
    static async findUserByOTP({ email, otp }: { email: string; otp: string }): Promise<any> {
      const user = await User.findOne({  email, otp }).select("+otp");
      return user;
  }

  static async findUser(userId: string): Promise<Iuser | null> {
    const user = await User.findById(userId);

      if (!user) {
        return null; 
      }
      return user
  }
}