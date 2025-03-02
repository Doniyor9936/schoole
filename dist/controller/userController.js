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
const userSchema_1 = __importDefault(require("../schema/userSchema"));
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUser = yield userSchema_1.default.findAll();
        if (!findUser) {
            return res.status(400).json({ message: "foydalanuvchilar topilmadi" });
        }
        return res.status(200).json(findUser);
    }
    catch (error) {
        next(error);
    }
});
const getOneUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const findOneUser = yield userSchema_1.default.findByPk(id);
        if (!findOneUser) {
            return res.status(400).json({ message: "foydalanuvchi topilmadi" });
        }
        return res.status(200).json(findOneUser);
    }
    catch (error) {
        next(error);
    }
});
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, role } = req.body;
        const createUser = yield userSchema_1.default.create({ username, email, password, role });
        return res.status(200).json(createUser);
    }
    catch (error) {
        next(error);
    }
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { username, email, password, role } = req.body;
        if (!id) {
            return res.status(400).json({ message: "id topilmadi" });
        }
        const findUser = yield userSchema_1.default.findByPk(id);
        if (!findUser) {
            return res.status(400).json({ message: "foydalanuvchi topilmadi" });
        }
        const editUser = yield userSchema_1.default.update({ username, email, password, role }, { where: { id } });
        return res.status(200).json(editUser);
    }
    catch (error) {
        next(error);
    }
});
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const findUser = yield userSchema_1.default.findByPk(id);
        if (!findUser) {
            return res.status(400).json({ message: "foydalanuvchi topilmadi" });
        }
        yield userSchema_1.default.destroy();
        return res.status(200).json({ message: "foydalanuvchi ochrildi" });
    }
    catch (error) {
        next(error);
    }
});
exports.default = { getAllUser, getOneUser, createUser, deleteUser, updateUser };
