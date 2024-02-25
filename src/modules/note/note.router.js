import { Router } from "express";
import * as noteController from "./note.controller.js";
import * as NoteSchemas from "./note.schema.js";
import { validation } from "../../middleware/validation.middleware.js";
import { isAuthenticated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "./../../middleware/authorization.middleware.js";

const router = Router();


router.post(
    "/",
    isAuthenticated,
    isAuthorized("Manager"),
    validation(NoteSchemas.createNoteSchema),
    noteController.createNote
  );

router.post(
  "/:meeting_id",
  isAuthenticated,
  isAuthorized("Manager"),
  validation(NoteSchemas.createMeetingNoteSchema),
  noteController.createMeetingNote
);

router.patch(
  "/update-note/:meeting_id",
  isAuthenticated,
  isAuthorized("Manager"),
  validation(NoteSchemas.updateNoteSchema),
  noteController.updateNote
);

router.get(
  "/",
  isAuthenticated,
  isAuthorized("Manager"),
  noteController.getAllNotes
);

export default router;
