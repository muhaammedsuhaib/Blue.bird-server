import { Request, Response, NextFunction } from 'express';

const tryCatch = (fn: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error); 
    }
  };
};

export default tryCatch;