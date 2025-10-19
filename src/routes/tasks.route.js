import { Router } from "express";
import { TasksController } from "../controllers/task.controller.js";
// import { pgLocalDB } from "../dbConfig.js";
import { isAuth } from "../middleware/isAuth.js";
import { serverNeonDB } from "../../neon/neonDbConfig.js";

export const tasksRouter = Router();
const tasksController = new TasksController({ taskDb: serverNeonDB });

tasksRouter.get("/tasks", isAuth, tasksController.getAllTasks);
tasksRouter.get("/task/:id", isAuth, tasksController.getTaskById);
tasksRouter.post("/task", isAuth, tasksController.createTask);
tasksRouter.put("/update/task/:id", isAuth, tasksController.updateTask);
tasksRouter.delete("/delete/task/:id", isAuth, tasksController.deleteTask);