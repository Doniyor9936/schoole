"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userValidation_1 = __importDefault(require("../validation/userValidation"));
const validateUserMiddleware = (req, res, next) => {
    const { error } = userValidation_1.default.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Validation error",
            errors: error.details.map((err) => err.message),
        });
    }
    return next();
};
exports.default = validateUserMiddleware;
