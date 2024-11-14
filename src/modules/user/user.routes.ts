import express from "express";
import tryCatch from "../../middleware/try_catch";
import { suggestion_profiles, profile, search_profiles } from "./user.controllers";

const router = express.Router();

router.get("/:id", tryCatch(profile));
router.get("/suggestions/:id", tryCatch(suggestion_profiles));
router.get("/search/:id", tryCatch(search_profiles));

export default router;
