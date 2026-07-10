import {
  getSignUpPage,
  registerUser,
  getLoginPage,
  loginUser,
} from "../controllers/userController.js";
import { validateUser } from "../validation/validate.js";
import { Router } from "express";

const authRouter = Router();

authRouter.get("/register", getSignUpPage);
authRouter.post("/register", validateUser(), registerUser);
authRouter.get("/login", getLoginPage);
authRouter.post("/login", validateUser(), loginUser);

export default authRouter;
