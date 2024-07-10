import mongoose, { Document, Schema } from "mongoose";
import { Iwaitlist } from "../types/interfaces/waitlist.inter";


const waitlistSchema = new Schema<Iwaitlist>({
	email: {
		type: String,
		// unique: true,
		// lowercase: true,
	},
	createdAt: {
			type: Date,
			default: Date.now(),
	},
});


const Waitlist = mongoose.model<Iwaitlist>('Waitlist', waitlistSchema)

export default Waitlist;