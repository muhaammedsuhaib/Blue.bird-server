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
exports.get_stories = exports.create_storie = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const user_model_1 = __importDefault(require("../user/user.model"));
const storie_model_1 = __importDefault(require("./storie.model"));
const create_storie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { author } = req.body;
    const content = req.cloudinaryImageUrl;
    if (!mongoose_1.default.isValidObjectId(author)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    const user = yield user_model_1.default.findById(author);
    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }
    if (!content) {
        return res.status(400).json({ message: "Please provide an image." });
    }
    const newstories = new storie_model_1.default({
        author: new mongoose_1.Types.ObjectId(author),
        content,
    });
    yield newstories.save();
    yield user_model_1.default.updateOne({ _id: new mongoose_1.Types.ObjectId(author) }, { $push: { stories: newstories._id } });
    return res.status(201).json({
        message: "stories created successfully",
        data: newstories,
    });
});
exports.create_storie = create_storie;
const get_stories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid user ID format" });
    }
    const user = yield user_model_1.default.findById(id).populate("following", "_id");
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const followingIds = user.following.map((followedUser) => followedUser._id);
    const stories = yield storie_model_1.default.aggregate([
        {
            $match: {
                author: { $in: followingIds },
                isArchived: false,
            },
        },
        {
            $group: {
                _id: "$author",
                stories: {
                    $push: {
                        content: "$content",
                        description: "$description",
                        postedAt: "$postedAt",
                        _id: "$_id",
                    },
                },
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "authorDetails",
            },
        },
        {
            $unwind: "$authorDetails",
        },
        {
            $project: {
                _id: 0,
                author: {
                    _id: "$authorDetails._id",
                    username: "$authorDetails.username",
                    profilePicture: "$authorDetails.profilePicture",
                },
                stories: 1,
            },
        },
    ]);
    return res.status(200).json({
        message: "Stories retrieved successfully",
        data: stories,
    });
});
exports.get_stories = get_stories;
