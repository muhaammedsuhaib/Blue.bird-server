import express from "express";
import tryCatch from "../../middleware/try_catch";
import { suggestion_profiles, profile, search_profiles, toggle_follow } from "./user.controllers";

const router = express.Router();

router.get("/user/:id", tryCatch(profile));
router.get("/user/suggestions/:id", tryCatch(suggestion_profiles));
router.get("/user/search/:id", tryCatch(search_profiles));

router.post("/user/togglefollow",tryCatch(toggle_follow))
export default router;
