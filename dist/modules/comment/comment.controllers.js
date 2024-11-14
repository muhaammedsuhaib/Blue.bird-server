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
exports.reply_comment = exports.add_comment = void 0;
const post_model_1 = __importDefault(require("../post/post.model"));
const comment_model_1 = __importDefault(require("./comment.model"));
const add_comment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorId, content, postId } = req.body;
    const post = yield post_model_1.default.findById(postId);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    const comment = new comment_model_1.default({
        author: authorId,
        content,
        post: post._id,
    });
    yield comment.save();
    post.comments.push(comment._id);
    yield post.save();
    return res
        .status(201)
        .json({ message: "Comment added successfully", data: comment });
});
exports.add_comment = add_comment;
const reply_comment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorId, commentId, content } = req.body;
    const parentComment = yield comment_model_1.default.findById(commentId);
    if (!parentComment) {
        return res.status(404).json({ message: "Parent comment not found" });
    }
    const reply = new comment_model_1.default({
        author: authorId,
        content,
        post: parentComment.post,
    });
    yield reply.save();
    parentComment.replies.push(reply._id);
    yield parentComment.save();
    return res.status(201).json({ message: "Reply added successfully", data: reply });
});
exports.reply_comment = reply_comment;
