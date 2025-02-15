import { Router,Request,Response } from "express";
import { validateToken } from "../middlewares/validateToken";
import { validateUser } from "../middlewares/validateUser";
import { AuthController } from "../controllers/AuthController";
import { AuthRepository } from "../repository/AuthRepository";

const authRouter = Router();

const authRepository = new AuthRepository();
const authController = new AuthController(authRepository);

authRouter.post("/register",validateToken,validateUser,(req:Request,res:Response) => authController.register(req,res));
authRouter.post("/login",validateToken/*TODO: validateLogin */,(req:Request,res:Response) => authController.login(req,res));

export default authRouter;