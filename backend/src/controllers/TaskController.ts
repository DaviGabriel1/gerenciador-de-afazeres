import {StatusCodes} from "http-status-codes";
import {Request,Response} from "express";

import { ITaskRepository } from "../repository/TaskRepository";

export class TaskController{
    constructor(private readonly taskRepository: ITaskRepository){}

    async findTasks(req:Request,res:Response){
        try{   
            const tasks = await this.taskRepository.getTasks();

            if(!tasks){
                res.status(StatusCodes.NOT_FOUND).json({message:"nenhuma tarefa encontrada"});
            }

            res.status(StatusCodes.OK).json({tasks});
        }
        catch(error){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:`erro ao encontrar tarefa ${error}`});
        }
    }
}