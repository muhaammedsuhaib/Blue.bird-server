"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const try_catch_1 = __importDefault(require("../../middleware/try_catch"));
const post_controllers_1 = require("./post.controllers");
const uplod_image_1 = __importDefault(require("../../middleware/uplod_image"));
const router = express_1.default.Router();
router.get("/", (0, try_catch_1.default)(post_controllers_1.get_posts));
router.get("/:id", (0, try_catch_1.default)(post_controllers_1.unique_post));
router.post("/", uplod_image_1.default, (0, try_catch_1.default)(post_controllers_1.create_post));
exports.default = router;
