import { Request, Response, NextFunction, RequestHandler } from "express";
import Student from "../schema/studentSchema";
import sequelize from "../db/connectDb";
import { col, fn } from "sequelize";


export const getStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const student = await Student.findAll();
    if (!student) {
      return res.status(400).json({ message: "student topilmadi" });
    }
    return res.status(200).json(student);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error" });
  }
};
export const addStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { username, joinedAt, leftAt } = req.body;
    if (!username) {
      return res
        .status(400)
        .json({ message: "username har doim belgilanishi kerak" });
    }
    const createStudent = await Student.create({
      username,
      joinedAt: joinedAt || new Date(),
      leftAt: leftAt || null,
    });
    return res.status(200).json(createStudent);
  } catch (error: any) {
    console.log(error.message);

    return res.status(500).json({ message: error.message });
  }
};
export const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "id notogri formatda yoki yoq" });
    }
    const findStudent = await Student.findByPk(id);
    if (!findStudent) {
      return res.status(400).json({ message: "student topilmadi" });
    }
    findStudent.update({ leftAt: new Date() });
    return res.status(200).json(findStudent);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getMonthStatistic = async (req: Request, res: Response, next: NextFunction):Promise<Response | void> => {
    try {
      const statistics = await Student.findAll({
        attributes: [
          [fn("DATE_TRUNC", "month", col("joinedAt")), "month"],
          [fn("COUNT", "*"), "student_count"]
        ],
        group: [fn("DATE_TRUNC", "month", col("joinedAt"))],
        order: [[fn("DATE_TRUNC", "month", col("joinedAt")), "ASC"]]
      });
  
      return res.status(200).json(statistics);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server xatosi" });
    }
  };


