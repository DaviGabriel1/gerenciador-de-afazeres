import {Router, Request, Response} from "express";
import { TaskController } from "../controllers/TaskController";
import { TaskRepository } from "../repository/TaskRepository";

const taskRepository = new TaskRepository();
const taskController = new TaskController(taskRepository);

const router = Router();

router.get("/tasks",taskController.findTasks);

router.post("/tasks",(req:Request,res:Response) => {

})

router.put("/tasks/:id",(req:Request,res:Response) => {

})

router.delete("/tasks/:id",(req:Request,res:Response) => {

})

export default router;