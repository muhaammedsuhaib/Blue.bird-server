import express from "express";
import tryCatch from "../../middleware/try_catch";
import { suggestion_profiles, profile } from "./user.controllers";

const router = express.Router();

router.get("/:id", tryCatch(profile));
router.get("/suggestions/:id", tryCatch(suggestion_profiles));

export default router;
