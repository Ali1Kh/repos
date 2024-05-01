import { sequelize } from "../../../DB/connection.js";
import { Manager } from "../../../DB/models/manager.model.js";
import { Meetings } from "../../../DB/models/meeting.model.js";
import { Note } from "../../../DB/models/notes.model.js";
import { asyncHandler } from "./../../utils/asyncHandler.js";
import { Op } from "sequelize";
export const createNote = asyncHandler(async (req, res, next) => {
  let note = await Note.create({
    ...req.body,
    manager_id: req.payload.id,
  });
  return res.json({
    success: true,
    noteId: note.notes_id,
    message: "Note Created Successfully",
  });
});

export const createMeetingNote = asyncHandler(async (req, res, next) => {
  const isMeeting = await Meetings.findByPk(req.params.meeting_id);
  if (!isMeeting) return next(new Error("Meeting Not Found!"));
  let note = await Note.create({
    ...req.body,
    manager_id: req.payload.id,
    meeting_id: req.params.meeting_id,
  });
  return res.json({
    success: true,
    noteId: note.notes_id,
    message: "Note Created Successfully",
  });
});

export const updateNote = asyncHandler(async (req, res, next) => {
  const isNote = await Note.findByPk(req.params.id);
  if (!isNote) return next(new Error("Note Not Found"));
  if (isNote.dataValues.manager_id !== req.payload.id)
    return next(new Error("You Don't have permissions"));
  let note = await Note.update(
    { ...req.body },
    {
      where: {
        notes_id: req.params.id,
      },
    }
  );
  return res.json({
    success: true,
    noteId: note.notes_id,
    message: "Note Updated Successfully",
  });
});

export const getAllNotes = asyncHandler(async (req, res, next) => {
  const isManager = await Manager.findByPk(req.payload.id);
  if (!isManager) return next(new Error("Manager Not Found!"));

  const sortParam = req.query.sort || "createdAt";
  const sortOrder = sortParam.startsWith("-") ? "DESC" : "ASC";
  const sortField = sortParam.replace(/^-/, "");

  const whereClause = {
    manager_id: req.payload.id,
  };

  if (req.query.title || req.query.content) {
    whereClause[Op.or] = [];
  }

  if (req.query.title) {
    whereClause[Op.or].push({ title: { [Op.like]: `%${req.query.title}%` } });
  }

  if (req.query.content) {
    whereClause[Op.or].push({
      content: { [Op.like]: `%${req.query.content}%` },
    });
  }

  if (req.query.createdAt?.eq) {
    whereClause.createdAt = sequelize.literal(
      `(notes.createdAt) = '${req.query.createdAt.eq}'`
    );
  }

  if (req.query.createdAt?.gte) {
    whereClause.createdAt = sequelize.literal(
      `(notes.createdAt) >= '${req.query.createdAt.gte}'`
    );
  }

  if (req.query.createdAt?.lte) {
    whereClause.createdAt = sequelize.literal(
      `(notes.createdAt) <= '${req.query.createdAt.lte}'`
    );
  }

  if (req.query.updatedAt?.eq) {
    whereClause.updatedAt = sequelize.literal(
      `(notes.updatedAt) = '${req.query.updatedAt.eq}'`
    );
  }

  if (req.query.updatedAt?.gte) {
    whereClause.updatedAt = sequelize.literal(
      `(notes.updatedAt) >= '${req.query.updatedAt.gte}'`
    );
  }

  if (req.query.updatedAt?.lte) {
    whereClause.updatedAt = sequelize.literal(
      `(notes.updatedAt) <= '${req.query.updatedAt.lte}'`
    );
  }

  if (req.query?.isUpdated === "true") {
    whereClause.createdAt = { [Op.ne]: sequelize.col("notes.updatedAt") };
  }

  const notes = await Note.findAll({
    order: [[sortField, sortOrder]],
    where: whereClause,
    include: [
      {
        model: Meetings,
      },
    ],
  });

  return res.json({ success: true, count: notes.length, notes });
});

export const deleteNote = asyncHandler(async (req, res, next) => {
  const isNote = await Note.findByPk(req.params.id);
  if (!isNote) return next(new Error("Note Not Found"));
  if (isNote.dataValues.manager_id !== req.payload.id)
    return next(new Error("You Don't have permissions"));
  await Note.destroy({
    where: {
      notes_id: req.params.id,
    },
  });
  return res.json({ success: true, message: "Note Deleted Successfully" });
});
