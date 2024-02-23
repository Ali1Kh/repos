import joi from "joi";

// createNoteSchema
export const createNoteSchema = joi
  .object({
    title: joi.string().required(),
    content: joi.string().required(),
    meeting_id:joi.number().required()
})
  .required();

export const updateNoteSchema = joi
  .object({
    title: joi.string().required(),
    content: joi.string().required(),
    note_id:joi.number().required(),
    meeting_id:joi.number().required()
})
  .required();
