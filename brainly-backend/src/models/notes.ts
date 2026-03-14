import { Schema, model, Document } from "mongoose";
import { User } from "./user.js";

interface Inote extends Document {
  title: Object;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<Inote>(
  {
    title: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const linkSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: User
  },
  hash: {
    type: String,
  }

})

const Links = model("Link", linkSchema);
const Notes = model<Inote>("Notes", noteSchema);

export { Notes  , Links};
