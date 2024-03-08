import joi from "joi";

export const createMeetingSchema = joi
  .object({
    manager_id: joi.number().required(),
    person: joi.string().required(),
    about: joi.string().required(),
    address: joi.string().required(),
    time: joi.string().required(),
    date: joi.date().greater(Date.now()).required(),
    notes: joi.string().required(),
    in_or_out: joi.string().valid("Inside", "Outside").required(),
  })
  .required();

export const getManagerMeetingSchema = joi.object({
  date: joi
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
        "Equal To Date Is Not Allowed While Lte And Gte Is Allowed",
    }),
  time: joi
    .object({
      eq: joi
        .string()
        .when(joi.object({ lte: joi.exist(), gte: joi.exist() }), {
          then: joi.forbidden(),
        }),
      lte: joi.string().when("eq", { is: joi.exist(), then: joi.forbidden() }),
      gte: joi.string().when("eq", { is: joi.exist(), then: joi.forbidden() }),
    })
    .or("eq", "lte", "gte")
    .messages({
      "any.unknown":
        "Equal To Time Is Not Allowed While Lte And Gte Is Allowed",
    }),
  status: joi.string().valid("Not Done", "Done"),
  in_or_out: joi.string().valid("Inside", "Outside"),
  person: joi.string(),
  about: joi.string(),
  address: joi.string(),
  sort: joi.string(),
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
});
