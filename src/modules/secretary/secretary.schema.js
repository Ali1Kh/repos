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
    insidePersons: joi.array().when("in_or_out", {
      is: "Inside",
      then: joi.array(),
      otherwise: joi.array().forbidden(),
    }),
  })
  .required();

export const createManagerAccountSchema = joi.object({
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  UserName: joi.string().required(),
  E_mail: joi.string().email().required(),
  PassWord: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  confirmPassword: joi.string().valid(joi.ref("PassWord")).required(),
});

export const updateMeetingSchema = joi
  .object({
    meetingId: joi.number().required(),
    person: joi.string().required(),
    about: joi.string().required(),
    address: joi.string().required(),
    time: joi.string().required(),
    date: joi.date().required(),
    notes: joi.string().required(),
    in_or_out: joi.string().valid("Inside", "Outside").required(),
  })
  .required();

export const changeStatusSchema = joi
  .object({
    meetingId: joi.number().required(),
    status: joi.string().valid("Done", "Not Done").required(),
  })
  .required();

export const meetingDetailsSchema = joi
  .object({
    meetingId: joi.number().required(),
  })
  .required();

export const deleteMeetingSchema = joi
  .object({
    meetingId: joi.number().required(),
  })
  .required();
