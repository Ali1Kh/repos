import { Manager } from "../../../DB/models/manager.model.js";

export const getManagerDetails = async (req, res, next) => {
  const manager = await Manager.findByPk(req.payload.id,{
    attributes:{
      exclude:["PassWord","resetCodeVerified","resetCode"]
    }
  });
  return res.json({ success: true, manager });
};
