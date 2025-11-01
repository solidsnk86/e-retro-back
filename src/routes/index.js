import { Router } from "express";
import { tasksRouter } from "./tasks.route.js";
import { authRouter } from "./auth.route.js";
import { userRouter } from "./user.route.js";
import { aiRouter } from "./ai.route.js";

export const appRouter = Router()

appRouter.use("/api", userRouter)
appRouter.use("/api", authRouter)
appRouter.use("/api", tasksRouter)
appRouter.use("/api/", aiRouter)