import express from "express";
import tryCatch from "../../middleware/try_catch";
import { add_comment, reply_comment } from "./comment.controllers";

const router = express.Router();

router.post("/", tryCatch(add_comment));
router.post("/reply", tryCatch(reply_comment));

export default router;
