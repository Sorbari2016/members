import { CreateUser } from "../controllers/userController.js";
import { validateUser } from "../validation/validate.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/sign-up", validateUser, CreateUser);
