import Joi from "joi";

const userValidatsia = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().pattern(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  ),
  password: Joi.string().pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!]).{8,}$/
  ),
  role: Joi.string().required(),
});

export default userValidatsia;