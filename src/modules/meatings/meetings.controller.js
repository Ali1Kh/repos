import { sequelize } from "../../../DB/connection.js";
import { Manager } from "../../../DB/models/manager.model.js";
import { Meetings } from "../../../DB/models/meeting.model.js";
import { meeting_Manager } from "../../../DB/models/meeting_Manager.model.js";

export const getManagerMeeting = async (req, res, next) => {
  const meetings = await sequelize.query(
    `
  SELECT * FROM Meetings
  JOIN meeting_Manager ON Meetings.meeting_id = meeting_Manager.meeting_id
  WHERE meeting_Manager.manager_id = ${req.payload.id};
  `,
    { model: Meetings }
  );

  return res.json({ success: true, count: meetings?.length, meetings });
};

export const getManagerMeetingDetails = async (req, res, next) => {
  const meetings = await sequelize.query(
    `
  SELECT * FROM Meetings
  JOIN meeting_Manager ON Meetings.meeting_id = meeting_Manager.meeting_id
  WHERE meeting_Manager.manager_id = ${req.payload.id} and meeting_Manager.meeting_id = ${req.params.meetingId};
  `,
    { model: Meetings }
  );

  return res.json({ success: true, meetings });
};
