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
  dashboardController.getNotAcceptedSec
);

router.get(
  "/getNotAcceptedManagers",
  isAuthenticated,
  isAuthorized("Admin"),
  dashboardController.getNotAcceptedManageres
);

router.get(
  "/getDeletedManageres",
  isAuthenticated,
  isAuthorized("Admin"),
  dashboardController.getDeletedManagers
);

router.get(
  "/getDeletedSecretaries",
  isAuthenticated,
  isAuthorized("Admin"),
  dashboardController.getDeletedSecretaries
);

router.post(
  "/acceptAcc/:secretary_id",
  isAuthenticated,
  isAuthorized("Admin"),
  validation(dashboardSchemas.acceptAccSchema),
  dashboardController.acceptSecAcc
);

router.post(
  "/rejectAcc/:secretary_id",
  isAuthenticated,
  isAuthorized("Admin"),
  validation(dashboardSchemas.acceptAccSchema),
  dashboardController.rejectSecAcc
);

router.post(
  "/acceptManagerAcc/:manager_id",
  isAuthenticated,
  isAuthorized("Admin"),
  validation(dashboardSchemas.acceptManagerSchema),
  dashboardController.acceptManagerAcc
);

router.post(
  "/rejectManagerAcc/:manager_id",
  isAuthenticated,
  isAuthorized("Admin"),
  validation(dashboardSchemas.acceptManagerSchema),
  dashboardController.rejectManagerAcc
);

router.post(
  "/recoverManager/:manager_id",
  isAuthenticated,
  isAuthorized("Admin"),
  validation(dashboardSchemas.acceptManagerSchema),
  dashboardController.recoverManagerAcc
);

router.post(
  "/recoverSec/:secretary_id",
  isAuthenticated,
  isAuthorized("Admin"),
  validation(dashboardSchemas.acceptAccSchema),
  dashboardController.recoverSecAcc
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

router.delete(
  "/deleteMeeting/:meeting_id",
  isAuthenticated,
  isAuthorized("Admin"),
  validation(dashboardSchemas.deleteMeetingSchema),
  dashboardController.deleteMeeting
);

router.get(
  "/getLoginHistory",
  isAuthenticated,
  isAuthorized("Admin"),
  dashboardController.getLoginHistory
);

router.get(
  "/getAdminDetails",
  isAuthenticated,
  isAuthorized("Admin"),
  dashboardController.getAdminDetails
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
  "/getDeletedMeetings",
  isAuthenticated,
  isAuthorized("Admin"),
  dashboardController.getDeletedMeetings  
)

export default router;
