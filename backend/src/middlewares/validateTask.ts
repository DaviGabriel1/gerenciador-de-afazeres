import {Request,Response,NextFunction} from "express";
import {z} from "zod";
import { customErrorMap } from "../services/translationZod";
import { StatusCodes } from "http-status-codes";

const today = new Date();
today.setHours(0, 0, 0, 0);

z.setErrorMap(customErrorMap);

const fileSchema = z.object({
    title: z.string().min(1),
    description: z.string(),
    completed: z.boolean(),
    priority: z.enum(["low","mid","high"],{
        message: "status inválido"
    }),
    dueDate: z.string().transform((str) => new Date(str)).refine((date) => date >= today, {
        message: "A data deve ser futura!"
    })
})

export const validateTask = (req:Request,res:Response,next:NextFunction) => {
    const validateFields = fileSchema.safeParse(req.body);

    if(!validateFields.success){
        res.status(StatusCodes.BAD_REQUEST).json(validateFields.error.format());
        return;
    }

    req.body = validateFields.data;
    next();
}