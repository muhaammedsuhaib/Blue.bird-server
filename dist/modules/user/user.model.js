"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default: "",
    },
    profilePicture: {
        type: String,
        default: "https://bluebir-d.vercel.app/user-profile.png",
    },
    followers: {
        type: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }],
        default: [],
    },
    following: {
        type: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }],
        default: [],
    },
    stories: {
        type: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Story" }],
        default: [],
    },
    archivedStories: {
        type: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Story" }],
        default: [],
    },
    posts: {
        type: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Post" }],
        default: [],
    },
    likedPosts: {
        type: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Post" }],
        default: [],
    },
    comments: {
        type: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Comment" }],
        default: [],
    },
    lastLogin: {
        type: Date,
    },
}, {
    timestamps: true,
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
