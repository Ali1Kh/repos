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
    E_mail: joi.string().email().allow("", null).optional(),
    UserName: joi.string().allow("", null).optional(),
    PassWord: joi.string().required(),
    role: joi.string().valid("Manager", "Secertary", "Admin").required(),
  })
  .xor("E_mail", "UserName")
  .messages({
    "object.missing": "You Must Enter Email Or UserName",
    "object.xor": "You Must Enter One Of Email Or UserName",
  })
  .required();

export const sendForgetPassCodeSchema = joi
  .object({
    E_mail: joi.string().email().required(),
    role: joi.string().valid("Manager", "Secertary", "Admin").required(),
  })
  .required();

export const verifyResetCodeSchema = joi
  .object({
    code: joi.string().length(6).required(),
    E_mail: joi.string().email().required(),
    role: joi.string().valid("Manager", "Secertary", "Admin").required(),
  })
  .required();

export const forgetPassSchema = joi
  .object({
    E_mail: joi.string().email().required(),
    PassWord: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
      .required(),
    confirmPassword: joi
      .string()
      .valid(joi.ref("PassWord"))
      .required()
      .messages({
        "any.only": "Confirm Password must be Equal Main password.",
      }),
    role: joi.string().valid("Manager", "Secertary", "Admin").required(),
  })
  .required();
