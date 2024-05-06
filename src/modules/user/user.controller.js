import { Manager } from "../../../DB/models/manager.model.js";
import { Token } from "../../../DB/models/token.model.js";
import { Secertary } from "./../../../DB/models/secertary.model.js";
import { asyncHandler } from "./../../utils/asyncHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import randomstring from "randomstring";
import { sendEmails } from "../../utils/sendEmails.js";
import { sendResetCode } from "../../utils/htmlTemplates.js";
import { Admin } from "../../../DB/models/admin.model.js";

// SignUp
export const signUp = asyncHandler(async (req, res, next) => {
  const userExits = await Secertary.findOne({
    where: { UserName: req.body.UserName },
  });
  if (userExits) return next(new Error("Username Already Existed !"));

  const isSecertary = await Secertary.findOne({
    where: { E_mail: req.body.E_mail },
  });
  if (isSecertary) return next(new Error("Email Already Existed !"));

  const secertaryhashPass = bcryptjs.hashSync(
    req.body.PassWord,
    parseInt(process.env.SALT_ROUND)
  );

  await Secertary.create({ ...req.body, PassWord: secertaryhashPass });

  return res.json({
    success: true,
    message: "Secertary Added Successfully !",
  });
});

// signIn
export const signIn = asyncHandler(async (req, res, next) => {
  if (req.body.role == "Manager") {
    let isManager;
    if (req.body.E_mail) {
      isManager = await Manager.findOne({
        where: { E_mail: req.body.E_mail },
      });
      if (!isManager) return next(new Error("Email Is Invalid"));
    } else if (req.body.UserName) {
      isManager = await Manager.findOne({
        where: { UserName: req.body.UserName },
      });
      if (!isManager) return next(new Error("UserName Is Invalid"));
    }

    const managerPassMatch = bcryptjs.compareSync(
      req.body.PassWord,
      isManager.PassWord
    );
    if (!managerPassMatch) return next(new Error("Invalid Password !"));

    if (isManager.isDeleted)
      return next(new Error("Your Account Is Deleted , Call Admin To Recover It"));

    const token = jwt.sign(
      {
        id: isManager.manager_id,
        E_mail: isManager.E_mail,
        username: isManager.UserName,
        role: "Manager",
      },
      process.env.SECRET_KEY
    );

    await Token.create({
      token,
      role: "Manager",
      manager_id: isManager.manager_id,
      agent: req.headers["user-agent"],
    });

    return res.json({ success: true, message: "Welcome Manager !", token });
  } else if (req.body.role == "Secertary") {
    let isSecertary;

    if (req.body.E_mail) {
      isSecertary = await Secertary.findOne({
        where: { E_mail: req.body.E_mail },
      });
      if (!isSecertary) return next(new Error("Email is Invalid !"));
    } else if (req.body.UserName) {
      isSecertary = await Secertary.findOne({
        where: { UserName: req.body.UserName },
      });
      if (!isSecertary) return next(new Error("Username is Invalid !"));
    }

    const secertaryPassMatch = bcryptjs.compareSync(
      req.body.PassWord,
      isSecertary.PassWord
    );
    if (!secertaryPassMatch) return next(new Error("Invalid Password !"));

    if (isSecertary.isDeleted)
      return next(new Error("Your Account Is Deleted , Call Admin To Recover It"));

    if (isSecertary.Accepted_Acc == false)
      return next(
        new Error(
          "Your Account Is Not Accepted , Contact Admin To Accept Your Account !"
        )
      );


    const token = jwt.sign(
      {
        id: isSecertary.secretary_id,
        E_mail: isSecertary.E_mail,
        username: isSecertary.UserName,
        role: "Secertary",
      },
      process.env.SECRET_KEY
    );

    await Token.create({
      token,
      role: "Secertary",
      secretary_id: isSecertary.secretary_id,
      agent: req.headers["user-agent"],
    });

    return res.json({ success: true, message: "Welcome Secertary !", token });
  } else if (req.body.role == "Admin") {
    const isAdmin = await Admin.findOne({
      where: { E_mail: req.body.E_mail },
    });
    if (!isAdmin) return next(new Error("Email is Invalid !"));

    const adminPassMatch = bcryptjs.compareSync(
      req.body.PassWord,
      isAdmin.Password
    );
    if (!adminPassMatch) return next(new Error("Invalid Password !"));

    const token = jwt.sign(
      {
        id: isAdmin.Admin_id,
        E_mail: isAdmin.E_mail,
        username: isAdmin.UserName,
        role: "Admin",
      },
      process.env.SECRET_KEY
    );

    await Token.create({
      token,
      role: "Admin",
      agent: req.headers["user-agent"],
    });

    return res.json({ success: true, message: "Welcome Admin !", token });
  }
});

