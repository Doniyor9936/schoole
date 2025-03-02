"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStudentMiddleware = void 0;
const studentValidation_1 = require("../validation/studentValidation");
const validateStudentMiddleware = (req, res, next) => {
    const { error } = studentValidation_1.studentValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Validation error",
            errors: error.details.map((err) => err.message),
        });
    }
    next();
};
exports.validateStudentMiddleware = validateStudentMiddleware;
