import { RequestHandler, Router } from "express";

import userController from "../controller/userController";
import validateUserMiddleware from "../middleware/userMiddleware";

const userRouter: Router = Router();


/**
 * @swagger
 * /getUser:
 *   get:
 *     summary: Barcha foydalanuvchilarni olish
 *     description: Bazadagi barcha foydalanuvchilarni qaytaradi.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli javob, foydalanuvchilar ro'yxati.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   username:
 *                     type: string
 *                     example: "Ali"
 *                   email:
 *                     type: string
 *                     example: "ali@example.com"
 *                   role:
 *                     type: string
 *                     example: "admin"
 *       400:
 *         description: Foydalanuvchilar topilmadi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "foydalanuvchilar topilmadi"
 *       500:
 *         description: Server xatosi.
 */

userRouter.get("/getUser", userController.getAllUser as RequestHandler);

/**
 * @swagger
 * /getOne/{id}:
 *   get:
 *     summary: Bitta foydalanuvchini olish
 *     description: Berilgan ID bo'yicha foydalanuvchini topib qaytaradi.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Foydalanuvchi ID si
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli javob, foydalanuvchi ma'lumotlari.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: "Ali"
 *                 email:
 *                   type: string
 *                   example: "ali@example.com"
 *                 role:
 *                   type: string
 *                   example: "admin"
 *       400:
 *         description: Foydalanuvchi topilmadi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "foydalanuvchi topilmadi"
 *       500:
 *         description: Server xatosi.
 */

userRouter.get("/getOne/:id", userController.getOneUser as RequestHandler);

/**
 * @swagger
 * /addUser:
 *   post:
 *     summary: Yangi foydalanuvchi qo'shish
 *     description: Foydalanuvchi ma'lumotlarini yuborib, bazaga yangi foydalanuvchi qo'shadi.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *                 example: "Ali"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "ali@example.com"
 *               password:
 *                 type: string
 *                 description: "Kamida 8 ta belgidan iborat bo‘lishi va katta-kichik harf, raqam va maxsus belgi (@#$%^&*! kabi) o‘z ichiga olishi kerak"
 *                 example: "Ali123@password"
 *               role:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli qo'shildi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: "Ali"
 *                 email:
 *                   type: string
 *                   example: "ali@example.com"
 *                 role:
 *                   type: string
 *                   example: "admin"
 *       400:
 *         description: Foydalanuvchi ma'lumotlari noto'g'ri.
 *       500:
 *         description: Server xatosi.
 */

userRouter.post(
  "/addUser",
  validateUserMiddleware as RequestHandler,
  userController.createUser as RequestHandler
);

/**
 * @swagger
 * /edit/{id}:
 *   put:
 *     summary: Foydalanuvchi ma'lumotlarini yangilash
 *     description: Berilgan ID bo'yicha foydalanuvchi ma'lumotlarini tahrirlaydi.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Tahrirlanayotgan foydalanuvchi ID si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *                 example: "Ali"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "ali@example.com"
 *               password:
 *                 type: string
 *                 description: "Kamida 8 ta belgidan iborat bo‘lishi va katta-kichik harf, raqam va maxsus belgi (@#$%^&*! kabi) o‘z ichiga olishi kerak"
 *                 example: "Ali123@password"
 *               role:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: Foydalanuvchi ma'lumotlari muvaffaqiyatli yangilandi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: "Ali"
 *                 email:
 *                   type: string
 *                   example: "ali@example.com"
 *                 role:
 *                   type: string
 *                   example: "admin"
 *       400:
 *         description: ID yoki foydalanuvchi topilmadi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "foydalanuvchi topilmadi"
 *       500:
 *         description: Server xatosi.
 */

userRouter.put(
  "/edit/:id",
  validateUserMiddleware as RequestHandler,
  userController.updateUser as RequestHandler
);

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Foydalanuvchini o'chirish
 *     description: Berilgan ID bo'yicha foydalanuvchini o'chiradi.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O'chirilayotgan foydalanuvchi ID si
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli o'chirildi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "foydalanuvchi o'chirildi"
 *       400:
 *         description: Foydalanuvchi topilmadi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "foydalanuvchi topilmadi"
 *       500:
 *         description: Server xatosi.
 */

userRouter.delete(
  "/delete/:id",
  validateUserMiddleware as RequestHandler,
  userController.deleteUser as RequestHandler
);

export default userRouter;
