"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const try_catch_1 = __importDefault(require("../../middleware/try_catch"));
const auth_controllers_1 = require("./auth.controllers");
const validate_1 = __importDefault(require("../../middleware/validate"));
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post('/register', (0, validate_1.default)(auth_validation_1.user_validation), (0, try_catch_1.default)(auth_controllers_1.registration));
router.post('/login', (0, validate_1.default)(auth_validation_1.login_validation), (0, try_catch_1.default)(auth_controllers_1.login));
exports.default = router;
