import Joi from "joi";

export const idSchema = Joi.object({
  id: Joi.number().required(),
});

export const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().trim().min(10).required(),
  repeatPassword: Joi.string().trim().valid(Joi.ref("password")).required(),
});

export const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
});
