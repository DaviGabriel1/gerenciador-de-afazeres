import {Router, Request, Response} from "express";
import { TaskController } from "../controllers/TaskController";
import { TaskRepository } from "../repository/TaskRepository";
import { validateTask } from "../middlewares/validateTask";
import { validateId } from "../middlewares/validateId";
import { validateToken } from "../middlewares/validateToken";
import { UserController } from "../controllers/UserController";
import { UserRepository } from "../repository/UserRepository";
import { validateUser } from "../middlewares/validateUser";

const taskRepository = new TaskRepository();
const taskController = new TaskController(taskRepository);

const userRepository = new UserRepository();
const userController = new UserController(userRepository);

const router = Router();

// ROTAS TASKS
router.get("/tasks",validateToken,(req:Request,res:Response) => taskController.findTasks(req,res));

router.post("/tasks",validateToken,validateTask,(req:Request,res:Response) => taskController.createTasks(req,res));

router.put("/tasks/:id",validateToken,validateTask,validateId,(req:Request,res:Response) => taskController.updateTask(req,res));

router.delete("/tasks/:id",validateToken,validateId,(req:Request,res:Response) => taskController.deleteTask(req,res));

// ROTAS USERS

router.get("/users",validateToken,(req:Request,res:Response) => userController.findAllUsers(req,res));
router.post("/users",validateToken,validateUser,(req:Request,res:Response) => userController.createUser(req,res));
router.put("/users",validateToken,validateUser,(req:Request,res:Response) => userController.updateUser(req,res));
router.delete("/users/:id",validateToken,(req:Request,res:Response) => userController.deleteUser(req,res));

export default router;
