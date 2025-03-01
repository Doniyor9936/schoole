import Joi from "joi";

export const studentValidationSchema = Joi.object({
  username: Joi.string().min(3).max(50).required().messages({
    "string.base": `"username" faqat matn bo‘lishi kerak`,
    "string.empty": `"username" bo‘sh bo‘lishi mumkin emas`,
    "string.min": `"username" kamida 3 ta harf bo‘lishi kerak`,
    "string.max": `"username" eng ko‘pi bilan 50 ta harf bo‘lishi mumkin`,
    "any.required": `"username" majburiy maydon`,
  }),
  joinedAt: Joi.date().iso().required().messages({
    "date.base": `"joinedAt" noto‘g‘ri sana formatida`,
    "date.iso": `"joinedAt" ISO8601 formatida bo‘lishi kerak`,
    "any.required": `"joinedAt" majburiy maydon`,
  }),
  leftAt: Joi.date().iso().allow(null).messages({
    "date.base": `"leftAt" noto‘g‘ri sana formatida`,
    "date.iso": `"leftAt" ISO8601 formatida bo‘lishi kerak`,
  }),
});

