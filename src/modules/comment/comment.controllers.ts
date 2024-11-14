import { Request, Response } from "express";
import Post from "../post/post.model";
import Comment from "./comment.model";

export const add_comment = async (req: Request, res: Response) => {
  const { authorId, content, postId } = req.body;
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  const comment = new Comment({
    author: authorId,
    content,
    post: post._id,
  });

  await comment.save();

  post.comments.push(comment._id);
  await post.save();

  return res
    .status(201)
    .json({ message: "Comment added successfully", data:comment });
};

export const reply_comment = async (req: Request, res: Response) => {
  const { authorId, commentId, content } = req.body;

  const parentComment = await Comment.findById(commentId);
  if (!parentComment) {
    return res.status(404).json({ message: "Parent comment not found" });
  }

  const reply = new Comment({
    author: authorId,
    content,
    post: parentComment.post,
  });

  await reply.save();

  parentComment.replies.push(reply._id);
  await parentComment.save();

  return res.status(201).json({ message: "Reply added successfully", data:reply });
};
