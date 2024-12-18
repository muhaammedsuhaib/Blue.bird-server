"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    description: { type: String },
    likes: { type: [mongoose_1.Schema.Types.ObjectId], ref: "User", default: [] },
    comments: { type: [mongoose_1.Schema.Types.ObjectId], ref: "Comment", default: [] },
}, { timestamps: true });
const Post = (0, mongoose_1.model)("Post", postSchema);
exports.default = Post;
