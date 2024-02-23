import { Manager } from "../../../DB/models/manager.model.js";
import { Meetings } from "../../../DB/models/meeting.model.js";
import { Note } from "../../../DB/models/notes.model.js";
import { asyncHandler } from "./../../utils/asyncHandler.js";

export const createNote = asyncHandler(async (req, res, next) => {
    const isManager = await Manager.findByPk(req.params.manager_id)
    if (!isManager.dataValues.manager_id) return next(new Error("Manager Not Found!"))

    const isMeeting = await Meetings.findByPk(req.params.meeting_id)
    if (!isMeeting.dataValues.meeting_id) return next(new Error("Meeting Not Found!"))

    await Note.create({
        ...req.body,
        manager_id:req.params.manager_id,
        meeting_id:req.params.meeting_id,
    })

    return res.json({ success: true, message: "Note Created Successfully" });
});

export const updateNote = asyncHandler(async (req, res, next) => {

    return res.json({ success: true, message: "Note Updated Successfully" });
});

export const getAllNotes = asyncHandler(async (req, res, next) => {
    const isManager = await Manager.findByPk(req.params.manager_id)
    if (!isManager) return next(new Error("Manager Not Found!"))

    const notes = await Note.findAll({where:isManager.dataValues._id})

    return res.json({ success: true,results:{notes}});
});