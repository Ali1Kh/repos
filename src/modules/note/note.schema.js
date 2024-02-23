import joi from "joi";

// createNoteSchema
export const createNoteSchema = joi
  .object({
    title: joi.string().required(),
    content: joi.string().required(),
  })
  .required();

export const createMeetingNote = joi
  .object({
    title: joi.string().required(),
    content: joi.string().required(),
    meeting_id: joi.number().required(),
  })
  .required();

export const updateNoteSchema = joi
  .object({
    id: joi.number().required(),
    title: joi.string().required(),
    content: joi.string().required(),
  })
  .required();
