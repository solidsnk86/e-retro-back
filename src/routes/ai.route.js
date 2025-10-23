import { Router } from "express";
import { AiController } from "../controllers/ai.controller.js";
import { cohere } from "../cohere_client/cohereConfig.js";

export const aiRoute = Router()
const aiController = new AiController({ model: cohere })

aiRoute.get("/ai", aiController.init)