import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import multer, { StorageEngine } from "multer";

interface CustomRequest extends Request {
  file?: Express.Multer.File;
  cloudinaryImageUrl?: string;
}

const storage: StorageEngine = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const upload_image = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  upload.single("file")(req, res, async (error: any) => {
    if (error) {
      return res.status(400).json({ message: "Error uploading file" });
    }

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) {
              return next(error);
            }
            req.cloudinaryImageUrl = result?.secure_url;
            next();
          }
        );
        result.end(req.file.buffer);
      } catch (error) {
        return next(error);
      }
    } else {
      next();
    }
  });
};

export default upload_image;
