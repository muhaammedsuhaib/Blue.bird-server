import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import authRoutes from "./modules/auth/auth.routes";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cookieParser());

const allowedOrigin = process.env.ALLOWED_ORIGIN || "";

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigin,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

app.use(cors(corsOptions));

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Blue bird application!");
});

export default app;
