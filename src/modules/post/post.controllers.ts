import { Request, Response } from "express";
import Post from "./post.model";
import { Types } from "mongoose";
import mongoose from "mongoose";
import User from "../user/user.model";

interface Uplodimage extends Request {
  cloudinaryImageUrl?: string;
}

export const create_post = async (
  req: Uplodimage,
  res: Response
): Promise<Response> => {
  const { description, author } = req.body;

  const content = req.cloudinaryImageUrl;

  if (!mongoose.isValidObjectId(author)) {
    return res.status(400).json({ message: "Invalid ID format for author" });
  }

  const user = await User.findById(author);
  if (!user) {
    return res.status(404).json({ message: "Author not found" });
  }

  if (!content) {
    return res.status(400).json({ message: "Please provide an image." });
  }
  const newPost = new Post({
    author: new Types.ObjectId(author),
    content,
    description,
  });

  await newPost.save();

  await User.updateOne(
    { _id: new Types.ObjectId(author) },
    { $push: { posts: newPost._id } }
  );

  return res.status(201).json({
    message: "Post created successfully",
    data: newPost,
  });
};

export const get_posts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const posts = await Post.find()
    .populate("author", "username profilePicture")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    message: "Posts retrieved successfully",
    data: posts,
  });
};

export const unique_post = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  const post = await Post.findById(id)
    .populate("author", "username profilePicture")
    .populate({
      path: "comments",
      populate: [
        { path: "author", select: "username profilePicture" },
        {
          path: "replies",
          populate: { path: "author", select: "username profilePicture" },
        },
      ],
    });

  return res.status(200).json({
    message: "Post retrieved successfully",
    data: post,
  });
};
