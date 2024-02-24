import { Manager } from "../../../DB/models/manager.model.js";
import { Meetings } from "../../../DB/models/meeting.model.js";
import { Secertary } from "../../../DB/models/secertary.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import bcryptjs from "bcryptjs";
import { meeting_Manager } from "../../../DB/models/meeting_Manager.model.js";
import cloudinary from "../../utils/cloud.js";
import { Op } from "sequelize";
import { sequelize } from "../../../DB/connection.js";

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
  if (!isManager) return next(new Error("Invalid Manager"));

  if (isManager.secretary_id != req.payload.id)
    return next(new Error("You Must Be The Secretary For This Manager"));

  // Check Time Exitsss
  const baseTime = new Date(`${req.body.date}T${req.body.time}`);
  const timePlus30 = new Date(baseTime.getTime() + 30 * 60 * 1000);
  const timeMinus30 = new Date(baseTime.getTime() - 30 * 60 * 1000);
  const timePLus = timePlus30.toTimeString().slice(0, 8);
  const timeMinus = timeMinus30.toTimeString().slice(0, 8);
  let dateAndTimeExites = await sequelize.query(
    `
  SELECT date,time FROM Meetings
  JOIN meeting_Manager ON Meetings.meeting_id = meeting_Manager.meeting_id
  WHERE meeting_Manager.manager_id = ${isManager.manager_id} and
  date='${req.body.date}' and
  time between '${timeMinus}' and '${timePLus}';
  `,
    { model: Meetings }
  );

  if (dateAndTimeExites.length > 0)
    return next(new Error("Time In This Date Already Exits"));
  let upload;
  if (req.file) {
    upload = await cloudinary.uploader.upload(req.file.path, {
      folder: `meetingsApp/attachments/${req.params.manager_id}/`,
    });
  }

  let meeting = await Meetings.create({
    ...req.body,
    statues: "not done",
    addedBy: req.payload.id,
    attachmentLink: upload?.secure_url,
    attachmentId: upload?.public_id,
    attachmentName: req.file?.originalname,
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

  let upload;
  if (req.file) {
    upload = await cloudinary.uploader.upload(req.file.path, {
      public_id:isMeeting.attachmentId,
    });
  }

  isMeeting.update({
    ...req.body,
    attachmentLink: upload?.secure_url,
    attachmentId: upload?.public_id,
    attachmentName: req.file?.originalname,
  });

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
