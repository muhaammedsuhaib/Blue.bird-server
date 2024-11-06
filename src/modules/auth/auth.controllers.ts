import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../user/user.model";
import jwt from "jsonwebtoken";

export const registration = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, email, password, bio, profilePicture } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    bio,
    profilePicture,
  });

  await newUser.save();

  return res.status(201).json({
    message: "User registered successfully",
    data: {
      user: newUser,
    },
  });
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_USER!, {
    expiresIn: "1h",
  });

  res.cookie("userToken", token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 1000,
    sameSite: "strict",
  });

  return res.status(200).json({
    message: "Login successful",
    data: {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    },
  });
};
