import {Request,Response,NextFunction} from "express";
import {z} from "zod";
import { StatusCodes } from "http-status-codes";


const fileSchema = z.object({
    id: z.string().regex(/^[a-fA-F0-9]{24}$/, {message:"ID inválido"})
})

export const validateId = (req:Request,res:Response,next:NextFunction) => {
    const id = req.params.id;
    if(!id){
        res.status(StatusCodes.BAD_REQUEST).json({message: "id inválido"});
        return;
    }

    const validateField = fileSchema.safeParse({id});

    if(!validateField.success){
        res.status(StatusCodes.BAD_REQUEST).json(validateField.error.format());
        return;
    }

    req.body = validateField.data;
    next();
}