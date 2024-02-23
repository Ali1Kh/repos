import { Router } from "express";
import * as noteController from "./note.controller.js";
import * as NoteSchemas from "./note.schema.js";
import { validation } from "../../middleware/validation.middleware.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "./../../middleware/authorization.middleware.js";

const router = Router();

//1 Create Note
router.post(
  "/create-note/:meeting_id",
  isAuthenticated,
  isAuthorized("Manager"),
  validation(NoteSchemas.createNoteSchema),
  noteController.createNote
);

//2 update Note
router.post(
  "/update-note/:meeting_id",
  isAuthenticated,
  isAuthorized("Manager"),
  validation(NoteSchemas.updateNoteSchema),
  noteController.updateNote
);

//3 get all notes
router.get(
  "/:manager_id",
  isAuthenticated,
  isAuthorized("Manager"),
  noteController.getAllNotes
);

export default router;
