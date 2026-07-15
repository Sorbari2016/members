import {
  getNewMessage,
  getEditMessage,
  createMessage,
  updateMessage,
} from "../controllers/messageController.js";
import { validateMessage } from "../validation/validate.js";
import { Router } from "express";

const messageRouter = Router();

// Message routes
messageRouter.get("/new", getNewMessage);
messageRouter.get("/:messageId/edit", getEditMessage);
messageRouter.post("/", validateMessage(), createMessage);
messageRouter.post("/:messageId/edit", validateMessage(), updateMessage);

export default messageRouter;
