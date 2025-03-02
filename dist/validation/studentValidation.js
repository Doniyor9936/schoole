"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.studentValidationSchema = joi_1.default.object({
    username: joi_1.default.string().min(3).max(50).required().messages({
        "string.base": `"username" faqat matn bo‘lishi kerak`,
        "string.empty": `"username" bo‘sh bo‘lishi mumkin emas`,
        "string.min": `"username" kamida 3 ta harf bo‘lishi kerak`,
        "string.max": `"username" eng ko‘pi bilan 50 ta harf bo‘lishi mumkin`,
        "any.required": `"username" majburiy maydon`,
    }),
    joinedAt: joi_1.default.date().iso().required().messages({
        "date.base": `"joinedAt" noto‘g‘ri sana formatida`,
        "date.iso": `"joinedAt" ISO8601 formatida bo‘lishi kerak`,
        "any.required": `"joinedAt" majburiy maydon`,
    }),
    leftAt: joi_1.default.date().iso().allow(null).messages({
        "date.base": `"leftAt" noto‘g‘ri sana formatida`,
        "date.iso": `"leftAt" ISO8601 formatida bo‘lishi kerak`,
    }),
});
