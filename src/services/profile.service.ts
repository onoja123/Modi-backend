import { Iuser } from "../types/interfaces/user.inter";
import User from "../models/user.model";
import { UserStatus, UserType } from "../types/enums/user";

type Location =  {
  formattedAddress: string,
  lng: number,
  lat: number,
  placeId: string
}

export default class ProfileService {

  static async getProfile(userId: string): Promise<Partial<Iuser> | null> {
    const userProfile = await User.findById(userId)


    if(!userProfile){
      return null;
    }
    return userProfile;
  }

  static async updateUserAbout(id: string, about: string): Promise<Iuser | null> {
    const profile = await User.findByIdAndUpdate(
      id, 
      { $set: { about } },
      { new: true, select: '+email' }
    );
    return profile;
  }

  static async updateUserGoals(id: string, goals: string): Promise<Iuser | null> {
    const profile = await User.findByIdAndUpdate(
      id, 
      { $set: { goals } },
      { new: true, select: '+email' }
    );
    return profile;
  }

  static async updateUserPreference(id: string, preference: string): Promise<Iuser | null> {
    const profile = await User.findByIdAndUpdate(
      id, 
      { $set: { preference } },
      { new: true, select: '+email' }
    );
    return profile;
  }

  static async updateUserType(id: string, userType: UserType): Promise<Iuser | null> {
    const profile = await User.findByIdAndUpdate(
      id, 
      { $set: { userType } },
      { new: true, select: '+email' }
    );
    return profile;
  }
  

  static async deleteMember(id: string): Promise<Iuser | null> {
    const deleteMember = await User.findByIdAndDelete(id, {new: true});
    return deleteMember;
  } 

}
