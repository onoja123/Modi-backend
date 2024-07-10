import mongoose, { Document, Schema } from "mongoose";
import { UserStatus, UserType } from "../enums/user";



interface IOtp {
    code: number | null;
    expiresAt: Date | null;
}

export interface Iuser extends Document{
    fullname: string;
    email: string;
    phone: string;
    password: string;
    passwordConfirm: string;
    image?: string | ''; 
    about: string[];
    goals: string[];
    preference: string[];
    userType: UserType
    otp: IOtp
    userStatus: UserStatus;
    isAdmin: boolean;
    dateJoined: Date;
    verificationToken: string;
    verificationTokenExpires: Date;
    resetPasswordToken: number;
    resetPasswordExpire: Date;
    verifyEmailToken: string;
    correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
    generateAuthToken(): string;
    changedPasswordAfter(JWTTimestamp: any): boolean;
    createdAt: Date;
}