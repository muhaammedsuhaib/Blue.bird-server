import express from "express";
import tryCatch from "../../middleware/try_catch";
import upload_image from "../../middleware/uplod_image";
import { create_storie, get_stories } from "./storie.controllers";

const router = express.Router();

router.route("/storie")
.post(upload_image,tryCatch(create_storie));
router.get('/storie/:id',tryCatch(get_stories))

export default router;
