"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const try_catch_1 = __importDefault(require("../../middleware/try_catch"));
const user_controllers_1 = require("./user.controllers");
const router = express_1.default.Router();
router.get("/:id", (0, try_catch_1.default)(user_controllers_1.profile));
router.get("/suggestions/:id", (0, try_catch_1.default)(user_controllers_1.suggestion_profiles));
exports.default = router;
