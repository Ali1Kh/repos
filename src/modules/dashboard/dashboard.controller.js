import { sequelize } from "../../../DB/connection.js";
import { Admin } from "../../../DB/models/admin.model.js";
import { Manager } from "../../../DB/models/manager.model.js";
import { Meetings } from "../../../DB/models/meeting.model.js";
import { Secertary } from "../../../DB/models/secertary.model.js";
import { Token } from "../../../DB/models/token.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const getAllMeetings = asyncHandler(async (req, res, next) => {
  let meetings = await sequelize.query(
    `select Meetings.meeting_id,time,date,about,in_or_out,address, notes,person,statues,addedBy,Meetings.createdAt,Meetings.updatedAt,
     attachmentId,attachmentLink,attachmentName,
     Manager.manager_id,CONCAT(first_name, ' ', last_name)  as 'Manager_Name',E_mail as 'Manager_Email',UserName as 'Manager_UserName' from Meetings
     join meeting_Manager on Meetings.meeting_id = meeting_Manager.meeting_id 
     join Manager on meeting_Manager.manager_id = Manager.manager_id  
     where Meetings.isDeleted = 0 
      GROUP BY Meetings.meeting_id`,
    {
      model: Meetings,
    }
  );
  return res.json({ success: true, count: meetings.length, meetings });
});

export const deleteMeeting = asyncHandler(async (req, res, next) => {
  let isMeeting = await Meetings.findOne({
    where: { meeting_id: req.params.meeting_id },
  });
  if (!isMeeting) return next(new Error("Meeting Not Found !"));

  if (isMeeting.dataValues.isDeleted) {
    return next(new Error("Meeting Already Deleted"));
  }
  isMeeting.isDeleted = 1;
  await isMeeting.save();

  return res.json({
    success: true,
    message: "Meeting Deleted Successfully",
  });
});

export const getDeletedMeetings = asyncHandler(async (req, res, next) => {
  let meetings = await sequelize.query(
    `select Meetings.meeting_id,time,date,about,in_or_out,address, notes,person,statues,addedBy,Meetings.createdAt,Meetings.updatedAt,
     attachmentId,attachmentLink,attachmentName,
     Manager.manager_id,CONCAT(Manager.first_name, ' ', Manager.last_name)  as 'Manager_Name',Manager.E_mail as 'Manager_Email',Manager.UserName as 'Manager_UserName',
     Secretary.secretary_id,CONCAT(Secretary.first_name, ' ', Secretary.last_name)  as 'Secertary_Name',Secretary.E_mail as 'Secertary_Email',Secretary.UserName as 'Secertary_UserName'
     from Meetings
     join meeting_Manager on Meetings.meeting_id = meeting_Manager.meeting_id 
     join Manager on meeting_Manager.manager_id = Manager.manager_id  
     join Secretary on Meetings.addedBy = Secretary.secretary_id
     where Meetings.isDeleted = 1  GROUP BY Meetings.meeting_id`,
    {
      model: Meetings,
    }
  );
  return res.json({ success: true, count: meetings.length, meetings });
});

export const getNotAcceptedSec = asyncHandler(async (req, res, next) => {
  let secertaries = await Secertary.findAll({
    where: { Accepted_Acc: false },
    attributes: {
      exclude: ["PassWord", "resetCode", "resetCodeVerified", "updatedAt"],
    },
  });
  return res.json({ success: true, count: secertaries.length, secertaries });
});

export const acceptSecAcc = asyncHandler(async (req, res, next) => {
  let isAccount = await Secertary.findOne({
    where: { secretary_id: req.params.secretary_id },
  });
  if (!isAccount) return next(new Error("Account Not Found"));
  if (isAccount.Accepted_Acc)
    return next(new Error("Account Already Accepted"));
  isAccount.Accepted_Acc = true;
  await isAccount.save();
  return res.json({ success: true, message: "Account Accepted Successfully" });
});

export const rejectSecAcc = asyncHandler(async (req, res, next) => {
  let isAccount = await Secertary.findOne({
    where: { secretary_id: req.params.secretary_id },
  });
  if (!isAccount) return next(new Error("Account Not Found"));
  if (isAccount.Accepted_Acc)
    return next(new Error("Account Already Accepted"));

  isAccount.destroy();
  return res.json({
    success: true,
    message: "Account Rejected Successfully",
  });
});

export const getNotAcceptedManageres = asyncHandler(async (req, res, next) => {
  let maangers = await Manager.findAll({
    where: { Accepted_Acc: null },
    attributes: {
      exclude: ["PassWord", "resetCode", "resetCodeVerified", "updatedAt"],
    },
  });
  return res.json({ success: true, count: maangers.length, maangers });
});

