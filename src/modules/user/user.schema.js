import joi from "joi";

// signUpSchema
export const signUpSchema = joi
  .object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    UserName: joi.string().required(),
    E_mail: joi.string().email().required(),
    PassWord: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
      .required(),
    confirmPassword: joi.string().valid(joi.ref("PassWord")).required(),
  })
  .required();

//signIn
export const signInSchema = joi
  .object({
    E_mail: joi.string().email().required(),
    PassWord: joi
      .string()
      .required(),
    role: joi.string().valid("Manager", "Secertary").required(),
  })
  .required();

export const sendForgetPassCodeSchema = joi
  .object({
    E_mail: joi.string().email().required(),
    PassWord: joi
      .string()
      .required(),
    role: joi.string().valid("Manager", "Secertary").required()
})
.required();

export const forgetPassSchema = joi
  .object({
    E_mail: joi.string().email().required(),
    PassWord: joi
      .string()
      .required(),
    role: joi.string().valid("Manager", "Secertary").required(),
    code:joi.string().length(6).required
})
.required();

