import joi from "joi";
import { ObjectIdValidation } from "../../middleware/validation.middleware.js";

export const createMeetingSchema = joi
  .object({
    person: joi.string().required(),
    about: joi.string().required(),
    address: joi.string().required(),
    time: joi.string().required(),
    date: joi.date().required(),
    notes: joi.string().required(),
    in_or_out: joi.string().valid("Inside","Outside").required(),
  })
  .required();
