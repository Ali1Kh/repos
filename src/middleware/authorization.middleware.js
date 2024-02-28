import { Secertary } from "../../DB/models/secertary.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const isAuthorized = (role) => {
  return asyncHandler(async (req, res, next) => {
    if (role.toLowerCase() != req.payload.role.toLowerCase())
      return next(new Error("You Don't Have Permissions"));
    if (role.toLowerCase() == "Secertary".toLowerCase()) {
      let isAccepted = await Secertary.findOne({
        where: { secretary_id: req.payload.id, Accepted_Acc: true },
      });
      if (!isAccepted) return next(new Error("Your Account Is Not Accepted"));
    }
    next();
  });
};
