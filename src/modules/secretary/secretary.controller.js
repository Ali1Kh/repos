import { Manager } from "../../../DB/models/manager.model.js";
import { Meetings } from "../../../DB/models/meeting.model.js";
import { Secertary } from "../../../DB/models/secertary.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import bcryptjs  from 'bcryptjs';

//createManagerAccount
export const createManagerAccount = asyncHandler(async (req, res, next) => {
  const isSecertary = await Secertary.findByPk(req.params.secertaryId)
  if (!isSecertary) return next(new Error("Secertary Not Found!"))
  
  // Verify that the email address is Unique
  const isSecretariesEmail = await Secertary.findOne({where:{ E_mail:req.body.E_mail }})
  if (isSecretariesEmail) return next(new Error("Email Already Existed!"))

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
  
  await Manager.create({
    ...req.body,
    PassWord: managerhashPass,
    secretary_id: req.params.secertaryId,
  });
  
  return res.json({ success: true, message: "Manager Added Successfully !" });
  
});