import { Manager } from "../../../DB/models/manager.model.js";
import { Secertary } from "../../../DB/models/secertary.model.js";

export const getManagerDetails = async (req, res, next) => {
  const manager = await Manager.findByPk(req.payload.id, {
    attributes: {
      exclude: ["PassWord", "resetCodeVerified", "resetCode"],
    },
    include: {
      model: Secertary,
      attributes: ["secretary_id"],
      through: { attributes: [] }
    },
  });
  return res.json({ success: true, manager });
};
