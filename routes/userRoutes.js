import {
  getMembershipPage,
  registerMember,
  makeAdmin,
} from "../controllers/memberController.js";
import { Router } from "express";
import { validatePasscode } from "../validation/validate.js";

const userRouter = Router();

userRouter.get("/:id/join-club", getMembershipPage);
userRouter.post("/:id/join-club", validatePasscode(), registerMember);
userRouter.post("/:id/make-admin", makeAdmin);

export default userRouter;
