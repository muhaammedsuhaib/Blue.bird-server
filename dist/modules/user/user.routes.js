"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const try_catch_1 = __importDefault(require("../../middleware/try_catch"));
const user_controllers_1 = require("./user.controllers");
const router = express_1.default.Router();
router.get("/user/:id", (0, try_catch_1.default)(user_controllers_1.profile));
router.get("/user/suggestions/:id", (0, try_catch_1.default)(user_controllers_1.suggestion_profiles));
router.get("/user/search/:id", (0, try_catch_1.default)(user_controllers_1.search_profiles));
router.post("/user/togglefollow", (0, try_catch_1.default)(user_controllers_1.toggle_follow));
exports.default = router;
