import { Manager } from "../../../DB/models/manager.model.js";
import { Meetings } from "../../../DB/models/meeting.model.js";
import { Meeting_Manager } from "../../../DB/models/meeting_Manager.model.js";

export const createMeeting = async (req, res, next) => {
  let isManager = await Manager.findByPk(req.params.manager_id);
  if (!isManager) return next(new Error("Invalid Manager Id"));

  if (isManager.secretary_id != req.payload.id)
    return next(new Error("You Must Be The Secretary For This Manager Id"));

  let meeting = await Meetings.create({
    ...req.body,
    statues: "not done",
  });
  await Meeting_Manager.create({
    manager_id: isManager.manager_id,
    meeting_id: meeting.dataValues.meeting_id,
  });
  return res.json({ success: true, message: "Meeting created Successfully" });
};
