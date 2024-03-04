import { Admin } from "../../../DB/models/admin.model.js";
import { Manager } from "../../../DB/models/manager.model.js";
import { Meetings } from "../../../DB/models/meeting.model.js";
import { Secertary } from "../../../DB/models/secertary.model.js";
import { Token } from "../../../DB/models/token.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const getAllMeetings = asyncHandler(async (req, res, next) => {
  let meetings = await Meetings.findAll();
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
      exclude: ["PassWord", "resetCode", "resetCodeVerified", "updatedAt"],
    },
  });
  return res.json({ success: true, secertaries });
});

export const getAllManagers = asyncHandler(async (req, res, next) => {
  let managers = await Manager.findAll({
    attributes: {
      exclude: ["PassWord", "resetCode", "resetCodeVerified", "updatedAt"],
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
