import { Router } from "express";
import { AiController } from "../controllers/ai.controller.js";
import { isAuth } from "../middleware/isAuth.js"

export const aiRoute = Router()

aiRoute.get("/ai", isAuth, AiController.init)