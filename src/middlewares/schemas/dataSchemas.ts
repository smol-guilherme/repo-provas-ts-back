import Joi from "joi";

export const idSchema = Joi.object({
  id: Joi.number().required(),
});

export const signupSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(10).required(),
  repeatPassword: Joi.ref("password"),
});

export const signinSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(10).required(),
});
