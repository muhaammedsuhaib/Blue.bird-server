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

