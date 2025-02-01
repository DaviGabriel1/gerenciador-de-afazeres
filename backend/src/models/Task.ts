import mongoose, { Schema } from "mongoose";
import { ITask } from "../interfaces/ITask";

const TaskSchema: Schema = new Schema({
    title: {type:String, required:true},
    description: {type:String},
    completed: {type:Boolean, required:true},
    priority: {type:String, enum:["low","mid","high"], default:"mid"},
    dueDate: {type:Date, required:true},
},{
    timestamps: true
});

export const Task = mongoose.model<ITask>("tasks",TaskSchema);