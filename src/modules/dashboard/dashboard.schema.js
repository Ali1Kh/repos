import joi from "joi";
// 
export const acceptAccSchema = joi
  .object({
    secretary_id: joi.number().required(),
  })
  .required();

  
export const acceptManagerSchema = joi
.object({
  manager_id: joi.number().required(),
})
.required();


export const deleteManagerAccSchema = joi
  .object({
    manager_id: joi.number().required(),
})
.required();

export const deleteMeetingSchema = joi
  .object({
    meeting_id: joi.number().required(),
})
.required();

