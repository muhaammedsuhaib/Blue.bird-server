import mongoose, { Schema, model, Document, Types } from "mongoose";

interface IComment extends Document {
  author: Types.ObjectId;
  content: string;
  description:string,
  replies: IComment[];
  createdAt?: Date;
}

export interface IPost extends Document {
  _id: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  content: string;
  likes: mongoose.Types.ObjectId[];
  description:string,
  comments: IComment[];
  createdAt?: Date;
  updatedAt?: Date;
}

const commentSchema = new Schema<IComment>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const postSchema = new Schema<IPost>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true }, 
    description:{ type: String },
    likes: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
    comments: { type: [commentSchema], default: [] },
  },
  { timestamps: true }
);

const Post = model<IPost>("Post", postSchema);

export default Post;