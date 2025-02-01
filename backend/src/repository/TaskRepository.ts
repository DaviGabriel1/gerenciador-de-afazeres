import { ICreateTaskParams } from "../interfaces/ICreateTaskParams";
import { ITask } from "../interfaces/ITask";
import { Task } from "../models/Task";

export interface ITaskRepository {
    getTasks(): Promise<ITask[]>;
    createTask(task: ICreateTaskParams): Promise<ITask>;
    updateTask(id: string, task: ICreateTaskParams): Promise<ITask | null>;
    deleteTask(id: string): Promise<boolean>;
}

export class TaskRepository implements ITaskRepository {
    constructor(){}
    
    async getTasks(): Promise<ITask[]> {
        const tasks = await Task.find();
        return tasks;   
    }

    async createTask(task: ICreateTaskParams): Promise<ITask> {
        const newTask = new Task(task); 
        await newTask.save();
        return newTask;
    }

    async updateTask(id: string, task: Partial<ICreateTaskParams>): Promise<ITask | null> {
        const updatedTask = await Task.findByIdAndUpdate(id, task, { new: true });
        return updatedTask; 
    }

    async deleteTask(id: string): Promise<boolean> {
        const deletedTask = await Task.findByIdAndDelete(id);
        return !!deletedTask; 
    }
}
