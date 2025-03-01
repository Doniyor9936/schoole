import { RequestHandler, RequestParamHandler, Router } from "express";
import {
  addStudent,
  getMonthStatistic,
  updateStudent,
} from "../controller/studentCtrl";
import { validateStudentMiddleware } from "../middleware/studentMiddleware";

const studentRouter: Router = Router();

studentRouter.get(
    "/student/statistic", getMonthStatistic as RequestHandler);
studentRouter.post(
  "/createStudent",
  validateStudentMiddleware as RequestHandler,
  addStudent as RequestHandler
);
studentRouter.put("/updateStudent/:id", updateStudent as RequestHandler);

export default studentRouter;
