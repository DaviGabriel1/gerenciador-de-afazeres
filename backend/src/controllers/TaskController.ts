import {StatusCodes} from "http-status-codes";
import {Request,Response} from "express";

import { ITaskRepository } from "../repository/TaskRepository";
import { ITask } from "../interfaces/ITask";

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

    async createTasks(req:Request,res:Response){
        const body = req.body;
        console.log(body)
        try{
            const taskObj = {
                title: body.title,
                description: body.description,
                completed: body.completed,
                priority: body.priority,
                dueDate: body.dueDate
            }
            const createdTask = await this.taskRepository.createTask(taskObj);
            res.status(StatusCodes.CREATED).json(createdTask);
        }
        catch(error){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: `erro no servidor: ${error}`})
        }
    }

    async updateTask(req:Request,res:Response){
        try{
            const id = req.params.id;
            const task:ITask = req.body;

            const updatedTask = await this.taskRepository.updateTask(id,task);
            
            if(updatedTask){
                res.status(StatusCodes.OK).json(updatedTask);
            }
            else{
                res.status(StatusCodes.BAD_REQUEST).json({message: "tarefa não encontrada"})
            }
        }
        catch(error){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: `erro no servidor: ${error}`});
        }
    }

    async deleteTask(req:Request,res:Response){
        try{
            const id = req.params.id;

            const deletedTask = await this.taskRepository.deleteTask(id);

            if(deletedTask){
                res.status(StatusCodes.NO_CONTENT).end();
            }
            else{
                res.status(StatusCodes.BAD_REQUEST).json({message: "tarefa não encontrada"})
            }
        }
        catch(error){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: `erro no servidor: ${error}`});
        }
    }
}