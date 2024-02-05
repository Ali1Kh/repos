import { Router } from "express";
import * as userController from './user.controller.js'
import * as UserSchemas from './user.schema.js'
import { validation } from "../../middleware/validation.middleware.js";

const router = Router()

//1 Sign Up
router.post("/signup",validation(UserSchemas.signUpSchema),userController.signUp)

//1 SignIn
router.get("/signin",validation(UserSchemas.signInSchema),userController.signIn)

export default router
