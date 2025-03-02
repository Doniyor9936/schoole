"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthStatistic = exports.updateStudent = exports.addStudent = exports.getStudents = void 0;
const studentSchema_1 = __importDefault(require("../schema/studentSchema"));
const sequelize_1 = require("sequelize");
const getStudents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield studentSchema_1.default.findAll();
        if (!student) {
            return res.status(400).json({ message: "student topilmadi" });
        }
        return res.status(200).json(student);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "server error" });
    }
});
exports.getStudents = getStudents;
const addStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, joinedAt, leftAt } = req.body;
        if (!username) {
            return res
                .status(400)
                .json({ message: "username har doim belgilanishi kerak" });
        }
        const createStudent = yield studentSchema_1.default.create({
            username,
            joinedAt: joinedAt || new Date(),
            leftAt: leftAt || null,
        });
        return res.status(200).json(createStudent);
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
});
exports.addStudent = addStudent;
const updateStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "id notogri formatda yoki yoq" });
        }
        const findStudent = yield studentSchema_1.default.findByPk(id);
        if (!findStudent) {
            return res.status(400).json({ message: "student topilmadi" });
        }
        findStudent.update({ leftAt: new Date() });
        return res.status(200).json(findStudent);
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
});
exports.updateStudent = updateStudent;
const getMonthStatistic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statistics = yield studentSchema_1.default.findAll({
            attributes: [
                [(0, sequelize_1.fn)("DATE_TRUNC", "month", (0, sequelize_1.col)("joinedAt")), "month"],
                [(0, sequelize_1.fn)("COUNT", "*"), "student_count"]
            ],
            group: [(0, sequelize_1.fn)("DATE_TRUNC", "month", (0, sequelize_1.col)("joinedAt"))],
            order: [[(0, sequelize_1.fn)("DATE_TRUNC", "month", (0, sequelize_1.col)("joinedAt")), "ASC"]]
        });
        return res.status(200).json(statistics);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server xatosi" });
    }
});
exports.getMonthStatistic = getMonthStatistic;
