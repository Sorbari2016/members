import {
  getNewMessage,
  getEditMessage,
} from "../controllers/messageController.js";
import { Router } from "express";

const messageRouter = Router();

// Message routes
messageRouter.get("/new", getNewMessage);
messageRouter.get("/:messageId/edit", getEditMessage);

export default messageRouter;
