import { Router } from "express";
import * as userController from "./user.controller.js";
import * as UserSchemas from "./user.schema.js";
import { validation } from "../../middleware/validation.middleware.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";

const router = Router();

//1 Sign Up
router.post(
  "/signup",
  validation(UserSchemas.signUpSchema),
  userController.signUp
);

//2 SignIn
router.post(
  "/login",
  validation(UserSchemas.signInSchema),
  userController.signIn
);

// Forget Password
router.post(
  "/send-forget-code",
  validation(UserSchemas.sendForgetPassCodeSchema),
  userController.sendForgetPassCode
);

router.post(
  "/verifyResetCode",
  validation(UserSchemas.verifyResetCodeSchema),
  userController.verifyResetCode
);

router.post(
  "/forget-password",
  validation(UserSchemas.forgetPassSchema),
  userController.forgetPassword
);

export default router;
