"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const try_catch_1 = __importDefault(require("../../middleware/try_catch"));
const uplod_image_1 = __importDefault(require("../../middleware/uplod_image"));
const storie_controllers_1 = require("./storie.controllers");
const router = express_1.default.Router();
router.post('/storie', uplod_image_1.default, (0, try_catch_1.default)(storie_controllers_1.create_storie));
exports.default = router;
