import { Request, Response } from "express";
import User from "../user/user.model";
import mongoose from "mongoose";


const sendResponse = (res: Response, status: number, message: string, data?: any) => {
  return res.status(status).json({ message, data });
};

export const registrar = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return sendResponse(res, 400, "Name is required");
  }

  const newUser = new User({ name });
  const savedUser = await newUser.save();
  if (!savedUser) {
    return sendResponse(res, 500, "Error creating user");
  }
  
  return sendResponse(res, 201, "User created successfully", savedUser);
};

export const getusers = async (req: Request, res: Response) => {
  const users = await User.find();
  
  if (users.length === 0) {
    return sendResponse(res, 404, "No users found");
  }
  
  return sendResponse(res, 200, "Users retrieved successfully", users);
};

export const userfindbyId = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return sendResponse(res, 400, "Invalid Id");
  }

  const user = await User.findById(id);
  if (!user) {
    return sendResponse(res, 404, "User not found");
  }

  return sendResponse(res, 200, "User retrieved successfully", user);
};

export const userupdatebyId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return sendResponse(res, 400, "Invalid Id");
  }

  const user = await User.findByIdAndUpdate(id, { name }, { new: true });
  if (!user) {
    return sendResponse(res, 404, "User not found");
  }

  return sendResponse(res, 200, "User updated successfully", user);
};

export const userdeletebyId = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return sendResponse(res, 400, "Invalid Id");
  }

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return sendResponse(res, 404, "User not found");
  }

  return sendResponse(res, 200, "User deleted successfully", user);
};
