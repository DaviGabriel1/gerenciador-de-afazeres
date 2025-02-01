import { Document } from "mongoose";

export interface ITask extends Document{
    title: string;
    description?: string;
    completed: boolean;
    priority: "low" | "mid" | "high";
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
}