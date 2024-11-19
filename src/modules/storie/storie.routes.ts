import express from "express";
import tryCatch from "../../middleware/try_catch";
import upload_image from "../../middleware/uplod_image";
import { create_storie } from "./storie.controllers";

const router = express.Router();

router.post('/storie',upload_image,tryCatch(create_storie))

export default router;
