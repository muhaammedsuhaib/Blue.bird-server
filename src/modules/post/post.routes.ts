import express from "express";
import tryCatch from "../../middleware/try_catch";
import { create_post, get_posts, unique_post } from "./post.controllers";
import upload_image from "../../middleware/uplod_image";

const router = express.Router();

router.get("/", tryCatch(get_posts));
router.get("/:id", tryCatch(unique_post));
router.post("/", upload_image, tryCatch(create_post));

export default router;
