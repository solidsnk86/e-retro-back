import {
  CREATE_TASK,
  DELETE_TASK,
  GET_ALL_TASKS,
  GET_TASK_BY_ID,
  GET_TASK_BY_TITLE,
  SET_TASK_DONE,
  UPDATE_TASK,
} from "./constants.js";

class TasksController {
  constructor({ taskDb }) {
    this.taskDb = taskDb;
  }

  getFirstRow = (result) => result?.rows?.[0] || result[0];

  getAllTasks = async (req, res) => {
    try {
      const id = req.userId;
      const result = await this.taskDb.query(GET_ALL_TASKS, [id]);
      const tasksResult = result?.rows || result;

      if (tasksResult.length === 0)
        return res
          .status(200)
          .json({ message: "No hay tareas en la DB", tareas: [] });

      res.status(200).json({ tareas: tasksResult });
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener las tareas: " + error.message,
        info: "Compruebe si la DB está conectada",
      });
    }
  };

  getTaskById = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await this.taskDb.query(GET_TASK_BY_ID, [id]);
      const task = this.getFirstRow(result);

      if (!task)
        return res
          .status(404)
          .json({ info: "No se encontró la tarea con el siguiente ID: " + id });

      res.status(200).json({ tarea: task });
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener las tareas: " + error.message,
        info: "Compruebe si la DB está conectada",
      });
    }
  };

  createTask = async (req, res) => {
    try {
      const { titulo, descripcion } = req.body;

      if (!titulo || !descripcion)
        return res.status(400).json({ message: "Campos vacíos" });

      const id = req.userId;
      const existingTask = await this.taskDb.query(GET_TASK_BY_TITLE, [
        titulo,
        id,
      ]);

      if (existingTask.length !== 0)
        return res
          .status(409)
          .json({ message: "La tarea con ese título ya existe" });

      const result = await this.taskDb.query(CREATE_TASK, [
        titulo,
        descripcion,
        id,
      ]);
      const createdTask = this.getFirstRow(result);

      res.status(200).json({ success: "Tarea creada", tarea: createdTask });
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener las tareas: " + error.message,
        info: "Compruebe si la DB está conectada",
      });
    }
  };

  updateTask = async (req, res) => {
    try {
      const task = {
        id: req.params.id,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
      };
      const result = await this.taskDb.query(UPDATE_TASK, [
        task.id,
        task.titulo,
        task.descripcion,
        true,
        new Date().toISOString(),
      ]);
      const updatedTask = this.getFirstRow(result);

      if (!updatedTask) {
        return res
          .status(404)
          .json({ message: "No se encontró la tarea con ID: " + task.id });
      }

      res.status(200).json({
        success: "Se ha actualizado la tarea con éxito!",
        tarea: updatedTask,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar tarea: " + error.message,
      });
    }
  };

  setTaskDone = async (req, res) => {
    try {
      const id = req.userId;
      const taskId = req.params.id;
      const result = await this.taskDb.query(SET_TASK_DONE, [id, true, taskId]);
      const taskDone = this.getFirstRow(result);

      res.status(200).json({ message: "Tarea completa!", task: taskDone });
    } catch (error) {
      res.status(500).json({ message: "Error alactualizar el estado tarea " + error.message });
    }
  };

  setTaskUndone = async (req, res) => {
    try {
      const id = req.userId
      const taskId = req.params.id
      const result = await this.taskDb.query(SET_TASK_DONE, [id, false, taskId])
      const taskUndone = this.getFirstRow(result)
      res.status(200).json({ message: "Tarea incompleta!", task: taskUndone });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar estado tarea " + error.message })
    }
  }

  deleteTask = async (req, res) => {
    try {
      const taskId = req.params.id;
      const userId = req.userId;
      const result = await this.taskDb.query(DELETE_TASK, [taskId, userId]);
      const deletedTask = this.getFirstRow(result);

      if (!deletedTask)
        return res
          .status(404)
          .json({ message: "No se encontró la tarea con el ID: " + taskId });

      res.status(200).json({
        success: "Se ha eliminado la tarea con éxito!",
        tarea: deletedTask,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al borrar tarea: " + error.message });
    }
  };
}

export { TasksController };
