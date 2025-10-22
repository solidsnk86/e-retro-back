import { Router } from "express";
import { AiController } from "../controllers/ai.controller.js";

export const aiRoute = Router()

aiRoute.get("/ai", AiController.init)