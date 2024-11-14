import mongoose, { Schema, Document, Types } from "mongoose";

export interface IComment extends Document {
  _id: mongoose.Types.ObjectId;
  author: Types.ObjectId;
  content: string;
  post: Types.ObjectId;  
  replies: Types.ObjectId[];
  createdAt?: Date;
}

const commentSchema = new Schema<IComment>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true }, // Add the post reference
    replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const Comment = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
