import { Request, Response, NextFunction } from 'express';

// Define the type for the error object
interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  keyValue?: Record<string, any>;
}

const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.log("Error:", error);

  if (error.statusCode) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  if (error.name === "TokenExpiredError") {
    return res.status(401).json({ message: 'Unauthorized: Your token has expired. Login again.' });
  }

  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
  }

  if (error.code === 11000) {
    const keyName = Object.keys(error.keyValue ?? {})[0];
    return res.status(400).json({ message: `Given ${keyName} already exists.` });
  }

  console.log("Unhandled Error:", error);
  return res.status(500).json({ message: error.message || "Internal Server Error" });
};

export { errorHandler };
