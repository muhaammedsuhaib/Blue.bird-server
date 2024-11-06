import { Request, Response } from "express";
import mongoose from "mongoose";
import User, { IUser } from "./user.model";

export const profile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  const profile = await User.findById(id);
  if (!profile) {
    return res.status(404).json({ message: "User not found" });
  }
  return res
    .status(200)
    .json({ message: "User profile retrieved successfully", data: profile });
};

export const suggestion_profiles = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  const allprofiles = await User.find();
  const profiles = allprofiles.filter(
    (profile: IUser) => !profile?._id.equals(id)
  );

  if (!profiles) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({
    message: "Suggested profiles retrieved successfully",
    data: profiles,
  });
};

export const search_profiles = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { query } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  const searchCriteria: any = { _id: { $ne: id } };
  if (query) {
    searchCriteria.$or = [
      { username: { $regex: query, $options: "i" } },
      { email: { $regex: query, $options: "i" } },
    ];
  }

  const profiles = await User.find(searchCriteria);

  if (!profiles.length) {
    return res.status(404).json({ message: "No profiles found" });
  }

  return res.status(200).json({
    message: "Suggested profiles retrieved successfully",
    data: profiles,
  });
};
