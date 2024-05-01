import { Manager } from "../../../DB/models/manager.model.js";
import { Secertary } from "../../../DB/models/secertary.model.js";
import { Notifications } from "../../../DB/models/notifications.model.js";

export const getManagerDetails = async (req, res, next) => {
  const manager = await Manager.findByPk(req.payload.id, {
    attributes: {
      exclude: ["PassWord", "resetCodeVerified", "resetCode"],
    },
    include: {
      model: Secertary,
      attributes: ["secretary_id"],
      through: { attributes: [] },
    },
  });
  return res.json({ success: true, manager });
};

export const markNotificationAsRead = async (req, res, next) => {
  if (!req.params.id) {
    return next(new Error("Notification Id Is Missing"));
  }
  let isNotification = await Notifications.findOne({
    where: {
      notificationId: req.params.id,
    },
  });
  if (!isNotification) return next(new Error("Notification Not Found"));
  if (isNotification.manager_id !== req.payload.id) {
    return next(new Error("You Don't have permissions"));
  }

  await isNotification.destroy();

  return res.json({ success: true, message: "Notification Marked As Read" });
};
