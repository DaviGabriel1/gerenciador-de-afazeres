import {Router, Request, Response} from "express";
import { TaskController } from "../controllers/TaskController";
import { TaskRepository } from "../repository/TaskRepository";
import { validateBody } from "../middlewares/validateBody";
import { validateId } from "../middlewares/validateId";

const taskRepository = new TaskRepository();
const taskController = new TaskController(taskRepository);

const router = Router();

router.get("/tasks",(req:Request,res:Response) => taskController.findTasks(req,res));

router.post("/tasks",validateBody,(req:Request,res:Response) => taskController.createTasks(req,res));

router.put("/tasks/:id",validateBody,validateId,(req:Request,res:Response) => taskController.updateTask(req,res));

router.delete("/tasks/:id",validateId,(req:Request,res:Response) => taskController.deleteTask(req,res));

export default router;