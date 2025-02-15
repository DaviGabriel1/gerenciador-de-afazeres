import {Router, Request, Response} from "express";
import { TaskController } from "../controllers/TaskController";
import { TaskRepository } from "../repository/TaskRepository";
import { validateTask } from "../middlewares/validateTask";
import { validateId } from "../middlewares/validateId";
import { validateToken } from "../middlewares/validateToken";
import { UserController } from "../controllers/UserController";
import { UserRepository } from "../repository/UserRepository";
import { validateUser } from "../middlewares/validateUser";
import { verifyCaptcha } from "../middlewares/verifyCaptcha";

const taskRepository = new TaskRepository();
const taskController = new TaskController(taskRepository);

const userRepository = new UserRepository();
const userController = new UserController(userRepository);

const eventRouter = Router();

// ROTAS TASKS
eventRouter.get("/tasks",validateToken,(req:Request,res:Response) => taskController.findTasks(req,res));
eventRouter.post("/tasks",validateToken,validateTask,(req:Request,res:Response) => taskController.createTasks(req,res));
eventRouter.put("/tasks/:id",validateToken,validateTask,validateId,(req:Request,res:Response) => taskController.updateTask(req,res));
eventRouter.delete("/tasks/:id",validateToken,validateId,(req:Request,res:Response) => taskController.deleteTask(req,res));

// ROTAS USERS

eventRouter.get("/users",validateToken,(req:Request,res:Response) => userController.findAllUsers(req,res));
eventRouter.put("/users",validateToken,validateUser,(req:Request,res:Response) => userController.updateUser(req,res));
eventRouter.delete("/users/:id",validateToken,(req:Request,res:Response) => userController.deleteUser(req,res));


// ROTAS AUTENTICAÇÃO

eventRouter.post("/auth/register",verifyCaptcha,(req:Request,res:Response) => {res.send(200).json({message:"captcha válido!"})})

export default eventRouter;
