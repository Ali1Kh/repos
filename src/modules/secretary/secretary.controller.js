import { Manager } from "../../../DB/models/manager.model.js";
import { Meetings } from "../../../DB/models/meeting.model.js";
import { Secertary } from "../../../DB/models/secertary.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import bcryptjs from "bcryptjs";
import { meeting_Manager } from "../../../DB/models/meeting_Manager.model.js";

//createManagerAccount
export const createManagerAccount = asyncHandler(async (req, res, next) => {
  const isSecretariesEmail = await Secertary.findOne({
    where: { E_mail: req.body.E_mail },
  });
  if (isSecretariesEmail) return next(new Error("Email Already Existed!"));

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
  console.log({
    ...req.body,
    PassWord: managerhashPass,
    secretary_id: req.payload.id,
  });
  await Manager.create({
    ...req.body,
    PassWord: managerhashPass,
    secretary_id: req.payload.id,
  });

  return res.json({ success: true, message: "Manager Created Successfully" });
});

export const createMeeting = async (req, res, next) => {
  let isManager = await Manager.findByPk(req.params.manager_id);
  if (!isManager) return next(new Error("Invalid Manager Id"));

  if (isManager.secretary_id != req.payload.id)
    return next(new Error("You Must Be The Secretary For This Manager Id"));

  let meeting = await Meetings.create({
    ...req.body,
    statues: "not done",
  });
  await meeting_Manager.create({
    manager_id: isManager.manager_id,
    meeting_id: meeting.dataValues.meeting_id,
  });
  return res.json({ success: true, message: "Meeting created Successfully" });
};

export const getSecManagers = async (req, res, next) => {
  let managers = await Manager.findAll({
    attributes: ["manager_id","first_name","last_name"],
    where: { secretary_id: req.payload.id },
  });
  return res.json({ success: true, managers });
};
