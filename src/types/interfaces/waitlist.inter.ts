import mongoose, { Document, Schema } from "mongoose";

export interface Iwaitlist extends Document{
    email: string;
    createdAt: Date;
}