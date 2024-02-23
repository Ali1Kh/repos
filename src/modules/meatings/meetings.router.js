import { Router } from "express";
import * as meetingsController from "./meetings.controller.js";
import * as meetingsSchema from "./meetings.schema.js";
import { validation } from "../../middleware/validation.middleware.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.get(
  "/",
  isAuthenticated,
  isAuthorized("Manager"),
  asyncHandler(meetingsController.getManagerMeeting)
);

router.get(
  "/:meetingId",
  isAuthenticated,
  isAuthorized("Manager"),
  asyncHandler(meetingsController.getManagerMeetingDetails)
);

export default router;