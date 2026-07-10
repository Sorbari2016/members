import { Router } from "express";
import {
  registerMember,
  getMembershipPage,
} from "../controllers/userController.js";
import { validatePasscode } from "../validation/validate.js";

const userRouter = Router();

// Users defined routes
userRouter.get("/join-club", getMembershipPage);
userRouter.post("/:id/join-club", validatePasscode(), registerMember);

export default userRouter;
