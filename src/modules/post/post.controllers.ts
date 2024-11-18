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

export const toggle_like = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId, postId } = req.body;

  if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(postId)) {
    return res.status(400).json({ message: "Invalid ID format." });
  }
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const post = await Post.findById(postId).session(session);
    const user = await User.findById(userId).session(session);

    if (!post || !user) {
      await session.abortTransaction();
      return res.status(404).json({ message: "User or Post not found." });
    }
    user.likedPosts = user.likedPosts || [];
    const isLiked = post.likes.includes(userId);
    if (isLiked) {
      post.likes = post.likes.filter((like) => like.toString() !== userId);
      user.likedPosts = user.likedPosts.filter(
        (likedPostId) => likedPostId.toString() !== postId
      );
      await post.save({ session });
      await user.save({ session });

      await session.commitTransaction();
      return res.status(200).json({ message: "Post unliked successfully." });
    } else {
      post.likes.push(userId);
      user.likedPosts.push(postId);

      await post.save({ session });
      await user.save({ session });

      await session.commitTransaction();
      return res.status(200).json({ message: "Post liked successfully." });
    }
  } catch (error) {
    await session.abortTransaction();
    console.error("Error during like/unlike operation:", error);
    return res.status(500).json({ message: "Internal server error." });
  } finally {
    session.endSession();
  }
};
