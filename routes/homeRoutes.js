import { getHomepage } from "../controllers/homeController.js";
import {
  getRegisterPage,
  registerUser,
  getLoginPage,
  loginUser,
} from "../controllers/userController.js";
import { validateUser } from "../validation/validate.js";
import { Router } from "express";

const homeRouter = Router();

homeRouter.get("/", getHomepage);
homeRouter.get("/register", getRegisterPage);
homeRouter.post("/register", validateUser(), registerUser);
homeRouter.get("/login", getLoginPage);
homeRouter.post("/login", validateUser(), loginUser);

export default homeRouter;
