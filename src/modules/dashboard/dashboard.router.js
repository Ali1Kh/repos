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
  dashboardController.getAllMeetings
);

router.get(
  "/getNotAcceptedSec",
  isAuthenticated,
  isAuthorized("Admin"),
  dashboardController.getNotAccepted
);

router.post(
  "/acceptAcc/:secretary_id",
  isAuthenticated,
  isAuthorized("Admin"),
  validation(dashboardSchemas.acceptAccSchema),
  dashboardController.acceptAcc
);

router.get(
  "/getAllSecretaries",
  isAuthenticated,
  isAuthorized("Admin"),
  dashboardController.getAllSecretaries
);

router.get(
  "/getAllManagers",
  isAuthenticated,
  isAuthorized("Admin"),
  dashboardController.getAllManagers
);

router.get(
  "/getLoginHistory",
  isAuthenticated,
  isAuthorized("Admin"),
  dashboardController.getLoginHistory
);

router.delete(
  "/deleteManager/:manager_id",
  isAuthenticated,
  isAuthorized("Admin"),
  validation(dashboardSchemas.deleteManagerAccSchema),
  dashboardController.deleteManager
);

router.delete(
  "/deleteSecretary/:secretary_id",
  isAuthenticated,
  isAuthorized("Admin"),
  validation(dashboardSchemas.acceptAccSchema),
  dashboardController.deleteSecretary
);

export default router;
