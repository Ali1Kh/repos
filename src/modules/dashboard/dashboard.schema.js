import joi from "joi";

export const acceptAccSchema = joi
  .object({
    secretary_id: joi.number().required(),
  })
  .required();
