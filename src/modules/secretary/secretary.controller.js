import { Meetings } from "../../../DB/models/meeting.model.js";

export const createMeeting = async (req, res, next) => {
  await Meetings.create({ ...req.body, statues: "not done" });

  return res.json({ success: true, message: "Meeting created Successfully" });
};
