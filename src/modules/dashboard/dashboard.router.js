import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import * as dashboardController from "./dashboard.controller.js";
import * as dashboardSchemas from "./dashboard.schema.js";
import { validation } from "../../middleware/validation.middleware.js";
const router = Router();

router.get(
  "/getAllMeetings",
  isAuthenticated,
  isAuthorized("Admin"),
  validation(dashboardSchemas.createNoteSchema),
  dashboardController.getAllMeetings
);

export default router;
