import mongoose, { Schema, model, Document } from "mongoose";

export interface IStory extends Document {
  content: string;
  postedAt: Date;
  author: mongoose.Types.ObjectId;
  description: string;
  isArchived: boolean;
}

const storySchema = new Schema<IStory>(
  {
    content: {
      type: String,
      required: true,
    },
    postedAt: {
      type: Date,
      default: Date.now,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: { type: String },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Story = model<IStory>("Story", storySchema);
export default Story;
