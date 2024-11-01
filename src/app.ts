import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

const port: number = Number(process.env.PORT);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Blue bird application!");
});

export default app;