export const getDeletedSecretaries = asyncHandler(async (req, res, next) => {
  let secertaries = await Secertary.findAll({
    where: { isDeleted: true },
    attributes: {
      exclude: ["PassWord", "resetCode", "resetCodeVerified", "updatedAt"],
    },
  });

  return res.json({ success: true, count: secertaries.length, secertaries });
});

export const getDeletedManagers = asyncHandler(async (req, res, next) => {
  let managers = await Manager.findAll({
    where: { isDeleted: true },
    attributes: {
      exclude: ["PassWord", "resetCode", "resetCodeVerified", "updatedAt"],
    },
  });

  return res.json({ success: true, count: managers.length, managers });
});

export const recoverManagerAcc = asyncHandler(async (req, res, next) => {
  let isAccount = await Manager.findOne({
    where: { manager_id: req.params.manager_id },
  });
  if (!isAccount) return next(new Error("Account Not Found"));
  if (!isAccount.isDeleted) return next(new Error("Account Is Not Deleted"));
  isAccount.isDeleted = false;
  await isAccount.save();
  return res.json({ success: true, message: "Account Recovered Successfully" });
});

export const recoverSecAcc = asyncHandler(async (req, res, next) => {
  let isAccount = await Secertary.findOne({
    where: { secretary_id: req.params.secretary_id },
  });
  if (!isAccount) return next(new Error("Account Not Found"));
  if (!isAccount.isDeleted) return next(new Error("Account Is Not Deleted"));
  isAccount.isDeleted = false;
  await isAccount.save();
  return res.json({ success: true, message: "Account Recovered Successfully" });
});

export const acceptManagerAcc = asyncHandler(async (req, res, next) => {
  let isAccount = await Manager.findOne({
    where: { manager_id: req.params.manager_id },
  });
  if (!isAccount) return next(new Error("Account Not Found"));
  if (isAccount.Accepted_Acc == true)
    return next(new Error("Account Already Accepted"));
  isAccount.Accepted_Acc = true;
  await isAccount.save();
  return res.json({ success: true, message: "Account Accepted Successfully" });
});

export const rejectManagerAcc = asyncHandler(async (req, res, next) => {
  let isAccount = await Manager.findOne({
    where: { manager_id: req.params.manager_id },
  });
  if (!isAccount) return next(new Error("Account Not Found"));
  if (isAccount.Accepted_Acc)
    return next(new Error("Account Already Accepted"));

  isAccount.destroy();
  return res.json({
    success: true,
    message: "Account Rejected Successfully",
  });
});

export const getAllSecretaries = asyncHandler(async (req, res, next) => {
  let secertaries = await Secertary.findAll({
    attributes: {
      exclude: ["PassWord", "resetCode", "resetCodeVerified"],
    },
  });
  return res.json({ success: true, secertaries });
});

export const getAllManagers = asyncHandler(async (req, res, next) => {
  let managers = await Manager.findAll({
    attributes: {
      exclude: ["PassWord", "resetCode", "resetCodeVerified"],
    },
  });
  return res.json({ success: true, managers });
});

export const getLoginHistory = asyncHandler(async (req, res, next) => {
  let history = await Token.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Secertary,
        attributes: {
          exclude: ["PassWord", "resetCode", "resetCodeVerified"],
        },
      },
      {
        model: Manager,
        attributes: {
          exclude: ["PassWord", "resetCode", "resetCodeVerified"],
        },
      },
    ],
    attributes: {
      exclude: ["token"],
    },
  });
  return res.json({ success: true, history });
});

export const deleteManager = asyncHandler(async (req, res, next) => {
  let isManager = await Manager.findOne({
    where: { manager_id: req.params.manager_id },
  });
  if (!isManager) return next(new Error("Manager Not Found"));
  if (isManager.isDeleted) {
    return next(new Error("Manager Already Deleted"));
  }
  isManager.isDeleted = true;
  await isManager.save();
  return res.json({ success: true, message: "Manager Deleted Successfully" });
});

export const deleteSecretary = asyncHandler(async (req, res, next) => {
  let isSecretary = await Secertary.findOne({
    where: { secretary_id: req.params.secretary_id },
  });
  if (!isSecretary) return next(new Error("Secertary Not Found"));
  if (isSecretary.isDeleted) {
    return next(new Error("Secertary Already Deleted"));
  }
  isSecretary.isDeleted = true;
  await isSecretary.save();
  return res.json({ success: true, message: "Secertary Deleted Successfully" });
});

export const getAdminDetails = async (req, res, next) => {
  console.log(req.payload);
  let admin = await Admin.findByPk(req.payload.id, {
    attributes: {
      exclude: ["Password", "resetCodeVerified", "resetCode"],
    },
  });
  console.log(admin);
  return res.json({ success: true, admin });
};
