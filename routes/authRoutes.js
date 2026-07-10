import { getSignUpPage, registerUser } from "../controllers/userController.js";
import { validateUser } from "../validation/validate.js";
import { Router } from "express";

const authRouter = Router();

authRouter.get("/sign-up", getSignUpPage);
authRouter.post("/sign-up", validateUser(), registerUser);

export default authRouter;
