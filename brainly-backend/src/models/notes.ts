import { Schema, model, Document } from "mongoose";

interface Inote extends Document {
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<Inote>(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const linkSchema = new Schema({
  userId: {
    type: String,
  },
  hash: {
    type: String,
  },
});

const Links = model("Link", linkSchema);
const Notes = model<Inote>("Notes", noteSchema);

export { Notes, Links };
