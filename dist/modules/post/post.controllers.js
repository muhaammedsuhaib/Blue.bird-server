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
exports.unique_post = exports.get_posts = exports.create_post = void 0;
const post_model_1 = __importDefault(require("./post.model"));
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../user/user.model"));
const create_post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, author } = req.body;
    const content = req.cloudinaryImageUrl;
    if (!mongoose_2.default.isValidObjectId(author)) {
        return res.status(400).json({ message: "Invalid ID format for author" });
    }
    const user = yield user_model_1.default.findById(author);
    if (!user) {
        return res.status(404).json({ message: "Author not found" });
    }
    if (!content) {
        return res.status(400).json({ message: "Please provide an image." });
    }
    const newPost = new post_model_1.default({
        author: new mongoose_1.Types.ObjectId(author),
        content,
        description,
    });
    yield newPost.save();
    yield user_model_1.default.updateOne({ _id: new mongoose_1.Types.ObjectId(author) }, { $push: { posts: newPost._id } });
    return res.status(201).json({
        message: "Post created successfully",
        data: newPost,
    });
});
exports.create_post = create_post;
const get_posts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_model_1.default.find()
        .populate("author", "username profilePicture")
        .sort({ createdAt: -1 });
    return res.status(200).json({
        message: "Posts retrieved successfully",
        data: posts,
    });
});
exports.get_posts = get_posts;
const unique_post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_2.default.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    const post = yield post_model_1.default.findById(id)
        .populate("author", "username profilePicture")
        .populate({
        path: "comments",
        populate: [
            { path: "author", select: "username profilePicture" },
            {
                path: "replies",
                populate: { path: "author", select: "username profilePicture" },
            },
        ],
    });
    return res.status(200).json({
        message: "Post retrieved successfully",
        data: post,
    });
});
exports.unique_post = unique_post;
