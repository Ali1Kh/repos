import { Manager } from "../../../DB/models/manager.model.js";
import { Meetings } from "../../../DB/models/meeting.model.js";
import { Secertary } from "../../../DB/models/secertary.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import bcryptjs from "bcryptjs";
import { meeting_Manager } from "../../../DB/models/meeting_Manager.model.js";
import cloudinary from "../../utils/cloud.js";
import { Op, or } from "sequelize";
import { sequelize } from "../../../DB/connection.js";
import { Manager_Secretary } from "../../../DB/models/Manager_Secretary.model.js";
import { io } from "../../../index.js";
import { Notifications } from "../../../DB/models/notifications.model.js";

//createManagerAccount
export const createManagerAccount = asyncHandler(async (req, res, next) => {
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

  let manager = await Manager.create({
    ...req.body,
    PassWord: managerhashPass,
  });

  await manager.addSecretaries(req.payload.id);

  return res.json({ success: true, message: "Manager Created Successfully" });
});

export const addExistingManager = asyncHandler(async (req, res, next) => {
  const isManager = await Manager.findOne({
    where: { E_mail: req.body.E_mail },
  });
  if (!isManager) return next(new Error("Manager Not Found"));

  const isMyManager = await Manager.findOne({
    where: { E_mail: req.body.E_mail },
    include: [
      {
        model: Secertary,
        attributes: [],
        where: {
          secretary_id: req.payload.id,
        },
      },
    ],
  });
  if (isMyManager)
    return next(new Error("You Are Already Secretary  For This Manager"));

  await isManager.addSecretaries(req.payload.id);

  await Manager_Secretary.update(
    { isAccepted: 0 },
    {
      where: {
        manager_id: isManager.dataValues.manager_id,
        secretary_id: req.payload.id,
      },
    }
  );

  return res.json({
    success: true,
    message: "Manager Added Successfully To Your Account",
  });
});

export const createMeeting = async (req, res, next) => {
  let isManager = await Manager.findByPk(req.params.manager_id, {
    include: [
      {
        model: Secertary,
        attributes: ["secretary_id"],
      },
    ],
  });

  if (!isManager) return next(new Error("Invalid Manager"));

  if (
    !isManager.dataValues.Secretaries.find((secretary) => {
      return secretary.dataValues.secretary_id === req.payload.id;
    })
  )
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

  if (req.body.insidePersons) {
    req.body.insidePersons.map(async (manager) => {
      let isManager = await Manager.findByPk(manager);
      if (!isManager) return next(new Error("Invalid Inside Manager"));

      await meeting_Manager.create({
        manager_id: isManager.manager_id,
        meeting_id: meeting.dataValues.meeting_id,
      });
    });
  }
  await meeting_Manager.create({
    manager_id: isManager.manager_id,
    meeting_id: meeting.dataValues.meeting_id,
  });

  const notification = await Notifications.create({
    manager_id: isManager.manager_id,
    message: "New Meeting Added To You Acccount With " + req.body.person,
    meeting_id: meeting.dataValues.meeting_id,
  });

  io.to(isManager.socketId).emit("newNotification", notification);

  return res.json({ success: true, message: "Meeting created Successfully" });
};

export const getSecMeetings = async (req, res, next) => {
  let meetings = await sequelize.query(
    `select Meetings.meeting_id,time,date,about,in_or_out,address, notes,person,statues,addedBy,
     Secretary.first_name as 'Secertary_Name',Secretary.last_name as 'Secertary_LastName',
     Secretary.E_mail as 'Secertary_Email',
     Meetings.createdAt,Meetings.updatedAt,attachmentId,attachmentLink,attachmentName,
     Manager.manager_id,CONCAT(Manager.first_name, ' ', Manager.last_name)  as 'Manager_Name',
     Manager.E_mail as 'Manager_Email',
     Manager.UserName as 'Manager_UserName' from Meetings
     join meeting_Manager on Meetings.meeting_id = meeting_Manager.meeting_id 
     join Manager on meeting_Manager.manager_id = Manager.manager_id  
     join Manager_Secretaries on meeting_Manager.manager_id = Manager_Secretaries.manager_id
     join Secretary on addedBy = Secretary.secretary_id
     where Manager_Secretaries.secretary_id = ${req.payload.id} and 
     Manager_Secretaries.isAccepted = 1 and Meetings.isDeleted = 0 
      GROUP BY Meetings.meeting_id`,
    {
      model: Meetings,
    }
  );
  return res.json({ success: true, meetings });
};

export const getSecMeetingsDetails = async (req, res, next) => {
  let meetings = await Meetings.findOne({
    where: {
      addedBy: req.payload.id,
      meeting_id: req.params.meetingId,
      isDeleted: 0,
    },
  });
  return res.json({ success: true, meetings });
};

export const getSecManagers = async (req, res, next) => {
  let managers = await sequelize.query(
    `select Manager.manager_id,Manager.first_name,Manager.last_name,E_mail,UserName from Manager 
    join Manager_Secretaries on Manager.manager_id = Manager_Secretaries.manager_id
    where Manager_Secretaries.secretary_id = ${req.payload.id} and Manager_Secretaries.isAccepted = 1 and Manager.isDeleted = 0
    `
    , {
      model: Manager
    }
  );

  return res.json({ success: true, count: managers.length, managers });
};

export const getSecDetails = async (req, res, next) => {
  let secertary = await Secertary.findByPk(req.payload.id, {
    attributes: {
      exclude: ["PassWord", "resetCodeVerified", "resetCode"],
    },
  });
  return res.json({ success: true, secertary });
};

export const getAllManagers = async (req, res, next) => {
  let managers = await Manager.findAll({
    attributes: ["manager_id", "first_name", "last_name"],
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
      public_id: isMeeting.attachmentId,
    });
  }

  isMeeting.update({
    ...req.body,
    attachmentLink: upload?upload.secure_url:null,
    attachmentId: upload?upload.public_id:null,
    attachmentName: req.file?req.file.originalname:null,
  });

  return res.json({ success: true, message: "Meeting Updated Successfully" });
};

export const changeStatus = async (req, res, next) => {
  let isMeeting = await Meetings.findOne({
    where: { meeting_id: req.params.meetingId },
  });
  if (!isMeeting) return next(new Error("Meeting Not Found"));

  if (req.payload.role == "Manager") {
    let isMeetingManager = await meeting_Manager.findOne({
      where: {
        manager_id: req.payload.id,
        meeting_id: req.params.meetingId,
      },
    });
    if (!isMeetingManager) {
      return next(new Error("You Don't have Permissions"));
    }
  }

  if (req.payload.role == "Secertary") {
    if (isMeeting.dataValues.addedBy != req.payload.id)
      return next(new Error("You Don't have permissions"));
  }

  isMeeting.update({
    statues: req.body.status,
  });

  return res.json({
    success: true,
    message: "Meeting Status Changed Successfully",
  });
};

export const deleteMeeting = async (req, res, next) => {
  let isMeeting = await Meetings.findOne({
    where: { meeting_id: req.params.meetingId },
  });
  if (!isMeeting) return next(new Error("Meeting Not Found"));

  if (isMeeting.dataValues.addedBy != req.payload.id)
    return next(new Error("You Don't have permissions"));

  if (isMeeting.dataValues.isDeleted) {
    return next(new Error("Meeting Already Deleted"));
  }
  isMeeting.isDeleted = 1;
  await isMeeting.save();
  return res.json({ success: true, message: "Meeting Deleted Successfully" });
};
