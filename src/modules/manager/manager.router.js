import { Router } from "express";
import * as managersController from "./manager.controller.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.get(
  "/getManagerDetails",
  isAuthenticated,
  isAuthorized("Manager"),
  asyncHandler(managersController.getManagerDetails)
);

export default router;
