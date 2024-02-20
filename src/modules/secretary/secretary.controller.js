import { Manager } from "../../../DB/models/manager.model.js";
import { Meetings } from "../../../DB/models/meeting.model.js";
import { Secertary } from "../../../DB/models/secertary.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import bcryptjs from "bcryptjs";
import { meeting_Manager } from "../../../DB/models/meeting_Manager.model.js";
import cloudinary from "../../utils/cloud.js";

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

  if (req.file) {
    let { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: `meetingsApp/attachments/${req.params.manager_id}/` }
    );
    console.log(secure_url, public_id);
  }

  let meeting = await Meetings.create({
    ...req.body,
    statues: "not done",
    addedBy: req.payload.id,
  });
  await meeting_Manager.create({
    manager_id: isManager.manager_id,
    meeting_id: meeting.dataValues.meeting_id,
  });
  return res.json({ success: true, message: "Meeting created Successfully" });
};

export const getSecMeetings = async (req, res, next) => {
  let meetings = await Meetings.findAll({
    where: { addedBy: req.payload.id },
  });
  return res.json({ success: true, meetings });
};

export const getSecMeetingsDetails = async (req, res, next) => {
  let meetings = await Meetings.findOne({
    where: { addedBy: req.payload.id, meeting_id: req.params.meetingId },
  });
  return res.json({ success: true, meetings });
};

export const getSecManagers = async (req, res, next) => {
  let managers = await Manager.findAll({
    attributes: ["manager_id", "first_name", "last_name"],
    where: { secretary_id: req.payload.id },
  });
  return res.json({ success: true, managers });
};

export const updateMeeting = async (req, res, next) => {
  let isMeeting = await Meetings.findOne({
    where: { meeting_id: req.params.meetingId },
  });
  if (!isMeeting) return next(new Error("Meeting Not Found"));

  if (isMeeting.dataValues.addedBy != req.payload.id)
    return next(new Error("You Don't have permissions"));
  isMeeting.update({ ...req.body });
  return res.json({ success: true, message: "Meeting Updated Successfully" });
};

export const deleteMeeting = async (req, res, next) => {
  let isMeeting = await Meetings.findOne({
    where: { meeting_id: req.params.meetingId },
  });
  if (!isMeeting) return next(new Error("Meeting Not Found"));
  if (isMeeting.dataValues.addedBy != req.payload.id)
    return next(new Error("You Don't have permissions"));
  isMeeting.destroy();
  return res.json({ success: true, message: "Meeting Deleted Successfully" });
};
