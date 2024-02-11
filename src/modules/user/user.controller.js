import { Manager } from "../../../DB/models/manager.model.js";
import { Token } from "../../../DB/models/token.model.js";
import { Secertary } from "./../../../DB/models/secertary.model.js";
import { asyncHandler } from "./../../utils/asyncHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// SignUp
export const signUp = asyncHandler(async (req, res, next) => {
  if (req.body.role == "Manager") {
    const isManager = await Manager.findOne({
      where: { E_mail: req.body.E_mail },
    });
    if (isManager) return next(new Error("Email Already Existed !"));
    const userExits = await Manager.findOne({
      where: { UserName: req.body.UserName },
    });
    if (userExits) return next(new Error("Username Already Existed !"));

    const managerhashPass = bcryptjs.hashSync(
      req.body.PassWord,
      parseInt(process.env.SALT_ROUND)
    );

    if (!req.body.secertaryId)
      return next(new Error("Secertary Id is required!"));

    //const manager =
    await Manager.create({
      ...req.body,
      PassWord: managerhashPass,
      secretary_id: req.body.secertaryId,
    });

    // const token = jwt.sign({email:manager.email},process.env.SECRET_KEY)
    return res.json({ success: true, message: "Manager Added Successfully !" });
  } else if (req.body.role == "Secertary") {
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

    //const secertary =
    await Secertary.create({ ...req.body, PassWord: secertaryhashPass });

    return res.json({
      success: true,
      message: "Secertary Added Successfully !",
    });
  }

  // const messageSent =  await sendEmails({to:req.body.email ,
  //     subject:"Account Activation" ,
  //     html:`<a href='http://localhost:3000/users/activateaccount/${token}'>Activate Your Account<a/>`})
  //   if (!messageSent) return next(new Error("Email is Invalid"))
});

// Activate Account //TODO
// export const activateAccount = asyncHandler(async (req , res , next)=>{
//     const { token } = req.params

//     const payload = jwt.verify(token,process.env.SECRET_KEY)

//     const user = await User.findOneAndUpdate({email:payload.email},{new : true})
//     if (!user) return next(new Error("User Not Found!"))

//     return res.send("Try to login!")
// })

// signIn
export const signIn = asyncHandler(async (req, res, next) => {
  if (req.body.role == "Manager") {
    const isManager = await Manager.findOne({
      where: { E_mail: req.body.E_mail },
    });
    if (!isManager) return next(new Error("Email Is Invalid"));

    const managerPassMatch = bcryptjs.compareSync(
      req.body.PassWord,
      isManager.PassWord
    );
    if (!managerPassMatch) return next(new Error("Invalid Password !"));

    const token = jwt.sign(
      { id: isManager.manager_id, E_mail: isManager.E_mail, role: "Manager" },
      process.env.SECRET_KEY
    );

    await Token.create({
      token,
      role: "Manager",
      manager_id: isManager.manager_id,
      agent: req.headers["user-agent"],
    });

    return res.json({ success: true, message: "Welcome !", token });
  } else if (req.body.role == "Secertary") {
    const isSecertary = await Secertary.findOne({
      where: { E_mail: req.body.E_mail },
    });
    if (!isSecertary) return next(new Error("Email is Invalid !"));

    const secertaryPassMatch = bcryptjs.compareSync(
      req.body.PassWord,
      isSecertary.PassWord
    );
    console.log(req.body.PassWord, isSecertary.PassWord);
    if (!secertaryPassMatch) return next(new Error("Invalid Password !"));

    const token = jwt.sign(
      {
        id: isSecertary.secretary_id,
        E_mail: isSecertary.E_mail,
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

    return res.json({ success: true, message: "Welcome !", token });
  }
});

// now test on post maaaaan
