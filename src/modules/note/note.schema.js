import joi from "joi";


export const getNotesSchema = joi
  .object({
    title: joi.string(),
    content: joi.string(),
    sort: joi.string(),
  })

// createNoteSchema
export const createNoteSchema = joi
  .object({
    title: joi.string().required(),
    content: joi.string().required(),
  })
  .required();

export const createMeetingNoteSchema = joi
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

  export const deleteNoteSchema = joi
  .object({
    id: joi.number().required(),
  })
  .required();