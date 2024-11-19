import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
import userPost from "./modules/post/post.routes";
import userComment from "./modules/comment/comment.routes";
import userStorie from "./modules/storie/storie.routes";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";

import "./service/cron_jobs";

dotenv.config();

const app = express();

app.use(cookieParser());

const allowedOrigins: string[] = (process.env.ALLOWED_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim());

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (allowedOrigins.includes(origin as string) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

app.use(cors(corsOptions));

connectDB();

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", userPost);
app.use("/api", userComment);
app.use("/api", userStorie);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Blue bird application!");
});

export default app;
