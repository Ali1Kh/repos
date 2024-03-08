import joi from "joi";

export const getNotesSchema = joi.object({
  title: joi.string(),
  content: joi.string(),
  createdAt: joi
    .object({
      eq: joi.date().when(joi.object({ lte: joi.exist(), gte: joi.exist() }), {
        then: joi.forbidden(),
      }),
      lte: joi.date().when("eq", { is: joi.exist(), then: joi.forbidden() }),
      gte: joi.date().when("eq", { is: joi.exist(), then: joi.forbidden() }),
    })
    .or("eq", "lte", "gte")
    .messages({
      "any.unknown":
        "Equal To Created At Is Not Allowed While Lte And Gte Is Allowed",
    }),
  updatedAt: joi
    .object({
      eq: joi.date().when(joi.object({ lte: joi.exist(), gte: joi.exist() }), {
        then: joi.forbidden(),
      }),
      lte: joi.date().when("eq", { is: joi.exist(), then: joi.forbidden() }),
      gte: joi.date().when("eq", { is: joi.exist(), then: joi.forbidden() }),
    })
    .or("eq", "lte", "gte")
    .messages({
      "any.unknown":
        "Equal To Updated At Is Not Allowed While Lte And Gte Is Allowed",
    }),
  isUpdated: joi.boolean(),
  sort: joi.string(),
});

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
