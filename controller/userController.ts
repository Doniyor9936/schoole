import { NextFunction, Request, Response } from "express";

import User from "../schema/userSchema";

const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const findUser = await User.findAll();
    if (!findUser) {
      return res.status(400).json({ message: "foydalanuvchilar topilmadi" });
    }
    return res.status(200).json(findUser);
  } catch (error) {
    next(error);
  }
};
const getOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const findOneUser = await User.findByPk(id);
    if (!findOneUser) {
      return res.status(400).json({ message: "foydalanuvchi topilmadi" });
    }
    return res.status(200).json(findOneUser);
  } catch (error) {
    next(error);
  }
};
const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { username, email, password, role } = req.body;
    const createUser = await User.create({ username, email, password, role });
    return res.status(200).json(createUser);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const { username, email, password, role } = req.body;
    if (!id) {
      return res.status(400).json({ message: "id topilmadi" });
    }
    const findUser = await User.findByPk(id);
    if (!findUser) {
      return res.status(400).json({ message: "foydalanuvchi topilmadi" });
    }
    const editUser = await User.update(
      { username, email, password, role },
      { where: { id } }
    );
    return res.status(200).json(editUser);
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const findUser = await User.findByPk(id);
    if (!findUser) {
      return res.status(400).json({ message: "foydalanuvchi topilmadi" });
    }
    await User.destroy();
    return res.status(200).json({ message: "foydalanuvchi ochrildi" });
  } catch (error) {
    next(error);
  }
};

export default { getAllUser, getOneUser, createUser, deleteUser, updateUser };
