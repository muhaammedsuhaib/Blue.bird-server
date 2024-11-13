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
exports.login = exports.registration = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../user/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, bio, profilePicture } = req.body;
    const existingUser = yield user_model_1.default.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
    }
    const existingUsername = yield user_model_1.default.findOne({ username });
    if (existingUsername) {
        return res.status(400).json({ message: "Username already exists" });
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    const newUser = new user_model_1.default({
        username,
        email,
        password: hashedPassword,
        bio,
        profilePicture,
    });
    yield newUser.save();
    return res.status(201).json({
        message: "User registered successfully",
        data: {
            user: newUser,
        },
    });
});
exports.registration = registration;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET_USER, {
        expiresIn: "1h",
    });
    res.cookie("userToken", token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1000,
        sameSite: "strict",
    });
    return res.status(200).json({
        message: "Login sucessfully",
        data: {
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            },
        },
    });
});
exports.login = login;
