import { Meetings } from "../../../DB/models/meeting.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const getAllMeetings = asyncHandler(async (req, res, next) => {
  let meetings = await Meetings.findAll();
  return res.json({ success: true, count: meetings.length, meetings });
});
