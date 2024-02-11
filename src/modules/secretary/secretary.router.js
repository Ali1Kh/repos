import { Router } from "express";
import * as secretaryController from "./secretary.controller.js";
import * as secretarySchema from "./secretary.schema.js";
import { validation } from "../../middleware/validation.middleware.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.post(
  "/createMeeting",
  isAuthenticated,
  isAuthorized("Secertary"),
  validation(secretarySchema.createMeetingSchema),
  asyncHandler(secretaryController.createMeeting)
);

export default router;
