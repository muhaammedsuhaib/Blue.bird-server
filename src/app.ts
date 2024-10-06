import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import connectDB from './config/db';
import dotenv from 'dotenv';
import userRoutes from './modules/user/user.routes';
import { errorHandler } from './middleware/errorHandler';
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

app.use("/api/user", userRoutes);

// Connect to MongoDB
connectDB();


app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    errorHandler(error, req, res, next);
  });

export default app;
