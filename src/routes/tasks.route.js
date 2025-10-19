import { Router } from "express";
import { TasksController } from "../controllers/task.controller.js";
// import { pgLocalDB } from "../dbConfig.js";
import { isAuth } from "../middleware/isAuth.js";
import { serverNeonDB } from "../../neon/neonDbConfig.js";

export const tasksRouter = Router();
const tasksController = new TasksController({ taskDb: serverNeonDB });

tasksRouter.get("/tareas", isAuth, tasksController.getAllTasks);
tasksRouter.get("/tarea/:id", isAuth, tasksController.getTaskById);
tasksRouter.post("/tarea", isAuth, tasksController.createTask);
tasksRouter.put("/actualizar/tarea/:id", isAuth, tasksController.updateTask);
tasksRouter.delete("/eliminar/tarea/:id", isAuth, tasksController.deleteTask);