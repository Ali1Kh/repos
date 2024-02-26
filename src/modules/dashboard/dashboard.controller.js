import { Manager } from "../../../DB/models/manager.model.js";
import { Meetings } from "../../../DB/models/meeting.model.js";
import { Secertary } from "../../../DB/models/secertary.model.js";
import { Token } from "../../../DB/models/token.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const getAllMeetings = asyncHandler(async (req, res, next) => {
  let meetings = await Meetings.findAll();
  return res.json({ success: true, count: meetings.length, meetings });
});

export const getNotAccepted = asyncHandler(async (req, res, next) => {
  let secertaries = await Secertary.findAll({
    where: { Accepted_Acc: false },
    attributes: {
      exclude: ["PassWord", "resetCode", "resetCodeVerified", "updatedAt"],
    },
  });
  return res.json({ success: true, count: secertaries.length, secertaries });
});

export const acceptAcc = asyncHandler(async (req, res, next) => {
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

export const rejectAcc = asyncHandler(async (req, res, next) => {
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
  await isManager.destroy();
  return res.json({ success: true, message: "Manager Deleted Successfully" });
});

export const deleteSecretary = asyncHandler(async (req, res, next) => {
  let isSecretary = await Secertary.findOne({
    where: { secretary_id: req.params.secretary_id },
  });
  if (!isSecretary) return next(new Error("Secertary Not Found"));
  await isSecretary.destroy();
  return res.json({ success: true, message: "Secertary Deleted Successfully" });
});
