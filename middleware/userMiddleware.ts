import { Request, Response, NextFunction } from "express";
import userValidatsia from "../validation/userValidation";

 const validateUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userValidatsia.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: error.details.map((err) => err.message),
    });
  }

  return next(); 
};

export default validateUserMiddleware;
