import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  clerkUserId: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  clerkUserId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export const User = model<IUser>("User", userSchema);