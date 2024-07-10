import mongoose, { Document, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Iuser } from "../types/interfaces/user.inter";
import { UserType } from "../types/enums/user";

const userSchema = new Schema<Iuser>({
	fullname: {
		type: String,
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
	},
	phone: {
		type: String,
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	image: {
		type: String,
		default: '',
	},
	about: {
		type: [String],
		default: [],
	},
	goals : {
		type: [String],
		default: [],
	},
	preference : {
		type: [String],
		default: [],
	},
	userType: {
		type: String,
		enum: Object.values(UserType),
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false,
		select: false,
	},
    verificationToken: {
			type: String
	},
	verificationTokenExpires: {
			type: Date
	},
    otp: {
        code: {
            type: Number
        },
        expiresAt: {
            type: Date
        }
    },
	
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	verifyEmailToken: {
		type: String,
		select: false,
	},
	createdAt: {
			type: Date,
			default: Date.now(),
	},
});

userSchema.index({ location: '2dsphere' });

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
	  return next();
	}
  
	try {
	  const hashedPassword = await bcrypt.hash(this.password, 12);
	  this.password = hashedPassword;
	} catch (error) {
	  console.log(error);
	  return next();
	}
  
	next();
  });
  

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY || '', {
      expiresIn: process.env.JWT_EXPIRES_IN || '',
    });
    return token;
};

userSchema.methods.correctPassword = async function(
    candidatePassword: string,
    userPassword: string
){
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp: any) {
    if (this.passwordChangedAt) {
      const changedTimestamp = String(
        this.passwordChangedAt.getTime() / 1000
      );
  
      return JWTTimestamp < changedTimestamp;
    }
  
    // False means NOT changed
    return false;
  };

const User = mongoose.model<Iuser>('User', userSchema)

export default User;