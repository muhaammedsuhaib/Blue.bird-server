import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const messages = error.details.map((detail) => detail.message).join(", ");
      res.status(400).json({ message: messages });
      return;
    }

    next();
  };
};

export default validate;
