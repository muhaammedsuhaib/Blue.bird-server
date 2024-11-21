import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import User from "../user/user.model";
import Story from "./storie.model";
import { IUplodimage } from "../../middleware/uplod_image";

export const create_storie = async (
  req: IUplodimage,
  res: Response
): Promise<Response> => {
  const { author } = req.body;

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

export const get_stories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  const user = await User.findById(id).populate("following", "_id");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const followingIds = user.following.map(
    (followedUser: any) => followedUser._id
  );

  const stories = await Story.aggregate([
    {
      $match: {
        author: { $in: followingIds },
        isArchived: false,
      },
    },
    {
      $group: {
        _id: "$author",
        stories: {
          $push: {
            content: "$content",
            description: "$description",
            postedAt: "$postedAt",
            _id: "$_id",
          },
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "authorDetails",
      },
    },
    {
      $unwind: "$authorDetails",
    },
    {
      $project: {
        _id: 0,
        author: {
          _id: "$authorDetails._id",
          username: "$authorDetails.username",
          profilePicture: "$authorDetails.profilePicture",
        },
        stories: 1,
      },
    },
  ]);

  return res.status(200).json({
    message: "Stories retrieved successfully",
    data: stories,
  });
};
