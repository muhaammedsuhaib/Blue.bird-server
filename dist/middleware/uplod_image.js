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
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
});
const upload_image = (req, res, next) => {
    upload.single("file")(req, res, (error) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            return res.status(400).json({ message: "Error uploading file" });
        }
        if (req.file) {
            try {
                const result = yield cloudinary_1.default.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
                    if (error) {
                        return next(error);
                    }
                    req.cloudinaryImageUrl = result === null || result === void 0 ? void 0 : result.secure_url;
                    next();
                });
                result.end(req.file.buffer);
            }
            catch (error) {
                return next(error);
            }
        }
        else {
            next();
        }
    }));
};
exports.default = upload_image;
