"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const try_catch_1 = __importDefault(require("../../middleware/try_catch"));
const comment_controllers_1 = require("./comment.controllers");
const router = express_1.default.Router();
router.post("/comment/", (0, try_catch_1.default)(comment_controllers_1.add_comment));
router.post("/comment/reply", (0, try_catch_1.default)(comment_controllers_1.reply_comment));
exports.default = router;
