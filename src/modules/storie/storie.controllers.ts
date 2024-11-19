import { Response } from "express";
import mongoose, { Types } from "mongoose";
import User from "../user/user.model";
import Story from "./storie.model";
import { IUplodimage } from "../../middleware/uplod_image";

export const create_storie = async (
  req: IUplodimage,
  res: Response
): Promise<Response> => {
  const { description, author } = req.body;

  const content = req.cloudinaryImageUrl;

  if (!mongoose.isValidObjectId(author)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  const user = await User.findById(author);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  if (!content) {
    return res.status(400).json({ message: "Please provide an image." });
  }
  const newstories = new Story({
    author: new Types.ObjectId(author),
    content,
    description,
  });

  await newstories.save();

  await User.updateOne(
    { _id: new Types.ObjectId(author) },
    { $push: { stories: newstories._id } }
  );

  return res.status(201).json({
    message: "stories created successfully",
    data: newstories,
  });
};
