import joi from "joi";

export const createMeetingSchema = joi
  .object({
    manager_id:joi.number().required(),
    person: joi.string().required(),
    about: joi.string().required(),
    address: joi.string().required(),
    time: joi.string().required(),
    date: joi.date().greater(Date.now()).required(),
    notes: joi.string().required(),
    in_or_out: joi.string().valid("Inside","Outside").required(),
  })
  .required();
