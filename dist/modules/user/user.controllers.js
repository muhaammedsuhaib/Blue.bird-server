"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggestion_profiles = exports.profile = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("./user.model"));
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    const profile = yield user_model_1.default.findById(id);
    if (!profile) {
        return res.status(404).json({ message: "User not found" });
    }
    return res
        .status(200)
        .json({ message: "User profile retrieved successfully", data: profile });
});
exports.profile = profile;
const suggestion_profiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    const allprofiles = yield user_model_1.default.find();
    const profiles = allprofiles.filter((profile) => !(profile === null || profile === void 0 ? void 0 : profile._id.equals(id)));
    if (!profiles) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
        message: "Suggested profiles retrieved successfully",
        data: profiles,
    });
});
exports.suggestion_profiles = suggestion_profiles;