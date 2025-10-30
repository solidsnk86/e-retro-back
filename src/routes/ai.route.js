import { Router } from "express";
import { AiController } from "../controllers/ai.controller.js";
import { cohere } from "../cohere_client/cohereConfig.js";

export const aiRouter = Router()
const aiController = new AiController({ model: cohere })

aiRouter.get("/ai", aiController.init)