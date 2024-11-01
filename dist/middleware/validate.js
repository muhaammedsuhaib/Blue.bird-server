"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const messages = error.details.map((detail) => detail.message).join(", ");
            res.status(400).json({ message: messages });
            return;
        }
        next();
    };
};
exports.default = validate;
