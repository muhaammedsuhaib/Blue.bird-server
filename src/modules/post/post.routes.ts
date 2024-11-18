import express from "express";
import tryCatch from "../../middleware/try_catch";
import { create_post, get_posts, toggle_like, unique_post } from "./post.controllers";
import upload_image from "../../middleware/uplod_image";

const router = express.Router();


router.route("/post")
.get(tryCatch(get_posts))
.post( upload_image, tryCatch(create_post));


router.get("/post/:id", tryCatch(unique_post));
router.post("/post/like", tryCatch(toggle_like));


export default router;
