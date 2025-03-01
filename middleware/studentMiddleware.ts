import { Request, Response, NextFunction } from "express";
import { studentValidationSchema } from "../validation/studentValidation";

export const validateStudentMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { error } = studentValidationSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: error.details.map((err) => err.message),
    });
  }

  next(); 
};
