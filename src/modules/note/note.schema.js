import joi from "joi";

// signUpSchema
export const createNoteSchema = joi
  .object({
    title: joi.string().required(),
    content: joi.string().required(),
    manager_id:joi.number().required(),
    meeting_id:joi.number().required()
})
  .required();
