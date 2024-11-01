import Joi from 'joi';


const user_validation = Joi.object({
    username: Joi.string()
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
    
    email: Joi.string()
        .email() 
        .required()
        .messages({
            'string.base': 'Email must be a string',
            'string.empty': 'Email cannot be empty',
            'string.email': 'Email must be a valid email',
            'any.required': 'Email is required',
        }),
    
    password: Joi.string()
        .required()
        .min(6) 
        .messages({
            'string.base': 'Password must be a string',
            'string.empty': 'Password cannot be empty',
            'string.min': 'Password must be at least 6 characters long',
            'any.required': 'Password is required',
        }),
    
    bio: Joi.string()
        .optional()
        .max(160) 
        .messages({
            'string.base': 'Bio must be a string',
            'string.max': 'Bio cannot be more than 160 characters long',
        }),
    
    profilePicture: Joi.string()
        .uri() 
        .optional()
        .messages({
            'string.base': 'Profile picture must be a string',
            'string.uri': 'Profile picture must be a valid URL',
        }),

    followers: Joi.array()
        .items(Joi.string()) 
        .optional()
        .messages({
            'array.base': 'Followers must be an array',
        }),

    following: Joi.array()
        .items(Joi.string()) 
        .optional()
        .messages({
            'array.base': 'Following must be an array',
        }),

    posts: Joi.array()
        .items(Joi.string()) 
        .optional()
        .messages({
            'array.base': 'Posts must be an array',
        }),

    likedPosts: Joi.array()
        .items(Joi.string()) 
        .optional()
        .messages({
            'array.base': 'Liked posts must be an array',
        }),

    comments: Joi.array()
        .items(Joi.string()) 
        .optional()
        .messages({
            'array.base': 'Comments must be an array',
        }),

    lastLogin: Joi.date()
        .optional()
        .messages({
            'date.base': 'Last login must be a valid date',
        }),
});




const login_validation = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.base': 'Email must be a string',
            'string.empty': 'Email cannot be empty',
            'string.email': 'Email must be a valid email',
            'any.required': 'Email is required',
        }),
    
    password: Joi.string()
        .required()
        .min(6)
        .messages({
            'string.base': 'Password must be a string',
            'string.empty': 'Password cannot be empty',
            'string.min': 'Password must be at least 6 characters long',
            'any.required': 'Password is required',
        }),
});

export { user_validation, login_validation };
