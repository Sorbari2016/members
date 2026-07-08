import { Router } from "express";
import { getHomePage } from "../controller/controllers.js";

const router = Router();

export { router };

router.get("/", getHomePage);
