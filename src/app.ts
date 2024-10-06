import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// Connect to MongoDB
connectDB();

app.get('/api',(req,res)=>{
    res.status(200).json({message:'Hello world!'});
})

export default app;
