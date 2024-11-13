import express from "express";
import tryCatch from "../../middleware/try_catch";
import { suggestion_profiles, profile, search_profiles } from "./user.controllers";
import upload_image from "../../middleware/uplod_image";
import { create_post } from "../post/post.controllers";

const router = express.Router();

router.get("/:id", tryCatch(profile));
router.get("/suggestions/:id", tryCatch(suggestion_profiles));
router.get("/search/:id", tryCatch(search_profiles));


// create post 
router.post("/post",upload_image, tryCatch(create_post));

export default router;
