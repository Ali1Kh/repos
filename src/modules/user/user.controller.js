import { Manager } from "../../../DB/models/manager.model.js";
import { Token } from "../../../DB/models/token.model.js";
import { Secertary } from "./../../../DB/models/secertary.model.js";
import { asyncHandler } from "./../../utils/asyncHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import randomstring from 'randomstring'
import { sendEmails } from '../../utils/sendEmails.js'


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
      { id: isManager.manager_id, E_mail: isManager.E_mail, username:isManager.UserName, role: "Manager" },
      process.env.SECRET_KEY
    );

    await Token.create({token,role: "Manager",manager_id: isManager.manager_id,agent: req.headers["user-agent"],
    });

    return res.json({ success: true, message: "Welcome Manager !", token });
  } else if (req.body.role == "Secertary") {
    const isSecertary = await Secertary.findOne({
      where: { E_mail: req.body.E_mail },
    });
    if (!isSecertary) return next(new Error("Email is Invalid !"));

    const secertaryPassMatch = bcryptjs.compareSync(
      req.body.PassWord,
      isSecertary.PassWord
    );
    if (!secertaryPassMatch) return next(new Error("Invalid Password !"));

    const token = jwt.sign(
      {
        id: isSecertary.secretary_id,
        E_mail: isSecertary.E_mail,
        username:isSecertary.UserName,
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
  }
});

//Forget password 
export const forgetPassword = asyncHandler(async(req,res,next)=>{
  if (req.body.role == "Manager") {
    const isManager = await Manager.findOne({
      where: { E_mail: req.body.E_mail },
    })
  if (!isManager) return next (new Error("Manager Not Found !"))

  const managerCodeMatch = bcryptjs.compareSync(
    req.body.code,
    isManager.dataValues.resetCode
  );
  if (!managerCodeMatch) return next(new Error("Invalid Code !"));

  isManager.dataValues.PassWord = bcryptjs.hashSync(req.body.PassWord,parseInt(process.env.SALT_ROUND))
  await isManager.save()

  const tokens = await Token.find({manager_id:isManager.dataValues._id})
  tokens.forEach(async (token)=>{
  token.isValid = false
  await token.save()
  })

  return res.json({success : true , message:"Manager Password Updated Successfully! , Try to Login.."})
  }
  else if(req.body.role == "Secertary"){
    const isSecertary = await Secertary.findOne({
      where: { E_mail: req.body.E_mail },
    })
    if (!isSecertary) return next (new Error("Secertary Not Found !"))
    
    const secertaryCodeMatch = bcryptjs.compareSync(
      req.body.code,
      isSecertary.dataValues.resetCode
    );
    if (!secertaryCodeMatch) return next(new Error("Invalid Code !"));
  
    isSecertary.dataValues.PassWord = bcryptjs.hashSync(req.body.PassWord,parseInt(process.env.SALT_ROUND))
    await isSecertary.save()
  
    const tokens = await Token.find({secertary_id:isSecertary.dataValues._id})
    tokens.forEach(async (token)=>{
    token.isValid = false
    await token.save()
    })
  
    return res.json({success : true , message:"Secertary Password Updated Successfully! , Try to Login.."})
  }
  })
// send Forget Code 
export const sendForgetPassCode = asyncHandler(async(req,res,next)=>{
  if (req.body.role === "Secertary") {
    const isSecertary = await Secertary.findOne({
      where: { E_mail: req.body.E_mail },
    })
    if (!isSecertary) return next (new Error("Secertary Not Found !"))

    const code = randomstring.generate({
        length:6,
        charset:"numeric"
    })
  
      const secertaryhashCode = bcryptjs.hashSync(
        code,
        parseInt(process.env.SALT_ROUND)
      );
  
      isSecertary.dataValues.resetCode = secertaryhashCode
      await isSecertary.save() 
  
      const messageSent = await sendEmails({to:isSecertary.dataValues.E_mail, subject:"Resest Password" , html:`<div>code: ${code}</div>`})
      if (!messageSent) return next(new Error("Email is Invalid"))
  
      return res.json({success : true , message:"Code Sent! , Check Your Email.."})
    }
    else if (req.body.role === "Manager") {
      const isManager = await Manager.findOne({
        where: { E_mail: req.body.E_mail },
      })
      if (!isManager) return next (new Error("Manager Not Found !"))
      
      const code = randomstring.generate({
          length:6,
          charset:"numeric"
      })
    
      const managerhashCode = bcryptjs.hashSync(
        code,
        parseInt(process.env.SALT_ROUND)
      );
    
      isManager.dataValues.resetCode = managerhashCode
      await isManager.save() 
    
      const messageSent = await sendEmails({to:isManager.dataValues.E_mail, subject:"Resest Password" , html:`<div>code: ${code}</div>`})
      if (!messageSent) return next(new Error("Email is Invalid"))
    
      return res.json({success : true , message:"Code Sent! , Check Your Email.."})
      }
  })


// 
