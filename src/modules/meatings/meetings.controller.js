import { sequelize } from "../../../DB/connection.js";
import { Manager } from "../../../DB/models/manager.model.js";
import { Meetings } from "../../../DB/models/meeting.model.js";
import { meeting_Manager } from "../../../DB/models/meeting_Manager.model.js";

export const getManagerMeeting = async (req, res, next) => {
  let whereClause = "1=1";
  const replacements = {};
  const sortParam = req.query.sort || "createdAt";
  const sortOrder = sortParam.startsWith("-") ? "DESC" : "ASC";
  const sortField = sortParam.replace(/^-/, "");

  if (req.query.date?.eq) {
    whereClause += " AND date = :dateEq";
    replacements.dateEq = req.query.date.eq;
  }

  if (req.query.date?.gte) {
    whereClause += " AND date >= :dateGte";
    replacements.dateGte = req.query.date.gte;
  }

  if (req.query.date?.lte) {
    whereClause += " AND date <= :dateLte";
    replacements.dateLte = req.query.date.lte;
  }

  if (req.query?.status) {
    whereClause += " AND statues = :status";
    replacements.status = req.query.status;
  }

  if (req.query?.in_or_out) {
    whereClause += " AND in_or_out = :in_or_out";
    replacements.in_or_out = req.query.in_or_out;
  }

  if (req.query?.createdAt) {
    whereClause += " AND DATE(createdAt) = :createdAt";
    replacements.createdAt = req.query.createdAt;
  }

  if (req.query?.updatedAt) {
    whereClause += " AND DATE(updatedAt) = :updatedAt";
    replacements.updatedAt = req.query.updatedAt;
  }

  if (req.query?.isUpdated == "true") {
    whereClause += " AND createdAt != updatedAt";
  }

  const conditions = [];

  if (req.query?.person) {
    conditions.push("person LIKE :person");
    replacements.person = `%${req.query.person}%`;
  }

  if (req.query?.about) {
    conditions.push("about LIKE :about");
    replacements.about = `%${req.query.about}%`;
  }

  if (req.query?.address) {
    conditions.push("address LIKE :address");
    replacements.address = `%${req.query.address}%`;
  }

  if (conditions.length > 0) {
    whereClause += " AND (" + conditions.join(" OR ") + ")";
  }

  if (req.query.time?.eq) {
    whereClause += " AND time = :timeEq";
    replacements.timeEq = req.query.time.eq;
  }

  if (req.query.time?.gte) {
    whereClause += " AND time >= :timeGte";
    replacements.timeGte = req.query.time.gte;
  }

  if (req.query.time?.lte) {
    whereClause += " AND time <= :timeLte";
    replacements.timeLte = req.query.time.lte;
  }

  const meetings = await sequelize.query(
    `
  SELECT * FROM Meetings
  JOIN meeting_Manager ON Meetings.meeting_id = meeting_Manager.meeting_id
  WHERE meeting_Manager.manager_id = ${req.payload.id}  AND ${whereClause} ORDER BY ${sortField} ${sortOrder};
  `,
    {
      replacements: { ...replacements },
      model: Meetings,
    }
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
