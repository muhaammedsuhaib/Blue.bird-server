"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_validation = exports.user_validation = void 0;
const joi_1 = __importDefault(require("joi"));
const user_validation = joi_1.default.object({
    username: joi_1.default.string()
        .required()
        .trim()
        .min(3)
        .max(30)
        .messages({
        'string.base': 'Username must be a string',
        'string.empty': 'Username cannot be empty',
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username cannot be more than 30 characters long',
        'any.required': 'Username is required',
    }),
    email: joi_1.default.string()
        .email()
        .required()
        .messages({
        'string.base': 'Email must be a string',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email',
        'any.required': 'Email is required',
    }),
    password: joi_1.default.string()
        .required()
        .min(6)
        .messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required',
    }),
    bio: joi_1.default.string()
        .optional()
        .max(160)
        .messages({
        'string.base': 'Bio must be a string',
        'string.max': 'Bio cannot be more than 160 characters long',
    }),
    profilePicture: joi_1.default.string()
        .uri()
        .optional()
        .messages({
        'string.base': 'Profile picture must be a string',
        'string.uri': 'Profile picture must be a valid URL',
    }),
    followers: joi_1.default.array()
        .items(joi_1.default.string())
        .optional()
        .messages({
        'array.base': 'Followers must be an array',
    }),
    following: joi_1.default.array()
        .items(joi_1.default.string())
        .optional()
        .messages({
        'array.base': 'Following must be an array',
    }),
    posts: joi_1.default.array()
        .items(joi_1.default.string())
        .optional()
        .messages({
        'array.base': 'Posts must be an array',
    }),
    likedPosts: joi_1.default.array()
        .items(joi_1.default.string())
        .optional()
        .messages({
        'array.base': 'Liked posts must be an array',
    }),
    comments: joi_1.default.array()
        .items(joi_1.default.string())
        .optional()
        .messages({
        'array.base': 'Comments must be an array',
    }),
    lastLogin: joi_1.default.date()
        .optional()
        .messages({
        'date.base': 'Last login must be a valid date',
    }),
});
exports.user_validation = user_validation;
const login_validation = joi_1.default.object({
    email: joi_1.default.string()
        .email()
        .required()
        .messages({
        'string.base': 'Email must be a string',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email',
        'any.required': 'Email is required',
    }),
    password: joi_1.default.string()
        .required()
        .min(6)
        .messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required',
    }),
});
exports.login_validation = login_validation;
