import Joi from "joi";

export const idSchema = Joi.object({
  id: Joi.number().required(),
});

export const filterSchema = Joi.object({
  filter: Joi.string().valid("teacher", "discipline").required(),
});

export const signupSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(10).required(),
  repeatPassword: Joi.string().trim().valid(Joi.ref("password")).required(),
});

export const signinSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(10).required(),
});

export const testSchema = Joi.object({
  name: Joi.string().trim().required(),
  pdfUrl: Joi.string().uri().required(),
  category: Joi.string()
    .trim()
    .valid("Projeto", "Prática", "Recuperação")
    .required(),
  discipline: Joi.string().trim().required(),
  teacherName: Joi.string().trim().required(),
});
