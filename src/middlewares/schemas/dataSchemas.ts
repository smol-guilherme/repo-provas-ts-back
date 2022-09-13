import Joi from "joi";

export const idSchema = Joi.object({
  id: Joi.number().required()
});