// send Forget Code
export const sendForgetPassCode = asyncHandler(async (req, res, next) => {
  if (req.body.role === "Secertary") {
    const isSecertary = await Secertary.findOne({
      where: { E_mail: req.body.E_mail },
    });
    if (!isSecertary) return next(new Error("Incorrect Email"));

    const code = randomstring.generate({
      length: 6,
      charset: "numeric",
    });

    const secertaryhashCode = bcryptjs.hashSync(
      code,
      parseInt(process.env.SALT_ROUND)
    );

    await Secertary.update(
      { resetCode: secertaryhashCode },
      {
        where: {
          secretary_id: isSecertary.dataValues.secretary_id,
        },
      }
    );

    const messageSent = await sendEmails({
      to: isSecertary.dataValues.E_mail,
      subject: "Reset Account Password",
      html: sendResetCode(code, "Secertary"),
    });
    if (!messageSent) return next(new Error("Email is Invalid"));

    return res.json({
      success: true,
      message: "Reset Code Sent , Check Your Email..",
    });
  } else if (req.body.role === "Manager") {
    const isManager = await Manager.findOne({
      where: { E_mail: req.body.E_mail },
    });
    if (!isManager) return next(new Error("Incorrect Email"));

    const code = randomstring.generate({
      length: 6,
      charset: "numeric",
    });

    const managerhashCode = bcryptjs.hashSync(
      code,
      parseInt(process.env.SALT_ROUND)
    );

    await Manager.update(
      { resetCode: managerhashCode },
      {
        where: {
          manager_id: isManager.dataValues.manager_id,
        },
      }
    );

    const messageSent = await sendEmails({
      to: isManager.dataValues.E_mail,
      subject: "Reset Account Password",
      html: sendResetCode(code, "Manager"),
    });

    if (!messageSent) return next(new Error("Email is Invalid"));

    return res.json({
      success: true,
      message: "Rest Code Sent , Check Your Email..",
    });
  }
});

//Verify Reset Code
export const verifyResetCode = asyncHandler(async (req, res, next) => {
  if (req.body.role == "Manager") {
    const isManager = await Manager.findOne({
      where: { E_mail: req.body.E_mail },
    });
    if (!isManager) return next(new Error("Incorrect Email"));

    if (!isManager.dataValues.resetCode)
      return next(new Error("Send Rest Code First"));

    const managerCodeMatch = bcryptjs.compareSync(
      req.body.code,
      isManager.dataValues.resetCode
    );
    if (!managerCodeMatch) return next(new Error("Invalid Code"));

    await Manager.update(
      {
        resetCode: null,
        resetCodeVerified: true,
      },
      {
        where: {
          manager_id: isManager.dataValues.manager_id,
        },
      }
    );

    return res.json({
      success: true,
      message: "Code Verified",
    });
  } else if (req.body.role == "Secertary") {
    const isSecertary = await Secertary.findOne({
      where: { E_mail: req.body.E_mail },
    });
    if (!isSecertary) return next(new Error("Incorrect Email"));

    if (!isSecertary.dataValues.resetCode)
      return next(new Error("Send Rest Code First"));

    const secertaryCodeMatch = bcryptjs.compareSync(
      req.body.code,
      isSecertary.dataValues.resetCode
    );

    if (!secertaryCodeMatch) return next(new Error("Invalid Code"));

    await Secertary.update(
      {
        resetCode: null,
        resetCodeVerified: true,
      },
      {
        where: {
          secretary_id: isSecertary.dataValues.secretary_id,
        },
      }
    );

    return res.json({
      success: true,
      message: "Code Verified Successfully",
    });
  }
});

//Forget password
export const forgetPassword = asyncHandler(async (req, res, next) => {
  if (req.body.role == "Manager") {
    const isManager = await Manager.findOne({
      where: { E_mail: req.body.E_mail },
    });
    if (!isManager) return next(new Error("Incorrect Email"));

    if (!isManager.dataValues.resetCodeVerified)
      return next(new Error("Verify Rest Code First"));

    let hashedPass = bcryptjs.hashSync(
      req.body.PassWord,
      parseInt(process.env.SALT_ROUND)
    );

    await Manager.update(
      {
        PassWord: hashedPass,
        resetCodeVerified: false,
      },
      {
        where: {
          manager_id: isManager.dataValues.manager_id,
        },
      }
    );

    await Token.update(
      {
        isValid: false,
      },
      {
        where: {
          manager_id: isManager.dataValues.manager_id,
        },
      }
    );

    return res.json({
      success: true,
      message: "Manager Password Updated Successfully! , Try to Login..",
    });
  } else if (req.body.role == "Secertary") {
    const isSecertary = await Secertary.findOne({
      where: { E_mail: req.body.E_mail },
    });
    if (!isSecertary) return next(new Error("Incorrect Email"));

    if (!isSecertary.dataValues.resetCodeVerified)
      return next(new Error("Verify Rest Code First"));

    let hashedPass = bcryptjs.hashSync(
      req.body.PassWord,
      parseInt(process.env.SALT_ROUND)
    );
    await Secertary.update(
      {
        PassWord: hashedPass,
        resetCodeVerified: false,
      },
      {
        where: {
          secretary_id: isSecertary.dataValues.secretary_id,
        },
      }
    );

    await Token.update(
      {
        isValid: false,
      },
      {
        where: {
          secretary_id: isSecertary.dataValues.secretary_id,
        },
      }
    );

    return res.json({
      success: true,
      message: "Secertary Password Updated Successfully! , Try to Login..",
    });
  }
});
