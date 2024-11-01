import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error('MongoDB connection URI is not defined in the .env file');
    }

    
    await mongoose.connect(mongoURI, {
      dbName:'Blue_Bird',
      autoIndex: true, 
      maxPoolSize: 10, 
    } as ConnectOptions);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  }
};

export default connectDB;
